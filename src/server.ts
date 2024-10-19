import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { registerCommands } from "./slashCommands/registerSlashCommands.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the interface for the request body
interface RequestData {
  type: string;
}

app.post("/", (req: Request, res: Response) => {
  const requestData = req.body as RequestData;

  if (!requestData) {
    res.status(400).send("No post data");
    return;
  }

  // eslint-disable-next-line no-console
  console.log(`post: ${requestData.type}`);

  // "wake" 以外のリクエストも処理できるように
  switch (requestData.type) {
    case "wake":
      // eslint-disable-next-line no-console
      console.log("Woke up in post");
      res.status(200).end();
      break;
    default:
      res.status(400).send("Unknown request type");
      break;
  }
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Discord Bot is Operating!");
});

// サーバー起動時に実行されるもの
app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);

  // 必須の環境変数が設定されているか確認
  if (!process.env.DISCORD_BOT_TOKEN) {
    // eslint-disable-next-line no-console
    console.error("Please configure the DISCORD_BOT_TOKEN.");
    process.exit(0);
  }

  // Discordコマンドの登録
  try {
    // サーバー起動時にコマンドを登録
    await registerCommands();
    // eslint-disable-next-line no-console
    console.log("Discord commands registered successfully.");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error registering Discord commands:", error);
  }
});

import "./code.js";
