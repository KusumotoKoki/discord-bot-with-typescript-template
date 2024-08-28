import { Client, GatewayIntentBits, Message } from "discord.js";
import dotenv from "dotenv";
import { generateOpenAIResponse } from "./openai/openai";

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

client.on("messageCreate", (message: Message) => {
  // botからのメッセージには反応しない
  if (message.author.bot) return;

  // botの返答は非同期関数として実行されるのでここに
  (async () => {
    // hello. と打って，botが生きているか確認できる
    if (message.content === "hello.") {
      console.log("hello.");
      await message.channel.send(`hello! ${message.author.toString()}`);
    }

    const response = await generateOpenAIResponse(message.content);
    await message.channel.send(`${response}`);

    // 特定のチャンネルでのみ反応するようにする例
    if (message.channel.id === process.env.BOT_TEST_CHANNEL_ID) {
      // OpenAI API を使って返答を生成する
      // 外部ファイルで定義された関数を使う例
      console.log("-- BOT TEST --");
      
    }
  })().catch((error) => console.error("メッセージ処理中にエラーが発生しました:", error));
});

// ここまで

client.login(process.env.DISCORD_BOT_TOKEN);
