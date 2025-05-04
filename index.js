// Require necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

// Define your custom prefix
const prefix = 'ruby!'; // Your custom prefix

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

// Collection to store commands
client.commands = new Collection();

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  // Set bot status (optional)
  client.user.setActivity('with Discord.js');
});

// Basic message event handler
client.on('messageCreate', async message => {
  // Ignore messages from bots
  if (message.author.bot) return;
  
  // Check for command prefix
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    // Command handler
    switch (command) {
      case 'ping':
        message.reply('Pong!');
        break;
        
      case 'hello':
        message.reply(`Hello ${message.author.username}!`);
        break;
        
      case 'roll':
        const sides = args[0] || 6; // Default to 6 sides if not specified
        const result = Math.floor(Math.random() * sides) + 1;
        message.reply(`You rolled a ${result} (d${sides})!`);
        break;
        
      case 'help':
        const helpEmbed = {
          color: 0x0099ff,
          title: 'Bot Commands',
          description: 'Here are the available commands:',
          fields: [
            { name: `${prefix}ping`, value: 'Checks if the bot is responsive' },
            { name: `${prefix}hello`, value: 'Greets you' },
            { name: `${prefix}roll [sides]`, value: 'Rolls a die with specified number of sides (default: 6)' },
            { name: `${prefix}help`, value: 'Shows this help message' }
          ],
          timestamp: new Date(),
          footer: {
            text: 'RubyApp1 Bot'
          }
        };
        message.reply({ embeds: [helpEmbed] });
        break;
        
      default:
        message.reply(`Unknown command. Type \`${prefix}help\` for a list of commands.`);
    }
  }
});

// Login to Discord with your token
client.login(process.env.TOKEN);