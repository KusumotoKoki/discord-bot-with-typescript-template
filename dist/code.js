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
const openai_1 = require("./openai/openai");
const log_1 = require("./log");
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
client.on("ready", () => {
    console.log("Bot is Ready!!");
    (0, log_1.sendLogMessage)(client, "Bot is Ready!");
});
// ここから
client.on("messageCreate", (message) => {
    // botからのメッセージには反応しない
    if (message.author.bot)
        return;
    // 送信されたメッセージの確認
    (0, log_1.sendLogMessage)(client, `Received a message: ${message.content}`);
    // botの返答は非同期関数として実行されるのでここに
    (() => __awaiter(void 0, void 0, void 0, function* () {
        // hello. と打って，botが生きているか確認できる
        if (message.content === "hello.") {
            console.log("hello.");
            yield message.channel.send(`hello! ${message.author.toString()}`);
        }
        // 特定のチャンネルでのみ反応するようにする例
        if (message.channel.id === process.env.BOT_TEST_CHANNEL_ID) {
            // OpenAI API を使って返答を生成する
            // 外部ファイルで定義された関数を使う例
            (0, log_1.sendLogMessage)(client, "-- BOT TEST --");
            const response = yield (0, openai_1.generateOpenAIResponse)(message.content);
            yield message.channel.send(`${response}`);
        }
    }))().catch((error) => console.error("メッセージ処理中にエラーが発生しました:", error));
});
// ここまで
client.login(process.env.DISCORD_BOT_TOKEN);
