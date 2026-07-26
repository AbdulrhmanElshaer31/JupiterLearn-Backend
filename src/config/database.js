const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://admin:2GDlKu6s02sNTjjoOjUeCA6PoGckiRKJ@dpg-d9j2pjjtqb8s739m7dug-a/center_db_20kz",
  ssl: {
    rejectUnauthorized: false,
  },
});

async function query(text, params) {
  const client = await pool.connect();

  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

module.exports = { pool, query };
