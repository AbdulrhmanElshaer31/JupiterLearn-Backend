const { query } = require("../../config/database");

exports.getAll = async (tableName) => {
  const result = await query(`SELECT * FROM ${tableName} ORDER BY id`);
  return result.rows;
};

exports.getAfter = async (tableName, lastId) => {
  const result = await query(
    `SELECT * FROM ${tableName} WHERE id > $1 ORDER BY id`,
    [lastId],
  );
  return result.rows;
};

exports.upsert = async (tableName, data) => {
  const columns = Object.keys(data).filter(
    (k) =>
      k !== "id" &&
      k !== "is_synced" &&
      k !== "updated_at" &&
      k !== "created_at",
  );
  const values = columns.map((k) => data[k]);

  let existing;
  if (tableName === "users" && data.phone) {
    existing = await query(`SELECT * FROM users WHERE phone = $1`, [
      data.phone,
    ]);
    if (!existing || existing.rows.length === 0) {
      existing = await query(`SELECT * FROM users WHERE id = $1`, [data.id]);
    }
  } else if (tableName === "students" && data.barcode) {
    existing = await query(`SELECT * FROM students WHERE barcode = $1`, [
      data.barcode,
    ]);
  } else if (tableName === "message_templates" && data.type) {
    existing = await query(`SELECT * FROM message_templates WHERE type = $1`, [
      data.type,
    ]);
  } else {
    existing = await query(`SELECT * FROM ${tableName} WHERE id = $1`, [
      data.id,
    ]);
  }

  if (existing && existing.rows && existing.rows.length > 0) {
    if (
      data.sync_priority === "default" &&
      existing.rows[0].sync_priority === "updated"
    ) {
      return { success: false, reason: "Server has newer data" };
    }

    const realId = existing.rows[0].id;
    const setClause = columns.map((k, i) => `${k} = $${i + 1}`).join(", ");
    const updateValues = [...values, realId];
    await query(
      `UPDATE ${tableName} SET ${setClause}, is_synced = 1, updated_at = NOW() WHERE id = $${updateValues.length}`,
      updateValues,
    );
    return { success: true };
  } else {
    const allColumns = ["id", ...columns, "is_synced"];
    const allPlaceholders = [...Array(values.length + 2).keys()]
      .map((i) => `$${i + 1}`)
      .join(", ");
    await query(
      `INSERT INTO ${tableName} (${allColumns.join(", ")}) VALUES (${allPlaceholders})`,
      [data.id, ...values, 1],
    );
    return { success: true };
  }
};

exports.softDelete = async (tableName, id) => {
  try {
    const columnCheck = await query(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name = $1 AND column_name = 'deleted'`,
      [tableName],
    );

    if (columnCheck.rows.length === 0) {
      const result = await query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING id`,
        [id],
      );

      if (result.rowCount === 0) {
        return { success: false, error: "Record not found" };
      }

      return {
        success: true,
        message: "Record permanently deleted (no deleted column)",
      };
    }

    const result = await query(
      `UPDATE ${tableName} SET deleted = 1, updated_at = NOW() WHERE id = $1 RETURNING id`,
      [id],
    );

    if (result.rowCount === 0) {
      return { success: false, error: "Record not found" };
    }

    return { success: true, message: "Record soft deleted" };
  } catch (error) {
    throw error;
  }
};

exports.hardDelete = async (tableName, id) => {
  try {
    const result = await query(
      `DELETE FROM ${tableName} WHERE id = $1 RETURNING id`,
      [id],
    );

    if (result.rowCount === 0) {
      return { success: true, message: "Record not found or already deleted" };
    }

    return { success: true, message: "Record permanently deleted" };
  } catch (error) {
    throw error;
  }
};

exports.getDeleted = async (tableName) => {
  try {
    const columnCheck = await query(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name = $1 AND column_name = 'deleted'`,
      [tableName],
    );

    if (columnCheck.rows.length === 0) {
      return [];
    }

    const result = await query(
      `SELECT * FROM ${tableName} WHERE deleted = 1 ORDER BY id`,
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
