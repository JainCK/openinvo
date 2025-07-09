"use client";
import { useState } from "react";
import CustomizationTab from "@/components/previewComponents/customization";
import ActButton from "@/components/previewComponents/actBtn";
import InvoiceRef from "@/components/previewComponents/invoiceRef";
import CommonHeader from "@/components/commonHeader";
import { Button } from "@/components/ui/button";
import { Settings, X, Eye, Palette } from "lucide-react";

export default function PreviewPage() {
  const [showCustomization, setShowCustomization] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <CommonHeader name="Invoice Preview" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-indigo-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 print:p-0 relative z-10">
        {/* Page Header */}
        <div className="mb-8 text-center print:hidden">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Review your invoice and make any final adjustments before printing
            or sharing
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Mobile Customization Toggle Button */}
        <div className="lg:hidden mb-6 print:hidden">
          <Button
            onClick={() => setShowCustomization(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Palette className="h-4 w-4 mr-2" />
            Customize Appearance
          </Button>
        </div>

        {/* Mobile Customization Overlay */}
        {showCustomization && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 print:hidden">
            <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Customize Invoice</h2>
                </div>
                <Button
                  onClick={() => setShowCustomization(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 border border-white/30 hover:border-white/50 transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
                <CustomizationTab />

                {/* Additional Close Button at Bottom */}
                <div className="sticky bottom-0 bg-white pt-4 border-t">
                  <Button
                    onClick={() => setShowCustomization(false)}
                    variant="outline"
                    className="w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close Customization
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1 print:hidden">
            <div className="sticky top-8 space-y-6">
              <CustomizationTab />
              <ActButton />
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 print:shadow-none print:p-0 print:rounded-none">
              <InvoiceRef />
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons - Shown below invoice */}
        <div className="lg:hidden mt-8 print:hidden">
          <ActButton />
        </div>
      </div>
    </div>
  );
}
