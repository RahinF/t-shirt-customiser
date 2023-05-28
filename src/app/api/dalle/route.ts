import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });

  const image = response.data.data[0].b64_json;

  return NextResponse.json({ photo: image });
}
