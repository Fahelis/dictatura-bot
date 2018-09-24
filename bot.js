const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "!";


client.on('ready', () => {
    client.channels.get("463314734108639234").send('Je suis là bande de moules !');
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
    
    if(message.content.startsWith(prefix + "votes")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
            return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
        } else {
            let args = message.content.split(" ").slice(1);
            if (1 === message.content.split(" ").length) {
                message.channel.send('Pas darguments');
                let roleRecrues = message.guild.roles.find("name", "Nouveaux");
                for (let memberId in roleRecrues.members.array()) {
                    message.channel.send('Votons');
                    message.channel.send(membersArray[guildMemberId].user.username));
                }
                //args = client.roles.get("name", "Nouveaux").members;
            }
            let thingToEcho = args.join(" ");
            let index = 0;
            for (let arg in args) {
                console.log('New line of vote');
                var embed = new Discord.RichEmbed()
                    .addField(args[index], " :thumbsup: pour intégrer la recrue, :punch: pour la laisser encore à l'essai, :thumbsdown: pour l'exclure")
                message.guild.channels.find("name", "les_nouveaux").sendEmbed(embed)
                .then(function (message) {
                    // To get the unicode send \emoji in the chat
                    message.react("👍");
                    console.log('First reaction incoming.');
                    message.react("👊");
                    console.log('Second reaction incoming.');
                    message.react("👎");
                    console.log('Third reaction incoming.');
                }).catch(function() {
                    console.log("Can't do the vote");
                });
                index++;
            }
        }
    }  
    

});
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
