require('dotenv').config();

const fs = require('fs');

const path = require('path');

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});
client.player = null;
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'slashCommands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./slashCommands/${file}`);

    client.commands.set(command.name, command);
}

client.once('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (error) {

        console.error(error);

        if (interaction.deferred || interaction.replied) {
    await interaction.editReply('Error executing command.');
} else {
    await interaction.reply({
        content: 'Error executing command.',
        ephemeral: true
    });
}

    }

});

client.login(process.env.TOKEN);