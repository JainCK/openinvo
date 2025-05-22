import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">InvoiceGen</h1>
        </div>
        <div className="flex space-x-2">
          <Link href="/create">
            <Button size="sm">Get Started</Button>
          </Link>
          <a
            href="https://github.com/JainCK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm">⭐ Star On GitHub</Button>
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
