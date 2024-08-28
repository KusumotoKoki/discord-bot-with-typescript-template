// OpenAIのAPIを使用して，こちらが送ったメッセージに対する返答を生成する

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

// message
export async function generateOpenAIResponse(message: string): Promise<string> {
  try {
    const completion = await client.chat.completions.create({
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

    const response = completion.choices[0].message?.content;
    console.log(completion.choices[0]); // 完全な応答の詳細をコンソールに出力
    return response || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating response:", error);
    return "An error occurred while generating the response.";
  }
}
