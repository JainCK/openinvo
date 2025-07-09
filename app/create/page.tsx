"use client";
import InvoiceDetails from "@/components/invoiceComponents/InvoDetails";
import BusinessDetails from "@/components/invoiceComponents/businessDetails";
import ClientDetails from "@/components/invoiceComponents/clientDetails";
import InvoiceItems from "@/components/invoiceComponents/invoiceItems";
import Notes from "@/components/invoiceComponents/Notes";
import AuthorizedSignatory from "@/components/invoiceComponents/authorizedSignatory";
import ActionButton from "@/components/invoiceComponents/actionBtn";
import CommonHeader from "@/components/commonHeader";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <CommonHeader name="Create Invoice" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-indigo-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Fill in the details below to generate your professional invoice
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-6">
          <InvoiceDetails />
          <BusinessDetails />
          <ClientDetails />
          <InvoiceItems />
          <Notes />
          <AuthorizedSignatory />
          <ActionButton />
        </div>
      </div>
    </div>
  );
}
