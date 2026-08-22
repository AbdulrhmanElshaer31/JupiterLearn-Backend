const changeStudentPassword = `
UPDATE students
SET password = $2, updated_at = NOW()
WHERE id = $1 AND password = $3
RETURNING id
`;

const changeUserPassword = `
UPDATE users
SET password = $2
WHERE id = $1 AND password = $3
RETURNING id
`;

module.exports = {
  changeStudentPassword,
  changeUserPassword
};