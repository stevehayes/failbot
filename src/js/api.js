var robot = require('./failbot5');
const STORAGE_QUEUE = "queue";
var storage = require('node-persist');

module.exports = {
    getCommands: function (){
    var currentCommands = storage.getItem(STORAGE_QUEUE) || [];
    return currentCommands;
},

setCommands: function(commandList){
    storage.setItem(STORAGE_QUEUE, commandList);
},

performNextAction: function(){
    var currentQueue = this.getCommands();
    if (currentQueue && currentQueue.length){
        var nextAction = currentQueue.pop();
        this.setCommands(currentQueue);
        this.performAction(nextAction);
        return nextAction;
    }
    return "Ain't no commands to perform, DAWG";
},

performAction: function(command){
    switch (command.action){
        case 'turn':
            robot.turn(command.direction);
            break;
        case 'forward':
            robot.forward(command.count);
            break;
        case 'light':
            robot.light(command.turnOn);
            break;
        default:
            robot.action(command);
            break;
    }
},

addCommand: function(command){
    var currentQueue = this.getCommands();
    currentQueue.push(command);
    this.setCommands(currentQueue);
    this.performAction(command);
},

moveForward: function(count){
    this.addCommand({action: 'forward', count: count});
},

turn: function (direction){
    this.addCommand({action: 'turn', direction: direction});
},

 stop: function(){
     this.performAction({action: 'stop'});
 },

    light: function(turnOn){
        this.performAction({action: 'light', turnOn: turnOn});
    }
};