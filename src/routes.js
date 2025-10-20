const express = require("express");
const router = express.Router();
const personRoutes = require("../routes/person/person.routes");
const monitoringRoutes = require("../routes/monitoring/monitoring.routes");
// const saleRoutes = require("../routes/sale/sale.routes");
// const authRoutes = require("../routes/auth/auth.routes");
// const checkRoutes = require("../routes/check/check.routes");
// const meiRoutes = require("../routes/mei/mei.routes");
// const countRoutes = require("../routes/count/count.routes");

router.use("/api/person", personRoutes);
router.use("/api/monitoring", monitoringRoutes);
// router.use("/api/sale", saleRoutes);
// router.use("/api/auth", authRoutes);
// router.use("/api/check", checkRoutes);
// router.use("/api/mei", meiRoutes);
// router.use("/api/count", countRoutes);

module.exports = router;
