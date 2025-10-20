const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const monitoringSchema = new mongoose.Schema({
    description: { type: String, required: true },
    severity: { type: String, required: true },
    monitored: { type: ObjectId, required: true, ref: "Monitored" },
    location: { type: String, required: true },
    type: {
        type: String,
        enum: ['incident', 'fall'],
        required: true
    }
}, {
    timestamps: true
});

module.exports = monitoringSchema;