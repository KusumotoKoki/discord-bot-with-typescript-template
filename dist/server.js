"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const node_querystring_1 = __importDefault(require("node:querystring"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// GASでwakeさせること。
http_1.default
    .createServer((req, res) => {
    if (req.method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            var _a;
            if (!data) {
                res.end("No post data");
                return;
            }
            const dataObject = node_querystring_1.default.parse(data);
            console.log(`post:${(_a = dataObject.type) === null || _a === void 0 ? void 0 : _a.toString()}`);
            if (dataObject.type === "wake") {
                console.log("Woke up in post");
                res.end();
                return;
            }
            res.end();
        });
    }
    else if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Discord Bot is Oprateing!");
    }
})
    .listen(3000);
if (process.env.DISCORD_BOT_TOKEN === undefined ||
    process.env.DISCORD_BOT_TOKEN === "") {
    console.log("DISCORD_BOT_TOKENを設定してください。");
    process.exit(0);
}
require("./code.js");
