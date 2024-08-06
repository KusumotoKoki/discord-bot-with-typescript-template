import express, { Request, Response } from 'express';
import dotenv from "dotenv";

dotenv.config();

// GASでwakeさせること。

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req: Request, res: Response) => {
  const dataObject = req.body;
  if (!dataObject) {
    res.status(400).send("No post data");
    return;
  }
  console.log(`post:${dataObject.type}`);
  if (dataObject.type === "wake") {
    console.log("Woke up in post");
    res.status(200).end();
    return;
  }
  res.status(200).end();
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("Discord Bot is Operating!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


if (
  process.env.DISCORD_BOT_TOKEN === undefined ||
  process.env.DISCORD_BOT_TOKEN === ""
) {
  console.log("DISCORD_BOT_TOKENを設定してください。");
  process.exit(0);
}

require("./code.js");
