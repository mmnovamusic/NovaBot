const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'hello',
    description: 'Say hello',

    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say hello'),

    async execute(interaction) {
        await interaction.reply('Hello bro 👋');
    }
};