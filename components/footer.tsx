import type React from "react";
import { Github, Twitter, Linkedin, ExternalLink, Heart } from "lucide-react";

const Footer: React.FC = () => (
  <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-full h-full">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
    </div>

    <div className="relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-2 rounded-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <span className="text-xl font-bold">OpenInvo</span>
            </div>
            <p className="text-blue-200 text-sm max-w-xs mx-auto md:mx-0">
              Making invoice generation simple and accessible for everyone.
            </p>
          </div>

          {/* Center Section */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-sm text-blue-200">Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span className="text-sm text-blue-200">by</span>
            </div>
            <a
              href="https://www.jainck.me/"
              className="text-white font-semibold hover:text-blue-300 transition-colors duration-300 flex items-center justify-center space-x-1"
            >
              <span>JainCK</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <p className="text-xs text-blue-300 mt-2">
              &copy; {new Date().getFullYear()} OpenInvo. All rights reserved.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex justify-center md:justify-end space-x-6">
            <a
              href="https://github.com/jainck/openinvo"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-blue-200 hover:text-white transition-all duration-300"
              aria-label="GitHub"
            >
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <Github className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                Star us
              </span>
            </a>

            <a
              href="https://twitter.com/jain_kuriakose"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-blue-200 hover:text-white transition-all duration-300"
              aria-label="Twitter"
            >
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                Follow
              </span>
            </a>

            <a
              href="https://linkedin.com/in/jainck"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 text-blue-200 hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                Connect
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-6 border-t border-blue-800/50 text-center">
          <p className="text-xs text-blue-300">
            Open source invoice generator • Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
