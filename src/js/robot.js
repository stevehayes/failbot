var gpio = require('pi-gpio'),
output = 0;

function flip (flipMe) {
    return (flipMe) ? 0 : 1;
}

function writeoutput(pin) {
    gpio.write(pin, output);
    output = flip(output);
    setTimeout(function () {
        console.log('write pin: ' + pin + ' output: ' + output);
        writeoutput(pin);
    }, 2000);
}

var states = [];
function readinput(pin, ontriggered) {
    gpio.read(pin, function (err,input) {
        var lastState = states[pin];
        states[pin] = input;
        //console.log('read pin: ' + pin + ' input: ' + input);
        if(lastState != input) {
            console.log('tick');
        }
        if(!lastState && input) {
            console.log('ontriggered!');
            if (ontriggered && typeof ontriggered === 'function') {
                console.log('running on trigger function');
                ontriggered();
            }
        }
        setTimeout(function () {
            readinput(pin,ontriggered);
        },200);
    });
}

var openPins = [];

function openpin(pin, mode, callback) {
    openPins.push(pin);
    gpio.open(pin, mode, callback);
}

function doInputMode(pin) {
    openpin(pin,'input', function(err) {
        readinput(pin)
    });
}

function doOutputMode(pin) {
    openpin(pin, 'output', function(err) {
        if (err)
            gpio.close(pin);
        writeoutput(pin)
    });
}

function killswitchEngage(pin) {
    openpin(pin,'input',function(err) {
        readinput(pin, function() {
            console.log('does this get called??');
            for(var i = 0; i < openPins.length; ++i) {
                console.log('yes it does, for pin: ' + openPins[i]);
                gpio.close(openPins[i]);
            }
            process.exit();
        });
    });
}

//doOutputMode(7);
//killswitchEngage(7);
//doInputMode(11);
