const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
      trim: true,
    },
    mobileNumber: {
      type: String,
      default: '',
      trim: true,
    },
    facebookId: {
      type: String,
      default: '',
      trim: true,
    },
    batchType: {
      type: String,
      enum: ['current', 'new'],
      default: 'current',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
