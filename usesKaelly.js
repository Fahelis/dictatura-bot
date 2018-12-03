module.exports = {
	services: function(message, config, messageLC)
	{
		if ('services' == message.channel.name && config.kaellyId === message.member.id) {
			newMessage = message;
			if (undefined === newMessage.embeds[0]) {
				return;
			}
			newMessageTitle = newMessage.embeds[0].title;
			endFunction = false;
			alreadyPinned = false;
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
							} else if (pinnedMessageTitle === newMessageTitle
							&& newMessage.embeds[0].fields[0]['value'] === message.embeds[0].fields[0]['value']) {
								aleradyPinned = true;
							}
						}
					});
					if (endFunction) {
						return;
					}
					if (endFunction) {
						return;
					}
					if (true === alreadyPinned && 
					(newMessageTitle.startsWith('Almanax')
					|| newMessageTitle.includes('Enutrosor')
					|| newMessageTitle.includes('Srambad')
					|| newMessageTitle.includes('Xélorium')
					|| newMessageTitle.includes('Ecaflipus'))) {
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
	},

	tweetsFilter: function(config, message, Discord)
	{
	    if (config.kaellyId === message.member.id && 'ghost_channel' === message.channel.name) {
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
	}
}