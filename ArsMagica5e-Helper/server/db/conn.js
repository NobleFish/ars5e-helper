// Requirements
const { MongoClient } = require("mongodb");

// DB URI from config.env
const Db = process.env.DB_URI;

// Setup mongo client pre-connection
const client = new MongoClient(Db, {
  serverSelectionTimeoutMS: process.env.CONNECTION_TIMEOUT,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// DB object can be called across the app
var _db;
var connected = false; // Flag to track whether already connected

// Public functions for database connection
module.exports = {
  connectToServer: function (callback) {
    // Check if already connected
    if (connected) {
      return callback(null);
    }

    client.connect().then(
      (connection) => {
        _db = connection.db("ars5-db");
        console.log("Successfully connected to MongoDB.");
        connected = true; // Set the connected flag
        return callback(null);
      },
      (err) => {
        return callback(err);
      }
    );
  },

  // Function getting currently connected db information
  getDb: function () {
    return _db;
  },

  // Close the MongoDB connection
  closeConnection: async function () {
    if (connected) {
      await client.close();
      console.log("MongoDB connection closed.");
      connected = false; // Reset the connected flag
    }
  },
};
