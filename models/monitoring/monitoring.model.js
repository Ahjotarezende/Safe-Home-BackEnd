const mongoose = require("mongoose");
const monitoringSchema = require("../../schemas/monitoring.schema");

const monitoring = mongoose.model("Monitoring", monitoringSchema);

module.exports = monitoring;