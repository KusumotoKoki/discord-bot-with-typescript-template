"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// GASでwakeさせること。
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON and URL-encoded data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/", (req, res) => {
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
app.get("/", (req, res) => {
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
