const config = require('../config.json');
const utils = require('../utils');

exports.run = function(client, message, args)
{	 
	//Vérifie que le lanceur de la commande a bien les droits pour le faire
	if (!utils.isDirector(message.member))
	{
		return message.reply(config.permissionDeniedMessage);
	}
	//Vérifie qu'un membre du serveur est mentionné
	let memberToFind = message.mentions.members.first(); 
	//S'il n'y a pas de membre sur le serveur correspondant au pseudo mentionné
	if (!memberToFind) { 
		 //Message d'erreur et fin du code
		return message.channel.send("Aucun utilisateur ne correspond au pseudonyme indiqué");
	}
	//Ajoute le role Membres au pseudo mentionné
	memberToFind.addRole(message.guild.roles.find("name", "Membres")); 
	//Retire le rôle A l'essai au pseudo mentionné
	memberToFind.removeRole(message.guild.roles.find("name", "A l'essai")); 
	//Envoie un message sur le salon Annonces pour féliciter la nouvelle recrue
	client.channels.find("name", "annonces").send(`${memberToFind.displayName} fait maintenant partie des membres officiels. Félicitations !`); 
	client.channels.find("name", "le_bureau_de_la_direction").send(`
		${memberToFind.displayName} est maintenant un membre officiel, il faut penser à mettre à jour son rang et ses droits :
		- Poser un percepteur
		- Collecter ses percepteurs
		- (Si son niveau est 199 ou plus) Etre prioritaire en défense de percepteur
		- Vérifier qu'il peut gérer son expérience de guilde (normalement acquis)
		- Son rang devient apprenti s'il est 190 ou moins, initié s'il est 190 à oméga 99 ou conseiller s'il est oméga 100 ou plus
		- Créer une colonne à son nom dans le fichier "rangs et droits - privé" et y cocher le bon rang
		`); 
	//Envoie un mp à la nouvelle recrue pour la féliciter et l'informer de ses nouveaux droits
	memberToFind.send("Les membres de la guilde ont voté pour ton intégration. Tu deviens donc un membre officiel de la Dictatura Dei, félicitations !\n"
		+ "Avec ce statut arrivent des droits supplémentaires :\n"
		+ "- Poser un percepteur\n"
		+ "- Collecter tes percepteurs\n"
		+ "Si l'élevage t'intéresse tu peux également obtenir sur simple demande au meneur ou à un bras droit :\n"
		+ "- Utiliser les enclos\n"
		+ "- Aménager les enclos\n"
		+ "Si tu es de niveau 199 ou 200 tu obtiens aussi :\n"
		+ "- Être prioritaire en défense de percepteur\n\n"
		+ "Bienvenue pour de bon au sein de la guilde 😃\n");
}
