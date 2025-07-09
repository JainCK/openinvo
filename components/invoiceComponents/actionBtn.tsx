import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";

const ActionButton: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
      <div className="text-center sm:text-left">
        <h3 className="font-semibold text-gray-900 mb-1">
          Ready to preview your invoice?
        </h3>
        <p className="text-sm text-gray-600">
          Review all details before generating the final PDF
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <Link href="/preview">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Eye className="h-4 w-4 mr-2" />
            Preview Invoice
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ActionButton;
