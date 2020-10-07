let path = require("path");
let express = require("express");
var app = express.Router();
const body_parser = require("body-parser");
const db = require("../lib/db");
const okta = require("../lib/regOkta");
const util = require("util");

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
    app.post("/", function(req, res, next) {
      if (!req.body) return res.sendStatus(400);

      okta.reg(req, res, function(err,_res){
        var oktares=_res;

          if (!oktares.successful) {
              res.status(400);
              //res.send(oktares.err);
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
  },
  function(err) {
    // failureCallback
    throw err;
  }
);
module.exports = app;
