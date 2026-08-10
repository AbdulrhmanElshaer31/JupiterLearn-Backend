const { query } = require("../../../config/database");

async function createUsersTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'assistant',
      is_active INTEGER DEFAULT 1,
      sync_priority TEXT DEFAULT 'default',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1,
      deleted INTEGER DEFAULT 0

    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`);
  await query(
    `CREATE INDEX IF NOT EXISTS idx_users_is_synced ON users(is_synced)`,
  );
  await query(`CREATE INDEX IF NOT EXISTS idx_users_deleted ON users(deleted)`);

  console.log("users table created");
}

module.exports = createUsersTable;
