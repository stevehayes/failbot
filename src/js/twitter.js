var twitter = require('ntwitter'),
	config = require('./failbot.config');, 
	twit;

function init(){
	twit = new twitter({
	  consumer_key: config.consumerKey,
	  consumer_secret: config.consumerSecret,
	  access_token_key: config.accessTokenKey,
	  access_token_secret: config.accessTokenSecret
	});

	twit.verifyCredentials(function (err, data) {
		if (err) {
			console.log('aw snap, who you is?')
		};
    	console.log('twitter credentials verified. Welcome back homie');
  	});
}

function tweet(message){
	twit.updateStatus(message});
}