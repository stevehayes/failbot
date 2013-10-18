var five = require("johnny-five"),
    board, leftButton, rightButton, leftLed, rightLed;

board = new five.Board();

board.on("ready", function() {

  leftButton = new five.Button(3);
  rightButton = new five.Button(5);
  
  leftLed = new five.Led({
    pin: 8
  });

  rightLed = new five.Led({
    pin: 10
  });

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    leftButton: leftButton,
    rightButton: rightButton
  });

  // Button Event API

  rightButton.on("down", function() {
  	console.log("right pushed down")
    rightLed.on();
  });

  rightButton.on("up", function(){
  	console.log("right went up")
  	rightLed.off();
  });

  // "down" the button is pressed
  leftButton.on("down", function() {
  	console.log("left pushed down")
    leftLed.on();
  });

  leftButton.on("up", function(){
  	console.log("left went up")
  	leftLed.off();
  });
});