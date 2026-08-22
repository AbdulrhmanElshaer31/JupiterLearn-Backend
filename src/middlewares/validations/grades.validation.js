const Joi = require("joi");
const createGradeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  monthlyPrice: Joi.number().positive().required(),
});

const updateGradeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  monthlyPrice: Joi.number().positive().required(),
});

const gradeIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
