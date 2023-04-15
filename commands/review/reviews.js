const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	// Will print the overall rating average, as well as the specified numebr of reviews, with their corresponding ratings.
		.setName('reviews')
	// option of todays reviews
		.setDescription('Get a list of reviews for the specified food item,')
		.addStringOption(option =>
			option.setName('food_item')
				.setDescription('The UCSC food item to get reviews and ratings of')
				.setAutocomplete(true)
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('count')
				.setDescription('The number of reviews to show for the chosen food item')
				.setRequired(false))
		.addStringOption(option =>
			option.setName('day_offset')
				.setDescription('Num. days back to include reviews. Enter "All" or "Today" for reviews of all time or only today')
				.setRequired(false)
				.addChoices(
					{ name: 'All', value: 'all' },
					{ name: 'Today', value: 'today' },
					{ name: '1', value: '1' },
					{ name: '2', value: '2' },
					{ name: '3', value: '3' },
					{ name: '4', value: '4' },
					{ name: '5', value: '5' },
					{ name: '6', value: '6' },
					{ name: '7', value: '7' },
					{ name: '8', value: '8' },
					{ name: '9', value: '9' },
					{ name: '10', value: '10' },
					{ name: '11', value: '11' },
					{ name: '12', value: '12' },
					{ name: '13', value: '13' },
					{ name: '14', value: '14' },
					{ name: '15', value: '15' },
					{ name: '16', value: '16' },
					{ name: '17', value: '17' },
					{ name: '18', value: '18' },
					{ name: '19', value: '19' },
					{ name: '20', value: '20' })),

	async execute(interaction) {
		await interaction.reply('Hi');
		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	},
};