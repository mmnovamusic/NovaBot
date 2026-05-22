const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'Resume music',

    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume music'),

    async execute(interaction) {
        const player = interaction.client.player;

        if (!player) {
            return interaction.reply('No music playing.');
        }

        player.unpause();

        await interaction.reply('▶️ Music resumed');
    }
};