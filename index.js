const Discord = require('discord.js');
require('dotenv').config()
const axios = require('axios');

const client = new Discord.Client();

const token = process.env.token
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('message', async (msg) => {
    if (msg.author.bot) return
    if (msg.channel.id == '821161301731704872') {
        var res = await axios.get('https://api.hypixel.net/resources/skyblock/collections');
        var collections = res.data.collections
        var flag = false
        for (var collec in collections) {
            for (var item in collections[collec].items) {
                for (var tier of collections[collec].items[item].tiers) {
                    for (var unlock of tier.unlocks) {
                        if (unlock.toLowerCase().includes(msg.content.toLowerCase())) {
                            msg.reply('You can find the ' + unlock + ' in collection of ' + item + ' in ' + collec + ' at tier ' + tier.tier)
                            flag = true
                            break
                        }
                    }
                    if (flag)
                        break
                }
                if (flag)
                    break
            }
            if (flag)
                break
        }
        if (!flag)
            msg.reply('Recipe not found for ' + msg.content + ' !');
    }
});
 
client.login(token);