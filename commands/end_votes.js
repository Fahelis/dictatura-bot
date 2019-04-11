const config = require('../config.json');
const utils = require('../utils');

exports.run = function(client, message)
{
	if (!utils.isDirector(message.member))
	{
		return message.reply(config.permissionDeniedMessage);
	}

	let generalChannel = client.channels.find('name', 'général');
	let annoncesChannel = client.channels.find('name', 'annonces');
	message.channel.fetchPinnedMessages()
		.then(function(messages) {
			let hasVote = false;
			messages.forEach(function(message) {
				if (undefined === message.embeds[0]) {
					return;
				}
				if (!hasVote) {
					hasVote = true;
					message.channel.send('* * * * * * * * * * * * * * * * * Fermeture des votes * * * * * * * * * * * * * * * * *');
					annoncesChannel.send('**Résultat des votes hebdomadaires**');
				}
				let userName = message.embeds[0].fields[0].name;
				let voteResult = voteCount(message);

				let user = message.guild.members.find('displayName', userName);
				switch (voteResult) {
					case '👍':
						if (null === user) {
							annoncesChannel.send(userName + ' fait maintenant partie des membres officiels');
						} else {
							generalChannel.send('!!official_member ' + user)
								.then(function(message) {
									message.delete();
								});
						}
						break;
					case '👊':
						if (null === user) {
							annoncesChannel.send(userName + ' voit sa période d\'essai prolongée d\'une semaine');
						} else {
							annoncesChannel.send(`${memberToFind.displayName} voit sa période d\'essai prolongée d\'une semaine`);
						}
						break;
					case '👎':
						if (null === user) {
							annoncesChannel.send(userName + ' nous quitte');
						} else {
							generalChannel.send('!!kick_recruit ' + user)
								.then(function(message) {
									message.delete();
								});
						}

						break;
					default:
						console.log('Emote non utilisée pour les votes ' + reaction)
				}
			});
		});
}

function voteCount(message)
{
	let nbUp = -1
	let nbNeutral = -1
	let nbDown = -1
	let results = { 'nbUp' : -1, 'nbNeutral' : -1, 'nbDown': -1 };

	message.reactions.forEach(function(reaction) {
		switch (reaction) {
			case '👍':
				results['nbUp']++;
				break;
			case '👊':
				results['nbNeutral']++;
				break;
			case '👎':
				results['nbDown']++;
				break;
			default:
				console.log('Emote non utilisée pour les votes ' + reaction)
		}
	});

	message.channel.send(userName + ' a recueilli ' + results['nbUp'] + '👍, ' +
		results['nbNeutral'] + '👊 et ' + results['nbDown'] + '👎');
	result = '👊';
	if (results['nbUp'] > results['nbNeutral'] && results['nbUp'] > results['nbDown']) {
		result = '👍';
	} else if (results['nbDown'] > results['nbUp'] && results['nbDown'] > results['nbNeutral']) {
		result = '👎';
	}

	return result;
}