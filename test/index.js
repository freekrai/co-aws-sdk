var CoAWS = require('../index');
var co = require('co');
var fs = require('fs');

var s3 = new CoAWS.S3();

co(function* () {
  var data = yield s3.listBuckets();
  console.log('list data:', data);

  if (data.Buckets.length > 0) {
    var result = yield s3.upload({
      Bucket: data.Buckets[0].Name,
      Key: 'key',
      Body: fs.createReadStream('./index.js')
    });
    console.log('upload:', result);
  }

}).catch(function (err) {
  console.error('err:', err);
})
