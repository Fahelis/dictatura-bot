const Discord = require('discord.js');
const utils = require('../utils');

exports.run = async (message, args) => {
  if (!utils.isDirector(message.member))
		{
			return message.reply(config.permissionDeniedMessage);
		}
  if(!args[0]) {
    return message.channel.send('You must specify the number of messages to delete');
    }

  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`:pencil2: ${args[0]} messages have been deleted.`).then(msg => msg.delete(5000));
  });
} 
