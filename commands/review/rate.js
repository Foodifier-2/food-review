const { SlashCommandBuilder } = require('discord.js');
const csv_rw = require('../../data_read_write');

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
				.setRequired(true)),

	async execute(interaction) {
		const d = [{
			username : interaction.user.id,
			food_item : interaction.options.getString('food_item'),
			rating : interaction.options.getNumber('rating'),
			review : interaction.options.getString('review')
		}];
		//console.log(typeof d);
		//console.log(d);

		csv_rw.writeData(d, 'user_reviews.csv').then(() =>
		console.log(`Data from ${interaction.user.id} for 
		${interaction.options.getString('food_item')} written successfully!`));

		await interaction.reply('Your Review has been submitted.');
		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	},
};
