import type React from "react";
import Link from "next/link";
import { FileText, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => (
  <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-blue-100/50 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-75"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              OpenInvo
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Professional Invoice Generator
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span>Free Forever</span>
          </div>

          <div className="space-x-2 hidden sm:flex">
            <Link href="/create">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
            <a
              href="https://github.com/JainCK/openinvo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 bg-transparent"
              >
                <Github className="h-4 w-4 mr-2" />
                Star on GitHub
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <Link href="/create">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Start
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
