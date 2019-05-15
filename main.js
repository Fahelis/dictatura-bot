const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const basics = require('./basics');
const usesKaelly = require('./usesKaelly');

client.on('message', message => {
    let args = message.content.slice(config.prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    
    //basics.simpleAnswers(message, config);
    
    let handledCommand = false;
    if ('services' === message.channel.name && message.member.id === config.kaellyId) {
		handledCommand = usesKaelly.services(message, config);
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
            let commandFile;
        	try {
                let locationFile = config.tabCommands[cmd]['location'];
    			commandFile = require(`./${locationFile}${cmd}.js`);
            } catch (e) {
                message.channel.send(`Je suis désolée mais je ne connais pas la commande **${cmd}**`);
                console.error(e);
                return
            }
            if (true === config.tabCommands[cmd]['hasArgs'] && true === config.tabCommands[cmd]['needsClient']) {
               commandFile.run(client, message, args);
            } else if (true === config.tabCommands[cmd]['hasArgs']){
               commandFile.run(message, args);
            } else if (true === config.tabCommands[cmd]['needsClient']){
               commandFile.run(client, message);
            } else {
                commandFile.run(message);
           }
        } catch (e) {
            message.channel.send(`Je suis désolée mais je n'ai pas pu traiter la commande **${cmd}**. Vérifie ta saisie, il y a peut-être une erreur. Si ce n'est pas le cas, parles en à Willam.`);
            console.error(e);
        }
    }

    basics.cleanUp(message, config);
});

/********************** ? Start : Timer votes functionality ? **********************/

const OPEN_VOTE_DAY = 5; // Days go from 0 (sunday) to 6 (saturday)
const CLOSE_VOTE_DAY = 1; // Days go from 0 (sunday) to 6 (saturday)
const VOTE_HOUR = 17; // Hours go from 0 to 23
const VOTE_MINUTE = 0; // Minute of the hour from 0 to 59
const CHECK_EVERY = 60; // In secondes

setInterval(function() {
    let currentDate = new Date();
    let isVoteTime = VOTE_HOUR === (currentDate.getHours()) && VOTE_MINUTE === currentDate.getMinutes();
    if (OPEN_VOTE_DAY === currentDate.getDay() && isVoteTime) {  
        client.channels.find('name', 'les_nouveaux').send(config.prefix + 'votes');
    } else if (CLOSE_VOTE_DAY === currentDate.getDay() && isVoteTime) {
		// TODO. Trigger only if there was some votes
	    client.channels.find("name", "le_bureau_de_la_direction").send("Fin des votes");

    }
}, CHECK_EVERY * 1000); // Check every CHECK_EVERY secondes

/********************** ! End : Timer votes functionality ! **********************/

client.on("guildMemberAdd", (member) => {
    let commandFile = require(`./commands/new_member.js`); 
    commandFile.run(client, member);
});

client.on('ready', () => {
    //basics.startMessages(client);
	let logChannel = client.channels.find("name", "iord_logs");
	let currentDate = new Date();
	message = 'De retour en ligne le ' + currentDate.toDateString() + ' à ' + currentDate.toTimeString();
	console.log(message);
	logChannel.send(message);
});

client.login(process.env.BOT_TOKEN);
