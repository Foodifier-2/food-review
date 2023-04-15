const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

const file = new AttachmentBuilder('../assets/discordjs.png');

module.exports = {
	data: new SlashCommandBuilder()
    const exampleEmbed = new EmbedBuilder()
	    .setTitle('Some title')
	    .setImage('attachment://discordjs.png');

channel.send({ embeds: [exampleEmbed], files: [file] });