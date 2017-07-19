var router = require('express').Router();
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

var dbUrl = "mongodb://localhost/testCharacter";
var dbCollection = "test";

var database;

MongoClient.connect(dbUrl, (err, db) => {
  if (err) return console.log(err)
  database = db;
  console.log("[MONGO] Connected to db: " + dbUrl);
})

// GET : get one
router.get('/:characterId', function (req,res){
    console.log("character details : " + req.params.characterId);
    if (req.params.characterId) {
        database.collection(dbCollection).findOne({_id : new ObjectId(req.params.characterId)}, (err, result) => {
            if (err) processError(err, res);
            res.write(JSON.stringify(result));
            res.end();
        });
    } else {
        processError("No id defined in get request", res);
    }
});

// GET : get all
router.get('/', function (req,res){
    database.collection(dbCollection).find().toArray(function(err, result) {
        if (err) processError(err, res);
        res.write(JSON.stringify(result));
        res.end();
    });
});

// POST : create
router.post('/', function(req, res){
    if (req.body) {
        console.log('character created');
        database.collection(dbCollection).insert(req.body, (err, result) => {
            if (err) processError(err, res);
            console.log('saved to database: ' + JSON.stringify(result.insertedIds));
            res.write(JSON.stringify(result.insertedIds));
            res.end();
        });
    } else {
        processError("No input defined in create request", res);
    }
});

// PUT : update one
router.put('/:characterId', function(req, res){
    console.log('character updated : ' + req.params.characterId);
    if (req.params.characterId) {
        var character = req.body;
        character._id = new ObjectId(req.params.characterId);
        database.collection(dbCollection).save(character, (err, result) => {
            if (err) processError(err, res);
            console.log('saved to database');
            res.end();
        });
    } else {
        processError("No id defined in update request", res);
    }
})

// DELETE : delete
router.delete('/:characterId', function(req, res){
    if (req.params.characterId) {
        console.log('character deleted : ' + req.params.characterId)
        database.collection(dbCollection).remove({_id : new ObjectId(req.params.characterId)}, (err, result) => {
            if (err) processError(err, res);
            res.send('character deleted');
            res.end();
        });
    } else {
        processError("No id defined in delete request", res);
    }
});

function processError(error, response) {
    console.log(error);
    response.send(500, error);
    response.end();
}

module.exports = router;