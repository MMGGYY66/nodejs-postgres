var express = require('express');
var router = express.Router();

var db = require('./queries');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Address Manager REST API' });
});


router.get('/api/address', db.getAllAddresses);
router.get('/api/address/:id', db.getAddress);
router.post('/api/address', db.createAddress);
router.put('/api/address/:id', db.updateAddress);
router.delete('/api/address/:id', db.removeAddress);


module.exports = router;
