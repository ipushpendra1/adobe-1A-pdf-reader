const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true
  }
});

const upload = mongoose.model("uploads", uploadSchema);
module.exports = upload;
