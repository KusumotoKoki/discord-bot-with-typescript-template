"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const log_1 = require("./log");
const handleMessageCreate_1 = require("./events/messageCreate/handleMessageCreate");
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
    (0, handleMessageCreate_1.handleMessageCreate)(client, message);
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
