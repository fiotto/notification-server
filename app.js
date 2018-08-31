var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var websocket = require('websocket');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
server.listen(port, function(){
  console.log('Listening on ' + port);
//  debug('Listening on ' + port);
});

var WebSocketServer = websocket.server;

const wsServer = new WebSocketServer({
    httpServer: server,
});

let connectionList = {};

let idCount = 0;
wsServer.on('request', function(request) {
  let connection = request.accept(null, request.origin);
  connection.id = idCount++;
  connectionList[connection.id] = connection;

  console.log((new Date()) + ' Connection accepted.');
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);

      Object.keys(connectionList).forEach((key) => {
        const val = connectionList[key];
        val.sendUTF(message.utf8Data);
      });
    }
  });
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');

    delete connectionList[connection.id];
  });
});

module.exports = app;
