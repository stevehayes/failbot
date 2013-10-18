var SerialPort = require('serialport').SerialPort;
var testMode = true;

if (testMode){
    console.log("Running in test mode!  Will not write to serial port");
} else {
    sp = new SerialPort('/dev/ttyAMA0',{baudrate:9600});
}

var serialEnabled = false;

const FORWARD = 1;
const RIGHT = 2;
const LEFT = 3;

function action(command){
    return "I just " + command + ". That was fun!";
}

function forward(count){
    for (var i=0; i<count; i++){
        serialWrite(FORWARD, function(){
            console.log('Moved forward');
        })
    }
    return "I just moved forward " + count + " spaces.  What a workout!";
}

function turn(direction){
    var directionFlag = 0;
    if (direction.toLowerCase() === "left"){
        directionFlag = LEFT;
    } else if (direction.toLowerCase() === "right") {
        directionFlag = RIGHT;
    }

    serialWrite(directionFlag,function(){
        console.log('turned ' + direction + '!')
    });

    return "Turning " + direction;
}

function stop(){
    return "STOPPPP!!!!!";
}

function serialWrite(data, callback) {
    if (testMode){
        console.log('would have ran this: ' + data);
        return;
    }

    try {
    if(!serialEnabled) {
        console.log('serial disabled!!!!');
        res.send('disabled');
    }
    else {
        sp.write(data,function(err,res){
            if(err) {
                console.log('error: ' + err);
            }
            console.log('results: ' + res);
            if(callback && typeof callback === 'function'){
                callback();
            }
        });
    }
    } catch(e){
        console.log('error writing to serial: ' + e);
    }
}

if (!testMode){
    sp.open(function(){
        sp.on('data',function(data){
            console.log(data);
        });
        sp.on('error',function(err){
            console.log('serial error: ' + err);
        });
        serialEnabled = true;
    });
}
module.exports.action = action;
module.exports.forward = forward;
module.exports.stop= stop;
module.exports.turn= turn;