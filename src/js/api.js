var robot = require('./failbot5');
const STORAGE_QUEUE = "queue";
var storage = require('node-persist');

function performNextAction(){
    var currentQueue = storage.getItem(STORAGE_QUEUE);
    if (currentQueue && currentQueue.length){
        var nextAction = currentQueue.pop();
        storage.setItem(STORAGE_QUEUE);
        return robot.action(nextAction);
    }
    return "Ain't no commands to perform, DAWG";
}

function getCommands(){
    var requests = storage.getItem(STORAGE_QUEUE);
    return requests;
}

function addCommand(command){
    var currentQueue = storage.getItem(STORAGE_QUEUE) || [];
    currentQueue.push(command);
    storage.setItem(STORAGE_QUEUE, currentQueue);
}


module.exports.performNextAction = performNextAction;
module.exports.getCommands = getCommands;
module.exports.addCommand = addCommand;