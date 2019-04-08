module.exports = {
	services: function(message, config)
	{
		newMessage = message;
		if (undefined === newMessage.embeds[0]) {
			return true;
		}
		newMessageTitle = newMessage.embeds[0].title;
		tabPinnedMessages = [];
		tabPinnedMessages['almanax'] = false;
		config.dimensions.forEach(function(dimension) {
			tabPinnedMessages[dimension] = false;
		});
		message.channel.fetchPinnedMessages()
			.then(function(messages) {
				messages.forEach(function(message) {
					// Check what pinned message it is and check in in tab
					for (var key in tabPinnedMessages){
					    if (tabPinnedMessages.hasOwnProperty(key)) {
							if (message.embeds[0].title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(key)) {
								tabPinnedMessages[key] = true;
							}
					    }
					}
					if (newMessageTitle.startsWith('Almanax') && !newMessageTitle.includes('au')) {
						if (message.embeds[0].title.startsWith('Almanax')) {
							if (newMessageTitle !== message.embeds[0].title) {
								message.delete();
								newMessage.pin();
								// Notifier chaque membre du groupe Almanax
								notifyAlmanaxGroup(config, message, newMessage);
                                return true;
							} else {
								return true;
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
							message.delete();
							newMessage.pin();
							return; true
						} else if (pinnedMessageTitle === newMessageTitle
						&& newMessage.embeds[0].fields[0]['value'] === message.embeds[0].fields[0]['value']) {
							return true;
						}
					}
				});

				for (var key in tabPinnedMessages){
					if (false === tabPinnedMessages[key] &&
						newMessageTitle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(key)) {
						if (newMessageTitle.startsWith('Almanax')) {
							// Notifier le groupe Almanax
							notifyAlmanaxGroup(config, message, newMessage);
						}
						message.pin();
					}
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
