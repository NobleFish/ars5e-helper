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

// covenantRoutes will handle all requests that start with /covenant
const covenantRoutes = express.Router();

// This route will return an array of all the covenants in the collection.
covenantRoutes.route("/covenant/").get(async function (req, res) {
    try {
        let db_connect = dbo.getDb();
        let covenantArray = await db_connect.collection("covenants").find({}).toArray();
        res.json(covenantArray);
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
});

// This route will return a single covenant by id
covenantRoutes.route("/covenant/:id").get(async function (req, res) {
    let db_connect = dbo.getDb();
    let covenantFromID = { _id: new ObjectId(req.params.id) };
    await queryDatabase("covenants", covenantFromID, res, "Covenant found");
});

// This route will add a covenant to the database.
covenantRoutes.route("/covenant/add").post(async function (req, res) {
    try {
        let db_connect = dbo.getDb();
        let covenantObj = {
            covenant_name: req.body.covenant_name,
            covenant_type: req.body.covenant_type
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation Error");
            return res.status(400).json({ errors: errors.array() });
        }

        await db_connect.collection("covenants").insertOne(covenantObj);
        res.json({ success: "Covenant created" });
        console.log("Covenant Added");
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
});

// This route will let you update a covenant by id
covenantRoutes.route("/covenant/update/:id").post(async function (req, res) {
    let db_connect = dbo.getDb();
    let covenantFromID = { _id: new ObjectId(req.params.id) };
    let newCovenant = {
        $set: {
            covenant_name: req.body.covenant_name,
            covenant_type: req.body.covenant_type
        }
    };

    try {
        let result = await db_connect.collection("covenants").updateOne(covenantFromID, newCovenant);

        if (result.modifiedCount === 0) {
            res.status(404).json({ error: "Covenant not found" });
        } else {
            res.json({ success: "Covenant updated" });
        }
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
});

// This route uses the delete method to delete a covenant
covenantRoutes.route("/covenant/:id").delete(async (req, res) => {
    let db_connect = dbo.getDb();
    let covenantFromID = { _id: new ObjectId(req.params.id) };

    try {
        let result = await db_connect.collection("covenants").deleteOne(covenantFromID);

        if (result.deletedCount === 0) {
            res.status(404).json({ error: "Covenant not found" });
        } else {
            console.log("Covenant deleted");
            res.json({ success: "Covenant deleted" });
        }
    } catch (err) {
        handleErrors(res, err, "Internal Server Error");
    }
});

module.exports = covenantRoutes;
