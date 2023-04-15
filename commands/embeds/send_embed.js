const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder  } = require('discord.js');

const file = new AttachmentBuilder('../assets/discordjs.png');

const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

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
						{ name: 'Lowest Ratings', value: 'old' },
						{ name: 'Newest', value: 'new' },
						{ name: 'Oldest', value: 'old' }
					)
					.setRequired(true)),

	async execute(interaction) {
			await interaction.reply({ embeds: [exampleEmbed] });
			console.log(`User ${interaction.user.tag} used command ${interaction}`);
	},
}
