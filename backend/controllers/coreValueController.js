const CoreValue = require('../models/CoreValue');

const getCoreValues = async (req, res) => {
  try {
    const coreValues = await CoreValue.find().sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      count: coreValues.length,
      data: coreValues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const createCoreValue = async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }
    const coreValue = await CoreValue.create({ title, description: description || '', icon: icon || '' });
    res.status(201).json({
      success: true,
      data: coreValue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const updateCoreValue = async (req, res) => {
  try {
    const coreValue = await CoreValue.findById(req.params.id);
    if (!coreValue) {
      return res.status(404).json({
        success: false,
        message: 'Core value not found',
      });
    }
    const { title, description, icon } = req.body;
    if (title !== undefined) coreValue.title = title;
    if (description !== undefined) coreValue.description = description;
    if (icon !== undefined) coreValue.icon = icon;
    await coreValue.save();
    res.status(200).json({
      success: true,
      data: coreValue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const deleteCoreValue = async (req, res) => {
  try {
    const coreValue = await CoreValue.findByIdAndDelete(req.params.id);
    if (!coreValue) {
      return res.status(404).json({
        success: false,
        message: 'Core value not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Core value deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = {
  getCoreValues,
  createCoreValue,
  updateCoreValue,
  deleteCoreValue,
};
