const Joi = require("joi");


// Create a new student (assistant/super admin)
const createStudentSchema = Joi.object({
  barcode: Joi.string().required().min(1).max(50),
  full_name: Joi.string().required().min(3).max(255),
  phone: Joi.string().allow("", null).min(8).max(20),
  parent_phone: Joi.string().allow("", null).min(8).max(20),
  parent_token: Joi.string().required().min(10).max(255),
  grade_id: Joi.number().integer().required(),
  group_id: Joi.number().integer().required(),
  notes: Joi.string().allow("", null).max(1000),
});

// Update a student's full information (assistant/super admin)
const updateStudentSchema = Joi.object({
  barcode: Joi.string().min(1).max(50),
  full_name: Joi.string().min(3).max(255),
  phone: Joi.string().allow("", null).min(8).max(20),
  parent_phone: Joi.string().allow("", null).min(8).max(20),
  grade_id: Joi.number().integer(),
  group_id: Joi.number().integer(),
  notes: Joi.string().allow("", null).max(1000),
}).min(1); // At least one field required

// Update student's password (student self-update)
const updateStudentPasswordSchema = Joi.object({
  oldPassword: Joi.string().required().min(4).max(100),
  newPassword: Joi.string().required().min(4).max(100),
  confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")),
});

// Update student's profile image (student self-update)
const updateStudentProfileImageSchema = Joi.object({
  profile_image: Joi.string().required().max(255),
});

// Get students with filters (assistant/super admin)
const getAllStudentsSchema = Joi.object({
  search: Joi.string().allow("", null).max(255),
  grade_id: Joi.number().integer().allow(null),
  group_id: Joi.number().integer().allow(null),
  page: Joi.number().integer().min(1).default(1),
});

// Get student attendance history (with month filter)
const getAttendanceHistorySchema = Joi.object({
  month: Joi.string().allow("", null).pattern(/^\d{4}-\d{2}$/),
  page: Joi.number().integer().min(1).default(1),
});

// Get student total attendance for a specific month
const getStudentTotalAttendanceSchema = Joi.object({
  month: Joi.string().required().pattern(/^\d{4}-\d{2}$/),
});

// Get student payment history (with month filter)
const getPaymentHistorySchema = Joi.object({
  month: Joi.string().allow("", null).pattern(/^\d{4}-\d{2}$/),
  page: Joi.number().integer().min(1).default(1),
});

// Get student paper exams (with month filter)
const getStudentPaperExamsSchema = Joi.object({
  month: Joi.string().allow("", null).pattern(/^\d{4}-\d{2}$/),
  page: Joi.number().integer().min(1).default(1),
});

// Get student exam results (with month filter)
const getStudentExamResultsSchema = Joi.object({
  month: Joi.string().allow("", null).pattern(/^\d{4}-\d{2}$/),
  page: Joi.number().integer().min(1).default(1),
});

// Get student online exams (with month filter)
const getStudentOnlineExamsSchema = Joi.object({
  month: Joi.string().allow("", null).pattern(/^\d{4}-\d{2}$/),
  page: Joi.number().integer().min(1).default(1),
});

// Get student assignments (with month filter)
const getStudentAssignmentsSchema = Joi.object({
  month: Joi.string().allow("", null).pattern(/^\d{4}-\d{2}$/),
  page: Joi.number().integer().min(1).default(1),
});

// Get student submissions (with month filter)
const getStudentSubmissionsSchema = Joi.object({
  month: Joi.string().allow("", null).pattern(/^\d{4}-\d{2}$/),
  page: Joi.number().integer().min(1).default(1),
});

module.exports = {
  createStudentSchema,
  updateStudentSchema,
  updateStudentPasswordSchema,
  updateStudentProfileImageSchema,
  getAllStudentsSchema,
  getAttendanceHistorySchema,
  getStudentTotalAttendanceSchema,
  getPaymentHistorySchema,
  getStudentPaperExamsSchema,
  getStudentExamResultsSchema,
  getStudentOnlineExamsSchema,
  getStudentAssignmentsSchema,
  getStudentSubmissionsSchema,
};