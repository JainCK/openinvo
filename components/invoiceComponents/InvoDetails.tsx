"use client";

import type React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { updateInvoiceDetails } from "@/store/invoiceSlice";
import { FileText, Calendar, Clock } from "lucide-react";

const InvoDetails: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Invoice Details
            </CardTitle>
            <CardDescription className="text-gray-600">
              Basic information about this invoice
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="invoiceNumber"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <FileText className="h-4 w-4 text-blue-600" />
            <span>Invoice Number</span>
          </Label>
          <Input
            id="invoiceNumber"
            placeholder="INV-001"
            value={invoice.invoiceNumber}
            onChange={(e) =>
              dispatch(
                updateInvoiceDetails({
                  field: "invoiceNumber",
                  value: e.target.value,
                })
              )
            }
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="invoiceDate"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4 text-green-600" />
            <span>Invoice Date</span>
          </Label>
          <Input
            id="invoiceDate"
            type="date"
            value={invoice.invoiceDate}
            onChange={(e) =>
              dispatch(
                updateInvoiceDetails({
                  field: "invoiceDate",
                  value: e.target.value,
                })
              )
            }
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="dueDate"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <Clock className="h-4 w-4 text-orange-600" />
            <span>Due Date</span>
          </Label>
          <Input
            id="dueDate"
            type="date"
            value={invoice.dueDate}
            onChange={(e) =>
              dispatch(
                updateInvoiceDetails({
                  field: "dueDate",
                  value: e.target.value,
                })
              )
            }
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoDetails;
