const config = require('../config.json');
const utils = require('../utils');

exports.run = function(client, message)
{
	if (!utils.isDirector(message.member))
	{
		return message.reply(config.permissionDeniedMessage);
	}

	const ids = [];
	let currentChannel = message.channel;
	let generalChannel = client.channels.find('name', 'général');
	let annoncesChannel = client.channels.find('name', 'annonces');
	currentChannel.fetchPinnedMessages()
		.then(function(pinnedMessages) {
			let hasVote = false;
			pinnedMessages.forEach(function(pinnedMessage) {
				if (undefined === pinnedMessage.embeds[0]) {
					return;
				}
				ids.push(pinnedMessage.id);
				if (!hasVote) {
					hasVote = true;
					currentChannel.send('* * * * * * * * * * * * * * * * * Fermeture des votes * * * * * * * * * * * * * * * * *');
					annoncesChannel.send('**Résultat des votes hebdomadaires**');
				}
			});
		})
		.finally(function() {
			showResult(currentChannel, generalChannel, annoncesChannel, ids, message);
		});
}

function showResult(currentChannel, generalChannel, annoncesChannel, ids, message)
{
	ids.forEach (function (id) {
		currentChannel.fetchMessage(id)
			.then(function (voteMessage) {
				console.log(voteMessage);
				let userName = voteMessage.embeds[0].fields[0].name;
				let user = message.guild.members.find('displayName', userName);
				let voteResult = voteCount(voteMessage, userName);
				console.log(voteResult);
				switch (voteResult) {
					case '👍':
						if (null === user) {
							annoncesChannel.send(userName + ' fait maintenant partie des membres officiels');
						} else {
							generalChannel.send('!!official_member ' + user)
								.then(function(cmdMessage) {
									cmdMessage.delete();
								});
						}
						break;
					case '👊':
						if (null === user) {
							annoncesChannel.send(userName + ' voit sa période d\'essai prolongée d\'une semaine');
						} else {
							annoncesChannel.send(`${userName} voit sa période d\'essai prolongée d\'une semaine`);
						}
						break;
					case '👎':
						if (null === user) {
							annoncesChannel.send(userName + ' nous quitte');
						} else {
							generalChannel.send('!!kick_recruit ' + user)
								.then(function(cmdMessage) {
									cmdMessage.delete();
								});
						}

						break;
					default:
						console.log('This code should not be reached')
				}

			});
	});
}

function voteCount(message, userName)
{
	let nbUp;
	let nbNeutral;
	let nbDown;
	for (let reaction in message.reactions) {
		switch (reaction) {
			case '👍':
				nbUp = reaction.count-1;
				break;
			case '👊':
				nbNeutral = reaction.count-1;
				break;
			case '👎':
				nbDown = reaction.count-1;
				break;
			default:
				console.log('Emote non utilisée pour les votes ' + reaction)
		}
	}

	message.channel.send(userName + ' a recueilli ' + nbUp + '👍, ' +
		nbNeutral + '👊 et ' + nbDown + '👎');
	result = '👊';
	if (nbUp > nbNeutral && nbUp > nbDown) {
		result = '👍';
	} else if (nbDown > nbUp && nbDown > nbNeutral) {
		result = '👎';
	}

	return result;
}
