const Discord = require('discord.js');
const config = require('../config.json');
const utils = require('../utils');

exports.run = function(client, message, args)
{
	if (!utils.isDirector(message.member))
	{
		return message.reply(config.permissionDeniedMessage);
	}
	targetChannel = client.channels.find("name", "les_nouveaux");
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
	    targetChannel = client.channels.find("name", "le_bureau_de_la_direction");
	    targetChannel.send('Aucune recrue présente dans le repaire\n Il faudrait que l\'un de vous '+
			roleMeneur +' ou '+ roleBD + 'lance le(s) vote(s) manuellement si besoin');
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
		// Display a vote for each arg of the command
		args.forEach (function (arg) {
			var embed = new Discord.RichEmbed()
				.addField(arg, "👍 intégrer la recrue, 👊 prolonger l'essai, 👎 exclure")
				.setColor('RED')
			targetChannel.sendEmbed(embed)
			.then(async function (message) {
				// To get the unicode send \emoji in the chat
				await message.react("👍");
				await message.react("👊");
				await message.react("👎");
				await message.pin();
			}).catch(function() {
				console.log("Can't do the vote");
				client.channels.find("name", "iord_logs").send("Can't do the vote");
			});
		});
		if (openningVote) {
			client.channels.find("name", "annonces").send("@everyone Les votes pour l'intégration des recrues sont ouverts");
		} else {
			client.channels.find("name", "annonces").send("@everyone Les recrues manquantes ont été ajoutées aux votes");
		}
	}
	message.delete();
}
