const express = require("express");

// characterRoutes will handle all requests that start with /character
const characterRoutes = express.Router();

// Gets the database driver
const dbo = require("../db/conn");

// This will convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This route will return an array of all the characters in the collection.
characterRoutes.route("/character").get(function (req, res) {
    
    // Database object
    let db_connect = dbo.getDb();
    
    // Connects to the collection, finds all, converts to array, responds.
    db_connect
        .collection("characters")
        .find({})
        .toArray()
        .then(
            characterArray => {res.json(characterArray)},
            err => {console.error(err); throw err;}
        );
});

// This route will return single character by id
characterRoutes.route("/character/:id").get(function (req, res) {
    
    // Database object
    let db_connect = dbo.getDb();

    // Structure of query, _id matches id in url
    let characterFromID = { _id: new ObjectId(req.params.id) };

    // Connects to collection, finds match from id, returns that entry.
    db_connect
        .collection("character")
        .findOne(characterFromID)
        .then(
            character => {res.json(character)},
            err => {console.error(err); throw err;}
        );
});

// This route will add a character to the database.
characterRoutes.route("/character/add").post(function (req, res) {
    // Database object
    let db_connect = dbo.getDb();

    // Reframing the body data to a json object
    let characterObj = {
        character_name: req.body.character_name,
        character_type: req.body.character_type
    };

    // Connects to collection, inserts object into db, logs confirm to console.
    db_connect
        .collection("characters")
        .insertOne(characterObj)
        .then(
            confirm => {console.log(characterObj.character_name+" created."); res.json(confirm);},
            err => {console.error(err); throw err;}
        )

});

// This route will let you update a character by id
characterRoutes.route("/character/update/:id").post(function (req, res) {
    // Database object
    let db_connect = dbo.getDb();

    // Structure of query, _id matches id in url
    let characterFromID = { _id: new ObjectId(req.params.id) };

    // New character object
    let newCharacter = {
        $set: {
            character_name: req.body.character_name,
            character_type: req.body.character_type
        }
    };

    // Connects to collection, updates character by id.
    db_connect
        .collection("characters")
        .updateOne(characterFromID, newCharacter)
        .then(
            confirm => {res.json(confirm)},
            err => {console.error(err)}
        );
});

// This route uses the delete method to delete a character
characterRoutes.route("character/:id").delete((req, response) => {
    // Database object
    let db_connect = dbo.getDb();

    // Structure of query, _id matches id in url
    let characterFromID = { _id: new ObjectId(req.params.id) };
    
    // Connects to collection, updates character by id.
    db_connect
        .collection("characters")
        .deleteOne(characterFromID)
        .then(
            confirm => {console.log("Character deleted"); response.json(confirm);},
            err => {console.error(err);}
        )
});

module.exports = characterRoutes;