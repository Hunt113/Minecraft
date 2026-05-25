require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');

// Create a new client instance with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// The prefix for your bot commands
const PREFIX = '!';

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! Bot is ready.`);
    
    // Set the bot's playing activity status
    client.user.setActivity('Play Insta Kill On Roblox', { type: ActivityType.Playing });
});

// Listen for incoming messages
client.on('messageCreate', async (message) => {
    // Ignore messages from other bots, or messages that don't start with the prefix
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    // Split the message into command and arguments
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Command: !devs
    if (command === 'devs') {
        const devMentions = '<@1308376613876142132> <@1397470242896347177>';
        
        const devEmbed = new EmbedBuilder()
            .setColor('#8A2BE2') 
            .setDescription(`**Game Developers:** ${devMentions}`);

        try {
            await message.channel.send({ embeds: [devEmbed] });
        } catch (error) {
            console.error('Failed to send devs embed:', error);
        }
    }

    // Command: !link
    if (command === 'link') {
        const linkEmbed = new EmbedBuilder()
            .setColor('#8A2BE2') 
            .setDescription('**Insta Kill Still In Development**');

        try {
            await message.channel.send({ embeds: [linkEmbed] });
        } catch (error) {
            console.error('Failed to send link embed:', error);
        }
    }

    // Command: !slap @user
    if (command === 'slap') {
        // Find the user mentioned first in the message
        const targetUser = message.mentions.users.first();

        // Delete the original message right away
        try {
            await message.delete();
        } catch (error) {
            console.error('Could not delete the message (Missing "Manage Messages" permission):', error);
        }

        // If no user was mentioned, don't proceed
        if (!targetUser) {
            return; 
        }

        // Create the embed with the Power Slap KO animation link
        const slapEmbed = new EmbedBuilder()
            .setColor('#8A2BE2')
            .setDescription(`<@${message.author.id}> Slapped ${targetUser}`)
            .setImage('https://media.tenor.com/7gK_jL2_8pUAAAAC/power-slap-slap.gif');

        try {
            await message.channel.send({ embeds: [slapEmbed] });
        } catch (error) {
            console.error('Failed to send slap embed:', error);
        }
    }
});

// Log your bot into Discord using the token
const TOKEN = process.env.TOKEN;