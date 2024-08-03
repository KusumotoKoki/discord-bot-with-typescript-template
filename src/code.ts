// import { Client, GatewayIntentBits, Message } from "discord.js";
import { Client, GatewayIntentBits, Message } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Bot is Ready!!");
});

// ここから

client.on("messageCreate", async (message: Message) => {
  if (message.content === "hello.") {
    message.channel.send(`hello! ${message.author.toString()}`);
  }
});

// ここまで

client.login(process.env.DISCORD_BOT_TOKEN);
