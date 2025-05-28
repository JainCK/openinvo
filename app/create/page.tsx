/* eslint-disable */
"use client";

import React from "react";
import CommonHeader from "@/components/commonHeader";
import InvoiceDetails from "@/components/invoiceComponents/InvoiceDetails";
import BusinessDetails from "@/components/invoiceComponents/businessDetails";
import ClientDetails from "@/components/invoiceComponents/clientDetails";
import InvoiceItems from "@/components/invoiceComponents/invoiceItems";
import Notes from "@/components/invoiceComponents/Notes";
import ActionButton from "@/components/invoiceComponents/actionBtn";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader
        name="Create Invoice"
        backHref="/"
        backLabel="Back to Home"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <InvoiceDetails />
          <BusinessDetails />
          <ClientDetails />
          <InvoiceItems />
          <Notes />
          <ActionButton />
        </div>
      </div>
    </div>
  );
}
