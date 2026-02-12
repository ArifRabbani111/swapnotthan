const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, description, date, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: 'Title and date are required',
      });
    }

    const event = await Event.create({
      title,
      description: description || '',
      image,
      date,
      status: status || 'upcoming',
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
    const { status } = req.query;
    const filter = {};
    if (status && ['running', 'upcoming', 'finished'].includes(status)) {
      filter.status = status;
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

    const { title, description, date, status } = req.body;
    if (req.file) {
      event.image = `/uploads/${req.file.filename}`;
    }
    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;
    if (status !== undefined) event.status = status;

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
