const Discord = require('discord.js');
const config = require('../config.json');
const utils = require('../utils');

exports.run = function(client, message, args)
{
	let switchTo = args[0].toLowerCase();
	if ('on' === switchTo) {
		client.login(process.env.AUTO_VOTE) = TRUE;
	} else if ('off' === switchTo) {
		client.login(process.env.AUTO_VOTE) = FALSE;
	}
}
