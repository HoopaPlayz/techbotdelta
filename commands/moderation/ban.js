module.exports = {
    name: 'ban',
    cooldown: 10, 
    userPermissions: ["BAN_MEMBERS"],
    description: "This command kicks a member!",
    run: async(client, message, args) => {
        const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("User has been banned");
        }else{
            message.channel.send(`You coudn't ban that member!`);
        }
    }
}