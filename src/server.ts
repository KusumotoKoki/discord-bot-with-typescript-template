import express, { Request, Response } from "express";
import dotenv from "dotenv";

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

if (
  process.env.DISCORD_BOT_TOKEN === undefined ||
  process.env.DISCORD_BOT_TOKEN === ""
) {
  // eslint-disable-next-line no-console
  console.error("Please configure the DISCORD_BOT_TOKEN.");
  process.exit(0);
}

import "./code.js";
