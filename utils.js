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
	}
}
