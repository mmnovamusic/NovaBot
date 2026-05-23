const { SlashCommandBuilder } = require('discord.js');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus
} = require('@discordjs/voice');

const play = require('play-dl');
const youtubedl = require('youtube-dl-exec');
module.exports = {
  name: 'play',
  description: 'Play music',

  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music')
    .addStringOption(option =>
      option
        .setName('song')
        .setDescription('Song name or YouTube link')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.reply('🔎 Searching...');

    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.editReply('Join a voice channel first.');
    }

    const query = interaction.options.getString('song');

    let videoUrl;

    if (play.yt_validate(query) === 'video') {
      videoUrl = query;
    } else {
      const results = await play.search(query, {
        limit: 1,
        source: { youtube: 'video' }
      });

      if (!results.length) {
        return interaction.followUp('No song found.');
      }

      videoUrl = results[0].url;
    }

    console.log('QUERY:', query);
console.log('VIDEO URL:', videoUrl);

if (!videoUrl) {
    return interaction.followUp('Song link problem. Try another song.');
}

const stream = await play.stream(videoUrl, {
    discordPlayerCompatibility: true
});

const resource = createAudioResource(
    stream.stream,
    {
        inputType: stream.type,
        inlineVolume: true
    }
);

    const player = createAudioPlayer();
interaction.client.player = player;
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

    connection.subscribe(player);
    player.play(resource);

    player.on(AudioPlayerStatus.Playing, () => {
      console.log('Music is playing!');
    });

    player.on('error', error => {
      console.error(error);
    });

    await interaction.editReply(`Now playing: **${query}** 🎵`);
  }
};