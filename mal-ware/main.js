// import libraries
const fs = require('fs');
const Discord = require('discord.js');
const Enmap = require('enmap');

const client = new Discord.Client();
const {prefix, token, god} = require('./config.json');
client.commands = new Discord.Collection();

// get command files from commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// main variables
var myEnmap;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('guildMemberAdd', member => {
	console.log('User added: ' + member.user.nickname + member.user.discriminator + ' ' + member.user.id);
});

client.on('message', message => {

	// database created; is persistent. databases identified as SERVERNAMEserverid
	// enmap (https://www.npmjs.com/package/enmap) is an sqlite wrapper for node
	myEnmap = new Enmap({"name": message.guild.name + message.guild.id});

	// verify if message should be read as a command
	if (!message.content.startsWith(prefix) || message.author.bot) return; 
	//|| message.author.id !== god
	// I recommend using this when first implementing in server, that way only "god" can use the bot

	// parse message
	let args = message.content.slice(prefix.length).trim().split(/ +/);
	let commandName = args.shift().toLowerCase();

	// if no command with that name, exit early
	if (!client.commands.has(commandName)) return;
	let command = client.commands.get(commandName);

	// user did an oops
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		// find and execute command in commands directory, matching prefix to name of file
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

client.login(token);
