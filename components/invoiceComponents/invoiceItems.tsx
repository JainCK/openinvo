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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  addItem,
  removeItem,
  updateItem,
  setIsIndia,
  setCurrency,
} from "@/store/invoiceSlice";
import {
  Plus,
  Trash2,
  ShoppingCart,
  Calculator,
  Globe,
  IndianRupee,
  DollarSign,
  Euro,
  PoundSterling,
  Package,
  Hash,
  Percent,
  Receipt,
} from "lucide-react";

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

  const getCurrencyIcon = () => {
    switch (invoice.currency) {
      case "INR":
        return <IndianRupee className="h-4 w-4" />;
      case "USD":
        return <DollarSign className="h-4 w-4" />;
      case "EUR":
        return <Euro className="h-4 w-4" />;
      case "GBP":
        return <PoundSterling className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const isIndianInvoice = invoice.isIndia || invoice.currency === "INR";
  const { subtotal, totalTax, grandTotal, totalCGST, totalSGST } =
    calculateTotals();

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Invoice Items
              </CardTitle>
              <CardDescription className="text-gray-600">
                Add products or services to your invoice
              </CardDescription>
            </div>
          </div>
          <Button
            onClick={() => dispatch(addItem())}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Country and Currency Selection */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Regional Settings</h3>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-blue-200">
              <Checkbox
                id="isIndia"
                checked={invoice.isIndia}
                onChange={(e) => dispatch(setIsIndia(e.target.checked))}
              />
              <Label
                htmlFor="isIndia"
                className="text-sm font-medium text-gray-700 flex items-center space-x-2"
              >
                <span>🇮🇳</span>
                <span>Is this invoice for India?</span>
              </Label>
            </div>
          </div>

          {!invoice.isIndia && (
            <div className="space-y-2">
              <Label
                htmlFor="currency"
                className="text-sm font-medium text-gray-700 flex items-center space-x-2"
              >
                {getCurrencyIcon()}
                <span>Currency</span>
              </Label>
              <Select
                id="currency"
                value={invoice.currency}
                onChange={(e) => dispatch(setCurrency(e.target.value))}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white"
              >
                <option value="USD">🇺🇸 USD - US Dollar</option>
                <option value="EUR">🇪🇺 EUR - Euro</option>
                <option value="GBP">🇬🇧 GBP - British Pound</option>
                <option value="INR">🇮🇳 INR - Indian Rupee</option>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {invoice.items.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 shadow-md">
                <Package className="h-8 w-8 text-gray-400 mx-auto mt-2" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No items added yet
              </h3>
              <p className="text-gray-500 mb-4">
                Click "Add Item" to get started with your invoice
              </p>
              <Button
                onClick={() => dispatch(addItem())}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Item
              </Button>
            </div>
          ) : (
            invoice.items.map((item, index) => (
              <div
                key={item.id}
                className="p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                      <Receipt className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">
                      Item #{index + 1}
                    </h4>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(removeItem(item.id))}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label
                      htmlFor={`description-${item.id}`}
                      className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                    >
                      <Package className="h-4 w-4 text-blue-600" />
                      <span>Description</span>
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
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`quantity-${item.id}`}
                      className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                    >
                      <Hash className="h-4 w-4 text-green-600" />
                      <span>Quantity</span>
                    </Label>
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
                            value: Number.parseFloat(e.target.value) || 0,
                          })
                        )
                      }
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`unitPrice-${item.id}`}
                      className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                    >
                      {getCurrencyIcon()}
                      <span>Unit Price ({getCurrencySymbol()})</span>
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
                            value: Number.parseFloat(e.target.value) || 0,
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
                      htmlFor={`hsn-${item.id}`}
                      className="text-sm font-medium text-gray-700"
                    >
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
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`taxRate-${item.id}`}
                      className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                    >
                      <Percent className="h-4 w-4 text-purple-600" />
                      <span>
                        {isIndianInvoice
                          ? "GST Rate (%)"
                          : "Tax Rate (%) - Optional"}
                      </span>
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
                              value: Number.parseFloat(e.target.value) || 0,
                            })
                          )
                        }
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white"
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
                              value: Number.parseFloat(e.target.value) || 0,
                            })
                          )
                        }
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      />
                    )}
                  </div>
                  <div className="flex items-end">
                    <div className="text-right w-full">
                      <Label className="text-sm font-medium text-gray-700 flex items-center justify-end space-x-2 mb-2">
                        <Calculator className="h-4 w-4 text-orange-600" />
                        <span>Item Total</span>
                      </Label>
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="text-xl font-bold text-green-700">
                          {getCurrencySymbol()}
                          {calculateItemTotal(
                            item.quantity,
                            item.unitPrice,
                            item.taxRate
                          ).toFixed(2)}
                        </div>
                        {isIndianInvoice && item.taxRate > 0 && (
                          <div className="text-xs text-gray-600 mt-2 space-y-1">
                            <div className="flex justify-between">
                              <span>CGST:</span>
                              <span className="font-medium">
                                {getCurrencySymbol()}
                                {calculateGSTBreakdown(
                                  item.quantity * item.unitPrice,
                                  item.taxRate
                                ).cgst.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>SGST:</span>
                              <span className="font-medium">
                                {getCurrencySymbol()}
                                {calculateGSTBreakdown(
                                  item.quantity * item.unitPrice,
                                  item.taxRate
                                ).sgst.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        {invoice.items.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            <div className="max-w-md ml-auto">
              <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">
                    Invoice Summary
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">
                      {getCurrencySymbol()}
                      {subtotal.toFixed(2)}
                    </span>
                  </div>

                  {isIndianInvoice ? (
                    <>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">CGST:</span>
                        <span className="font-medium text-gray-900">
                          {getCurrencySymbol()}
                          {totalCGST?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600">SGST:</span>
                        <span className="font-medium text-gray-900">
                          {getCurrencySymbol()}
                          {totalSGST?.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Total GST:</span>
                        <span className="font-medium text-gray-900">
                          {getCurrencySymbol()}
                          {totalTax.toFixed(2)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Total Tax:</span>
                      <span className="font-medium text-gray-900">
                        {getCurrencySymbol()}
                        {totalTax.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-4 mt-4">
                    <span className="text-lg font-semibold">Grand Total:</span>
                    <span className="text-xl font-bold">
                      {getCurrencySymbol()}
                      {grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvoiceItems;
