var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var firebase = require('firebase');
var firebase_configuration_json = require('/Users/mguo/.ironman/firebase_configure.json');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
// app.set('views', __dirname + '/view');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// ====== firebase configuration ======
var config = {
  apiKey: firebase_configuration_json.apiKey,
  authDomain: firebase_configuration_json.authDomain,
  databaseURL: firebase_configuration_json.databaseURL,
  projectId: firebase_configuration_json.projectId,
  storageBucket: firebase_configuration_json.storageBucket,
  messagingSenderId: firebase_configuration_json.messagingSenderId
};
firebase.initializeApp(config);

// ====== use routers ======
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./pages/error');
});

module.exports = app;
