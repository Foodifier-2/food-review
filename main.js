const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection, SlashCommandBuilder, EmbedBuilder 
} = require('discord.js');
require('dotenv').config()
require('csv-parser');
require('csv-writer');
const csv_rw = require('./data_read_write');

const client = new Client({ 
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});

client.commands = new Collection();



const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.login(process.env.token);

const getClient = () =>{
  return client;
}

exports.getClient = getClient;

//let data = csv_rw.readData('user_reviews.csv');
//console.log(data)
// file = csv_rw.sortRating(
// 	'allergen free halal chicken thigh',
// 	'user_reviews.csv', false
// );
//console.log(file)
