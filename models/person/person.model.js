const mongoose = require("mongoose");
const PersonSchema = require("../../schemas/person.schema");

const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;