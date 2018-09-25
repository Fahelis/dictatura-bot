const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "!";

/********************** ? Start : When the bot is ready ? **********************/

client.on('ready', () => {
    client.channels.find("name", "général").send("Une fois de plus je quitte l'Inglorium pour venir vous aider");
});

/********************** ! End : When the bot is ready ! **********************/

/********************** ? Start : When a message is send ? **********************/

client.on('message', message => {
    
    /********************** ? Start : Short responses to short messages ? **********************/
    
    let messageLC = message.content.toLowerCase().trim();
    if ('ah!' === messageLC || 'ah...' === messageLC) {
    	message.channel.send('Bah oui!');
  	} else if ((messageLC.startsWith('salut') || messageLC.startsWith('bonjour') || messageLC.startsWith('yo')
               || messageLC.startsWith('hi') || messageLC.startsWith('plop') || messageLC.startsWith('hello'))
               && messageLC.includes('iord')) {
        message.channel.send(`Bonjour à toi ${message.member.displayName}`);
    } else if ('salut' === messageLC || 'bonjour' === messageLC || 'yo' === messageLC || 'hi' === messageLC
          || 'plop' === messageLC|| 'hello' === messageLC) {
        message.channel.send(`Salut ${message.member.displayName}`);
    }

    /********************** ! End : short responses to short messages ! **********************/
    
    /********************** ? Start : Reminder fonctionnality ? **********************/
    
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
    
    /********************** ! End : Reminder fonctionnality ! **********************/
    
    /********************** ? Start : Votes fonctionnality ? **********************/
    
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
    /********************** ! End : Votes fonctionnality ! **********************/
    
    /********************** ? Start : Tweets filter ? **********************/
    
    // Kaelly's Id and Ghost_channel's Id (Dictatura Dei)
    if ('202917352378073088' === message.member.id && '494103730594119690' === message.channel.id
        && message.content.includes('@DOFUSfr')) {
        // Then it's a tweet from Dofus
        if (!(messageLC.includes('maintenance') || messageLC.includes('perturbations')
              || messageLC.includes('connexion') || messageLC.includes('correctif')
             || messageLC.includes('redémarrage') || messageLC.includes('réouverture'))) {
            message.delete();
        } else {
            client.channels.find('name', 'annonces').send(message.content);
        }
    }
    /********************** ! End : Tweets filter ! **********************/

});

/********************** ! End : When a message is send ! **********************/

/********************** ? Start : Timer fonctionnality ? **********************/
/*
const START_DATE = '2018-09-25'; // Date used as the starting point for multi-hour intervals, must be YYYY-MM-DD format
const START_HOUR = 0; // Hour of the day when the timer begins (0 is 12am, 23 is 11pm), used with START_DATE and INTERVAL_HOURS param
const INTERVAL_HOURS = 168; // Trigger at an interval of every X hours
const TARGET_MINUTE = 0; // Minute of the hour when the chest will refresh, 30 means 1:30, 2:30, etc.
const OFFSET = 10; // Notification will warn that the target is X minutes away

// Don't change any code below
const NOTIFY_MINUTE = (TARGET_MINUTE < OFFSET ? 60 : 0) + TARGET_MINUTE - OFFSET;
const START_TIME = new Date(new Date(START_DATE).getTime() + new Date().getTimezoneOffset() * 60000 + START_HOUR * 3600000).getTime();

setInterval(function() {
    var d = new Date();
    if(Math.floor((d.getTime() - START_TIME) / 3600000) % INTERVAL_HOURS > 0) return; // Return if hour is not the correct interval
    if(d.getMinutes() !== NOTIFY_MINUTE) return; // Return if current minute is not the notify minute
    NOTIFY_CHANNEL.sendMessage('The chests refresh in ' + OFFSET + ' minutes!');
}, 60 * 1000); // Check every minute
*/

/********************** ! End : Timer fonctionnality ! **********************/


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
