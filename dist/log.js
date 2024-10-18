"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLogMessage = sendLogMessage;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* eslint-disable no-console */
function sendLogMessage(client, message) {
    const logChannelId = process.env.BOT_LOG_CHANNEL_ID;
    if (!logChannelId) {
        console.error("sendLogMessage: BOT_LOG_CHANNEL_ID is not set.");
        return;
    }
    // Fetch the log channel without awaiting the result
    client.channels
        .fetch(logChannelId)
        .then((logChannel) => {
        if (!logChannel || !(logChannel instanceof discord_js_1.TextChannel)) {
            console.error("sendLogMessage: Log Channel not found or is not a text channel.");
            return;
        }
        // Send the message without awaiting the result
        logChannel
            .send(`-- Log --
${message}
---------`)
            .then(() => {
            console.log("sendLogMessage: The following log message was sent to the Log Channel.");
            console.log(`-- Log --
${message}
---------`);
        })
            .catch((error) => {
            console.error("sendLogMessage: Failed to send log message:", error);
        });
    })
        .catch((error) => {
        console.error("sendLogMessage: Error fetching the Log Channel:", error);
    });
}
