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
    
     let statuses = [
         `^help`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 5000)
    
    
});

bot.on("ready",  message => {
    cron.schedule('0 7 * * *', async () => {
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

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("[LOGS] Couldn't find commands");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        })
    })
});

let y = process.openStdin()
y.addListener("data", res =>{
    let x = res.toString().trim().split(/ +/g)
    bot.channels.get("584026415834333203").send(x.join(" "))
})

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);

    // if(!message.content.startsWith(prefix)){
    //     console.log(message.content);
    //     for (x = 0; x < googleProfanityWords.list().length; x++){
    //         if(message.content.toLowerCase() == googleProfanityWords.list()[x].toLowerCase()){
    //             message.reply(" Hey! That's a bad word!")
    //         }
    //     }
        
    // }
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if (commandfile) commandfile.run(bot, message, args)

    //if(message.author.id == "292450109575135232"){
    //    message.react('🏳️‍🌈').then(message.clearReactions);
    //}

    if(cmd === `${prefix}info`){
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