var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registeruser', function(req, res, next) {
  console.log('inside post');
  res.render('index', { title: 'Express' });
});

module.exports = router;
