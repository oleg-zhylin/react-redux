const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const publicDir = 'build';
const indexFile = process.env.NODE_ENV !== 'production'
    ? 'index-dev.min.html'
    : 'index.min.html';
const redirectToHTTPS = process.env.NODE_ENV !== 'local';
const enableCORS = false;

if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (enableCORS) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, SecretKey");
        next();
    });
}

app.use('/healthcheck', require('express-healthcheck')({
    healthy: function () { return { message: 'app is healthy' }}
}));

//redirect to htttps
if (redirectToHTTPS) {
    app.use(function(req, res, next) {
        if((!req.secure) && (req.get('x-forwarded-proto') !== 'https')) {
            res.redirect('https://' + req.get('Host') + req.url);
        } else {
            next();
        }
    });
}
//return gz for js files
app.use('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});

app.use(favicon(path.join(__dirname, publicDir, 'favicon.ico')));

app.use('/api', require('./routes/api'));

app.use(express.static(path.join(__dirname, publicDir), {'index': indexFile}));
app.get('*', function(req, res){
    console.log('*', 'return index file ', indexFile);
    res.sendFile(path.join(__dirname, publicDir, indexFile));
});
console.log('indexFile', indexFile);

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
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = {};

  // render the error page
  res.setHeader('Content-Type', 'application/json');
  res.status(err.status || 500);
  res.send(JSON.stringify({ message: err.message }));
});

module.exports = app;
