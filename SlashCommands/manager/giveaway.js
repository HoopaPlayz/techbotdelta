const { Client, CommandInteraction } = require("discord.js");
const Nuggies = require('nuggies');
const ms = require('ms')

module.exports = {
    name: 'start',
    description: 'Start a giveaway',
    usage: '-start <winners> <time> <prize>',
    options: [
        {
            type: 'STRING',
            name: 'prize',
			description: 'Prize of giveaway',
			required: true
        	},
            {
                type: 'NUMBER',
				name: 'winners',
				description: 'Amount of winners in giveaway',
				required: true
			},
			{
                type: 'STRING',
				name: 'endafter',
				description: 'Time for the giveaway',
				required: true
			},
			{
                type: 'ROLE',
				name: 'role',
				description: 'The role requirement for giveaway',
				required: false
			},
		],
    run: async (client, interaction, args) => {
let requirements = {};
	if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.followUp({content: 'You are not allowed to use this command!'});
	const prize = interaction.options.getString('prize');
	const host = interaction.user.id;
	const winners = parseInt(interaction.options.getNumber('winners'));
	if (interaction.options.getRole('role')) {
		const role = interaction.options.getRole('role');
		requirements = { enabled: true, roles: [role.id] };
	}

	Nuggies.giveaways.create(client, {
		message: interaction,
		prize: prize,
		host: host,
		winners: winners,
		endAfter: interaction.options.getString('endafter'),
		requirements: requirements,
		channelID: interaction.channel.id,
	});

	interaction.followUp({content: 'Created a Giveaway!'});
}
    };
