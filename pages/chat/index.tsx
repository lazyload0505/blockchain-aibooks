"use client";

import '../../app/globals.css';
import { useState } from "react";

import { Layout, Menu, theme } from 'antd';
const { Sider, Content } = Layout;

import { AppLayout } from '../../common/components/AppLayout';

export default function ClientSection() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<String>("");

  const prompt = `Question is '${input}', Generate a answer with less than 800 characters.`;

  const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <AppLayout>
      <Layout>
        <Sider>
          <div>Menu</div>
        </Sider>
        <Content>
          <div className="w-full max-w-xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              maxLength={200}
              className="focus:ring-neu w-full rounded-md border border-neutral-400
         p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-900"
              placeholder={"e.g. What is React?"}
            />
            {!loading ? (
              <button
                className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-black/80"
                onClick={(e) => generateResponse(e)}
              >
                Generate Response &rarr;
              </button>
            ) : (
              <button
                disabled
                className="w-full rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
              >
                <div className="animate-pulse font-bold tracking-widest">...</div>
              </button>
            )}
            {response && (
              <div className="mt-8 rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100">
                {response}
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </AppLayout>
  );
}