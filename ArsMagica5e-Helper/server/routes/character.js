const express = require("express");
const { validationResult } = require("express-validator");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Create a middleware function for error handling
function handleErrors(res, err, message) {
    console.error(err);
    res.status(500).json({ error: message });
}

// Example: Middleware to handle MongoDB queries
async function queryDatabase(collectionName, query, res, successMessage) {
    try {
        let db_connect = dbo.getDb();
        let result = await db_connect.collection(collectionName).findOne(query);

        if (!result) {
            res.status(404).json({ error: "Not found" });
        } else {
            res.json(result);
            console.log(successMessage);
        }
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
}

// characterRoutes will handle all requests that start with /character
const characterRoutes = express.Router();

// This route will return an array of all the characters in the collection.
characterRoutes.route("/character/").get(async function (req, res) {
    try {
        let db_connect = dbo.getDb();
        let characterArray = await db_connect.collection("characters").find({}).toArray();
        res.json(characterArray);
        console.log("Characters retrieved");
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
});

// This route will return a single character by id
characterRoutes.route("/character/:id").get(async function (req, res) {
    let db_connect = dbo.getDb();
    let characterFromID = { _id: new ObjectId(req.params.id) };
    await queryDatabase("characters", characterFromID, res, "Character found");
});

// This route will add a character to the database.
characterRoutes.route("/character/add").post(async function (req, res) {
    try {
        let db_connect = dbo.getDb();
        let characterObj = {
            character_name: req.body.character_name,
            character_type: req.body.character_type
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation Error", errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        await db_connect.collection("characters").insertOne(characterObj);
        res.json({ success: "Character created" });
        console.log("Character Added");
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
});

// This route will let you update a character by id
characterRoutes.route("/character/update/:id").post(async function (req, res) {
    let db_connect = dbo.getDb();
    let characterFromID = { _id: new ObjectId(req.params.id) };
    let newCharacter = {
        $set: {
            character_name: req.body.character_name,
            character_type: req.body.character_type
        }
    };

    try {
        let result = await db_connect.collection("characters").updateOne(characterFromID, newCharacter);

        if (result.modifiedCount === 0) {
            res.status(404).json({ error: "Character not found" });
        } else {
            res.json({ success: "Character updated" });
            console.log("Character Updated");
        }
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
});

// This route uses the delete method to delete a character
characterRoutes.route("/character/:id").delete(async (req, res) => {
    let db_connect = dbo.getDb();
    let characterFromID = { _id: new ObjectId(req.params.id) };

    try {
        let result = await db_connect.collection("characters").deleteOne(characterFromID);

        if (result.deletedCount === 0) {
            res.status(404).json({ error: "Character not found" });
        } else {
            console.log("Character deleted");
            res.json({ success: "Character deleted" });
        }
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
});

module.exports = characterRoutes;
