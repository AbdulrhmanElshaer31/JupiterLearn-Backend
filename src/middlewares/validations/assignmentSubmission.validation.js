const Joi = require("joi");

const gradeSubmissionSchema = Joi.object({
  score: Joi.number().required().min(0).max(999),
  feedback: Joi.string().allow("", null).max(1000)
});

module.exports = {
  gradeSubmissionSchema
};