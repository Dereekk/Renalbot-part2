const Discord = require("discord.js");
const superagent = require("superagent");
const config = require("../config.json");
const prefix = config.prefix;


module.exports.run = async (bot, message, args) => {
  if(!message.author.id == "292450109575135232" || !message.author.id == "113865463095754758") return; //should be if it isn't either of us then do nothing
  try {
    await message.channel.send("Bye")
    process.exit()
  } catch (error) {
    message.channel.send(`ERROR: ${e.message}`)
  }
    
}

module.exports.config = {
    name: "shutdown",
    aliases: ["turnoff", "die", "no one likes you"],
    usage: "",
    description: "",
    noalias: "No Aliases",
    accessableby: "Members"
}