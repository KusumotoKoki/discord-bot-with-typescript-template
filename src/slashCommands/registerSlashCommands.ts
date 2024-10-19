import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { loadSlashCommands } from "./loadSlashCommands";

dotenv.config();

const clientId = process.env.APPLICATION_ID;
const guildId = process.env.COMMAND_GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;

export async function registerCommands() {
  const slashCommands = await loadSlashCommands(); // コマンドをロード

  const rest = new REST({ version: "10" }).setToken(token);

  try {
    // eslint-disable-next-line no-console
    console.log(
      `Started refreshing ${slashCommands.size} application (/) commands.`,
    );

    // コマンドのdataをJSON化してDiscord APIに登録
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: slashCommands.map((cmd) => cmd.data.toJSON()),
    });
    // コマンドをグローバルに定義する場合
    // await rest.put(Routes.applicationCommands(clientId), {
    //   body: slashCommands.map((cmd) => cmd.data.toJSON()),
    // });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error registering Discord commands:", error);
  }
}
