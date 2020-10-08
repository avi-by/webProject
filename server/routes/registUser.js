let path = require("path");
let express = require("express");
var app = express.Router();
const body_parser = require("body-parser");
const db = require("../lib/db");
const okta = require("../lib/regOkta");
const util = require("util");
const client = require("../lib/oktaClient");
const dbName = "data";
const collectionName = "users";

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
    app.post("/adduser", function(req, res, next) {
      if (!req.body) return res.sendStatus(400);

      okta.reg(req, res, function(err, _res) {
        var oktares = _res;

        if (!oktares.successful) {
          res.status(400);
          res.json(oktares.err);
        }
        const item = req.body;
        item.oktaID = oktares.user.id;
        dbCollection.insertOne(item, (error, result) => {
          // callback of insertOne

          if (error) throw error;
          // return updated list
          dbCollection.find().toArray((_error, _result) => {
            // callback of find

            if (_error) throw _error;
            console.log("end 200");
            res.sendStatus(200);
          });
        });
      });
    });

    //  <<Read some Record>>
    app.get("/ReadRecord/:id", (request, response) => {
      const itemId = request.params.id;
      dbCollection.find({oktaID: itemId}).toArray((error, result) => {
        if (error) throw error;
        console.log(result);
        response.send(result);
      });
    });

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

      client.getUser(itemId).then(user => {
        user.profile.firstName = item.firstName;
        user.profile.lastName = item.lastName;
        user.profile.email = item.email;
        user.profile.mobilePhone = item.phone;
        user.update().then(() => console.log("User change has been saved"));
      });

      dbCollection.updateOne(
        {oktaID: itemId},
        {$set: item},
        (error, result) => {
          if (error) throw error;
          // send back entire updated list, to make sure frontend data is up-to-date
          dbCollection.find().toArray(function(_error, _result) {
            if (_error) throw _error;
            response.json(_result);
          });
        }
      );
    });

    app.delete("/DeleteRecord/:id", (request, response) => {
      const itemId = request.params.id;
      console.log("Delete item with id: ", itemId);

      client.getUser(itemId).then(user => {
        console.log(user);
        user
          .deactivate()
          .then(() => console.log("User has been deactivated"))
          .then(() => user.delete())
          .then(() => console.log("User has been deleted"));
      });

      dbCollection.deleteOne({oktaID: itemId}, function(error, result) {
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
