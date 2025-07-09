import type React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

interface CommonHeaderProps {
  name: string;
  backHref?: string;
  backLabel?: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  name,
  backHref = "/",
  backLabel = "Back to Home",
}) => (
  <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100/50 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="group flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-300"
        >
          <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <span className="font-medium">{backLabel}</span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Home className="h-3 w-3" />
              <span>OpenInvo</span>
            </div>
          </div>
        </Link>

        <div className="text-center flex-1">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {name}
          </h1>
          <p className="text-sm text-gray-500 hidden sm:block">
            Professional Invoice Generator
          </p>
        </div>

        <div className="w-20 sm:w-32" />
      </div>
    </div>
  </header>
);

export default CommonHeader;
