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
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { updateAuthorizedSignatory, setSignature } from "@/store/invoiceSlice";
import { PenTool, Upload, User, ImageIcon } from "lucide-react";

const AuthorizedSignatory: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(
    invoice.authorizedSignatory.signature
  );

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSignaturePreview(result);
        dispatch(setSignature(result));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
            <PenTool className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Authorized Signatory
            </CardTitle>
            <CardDescription className="text-gray-600">
              Add signatory information for the invoice
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="signatoryName"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <User className="h-4 w-4 text-blue-600" />
              <span>Signatory Name</span>
            </Label>
            <Input
              id="signatoryName"
              placeholder="Full Name of Authorized Person"
              value={invoice.authorizedSignatory.name}
              onChange={(e) =>
                dispatch(
                  updateAuthorizedSignatory({
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
              htmlFor="signature"
              className="text-sm font-medium text-gray-700 flex items-center space-x-2"
            >
              <Upload className="h-4 w-4 text-purple-600" />
              <span>Signature Upload (Optional)</span>
            </Label>
            <Input
              id="signature"
              type="file"
              accept="image/*"
              onChange={handleSignatureUpload}
              className="cursor-pointer border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        {signaturePreview && (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <ImageIcon className="h-4 w-4 text-green-600" />
              <span>Signature Preview</span>
            </Label>
            <div className="p-6 border-2 border-dashed border-green-200 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors duration-200">
              <img
                src={signaturePreview || "/placeholder.svg"}
                alt="Signature preview"
                className="max-h-20 max-w-60 object-contain mx-auto"
              />
            </div>
          </div>
        )}

        {!signaturePreview && invoice.authorizedSignatory.name && (
          <div className="p-6 border-2 border-dashed border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">For:</div>
              <div className="font-semibold text-lg text-gray-900 mb-6">
                {invoice.businessDetails.name || "Your Business"}
              </div>
              <div className="mt-8 pt-4 border-t border-gray-300">
                <div className="font-medium text-gray-900">
                  {invoice.authorizedSignatory.name}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Authorized Signatory
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthorizedSignatory;
