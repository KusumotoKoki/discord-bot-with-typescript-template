import { Client, TextChannel } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

export async function sendLogMessage(client: Client, message: string): Promise<void> {
  try {
    const logChannelId = process.env.BOT_LOG_CHANNEL_ID;
    if (!logChannelId) {
      console.error("BOT_LOG_CHANNEL_IDが設定されていません。");
      return;
    }

    const logChannel = await client.channels.fetch(logChannelId);
    if (!logChannel || !(logChannel instanceof TextChannel)) {
      console.error("ログチャンネルが見つからないか、テキストチャンネルではありません。");
      return;
    }

    await logChannel.send(`-- Log --
${message}
---------`);
    console.log("ログメッセージが送信されました。");
  } catch (error) {
    console.error("ログメッセージの送信中にエラーが発生しました:", error);
  }
}
