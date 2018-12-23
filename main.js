const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const basics = require('./basics');
const commands = require('./commands/commands');
const usesKaelly = require('./usesKaelly');

client.on('ready', () => {
    //basics.startMessages(client);
});

client.on('message', message => {
    let messageLC = message.content.toLowerCase().trim();
    
    basics.simpleAnswers(messageLC, message, config);
    if ('services' == message.channel.name) {
		handledCommand = usesKaelly.services(message, config, messageLC);
		if (true === handledCommand) {
	    	return;
	    }
    }

	if ('ghost_channel' === message.channel.name) {
    	handledCommand = usesKaelly.tweetsFilter(config, message, Discord);
    	if (true === handledCommand) {
	    	return;
	    }
	}

    let handledCommand = false;
    if (messageLC.startsWith(config.prefix)) {
	    handledCommand = commands.votes(message, config, client, Discord);
	    if (true === handledCommand) {
	    	return;
	    }
	    
    	handledCommand = commands.almanaxSubscriber(messageLC, config, message);
		if (true === handledCommand) {
	    	return;
	    }
    	
    	handledCommand = commands.help(messageLC, config, message);
	    if (true === handledCommand) {
	    	return;
	    }
	    
	    handledCommand = commands.gameVote(messageLC,config, message);
	    if (true === handledCommand) {
	    	return;
	    }

		message.channel.send('**Je suis désolée mais je ne connais pas la commande ' + message.content.substr(2) + '**');
    }

    basics.cleanUp(message, config, messageLC);
});

/********************** ? Start : Timer votes functionality ? **********************/

const TARGET_DAY = 5; // Days go from 0 (sunday) to 6 (saturday)
const TARGET_HOUR = 17; // Hours go from 0 to 23
const TARGET_MINUTE = 0; // Minute of the hour from 0 to 59
const CHECK_EVERY = 60; // In secondes

setInterval(function() {
    var d = new Date();
    if (TARGET_DAY === d.getDay() && TARGET_HOUR === (d.getHours()+2) && TARGET_MINUTE === d.getMinutes()) {  
        client.channels.find('name', 'les_nouveaux').send(config.prefix + 'votes');
    }
}, CHECK_EVERY * 1000); // Check every CHECK_EVERY secondes

/********************** ! End : Timer votes functionality ! **********************/

client.on("guildMemberAdd", (member) => {
    basics.handleNewMember(client, member);
});

client.login(process.env.BOT_TOKEN);
