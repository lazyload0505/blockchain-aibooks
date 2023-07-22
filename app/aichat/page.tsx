'use client'
import React, { useState, useRef} from "react";

export default function Chat() {

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<String>("");
  const messagesEndRef = useRef<any>(null)

  const prompt = `Question is '${input}', Generate a answer with less than 800 characters.`;

  const msgs = [
    {type: 'ai', msg: 'I am a blockchain AI Bot, what can I help you?'}
  ];

  const [messages, setMessages] = useState(msgs);

  function addMessage(msg: {type: string, msg: string}) {
    setMessages(msgs => [...msgs, msg]);
    scrollToBottom();
  }

  const scrollToBottom = () => {
    console.log('ref', messagesEndRef.current);
    messagesEndRef.current?.scrollIntoView(false)
  }

  const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);

    addMessage({'type': 'user', msg: input});

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
      addMessage({'type': 'ai', msg: 'Error happen when chating with AI...'});
      setLoading(false);
      scrollToBottom();
      return;
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
    scrollToBottom();
  };

  return (
    <div className="container-fluid py-1" style={{ backgroundColor: "#eee" }}>
      <div className="row">
        <div className="col-3">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            AI Bots
          </h5>
          <div className="card">
            <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><a href="#!" className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <img
                        src="https://img.icons8.com/fluency/2x/iron-man.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Developer Bot</p>
                        <p className="small text-muted">
                          I am AI Bot as blockchain developer.
                        </p>
                      </div>
                    </div>
                  </a></li>
              <li className="list-group-item"><a href="#!" className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <img
                        src="https://img.icons8.com/fluency/2x/futurama-bender.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Ecosystem Expert Bot</p>
                        <p className="small text-muted">
                          I am AI Bot as blockchain ecosystem expert.
                        </p>
                      </div>
                    </div>
                  </a></li>
              <li className="list-group-item"><a href="#!" className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <img
                        src="https://img.icons8.com/fluency/2x/super-mario.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">PDF Reader</p>
                        <p className="small text-muted">
                          Upload you PDF file and ask about the document.
                        </p>
                      </div>
                    </div>
                  </a></li>
            </ul>
            </div>
          </div>
        </div>
        <div className="col-9">
            <ul className="row" style={{'height': '400px', 'overflow': 'scroll'}} ref={messagesEndRef}>
            {messages.map((item, index) => {
              return (
                <li key={index} className={"d-flex mb-4 " + (item.type == 'ai' ? "justify-content-start" : "justify-content-end") }>
              {item.type == 'ai' && <img
                src="https://img.icons8.com/fluency/2x/iron-man.png"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />}
              <div className="card">
                <div className="card-header">
                {item.type == 'ai' ? 'AI Bot': 'You'}
                </div>
                <div className="card-body">
                  <p className="card-text">{item.msg}</p>
                </div>
              </div>
              {item.type == 'user' && <img
                src="https://img.icons8.com/fluency/2x/jake.png"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />}
            </li>
              );
            })}
            {loading && (<li className="d-flex justify-content-start mb-4">
              <img
                src="https://img.icons8.com/fluency/2x/iron-man.png"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <div className="card">
                <div className="card-header">
                  AI Bot
                </div>
                <div className="card-body">
                  <p className="card-text">{response != '' ? response : 'thinking...'}</p>
                </div>
              </div>
            </li>)}
            </ul>
          <div className="form-floating row">
            <textarea className="form-control" 
            placeholder="Leave a comment here" 
            id="floatingTextarea2" 
            style={{ height: "100px" }}
            onChange={(e) => setInput(e.target.value)}>
            </textarea>
            <label htmlFor="floatingTextarea2">Message</label>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" type="button" onClick={(e) => generateResponse(e)}>{!loading ? 'Send' : 'Wait for AI Response...'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}