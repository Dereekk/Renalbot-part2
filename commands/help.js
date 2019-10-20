const Discord = require("discord.js");
const superagent = require("superagent");
const config = require("../config.json");
const prefix = config.prefix;



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

module.exports.run = async (bot, message, args) => {
    if(args[0] == "help") return message.channel.send("No")

    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)){
            command = bot.commands.get(command);
            var SHenbed = new Discord.RichEmbed()
            .setColor(getRandomColor())
            .setAuthor(`${message.guild.name} Help Desk requested by ${message.guild.members.get(message.author.id).displayName}`, message.author.avatarURL)
            .setDescription(`The bot prefix is ${prefix}\n\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Descrtiption"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)
            message.channel.send(SHenbed).catch(console.error()); //sends a help embed
        }
    }

    if(!args[0]){
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor("Help Command", message.guild.iconURL)
        .setColor(getRandomColor())
        .setDescription(`${message.author.username} check your dms!`)

        let Sembed = new Discord.RichEmbed()
        .setColor(getRandomColor())
        .setAuthor(`You requested the ${message.guild.name} Help Desk`, message.author.avatarURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`These are the availiable commands for the bot\n The bot prefix is: ${prefix}`)
        .addField(`Commands:`, "`` cat `` ``info`` ``info`` ``help``")
        .setFooter(`Test | Footer`, bot.user.displayAvatarURL);
        message.channel.send(embed).then(m => m.delete(10000)).catch(console.error());
        message.author.send(Sembed).catch(console.error());
    }
}

module.exports.config = {
    name: "help",
    aliases: ["h", "halp", "commands"],
    usage: "",
    description: "",
    noalias: "No Aliases",
    accessableby: "Members"
}