"use client";

import type React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { updateNotes } from "@/store/invoiceSlice";
import { FileText, Info } from "lucide-react";

const Notes: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Notes & Terms
            </CardTitle>
            <CardDescription className="text-gray-600">
              Additional notes or terms and conditions (optional)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Pro Tip:</p>
            <p>
              Include payment terms, late fees, or any special instructions for
              your customer.
            </p>
          </div>
        </div>

        <Textarea
          placeholder="Payment terms, additional notes, or terms and conditions..."
          rows={5}
          value={invoice.notes}
          onChange={(e) => dispatch(updateNotes(e.target.value))}
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 resize-none"
        />

        <div className="text-xs text-gray-500">
          Character count: {invoice.notes?.length || 0}
        </div>
      </CardContent>
    </Card>
  );
};

export default Notes;
