const { 
	AttachmentBuilder, EmbedBuilder,
	SlashCommandBuilder, ActionRowBuilder,
	ButtonBuilder, ButtonStyle,
	MessageActionRow, MessageButton
} = require('discord.js');

const csv_rw = require('../../data_read_write');
//const file = new AttachmentBuilder('../assets/discordjs.png');

// const review_embed = new EmbedBuilder()
// 	.setColor(0xedd100)
// 	.setTitle('Food Title')
// 	//.setURL('https://discord.js.org/')
// 	.setAuthor({ name: 'Author of Review'})
// 	.setDescription('Food Review')
// 	//.addFields(
// 		//{ name: 'Rating (1-10):', value: 'rating' }
// 		//{ name: '\u200B', value: '\u200B' },
// 		//{ name: 'Inline field title', value: 'Some value here', inline: true },
// 		//{ name: 'Inline field title', value: 'Some value here', inline: true }
// 	//)
// 	.setTimestamp()
// 	//.setFooter({ text: 'Some footer text here'});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_review')
			.setDescription('Find a menu item.')
			.addStringOption(option =>
				option.setName('food_item')
					.setDescription('The UCSC food item to get reviews for this menu item.')
					.setAutocomplete(true)
					.setRequired(true))
			.addStringOption(option =>
				option.setName('sort_by')
					.setDescription('Sort')
					.addChoices(
						{ name: 'Highest Ratings', value: 'high' },
						{ name: 'Lowest Ratings', value: 'low' }
						//{ name: 'Newest', value: 'new' },
						//{ name: 'Oldest', value: 'old' }
					)
					.setRequired(true)),

	async execute(interaction) {
		let file = []
		if(interaction.options.getString('sort_by') === 'high')
		{
			file = csv_rw.sortRating(
				interaction.option.getString('food_item'),
				'user_reviews.csv', false
			);
		} else if(interaction.options.getString('sort_by') === 'low') 
		{
			file = csv_rw.sortRating(
				interaction.options.getString('food_item'),
				'user_reviews.csv', low
			);
		}

		const review_embed = new EmbedBuilder()
			.setTitle(file[0].food_item)
			.setAuthor(file[0].name)
			.setDescription(file[0].review)
			.addFields(
				{ name: 'Rating (1-10):', value: file[0].rating}
			)
			.setTimestamp();

		await interaction.reply({ embeds: [review_embed] });
		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	},
}
