const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rate')
		.setDescription('Add a numerical rating of a UCSC food item and optionally a text review')
		.addStringOption(option =>
			option.setName('food_item')
				.setDescription('The UCSC food item to rate')
				.setAutocomplete(true)
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('rating')
				.setDescription('A numerical rating from 1 to 10')
				.setMaxValue(10)
				.setMinValue(0)
				.setRequired(true))
		.addStringOption(option =>
			option.setName('review')
				.setDescription('An optional textual review of the food')
				.setRequired(false)),

	async execute(interaction) {
		await interaction.reply('hi');
		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	},
};