const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, description, date, category, eventType } = req.body;
    const coverImage = req.files?.coverImage?.[0] ? `/uploads/${req.files.coverImage[0].filename}` : '';
    const galleryImages = (req.files?.galleryImages || []).map((f) => `/uploads/${f.filename}`);

    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: 'Title and date are required',
      });
    }

    const event = await Event.create({
      title,
      description: description || '',
      coverImage,
      galleryImages,
      date,
      category: category || 'featured',
      eventType: eventType || 'new',
    });

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const { category, eventType } = req.query;
    const filter = {};
    if (category && ['featured', 'previous'].includes(category)) {
      filter.category = category;
    }
    if (eventType && ['new', 'old'].includes(eventType)) {
      filter.eventType = eventType;
    }

    const events = await Event.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    const { title, description, date, category, eventType } = req.body;
    if (req.files?.coverImage?.[0]) {
      event.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    }
    if (req.files?.galleryImages?.length) {
      const newGallery = (req.files.galleryImages || []).map((f) => `/uploads/${f.filename}`);
      event.galleryImages = [...(event.galleryImages || []), ...newGallery];
    }
    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;
    if (category !== undefined) event.category = category;
    if (eventType !== undefined) event.eventType = eventType;

    await event.save();

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
