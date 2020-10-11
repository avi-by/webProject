var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const haversine = require("haversine");
var nodeKmeans = require("node-kmeans");

router.post("/", function(req, res, next) {
  console.log(req.body);
  var data =req.body.data;
  let vectors = new Array();
  for (let i = 0; i < data.length; i++) {
    vectors[i] = [data[i][0], data[i][1]];
  }

  const kmeans = require("node-kmeans");
  kmeans.clusterize(vectors, {k: req.body.k,distance: (a,b)=>haversine({latitude:a[0],longitude:a[1]}, {latitude:b[0],longitude:b[1]})}, (err, result) => {
    if (err) {
      console.error(err);
      res.status(400);
      res.json(err);
    }
    else {
      console.log("%o", result);
      res.json(result);
    }
  });
});

module.exports = router;
