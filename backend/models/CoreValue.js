const mongoose = require('mongoose');

const coreValueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      enum: ['School Wing', 'Blood Wing', 'Charity Wing'],
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CoreValue', coreValueSchema);
