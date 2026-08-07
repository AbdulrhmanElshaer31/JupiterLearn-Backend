const { query } = require("../../config/database");

const getStudentData =async (id) => {
    const qr = `SELECT * FROM students WHERE id = $1;`;
    const result =await query(qr, [id]);
    return result.rows[0];
}

module.exports = {
    getStudentData,
}