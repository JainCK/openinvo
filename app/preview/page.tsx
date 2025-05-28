"use client";
import React from "react";
import CustomizationTab from "@/components/previewComponents/customization";
import ActButton from "@/components/previewComponents/actBtn";
import InvoiceRef from "@/components/previewComponents/invoiceRef";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 print:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 print:hidden">
            <div className="sticky top-8 space-y-6">
              <CustomizationTab />
              <ActButton />
            </div>
          </div>
          <InvoiceRef />
        </div>
      </div>
    </div>
  );
}
