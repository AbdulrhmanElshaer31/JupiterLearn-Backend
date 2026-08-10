const getQuestionsByExamId = `
SELECT 
  id,
  exam_id,
  question_text,
  type,
  "order",
  created_at
FROM questions
WHERE exam_id = $1
ORDER BY "order" ASC
`;

const getQuestionById = `
SELECT 
  id,
  exam_id,
  question_text,
  type,
  "order",
  created_at
FROM questions
WHERE id = $1
`;

const createQuestion = `
INSERT INTO questions (exam_id, question_text, type, "order")
VALUES ($1, $2, $3, $4)
RETURNING *
`;

const updateQuestion = `
UPDATE questions
SET 
  question_text = $2,
  type = $3,
  "order" = $4
WHERE id = $1
RETURNING *
`;

const deleteQuestion = `
DELETE FROM questions
WHERE id = $1
RETURNING id
`;

module.exports = {
  getQuestionsByExamId,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
};