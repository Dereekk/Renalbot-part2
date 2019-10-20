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
  if(message.author.id != "292450109575135232") return;
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