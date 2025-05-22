import React from "react";

const Footer: React.FC = () => (
  <footer style={{ background: "#ffffff", color: "#333", padding: "2rem 0" }}>
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <div>
        <a
          href="https://github.com/jainck/openinvo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#333", textDecoration: "none", fontWeight: 500 }}
        >
          ⭐ Star us on GitHub
        </a>
      </div>
      <div>
        <span>
          &copy; {new Date().getFullYear()} OpenInvo.JainCK All rights reserved.
        </span>
      </div>
      <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
        <a
          href="https://www.jainck.me/"
          style={{ color: "#333", textDecoration: "none" }}
          aria-label="Portfolio"
        >
          Portfolio
        </a>
        <a
          href="https://twitter.com/jain_kuriakose"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#333", textDecoration: "none" }}
          aria-label="Twitter"
        >
          Twitter
        </a>
        <a
          href="https://linkedin.com/in/jainck"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#333", textDecoration: "none" }}
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
