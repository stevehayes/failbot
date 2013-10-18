var express = require('express');
var http = require('http');
var path = require('path');
var storage = require('node-persist');
var app = express();
var robot = require('./failbot5');

const STORAGE_QUEUE = "queue";

// all environments
app.set('port', 8001);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function(req,res){
    res.render('index', { title: 'THIS IS FAILBOT!'});
});

app.get('/work', function(req,res){
    var currentQueue = storage.getItem(STORAGE_QUEUE);
    if (currentQueue && currentQueue.length){
        var nextAction = currentQueue.pop();
        var response = robot.action(nextAction);
        res.send('Did: ' + nextAction + '. Response: ' + response);
    }
});

app.get('/commands', function(req,res){
    var requests = storage.getItem(STORAGE_QUEUE);
    res.render('queue', { title: 'Command List', 'commands': requests });
});

app.get('/add/:command', function(req,res){
    var command = req.params.command;
    if (command){
        var currentQueue = storage.getItem(STORAGE_QUEUE) || [];
        currentQueue.push(command);
        storage.setItem(STORAGE_QUEUE, currentQueue);
        res.send('Added ' + command + ' to the queue.');
    } else {
        res.status(400);
        res.send('No command found');
    }
})

app.get('/move/forward/:count',function(req,res){
    var count = req.params.count;
    res.send('moving forward ')
});


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
