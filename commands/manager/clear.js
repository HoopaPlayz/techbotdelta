module.exports = {
    name: 'clear',
    aliases: ['purge'],
    userPermissions: ["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS"],
    description: "Clears Messages",
    run: async(client, message, args) => {
      if(!args[0]) return message.reply("Please Enter The Amount of Messages You Want to Clear!");
      if(isNaN(args[0])) return message.reply("Please Enter a Number Argument!");
  
      if(args[0] > 100) return message.reply("You Can't Clear/Delete More Than 100 Messages!");
      
      if(args[0] < 1) return message.reply("You Can't Clear/Delete Less Than 1 Message/s!");
  
      await message.channel.messages.fetch({limit: ++args[0]}).then(messages => {
        message.channel.bulkDelete(messages);
      }); 
  
    }
  }