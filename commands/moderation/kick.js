module.exports = {
    name: 'kick',
    cooldown: 10, 
    userPermissions: ["KICK_MEMBERS"],
    description: "This command kicks a member!",
    run: async(client, message, args) => {
        const target = message.mentions.members.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        }else{
            message.channel.send(`You coudn't kick that member!`);
        }
    }
}