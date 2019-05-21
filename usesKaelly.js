module.exports = {
	services: function(message, config)
	{
		let newMessage = message;
		if (undefined === newMessage.embeds[0]) {
			return true;
		}
		
		let newMessageTitle = newMessage.embeds[0].title;
		let typeMessage;
		if (newMessageTitle.startsWith('Almanax') && !newMessageTitle.includes('au')) {
			typeMessage = 'Almanax';
		} else if (newMessageTitle.includes('Enutrosor')) {
			typeMessage = 'Enutrosor';
		} else if (newMessageTitle.includes('Srambad')) {
			typeMessage = 'Srambad';
		} else if (newMessageTitle.includes('Xélorium')) {
			typeMessage = 'Xélorium';
		} else if (newMessageTitle.includes('Ecaflipus')) {
			typeMessage = 'Ecaflipus';
		} else {
			return true;
		}

		message.channel.fetchPinnedMessages()
			.then(function(messages) {
				let handled = false;
				messages.forEach(function(message) {
					// If daily almanax message and pinned message is almanax
					if ('Almanax' === typeMessage && message.embeds[0].title.startsWith('Almanax')) {
						if (newMessageTitle !== message.embeds[0].title) {
							message.delete();
							newMessage.pin();
							// Notifier chaque membre du groupe Almanax
							notifyAlmanaxGroup(config, message, newMessage);
							handled = true;
                            return;
						} else {
							handled = true;
                            return;
						}
					} else if ('Enutrosor' === typeMessage && message.embeds[0].title.includes('Enutrosor')
						|| ('Srambad' === typeMessage && message.embeds[0].title.includes('Srambad'))
						|| ('Xélorium' === typeMessage && message.embeds[0].title.includes('Xélorium'))
						|| ('Ecaflipus' === typeMessage && message.embeds[0].title.includes('Ecaflipus'))
						) {
						message.delete();
						newMessage.pin();
						handled = true;
                        return;
					}
				});

				// Just in case if there is no pinned message to replace (not should append)
				if (false === handled) {
					if (newMessageTitle.startsWith('Almanax')) {
						// Notifier le groupe Almanax
						notifyAlmanaxGroup(config, message, newMessage);
					}
					message.pin();
				}
			})
			.catch(console.error);
		return true;
	},

	tweetsFilter: function(message, Discord, client)
	{
	        let embed = message.embeds[0];
	        if (undefined === embed) {
	        	return false;
	        }
	        if (embed.title.includes('Tweet')) {
	            // Then it's a tweet from Dofus
				let messageContent = embed.description.toLowerCase();
	            if (!(messageContent.includes('maintenance') || messageContent.includes('perturbations')
					|| messageContent.includes('connexion') || messageContent.includes('correctif')
                	|| messageContent.includes('redémarrage') || messageContent.includes('réouverture')
                	|| messageContent.includes('déploiement') || messageContent.includes('mise à jour'))) {
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
	        return true;
	}
}

function notifyAlmanaxGroup(config, message, newMessage)
{
	let roleAlmanax = message.guild.roles.find("name", "Almanax");
	roleAlmanax.members.forEach(function(member) {
		newMessage.channel.send(config.notificationAlmanax + member);	
	});
}
