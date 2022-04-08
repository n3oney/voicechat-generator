# voicechat-generator

**A simple Discord bot that generates voice channels on demand.**

Tired of not having enough voice channels for all your members? Stop worrying about it! This bot will generate voice channels for you!

## Features

- automatically creating new voice channels when all others have a member in them
- automatically deleting unused voice channels
- simple configuration

## Configuration

All configuration is done in **config.json**, which follows the schema of the [example config](config.example.json).

Every voice channel type must be a separate category - this makes it simpler to separate channels and handle them by the bot.

## Usage

To use the bot, you need a server, Node.js, a Discord bot user and the config.

1. Clone the repository

```sh
git clone https://github.com/n3oney/voicechat-generator
```

2. Install the dependencies

```sh
npm install
```

3. Compile the code

```sh
npm run build
```

4. Set up the config file in **config.json**
5. Start the bot

```sh
npm start
```

Remember that the bot needs an environment variable with the name of `TOKEN` with the value of the Discord bot token. You can find it in the Discord bot user settings.

If you want to keep the bot running, you can use [pm2](https://pm2.keymetrics.io/) or an alternative.
