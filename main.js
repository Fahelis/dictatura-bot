const Discord = require('discord.js');
const keepAlive = require("./server");
const client = new Discord.Client({ intents: ["DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING", "GUILDS", "GUILD_MESSAGES", "MESSAGE_CONTENT"] });
const config = require('./config.json');
// const basics = require('./basics');
const utils = require('./utils');
const usesKaelly = require('./usesKaelly');

client.on('messageCreate', message => {
    let args = message.content.slice(config.prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    
    //basics.simpleAnswers(message, config);
    
    let handledCommand = false;
    if ('services' === message.channel.name && message.member.id === config.kaellyId) {
		handledCommand = usesKaelly.services(message, config);
		if (true === handledCommand) {
            utils.cleanUp(message, config);
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
                message.delete(5000);
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
            message.delete(5000);
        } catch (e) {
            message.channel.send(`Je suis désolée mais je n'ai pas pu traiter la commande **${cmd}**. Vérifie ta saisie, il y a peut-être une erreur. Si ce n'est pas le cas, parles en à Willam.`);
            message.delete(5000);
            console.error(e);
        }
    }

    utils.cleanUp(message, config);
});

/********************** ? Start : Timer votes functionality ? **********************/

const OPEN_VOTE_DAY = 5; // Days go from 0 (sunday) to 6 (saturday)
const CLOSE_VOTE_DAY = 1; // Days go from 0 (sunday) to 6 (saturday)
const VOTE_HOUR = 17; // Hours go from 0 to 23
const VOTE_MINUTE = 0; // Minute of the hour from 0 to 59
const CLEAN_LOGS_DAY = 1;
const CLEAN_LOGS_HOUR = 0;
const CLEAN_LOGS_MINUTE = 0;
const CHECK_EVERY = 60; // In secondes

setInterval(function() {
    let currentDate = new Date();
    let isVoteTime = VOTE_HOUR === currentDate.getHours() && VOTE_MINUTE === currentDate.getMinutes();
    if (OPEN_VOTE_DAY === currentDate.getDay() && isVoteTime && 'TRUE' === process.env.AUTO_VOTE) {  
        client.channels.find('name', 'ghost_channel').send(config.prefix + 'votes');
    } else if (CLOSE_VOTE_DAY === currentDate.getDay() && isVoteTime && 'TRUE' === process.env.AUTO_VOTE) {
		// TODO. Trigger only if there was some votes
	    client.channels.find("name", "le_bureau_de_la_direction").send("Fin des votes");
    } else if (CLEAN_LOGS_DAY === currentDate.getDay() && CLEAN_LOGS_HOUR === currentDate.getHours() && CLEAN_LOGS_MINUTE === currentDate.getMinutes()) {
    	utils.cleanLogs(client);
    }
}, CHECK_EVERY * 1000); // Check every CHECK_EVERY secondes

/********************** ! End : Timer votes functionality ! **********************/

client.on("guildMemberAdd", (member) => {
    member.send("Bonjour et bienvenue dans la repaire de la Dictatura Dei\n" +
	"En tant qu'invité, tu démarres avec des droits très restreints\n" +
	"Le canal accueil te permettra d'en apprendre plus sur notre guilde et son fonctionnement\n" +
	"Le canal général te permettra de communiquer avec nos membres\n" +
	"Le canal vocal Groupe lambda te permettra de communiquer en vocal avec les gens présents dessus\n" +
	"Si tu es là en tant que nouvelle recrue, un dirigeant va prochainement faire évoluer ton statut\n" +
	"Dans tous les cas profite bien de ton passage chez nous :slight_smile:");
});

client.on('ready', () => {
    //basics.startMessages(client);
	let currentDate = new Date();
	utils.log(client, 'De retour en ligne le ' + currentDate.toDateString() + ' à ' + currentDate.toTimeString());
});

keepAlive();
client.login(process.env.BOT_TOKEN);
