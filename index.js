'use strict';

// Discord modules
const Discord = require('discord.js');
const Bot = new Discord.Client();

// Audio modules
/* const ytdl = require('ytdl-core-discord'); */

// Environment vars
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const TOKEN = process.env.TOKEN;
const PREFIX = ''; //process.env.PREFIX;
/* const ROLLPREFIX = ['roll', 'r']; */

Bot.on('ready', () => {
	console.log(`Logged in as ${Bot.user.tag}`);
});

Bot.on('disconnect', () => {
	console.log(`Bot disconnected`);
	Bot.user.setActivity('Sleeping');
});

/* let connection = null,
	joinedConn = null; */

Bot.on('message', async (msg) => {
	if (msg.author.bot) return;
	if (!msg.content.startsWith(PREFIX)) {
		/* for (let i = 0; i < ROLLPREFIX.length; i++) {
			if (msg.content.startsWith(ROLLPREFIX[i])) {
				let reply = roll(msg.content.slice(ROLLPREFIX[i].length));
				msg.reply(reply);
				return;
			}
		} */
		return;
	}

	const args = msg.content.slice(PREFIX.length).split(/ +/);
	for (let i = 0; i < args.length; i++) {
		args[i] = args[i].toLowerCase();
		if (args[i] == '') {
			args.splice(i, 1);
		}
	}
	const cmd = args.shift();
	console.log(args);
	switch (cmd) {
		case 'avatar':
			if (!msg.mentions.users.size) {
				msg.channel.send(`${msg.author.username}'s avatar: ${msg.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
			}
			const avatarList = msg.mentions.users.map((user) => {
				msg.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`);
			});
			break;
		case 'delete':
			bulkDelete(args[0], msg);
			break;
		case 'del':
			bulkDelete(args[0], msg);
			break;
		case 'server':
			const serverEmbed = new Discord.MessageEmbed()
				.setColor('#09f')
				.setTitle(`${msg.guild.name}`)
				.setImage(`${msg.guild.iconURL}`)
				.addFields(
					{ name: 'Member count:', value: `${msg.guild.memberCount}` },
					{ name: 'Server was created at:', value: `${msg.guild.createdAt}` },
					{ name: 'Our overlord is:', value: `${msg.guild.owner}` },
					{ name: 'This server has these roles:', value: `${msg.guild.roles}` },
				)
				.setTimestamp()
				.setFooter(`I was created to serve`, `${msg.guild.iconURL}`);
			msg.channel.send(serverEmbed);
			break;

		// Audio:
		/* case 'join':
			if (!msg.guild) return msg.reply('Voice only works in guilds');

			if (msg.member.voice.channel) {
				const connection = await msg.member.voice.channel.join();
				connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { filter: 'audioonly', type: 'opus' }));
				msg.channel.send('Joined the voice channel');
			} else {
				msg.reply('You need to join a voice channel first!');
			}
			break;
		case 'leave':
			if (connection == null) return msg.reply('I can only leave if I joined the VC');

			connection.leave();
			msg.channel.send('Left the voice channel');
			break;
		case 'play':
			if (!cmd[1]) return msg.reply('What do you want me to play?');

			play(joinedConn, cmd[1]);
			break; */
	}
});

/* async function play(connection, url) {
	console.log(connection);
	connection.play(await ytdl(url), { type: 'opus' });
} */

function bulkDelete(arg, msg) {
	console.log('deleting...');
	let amount;
	const mistakeText = 'add how many messages you want to delete, or say "all" for the maximum amount of 99';
	if (!arg) {
		return msg.reply(`${mistakeText}`);
	} else if (arg == 'all') {
		amount = 99;
	} else if (isNaN(parseInt(arg))) {
		return msg.reply(`${mistakeText}`);
	} else if (arg < 2 || arg > 100) {
		return msg.reply("there's a minimum of 2 and maximum 100 messages for you to delete");
	} else {
		amount = arg;
	}
	msg.channel.bulkDelete(amount, true);
}

/* function roll(msg) {
	msg = msg.replace(/\s+/g, '');
	msg = msg.split('d');
	let diceAmount = Number(msg[0]);
	if (msg[0] == '') {
		diceAmount = 1;
	}
	let diceNumber = Number(msg[1]);
	let reply = 'You rolled ';
	let entireResult = 0;
	for (let i = 0; i < diceAmount; i++) {
		let result = Math.floor(Math.random() * diceNumber) + 1;
		entireResult += result;
		if (i == diceAmount - 1) {
			if (diceAmount == 1) {
				reply += `${result}.`;
				continue;
			}
			reply += `${result} = ${entireResult}.`;
			continue;
		}
		reply += `${result} + `;
	}
	return reply;
} */

Bot.login(TOKEN);
