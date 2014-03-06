/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var inner = require('./routes/inner');
var post = require('./routes/post');
var scroll = require('./routes/scroll');
var security = require('./routes/security');
var http = require('http');
var path = require('path');

var app = express();

var auth = express.basicAuth(function(user, pass) {
    return user === 'user' && pass === 'pass';
});

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.bodyParser({uploadDir: './public/images'}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/scroll', scroll.index);
app.get('/inner', inner.index);
app.get('/security', auth, security.index);
app.post('/post', post.index);
app.get('/templates/:template', require('./routes/templates').get);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
