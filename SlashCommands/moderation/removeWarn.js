const warnModel = require('../../models/warnModel');
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: 'remove-warn',
    description: 'remove a warn using an id',
    userPermissions: ["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES"],
    options: [
        {
            name: 'warnid',
            description: 'warnid that you want to remove a warning',
            type: 'STRING',
            required: true
        },
    ],

    run: async(client, interaction) => {
        const warnId = interaction.options.getString('warnid');

        const data = await warnModel.findById(warnId);

        if(!data) return interaction.followUp({ content: `${warnId} is not a valid ID!`, });

        data.delete();

        const user = interaction.guild.members.cache.get(data.userId);
        return interaction.followUp({ content: `Removed 1 of ${user}'s warning` });
    },
};