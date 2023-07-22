import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className="container text-center">
      <div className="row p-3 align-items-center">
        <div className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>A Smart Blockchain Playbook powerd by AI&GPT.</p>
              <footer className="blockquote-footer">Blockchain & Crypto @ AIBooks.Work</footer>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="row p-3 align-items-center">
        <div className="col">
          <div className="card" style={{ "width": "18rem", height: "26rem" }}>
            <img src="https://th.bing.com/th/id/OIP.0KOKH0XiIjYUuLScXiK6PAAAAA?w=310&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" className="card-img-top" alt="Chat with AI" />
            <div className="card-body">
              <h5 className="card-title">Chat with AI</h5>
              <p className="card-text" style={{ height: "6rem" }}>We can ask question and learn from the AI chat bot powerd by OpenAI.</p>
              <a href="/aichat" className="btn btn-primary">Go</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{ "width": "18rem", height: "26rem" }}>
            <img src="https://th.bing.com/th/id/OIP.D8qtgqN2MeBXhqeHoJNwgQHaEK?pid=ImgDet&rs=1" className="card-img-top" alt="Learning Roadmap" />
            <div className="card-body">
              <h5 className="card-title">Learning Roadmap</h5>
              <p className="card-text" style={{ height: "6rem" }} >Roadmaps, guides and other educational content to guide us in picking up a path and guide learnings</p>
              <a href="/roadmap" className="btn btn-primary">Go</a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{ width: "18rem", height: "26rem" }}>
            <img src="https://th.bing.com/th/id/OIP.U3Jx_sCODqQDjrtGkM5cSAHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7" className="card-img-top" alt="Knowledge Documents" />
            <div className="card-body">
              <h5 className="card-title">Knowledge Documents</h5>
              <p className="card-text" style={{ height: "6rem" }}>Documents which you can learn the different blockchain role.</p>
              <a href="/docs/home.html" className="btn btn-primary">Go</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
