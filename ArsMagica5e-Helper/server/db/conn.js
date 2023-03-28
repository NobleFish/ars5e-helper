// Requirements
const { MongoClient } = require("mongodb");

// DB URI from config.env
const Db = process.env.DB_URI

// Setup mongo client pre-connection
const client = new MongoClient(Db, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// DB object can be called across app
var _db; 

// Public functions for database connection
module.exports = 
{
    connectToServer: function(callback){
      
      MongoClient.connect(Db).then(function (db) {
        _db = db.db(process.env.DB_NAME);
        console.log("Successfully connected to MongoDB.")
      }).catch(function(err) {
        return callback(err);
      });

    },

    // Function getting currently connected db information
    getDb: function()
    {
        return _db;
    }
}