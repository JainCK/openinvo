// @ts-ignore
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  updateInvoiceDetails,
  updateBusinessDetails,
  updateClientDetails,
  addItem,
  removeItem,
  updateItem,
  updateNotes,
  setLogo,
} from "@/store/invoiceSlice";

export default function CreatePage() {
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

  const calculateItemTotal = (
    quantity: number,
    unitPrice: number,
    taxRate: number
  ) => {
    const subtotal = quantity * unitPrice;
    const tax = subtotal * (taxRate / 100);
    return subtotal + tax;
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
    return { subtotal, totalTax, grandTotal };
  };

  const { subtotal, totalTax, grandTotal } = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Create Invoice</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>
                Basic information about this invoice
              </CardDescription>
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

          {/* Client Details */}
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

          {/* Invoice Items */}
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
              <div className="space-y-4">
                {invoice.items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No items added yet. Click &quot;Add Item&quot; to get
                    started.
                  </div>
                ) : (
                  invoice.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 border rounded-lg bg-gray-50"
                    >
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
                          <Label htmlFor={`quantity-${item.id}`}>
                            Quantity
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
                                  value: parseFloat(e.target.value) || 0,
                                })
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`unitPrice-${item.id}`}>
                            Unit Price
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor={`taxRate-${item.id}`}>
                            Tax Rate (%) - Optional
                          </Label>
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
                        </div>
                        <div className="flex items-end">
                          <div className="text-right">
                            <Label>Item Total</Label>
                            <div className="text-lg font-semibold">
                              $
                              {calculateItemTotal(
                                item.quantity,
                                item.unitPrice,
                                item.taxRate
                              ).toFixed(2)}
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
                <div className="mt-6 pt-6 border-t">
                  <div className="max-w-sm ml-auto space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tax:</span>
                      <span>${totalTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Grand Total:</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes & Terms</CardTitle>
              <CardDescription>
                Additional notes or terms and conditions (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Payment terms, additional notes, or terms and conditions..."
                rows={4}
                value={invoice.notes}
                onChange={(e) => dispatch(updateNotes(e.target.value))}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/preview">
              <Button className="w-full sm:w-auto">
                Preview Invoice
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
