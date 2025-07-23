const mongoose = require("mongoose");
const config = require("../config/config");

function connectDB() {
  mongoose.connect(config.MONGODB_URL)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error", err));
}

module.exports = connectDB;
