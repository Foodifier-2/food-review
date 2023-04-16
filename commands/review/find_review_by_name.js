
const { SlashCommandBuilder, ButtonStyle, ComponentType } = require('discord.js');
const read_write = require("../../data_read_write.js");
const main = require("../../main.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');

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
    //
    // console.log(client.users.cache.get(user.id));
// client.users.cache.get(user.id).username}
    if(reviews != []){
      let current_page = 0;
      const left = new ButtonBuilder()
        .setLabel("<-")
        .setCustomId("left")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)
      const right = new ButtonBuilder()
        .setLabel("->")
        .setCustomId("right")
        .setStyle(ButtonStyle.Primary)
      const row = new ActionRowBuilder()
        .addComponents(left, right)


      const embed = new EmbedBuilder()
        .setAuthor({name: user.username + "#" + user.discriminator})
        .setTitle("Reviews")
        .setDescription(`Food:${reviews[current_page].food_item}\nRating:${reviews[current_page].rating}\nReviews:${reviews[current_page].review}`);
			const response = await interaction.reply({ embeds: [embed], components: [row]});


      const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 3_600_000 });

      collector.on('collect', async i => {
        
        if(i.customId.localeCompare("right")){
          console.log("test")
          current_page++;
          const new_embed = EmbedBuilder.from(embed).setDescription(`Food:${reviews[current_page].food_item}\nRating:${reviews[current_page].rating}\nReviews:${reviews[current_page].review}`);

          const channel = client.channels.cache.get(response.interaction.channelId);

          const message = await channel.messages.fetch(response.interaction.messageId);

          console.log(message)


          message.edit({embeds: [new_embed], componets: [row]});
        } else{

        }

      });

    } else{

      await interaction.reply("User hasn't reviewed any menu items");

    }

		console.log(`User ${interaction.user.tag} used command ${interaction}`);
	},
};
