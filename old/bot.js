require("dotenv").config(); //to start process from .env file
const {Client, Intents}=require("discord.js");
const client=new Client({
    Intents:[
        Intents.FLAGS.GUILDS,//adds server functionality
        Intents.FLAGS.GUILD_MESSAGES //gets messages from our bot.
    ]
});
client.once("ready", () =>{
    console.log("BOT IS ONLINE"); //message when bot is online
})
client.login(process.env.TOKEN);