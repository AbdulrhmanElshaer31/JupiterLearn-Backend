
const { query } = require('../../../config/database');

async function createSettingsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      center_name TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      address TEXT DEFAULT '',
      auto_backup INTEGER DEFAULT 1,
      backup_time TEXT,
      google_drive_folder_id TEXT,
      center_logo TEXT,
      default_fee DECIMAL(10,2) DEFAULT 0,
      session_timeout INTEGER DEFAULT 30,
      desktop_password TEXT,
      desktop_password_enabled INTEGER DEFAULT 0,
      default_lock_minutes INTEGER DEFAULT 30,
      platform_enabled INTEGER DEFAULT 1,
      platform_disabled_msg TEXT DEFAULT 'المنصة غير متاحة حاليا',
      academic_year_started INTEGER DEFAULT 0,
      academic_year_name TEXT DEFAULT '',
      last_sync_at TEXT,
      sync_interval_minutes INTEGER DEFAULT 5,
      server_url TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_settings_is_synced ON settings(is_synced)`);

  console.log('settings table created');
}

module.exports = createSettingsTable;