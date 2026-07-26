
const { query } = require('../../../config/database');

async function createVideosTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      youtube_url VARCHAR(255) NOT NULL,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_videos_grade_id ON videos(grade_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_videos_created_by ON videos(created_by)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_videos_is_synced ON videos(is_synced)`);

  console.log('videos table created');
}

module.exports = createVideosTable;