const { log } = require("console");
const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/database");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// Connect to the database
connectDatabase();

// Set default port if not specified in environment
const PORT = process.env.PORT;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});
