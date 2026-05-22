const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'pause',
    description: 'Pause music',

    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause music'),

    async execute(interaction) {
        const player = interaction.client.player;

        if (!player) {
            return interaction.reply('No music playing.');
        }

        player.pause();

        await interaction.reply('⏸️ Music paused');
    }
};