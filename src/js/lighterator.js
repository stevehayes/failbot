var five = require("johnny-five"),
    board, led;

board = new five.Board();

board.on("ready", function() {

function light(lightState){
	  led = new five.Led({
	    pin: 7
	  });

	  if (lightState) {
	  	led.on();	
	  }
	  else {
	  	led.off();
	  }
	};
});