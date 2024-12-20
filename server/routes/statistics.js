const router = require("express").Router();
const { getStatistics } = require("../controllers/statistics.controller");
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, verifyAdmin, getStatistics);

module.exports = router;
