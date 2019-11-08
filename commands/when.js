const Discord = require("discord.js");
const superagent = require("superagent");
const config = require("../config.json");
const prefix = config.prefix;

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
}

module.exports.run = async (bot, message, args) => {
    try {
        if(!args[0]) return message.channel.send(message.channel.guild.createdAt.toUTCString().substr(0, 16));
        if(args[0] === "a"){
            message.channel.send(message.channel.guild.createdAt.toUTCString().substr(0, 16));
            message.channel.send(checkDays(message.channel.guild.createdAt));
            }
        if(args[0]){
            message.channel.send(checkDays(message.channel.guild.createdAt));
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.config = {
    name: "when",
    aliases: ["how old", "age", "serverage"],
    usage: "",
    description: "",
    accessableby: "Members"
}