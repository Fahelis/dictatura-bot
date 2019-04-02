exports.run = function(client, member, args)
{
	member = args;

	client.channels.find('name', 'annonces').send("Une nouvelle recrue a rejoint le repaire, faites lui un bon accueil !");
    member.addRole(member.guild.roles.find("name", "A l'essai"));
	member.send("Salutations nouvelle recrue\nMerci de rejoindre la Dictatura Dei, j'espère que tu t'y plairas\n"
	+ "Afin que tout le monde puisse facilement t'identifier il te sera demandé de prendre ici le même nom que dans le Monde des Douze\n"
	+ "Le meneur ou un bras droit pourra t'aider si tu ne sais pas comment faire\nÀ très bientôt");
}