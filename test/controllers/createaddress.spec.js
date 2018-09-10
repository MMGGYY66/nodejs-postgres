var assert = require('assert');
var getAddress =  require('../../controllers/api-check');

describe('AddressController', function () {

  describe('fetchAddress', function(){

    it('should return addresses', function(){
      var addresses = getAddress.AddressController()
      console.log(addresses);
      //assert.equal(addresses, true);
    });

  });

});