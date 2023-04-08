const express = require("express");

// covenantRoutes will handle all requests that start with /covenant
const covenantRoutes = express.Router();

// Gets the database driver
const dbo = require("../db/conn");

// This will convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This route will return an array of all the covenants in the collection.
covenantRoutes.route("/covenant/").get(function (req, res) {
    
    // Database object
    let db_connect = dbo.getDb();
    
    // Connects to the collection, finds all, converts to array, responds.
    db_connect
        .collection("covenants")
        .find({})
        .toArray()
        .then(
            covenantArray => {res.json(covenantArray)},
            err => {console.error(err); throw err;}
        );
});

// This route will return single covenant by id
covenantRoutes.route("/covenant/:id").get(function (req, res) {
    // Database object
    let db_connect = dbo.getDb();

    // Structure of query, _id matches id in url
    let covenantFromID = { _id: new ObjectId(req.params.id) };
    // Connects to collection, finds match from id, returns that entry.
    db_connect
        .collection("covenants")
        .findOne(covenantFromID)
        .then(
            covenant => {res.json(covenant);},
            err => {console.error(err); throw err;}
        );
});

// This route will add a covenant to the database.
covenantRoutes.route("/covenant/add").post(function (req, res) {
    // Database object
    let db_connect = dbo.getDb();

    // Reframing the body data to a json object
    let covenantObj = {
        covenant_name: req.body.covenant_name,
        covenant_type: req.body.covenant_type
    };

    // Connects to collection, inserts object into db, logs confirm to console.
    db_connect
        .collection("covenants")
        .insertOne(covenantObj)
        .then(
            confirm => {console.log(covenantObj.covenant_name+" created."); res.json(confirm);},
            err => {console.error(err); throw err;}
        )

});

// This route will let you update a covenant by id
covenantRoutes.route("/covenant/update/:id").post(function (req, res) {

    // Database object
    let db_connect = dbo.getDb();

    // Structure of query, _id matches id in url
    let covenantFromID = { _id: new ObjectId(req.params.id) };

    // New covenant object
    let newCovenant = {
        $set: {
            covenant_name: req.body.covenant_name,
            covenant_type: req.body.covenant_type
        }
    };

    // Connects to collection, updates covenant by id.
    db_connect
        .collection("covenants")
        .updateOne(covenantFromID, newCovenant)
        .then(
            confirm => {res.json(confirm)},
            err => {console.error(err)}
        );
});

// This route uses the delete method to delete a covenant
covenantRoutes.route("/covenant/:id").delete((req, response) => {
    // Database object
    let db_connect = dbo.getDb();

    // Structure of query, _id matches id in url
    let covenantFromID = { _id: new ObjectId(req.params.id) };
    
    // Connects to collection, updates covenant by id.
    db_connect
        .collection("covenants")
        .deleteOne(covenantFromID)
        .then(
            confirm => {console.log("Covenant deleted"); response.json(confirm);},
            err => {console.error(err);}
        )
});

module.exports = covenantRoutes;