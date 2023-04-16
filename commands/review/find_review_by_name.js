
const { SlashCommandBuilder } = require('discord.js');
const read_write = require("../../data_read_write.js");
const main = require("../../main.js");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	// Will print the overall rating average, as well as the specified numebr of reviews, with their corresponding ratings.
		.setName('name')
	// option of todays reviews
		.setDescription('Find all reviews by a certain user')
		.addUserOption(option =>
			option
        .setName('target')
				.setDescription('User whose reviews you want to see')
				.setRequired(true)),

	async execute(interaction) {
    const user = interaction.options.getUser("target");

    const reviews = await read_write.findByName(user.id, "./user_reviews.csv");

    console.log(reviews);


    let client = main.getClient();

    console.log(client.users.cache.get(user.id));
// client.users.cache.get(user.id).username}
    if(reviews != []){
      const embed = new EmbedBuilder()
        .setAuthor({name: user.username + "#" + user.discriminator})
        .setTitle("Reviews")
        .setDescription(`Food:${reviews[current_page].food_item}\nRating:${reviews[current_page].rating}\nReviews:${reviews[current_page].review}`);
			const response = await interaction.reply({ embeds: [embed], components: [row]})
      // .then(() => console.log("reply sent."));


      const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 3_600_000 });

      collector.on('collect', async i => {

        if(i.customId.localeCompare("right") == 0){
          current_page++;
        } else{
          current_page--;
        }
          if(current_page == reviews.length) {
              const right_new = new ButtonBuilder()
                .setLabel("->")
                .setCustomId("right")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true)
          }

          if(current_page != 0){
            const left_new = new ButtonBuilder()
              .setLabel("<-")
              .setCustomId("left")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(false)
          }

          const row_new = new ActionRowBuilder()
            .addComponents(left_new, right_new)

          const new_embed = new EmbedBuilder()
          .setAuthor({name: user.username + "#" + user.discriminator})
          .setTitle("Reviews")
          .setDescription(`Food:${reviews[current_page].food_item}\nRating:${reviews[current_page].rating}\nReviews:${reviews[current_page].review}`);

          const channel = client.channels.cache.get(response.interaction.channelId);

          const message = await channel.messages.fetch(response.interaction.messageId);

          // console.log(message)

          response.edit({embeds: [new_embed], componets: [row_new]});
      });
    } else{

      await interaction.reply("User hasn't reviewed any menu items");

    }

		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	},
};
