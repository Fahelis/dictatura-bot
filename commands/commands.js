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
				    return targetChannel.send('Je ne trouve pas la moindre recrue.\n'
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
		}
	},

	reminder: function(message, config) {
	    if(message.content.startsWith(config.prefix + "reminder")) {
	        if(message.channel.type === "dm") {
	            return;
	        }

	        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
	            return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
	        } else {
	            let args = message.content.split(' ');
	            let time = args[1];
	            let timeofreminder = message.content.slice(2, args.length);

	            function reminder (remind, toRemind) {
	                if(!time) {
	                    message.channel.send("**:x: Erreur format, Correcte usage: `"+ config.prefix + "reminder <time en secondes !> <votre reminder>`**");
	                } else {
	                if(message.content.includes("reminder .")){
	                    setInterval(function() {
	                        message.channel.send();
	                    }, (time * 1000));
	                    message.channel.send("** J'ai enlevé votre reminder avec succès :wink:**");
	                    } else {
	                        setInterval(function() {
	                            message.channel.send(message.content.slice(message.content.indexOf(message.content.split(" ")[2])));
	                        }, (time * 1000));
	                        message.channel.send("** J'ai ajouter votre reminder avec succès ! Tapez `" + config.prefix + "reminder .` pour l'enlever :wink:**");
	                    }
	                }
	            }
	            reminder(time, timeofreminder);
	        }
	    }
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
	    }
	}
}