const config = require('../config.json');
const utils = require('../utils');

exports.run = function(message)
{
	if (!utils.isDirector(message.member))
	{
		return message.reply(config.permissionDeniedMessage);
	}
	let currentChannel = message.channel;
	message.channel.fetchPinnedMessages()
	.then(async function (messages) {
		message = messages.first();
		if (undefined === message) {
			currentChannel.send('Je suis désolée, je ne trouve aucun message épinglé')
			return;
		}
		// To get the unicode send \emoji in the chat
		await message.react("💩");
		await message.react("👎");
		await message.react("👊");
		await message.react("👍");
		await message.react("😍");
	})
	.catch(console.error);
}