var express = require('express');
var app = module.exports = express.createServer();

//configure express
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

//start the http server
app.listen(process.env.C9_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
//
