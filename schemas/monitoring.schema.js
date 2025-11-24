const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const monitoringSchema = new mongoose.Schema({
    description: { type: String, required: true },
    severity: { type: String, enum: ['low', 'mid', 'high'], required: true },
    monitored: { type: ObjectId, required: true, ref: "Person" },
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