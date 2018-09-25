const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "!";


client.on('ready', () => {
    client.channels.find("name", "général").send("Une fois de plus je quitte l'Inglorium pour venir vous aider");
});

client.on('message', message => {
    
    if ('Ah!' === message.content) {
    	message.channel.send('Bah oui!');
  	}

    if(message.content.startsWith(prefix + "reminder")) {
        if(message.channel.type === "dm") {
            return;
        }

        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
        } else {
            let args = message.content.split(' ');
            let time = args[1];
            let timeofreminder = message.content.slice(2, args.length);

            function reminder (remind, toRemind) {
                if(!time) {
                    message.channel.send("**:x: Erreur format, Correcte usage: `"+ prefix + "reminder <time en secondes !> <votre reminder>`**");
                } else {
                if(message.content.includes("reminder .")){
                    setInterval(function() {
                        message.channel.send();
                    }, (time * 1000));
                    message.channel.send("** J'ai enlevé votre reminder avec succès :wink:**");
                    } else {
                        setInterval(function() {
                            message.channel.send(message.content.slice(message.content.indexOf(message.content.split(" ")[2])));
                        }, (time * 1000));
                        message.channel.send("** J'ai ajouter votre reminder avec succès ! Tapez `" + prefix + "reminder .` pour l'enlever :wink:**");
                    }
                }
            }
            reminder(time, timeofreminder);
        }
    }
    
    if(message.content.startsWith(prefix + "votes")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
        } else {
            targetChannel = client.channels.find("name", "les_nouveaux");
            targetChannel.send('* * * * * * * * * * * * * * * * * Ouverture des votes * * * * * * * * * * * * * * * * *');
            let args = message.content.split(" ").slice(1);
            if (1 === message.content.split(" ").length) {
                message.guild.roles.find("name", "Nouveaux").members.forEach(function(guildMember, guildMemberId) {
                    args.push(guildMember.user.username);
                });
            }
            let thingToEcho = args.join(" ");
            let index = 0;
            for (let arg in args) {
                var embed = new Discord.RichEmbed()
                    .addField(args[index], "👍 si vous souhaitez intégrer la recrue, 👊 pour la garder à l'essai, 👎 pour l'exclure")
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
            client.channels.find("name", "annonces").send("@everyone Les votes pour l'intégration des recrues sont ouverts");
            message.delete();
        }
    }
    let messageLC = message.content.toLowerCase()
    if ("salut" === messageLC || "bonjour" === messageLC || "yo" === messageLC || "hi" === messageLC || "plop" === messageLC) {
        message.channel.send('Salut ' + message.member.displayName
                            );
    }
   
//End of on message
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
