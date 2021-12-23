//creating mongoose Schema

const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: { type: [String] },
  date: { type: Date, default: Date.now },
});
//creating mongoose model
const Person = mongoose.model("Person", personSchema);
//export the mongoose model
module.exports = Person;
