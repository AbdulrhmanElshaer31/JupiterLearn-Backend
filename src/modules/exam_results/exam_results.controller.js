const examResultService = require("./exam_results.service");

// Create exam result
const createExamResult = async (req, res, next) => {
  try {
    const result = await examResultService.createExamResult(req.body);

    if (!result) {
      throw new Error("فشل تسجيل الدرجة حاول مرة أخرى!");
    }

    return res.status(201).json({
      success: true,
      message: "تم تسجيل الدرجة بنجاح!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Upsert exam result
const upsertExamResult = async (req, res, next) => {
  try {
    const result = await examResultService.upsertExamResult(req.body);

    if (!result) {
      throw new Error("فشل تسجيل الدرجة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تسجيل الدرجة بنجاح!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Upsert batch exam results
const upsertBatchExamResults = async (req, res, next) => {
  try {
    const { records } = req.body;

    const results = await examResultService.upsertBatchExamResults(records);

    if (!results) {
      throw new Error("فشل تسجيل الدرجات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تسجيل الدرجات بنجاح!",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// Update exam result
const updateExamResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await examResultService.updateExamResult(id, req.body);

    if (!result) {
      throw new Error("فشل تعديل الدرجة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تعديل الدرجة بنجاح!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Delete exam result
const deleteExamResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await examResultService.deleteExamResult(id);

    if (!result) {
      throw new Error("فشل حذف الدرجة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم حذف الدرجة بنجاح!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get exam results
const getExamResults = async (req, res, next) => {
  try {
    const { examId } = req.params;

    const results = await examResultService.getExamResults(examId);

    if (!results) {
      throw new Error("فشل تحميل الدرجات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الدرجات بنجاح!",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// Get exam result stats
const getExamResultStats = async (req, res, next) => {
  try {
    const { examId } = req.params;

    const stats = await examResultService.getExamResultStats(examId);

    if (!stats) {
      throw new Error("فشل تحميل الإحصائيات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الإحصائيات بنجاح!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get grade exam results stats
const getGradeExamResultsStats = async (req, res, next) => {
  try {
    const { gradeId } = req.params;

    const stats = await examResultService.getGradeExamResultsStats(gradeId);

    if (!stats) {
      throw new Error("فشل تحميل الإحصائيات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الإحصائيات بنجاح!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get group exam results stats
const getGroupExamResultsStats = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const stats = await examResultService.getGroupExamResultsStats(groupId);

    if (!stats) {
      throw new Error("فشل تحميل الإحصائيات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الإحصائيات بنجاح!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExamResult,
  upsertExamResult,
  upsertBatchExamResults,
  updateExamResult,
  deleteExamResult,
  getExamResults,
  getExamResultStats,
  getGradeExamResultsStats,
  getGroupExamResultsStats,
};
