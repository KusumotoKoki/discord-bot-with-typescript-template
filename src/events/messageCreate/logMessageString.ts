import { Message, User, Collection, Attachment } from "discord.js";

export const logMessageString = (message: Message): string => {
  // メッセージを parse
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const messageAuthor: User = message.author; // メッセージの送信者
  const messageAuthorUserName: string = messageAuthor.username; // メッセージの送信者の名前
  const messageAuthorMention: string = messageAuthor.toString(); // メッセージの送信者の UserMention = `<@${Snowflake}>`
  const messageContent: string = message.content; // メッセージの内容
  const messageCleanContent: string = message.cleanContent; // メッセージの内容（メンション表現を同等のテキストに置き換えたもの）
  const messageChannelID: string = message.channelId; // メッセージが送信されたチャンネル（DM含む）のID
  const messageGuildID: string = message.guildId ? message.guildId : "DM"; // メッセージが送信されたサーバー（Guildと呼ばれる）のID
  const messageCreatedAt: string = message.createdAt.toLocaleString("sv-SE", {
    timeZone: "Asia/Tokyo",
  }); // メッセージが送信された時刻を yyyy-MM-dd 形式にしたもの
  const messageAttachments: Collection<string, Attachment> =
    message.attachments; // 添付ファイル
  const attachmentInfo =
    messageAttachments.size > 0
      ? `Attachments: ${messageAttachments.map((a) => a.url).join(", ")}`
      : "No Attachments"; // 添付ファイルの情報
  const messageUrl: string = message.url; // メッセージのURL
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const logMessage = `
Created At: ${messageCreatedAt}
Guild ID or DM: ${messageGuildID}
Channel ID: ${messageChannelID}
Author: ${messageAuthorUserName}
URL: ${messageUrl}
Content:
${messageContent}
Clean Content:
${messageCleanContent}
Attachments Info:
${attachmentInfo}
`;
  return logMessage;
};
