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
        return robot.action(nextAction);
    }
    return "Ain't no commands to perform, DAWG";
},

performAction: function(command){
    return robot.action(command);
},

addCommand: function(command){
    var currentQueue = this.getCommands();
    currentQueue.push(command);
    this.setCommands(currentQueue);
},

moveForward: function(count){
    this.addCommand({action: 'forward', count: count});
},

turn: function (){
    this.addCommand({action: 'turn'});
},

 stop: function(){
     this.performAction({action: 'stop'});
 }
};