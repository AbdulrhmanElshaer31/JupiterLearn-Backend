const getQuestionAnswerStats = `
SELECT 
  q.id AS question_id,
  q.question_text,
  q.type,
  COUNT(sa.id) AS total_answers,
  COUNT(CASE WHEN sa.is_correct = 1 THEN 1 END) AS correct_count,
  COUNT(CASE WHEN sa.is_correct = 0 THEN 1 END) AS incorrect_count,
  ROUND(
    (COUNT(CASE WHEN sa.is_correct = 1 THEN 1 END)::numeric / 
    NULLIF(COUNT(sa.id), 0)) * 100, 2
  ) AS correct_percentage
FROM questions q
LEFT JOIN student_answers sa ON q.id = sa.question_id
WHERE q.id = $1
GROUP BY q.id, q.question_text, q.type
`;

const getMostSelectedOptions = `
SELECT 
  o.id AS option_id,
  o.option_text,
  o.is_correct,
  COUNT(sa.id) AS selected_count
FROM options o
LEFT JOIN student_answers sa ON o.id = sa.selected_option_id
WHERE o.question_id = $1
GROUP BY o.id, o.option_text, o.is_correct, o."order"
ORDER BY o."order" ASC
`;

module.exports = {
  getQuestionAnswerStats,
  getMostSelectedOptions,
};
