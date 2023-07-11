
// Heavily inspired by StickyBot (https://top.gg/bot/628400349979344919)
// Coded by andrerahardjo97 (https://github.com/andrerahardjo97/discord-sticky-message-bot)
// Re-coded (Updated) by Mindexas (https://github.com/Mindexas)
// Re-coded (Updated) by Mindexas (https://github.com/Mindexas)


const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const config = require('./config.json')

const maxMessageCount = parseInt(config.maxMessageCount);
let lastStickyMessage = "";
let messageCount = 0;
let stickyMessageChannel = "";
let stickyMessageContent = "";

client.once("ready", async function () {
  console.info(`Bot ready! | ${client.user.username}`);
  if (!config.prefix || config.prefix.length == 0) throw new Error("[CRITICAL] You have not provided a prefix in the config.");
  if (!config.ownerID || config.ownerID.length == 0) throw new Error("[CRITICAL] You have not provided an owner ID");
  // find the owner with id
  const owner = client.guilds.cache.get(config.ownerID);
  if (owner) throw new Error("[CRITICAL] Owner ID is invalid or the bot hasn't found it.");
  if (config.maxMessageCount <= 0) throw new Error("[CRITICAL] maxMessageCount may not be lower than or equal to zero.");

});

client.on("messageCreate", async function (message) {
  if (message.author.bot) {
    return;
  }

  if (message.content.indexOf(config.prefix) !== 0) {
    if (stickyMessageContent !== "") {
      if (message.channel.id === stickyMessageChannel) {
        messageCount++;
        if (messageCount === maxMessageCount) {
          await lastStickyMessage.delete();
          lastStickyMessage = await message.channel.send(stickyMessageContent);
          messageCount = 0;
        }
      }
    }

    return;
  }

  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "stick") {
    if (message.author.id === config.ownerID || message.member.roles.cache.has(config.allowedRolesID)) {
      try {
        stickyMessageChannel = message.channel.id;
        stickyMessageContent = args.slice(0).join(" ");
        lastStickyMessage = await message.channel.send(stickyMessageContent);
        await message.delete();
      } catch (error) {
        console.error(error);
      }
    }
  } else if (command === "unstick") {
    if (message.author.id === config.ownerID || message.member.roles.cache.has(config.allowedRolesID)) {
      lastStickyMessage = "";
      messageCount = 0;
      stickyMessageChannel = "";
      stickyMessageContent = "";
      message.delete();
    }
  }
});

client.login(config.discordToken);
