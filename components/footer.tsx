import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-cyan-50 text-gray-800 py-8">
    <div className="max-w-3xl mx-auto flex flex-col md:flex-row flex-wrap md:justify-between items-center gap-8 px-4">
      <div>
        <a
          href="https://github.com/jainck/openinvo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 no-underline font-medium hover:underline"
        >
          ⭐ Star us on GitHub
        </a>
      </div>
      <div>
        <span>
          &copy; {new Date().getFullYear()} OpenInvo.JainCK All rights reserved.
        </span>
      </div>
      <div className="flex gap-5 items-center">
        <a
          href="https://www.jainck.me/"
          className="text-gray-800 no-underline hover:underline"
          aria-label="Portfolio"
        >
          Portfolio
        </a>
        <a
          href="https://twitter.com/jain_kuriakose"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 no-underline hover:underline"
          aria-label="Twitter"
        >
          Twitter
        </a>
        <a
          href="https://linkedin.com/in/jainck"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 no-underline hover:underline"
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
