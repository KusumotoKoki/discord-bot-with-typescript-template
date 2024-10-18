import { Client, GatewayIntentBits, Message } from "discord.js";
import dotenv from "dotenv";
import { sendLogMessage } from "./log";
import { handleMessageCreate } from "./events/messageCreate/handleMessageCreate";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ready イベントが発生したら実行する内容
client.on("ready", () => {
  sendLogMessage(client, "Bot is Ready!");
});

// ---- カスタマイズ範囲開始 ----

// messageCreate イベントが発生したら実行する内容
client.on("messageCreate", (message: Message) => {
  handleMessageCreate(client, message);
});
// ---- カスタマイズ範囲終了 ----

// ログインが完了すると ready イベントが発生する
client
  .login(process.env.DISCORD_BOT_TOKEN)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Bot logged in successfully.");
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error("Error during bot login:", error);
  });
