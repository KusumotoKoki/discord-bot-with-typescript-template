import { Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { SlashCommand } from "../types/slashCommand";

/**
 * exportsフォルダ直下のファイル内のSlashCommandを動的に読み込み、Collectionに格納して返す関数
 */
export async function loadSlashCommands(): Promise<
  Collection<string, SlashCommand>
> {
  const slashCommands = new Collection<string, SlashCommand>();
  const commandsPath = path.join(__dirname, "exports");

  // commandsPath内のすべてのコマンドファイルを取得 (.ts または .js ファイル)
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
      // コマンドファイルの動的インポート
      const commandModule = await import(filePath);
      const command: SlashCommand = commandModule.default || commandModule;

      slashCommands.set(command.data.name, command);
      // eslint-disable-next-line no-console
      console.log(`Loaded command: ${command.data.name}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to load command at ${filePath}:`, error);
    }
  }

  return slashCommands;
}
