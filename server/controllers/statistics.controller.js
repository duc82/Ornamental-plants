const statisticsService = require("../services/statistics.service");

const getStatistics = async (req, res) => {
  const statistics = await statisticsService.getStatistics();
  return res.status(200).json(statistics);
};

module.exports = {
  getStatistics,
};
