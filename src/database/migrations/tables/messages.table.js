
const { query } = require('../../../config/database');

async function createMessagesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      phone TEXT NOT NULL,
      template_type TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      scheduled_at TIMESTAMP,
      sent_at TIMESTAMP,
      error_message TEXT,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_messages_student_id ON messages(student_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_messages_template_type ON messages(template_type)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_messages_is_synced ON messages(is_synced)`);

  console.log('messages table created');
}

module.exports = createMessagesTable;