module.exports = {

	isDirector: function(member)
	{
		if(!(null !== member.roles.find('name', 'Meneur') || null !== member.roles.find('name', 'Bras droits'))) {
			return false;
		}
		return true;
	},
	
	log: function(client, logMessage)
	{
		console.log(logMessage);
		client.channels.find('name', 'iord_logs').send(logMessage);
		client.channels.find('name', 'iord_logs_archives').send(logMessage);
	},

	cleanLogs: function(client)
	{
		logsChannel = client.channels.find('name', 'iord_logs');
	    let compareDate = new Date();
	    const nbDaysKeep = 7;
	    compareDate.setDate(compareDate.getDate() - nbDaysKeep);

	    logsChannel.fetchMessages()
	  		.then(messages => {
	  			messages.filter(message => message.createdAt < compareDate).deleteAll();
	  		})
	  		.catch(error => {
	  			module.exports.log(client, error);
	  		});
	},

	cleanUp: function(message, config, cmd)
	{
		if ('PINS_ADD' === message.type && message.author.bot) {
				message.delete(2000);
		} else {
			spaceIndex = message.content.indexOf(' ');
			let cmd;
			if (-1 !== spaceIndex) {
				cmd = message.content.slice(0, spaceIndex);
			} else {
				cmd = message.content;
			}
			// Delete daily almanax notifications (for subscribers)
			if (message.content.startsWith(config.notificationAlmanax)
				// Delete Kaelly's commands
				|| config.kaellyCommands.includes(cmd)
				|| (message.content.startsWith('Les métiers suivants ont été ajouté') && message.author.bot)
				) {
				message.delete(5000);
			}
		}
	}
}
