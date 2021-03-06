const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu, Interaction } = require("discord.js");

module.exports = {
    name: "help",
    description: 'Help command for the bot.',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const directories = [...new Set(client.commands.map(cmd => cmd.directory))];

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands
            .filter((cmd) => cmd.directory === dir)
            .map((cmd) =>{
                return{
                    name: cmd.name || 'there is no name',
                    description: cmd.description || 'there is no description for this command',
                };
            }); 

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

        const embed = new MessageEmbed().setDescription("Please Choose A Category In The Dropdown Menu!");

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Please Select A Category!")
                .setDisabled(state)
                .addOptions(
                    categories.map((cmd) => {
                        return {
                            label: cmd.directory,
                            value: cmd.directory.toLowerCase(),
                            description: `Commands From ${cmd.directory} Category!`
                        }
                    })
                )
            ),
        ];

        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),
        });

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ 
            filter, 
            componentType: 'SELECT_MENU', 
            // time: 5000, 
        });

        collector.on("collect", (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find((x) => x.directory.toLowerCase() === directory);

            const categoryEmbed = new MessageEmbed()
                .setTitle(`${directory} commands`)
                .setDescription("Here's the list of the commands")
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                       };
                    })
                );

            interaction.update({ embeds: [categoryEmbed] });
        });

        collector.on('end', () => {
            initialMessage.edit({ components: components(true) })
        });
    },
};
