const { Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: '8ball',
  userPermissions: ["VIEW_CHANNEL","SEND_MESSAGES"],
  description: 'Asks a question and let the bot determine your fate :sparkler:',
  run: async(client, message, args) => {
    if (!args[0]) return message.channel.send('Please ask a full question!'); // return if no question is commenced
    const replies = ['Yes.', 'No.', 'Never.', 'Definitely.', 'Ask again later.', 'It is certain.','It is decidedly so.',
    'Without a doubt.',
    'Yes - definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Very doubtful.']; // random responses

    const result = Math.floor(Math.random() * replies.length); // Get a random respons for the array
    const question = args.join(' '); // join the args(Array<string>) to a question string
    // check permissions for embed
    if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
      const embed = new MessageEmbed() // create embed 
        .setAuthor('🎱 The 8 Ball says...')
        .setColor('ORANGE').addField('Question:', question)
        .addField('Answer:', replies[result]);
      await message.channel.send({embeds: [embed]}); // send embed message
    } else {
      await message.channel.send(`**Question:**\n${question}\n**Answer:**\n${replies[result]}`); // no permissions so bot will default to a raw message
    }
  },
};