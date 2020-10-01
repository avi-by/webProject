var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hi there');
});

router.post('/',function(req,res,next) {
  console.log(req.body);
})

router.put('/',function(req,res,next) {
  console.log("put",req.body);
})

router.delete('/',function(req,res,next) {
  console.log("delete",req.body);
})
module.exports = router;
