import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const InvoiceRef: React.FC = () => {
  const invoice = useSelector((state: RootState) => state.invoice);
  const invoiceRefElement = useRef<HTMLDivElement>(null);

  const isIndianInvoice = invoice.isIndia || invoice.currency === "INR";

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

  const { subtotal, totalTax, grandTotal, totalCGST, totalSGST } =
    calculateTotals();

  // Calculate tax rate breakdown for items count
  const getTaxRateBreakdown = () => {
    const taxRates: { [key: number]: number } = {};
    invoice.items.forEach((item) => {
      if (taxRates[item.taxRate]) {
        taxRates[item.taxRate] += 1;
      } else {
        taxRates[item.taxRate] = 1;
      }
    });
    return Object.entries(taxRates)
      .map(([rate, count]) => ({ rate: parseFloat(rate), count }))
      .sort((a, b) => a.rate - b.rate);
  };

  // Professional styling functions - optimized for single page
  const getPageSizeStyle = () => {
    switch (invoice.customization.pageSize) {
      case "A4":
        return { width: "210mm" }; // Removed minHeight for print optimization
      case "letter":
        return { width: "8.5in" };
      case "legal":
        return { width: "8.5in" };
      default:
        return { width: "210mm" };
    }
  };

  const getMarginStyle = () => {
    switch (invoice.customization.margins) {
      case "normal":
        return "12mm"; // Reduced from 20mm
      case "wide":
        return "18mm"; // Reduced from 25mm
      case "narrow":
        return "8mm"; // Reduced from 15mm
      default:
        return "12mm";
    }
  };

  const getLayoutSpacing = () => {
    switch (invoice.customization.layout) {
      case "compact":
        return "space-y-2"; // Reduced for better print layout
      case "minimal":
        return "space-y-1";
      default:
        return "space-y-3"; // Reduced from space-y-6
    }
  };

  const getLogoSize = () => {
    switch (invoice.customization.logoSize) {
      case "small":
        return "h-12 max-w-32";
      case "large":
        return "h-24 max-w-64";
      default:
        return "h-16 max-w-48";
    }
  };

  const getHeaderStyle = () => {
    const base = "text-black font-bold text-right";
    switch (invoice.customization.headerStyle) {
      case "modern":
        return `${base} text-3xl tracking-wide`;
      case "minimal":
        return `${base} text-2xl font-medium`;
      default:
        return `${base} text-3xl`;
    }
  };

  return (
    <div className="lg:col-span-3">
      <div
        ref={invoiceRefElement}
        className="invoice-content bg-white shadow-lg print:shadow-none print:!m-0 print:!p-0"
        data-invoice-number={invoice.invoiceNumber || "draft"}
        style={{
          fontFamily: invoice.customization.font,
          padding: getMarginStyle(),
          ...getPageSizeStyle(),
        }}
      >
        <style jsx>{`
          .invoice-content {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          .invoice-content * {
            color: inherit !important;
          }
          .invoice-content .text-gray-700 {
            color: #374151 !important;
          }
          .invoice-content .text-gray-600 {
            color: #4b5563 !important;
          }
          .invoice-content .bg-gray-100 {
            background-color: #f3f4f6 !important;
          }
          .invoice-content .bg-gray-200 {
            background-color: #e5e7eb !important;
          }
          .invoice-content .bg-gray-50 {
            background-color: #f9fafb !important;
          }
          .invoice-content .border-gray-300 {
            border-color: #d1d5db !important;
          }
          .invoice-content .border-gray-400 {
            border-color: #9ca3af !important;
          }
          .invoice-content .border-black {
            border-color: #000000 !important;
          }
          @media print {
            .invoice-content {
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .print-optimize {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            .print-compact {
              margin-bottom: 0.25rem !important;
            }
            table {
              page-break-inside: avoid;
            }
            @page {
              margin: 15mm;
              size: A4;
            }
          }
        `}</style>
        <div className={`${getLayoutSpacing()} print-optimize`}>
          {/* Professional Header with Invoice Details */}
          <div className="border-b-2 border-black pb-1 mb-2">
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1">
                {invoice.businessDetails.logo && (
                  <img
                    src={invoice.businessDetails.logo}
                    alt="Company Logo"
                    className={`object-contain ${getLogoSize()}`}
                  />
                )}
              </div>
              <div className="text-right">
                <h1 className={getHeaderStyle()}>INVOICE</h1>
                {invoice.invoiceNumber && (
                  <p className="text-base font-medium text-gray-700 mt-1">
                    #{invoice.invoiceNumber}
                  </p>
                )}
              </div>
            </div>
            {/* Horizontal Invoice Details Table */}
            <table className="w-full border-collapse border border-gray-400 text-xs">
              <tr>
                <td className="border border-gray-400 px-1 py-0.5 font-semibold bg-gray-100 text-center">
                  Date
                </td>
                <td className="border border-gray-400 px-1 py-0.5 font-semibold bg-gray-100 text-center">
                  Due Date
                </td>
                <td className="border border-gray-400 px-1 py-0.5 font-semibold bg-gray-100 text-center">
                  Currency
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-1 py-0.5 text-center">
                  {invoice.invoiceDate || "Not specified"}
                </td>
                <td className="border border-gray-400 px-1 py-0.5 text-center">
                  {invoice.dueDate || "Not specified"}
                </td>
                <td className="border border-gray-400 px-1 py-0.5 text-center">
                  {invoice.currency}
                </td>
              </tr>
            </table>
          </div>

          {/* Business and Customer Details Side by Side */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {/* Business Details Section */}
            <div>
              <h3 className="font-semibold text-xs mb-1 text-black border-b border-gray-300 pb-1">
                From (Business Details)
              </h3>
              <table className="w-full border-collapse border border-gray-400">
                <tbody>
                  {invoice.businessDetails.name && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 w-1/3 text-xs">
                        Name
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.businessDetails.name}
                      </td>
                    </tr>
                  )}
                  {invoice.businessDetails.address && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        Address
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 whitespace-pre-line text-xs">
                        {invoice.businessDetails.address}
                      </td>
                    </tr>
                  )}
                  {invoice.businessDetails.phone && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        Phone
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.businessDetails.phone}
                      </td>
                    </tr>
                  )}
                  {invoice.businessDetails.email && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        Email
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.businessDetails.email}
                      </td>
                    </tr>
                  )}
                  {invoice.businessDetails.gstin && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        GSTIN/UIN
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.businessDetails.gstin}
                      </td>
                    </tr>
                  )}
                  {(invoice.businessDetails.stateName ||
                    invoice.businessDetails.stateCode) && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        State
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.businessDetails.stateName}{" "}
                        {invoice.businessDetails.stateCode &&
                          `(${invoice.businessDetails.stateCode})`}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Customer/Bill To Details Section */}
            <div>
              <h3 className="font-semibold text-xs mb-1 text-black border-b border-gray-300 pb-1">
                Bill To (Customer Details)
              </h3>
              <table className="w-full border-collapse border border-gray-400">
                <tbody>
                  {invoice.clientDetails.name && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 w-1/3 text-xs">
                        Name
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.clientDetails.name}
                      </td>
                    </tr>
                  )}
                  {invoice.clientDetails.address && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        Address
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 whitespace-pre-line text-xs">
                        {invoice.clientDetails.address}
                      </td>
                    </tr>
                  )}
                  {invoice.clientDetails.phone && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        Phone
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.clientDetails.phone}
                      </td>
                    </tr>
                  )}
                  {invoice.clientDetails.email && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        Email
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.clientDetails.email}
                      </td>
                    </tr>
                  )}
                  {invoice.clientDetails.gstin && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        GSTIN/UIN
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.clientDetails.gstin}
                      </td>
                    </tr>
                  )}
                  {(invoice.clientDetails.stateName ||
                    invoice.clientDetails.stateCode) && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                        State
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {invoice.clientDetails.stateName}{" "}
                        {invoice.clientDetails.stateCode &&
                          `(${invoice.clientDetails.stateCode})`}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ship To Details Section (if different from billing) */}
          {!invoice.clientDetails.shipToSameAsBilling &&
            (invoice.clientDetails.shipToName ||
              invoice.clientDetails.shipToAddress ||
              invoice.clientDetails.shipToPhone ||
              invoice.clientDetails.shipToEmail) && (
              <div className="mb-2">
                <h3 className="font-semibold text-xs mb-1 text-black border-b border-gray-300 pb-1">
                  Ship To
                </h3>
                <table className="w-full border-collapse border border-gray-400">
                  <tbody>
                    {invoice.clientDetails.shipToName && (
                      <tr>
                        <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 w-1/4 text-xs">
                          Name
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 text-xs">
                          {invoice.clientDetails.shipToName}
                        </td>
                      </tr>
                    )}
                    {invoice.clientDetails.shipToAddress && (
                      <tr>
                        <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                          Address
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 whitespace-pre-line text-xs">
                          {invoice.clientDetails.shipToAddress}
                        </td>
                      </tr>
                    )}
                    {invoice.clientDetails.shipToPhone && (
                      <tr>
                        <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                          Phone
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 text-xs">
                          {invoice.clientDetails.shipToPhone}
                        </td>
                      </tr>
                    )}
                    {invoice.clientDetails.shipToEmail && (
                      <tr>
                        <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                          Email
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 text-xs">
                          {invoice.clientDetails.shipToEmail}
                        </td>
                      </tr>
                    )}
                    {invoice.clientDetails.shipToGstin && (
                      <tr>
                        <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                          GSTIN/UIN
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 text-xs">
                          {invoice.clientDetails.shipToGstin}
                        </td>
                      </tr>
                    )}
                    {(invoice.clientDetails.shipToStateName ||
                      invoice.clientDetails.shipToStateCode) && (
                      <tr>
                        <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-xs">
                          State
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 text-xs">
                          {invoice.clientDetails.shipToStateName}{" "}
                          {invoice.clientDetails.shipToStateCode &&
                            `(${invoice.clientDetails.shipToStateCode})`}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

          {/* Items Table */}
          <div>
            <h3 className="font-semibold text-xs mb-1 text-black border-b border-gray-300 pb-1">
              Items & Services
            </h3>
            <table className="w-full border-collapse border border-gray-400 mb-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-1 py-1 text-left font-semibold text-xs">
                    Description
                  </th>
                  {isIndianInvoice && (
                    <th className="border border-gray-400 px-1 py-1 text-center font-semibold text-xs">
                      HSN/SAC
                    </th>
                  )}
                  <th className="border border-gray-400 px-1 py-1 text-center font-semibold text-xs">
                    Qty
                  </th>
                  <th className="border border-gray-400 px-1 py-1 text-right font-semibold text-xs">
                    Unit Price
                  </th>
                  <th className="border border-gray-400 px-1 py-1 text-center font-semibold text-xs">
                    {isIndianInvoice ? "GST %" : "Tax %"}
                  </th>
                  <th className="border border-gray-400 px-1 py-1 text-right font-semibold text-xs">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => {
                  const itemTotal = item.quantity * item.unitPrice;
                  const itemTax = itemTotal * (item.taxRate / 100);
                  const itemGrandTotal = itemTotal + itemTax;

                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-400 px-1 py-0.5 text-xs">
                        {item.description || "No description"}
                      </td>
                      {isIndianInvoice && (
                        <td className="border border-gray-400 px-1 py-0.5 text-center text-xs">
                          {item.hsn || "-"}
                        </td>
                      )}
                      <td className="border border-gray-400 px-1 py-0.5 text-center text-xs">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-right text-xs">
                        {getCurrencySymbol()}
                        {item.unitPrice.toFixed(2)}
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-center text-xs">
                        {item.taxRate}%
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-right font-medium text-xs">
                        {getCurrencySymbol()}
                        {itemGrandTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tax Summary and Breakdown */}
          <div className="flex justify-end gap-2">
            {/* Tax Rate Breakdown Table */}
            {getTaxRateBreakdown().length > 0 && (
              <div className="w-1/3">
                <h3 className="font-semibold text-xs mb-1 text-black border-b border-gray-300 pb-1">
                  Tax Rate Breakdown
                </h3>
                <table className="w-full border-collapse border border-gray-400 mb-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 px-1 py-0.5 text-center font-semibold text-xs">
                        {isIndianInvoice ? "GST %" : "Tax %"}
                      </th>
                      <th className="border border-gray-400 px-1 py-0.5 text-center font-semibold text-xs">
                        Items
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTaxRateBreakdown().map(({ rate, count }) => (
                      <tr key={rate}>
                        <td className="border border-gray-400 px-1 py-0.5 text-center text-xs">
                          {rate}%
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 text-center text-xs">
                          {count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Summary */}
            <div className="w-1/2">
              <h3 className="font-semibold text-xs mb-1 text-black border-b border-gray-300 pb-1">
                Summary
              </h3>
              <table className="w-full border-collapse border border-gray-400 mb-2">
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-right text-xs">
                      Subtotal:
                    </td>
                    <td className="border border-gray-400 px-1 py-0.5 text-right text-xs">
                      {getCurrencySymbol()}
                      {subtotal.toFixed(2)}
                    </td>
                  </tr>
                  {isIndianInvoice && totalCGST > 0 && (
                    <>
                      <tr>
                        <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-right text-xs">
                          CGST:
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 text-right text-xs">
                          {getCurrencySymbol()}
                          {totalCGST.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-right text-xs">
                          SGST:
                        </td>
                        <td className="border border-gray-400 px-1 py-0.5 text-right text-xs">
                          {getCurrencySymbol()}
                          {totalSGST.toFixed(2)}
                        </td>
                      </tr>
                    </>
                  )}
                  {!isIndianInvoice && totalTax > 0 && (
                    <tr>
                      <td className="border border-gray-400 px-1 py-0.5 font-medium bg-gray-100 text-right text-xs">
                        Tax:
                      </td>
                      <td className="border border-gray-400 px-1 py-0.5 text-right text-xs">
                        {getCurrencySymbol()}
                        {totalTax.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-gray-200">
                    <td className="border border-gray-400 px-1 py-0.5 font-bold text-right text-sm">
                      Total:
                    </td>
                    <td className="border border-gray-400 px-1 py-0.5 text-right font-bold text-sm">
                      {getCurrencySymbol()}
                      {grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes Section */}
          {invoice.notes && (
            <div>
              <h3 className="font-semibold text-xs mb-1 text-black border-b border-gray-300 pb-1">
                Notes
              </h3>
              <div className="border border-gray-400 p-1 bg-gray-50 mb-2">
                <p className="whitespace-pre-line text-xs">{invoice.notes}</p>
              </div>
            </div>
          )}

          {/* Authorized Signatory */}
          {(invoice.authorizedSignatory.name ||
            invoice.authorizedSignatory.signature) && (
            <div className="mt-3">
              <h3 className="font-semibold text-xs mb-1 text-black border-b border-gray-300 pb-1">
                Authorized Signatory
              </h3>
              <div className="flex justify-end">
                <div className="text-right">
                  {invoice.authorizedSignatory.signature && (
                    <div className="mb-2">
                      <img
                        src={invoice.authorizedSignatory.signature}
                        alt="Signature"
                        className="max-h-12 max-w-24 object-contain border border-gray-300"
                      />
                    </div>
                  )}
                  {invoice.authorizedSignatory.name && (
                    <div className="border-t border-black pt-1">
                      <p className="font-medium text-xs">
                        {invoice.authorizedSignatory.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Authorized Signatory
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Professional Footer */}
          <div className="mt-3 pt-1 border-t border-gray-300 text-center text-xs text-gray-600">
            <p>
              This is a computer-generated invoice and does not require a
              physical signature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceRef;
