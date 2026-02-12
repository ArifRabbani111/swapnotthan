const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const eventUpload = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
]);

router.route('/').get(getEvents).post(protect, eventUpload, createEvent);
router
  .route('/:id')
  .put(protect, eventUpload, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;
