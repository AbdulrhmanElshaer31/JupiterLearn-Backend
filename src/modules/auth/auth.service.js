const { query } = require("../../config/database");

const studentAuth = async (credentials) => {
  const { phone, password } = credentials;
  const qr = `SELECT id, barcode, full_name, phone, grade_id FROM students
    WHERE (phone = $1 OR parent_phone = $1)
    AND password = $2
    AND platform_account_active = 1
    AND active = 1;`;
  const result = await query(qr, [phone, password]);
  return result.rows[0] || null;
};



const userAuth = async (credentials) => {
  const { phone, password } = credentials;
  const qr = `SELECT
                id, full_name, phone, password, role, is_active
              FROM
                users
            WHERE
                 phone = $1 AND password = $2 AND is_active = 1;`;
  const result = await query(qr, [phone, password]);
  return result.rows[0] || null;
};



const parentAccess = async (token) => {
    const qr =`SELECT `
 };




module.exports = {
  studentAuth,
  userAuth,
  parentAccess,
};
