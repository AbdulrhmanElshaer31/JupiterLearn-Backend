
const { query } = require('../../../config/database');

async function createQuestionsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      exam_id INTEGER NOT NULL REFERENCES online_exams(id) ON DELETE CASCADE,
      question_text TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'mcq',
      "order" INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_questions_exam_id ON questions(exam_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_questions_is_synced ON questions(is_synced)`);

  console.log('questions table created');
}

module.exports = createQuestionsTable;