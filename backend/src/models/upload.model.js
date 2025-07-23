import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true
  }
});

const upload = mongoose.model("uploads", uploadSchema);
export default upload;
