"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRespond = void 0;
const logMessageString_1 = require("./logMessageString");
const testRespond = (message) => __awaiter(void 0, void 0, void 0, function* () {
    // メッセージが送信されたチャンネルにメッセージを送り返す
    yield message.channel.send(`hello! ${message.author.toString()}`);
    // await client.channels.cache.get(messageChannelID).send(`hello! ${message.author.toString()}`); // ChannelIDだけがわかっている場合
    // リアクションする
    yield message.react("🐢"); // Unicode絵文字はこのようにする.
    // await message.react(message.guild.emojis.cache.get('123456789012345678')); // カスタム絵文字の場合
    // 返信する
    yield message.reply("This is a reply!");
    // スレッドを作成する
    const thread = yield message.startThread({
        name: "Log",
        reason: "This is a reason why this thread is made", // optional
        autoArchiveDuration: 1440, // スレッドが自動でアーカイブされるまでの時間（分） optional
    });
    thread.send(`${(0, logMessageString_1.logMessageString)(message)}`);
});
exports.testRespond = testRespond;
