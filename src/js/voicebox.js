var exec = require('child_process').exec,
	forwardSound = '/media/jamesbro.wav',
	stopSound = '/media/dalek-exterminate.wave',;

function play(command){
	switch(command.action){
		case 'forward':
			this.playSound(forwardSound);
			break;
		case 'stop':
			this.playSound(stopSound);
			break;
	}
};

function playSound(file){
	var child = exec('aplay '+ file, function(error, stdOut, stdErr){
		console.log('played sound file ' + file);
	});
};

module.exports.play = play;