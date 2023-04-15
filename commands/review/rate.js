const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rate')
        .setDescription('Add a numerical rating of a UCSC food item and optionally a text review')
        .addStringOption(option =>
            option.setName('food_item')
            .setDescription('The UCSC food item to rate')
            .setAutocomplete(true)
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName('rating')
            .setDescription('A numerical rating from 1 to 10')
            .setRequired(true)
            .addChoices(
                { name: '1', value: 1 },
                { name: '2', value: 2 },
                { name: '3', value: 3 },
                { name: '4', value: 4 },
                { name: '5', value: 5 },
                { name: '6', value: 6 },
                { name: '7', value: 7 },
                { name: '8', value: 8 },
                { name: '9', value: 9 },
                { name: '10', value: 10 }))
        .addStringOption(option =>
            option.setName('review')
            .setDescription('An optional textual review of the food')
            .setRequired(false)),
            
    async execute(interaction) {
        await interaction.reply('hi');
        console.log(`User ${interaction.user.tag} used command ${interaction}`);
    }
};