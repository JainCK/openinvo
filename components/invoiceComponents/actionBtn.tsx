import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ActionButton: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end">
      <Link href="/">
        <Button variant="outline" className="w-full sm:w-auto">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>
      <Link href="/preview">
        <Button className="w-full sm:w-auto">
          Preview Invoice
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
};

export default ActionButton;
