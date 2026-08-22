const { query } = require('../../../config/database');
async function createAssignmentSubmissionsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS assignment_submissions (
      id SERIAL PRIMARY KEY,
      assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      file_path VARCHAR(255) NOT NULL,
      score DECIMAL(10,2),
      feedback TEXT,
      reviewed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      submitted_at TIMESTAMP DEFAULT NOW(),
      reviewed_at TIMESTAMP
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_assignment_submissions_assignment_id ON assignment_submissions(assignment_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_assignment_submissions_student_id ON assignment_submissions(student_id)`);
  console.log('assignment_submissions table created');
}

module.exports = createAssignmentSubmissionsTable;



const { query } = require('../../../config/database');

async function createAssignmentsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS assignments (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      group_id INTEGER REFERENCES groups(id) ON DELETE SET NULL,
      file_path VARCHAR(255),
      full_mark DECIMAL(10,2) NOT NULL,
      deadline TIMESTAMP NOT NULL,
      is_closed INTEGER DEFAULT 0,
      created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_assignments_grade_id ON assignments(grade_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_assignments_group_id ON assignments(group_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_assignments_created_by ON assignments(created_by)`);
  console.log('assignments table created');
}

module.exports = createAssignmentsTable;

const { query } = require("../../../config/database");

async function createAttendanceTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      attendance_date DATE NOT NULL,
      status TEXT NOT NULL,
      attendance_time TIME DEFAULT NOW(),
      method TEXT DEFAULT 'manual',
      is_makeup INTEGER DEFAULT 0,
      makeup_group_id INTEGER REFERENCES groups(id) ON DELETE SET NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(attendance_date)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_attendance_group ON attendance(group_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance(status)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_attendance_date_group ON attendance(attendance_date, group_id)`,
  );


  console.log("attendance table created");
}

module.exports = createAttendanceTable;

const { query } = require("../../../config/database");

async function createExamResultsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS exam_results (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      exam_id INTEGER NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
      degree DECIMAL(10,2) NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(student_id, exam_id)
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_exam_results_exam_id ON exam_results(exam_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_exam_results_student_id ON exam_results(student_id)`,
  );

  console.log("exam_results table created");
}

module.exports = createExamResultsTable;

const { query } = require("../../../config/database");

async function createExamsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS exams (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      group_id INTEGER REFERENCES groups(id) ON DELETE SET NULL,
      total_degree DECIMAL(10,2) NOT NULL,
      exam_date DATE NOT NULL,
      notes TEXT,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      deleted INTEGER DEFAULT 0
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_exams_grade_id ON exams(grade_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_exams_group_id ON exams(group_id)`,
  );
  await query(`CREATE INDEX IF NOT EXISTS idx_exams_date ON exams(exam_date)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_exams_deleted ON exams(deleted)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_exams_created_by ON exams(created_by)`);

  console.log("exams table created");
}

module.exports = createExamsTable;

const { query } = require("../../../config/database");

async function createGradesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS grades (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      monthly_price DECIMAL(10,2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      deleted INTEGER DEFAULT 0,
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_grades_name ON grades(name)`);
  console.log("grades table created");
}

module.exports = createGradesTable;

const { query } = require("../../../config/database");

async function createGroupsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS groups (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      day TEXT,
      days TEXT,
      start_time TEXT,
      end_time TEXT,
      room TEXT,
      lock_attendance_after_minutes INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      deleted INTEGER DEFAULT 0

    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_groups_grade_id ON groups(grade_id)`,
  );
  console.log("groups table created");
}

module.exports = createGroupsTable;

const { query } = require("../../../config/database");

async function createMessagesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      scheduled_at TIMESTAMP,
      sent_at TIMESTAMP,
      error_message TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_messages_student_id ON messages(student_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at)`,
  );


  console.log("messages table created");
}

module.exports = createMessagesTable;


const { query } = require('../../../config/database');

async function createOnlineExamsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS online_exams (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      group_id INTEGER REFERENCES groups(id) ON DELETE SET NULL,
      duration_minutes INTEGER NOT NULL,
      start_at TIMESTAMP NOT NULL,
      end_at TIMESTAMP NOT NULL,
      full_mark DECIMAL(10,2) NOT NULL,
      randomize_questions INTEGER DEFAULT 0,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_online_exams_grade_id ON online_exams(grade_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_online_exams_group_id ON online_exams(group_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_online_exams_created_by ON online_exams(created_by)`);
  console.log('online_exams table created');
}

module.exports = createOnlineExamsTable;


const { query } = require('../../../config/database');

async function createOptionsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS options (
      id SERIAL PRIMARY KEY,
      question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      option_text VARCHAR(255) NOT NULL,
      is_correct INTEGER DEFAULT 0,
      "order" INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id)`);

  console.log('options table created');
}

module.exports = createOptionsTable;

const { query } = require("../../../config/database");

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
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON payments(subscription_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date)`,
  );
  console.log("payments table created");
}

module.exports = createPaymentsTable;


const { query } = require('../../../config/database');

async function createPlaylistVideosTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS playlist_videos (
      id SERIAL PRIMARY KEY,
      playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
      video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
      added_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_playlist_videos_playlist_id ON playlist_videos(playlist_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_playlist_videos_video_id ON playlist_videos(video_id)`);

  console.log('playlist_videos table created');
}

module.exports = createPlaylistVideosTable;


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
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_playlists_grade_id ON playlists(grade_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_playlists_created_by ON playlists(created_by)`);
  console.log('playlists table created');
}

module.exports = createPlaylistsTable;


const { query } = require('../../../config/database');

async function createQuestionsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      exam_id INTEGER NOT NULL REFERENCES online_exams(id) ON DELETE CASCADE,
      question_text TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'mcq',
      "order" INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_questions_exam_id ON questions(exam_id)`);

  console.log('questions table created');
}

module.exports = createQuestionsTable;

const { query } = require("../../../config/database");

async function createSettingsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      center_name TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      address TEXT DEFAULT '',
      default_lock_minutes INTEGER DEFAULT 30,
      academic_year_started INTEGER DEFAULT 0,
      academic_year_name TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
    )
  `);


  console.log("settings table created");
}

module.exports = createSettingsTable;



const { query } = require('../../../config/database');

async function createStudentAnswersTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS student_answers (
      id SERIAL PRIMARY KEY,
      exam_id INTEGER NOT NULL REFERENCES online_exams(id) ON DELETE CASCADE,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      selected_option_id INTEGER REFERENCES options(id) ON DELETE SET NULL,
      is_correct INTEGER NOT NULL,
      submitted_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_student_answers_exam_id ON student_answers(exam_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_student_answers_student_id ON student_answers(student_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_student_answers_question_id ON student_answers(question_id)`);ض
  console.log('student_answers table created');
}

module.exports = createStudentAnswersTable;

const { query } = require("../../../config/database");

async function createStudentExamsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS student_exams (
      id SERIAL PRIMARY KEY,
      exam_id INTEGER NOT NULL REFERENCES online_exams(id) ON DELETE CASCADE,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      score DECIMAL(10,2) DEFAULT 0,
      total_questions INTEGER DEFAULT 0,
      correct_answers INTEGER DEFAULT 0,
      started_at TIMESTAMP NOT NULL,
      submitted_at TIMESTAMP
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_student_exams_exam_id ON student_exams(exam_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_student_exams_student_id ON student_exams(student_id)`,
  );

  console.log("student_exams table created");
}

module.exports = createStudentExamsTable;


const { query } = require("../../../config/database");

async function createStudentsTable() {
  await query(`
      CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      barcode TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT DEFAULT NULL,
      parent_phone TEXT DEFAULT NULL,
      password TEXT DEFAULT NULL,
      parent_token TEXT,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
      notes TEXT,
      active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW(),
      deleted INTEGER DEFAULT 0
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_students_full_name ON students(full_name)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_students_grade_id ON students(grade_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_students_group_id ON students(group_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_students_parent_phone ON students(parent_phone)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_students_barcode ON students(barcode)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_students_parent_token ON students(parent_token)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_students_deleted ON students(deleted)`,
  );

  console.log("students table created");
}

module.exports = createStudentsTable;


const { query } = require("../../../config/database");

async function createSubscriptionsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      grade_id INTEGER NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
      month DATE NOT NULL,
      required_amount DECIMAL(10,2) NOT NULL,
      status TEXT DEFAULT 'unpaid',
      created_at TIMESTAMP DEFAULT NOW(),
      deleted INTEGER DEFAULT 0,
      UNIQUE(student_id, month)
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_student_id ON subscriptions(student_id)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_month ON subscriptions(month)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status)`,
  );
  await query(
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_deleted ON subscriptions(deleted)`,
  );

  console.log("subscriptions table created");
}

module.exports = createSubscriptionsTable;

const { query } = require("../../../config/database");

async function createUsersTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'assistant',
      permissions TEXT NOT NULL CHECK (permissions IN ('online_mangment', 'center_manegment')
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW(),
      deleted INTEGER DEFAULT 0

    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_users_deleted ON users(deleted)`);

  console.log("users table created");
}

module.exports = createUsersTable;



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
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_videos_grade_id ON videos(grade_id)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_videos_created_by ON videos(created_by)`);
  console.log('videos table created');
}

module.exports = createVideosTable;

const { query } = require("../../../config/database");

async function createWhatsappMessagesTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS whatsapp_messages (
      id SERIAL PRIMARY KEY,
      template TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      sent_to TEXT NOT NULL,
      delay INTEGER DEFAULT 60,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(
    `CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_is_active ON whatsapp_messages(is_active)`,
  );
  
  await query(
    `CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_sent_to ON whatsapp_messages(sent_to)`,
  );
  
  await query(
    `CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_created_at ON whatsapp_messages(created_at)`,
  );

  console.log("whatsapp_messages table created successfully");
}

module.exports = createWhatsappMessagesTable;



