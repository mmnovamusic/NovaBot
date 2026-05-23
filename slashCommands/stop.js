const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Stop music',

    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop music'),

    async execute(interaction) {

        const player =
            interaction.client.lavalink.getPlayer(
                interaction.guild.id
            );

        if (!player) {
            return interaction.reply(
                '❌ No music player found.'
            );
        }

        await player.destroy();

        await interaction.reply(
            '👋 Stopped music and left voice.'
        );
    }
};