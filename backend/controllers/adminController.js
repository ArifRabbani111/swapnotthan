const Event = require('../models/Event');
const Member = require('../models/Member');

const getStats = async (req, res) => {
  try {
    const [
      totalEvents,
      totalFeaturedEvents,
      totalPreviousEvents,
      totalMembers,
      totalCurrentBatch,
      totalNewBatch,
    ] = await Promise.all([
      Event.countDocuments(),
      Event.countDocuments({ category: 'featured' }),
      Event.countDocuments({ category: 'previous' }),
      Member.countDocuments(),
      Member.countDocuments({ batchType: 'current' }),
      Member.countDocuments({ batchType: 'new' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEvents,
        totalFeaturedEvents,
        totalPreviousEvents,
        totalMembers,
        totalCurrentBatch,
        totalNewBatch,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = { getStats };
