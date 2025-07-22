import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Upload from "./Upload";

const Home = () => {
  // Remove fileInputRef, selectedFile, and upload logic
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-nav">
          <div className="home-logo">DotRead</div>
        </div>
        <h1 className="main-title">✂️ Extract PDF Pages Instantly — For Free</h1>
      </header>
      <main className="extract-section">
        <Upload />
        <div className="features-section">
          <div className="features-list">
            <p>Explore and understand your PDF like never before — no downloads, no signups, just intelligent reading powered by your browser.</p>
            <ul>
              <li>✔️ Extract structured outlines (Title, H1, H2, H3) from any PDF</li>
              <li>✔️ Jump instantly to the section you need with smart navigation</li>
              <li>✔️ Experience context-aware reading like never before</li>
              <li>✔️ All in-browser — no downloads or plugins needed</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
