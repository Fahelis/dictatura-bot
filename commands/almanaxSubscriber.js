const config = require("./config.json");

exports.run = function(client, message, args)
{
	roleAlmanax = message.guild.roles.find("name", "Almanax");
	if (null === roleAlmanax) {
		message.channel.send('Je suis désolée, je ne parviens pas à trouver le role Almanax');
		return;
	}
	role = message.member.roles.find("name", "Almanax");
	if (null === role) {
		message.member.addRole(roleAlmanax);
		message.reply('Les notifications d\'Almanax sont désormais actives pour toi')
	} else {
		message.member.removeRole(roleAlmanax);
		message.reply('Les notifications d\'Almanax sont désormais inactives pour toi')
	}
}