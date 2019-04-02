const Discord = require('discord.js');
const config = require('../config.json');
const utils = require('../utils');

exports.run = function(client, message, args)
{
	console.log(message);
	console.log(message.member);
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
	    targetChannel.send('Je ne trouve pas la moindre recrue.\n'
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
