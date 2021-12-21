const { Client, CommandInteraction } = require("discord.js");
const warnModel = require('../../models/warnModel');

module.exports = {
    name: 'warn',
    description: 'warns a user',
    userPermissions: ["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES"],
    options:[
        {
            name: 'target',
            description: 'user you want to warn',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'reason for this warn',
            type: 'STRING',
            required: true
        },
    ],

    run: async(client, interaction) => {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        new warnModel({
            userId: user.id,
            guildId: interaction.guildId,
            moderatorId: interaction.user.id,
            reason,
            timestamp: Date.now(),
        }).save();

        user.send(`You have been warned in ${interaction.guild.name} for ${reason}`).catch(console.log );

        interaction.followUp({ content: `${user} has been warned for ${reason}` })
    },
};