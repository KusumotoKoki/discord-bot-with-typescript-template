"use strict";
// OpenAIのAPIを使用して，こちらが送ったメッセージに対する返答を生成する
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenAIResponse = generateOpenAIResponse;
const openai_1 = __importDefault(require("openai"));
const client = new openai_1.default({
  apiKey: process.env["OPENAI_API_KEY"],
});
// message
function generateOpenAIResponse(message) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a;
    try {
      const completion = yield client.chat.completions.create({
        model: "gpt-4o-mini", // 使用するモデルを指定
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          // 過去のやり取りを追加する例 (必要に応じて変更)
          // { role: "user", content: "Who won the world series in 2020?" },
          // { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020." },
          // { role: "user", content: "Where was it played?" },
          // ユーザーからの新しいメッセージ
          { role: "user", content: message },
        ],
      });
      const response =
        (_a = completion.choices[0].message) === null || _a === void 0
          ? void 0
          : _a.content;
      console.log(completion.choices[0]); // 完全な応答の詳細をコンソールに出力
      return response || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Error generating response:", error);
      return "An error occurred while generating the response.";
    }
  });
}
