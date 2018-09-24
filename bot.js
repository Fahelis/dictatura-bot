const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "!";


client.on('ready', () => {
    bot.channels.get("général").send('Je suis là bande de moules !');
});

client.on('message', message => {
    if ('ping' === message.content) {
    	message.reply('pong');
  	}
    
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
    
    if(message.content.startsWith(prefix + "vote")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
        } else {
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ");
            let thumbsupEmoji = client.emojis.find("name", "thumbsup");
            if (thumbsupEmoji === null) {
                message.channel.send("Je n'ai pas pu trouver l'emoji thumbsup");
            }
            let punchEmoji = client.emojis.find("name", "punch");
            if (punchEmoji === null) {
                message.channel.send("Je n'ai pas pu trouver l'emoji punch");
            }
            let thumbsdownEmoji = client.emojis.find("name", "thumbsdown");
            if (thumbsdownEmoji === null) {
                message.channel.send("Je n'ai pas pu trouver l'emoji thumbsdown");
            }
            var embed = new Discord.RichEmbed()
                .addField(thingToEcho, ":thumbsup: pour intégrer la recrue, :punch: pour la laisser encore à l'essai ou :thumbsdown: pour l'exclure")
            message.guild.channels.find("name", "les_nouveaux").sendEmbed(embed)
            .then(function (message) {
                message.react("👍")
                message.react(punchEmoji)
                message.react("👎")
            }).catch(function() {
                message.channel.send('J'ai eu un problème');
            });
        }
    }
    
    

});
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
