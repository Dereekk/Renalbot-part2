const Discord = require("discord.js");
const superagent = require("superagent");


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating...");

        let {body} = await superagent
        .get(`http://aws.random.cat/meow`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("I broke! Try again")
        let cEmbed = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setImage(body.file)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.author.username} Requested a cat`, message.author.avatarURL)
        .setFooter(`Test | Footer`, bot.user.displayAvatarURL);
        message.channel.send({embed: cEmbed});//the cat embed

        msg.delete();
}

module.exports.config = {
    name: "cat",
    aliases: ["cat", "meow"],
    usage: "",
    description: "",
    accessableby: "Members"
}