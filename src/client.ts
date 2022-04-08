import { Client } from 'discord.js';

export const client = new Client({
  intents: ['GUILDS', 'GUILD_VOICE_STATES'],
});
