const config = require("./config.json");
const Discord = require("discord.js");
const superagent = require("superagent");
var cron = require('node-cron');
const googleProfanityWords = require('google-profanity-words');

const bot = new Discord.Client({disableEveryone: true});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    
     let statuses = [//put different things in the array for it so showup at the bots presence or activity as its put here, It's going to say Watching and then what you write on the array and it'll cycle throught them all randomly.
         `^help`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 60000)
    

    
});

bot.on("ready",  message => {
    cron.schedule('0 7 * * *', async () => { //every morning at 7 am this sends an embed with the NASA Apod 
        var {body} = await superagent.get(`https://api.nasa.gov/planetary/apod?api_key=Ba3wAm9ImsmVvF8WxEs34fWeQkxeWAImYWFW0fWn`)
        //console.log(body)
        if(!{body}) return message.channel.send("I broke! Try again")
        var nEmbed = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setImage(body.url)
        .setTitle(body.title)
        .setDescription("https://apod.nasa.gov/apod/astropix.html")
        .setTimestamp()
        .setAuthor(`Good morning!`, "https://lh3.googleusercontent.com/lAPaHC8vtKv0bkEGSi5rBWsdHLCKRoFXMNxlrhFAsC5kJb0mp9gk5ZvsGB_07d1Zbq3_7olhxK9asVOvvuhH=w1920-h920")
        .setFooter(`Test | Footer`, bot.user.displayAvatarURL);
        bot.channels.get('592261979830485004').send({embed: nEmbed})
      });
});

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => { //looks into the commands file
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js"); //gets the names of the files and removes the extention .js from the end
    if(jsfile.length <= 0){
        console.log("[LOGS] Couldn't find commands"); // If there are no files in the command folder then it complains. 
    }

    jsfile.forEach((f, i) => { // Each of the files gets searched for the name of the command so the bot knows when to execute it
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name) //sets the aliases for the bot commands
        })
    })
});

// let y = process.openStdin()
// y.addListener("data", res =>{
//     let x = res.toString().trim().split(/ +/g)
//     bot.channels.get("").send(x.join(" ")) // "Sentient mode" You can send messages through the console with this
// })

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return; // No replaying to bot messages or messages sent in dms
    //I need to do the I'm stuff before I the other stuff because I need to parse the entire string as words instead of turning the string into an array
    let str = message.content;
    let modified = str.toLowerCase().replace(/i am/g, 'im').replace(/[^a-z\.\?\! ]/g, '').split(/\.|\?|\!/).map(i => {
        i = ' ' + i
        let start = i.indexOf(' im ')
        if (start === -1) {
            return
        }
        return i.substr(start)
    })
    .filter(i => i)
    .join(' and ')
    let start
    if(modified){
        message.channel.send(`Hi ${modified.substr(start).split('im').map(i => i.trim()).filter(i => i).join(' ')}, I'm Renal!`)
    }

    let searchURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
    let query = message.content;// had to learn how other people did the regex to parse a sentence with I'm in it just so I could do the same thing for wikipedia to get the definitions. This is totally a feature that everyone wants. Just like this bot in general. 
    let modifiedquery = query.toLowerCase().replace(/what is/g, 'whats').replace(/ a /g, ' ').replace(/[^a-z\.\?\! ]/g, '').split(/\.|\?|\!/).map(i => {
        i = ' ' + i
        let startquery = i.indexOf(' whats ')
        if (startquery === -1) {
            return
        }
        return i.substr(startquery)
    })
    .filter(i => i)
    .join(' and ')
    let startquery
    if(modifiedquery){
        modifiedURL = searchURL + modifiedquery.substr(startquery).split('whats').map(i => i.trim()).filter(i => i).join(' ')
        var {body} = await superagent.get(modifiedURL)
        console.log(body[2][0])
        message.channel.send(body[2][0])


    }

    let prefix = config.prefix; //gets the prefix from the config
    let messageArray = message.content.split(" "); //takes the message and splits it apart at each space
    let cmd = messageArray[0].toLocaleLowerCase(); //gets the first thing in the message in this case if it were a ^help cat it would seperate ^help from cat
    let args = messageArray.slice(1);// this would take everything after ^help and store it as args 0 1 2.. etc.

    // if(!message.content.startsWith(prefix)){ profanity message if you only send the profanity in the message
    //     console.log(message.content);
    //     for (x = 0; x < googleProfanityWords.list().length; x++){
    //         if(message.content.toLowerCase() == googleProfanityWords.list()[x].toLowerCase()){
    //             message.reply(" Hey! That's a bad word!")
    //         }
    //     }
        
    // }
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length))) //actually creates the file where the commands are stored and executed from
    if (commandfile) commandfile.run(bot, message, args) //passes these arguments to the commands

    //if(message.author.id == "292450109575135232"){ filip is gay reaction thing
    //    message.react('🏳️‍🌈').then(message.clearReactions);
    //}

    if(cmd === `${prefix}info`){ //info embed that I wrote at 3 am one night
        let sEmbed = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setTitle("You're lost")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Help Desk requested by ${message.guild.members.get(message.author.id).displayName}`, message.author.avatarURL)
        .addField("**We got a Cat command**", "**^cat**")
        .addField("**And a, a, **", "**uhhhh**")
        .addField("**Oh yeah! **", "**Don\'t swear**")
        .addField("**7am photos?**", "**Cool**")
        .setFooter(`Test | Footer`, bot.user.displayAvatarURL);
        message.channel.send({embed: sEmbed});

        message.delete(5000);
    }
})
bot.login(config.token);