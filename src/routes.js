const express = require("express");
const router = express.Router();
const personRoutes = require("../routes/person/person.routes");
const monitoringRoutes = require("../routes/monitoring/monitoring.routes");

router.use("/api/person", personRoutes);
router.use("/api/monitoring", monitoringRoutes);

module.exports = router;
