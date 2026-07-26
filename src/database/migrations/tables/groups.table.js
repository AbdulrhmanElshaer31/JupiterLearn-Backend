
const { query } = require('../../../config/database');

async function createGroupsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS groups (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      day TEXT,
      days TEXT,
      start_time TEXT,
      end_time TEXT,
      room TEXT,
      lock_attendance_after_minutes INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_groups_grade_id ON groups(grade_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_groups_is_synced ON groups(is_synced)`);

  console.log('groups table created');
}

module.exports = createGroupsTable;