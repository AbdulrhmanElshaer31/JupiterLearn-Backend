const getOptionsByQuestionId = `
SELECT 
  id,
  question_id,
  option_text,
  is_correct,
  "order",
  created_at
FROM options
WHERE question_id = $1
ORDER BY "order" ASC
`;

const getOptionById = `
SELECT 
  id,
  question_id,
  option_text,
  is_correct,
  "order",
  created_at
FROM options
WHERE id = $1
`;

const createOption = `
INSERT INTO options (question_id, option_text, is_correct, "order")
VALUES ($1, $2, $3, $4)
RETURNING *
`;

const updateOption = `
UPDATE options
SET 
  option_text = $2,
  is_correct = $3,
  "order" = $4
WHERE id = $1
RETURNING *
`;

const deleteOption = `
DELETE FROM options
WHERE id = $1
RETURNING id
`;

module.exports = {
  getOptionsByQuestionId,
  getOptionById,
  createOption,
  updateOption,
  deleteOption
};