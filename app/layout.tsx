'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
// import './globals.css'

import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Smart Playbook - Blockchain</title>
      </head>
      <body className="">
        <div className="container-fluid d-flex flex-column vh-100 justify-content-between px-0">
          <header className="d-flex flex-column bg-body-tertiary border-bottom">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">Smart Playbook - Blockchain</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/aichat">AI Chat</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/roadmap">Roadmap</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/docs/home.html">Documents</a>
                    </li>
                  </ul>
                  <div className="d-flex">
                    <button type="button" className="btn btn-outline-success">Connect</button>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <main className="mw-100 vw-100 d-flex" style={{ height: "calc(100% - 100px)"}}>
            {children}
          </main>
          <footer className="bg-body-tertiary d-flex flex-wrap justify-content-between align-items-center border-top">
            <p className="col-md-4 mb-0 text-body-secondary">© Lazyload Box</p>
            <ul className="nav col-md-4 justify-content-end">
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  )
}
