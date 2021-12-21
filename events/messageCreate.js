const client = require("../index");
const db = require("quick.db");

client.on('messageCreate', async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;
    
    let blacklisted = db.get(`blacklist_${message.author.id}`)

    if(blacklisted === 1) return message.channel.send("Bro, it looks like you are blacklisted from the bot...")

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
