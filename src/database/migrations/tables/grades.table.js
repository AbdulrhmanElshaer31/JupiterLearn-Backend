
const { query } = require('../../../config/database');

async function createGradesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS grades (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      monthly_price DECIMAL(10,2) DEFAULT 0,
      platform_enabled INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_grades_name ON grades(name)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_grades_is_synced ON grades(is_synced)`);

  console.log('grades table created');
}

module.exports = createGradesTable;