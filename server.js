// server.js

// modules =================================================
var express        = require('express');
var app            = express();

// configuration ===========================================
    

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/app')); 
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/dist'));

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/styles', express.static(__dirname + '/app/styles'));

// routes ==================================================
app.get('*', function(req, res) {
	res.sendFile('./app/index.html');
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(8080, function() {
	// shoutout to the user                     
	console.log('Magic happens on port 8080');
});

// expose app           
exports = module.exports = app;      
