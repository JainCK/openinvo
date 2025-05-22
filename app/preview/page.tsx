"use client";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, Edit, Printer, Palette } from "lucide-react";
import Link from "next/link";
import { updateCustomization } from "@/store/invoiceSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PreviewPage() {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);
  const invoiceRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = () => {
    window.print();
  };

  //   const handleDownloadPDF = async () => {
  //     if (!invoiceRef.current) return;

  //     try {
  //       const canvas = await html2canvas(invoiceRef.current, {
  //         scale: 2,
  //         useCORS: true,
  //         allowTaint: true,
  //       });

  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");

  //       const imgWidth = 210; // A4 width in mm
  //       const pageHeight = 295; // A4 height in mm
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       let heightLeft = imgHeight;

  //       let position = 0;

  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;

  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }

  //       pdf.save(`invoice-${invoice.invoiceNumber || "draft"}.pdf`);
  //     } catch (error) {
  //       console.error("Error generating PDF:", error);
  //       alert("Error generating PDF. Please try again.");
  //     }
  //   };

  const colorSchemes = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
  ];

  const fonts = [
    { name: "Sans Serif", value: "sans-serif" },
    { name: "Serif", value: "serif" },
    { name: "Monospace", value: "monospace" },
  ];

  const layouts = [
    { name: "Spacious", value: "spacious" },
    { name: "Compact", value: "compact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/create"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Edit</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Invoice Preview
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 print:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Customization Panel */}
          <div className="lg:col-span-1 print:hidden">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Customize
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Color Scheme</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {colorSchemes.map((color) => (
                        <button
                          key={color.value}
                          onClick={() =>
                            dispatch(
                              updateCustomization({
                                field: "colorScheme",
                                value: color.value,
                              })
                            )
                          }
                          className={`w-full h-8 rounded border-2 ${
                            invoice.customization.colorScheme === color.value
                              ? "border-gray-800"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="font-select">Font</Label>
                    <select
                      id="font-select"
                      className="w-full mt-1 p-2 border rounded-md"
                      value={invoice.customization.font}
                      onChange={(e) =>
                        dispatch(
                          updateCustomization({
                            field: "font",
                            value: e.target.value,
                          })
                        )
                      }
                    >
                      {fonts.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="layout-select">Layout</Label>
                    <select
                      id="layout-select"
                      className="w-full mt-1 p-2 border rounded-md"
                      value={invoice.customization.layout}
                      onChange={(e) =>
                        dispatch(
                          updateCustomization({
                            field: "layout",
                            value: e.target.value,
                          })
                        )
                      }
                    >
                      {layouts.map((layout) => (
                        <option key={layout.value} value={layout.value}>
                          {layout.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button onClick={handlePrint} className="w-full">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Invoice
                </Button>
                {/* <Button
                  onClick={handleDownloadPDF}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Save as PDF
                </Button> */}
                <Link href="/create" className="block">
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Invoice
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Invoice Display */}
          <div className="lg:col-span-3">
            <div
              ref={invoiceRef}
              className={`bg-white shadow-lg print:shadow-none ${
                invoice.customization.layout === "compact" ? "p-6" : "p-8"
              }`}
              style={{
                fontFamily: invoice.customization.font,
                minHeight: "297mm", // A4 height
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  {invoice.businessDetails.logo && (
                    <img
                      src={invoice.businessDetails.logo}
                      alt="Business Logo"
                      className="max-h-16 max-w-32 object-contain"
                    />
                  )}
                  <div>
                    {invoice.businessDetails.name && (
                      <h1 className="text-2xl font-bold text-gray-900">
                        {invoice.businessDetails.name}
                      </h1>
                    )}
                    {invoice.businessDetails.address && (
                      <p className="text-gray-600 whitespace-pre-line">
                        {invoice.businessDetails.address}
                      </p>
                    )}
                    {invoice.businessDetails.phone && (
                      <p className="text-gray-600">
                        {invoice.businessDetails.phone}
                      </p>
                    )}
                    {invoice.businessDetails.email && (
                      <p className="text-gray-600">
                        {invoice.businessDetails.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <h2
                    className="text-3xl font-bold mb-2"
                    style={{ color: invoice.customization.colorScheme }}
                  >
                    INVOICE
                  </h2>
                  {invoice.invoiceNumber && (
                    <p className="text-gray-600">#{invoice.invoiceNumber}</p>
                  )}
                </div>
              </div>

              {/* Invoice Details & Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
                  {invoice.clientDetails.name && (
                    <p className="font-medium">{invoice.clientDetails.name}</p>
                  )}
                  {invoice.clientDetails.address && (
                    <p className="text-gray-600 whitespace-pre-line">
                      {invoice.clientDetails.address}
                    </p>
                  )}
                  {invoice.clientDetails.email && (
                    <p className="text-gray-600">
                      {invoice.clientDetails.email}
                    </p>
                  )}
                </div>
                <div className="text-left md:text-right">
                  {invoice.invoiceDate && (
                    <div className="mb-2">
                      <span className="font-semibold">Invoice Date: </span>
                      <span>
                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {invoice.dueDate && (
                    <div>
                      <span className="font-semibold">Due Date: </span>
                      <span>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Items Table */}
              {invoice.items.length > 0 && (
                <div className="mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr
                        style={{
                          backgroundColor:
                            invoice.customization.colorScheme + "20",
                        }}
                      >
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Description
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          Qty
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Unit Price
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center">
                          Tax %
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item) => {
                        const itemSubtotal = item.quantity * item.unitPrice;
                        const itemTax = itemSubtotal * (item.taxRate / 100);
                        const itemTotal = itemSubtotal + itemTax;

                        return (
                          <tr key={item.id}>
                            <td className="border border-gray-300 px-4 py-2">
                              {item.description || "No description"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              {item.quantity}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                              ${item.unitPrice.toFixed(2)}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              {item.taxRate}%
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right font-medium">
                              ${itemTotal.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Totals */}
              {invoice.items.length > 0 && (
                <div className="flex justify-end mb-8">
                  <div className="w-64">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${totalTax.toFixed(2)}</span>
                      </div>
                      <div
                        className="flex justify-between text-lg font-bold border-t pt-2"
                        style={{
                          borderColor: invoice.customization.colorScheme,
                        }}
                      >
                        <span>Total:</span>
                        <span>${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {invoice.notes && (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes:</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {invoice.notes}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>Thank you for your business!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          .print\\:p-0 {
            padding: 0 !important;
          }

          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
