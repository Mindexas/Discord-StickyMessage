<div align="center">
  <br />
    <h1>Discord Sticky Message Bot</h1>
  <br />
  <img src="https://i.imgur.com/AmOmZKK.gif" alt="Bot preview" />
  <p>
    <a href="https://www.gnu.org/licenses/gpl-3.0.en.html"><img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="License" /></a>
  </p>
</div>

## About

This bot gonna send your stickied message after few messages.
<br />
This bot is inspired by [StickyBot](https://top.gg/bot/628400349979344919).<br />
This bot was coded by [andrerahardjo97](https://github.com/andrerahardjo97/) <br />
Recoded and updated to Discord.JS V14 by [Mindexas](https://github.com/Mindexas)

## Support

I don't offer support about error in installation. I only offer support for bug and error when the code is running.

## Contributing

I only welcome pull requests that fix bug, typo, or broken english. <br />
If you want to add new feature to this bot, just fork this repository.

## Requirements

- [Node.js](https://nodejs.org) v18 or higher
- NPM (Included in Node.js installer by default)

## Getting Started

1. Clone or [download](https://github.com/Mindexas/Discord-StickyMessage/releases) this repository
2. Go to the folder where you clone or download this repository
3. Type `npm install`
4. Set the empty strings/arrays in the config.json
4.1 I don't recommend changing `maxMessageCount` to a higher value than 10. But it also must remain an integer.
```json
{
    "discordToken": "<Discord Token Goes Here>",
    "prefix": "<Prefix>",
    "allowedRolesID": ["RoleID1", "RoleID2", "and so on..."],
    "maxMessageCount": 1,
    "ownerID": "Your discord ID"
}
```
5. Type `node index.js` to start the bot

If you don't know how to get the bot token, check [this guide](https://anidiots.guide/getting-started/getting-started-long-version).

## Usage

```
-stick <message that you want to stick>

-unstick
```

## Code Explanation

This is a [Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents).
```javascript
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
```
I define the Gateway Intents because this bot only use message event. There's no use to listen to other event.
<br />
<br />

The code below only run if the message does not have command prefix.
```javascript
// Check if the message have command prefix or not.
if (message.content.indexOf(process.env.PREFIX) !== 0) {
  // Check if user already stick a message or not.
  if (stickyMessageContent !== "") {
    // Check the channel id, is it same with the channel id where the message is stickied.
    if (message.channel.id === stickyMessageChannel) {
      // Increment message counter.
      messageCount++;
      // Check if it's already hit the maximum message count that is defined.
      if (messageCount === maxMessageCount) {
        // Delete last sticky message.
        await lastStickyMessage.delete();
        // Send new sticky message.
        lastStickyMessage = await message.channel.send(stickyMessageContent);
        // Reset the counter.
        messageCount = 0;
      }
    }
  }

  return;
}
```
<br />

Split the message by space if the message has command prefix.
```javascript
const args = message.content.slice(1).trim().split(/ +/g);
```
<br />

Get the first element of `args`, because it's the command name
```javascript
const command = args.shift().toLowerCase();
```

## Library That I Use

- [Discord.js](https://github.com/discordjs/discord.js)

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
