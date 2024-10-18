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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const log_1 = require("./log");
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
// ready イベントが発生したら実行する内容
client.on("ready", () => {
    (0, log_1.sendLogMessage)(client, "Bot is Ready!");
});
// ---- カスタマイズ範囲開始 ----
// messageCreate イベントが発生したら実行する内容
client.on("messageCreate", (message) => {
    // botからのメッセージには反応しない
    if (message.author.bot)
        return;
    // 送信されたメッセージの確認
    (0, log_1.sendLogMessage)(client, `Received a message: ${message.content}`);
    // botの返答は非同期関数として実行されるのでここに
    (() => __awaiter(void 0, void 0, void 0, function* () {
        if (message.channel.id === process.env.BOT_TEST_CHANNEL_ID) {
            // hello. と打って，botが生きているか確認できる
            if (message.content === "hello.") {
                (0, log_1.sendLogMessage)(client, "hello.");
                yield message.channel.send(`hello! ${message.author.toString()}`);
            }
        }
    }))().catch((error) => (0, log_1.sendLogMessage)(client, `${error}`));
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
