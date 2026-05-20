const Member = require('../models/Member');

const createMember = async (req, res) => {
  try {
    const { name, email, mobileNumber, facebookId, batchType } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : '';

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    const member = await Member.create({
      name,
      photo,
      email: email || '',
      mobileNumber: mobileNumber || '',
      facebookId: facebookId || '',
      batchType: batchType || 'current',
    });

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const getMembers = async (req, res) => {
  try {
    const { batchType } = req.query;
    const filter = {};
    if (batchType && ['current', 'new'].includes(batchType)) {
      filter.batchType = batchType;
    }

    const members = await Member.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found',
      });
    }

    const { name, email, mobileNumber, facebookId, batchType } = req.body;
    if (req.file) {
      member.photo = `/uploads/${req.file.filename}`;
    }
    if (name !== undefined) member.name = name;
    if (email !== undefined) member.email = email;
    if (mobileNumber !== undefined) member.mobileNumber = mobileNumber;
    if (facebookId !== undefined) member.facebookId = facebookId;
    if (batchType !== undefined) member.batchType = batchType;

    await member.save();

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Member deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = {
  createMember,
  getMembers,
  updateMember,
  deleteMember,
};
