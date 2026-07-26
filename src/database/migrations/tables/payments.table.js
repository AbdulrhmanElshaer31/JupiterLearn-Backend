
const { query } = require('../../../config/database');

async function createPaymentsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      subscription_id INTEGER NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      amount DECIMAL(10,2) NOT NULL,
      is_full_payment INTEGER DEFAULT 0,
      remaining_before DECIMAL(10,2) DEFAULT 0,
      remaining_after DECIMAL(10,2) DEFAULT 0,
      payment_date DATE NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON payments(subscription_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_payments_is_synced ON payments(is_synced)`);

  console.log('payments table created');
}

module.exports = createPaymentsTable;