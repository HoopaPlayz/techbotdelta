const db = require("quick.db");//require the packages
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'whitelist',
    category: 'Dev',
    userPermissions: ["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS"],
    description: 'Whitelist a user',
    aliases: ['unblock'],
    usage: 'whitelist <@user>',
    run: async(client, message, args) => {//everyone haves different execute parameters
        if(message.author.id != 693717845275574292) return message.channel.send("Only the bot owner can use this command") //add your id without quotes
    
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
          user = message.guild.members.cache.get(args[0]).user;
        } 
        
        if(!user) return message.channel.send("You did not specify a user")
    
        let blacklist = db.get(`blacklist_${user.id}`)
        
        if(blacklist === 0 || blacklist === null) return message.channel.send(`${user}, Is not blacklisted`) //here you are checking if the user is already blacklisted
        
        const embed = new MessageEmbed()
        .setAuthor('Hype', client.user.displayAvatarURL())
        .setTitle('Blacklisted!')
        .setDescription('Damn, It looks like you have been blacklisted from the bot... sad')
        .setTimestamp()
        user.send({embeds: [embed]})

        message.channel.send(`${user} been whitelisted!`)
        db.delete(`blacklist_${user.id}`, 1)//here you delete the "blacklist" status from the database
    }
}