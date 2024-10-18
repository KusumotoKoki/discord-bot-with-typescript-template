"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON and URL-encoded data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/", (req, res) => {
    const requestData = req.body;
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
app.get("/", (req, res) => {
    res.status(200).send("Discord Bot is Operating!");
});
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
});
if (process.env.DISCORD_BOT_TOKEN === undefined ||
    process.env.DISCORD_BOT_TOKEN === "") {
    // eslint-disable-next-line no-console
    console.error("Please configure the DISCORD_BOT_TOKEN.");
    process.exit(0);
}
require("./code.js");
