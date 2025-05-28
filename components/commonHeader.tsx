import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <Link
          href={backHref}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 text-center flex-1">
          {name}
        </h1>
        <div className="w-5 sm:w-24" />
      </div>
    </div>
  </header>
);

export default CommonHeader;
