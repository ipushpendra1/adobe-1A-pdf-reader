const express = require("express");
const uploadRoutes = require("./routes/upload.routes");

const app = express();
app.use(express.json());
app.use("/post", uploadRoutes);

module.exports = app;
