"use client";

import type React from "react";

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
import type { RootState } from "@/store/store";
import { updateBusinessDetails, setLogo } from "@/store/invoiceSlice";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Upload,
  ImageIcon,
} from "lucide-react";

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
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Your Business Details
            </CardTitle>
            <CardDescription className="text-gray-600">
              Information about your business (optional)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="businessName"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <Building2 className="h-4 w-4 text-blue-600" />
              <span>Business Name</span>
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="businessEmail"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <Mail className="h-4 w-4 text-green-600" />
              <span>Business Email</span>
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="businessPhone"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <Phone className="h-4 w-4 text-purple-600" />
              <span>Business Phone</span>
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="businessGstin"
              className="text-sm font-medium text-gray-700"
            >
              GSTIN/UIN
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="businessStateName"
              className="text-sm font-medium text-gray-700"
            >
              State Name
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="businessStateCode"
              className="text-sm font-medium text-gray-700"
            >
              State Code
            </Label>
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
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="logo"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <Upload className="h-4 w-4 text-indigo-600" />
              <span>Logo Upload</span>
            </Label>
            <div className="relative">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="cursor-pointer border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="businessAddress"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <MapPin className="h-4 w-4 text-red-600" />
            <span>Business Address</span>
          </Label>
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
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 min-h-[80px]"
          />
        </div>

        {logoPreview && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <ImageIcon className="h-4 w-4 text-blue-600" />
              <span>Logo Preview</span>
            </Label>
            <div className="p-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors duration-200">
              <img
                src={logoPreview || "/placeholder.svg"}
                alt="Logo preview"
                className="max-h-20 max-w-40 object-contain mx-auto"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessDetails;
