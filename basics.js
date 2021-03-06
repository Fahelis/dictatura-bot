module.exports = {
	startMessages: function (client)
	{
		let tabMessages = [
	        "Une fois de plus je quitte l'Inglorium pour vous offrir mon aide",
	        'Je suis de retour pour le plus grand plaisir de tous, en particulier celui de ce cher Huitre',
	        "J'ai du retourner en Inglorium pour régler une affaire mais me revoila auprès de vous"
	    ];
	    let randomIndex = Math.floor(Math.random()*tabMessages.length);
	    client.channels.find("name", "général").send(tabMessages[randomIndex]);
	},

	simpleAnswers: function (message, config)
	{
		let messageLC = message.toLowerCase().trim();
		if (messageLC.includes('ah') && 8 >= messageLC.length && !message.author.bot) {
	    	message.channel.send('Bah oui!');
	  	} else if ((messageLC.startsWith('salut') || messageLC.startsWith('bonjour') || messageLC.startsWith('yo')
       || messageLC.startsWith('hi') || messageLC.startsWith('plop') || messageLC.startsWith('hello')
       || messageLC.startsWith('coucou'))
       && messageLC.includes('iord')) {
	        message.channel.send(`Bonjour à toi ${message.member.displayName}`);
	    } else if ('salut' === messageLC || 'bonjour' === messageLC || 'yo' === messageLC || 'hi' === messageLC
	          || 'plop' === messageLC|| 'hello' === messageLC) {
	        message.channel.send(`Salut ${message.member.displayName}`);
	    } else if (messageLC.includes('merci iord')) {
	        message.channel.send("Mais de rien, c'est un plaisir");
	    }
	}
}
