/* eslint-disable @typescript-eslint/no-explicit-any */

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const obj = await req.json();

    console.log({ obj });

    if (obj.functs?.length > 0) {
      return Response.json({ answer: '{"enhance_writings":true}' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: obj.system,
        },
        {
          role: "user",
          content: obj.question,
        },
      ],
    });

    return Response.json({
      answer: response,
    });
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    // Handle API errors
  }
}
