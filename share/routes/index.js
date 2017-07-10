var express = require('express');
var router = express.Router();
var Classify = require('../application/controllers/classify');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/error', function (req, res) {
  res.render('error');
});
router.post('/classify/add', Classify.addClassify);
router.post('/classify/get', Classify.getByParent);
router.post('/classify/delete', Classify.deleteClassify);
router.post('/classify/edit', Classify.editClassify);
module.exports = router;
