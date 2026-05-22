const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {

    name: 'stop',

    description: 'Stop music and leave VC',

    async execute(interaction) {

        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {

            return interaction.reply('❌ I am not in a voice channel.');

        }

        connection.destroy();

        interaction.reply('👋 Left the voice channel.');

    }

};