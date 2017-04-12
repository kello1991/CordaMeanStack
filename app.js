var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://esprit:esprit@ds141128.mlab.com:41128/esprit';
//var mongoDB = 'mongodb://localhost:27017/esprit';
mongoose.connect(mongoDB);
var bankModule = require('./models/bank.model');


//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('admin/404.html')
});

// error handler
//app.use(function(err, req, res, next) {
// set locals, only providing error in development
  //  res.locals.message = err.message;
   // res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
    //res.status(err.status || 500);
    //res.json(err);
//});

// blur admin config
app.set('admin_path',path.join(__dirname,'views','admin' + path.sep));

module.exports = app;