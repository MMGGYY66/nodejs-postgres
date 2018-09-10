var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);


var connectionString = {
  host: 'your_host_name',
  port: 5432,
  database: 'your_database_name',
  user: 'postgres_username',
  password: 'your_password'
};

var db = pgp(connectionString);


module.exports = {
  getAllAddresses: getAllAddresses,
  getAddress: getAddress,
  createAddress: createAddress,
  updateAddress: updateAddress,
  removeAddress: removeAddress
};


function getAllAddresses(req, res, next) {
  db.any('select * from address order by id desc')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Fetched all addresses'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAddress(req, res, next) {
  var addID = parseInt(req.params.id);
  db.one('select * from address where id = $1', addID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved an address'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createAddress(req, res, next) {  
  db.none('insert into address (physical_address) values (${address})',req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Added an address'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateAddress(req, res, next) {
  db.none('update address set physical_address=$1 where id=$2',
    [req.body.address,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Address was successfully updated'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeAddress(req, res, next) {
  var contactId = parseInt(req.params.id);
  db.result('delete from address where id = $1', contactId)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} address`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}