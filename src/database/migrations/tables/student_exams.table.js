
const { query } = require('../../../config/database');

async function createStudentExamsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS student_exams (
      id SERIAL PRIMARY KEY,
      exam_id INTEGER NOT NULL REFERENCES online_exams(id) ON DELETE CASCADE,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      score DECIMAL(10,2) NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      started_at TIMESTAMP NOT NULL,
      submitted_at TIMESTAMP NOT NULL,
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_student_exams_exam_id ON student_exams(exam_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_student_exams_student_id ON student_exams(student_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_student_exams_is_synced ON student_exams(is_synced)`);

  console.log('student_exams table created');
}

module.exports = createStudentExamsTable;