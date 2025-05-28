import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const invoiceRef: React.FC = () => {
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

  return (
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
                <p className="text-gray-600">{invoice.businessDetails.phone}</p>
              )}
              {invoice.businessDetails.email && (
                <p className="text-gray-600">{invoice.businessDetails.email}</p>
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
              <p className="text-gray-600">{invoice.clientDetails.email}</p>
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
                <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Items Table */}
        {invoice.items.length > 0 && (
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px] sm:min-w-0">
              <thead>
                <tr
                  style={{
                    backgroundColor: invoice.customization.colorScheme + "20",
                  }}
                >
                  <th className="border border-gray-300 px-2 py-2 text-left text-xs sm:px-4 sm:text-base">
                    Description
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center text-xs sm:px-4 sm:text-base">
                    Qty
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-right text-xs sm:px-4 sm:text-base">
                    Unit Price
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center text-xs sm:px-4 sm:text-base">
                    Tax %
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-right text-xs sm:px-4 sm:text-base">
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
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">
                        {item.description || "No description"}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center sm:px-4">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-right sm:px-4">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center sm:px-4">
                        {item.taxRate}%
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-right font-medium sm:px-4">
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
            <div className="w-full max-w-xs sm:w-64">
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
            <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Thank you for your business!</p>
        </div>
      </div>
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
};

export default invoiceRef;
