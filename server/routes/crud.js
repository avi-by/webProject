let path = require("path");
let express = require("express");

var app = express.Router();

const body_parser = require("body-parser");

const db = require("../lib/db");
const dbName = "data";
const collectionName = "items";

db.initialize(
  dbName,
  collectionName,
  function(dbCollection) {
    // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);

      // << return response to client >>
    });

    // << ADD Record >>
    app.post("/AddRecord", (request, response) => {
      const item = request.body;
      dbCollection.insertOne(item, (error, result) => {
        // callback of insertOne
        if (error) throw error;
        // return updated list
        dbCollection.find().toArray((_error, _result) => {
          // callback of find
          if (_error) throw _error;
          response.json(_result);
        });
      });
    });

    //  <<Read first Record>>
    app.get("/ReadFirst", (request, response) => {
      dbCollection.findOne({}, (error, result) => {
        if (error) throw error;
        // return item
        response.json(result);
      });
    });

    //<<Read all records>>
    app.get("/ReadAll", (request, response) => {
      // return updated list
      dbCollection.find().toArray((error, result) => {
        if (error) throw error;
        response.json(result);
      });
    });

    //<< you can update a record  by giving  id of the record and the  data in the  PUT request should be the key values and values you want to update in this record>>
    app.put("/UpdateRecord/:id", (request, response) => {
      const itemId = request.params.id;
      const item = request.body;
      console.log("Editing item: ", itemId, " to be ", item);

      dbCollection.updateOne({id: itemId}, {$set: item}, (error, result) => {
        if (error) throw error;
        // send back entire updated list, to make sure frontend data is up-to-date
        dbCollection.find().toArray(function(_error, _result) {
          if (_error) throw _error;
          response.json(_result);
        });
      });
    });

    //<<delete a record by giving id>>

    app.delete("/DeleteRecord/:id", (request, response) => {
      const itemId = request.params.id;
      console.log("Delete item with id: ", itemId);

      dbCollection.deleteOne({id: itemId}, function(error, result) {
        if (error) throw error;
        // send back entire updated list after successful request
        dbCollection.find().toArray(function(_error, _result) {
          if (_error) throw _error;
          response.json(_result);
        });
      });
    });
  },
  function(err) {
    // failureCallback
    throw err;
  }
);
module.exports = app;
