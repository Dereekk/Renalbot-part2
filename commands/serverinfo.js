const Discord = require("discord.js");

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setTitle("Server")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner**", `${message.guild.owner}`, true)
        .addField("**Member Count**", `${message.guild.memberCount}`, true)
        .addField("**Role Count**", `${message.guild.roles.size}`, true)
        .setFooter(`Test | Footer`, bot.user.displayAvatarURL);
        message.channel.send({embed: sEmbed});
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["si", "Serverdesc"]
}