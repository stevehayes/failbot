var forwardSound = '/media/jamesbro.wav',
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
	var sound = new Audio(file); 
	sound.play();
};