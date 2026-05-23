const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Play music',

    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music')
        .addStringOption(option =>
            option
                .setName('song')
                .setDescription('Song name or link')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.reply('🔎 Searching...');

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.editReply('Join a voice channel first.');
        }

        const query = interaction.options.getString('song');

        const player = interaction.client.lavalink.createPlayer({
            guildId: interaction.guild.id,
            voiceChannelId: voiceChannel.id,
            textChannelId: interaction.channel.id,
            selfDeaf: true
        });

        await player.connect();

        const result = await player.search({
            query: query,
            source: 'ytmsearch'
        }, interaction.user);

        if (!result.tracks.length) {
            return interaction.editReply('No song found.');
        }

        player.queue.add(result.tracks[0]);

        if (!player.playing) {
            await player.play();
        }

        await interaction.editReply(`🎵 Now playing: **${result.tracks[0].info.title}**`);
    }
};