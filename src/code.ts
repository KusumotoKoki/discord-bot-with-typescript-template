import { Client, GatewayIntentBits, Message } from "discord.js";
import dotenv from "dotenv";
import { sendLogMessage } from "./log";

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
  // botからのメッセージには反応しない
  if (message.author.bot) return;

  // 送信されたメッセージの確認
  sendLogMessage(client, `Received a message: ${message.content}`);

  // botの返答は非同期関数として実行されるのでここに
  (async () => {
    if (message.channel.id === process.env.BOT_TEST_CHANNEL_ID) {
      // hello. と打って，botが生きているか確認できる
      if (message.content === "hello.") {
        sendLogMessage(client, "hello.");
        await message.channel.send(`hello! ${message.author.toString()}`);
      }
    }
  })().catch((error) => sendLogMessage(client, `${error}`));
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
