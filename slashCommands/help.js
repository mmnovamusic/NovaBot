const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show commands',

    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all commands'),

    async execute(interaction) {

        const embed = new EmbedBuilder()

            .setTitle('🎧 Nova Music Commands')

            .setDescription('Available Commands')

            .addFields(

                {
                    name: '/play',
                    value: 'Play music from name or YouTube link'
                },

                {
                    name: '/stop',
                    value: 'Stop music and leave voice'
                },

                {
                    name: '/hello',
                    value: 'Say hello'
                },

                {
                    name: '/help',
                    value: 'Open command menu'
                }

            );

        await interaction.reply({
            embeds: [embed]
        });

    }
};