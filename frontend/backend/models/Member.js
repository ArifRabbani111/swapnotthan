const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    designation: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    committeeYear: {
      type: String,
      required: [true, 'Committee year is required'],
      trim: true,
    },
    socialLinks: {
      facebook: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
