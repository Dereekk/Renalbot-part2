const Discord = require("discord.js");
const superagent = require("superagent");
const config = require("../config.json");
const prefix = config.prefix;
const ytdl = require('ytdl-core');

const InspireURL = 'http://inspirobot.me/api?generateFlow=1&sessionID=';
let server = [];
async function putarray(){
    var {body} = await superagent.get(InspireURL);
    if (typeof body === "undefined"){
        return;
    }else{
        server.push(body.mp3);
    }

}

async function Play(connection) {
    await putarray();
    const dispatcher = connection.playStream(server[0]);


    dispatcher.on("end", (end) => {
        server.shift();
        Play(connection);
    });

}


module.exports.run = async (bot, message, args) => {
    if(!message.member.voiceChannel) {
        return message.reply("You have to be in a voice channel");
    }
    if(!message.guild.voiceConnection){
        message.member.voiceChannel.join().then(connection => [
            Play(connection)
        ]);
    }
    
}

module.exports.config = {
    name: "mindless",
    aliases: ["mind", "min", "what_the_actual"],
    usage: "",
    description: "",
    accessableby: "Members"
}