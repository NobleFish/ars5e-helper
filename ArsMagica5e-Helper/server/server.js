// Constant Requirements for the App Dependencies
const express = require("express");
const app = express();
const cors = require("cors");

// Load the Environment Configuration 
require("dotenv").config({path: "./config.env"});

// Server Port
const port = process.env.SERVER_PORT;

// Associate cors & express.json() with the app
app.use(cors());
app.use(express.json());

// Associate routes with app
app.use(require("./routes/character"));

// Database Object / Driver 
const dbo = require("./db/conn");

// Open App on given port
app.listen(port, () => 
{
    // Database connection on server start.
    dbo.connectToServer(function (err)
    {
        if(err){
            console.error(err);
            console.error("Could not connect to MongoDB");
            process.exit();
        }
    });

    // Server prints current port
    console.log("Server is running on port: %s", port);

})