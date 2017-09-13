var express = require('express');
var bucketListRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017/bucketList', function(err, database){
    if(err) return;
    db = database;
})

bucketListRouter.get('/', function(req, res){
    db.collection('bucketList').find().toArray(function(err, result){
        if(err) console.log("ERROR: " + err.toString());
        res.json(result);
    });
});

bucketListRouter.post('/', function(req, res){
    db.collection('bucketList').insertOne(req.body)
    db.collection('bucketList').find().toArray(function(err, result){
        if (err) console.log("ERROR: " + err.toString());
        res.json(result);
    })
})

module.exports = bucketListRouter;