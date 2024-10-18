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
exports.handleMessageCreate = void 0;
const log_1 = require("../../log");
const logMessageString_1 = require("./logMessageString");
const testRespond_1 = require("./testRespond");
// messageCreate イベントに対する
const handleMessageCreate = (client, message) => {
    // botからのメッセージには反応しない
    if (message.author.bot)
        return;
    // 受け取ったメッセージを確認するログを送信
    const logMessage = (0, logMessageString_1.logMessageString)(message);
    (0, log_1.sendLogMessage)(client, logMessage);
    // botの返答は非同期関数として実行されるのでここに
    (() => __awaiter(void 0, void 0, void 0, function* () {
        // Test Channel で hello. と送信して bot の挙動チェック
        if (message.channelId === process.env.BOT_TEST_CHANNEL_ID &&
            message.content === "hello.") {
            yield (0, testRespond_1.testRespond)(message);
        }
    }))().catch((error) => (0, log_1.sendLogMessage)(client, `${error}`));
};
exports.handleMessageCreate = handleMessageCreate;
