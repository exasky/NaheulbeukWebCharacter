var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient

var dbName = "mongodb://localhost/testCharacter";
var dbCollection = "test";

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.query);
  console.log(dbName);
  console.log(dbCollection);
  if (req.query && req.query.name) {
    console.log(req.query.name);
    MongoClient.connect(dbName, function (error, db) {
      if (error) return funcCallback(error);
      db.collection(dbCollection).findOne({ name: req.query.name }, function (error, result) {
        if (error) throw error;
        console.log("Trying to find character");
        console.log(result);
        if (result) {
          console.log(
            "ID : " + result._id.toString() + "\n" +
            "Nom : " + result.name + "\n" +
            "Jeu : " + result.game
          );
          res.write(JSON.stringify(result));
        }
        res.end();
      });
    });
  }
});

router.get('/all', function (req, res, next) {
  MongoClient.connect("mongodb://localhost/testCharacter", function (error, db) {
    if (error) return funcCallback(error);
    db.collection("test").find({}, {"name" : 1, "_id" : 0}).toArray(function(error, result) {
      res.write(JSON.stringify(result));
      res.end();
    });
  });
});

router.post('/', function (req, res) {
  console.log(req.body);
  if (req.body) {
    MongoClient.connect(dbName, function (error, db) {
      if (error) return funcCallback(error);
      db.collection(dbCollection).save(req.body, null, function (error, results) {
        if (error) throw error;
        console.log("Le document a bien été inséré");
        res.end();
      });
    });
  }
})

module.exports = router;