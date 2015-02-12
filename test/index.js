var CoAWS = require('../index');
var co = require('co');

var s3 = new CoAWS.S3();

co(function* () {
  var result = yield s3.listBuckets();
  console.log(result);
}).catch(function (err) {
  console.error(err);
})
