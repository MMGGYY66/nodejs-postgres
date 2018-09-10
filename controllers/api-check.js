


function AddressController() {
    var createError = require('http-errors');
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
    var requestify = require('requestify');
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
    
    var app = express();
    
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE');
      res.header('Access-Control-Expose-Headers', 'Content-Length');
      res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      } else {
        return next();
      }
    });
    
    
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    
    function getAddress() {
       
        requestify.get('https://address-challenge.herokuapp.com/api/address').then(function(response) {
            bodyResponse = response.getBody();
            res.send({"data":bodyResponse})
        });
        
    }
    
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    
    
    app.use(function(req, res, next) {
      next(createError(404));
    });
    
    
    app.use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    
      res.status(err.status || 500)
      .json({
        status: 'error',
        message: err.message
      });
    });
    
    module.exports = app;

    requestify.get('https://address-challenge.herokuapp.com/api/address').then(function(response) {
        bodyResponse = response.getBody();
        res.send({"data":bodyResponse})
    });
  
  }
  
  module.exports = AddressController();