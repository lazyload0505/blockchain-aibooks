import { OpenAI } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	baseURL: process.env.OPENAI_API_BASE_URL
});
 
export const runtime = 'edge'
 
export async function POST(req: Request) {
  const { msgs } = await req.json();

  const completion = await await openai.chat.completions.create({
	model: "gpt-3.5-turbo",
	// https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
	// gpt-3.5-turbo-1106
	// gpt-3.5-turbo-instruct
	// gpt-3.5-turbo
	// gpt-3.5-turbo-16k
	// gpt-4
	// gpt-4-32k
	// gpt-4-1106-preview
	messages: [
	  { role: "system", content: "You are a blockchain developer and architect expert. Generate every answer with less than 800 characters." },
	  ...msgs
	],
	max_tokens: 4000,
	temperature: 0,
	stream: true,
  });

  const stream = OpenAIStream(completion);
  return new StreamingTextResponse(stream);
}