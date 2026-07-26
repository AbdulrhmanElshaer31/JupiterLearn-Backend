const { query } = require('../../config/database');

exports.getAll = async (tableName) => {
  const result = await query(`SELECT * FROM ${tableName} ORDER BY id`);
  return result.rows;
};

exports.getAfter = async (tableName, lastId) => {
  const result = await query(`SELECT * FROM ${tableName} WHERE id > $1 ORDER BY id`, [lastId]);
  return result.rows;
};

exports.upsert = async (tableName, data) => {
  const columns = Object.keys(data).filter(k => k !== 'id' && k !== 'is_synced');
  const values = columns.map(k => data[k]);
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

  const existing = await query(`SELECT id FROM ${tableName} WHERE id = $1`, [data.id]);

  if (existing.rows.length > 0) {
    const setClause = columns.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const updateValues = [...values, data.id];
    await query(
      `UPDATE ${tableName} SET ${setClause}, is_synced = 1, updated_at = NOW() WHERE id = $${updateValues.length}`,
      updateValues
    );
  } else {
    const allColumns = [...columns, 'is_synced'];
    const allPlaceholders = [...Array(values.length + 1).keys()].map(i => `$${i + 1}`).join(', ');
    await query(
      `INSERT INTO ${tableName} (${allColumns.join(', ')}) VALUES (${allPlaceholders})`,
      [...values, 1]
    );
  }
};