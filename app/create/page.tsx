/* eslint-disable */
"use client";

import React from "react";
import InvoiceDetails from "@/components/invoiceComponents/InvoDetails";
import BusinessDetails from "@/components/invoiceComponents/businessDetails";
import ClientDetails from "@/components/invoiceComponents/clientDetails";
import InvoiceItems from "@/components/invoiceComponents/invoiceItems";
import Notes from "@/components/invoiceComponents/Notes";
import AuthorizedSignatory from "@/components/invoiceComponents/authorizedSignatory";
import ActionButton from "@/components/invoiceComponents/actionBtn";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
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
