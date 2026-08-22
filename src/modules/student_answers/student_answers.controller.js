const studentAnswerService = require("./student_answers.service");
const fs = require("fs");
const path = require("path");

// Submit answer (MCQ/True-False)
const submitAnswer = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const { question_id, selected_option_id } = req.body;
    const studentId = req.clientId;

    // التحقق من وجود إجابة سابقة
    const existing = await studentAnswerService.checkExistingAnswer(
      examId,
      studentId,
      question_id,
    );

    let answer;
    if (existing) {
      // تحديث الإجابة
      answer = await studentAnswerService.updateAnswer(existing.id, {
        selected_option_id,
        is_correct,
      });
    } else {
      // إدراج إجابة جديدة
      answer = await studentAnswerService.insertAnswer({
        exam_id: examId,
        student_id: studentId,
        question_id,
        selected_option_id,
        is_correct,
      });
    }

    return res.status(200).json({
      success: true,
      message: "تم حفظ الإجابة بنجاح!",
      data: answer,
    });
  } catch (error) {
    next(error);
  }
};

// Submit essay answer with file
const submitEssayAnswer = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const { question_id } = req.body;
    const file_path = req.file ? req.file.path : null;
    const studentId = req.clientId;

    if (!file_path) {
      throw new Error("يجب رفع ملف الإجابة!");
    }

    // التحقق من وجود إجابة سابقة
    const existing = await studentAnswerService.checkExistingAnswer(
      examId,
      studentId,
      question_id,
    );

    let answer;
    if (existing) {
      // حذف الملف القديم
      const oldAnswer = await studentAnswerService.getStudentAnswersByExam(
        examId,
        studentId,
      );
      const oldFile = oldAnswer.find((a) => a.question_id === question_id);
      if (oldFile && oldFile.file_path) {
        const oldFilePath = path.join(
          __dirname,
          "../../../",
          oldFile.file_path,
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      // تحديث الإجابة
      answer = await studentAnswerService.updateEssayAnswer(
        existing.id,
        file_path,
      );
    } else {
      // إدراج إجابة جديدة
      answer = await studentAnswerService.insertEssayAnswer({
        exam_id: examId,
        student_id: studentId,
        question_id,
        file_path,
      });
    }

    return res.status(200).json({
      success: true,
      message: "تم حفظ الإجابة بنجاح!",
      data: answer,
    });
  } catch (error) {
    next(error);
  }
};

// Delete answer
const deleteAnswer = async (req, res, next) => {
  try {
    const { answerId } = req.params;
    const answer = await studentAnswerService.deleteAnswer(answerId);

    if (!answer) {
      throw new Error("فشل حذف الإجابة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم حذف الإجابة بنجاح!",
      data: answer,
    });
  } catch (error) {
    next(error);
  }
};

// Get student answers for an exam
const getStudentAnswersByExam = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const studentId = req.clientId;
    const answers = await studentAnswerService.getStudentAnswersByExam(
      examId,
      studentId,
    );

    return res.status(200).json({
      success: true,
      message: "تم تحميل الإجابات بنجاح!",
      data: answers,
    });
  } catch (error) {
    next(error);
  }
};

// Get question answer stats
const getQuestionAnswerStats = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const stats = await studentAnswerService.getQuestionAnswerStats(questionId);

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

// Get most selected options
const getMostSelectedOptions = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const options =
      await studentAnswerService.getMostSelectedOptions(questionId);

    return res.status(200).json({
      success: true,
      message: "تم تحميل الاختيارات بنجاح!",
      data: options,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitAnswer,
  submitEssayAnswer,
  deleteAnswer,
  getStudentAnswersByExam,
  getQuestionAnswerStats,
  getMostSelectedOptions,
};
