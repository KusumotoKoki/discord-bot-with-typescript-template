import { Client, Message } from "discord.js";
import { sendLogMessage } from "../../log";
import { logMessageString } from "./logMessageString";
import { testRespond } from "./testRespond";

// messageCreate イベントに対する
export const handleMessageCreate = (client: Client, message: Message) => {
  // botからのメッセージには反応しない
  if (message.author.bot) return;

  // 受け取ったメッセージを確認するログを送信
  const logMessage = logMessageString(message);
  sendLogMessage(client, logMessage);

  // botの返答は非同期関数として実行されるのでここに
  (async () => {
    // Test Channel で hello. と送信して bot の挙動チェック
    if (
      message.channelId === process.env.BOT_TEST_CHANNEL_ID &&
      message.content === "hello."
    ) {
      await testRespond(message);
    }
  })().catch((error) => sendLogMessage(client, `${error}`));
};
