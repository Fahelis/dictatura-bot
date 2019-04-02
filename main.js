const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const basics = require('./basics');
const usesKaelly = require('./usesKaelly');

client.on('message', message => {
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    
    //basics.simpleAnswers(messageLC, message, config);
    
    let handledCommand = false;
    if ('services' === message.channel.name && message.member.id === config.kaellyId) {
		handledCommand = usesKaelly.services(message, config, messageLC);
		if (true === handledCommand) {
	    	return;
	    }
    }

	if ('ghost_channel' === message.channel.name && message.member.id === config.kaellyId) {
    	handledCommand = usesKaelly.tweetsFilter(message, Discord, client);
    	if (true === handledCommand) {
	    	return;
	    }
	}

    if (message.content.startsWith(config.prefix)) {
    	try {
			let commandFile = require(`./commands/${cmd}.js`);
	        commandFile.run(client, message, args);
    	} catch (e) {
			message.channel.send('Je suis désolée mais je ne connais pas la commande **' + message.content.substr(2).split(" ").slice(0) + '**');
    	}
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
    commands.newMember(client, member);
});

client.on('ready', () => {
    //basics.startMessages(client);
	let channel = client.channels.find("name", "ghost_channel");
	channel.send('Je suis de retour en ligne');
});

client.login(process.env.BOT_TOKEN);