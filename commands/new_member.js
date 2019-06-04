const Discord = require('discord.js');
const config = require('../config.json');
const utils = require('../utils');

// Param can be a guildMember (when function is called on guildMemberAdd event) or a Message (command)
exports.run = function(client, message, args)
{
	if (!utils.isDirector(message.member))
	{
	    return message.reply(config.permissionDeniedMessage);
	}
	let member = message.mentions.members.first(); ;
	const name = args[1];

	member.setNickname(name);
    	member.addRole(member.guild.roles.find("name", "A l'essai"));
	client.channels.find('name', 'annonces').send(`Une nouvelle recrue a rejoint le repaire, faites un bon accueil à ${member.nickName} !`);
	member.send("Salutations nouvelle recrue, merci de rejoindre la Dictatura Dei"
	    + "Si ce n'est pas déjà fait, je t'invite à lire le contenu du canal accueil qui t'en apprendra plus sur notre fonctionnement\n"
	    + "Je t'invite également à laisser un petit message de présentation sur le canal général\n"
	    + "J'espère que tu te plairas parmi nous :wink:");
}
