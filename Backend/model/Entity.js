const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Entity", entitySchema);
