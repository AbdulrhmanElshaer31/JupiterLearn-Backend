const Joi = require("joi");
const createAssignmentSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer().required(),
  group_id: Joi.number().integer().allow(null),
  filePath: Joi.string().allow("", null).max(255),
  fullMark: Joi.number().required().min(1).max(999),
  deadline: Joi.date().iso().required()
});

const updateAssignmentSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer(),
  group_id: Joi.number().integer().allow(null),
  filePath: Joi.string().allow("", null).max(255),
  fullMark: Joi.number().min(1).max(999),
  deadline: Joi.date().iso(),
  isClosed: Joi.number().integer().valid(0, 1)
});

module.exports = {
  createAssignmentSchema,
  updateAssignmentSchema
};


const Joi = require("joi");

const gradeSubmissionSchema = Joi.object({
  assignment_id: Joi.number().integer().required(),
  student_id: Joi.number().integer().required(), 
  score: Joi.number().required().min(0).max(999),
  feedback: Joi.string().allow("", null).max(1000)
});

module.exports = {
  gradeSubmissionSchema
};

const Joi = require("joi");

const loginSchema = Joi.object({
  phone: Joi.string().required().min(8).max(20),
  password: Joi.string().required().min(4).max(100)
});

module.exports = {
  loginSchema
};
const Joi = require("joi");

const createOnlineExamSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().allow("", null).max(1000),
  grade_id: Joi.number().integer().required(),
  group_id: Joi.number().integer().allow(null),
  durationMinutes: Joi.number().integer().required().min(1).max(300),
  startAt: Joi.date().iso().required(),
  endAt: Joi.date().iso().required().greater(Joi.ref("startAt")),
  fullMark: Joi.number().required().min(1).max(999),
  randomizeQuestions: Joi.number().integer().valid(0, 1).default(0)
});

const updateOnlineExamSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().allow("", null).max(1000),
  grade_id: Joi.number().integer(),
  group_id: Joi.number().integer().allow(null),
  durationMinutes: Joi.number().integer().min(1).max(300),
  startAt: Joi.date().iso(),
  endAt: Joi.date().iso(),
  fullMark: Joi.number().min(1).max(999),
  randomizeQuestions: Joi.number().integer().valid(0, 1)
});

module.exports = {
  createOnlineExamSchema,
  updateOnlineExamSchema
};
const Joi = require("joi");

const createOptionSchema = Joi.object({
  question_id: Joi.number().integer().required(),
  option_text: Joi.string().required().min(1).max(255),
  isCorrect: Joi.number().integer().valid(0, 1).required(),
  order: Joi.number().integer().required().min(1)
});

const updateOptionSchema = Joi.object({
  option_text: Joi.string().min(1).max(255),
  isCorrect: Joi.number().integer().valid(0, 1),
  order: Joi.number().integer().min(1)
});

module.exports = {
  createOptionSchema,
  updateOptionSchema
};
const Joi = require("joi");

const createPlaylistSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer().required()
});

const updatePlaylistSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer(),
  isActive: Joi.number().integer().valid(0, 1)
});

module.exports = {
  createPlaylistSchema,
  updatePlaylistSchema
};
const Joi = require("joi");

const addVideoToPlaylistSchema = Joi.object({
  playlist_id: Joi.number().integer().required(),
  video_id: Joi.number().integer().required()
});

module.exports = {
  addVideoToPlaylistSchema
};
const Joi = require("joi");

const createQuestionSchema = Joi.object({
  exam_id: Joi.number().integer().required(),
  question_text: Joi.string().required().min(1).max(2000),
  type: Joi.string().required().valid("mcq", "true_false", "essay"),
  order: Joi.number().integer().required().min(1)
});

const updateQuestionSchema = Joi.object({
  question_text: Joi.string().min(1).max(2000),
  type: Joi.string().valid("mcq", "true_false", "essay"),
  order: Joi.number().integer().min(1)
});

module.exports = {
  createQuestionSchema,
  updateQuestionSchema
};
const Joi = require("joi");

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().min(4).max(100),
  newPassword: Joi.string().required().min(4).max(100),
  confirmPassword: Joi.string().required().valid(Joi.ref("newPassword"))
});

module.exports = {
  changePasswordSchema
};
const Joi = require("joi");

const createVideoSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer().required(),
  youtube_url: Joi.string().required().uri().max(255)
});

const updateVideoSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer(),
  youtube_url: Joi.string().uri().max(255),
  isActive: Joi.number().integer().valid(0, 1)
});

module.exports = {
  createVideoSchema,
  updateVideoSchema
};

const getApiAuth = require("../utils/getApiAuth");

const apiMiddelware = (req, res, next) => {
  try {
    const apiHeaders = req.headers.authorization;
    const validAuth = getApiAuth(apiHeaders);
    if (!validAuth) {
      return res.status(401).json({
        success: false,
        message: "Invalid API credentials",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = apiMiddelware;

const assistantAuth = (req, res, next) => {
  if (req.clientRole !== 'assistant') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Assistant only.",
    });
  }
  next();
};

module.exports = assistantAuth;
const getClient = require("../utils/getClient");
const getClientAuth = (req, res, next) => {
  const clientAuth = req.headers["x-client-key"];
  const client = getClient(clientAuth);
  if (!client) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
  req.clientId = client.id;
  req.clientRole = client.role;
  next();
};
module.exports = getClientAuth;

const errorHandler = (err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandler;
const studentAuth = (req, res, next) => {
  if (req.clientRole !== 'student') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Student only.",
    });
  }
  next();
};

module.exports = studentAuth;


const teacherAuth = (req, res, next) => {
  if (req.clientRole !== 'teacher') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Teacher only.",
    });
  }
  next();
};

module.exports = teacherAuth;
module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
