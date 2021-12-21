const warnModel = require('../../models/warnModel');
const moment = require('moment');
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'warnings',
    description: 'Shows all warnings that a user have',
    userPermissions: ["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES"],
    options: [
        {
            name: 'target',
            description: 'user you want to view warnings',
            type: 'USER',
            required: true
        }
    ],

    run: async(client, interaction) => {
        const user = interaction.options.getUser('target');

        const userWarnings = await warnModel.find({ userId: user.id, guildId: interaction.guildId, });
        
        if(!userWarnings?.length) return interaction.followUp({ content: `${user} has no warnings in this server`, });


        const embedDescription = userWarnings.map((warn) => {
            const moderator = interaction.guild.members.cache.get(warn.moderatorId);

            return [
                `warnId: ${warn._id}`,
                `Moderator: ${moderator || 'Has Left'}`,
                `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
                `Reason: ${warn.reason}`,
            ].join("\n");
        }).join("\n\n");

        const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s warnings`)
            .setDescription(embedDescription)
            .setColor("RANDOM");
        
        interaction.followUp({ embeds: [embed] })
    },
};