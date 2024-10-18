import { Client, TextChannel } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

/* eslint-disable no-console */
export function sendLogMessage(client: Client, message: string): void {
  const logChannelId = process.env.BOT_LOG_CHANNEL_ID;
  if (!logChannelId) {
    console.error("sendLogMessage: BOT_LOG_CHANNEL_ID is not set.");
    return;
  }

  // Fetch the log channel without awaiting the result
  client.channels
    .fetch(logChannelId)
    .then((logChannel) => {
      if (!logChannel || !(logChannel instanceof TextChannel)) {
        console.error(
          "sendLogMessage: Log Channel not found or is not a text channel.",
        );
        return;
      }

      // Send the message without awaiting the result
      logChannel
        .send(
          `-- Log --
${message}
---------`,
        )
        .then(() => {
          console.log(
            "sendLogMessage: The following log message was sent to the Log Channel.",
          );
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

  // Function returns immediately, without waiting for the asynchronous operations to complete
}
