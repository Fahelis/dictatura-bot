const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

/********************** ? Start : When the bot is ready ? **********************/
/*
client.on('ready', () => {
    let tabMessages = [
        "Une fois de plus je quitte l'Inglorium pour vous offrir mon aide",
        'Je suis de retour pour le plus grand plaisir de tous, en particulier celui de ce cher Huitre',
        "J'ai du retourner en Inglorium pour régler une affaire mais me revoila auprès de vous"
    ];
    let randomIndex = Math.floor(Math.random()*tabMessages.length);
    client.channels.find("name", "général").send(tabMessages[randomIndex]);
});
*/

/********************** ! End : When the bot is ready ! **********************/

/********************** ? Start : When a message is send ? **********************/

client.on('message', message => {
    let messageLC = message.content.toLowerCase().trim();
    
    /********************** ? Start : Short responses to short messages ? **********************/
    if (messageLC.includes('ah') && 8 >= messageLC.length && !config.tabDictaturaBotId.includes(message.member.id)) {
    	message.channel.send('Bah oui!');
  	} else if ((messageLC.startsWith('salut') || messageLC.startsWith('bonjour') || messageLC.startsWith('yo')
               || messageLC.startsWith('hi') || messageLC.startsWith('plop') || messageLC.startsWith('hello'))
               && messageLC.includes('iord')) {
        message.channel.send(`Bonjour à toi ${message.member.displayName}`);
    } else if ('salut' === messageLC || 'bonjour' === messageLC || 'yo' === messageLC || 'hi' === messageLC
          || 'plop' === messageLC|| 'hello' === messageLC) {
        message.channel.send(`Salut ${message.member.displayName}`);
    } else if ('merci iord' === messageLC) {
        message.channel.send("Mais de rien, c'est un plaisir");
    }

    /********************** ! End : short responses to short messages ! **********************/
    
    /********************** ? Start : Reminder functionality ? **********************/
    
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
    
    /********************** ! End : Reminder functionality ! **********************/
    
    /********************** ? Start : Votes functionality ? **********************/
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
    
    /********************** ! End : Votes functionality ! **********************/
    

    /********************** ? Start : Auto pinned for almanax and portals ? **********************/
    
	if ('services' == message.channel.name && config.kaellyId === message.member.id) {
		newMessage = message;
		newMessageTitle = newMessage.embeds[0].title;
		endFunction = false;
		message.channel.fetchPinnedMessages()
			.then(function(messages) {
				messages.forEach(function(message) {
					if (newMessageTitle.startsWith('Almanax')) {
						if (message.embeds[0].title.startsWith('Almanax')) {
							if (newMessageTitle !== message.embeds[0].title) {
								message.unpin();
								newMessage.pin();
								// Notifier le groupe Almanax
								newMessage.channel.send(config.prefix + 'Notification almanax pour groupe ' + message.guild.roles.find("name", "Almanax"));
								endFunction = true;
								return;
							} else {
								endFunction = true;
								return;
							}

						}
					} else if (newMessageTitle.includes('Enutrosor')
					|| newMessageTitle.includes('Srambad')
					|| newMessageTitle.includes('Xélorium')
					|| newMessageTitle.includes('Ecaflipus')) {
						if (newMessageTitle.includes('new')) {
							newMessageTitle = newMessageTitle.substr(6);
						} else {
							newMessageTitle = newMessageTitle;	
						}
						if (message.embeds[0].title.includes('new')) {
							pinnedMessageTitle = message.embeds[0].title.substr(6);
						} else {
							pinnedMessageTitle = message.embeds[0].title;	
						}
						if (pinnedMessageTitle === newMessageTitle
						&& newMessage.embeds[0].fields[0]['value'] !== message.embeds[0].fields[0]['value']) {
							message.unpin();
							newMessage.pin();
							endFunction = true;
							return;
						}
					}
				});
				if (endFunction) {
					return;
				}
				if (endFunction) {
					return;
				}
				if (newMessageTitle.startsWith('Almanax')
				|| newMessageTitle.includes('Enutrosor')
				|| newMessageTitle.includes('Srambad')
				|| newMessageTitle.includes('Xélorium')
				|| newMessageTitle.includes('Ecaflipus')) {
					if (newMessageTitle.startsWith('Almanax')) {
						// Notifier le groupe Almanax
						newMessage.channel.send(config.prefix + 'Notification almanax pour groupe ' + message.guild.roles.find("name", "Almanax"));
					}
					message.pin();
				}
			})
			.catch(console.error);
	}
	if (config.prefix + 'notification almanax pour groupe <@&' + message.guild.roles.find("name", "Almanax").id + '>' === messageLC) {
		message.delete();
	}

    /********************** ! End : Auto pinned for almanax and portals ! **********************/
    
    
    /********************** ? Start : Subscribe Almanax ? **********************/

    if (messageLC.startsWith(config.prefix + 'almanax_notif')) {
    	roleAlmanax = message.guild.roles.find("name", "Almanax");
    	console.log(message.member.roles.find("name", "Almanax"));
    	role = message.member.roles.find("name", "Almanax");
    	if (null === role) {
    		message.member.addRole(roleAlmanax);
    		message.reply('Les notifications d\'Almanax sont désormais actives pour toi')
    	} else {
    		message.member.removeRole(roleAlmanax);
    		message.reply('Les notifications d\'Almanax sont désormais inactives pour toi')
    	}
    }

    /********************** ! End : Subscribe Almanax ! **********************/


    /********************** ? Start : Tweets filter ? **********************/


    // Ghost_channel dev : 494101417368354816, prod : 494103730594119690
    if (config.kaellyId === message.member.id && '494103730594119690' === message.channel.id) {
        let embed = message.embeds[0];
        if (embed.title.includes('Tweet')) {
            // Then it's a tweet from Dofus
			let messageContent = embed.description.toLowerCase();
            if (!(messageContent.includes('maintenance') || messageContent.includes('perturbations')
                  || messageContent.includes('connexion') || messageContent.includes('correctif')
                 || messageContent.includes('redémarrage') || messageContent.includes('réouverture'))) {
                message.delete();
            } else {
            	var myEmbed = new Discord.RichEmbed()
					.setTitle('Information')
					.setDescription(embed.description)
                    .setColor('BLACK');
                if (embed.image) {
                    myEmbed.setImage(embed.image.url);
                }
                client.channels.find('name', 'annonces').sendEmbed(myEmbed);
                message.delete();
            }
        }
    }
    /********************** ! End : Tweets filter ! **********************/

});
/********************** ! End : When a message is send ! **********************/

/********************** ? Start : Timer functionality ? **********************/

const TARGET_DAY = 5; // Days go from 0 (sunday) to 6 (saturday)
const TARGET_HOUR = 17; // Hours go from 0 to 23
const TARGET_MINUTE = 0; // Minute of the hour from 0 to 59
const CHECK_EVERY = 60; // In secondes

setInterval(function() {
    var d = new Date();
    if (TARGET_DAY === d.getDay() && TARGET_HOUR === (d.getHours()+2) && TARGET_MINUTE === d.getMinutes()) {  
        client.channels.find('name', 'les_nouveaux').send(config.prefix + 'votes');
    }
}, CHECK_EVERY * 1000); // Check every CHECK_EVERY secondes

/********************** ! End : Timer functionality ! **********************/


/********************** ? Start : Handle new member ? **********************/

client.on("guildMemberAdd", (member) => {
    client.channels.find('name', 'annonces').send("Une nouvelle recrue a rejoint le repaire, faites lui un bon accueil !");
    member.addRole(member.guild.roles.find("name", "A l'essai"));
	member.send("Salutations nouvelle recrue\nMerci de rejoindre la Dictatura Dei, j'espère que tu t'y plairas\n"
	+ "Afin que tout le monde puisse facilement t'identifier il te sera demandé de prendre ici le même nom que dans le Monde des Douze\n"
	+ "William pourra t'aider si tu ne sais pas comment faire\nA très bientôt");
});

/********************** ! End : Handle new member ! **********************/

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
