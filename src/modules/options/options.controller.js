const optionService = require("./options.service");

const getOptionsByQuestionId = async (req, res, next) => {
  try {
    const options = await optionService.getOptionsByQuestionId(
      req.params.questionId,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: options,
    });
  } catch (error) {
    next(error);
  }
};

const getOptionById = async (req, res, next) => {
  try {
    const option = await optionService.getOptionById(req.params.optionId);
    if (!option) throw new Error("Option Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

const createOption = async (req, res, next) => {
  try {
    const { questionId, optionText, isCorrect, order } = req.body;
    const option = await optionService.createOption(
      questionId,
      optionText,
      isCorrect,
      order,
    );
    return res.status(201).json({
      success: true,
      message: "Option Created!",
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

const updateOption = async (req, res, next) => {
  try {
    const { optionText, isCorrect, order } = req.body;
    const option = await optionService.updateOption(
      req.params.optionId,
      optionText,
      isCorrect,
      order,
    );
    if (!option) throw new Error("Option Not Found!");
    return res.status(200).json({
      success: true,
      message: "Option Updated!",
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOption = async (req, res, next) => {
  try {
    const option = await optionService.deleteOption(req.params.optionId);
    if (!option) throw new Error("Option Not Found!");
    return res.status(200).json({
      success: true,
      message: "Option Deleted!",
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOptionsByQuestionId,
  getOptionById,
  createOption,
  updateOption,
  deleteOption,
};
