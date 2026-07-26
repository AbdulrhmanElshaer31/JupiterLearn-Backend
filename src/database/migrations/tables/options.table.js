
const { query } = require('../../../config/database');

async function createOptionsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS options (
      id SERIAL PRIMARY KEY,
      question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      option_text VARCHAR(255) NOT NULL,
      is_correct INTEGER DEFAULT 0,
      "order" INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_options_is_synced ON options(is_synced)`);

  console.log('options table created');
}

module.exports = createOptionsTable;