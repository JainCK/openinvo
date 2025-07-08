import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Printer, Edit } from "lucide-react";

const handlePrint = () => {
  window.print();
};

const ActButton: React.FC = () => {
  return (
    <div className="space-y-3">
      <Button onClick={handlePrint} variant="outline" className="w-full">
        <Printer className="h-4 w-4 mr-2" />
        Print Invoice
      </Button>
      <Link href="/create" className="block">
        <Button variant="outline" className="w-full">
          <Edit className="h-4 w-4 mr-2" />
          Edit Invoice
        </Button>
      </Link>
    </div>
  );
};

export default ActButton;
