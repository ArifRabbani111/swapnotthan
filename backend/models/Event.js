const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ['featured', 'previous'],
      default: 'featured',
    },
    eventType: {
      type: String,
      enum: ['new', 'old'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
