const { 
	AttachmentBuilder, EmbedBuilder,
	SlashCommandBuilder, ActionRowBuilder,
	ButtonBuilder, ButtonStyle,
	MessageActionRow, MessageButton
} = require('discord.js');

const csv_rw = require('../../data_read_write');
//const file = new AttachmentBuilder('../assets/discordjs.png');

const data = csv_rw.readData('user_reviews.csv');

const exampleEmbed = new EmbedBuilder()
	.setColor(0xedd100)
	.setTitle('Food Title')
	//.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Author of Review'})
	.setDescription('Food Review')
	//.addFields(
		//{ name: 'Regular field title', value: 'Some value here' },
		//{ name: '\u200B', value: '\u200B' },
		//{ name: 'Inline field title', value: 'Some value here', inline: true },
		//{ name: 'Inline field title', value: 'Some value here', inline: true }
	//)
	.setTimestamp()
	//.setFooter({ text: 'Some footer text here'});

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
						{ name: 'Lowest Ratings', value: 'low' },
						{ name: 'Newest', value: 'new' },
						{ name: 'Oldest', value: 'old' }
					)
					.setRequired(true)),

	async execute(interaction) {
		await interaction.reply({ embeds: [exampleEmbed] });
		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	},
}
