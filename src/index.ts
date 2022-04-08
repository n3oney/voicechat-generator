import 'dotenv/config';
import { CategoryChannel, Snowflake, VoiceChannel } from 'discord.js';
import { client } from './client';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

interface CategorySettings {
  name: string;
  limit: number;
}

type Config = Map<Snowflake, CategorySettings>;

async function checkOldChannel(config: Config, channel: VoiceChannel) {
  if (!channel.parent) return;
  const categorySettings = config.get(channel.parentId ?? '');
  if (!categorySettings) return;
  const category = (await channel.parent.fetch()) as CategoryChannel;

  if (!category) return;
  channel = (await channel.fetch()) as VoiceChannel;

  if (channel.members.size > 0) return;
  if (
    category.children.filter(
      (c) => c.type === 'GUILD_VOICE' && c.members.size < 1
    ).size < 2
  )
    return;
  await channel.delete();
}

async function checkNewChannel(config: Config, channel: VoiceChannel) {
  if (!channel.parent) return;
  const categorySettings = config.get(channel.parentId ?? '');
  if (!categorySettings) return;
  const category = (await channel.parent.fetch()) as CategoryChannel;

  if (!category) return;
  if (
    category.children.filter(
      (c) => c.type === 'GUILD_VOICE' && c.members.size < 1
    ).size > 0
  )
    return;

  channel.guild.channels.create(categorySettings.name, {
    type: 'GUILD_VOICE',
    userLimit: categorySettings.limit,
    parent: channel.parentId!,
  });
}

readFile(join(__dirname, '../config.json'), 'utf8').then((configString) => {
  const config = new Map(JSON.parse(configString)) as Config;
  if (!config || config.size === 0) throw new Error('Invalid config!');

  console.log('Loaded config!');

  client.on('voiceStateUpdate', async (oldState, newState) => {
    try {
      if (oldState.channel && oldState.channel.type === 'GUILD_VOICE')
        checkOldChannel(config, oldState.channel);
      if (newState.channel && newState.channel.type === 'GUILD_VOICE')
        checkNewChannel(config, newState.channel);
    } catch {}
  });
});

client.on('ready', () => console.log('Discord is ready!'));

client.login(process.env.TOKEN!);
