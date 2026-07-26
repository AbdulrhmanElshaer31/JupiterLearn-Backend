
const { query } = require('../../../config/database');

async function createOnlineExamsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS online_exams (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      group_id INTEGER REFERENCES groups(id) ON DELETE SET NULL,
      duration_minutes INTEGER NOT NULL,
      start_at TIMESTAMP NOT NULL,
      end_at TIMESTAMP NOT NULL,
      full_mark DECIMAL(10,2) NOT NULL,
      randomize_questions INTEGER DEFAULT 0,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_online_exams_grade_id ON online_exams(grade_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_online_exams_group_id ON online_exams(group_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_online_exams_created_by ON online_exams(created_by)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_online_exams_is_synced ON online_exams(is_synced)`);

  console.log('online_exams table created');
}

module.exports = createOnlineExamsTable;