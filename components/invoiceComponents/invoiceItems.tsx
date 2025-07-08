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
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addItem,
  removeItem,
  updateItem,
  setIsIndia,
  setCurrency,
} from "@/store/invoiceSlice";
import { Plus, Trash2 } from "lucide-react";

const InvoiceItems: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  // Indian GST rates
  const indianGSTRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

  const calculateItemTotal = (
    quantity: number,
    unitPrice: number,
    taxRate: number
  ) => {
    const subtotal = quantity * unitPrice;
    const tax = subtotal * (taxRate / 100);
    return subtotal + tax;
  };

  const calculateGSTBreakdown = (subtotal: number, taxRate: number) => {
    const totalTax = subtotal * (taxRate / 100);
    const cgst = totalTax / 2;
    const sgst = totalTax / 2;
    return { totalTax, cgst, sgst };
  };

  const calculateTotals = () => {
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const totalTax = invoice.items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      return sum + itemSubtotal * (item.taxRate / 100);
    }, 0);
    const grandTotal = subtotal + totalTax;

    // Calculate GST breakdown for India
    let totalCGST = 0;
    let totalSGST = 0;
    if (isIndianInvoice) {
      invoice.items.forEach((item) => {
        const itemSubtotal = item.quantity * item.unitPrice;
        const { cgst, sgst } = calculateGSTBreakdown(
          itemSubtotal,
          item.taxRate
        );
        totalCGST += cgst;
        totalSGST += sgst;
      });
    }

    return { subtotal, totalTax, grandTotal, totalCGST, totalSGST };
  };

  const getCurrencySymbol = () => {
    switch (invoice.currency) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return "$";
    }
  };

  const isIndianInvoice = invoice.isIndia || invoice.currency === "INR";

  const { subtotal, totalTax, grandTotal, totalCGST, totalSGST } =
    calculateTotals();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Invoice Items</CardTitle>
            <CardDescription>
              Add products or services to your invoice
            </CardDescription>
          </div>
          <Button onClick={() => dispatch(addItem())} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Country and Currency Selection */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isIndia"
                checked={invoice.isIndia}
                onChange={(e) => dispatch(setIsIndia(e.target.checked))}
              />
              <Label htmlFor="isIndia">Is this invoice for India?</Label>
            </div>
          </div>
          {!invoice.isIndia && (
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                id="currency"
                value={invoice.currency}
                onChange={(e) => dispatch(setCurrency(e.target.value))}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
              </Select>
            </div>
          )}
        </div>
        <div className="space-y-4">
          {invoice.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items added yet. Click &quot;Add Item&quot; to get started.
            </div>
          ) : (
            invoice.items.map((item, index) => (
              <div key={item.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Item #{index + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor={`description-${item.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`description-${item.id}`}
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            id: item.id,
                            field: "description",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            id: item.id,
                            field: "quantity",
                            value: parseFloat(e.target.value) || 0,
                          })
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`unitPrice-${item.id}`}>
                      Unit Price ({getCurrencySymbol()})
                    </Label>
                    <Input
                      id={`unitPrice-${item.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            id: item.id,
                            field: "unitPrice",
                            value: parseFloat(e.target.value) || 0,
                          })
                        )
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor={`hsn-${item.id}`}>
                      HSN/SAC Code (Optional)
                    </Label>
                    <Input
                      id={`hsn-${item.id}`}
                      placeholder="HSN/SAC Code"
                      value={item.hsn}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            id: item.id,
                            field: "hsn",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`taxRate-${item.id}`}>
                      {isIndianInvoice
                        ? "GST Rate (%)"
                        : "Tax Rate (%) - Optional"}
                    </Label>
                    {isIndianInvoice ? (
                      <Select
                        id={`taxRate-${item.id}`}
                        value={item.taxRate.toString()}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "taxRate",
                              value: parseFloat(e.target.value) || 0,
                            })
                          )
                        }
                      >
                        {indianGSTRates.map((rate) => (
                          <option key={rate} value={rate}>
                            {rate}%
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        id={`taxRate-${item.id}`}
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={item.taxRate}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "taxRate",
                              value: parseFloat(e.target.value) || 0,
                            })
                          )
                        }
                      />
                    )}
                  </div>
                  <div className="flex items-end">
                    <div className="text-right">
                      <Label>Item Total</Label>
                      <div className="text-lg font-semibold">
                        {getCurrencySymbol()}
                        {calculateItemTotal(
                          item.quantity,
                          item.unitPrice,
                          item.taxRate
                        ).toFixed(2)}
                      </div>
                      {isIndianInvoice && item.taxRate > 0 && (
                        <div className="text-xs text-gray-600 mt-1">
                          CGST: {getCurrencySymbol()}
                          {calculateGSTBreakdown(
                            item.quantity * item.unitPrice,
                            item.taxRate
                          ).cgst.toFixed(2)}
                          <br />
                          SGST: {getCurrencySymbol()}
                          {calculateGSTBreakdown(
                            item.quantity * item.unitPrice,
                            item.taxRate
                          ).sgst.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        {invoice.items.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="max-w-sm ml-auto space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {getCurrencySymbol()}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              {isIndianInvoice ? (
                <>
                  <div className="flex justify-between">
                    <span>CGST:</span>
                    <span>
                      {getCurrencySymbol()}
                      {totalCGST?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST:</span>
                    <span>
                      {getCurrencySymbol()}
                      {totalSGST?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total GST:</span>
                    <span>
                      {getCurrencySymbol()}
                      {totalTax.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <span>Total Tax:</span>
                  <span>
                    {getCurrencySymbol()}
                    {totalTax.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Grand Total:</span>
                <span>
                  {getCurrencySymbol()}
                  {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvoiceItems;
