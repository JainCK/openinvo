import React from "react";
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
import { RootState } from "@/store/store";
import { updateInvoiceDetails } from "@/store/invoiceSlice";

const InvoiceDetails: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>Basic information about this invoice</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
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
          />
        </div>
        <div>
          <Label htmlFor="invoiceDate">Invoice Date</Label>
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
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
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
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
