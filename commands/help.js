const config = require("./config.json");

exports.run = function(client, message, args)
{
	let args = message.content.split(" ").slice(1);
	if ('almanax_notif' === args[0]) {
		message.channel.send('**' + config.prefix + 'almanax_notif**\n' +
			'Active ou désactive (si elle est déjà active) la notification du canal "services" lorsque l\'Almanax est publié, ' +
			'même si le canal est muet');
	} else if ('game_vote' === args[0]) {
		message.channel.send('**' + config.prefix + 'game_vote**\n' +
			'Ajoute un vote sur le sujet épinglé (commande prévue pour les jeux)');
	} else if ('help' === args[0]) {
		message.channel.send('**' + config.prefix + 'help**\n' +
			'Affiche la liste des commandes et leur utilité');
	} else if ('official_member' === args[0]) {
		message.channel.send('**' + config.prefix + 'official_member**\n' +
			'Permet de faire évoluer une recrue en membre officiel. Changement de rôle, annonce et message privé');
	} else if ('votes' === args[0]) {
		message.channel.send('**' + config.prefix + 'votes**\n' +
			'Démarre un vote pour l\'intégration de recrues\n' +
			'Si la commande est lancée sans argument (' + config.prefix + 'votes), un vote se lance pour chaque membre du groupe "A l\'essai"\n' +
			'Si la commande est lancé avec des arguments (' + config.prefix + 'votes nom1 nom2...), un vote se lance pour chaque nom passé en argument');
	} else if (0 === args.length) {
		message.channel.send(
			'**Voici la liste de mes pouvoirs (Ce symbole ⚠ signifie "Accessible uniquement aux dirigeants")**\n\n' +
			'**' + config.prefix + 'almanax_notif** : Permet de s\'inscrire pour recevoir chaque jour la notification du service Almanax\n' +
			'**' + config.prefix + 'game_vote** : ⚠ Crée un vote pour le canal courant (À utiliser pour les jeux)\n' +
			'**' + config.prefix + 'help** : Affiche cette liste\n' +
			'**' + config.prefix + 'official_member** : ⚠ Passe une recrue en membre officiel\n' +
			'**' + config.prefix + 'votes** : ⚠ Lance les votes de fin de semaine pour recrues'
			);
	} else {
		message.channel.send('Je suis désolée mais je ne trouve pas d\'aide pour la commande **' + args[0] + '**');
	}
}