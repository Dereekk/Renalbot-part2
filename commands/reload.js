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

    if(message.author.id != "292450109575135232") return message.channel.send("No")

    if(!args[0]) return message.channel.send("1 + 1 = 2")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)

}

module.exports.config = {
    name: "reload",
    aliases: ["rld", "ahhh", "why"],
    usage: "",
    description: "",
    noalias: "No Aliases",
    accessableby: "Members"
}