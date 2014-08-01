var express = require('express');
var http = require('http');
var gcloud = require('gcloud');
var path = require('path');
var sys = require('sys');
console.log(sys);
var app = express();

app.set('port', 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
bucket = new gcloud.storage.Bucket({
        bucketName:'testbucket12',
        email: '598095626234-50hni6fpcd52pprdq9pkrruetv7b2mi2@developer.gserviceaccount.com',
        pemFilePath: path.join(__dirname, 'keys/googlekey.pem')
});
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("sudo /home/rsa-key-20140726/nodefileupload/download.sh", puts);
// Routes Starts
// View All Files
app.get('/', function(req, res) {
  console.log('******Retrieving All File List******');
  bucket.list(function(err, files, nextQuery) {
    // if more results, nextQuery will be non-null.
   if (err) { console.log('Authorization error for retrieving files: ' + err); }
   else{
        res.locals.allFiles=files;
        res.render('viewFiles');
    }
  });
  
});
// Start the app server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
