const config = require('../config.json');
const utils = require('../utils');

exports.run = function(client, message, args)
{	 
	if (!utils.isDirector(message.member))
	{
		return message.reply(config.permissionDeniedMessage);
	}

	let member = message.mentions.members.first();
	if (!member) { 
		return message.channel.send('Impossible de trouver l\'utilisateur');
	}
	if (!member.roles.find("name", "A l'essai")) {
		return message.channel.send('Cette commande ne peut expulser que les membres du groupe "A l\'essai"');
	}
	client.channels.find("name", "annonces").send(`${member.displayName} a été exclu du repaire`); 
	member.send('Salut\n' +
		'Les résultats du vote hebdomadaire viennent de tomber et malheureusement ils ne sont pas en ta faveur\n' +
		'La majorité est contre ton intégration en guilde\nNous sommes désolé que ça n\'ait pas fonctionné' +
		' et te souhaitons de trouver la guilde qui te conviendra\nBonne continuation');
	member.kick();
}
