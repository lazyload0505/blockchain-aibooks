'use client'
import React, { useState, useRef} from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";

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
    <MDBContainer fluid className="py-1" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="3" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            AI Bots
          </h5>
          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                <li
                  className="p-2 border-bottom"
                  style={{ backgroundColor: "#eee" }}
                >
                  <a href="#!" className="d-flex justify-content-between">
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
                    {/* <div className="pt-1">
                      <p className="small text-muted mb-1">Just now</p>
                      <span className="badge bg-danger float-end">1</span>
                    </div> */}
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a href="#!" className="d-flex justify-content-between">
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
                    {/* <div className="pt-1">
                      <p className="small text-muted mb-1">5 mins ago</p>
                    </div> */}
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a href="#!" className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <img
                        src="https://img.icons8.com/fluency/2x/super-mario.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">ABC</p>
                        <p className="small text-muted">
                          You can ask me anything about blockchain
                        </p>
                      </div>
                    </div>
                    {/* <div className="pt-1">
                      <p className="small text-muted mb-1">Yesterday</p>
                    </div> */}
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a href="#!" className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <img
                        src="https://img.icons8.com/fluency/2x/homer-simpson.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">...</p>
                        <p className="small text-muted">
                          ...
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a href="#!" className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
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
                  </a>
                </li>
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="6" lg="7" xl="9">
          <MDBTypography>
            <ul style={{'height': '400px', 'overflow': 'scroll'}} ref={messagesEndRef}>
            {messages.map((item) => {
              return (
                <li className={"d-flex mb-4 " + (item.type == 'ai' ? "justify-content-start" : "justify-content-end") }>
              {item.type == 'ai' && <img
                src="https://img.icons8.com/fluency/2x/iron-man.png"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />}
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0">{item.type == 'ai' ? 'AI Bot': 'You'}</p>
                  {/* <p className="text-muted small mb-0">
                    <MDBIcon far icon="clock" /> 12 mins ago
                  </p> */}
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    {item.msg}
                  </p>
                </MDBCardBody>
              </MDBCard>
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
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0">AI Bot</p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    {response != '' ? response : 'thinking...'}
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>)}
            </ul>
          </MDBTypography>
          <div className="form-floating">
            <textarea className="form-control" 
            placeholder="Leave a comment here" 
            id="floatingTextarea2" 
            style={{ height: "100px" }}
            onChange={(e) => setInput(e.target.value)}>
            </textarea>
            <label htmlFor="floatingTextarea2">Comments</label>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" type="button" onClick={(e) => generateResponse(e)}>{!loading ? 'Send' : 'Wait for AI Response...'}</button>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}