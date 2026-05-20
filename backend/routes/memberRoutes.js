const express = require('express');
const router = express.Router();
const {
  createMember,
  getMembers,
  updateMember,
  deleteMember,
} = require('../controllers/memberController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getMembers).post(protect, upload.single('photo'), createMember);
router
  .route('/:id')
  .put(protect, upload.single('photo'), updateMember)
  .delete(protect, deleteMember);

module.exports = router;
