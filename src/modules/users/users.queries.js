// src/modules/users/users.queries.js

const getAllAssistants = `
SELECT 
  id,
  full_name,
  phone,
  role,
  is_active,
  created_at
FROM users
WHERE role = 'assistant' AND is_active = 1
ORDER BY full_name ASC
`;

const getAllUsers = `
SELECT 
  id,
  full_name,
  phone,
  role,
  is_active,
  created_at
FROM users
WHERE is_active = 1
ORDER BY full_name ASC
`;

module.exports = {
  getAllAssistants,
  getAllUsers,
};