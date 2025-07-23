import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import config from "./src/config/config.js";

connectDB();

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
