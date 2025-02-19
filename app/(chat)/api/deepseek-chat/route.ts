import OpenAI from 'openai';
const client = new OpenAI({
  baseURL: process.env.ARK_BASE_URL,
  apiKey: process.env.ARK_API_KEY,
});

async function main() {
  const stream = await client.chat.completions.create({
    model: 'ep-20250219094425-jwhb8',
    messages: [{ role: 'user', content: '请解释快速排序' }],
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

export async function GET(request: Request) {
  try {
    const stream = await client.chat.completions.create({
      model: 'ep-20250219094425-jwhb8',
      messages: [{ role: 'user', content: '请解释快速排序' }],
      stream: true,
    });

    const textEncoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(textEncoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
