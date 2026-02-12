const Event = require('../models/Event');
const Member = require('../models/Member');

const getStats = async (req, res) => {
  try {
    const [totalEvents, runningEvents, upcomingEvents, finishedEvents, totalMembers, committeeWiseCount] =
      await Promise.all([
        Event.countDocuments(),
        Event.countDocuments({ status: 'running' }),
        Event.countDocuments({ status: 'upcoming' }),
        Event.countDocuments({ status: 'finished' }),
        Member.countDocuments(),
        Member.aggregate([{ $group: { _id: '$committeeYear', count: { $sum: 1 } } }]),
      ]);

    const committeeWiseCountMap = committeeWiseCount.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        totalEvents,
        runningEvents,
        upcomingEvents,
        finishedEvents,
        totalMembers,
        committeeWiseCount: committeeWiseCountMap,
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
