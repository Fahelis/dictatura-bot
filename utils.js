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
	}
}
