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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addItem, removeItem, updateItem } from "@/store/invoiceSlice";
import { Plus, Trash2 } from "lucide-react";

const InvoiceItems: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

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
                    <Label htmlFor={`unitPrice-${item.id}`}>Unit Price</Label>
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
  );
};

export default InvoiceItems;
