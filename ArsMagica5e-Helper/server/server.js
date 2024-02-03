// Constant Requirements for the App Dependencies
const express = require("express");
const app = express();
const cors = require("cors");

// Load the Environment Configuration
require("dotenv").config({ path: "./config.env" });

// Server Port
const port = process.env.SERVER_PORT;

// Associate cors & express.json() with the app
app.use(cors());
app.use(express.json());

// Associate routes with app
app.use(require("./routes/character"));
app.use(require("./routes/covenant"));

// Database Object / Driver
const dbo = require("./db/conn");

// Open App on the given port
const server = app.listen(port, () => {
  // Database connection on server start.
  dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      console.error("Could not connect to MongoDB");
      process.exit(1); // Exit with an error code
    }
  });

  // Server prints the current port
  console.log("Server is running on port: %s", port);
});

// Gracefully close MongoDB connection on server shutdown
process.on("SIGINT", async () => {
  try {
    await dbo.closeConnection();
    console.log("Server shutting down. MongoDB connection closed.");
    process.exit(0); // Exit without an error code
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1); // Exit with an error code
  }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  server.close(() => process.exit(1)); // Close the server and exit with an error code
});
