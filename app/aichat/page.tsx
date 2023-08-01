'use client'
import React, { useState, useRef} from "react";
import styles from './page.module.css'

const msgs = [{role: 'assistant', content: 'I am a blockchain developer AI Bot, what can I help you?'}];

export default function Chat() {

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string>("");
  const messagesEndRef = useRef<any>(null)

  const [messages, setMessages] = useState([
    {role: 'assistant', content: 'I am a blockchain developer AI Bot, what can I help you?'}
  ]);

  function addMessage(msg: {role: string, content: string}) {
    console.log('msg:', msg)
    // setMessages(msgs => [...msgs, msg]);
    // console.log('msgs:',messages);
    msgs.push(msg);
    console.log('msgs:',msgs);
    setMessages(msgs);
    scrollToBottom();
  }

  const scrollToBottom = () => {
    setTimeout(function() {
      const scrollHeight = messagesEndRef.current?.scrollHeight;
      messagesEndRef.current?.scroll({top: scrollHeight, behavior: 'smooth'});
    }, 0);

  }

  const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (input == '') {
      alert('Please input your message');
      return;
    }
    e.preventDefault();
    setResponse("");
    setLoading(true);

    addMessage({role: 'user', content: input});
    setInput('');

    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: 'Blockchain Dev',
        msgs: msgs,
      }),
    });

    if (!res.ok) {
      addMessage({role: 'assistant', content: 'Error happen when chating with AI...'});
      setLoading(false);
      scrollToBottom();
      return;
    }

    // This data is a ReadableStream
    const data = res.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let message = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      message += chunkValue;
      setResponse((prev) => prev + chunkValue);
      scrollToBottom();
    }
    console.log('AI message res:', message);
    addMessage({role: 'assistant', content: message});
    setLoading(false);
    
  };

  return (
    <div className="container-fluid py-1" style={{ backgroundColor: "#eee" }}>
      <div className="row">
        <div className="col-4">
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
                        <p className="fw-bold mb-0">Ecosystem Expert Bot (WIP)</p>
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
                        <p className="fw-bold mb-0">PDF Reader (WIP)</p>
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
        <div className="col-8">
            <ul className="row" style={{'height': 'calc(100vh - 280px)', 'overflow': 'scroll'}} ref={messagesEndRef}>
            {messages.map((item, index) => {
              return (
                <li key={index} className={"d-flex mb-4 " + (item.role == 'assistant' ? "justify-content-start" : "justify-content-end") }>
              {item.role == 'assistant' && <img
                src="https://img.icons8.com/fluency/2x/iron-man.png"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />}
              <div className={"card " + styles.message}>
                <div className="card-header">
                {item.role == 'assistant' ? 'AI Bot': 'You'}
                </div>
                <div className="card-body">
                  <p className="card-text">{item.content}</p>
                </div>
              </div>
              {item.role == 'user' && <img
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
            value={input}
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