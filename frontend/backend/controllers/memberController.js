const Member = require('../models/Member');

const createMember = async (req, res) => {
  try {
    const { name, designation, bio, committeeYear, socialLinks } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : '';

    if (!name || !committeeYear) {
      return res.status(400).json({
        success: false,
        message: 'Name and committee year are required',
      });
    }

    let social = {};
    if (socialLinks) {
      try {
        social = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
      } catch (e) {
        social = {};
      }
    }

    const member = await Member.create({
      name,
      designation: designation || '',
      photo,
      bio: bio || '',
      committeeYear,
      socialLinks: {
        facebook: social.facebook || '',
        linkedin: social.linkedin || '',
        twitter: social.twitter || '',
      },
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
    const { committeeYear } = req.query;
    const filter = {};
    if (committeeYear) {
      filter.committeeYear = committeeYear;
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

    const { name, designation, bio, committeeYear, socialLinks } = req.body;
    if (req.file) {
      member.photo = `/uploads/${req.file.filename}`;
    }
    if (name !== undefined) member.name = name;
    if (designation !== undefined) member.designation = designation;
    if (bio !== undefined) member.bio = bio;
    if (committeeYear !== undefined) member.committeeYear = committeeYear;
    if (socialLinks !== undefined) {
      try {
        const social = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
        member.socialLinks = {
          facebook: social.facebook ?? member.socialLinks.facebook,
          linkedin: social.linkedin ?? member.socialLinks.linkedin,
          twitter: social.twitter ?? member.socialLinks.twitter,
        };
      } catch (e) {}
    }

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
