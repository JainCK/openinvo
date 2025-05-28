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
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateClientDetails } from "@/store/invoiceSlice";

const ClientDetails: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
        <CardDescription>Information about your client</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              placeholder="Client Name"
              value={invoice.clientDetails.name}
              onChange={(e) =>
                dispatch(
                  updateClientDetails({
                    field: "name",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="client@example.com"
              value={invoice.clientDetails.email}
              onChange={(e) =>
                dispatch(
                  updateClientDetails({
                    field: "email",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <div>
          <Label htmlFor="clientAddress">Client Address</Label>
          <Textarea
            id="clientAddress"
            placeholder="123 Client St, City, State 12345"
            value={invoice.clientDetails.address}
            onChange={(e) =>
              dispatch(
                updateClientDetails({
                  field: "address",
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

export default ClientDetails;
