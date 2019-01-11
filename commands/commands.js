module.exports = {
	votes: function(message, config, client, Discord)
	{
		if(message.content.startsWith(config.prefix + "votes")) {
			if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
				return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
			} else {
				targetChannel = client.channels.find("name", "les_nouveaux");
	            let args = message.content.split(" ").slice(1);
				let autoVote = 0 == args.length;
				// Find all members who have the role "A l'essai"
				let recruits = message.guild.roles.find("name", "A l'essai").members;
			    let hasRecruits = false;
				// TODO. Find a better way
				recruits.forEach(function(guildMember, guildMemberId) {
					hasRecruits = true;
					});
				if (!hasRecruits && autoVote) {
				    let roleMeneur = message.guild.roles.find("name", "Meneur");
				    let roleBD = message.guild.roles.find("name", "Bras droits");
				    targetChannel.send('Je ne trouve pas la moindre recrue.\n'
				      + 'Pas de vote cette semaine sauf si des recrues ne sont pas présentes dans le repaire.\n'
				      + 'Si tel est le cas le '+ roleMeneur +' ou un '+ roleBD +' doit '
				      +'lancer le vote manuellement');
			    } else {
				    let openningVote = (hasRecruits && autoVote) || (!hasRecruits && !autoVote);
				    if (openningVote) {
						targetChannel.send('* * * * * * * * * * * * * * * * * Ouverture des votes * * * * * * * * * * * * * * * * *');
				    }
				    if (autoVote) {
					    recruits.forEach(function(guildMember, guildMemberId) {
						    // Add each member "A l'essai" to args of the command
						    args.push(guildMember.displayName);
						});
				    }
					let index = 0;
			    		// Display a vote for each arg of the command
					for (let arg in args) {
						var embed = new Discord.RichEmbed()
							.addField(args[index], "👍 si vous souhaitez intégrer la recrue, 👊 pour la garder à l'essai, 👎 pour l'exclure")
							.setColor('RED')
						targetChannel.sendEmbed(embed)
						.then(async function (message) {
							// To get the unicode send \emoji in the chat
							await message.react("👍");
							await message.react("👊");
							await message.react("👎");
						}).catch(function() {
							console.log("Can't do the vote");
						});
						index++;
					}
					if (openningVote) {
						client.channels.find("name", "annonces").send("@everyone Les votes pour l'intégration des recrues sont ouverts");
					} else {
						client.channels.find("name", "annonces").send("@everyone Les recrues manquantes ont été ajoutées aux votes");
					}
				}
				message.delete();
			}
			return true;
		}
		return false;
	},

	almanaxSubscriber: function(messageLC, config, message)
	{
		if (messageLC.startsWith(config.prefix + 'almanax_notif')) {
	    	roleAlmanax = message.guild.roles.find("name", "Almanax");
	    	if (null === roleAlmanax) {
	    		message.channel.send('Je suis désolée, je ne parviens pas à trouver le role Almanax');
	    		return true;
	    	}
	    	role = message.member.roles.find("name", "Almanax");
	    	if (null === role) {
	    		message.member.addRole(roleAlmanax);
	    		message.reply('Les notifications d\'Almanax sont désormais actives pour toi')
	    	} else {
	    		message.member.removeRole(roleAlmanax);
	    		message.reply('Les notifications d\'Almanax sont désormais inactives pour toi')
	    	}
			return true;
	    }
		return false;
	},

	gameVote: function(messageLC, config, message)
	{
		if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
			return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
		} else {
			let currentChannel = message.channel;
			if (messageLC.startsWith(config.prefix + 'game_vote')) {
				message.channel.fetchPinnedMessages()
				.then(async function (messages) {
					message = messages.first();
					if (undefined === message) {
						currentChannel.send('Je suis désolée, je ne trouve aucun message épinglé')
						return true;
					}
					// To get the unicode send \emoji in the chat
					await message.react("💩");
					await message.react("👎");
					await message.react("👊");
					await message.react("👍");
					await message.react("😍");
				})
				.catch(console.error);
				return true;
			}
			return false;
		}
	},

	officialMember: function(messageLC, config, message, client)
	{	 
		//Vérifie que le message commence par !!officialmember
		if (messageLC.startsWith(config.prefix + "officialmember")) {
			 //Vérifie que le lanceur de la commande a bien les droits pour le faire
			if (!(message.guild.member(message.author).roles.has('532980986540195840') || message.guild.member(message.author).roles.has('533297290849550336'))) {
				//S'il n'a pas les droits, message d'erreur et fin du code
				return message.reply("**:x: Vous n'avez pas le rôle nécessaire pour cette demande").catch(console.error); 
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
	},


	help: function(messageLC, config, message)
	{
		if (messageLC.startsWith(config.prefix + 'help')) {
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
			} else if ('votes' === args[0]) {
				message.channel.send('**' + config.prefix + 'votes**\n' +
					'Démarre un vote pour l\'intégration de recrues\n' +
					'Si la commande est lancée sans argument (' + config.prefix + 'votes), un vote se lance pour chaque membre du groupe "A l\'essai"\n' +
					'Si la commande est lancé avec des arguments (' + config.prefix + 'votes nom1 nom2...), un vote se lance pour chaque nom passé en argument');
			} else if (0 === args.length) {
				message.channel.send(
					'**Voici la liste de mes pouvoirs (Ce symbole ⚠ signifie "Accessible uniquement aux administrateurs")**\n\n' +
					'**' + config.prefix + 'almanax_notif** : Permet de s\'inscrire pour recevoir chaque jour la notification du service Almanax\n' +
					'**' + config.prefix + 'game_vote** : ⚠ Créé un vote pour le canal courant (À utiliser pour les jeux)\n' +
					'**' + config.prefix + 'help** : Affiche cette liste\n' +
					'**' + config.prefix + 'votes** : ⚠ Lance les votes de fin de semaine pour recrues'
					);
			} else {
				message.channel.send('**Je suis désolée mais je ne trouve pas d\'aide pour la commande "' + args[0] + '"**');
			}
			return true; 
		}
		return false;
	}
}
