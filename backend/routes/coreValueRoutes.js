const express = require('express');
const router = express.Router();
const {
  getCoreValues,
  createCoreValue,
  updateCoreValue,
  deleteCoreValue,
} = require('../controllers/coreValueController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getCoreValues).post(protect, createCoreValue);
router.route('/:id').put(protect, updateCoreValue).delete(protect, deleteCoreValue);

module.exports = router;
