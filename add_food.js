const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new_item'),
            
    async execute(interaction) {
        await interaction.reply('hi');
        console.log(`User ${interaction.user.tag} used command ${interaction}`);
    }
};