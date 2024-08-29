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
exports.sendLogMessage = sendLogMessage;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function sendLogMessage(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logChannelId = process.env.BOT_LOG_CHANNEL_ID;
            if (!logChannelId) {
                console.error("BOT_LOG_CHANNEL_IDが設定されていません。");
                return;
            }
            const logChannel = yield client.channels.fetch(logChannelId);
            if (!logChannel || !(logChannel instanceof discord_js_1.TextChannel)) {
                console.error("ログチャンネルが見つからないか、テキストチャンネルではありません。");
                return;
            }
            yield logChannel.send(`-- Log --
${message}
---------`);
            console.log("ログメッセージが送信されました。");
        }
        catch (error) {
            console.error("ログメッセージの送信中にエラーが発生しました:", error);
        }
    });
}
