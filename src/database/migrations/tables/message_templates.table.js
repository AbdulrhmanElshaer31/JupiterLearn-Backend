const { query } = require("../../../config/database");

async function createMessageTemplatesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS message_templates (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      sync_priority TEXT DEFAULT 'default',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_message_templates_type ON message_templates(type)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_message_templates_is_synced ON message_templates(is_synced)`,
  );

  console.log("message_templates table created");
}

module.exports = createMessageTemplatesTable;
