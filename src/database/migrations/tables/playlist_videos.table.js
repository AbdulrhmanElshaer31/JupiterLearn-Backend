
const { query } = require('../../../config/database');

async function createPlaylistVideosTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS playlist_videos (
      id SERIAL PRIMARY KEY,
      playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
      video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
      added_at TIMESTAMP DEFAULT NOW(),
      is_synced INTEGER DEFAULT 1
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_playlist_videos_playlist_id ON playlist_videos(playlist_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_playlist_videos_video_id ON playlist_videos(video_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_playlist_videos_is_synced ON playlist_videos(is_synced)`);

  console.log('playlist_videos table created');
}

module.exports = createPlaylistVideosTable;