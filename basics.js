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

	simpleAnswers: function (messageLC, message, config)
	{
		if (messageLC.includes('ah') && 8 >= messageLC.length && !config.tabDictaturaBotId.includes(message.member.id)) {
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
	},

	handleNewMember: function(client, member)
	{
		client.channels.find('name', 'annonces').send("Une nouvelle recrue a rejoint le repaire, faites lui un bon accueil !");
	    member.addRole(member.guild.roles.find("name", "A l'essai"));
		member.send("Salutations nouvelle recrue\nMerci de rejoindre la Dictatura Dei, j'espère que tu t'y plairas\n"
		+ "Afin que tout le monde puisse facilement t'identifier il te sera demandé de prendre ici le même nom que dans le Monde des Douze\n"
		+ "William pourra t'aider si tu ne sais pas comment faire\nA très bientôt");
	},

	cleanUp: function(message, config)
	{
		if ('PINS_ADD' === message.type) {
			if ("services" === message.channel.name && config.tabDictaturaBotId.includes(message.author.id)) {
				message.delete();
			}
		} else {
			if (message.content.startsWith(config.notificationAlmanax)) {
				message.delete();
			}
		}
	}
}