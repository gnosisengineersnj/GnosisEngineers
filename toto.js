var ProgressBar = require('progress');
var GAPI= require('node-gcs').gapitoken;
var GCS = require('node-gcs');
var fs = require('fs');
var path = require('path');
var format = require('util').format;
const STATIC_URL = "https://storage.googleapis.com";
const FILENAME = "toto.txt";
const FILE_PATH = "/tmp/upload.txt";
const BUCKET= "testbucket12"
var gapi = new GAPI({
iss: '598095626234-50hni6fpcd52pprdq9pkrruetv7b2mi2@developer.gserviceaccount.com', 
scope: 'https://www.googleapis.com/auth/devstorage.full_control', 
keyFile: path.join(__dirname, 'keys/googlekey.pem')
},
function(err) {
  if (err) {
    console.error(err);
  } else {
    var gcs = new GCS(gapi);

    fs.stat(FILE_PATH, function(err, stats) {
      if (err) {
        console.error(err);
      } else {
        var file = fs.createReadStream(FILE_PATH);

        var headers = {
          'Content-Length': stats.size,
          'Content-Type': 'text',
          'x-goog-acl': 'public-read'
        };
        gcs.putStream(file, 'testbucket12','/' + FILENAME, headers, function(err, res, body) {
          if (res.statusCode!=200) {
            console.error(err);
          } else  {
var bar = new ProgressBar(':bar :percent :etas', { total: 19 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\nyour file is uploaded successfully\n');
    clearInterval(timer);
  }
}, 40);
          }
        });
      }
    });
  }
});
