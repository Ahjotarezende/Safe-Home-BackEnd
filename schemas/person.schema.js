const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cpf: String,
    address: {
        street: String,
        house: Number,
        neighborhood: String,
        city: String,
    },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    monitored: [{ type: ObjectId, ref: "Person" }]
}, {
    timestamps: true
});

module.exports = personSchema;
