var express = require('express'),
    SerialPort = require('serialport').SerialPort,
    sp = new SerialPort('/dev/ttyAMA0',{baudrate:9600});

var app = module.exports = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.post('/badcop', function(req,res) {
    
    res.send('ok');
    res.end();
});

var FORWARD = 1;
var RIGHT = 2;
var LEFT = 3;

var serialEnabled = false;
function serialWrite(data, callback) {
    if(!serialEnabled) {
       console.log('serial disabled!!!!');
       res.send('disabled');
    }
    else {
        sp.write(count,function(err,res){
            if(err) {
                console.log('error: ' + err);
            }
            console.log('results: ' + res);
            if(callback && typeof callback === 'function'){
                callback();
            }
        });
    }
}

app.get('/turn/:direction',function(req,res){
    var direction = req.params.direction.toLowerCase();
    var dirdata = 0;

    if(direction === 'right'){
        dirdata = RIGHT;
    }
    else if(direction === 'left'){
        dirdata = LEFT;
    }
    console.log('try turn ' + direction);
    serialWrite(dirdata,function(){
        console.log('turned ' + direction + '!')
    });
    res.send('OK');
    res.end();
});
app.get('/move/forward',function(req,res){
    var count = req.params.count;
    console.log('try move forward');
    serialWrite(FORWARD,function(){
        console.log('moved forward!')
    });
    res.send('OK');
    res.end();
});
sp.open(function(){
    sp.on('data',function(data){
        console.log(data);
    });
    sp.on('error',function(err){
        console.log('serial error: ' + err);
    });
    serialEnabled = true;
});
app.listen(8001);
console.log("build cop listening on port %d in %s mode", 8001, app.settings.env);
