import { useState } from "react";
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
import { updateBusinessDetails, setLogo } from "@/store/invoiceSlice";

const BusinessDetails: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    invoice.businessDetails.logo
  );

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        dispatch(setLogo(result));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Business Details</CardTitle>
        <CardDescription>
          Information about your business (optional)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              placeholder="Your Business Name"
              value={invoice.businessDetails.name}
              onChange={(e) =>
                dispatch(
                  updateBusinessDetails({
                    field: "name",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="businessEmail">Business Email</Label>
            <Input
              id="businessEmail"
              type="email"
              placeholder="business@example.com"
              value={invoice.businessDetails.email}
              onChange={(e) =>
                dispatch(
                  updateBusinessDetails({
                    field: "email",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="businessPhone">Business Phone</Label>
            <Input
              id="businessPhone"
              placeholder="(555) 123-4567"
              value={invoice.businessDetails.phone}
              onChange={(e) =>
                dispatch(
                  updateBusinessDetails({
                    field: "phone",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="businessGstin">GSTIN/UIN</Label>
            <Input
              id="businessGstin"
              placeholder="GSTIN/UIN Number"
              value={invoice.businessDetails.gstin}
              onChange={(e) =>
                dispatch(
                  updateBusinessDetails({
                    field: "gstin",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="businessStateName">State Name</Label>
            <Input
              id="businessStateName"
              placeholder="State Name"
              value={invoice.businessDetails.stateName}
              onChange={(e) =>
                dispatch(
                  updateBusinessDetails({
                    field: "stateName",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="businessStateCode">State Code</Label>
            <Input
              id="businessStateCode"
              placeholder="State Code"
              value={invoice.businessDetails.stateCode}
              onChange={(e) =>
                dispatch(
                  updateBusinessDetails({
                    field: "stateCode",
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div>
            <Label htmlFor="logo">Logo Upload</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="businessAddress">Business Address</Label>
          <Textarea
            id="businessAddress"
            placeholder="123 Business St, City, State 12345"
            value={invoice.businessDetails.address}
            onChange={(e) =>
              dispatch(
                updateBusinessDetails({
                  field: "address",
                  value: e.target.value,
                })
              )
            }
          />
        </div>
        {logoPreview && (
          <div className="mt-4">
            <Label>Logo Preview</Label>
            <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <img
                src={logoPreview}
                alt="Logo preview"
                className="max-h-20 max-w-40 object-contain"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessDetails;
