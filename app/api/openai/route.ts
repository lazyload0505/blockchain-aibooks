import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)
 
export const runtime = 'edge'
 
export async function POST(req: Request) {
  const { msgs } = await req.json();
  const completion = await openai.createChatCompletion({
	model: "gpt-3.5-turbo-16k",
	// gpt-3.5-turbo-16k
	// gpt-4-32k
	messages: [
	  { role: "system", content: "You are a blockchain developer and architect expert. Generate every answer with less than 800 characters." },
	  ...msgs
	],
	max_tokens: 8000,
	temperature: 0,
	stream: true,
  });

  const stream = OpenAIStream(completion);
  return new StreamingTextResponse(stream);
 
//   return new Response(response.body, {
// 	headers: {
// 	  "Access-Control-Allow-Origin": "*",
// 	  "Content-Type": "text/event-stream;charset=utf-8",
// 	  "Cache-Control": "no-cache, no-transform",
// 	  "X-Accel-Buffering": "no",
// 	},
//   })
}