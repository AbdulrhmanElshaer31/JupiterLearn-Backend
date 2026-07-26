
const { query } = require('../../../config/database');

async function createPlaylistsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS playlists (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_playlists_grade_id ON playlists(grade_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_playlists_created_by ON playlists(created_by)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_playlists_is_synced ON playlists(is_synced)`);

  console.log('playlists table created');
}

module.exports = createPlaylistsTable;