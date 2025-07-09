import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Printer, Edit, Download, Share2 } from "lucide-react";

const handlePrint = () => {
  window.print();
};

const ActButton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2 text-center">
          Invoice Actions
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Ready to use your invoice?
        </p>

        <div className="space-y-3">
          <Button
            onClick={handlePrint}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Invoice
          </Button>

          <Link href="/create" className="block">
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 bg-transparent"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Invoice
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2 text-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">Invoice Ready</span>
        </div>
        <p className="text-xs text-green-700 mt-1">
          Your professional invoice is ready to print or share
        </p>
      </div>
    </div>
  );
};

export default ActButton;
