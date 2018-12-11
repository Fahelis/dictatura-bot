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

	help: function(messageLC, config, message)
	{
		if (messageLC.startsWith(config.prefix + 'help')) {
            let args = message.content.split(" ").slice(1);
			if ('almanax_notif' === args[0]) {
				message.channel.send('**' + config.prefix + 'almanax_notif**\n' +
					'Active ou désactive (si elle est déjà active) la notification du canal "services" lorsque l\'Almanax est publié, ' +
					'même si le canal est muet');
			} else if ('help' === args[0]) {
				message.channel.send('**' + config.prefix + 'help**\n' +
					'Affiche la liste des commandes et leur utilité');
			} else if ('votes' === args[0]) {
				message.channel.send('**' + config.prefix + 'votes**\n' +
					'Démarre un vote\n' +
					'Si la commande est lancée sans argument (' + config.prefix + 'votes), un vote se lance pour chaque membre du groupe "A l\'essai"\n' +
					'Si la commande est lancé avec des arguments (' + config.prefix + 'votes nom1 nom2...), un vote se lance pour chaque nom passé en argument');
			} else if (0 === args.length) {
				message.channel.send('**Voici la liste de mes pouvoirs (Ce symbole ⚠ signifie "Accessible uniquement aux administrateurs")**\n\n' +
					'**' + config.prefix + 'almanax_notif** : Permet de s\'inscrire pour recevoir chaque jour la notification du service Almanax\n' +
					'**' + config.prefix + 'help** : Affiche cette liste\n' +
					'**' + config.prefix + 'votes** : ⚠ Lance les votes de fin de semaine pour recrues');
			} else {
				message.channel.send('**Je suis désolée mais je ne trouve pas d\'aide pour la commande "' + args[0] + '"**');
			}
			return true; 
		}
		return false;
	},
	
	notifications: function(config, message)
	{
		// TODO. Add message in config
		if (messageLC.startsWith(config.prefix + 'Notification almanax pour ')) {
			message.delete();
			return true;
		}
		return false;
	}
}
