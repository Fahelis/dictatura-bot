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
	client.channels.find("name", "annonces").send(`${memberToFind.displayName} a été exclu du repaire`); 
	member.send('Salut\n C\'est à moi qu\'incombe la charge de t\'annoncer le résultat du vote hebdomadaire\n' +
		'La majorité est contre ton intégration en guilde\nNous sommes désolé que ça n\'ait pas fonctionné' +
		' et te souhaitons de trouver la guilde qui te conviendra\nBonne continuation');
	member.kick();
}
