const { query } = require("../../../config/database");

async function createDeletedRecordsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS deleted_records (
      id SERIAL PRIMARY KEY,
      table_name VARCHAR(100) NOT NULL,
      record_id INTEGER NOT NULL,
      deleted_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 0
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_deleted_records_synced ON deleted_records(is_synced)`
  );
  
  await query(
    `CREATE INDEX IF NOT EXISTS idx_deleted_records_table_record ON deleted_records(table_name, record_id)`
  );
  
  await query(
    `CREATE INDEX IF NOT EXISTS idx_deleted_records_table_name ON deleted_records(table_name)`
  );

  console.log("deleted_records table created");
}

module.exports = createDeletedRecordsTable;