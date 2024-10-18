import { Message } from "discord.js";
import { logMessageString } from "./logMessageString";

export const testRespond = async (message: Message) => {
  // メッセージが送信されたチャンネルにメッセージを送り返す
  await message.channel.send(`hello! ${message.author.toString()}`);
  // await client.channels.cache.get(messageChannelID).send(`hello! ${message.author.toString()}`); // ChannelIDだけがわかっている場合

  // リアクションする
  await message.react("🐢"); // Unicode絵文字はこのようにする.
  // await message.react(message.guild.emojis.cache.get('123456789012345678')); // カスタム絵文字の場合

  // 返信する
  await message.reply("This is a reply!");

  // スレッドを作成する
  const thread = await message.startThread({
    name: "Log",
    reason: "This is a reason why this thread is made", // optional
    autoArchiveDuration: 1440, // スレッドが自動でアーカイブされるまでの時間（分） optional
  });
  thread.send(`${logMessageString(message)}`);
};
