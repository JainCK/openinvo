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
import { RootState } from "@/store/store";
import { updateAuthorizedSignatory, setSignature } from "@/store/invoiceSlice";

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
    <Card>
      <CardHeader>
        <CardTitle>Authorized Signatory</CardTitle>
        <CardDescription>
          Add signatory information for the invoice
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="signatoryName">Signatory Name</Label>
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
            />
          </div>
          <div>
            <Label htmlFor="signature">Signature Upload (Optional)</Label>
            <Input
              id="signature"
              type="file"
              accept="image/*"
              onChange={handleSignatureUpload}
              className="cursor-pointer"
            />
          </div>
        </div>
        {signaturePreview && (
          <div className="mt-4">
            <Label>Signature Preview</Label>
            <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <img
                src={signaturePreview}
                alt="Signature preview"
                className="max-h-20 max-w-60 object-contain"
              />
            </div>
          </div>
        )}
        {!signaturePreview && invoice.authorizedSignatory.name && (
          <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">For:</div>
              <div className="font-medium text-lg">
                {invoice.businessDetails.name || "Your Business"}
              </div>
              <div className="mt-8 border-t border-gray-400 pt-2 text-sm">
                <div>{invoice.authorizedSignatory.name}</div>
                <div className="text-gray-600">Authorized Signatory</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthorizedSignatory;
