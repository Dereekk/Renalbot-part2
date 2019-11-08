const Discord = require("discord.js");
const config = require("../config.json");
const prefix = config.prefix;

async function lots_of_messages_getter(channel, limit) {
    const sum_messages = [];
    let last_id;

    while (true) {
        const options = { limit: 100 };
        if (last_id) {
            options.before = last_id;
        }

        const messages = await channel.fetchMessages(options);
        sum_messages.push(...messages.array());
        last_id = messages.last().id;

        if (messages.size != 100 || sum_messages >= limit) {
            break;
        }
    }

    return sum_messages;
}

async function removeDups(names) {
    let unique = {};
    names.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

channels = [];
why = [];
count = {};


module.exports.run = async (bot, message, args) => {
    
    message.guild.channels.forEach(channelz => {
        if (channelz.type === 'text'){
            channels.push(channelz.id)
        }
    });
    //console.log(channels);
    removeDups(channels);
    channels.forEach(async function(i) {
       const channel = bot.channels.get(i);
       let messages =  await lots_of_messages_getter(channel, 100000);
       messages.forEach(async function(i) {
           why.push(i.author['username']);
           

       });
       why.forEach(async function(i) { count[i] = (count[i]||0) + 1;});
       myJSON = JSON.stringify(count);
       message.channel.send(myJSON);

   });
  

   
   
   //console.log(why);
//    for (var i = 0; i < channelarraylength; i++) {
//         const channel = bot.channels.get(channels[i]);
//         console.log(channels[i]);
        
//         const messages = await lots_of_messages_getter(channel, 100000)
//         var arrayLength = messages.length;
//         for (var i = 0; i < arrayLength; i++) {
//             var yourmom = messages[i].author['username']
//             why.push(yourmom)
//         }
//         console.log(why);
//         why.forEach(function(i) { count[i] = (count[i]||0) + 1;});
//         console.log(count);

//     }
//     var myJSON = JSON.stringify(count);
//     message.channel.send(myJSON);
}

module.exports.config = {
    name: "rank",
    aliases: [" ra", "ran", "nk"],
    usage: "",
    description: "",
    accessableby: "Members"
}