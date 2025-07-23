const app = require("./src/app");
const connectDB = require("./src/db/db");
const config = require("./src/config/config");

connectDB();

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
