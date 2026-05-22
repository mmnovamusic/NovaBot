require('dotenv').config();

const fs = require('fs');

const path = require('path');

const { REST, Routes } = require('discord.js');

const commands = [];

const commandsPath = path.join(__dirname, 'slashCommands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./slashCommands/${file}`);

   if (command.name === 'play') {

    commands.push({
        name: command.name,
        description: command.description,
        options: [
            {
                name: 'song',
                description: 'Song name',
                type: 3,
                required: true
            }
        ]
    });

} else {

    commands.push({
        name: command.name,
        description: command.description
    });

}

}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {

    try {

        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Slash commands registered.');

    } catch (error) {
        console.error(error);
    }

})();