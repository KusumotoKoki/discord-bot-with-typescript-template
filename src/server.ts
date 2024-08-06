import http from "http";
import querystring from "node:querystring";
import dotenv from "dotenv";

dotenv.config();

// GASでwakeさせること。

http
  .createServer((req, res) => {
    if (req.method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        if (!data) {
          res.end("No post data");
          return;
        }
        const dataObject = querystring.parse(data);
        console.log(`post:${dataObject.type?.toString()}`);
        if (dataObject.type === "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is Oprateing!");
    }
  })
  .listen(process.env.PORT);

if (
  process.env.DISCORD_BOT_TOKEN === undefined ||
  process.env.DISCORD_BOT_TOKEN === ""
) {
  console.log("DISCORD_BOT_TOKENを設定してください。");
  process.exit(0);
}

require("./code.js");
