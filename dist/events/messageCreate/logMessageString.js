"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMessageString = void 0;
const logMessageString = (message) => {
    // メッセージを parse
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const messageAuthor = message.author; // メッセージの送信者
    const messageAuthorUserName = messageAuthor.username; // メッセージの送信者の名前
    const messageAuthorMention = messageAuthor.toString(); // メッセージの送信者の UserMention = `<@${Snowflake}>`
    const messageContent = message.content; // メッセージの内容
    const messageCleanContent = message.cleanContent; // メッセージの内容（メンション表現を同等のテキストに置き換えたもの）
    const messageChannelID = message.channelId; // メッセージが送信されたチャンネル（DM含む）のID
    const messageGuildID = message.guildId ? message.guildId : "DM"; // メッセージが送信されたサーバー（Guildと呼ばれる）のID
    const messageCreatedAt = message.createdAt.toLocaleString("sv-SE", {
        timeZone: "Asia/Tokyo",
    }); // メッセージが送信された時刻を yyyy-MM-dd 形式にしたもの
    const messageAttachments = message.attachments; // 添付ファイル
    const attachmentInfo = messageAttachments.size > 0
        ? `Attachments: ${messageAttachments.map((a) => a.url).join(", ")}`
        : "No Attachments"; // 添付ファイルの情報
    const messageUrl = message.url; // メッセージのURL
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
exports.logMessageString = logMessageString;
