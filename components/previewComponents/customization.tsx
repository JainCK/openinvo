"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { updateCustomization } from "@/store/invoiceSlice";
import {
  Settings,
  Type,
  Layout,
  FileText,
  ImageIcon,
  Palette,
  Info,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const fonts = [
  { name: "Arial (Sans Serif)", value: "Arial, sans-serif" },
  { name: "Times New Roman (Serif)", value: "Times New Roman, serif" },
  { name: "Georgia (Serif)", value: "Georgia, serif" },
  { name: "Helvetica (Sans Serif)", value: "Helvetica, sans-serif" },
  { name: "Calibri (Sans Serif)", value: "Calibri, sans-serif" },
];

const layouts = [
  { name: "Spacious", value: "spacious", description: "More white space" },
  { name: "Compact", value: "compact", description: "Tighter spacing" },
  { name: "Minimal", value: "minimal", description: "Clean & simple" },
];

const pageSizes = [
  { name: "A4 (210 × 297 mm)", value: "A4" },
  { name: "Letter (8.5 × 11 in)", value: "letter" },
  { name: "Legal (8.5 × 14 in)", value: "legal" },
];

const margins = [
  { name: "Normal (20mm)", value: "normal" },
  { name: "Wide (25mm)", value: "wide" },
  { name: "Narrow (15mm)", value: "narrow" },
];

const logoSizes = [
  { name: "Small", value: "small", description: "Subtle presence" },
  { name: "Medium", value: "medium", description: "Balanced size" },
  { name: "Large", value: "large", description: "Prominent display" },
];

const headerStyles = [
  { name: "Classic", value: "classic", description: "Traditional style" },
  { name: "Modern", value: "modern", description: "Contemporary look" },
  { name: "Minimal", value: "minimal", description: "Clean & simple" },
];

const CustomizationTab: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  const handleCustomizationChange = (field: string, value: string) => {
    dispatch(updateCustomization({ field, value }));
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Customize Invoice
            </CardTitle>
            <p className="text-sm text-gray-600">
              Personalize your invoice appearance
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="font-select"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <Type className="h-4 w-4 text-blue-600" />
            <span>Font Family</span>
          </Label>
          <select
            id="font-select"
            className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white"
            value={invoice.customization.font}
            onChange={(e) => handleCustomizationChange("font", e.target.value)}
          >
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="layout-select"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <Layout className="h-4 w-4 text-green-600" />
            <span>Layout Spacing</span>
          </Label>
          <select
            id="layout-select"
            className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white"
            value={invoice.customization.layout}
            onChange={(e) =>
              handleCustomizationChange("layout", e.target.value)
            }
          >
            {layouts.map((layout) => (
              <option key={layout.value} value={layout.value}>
                {layout.name} - {layout.description}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="pageSize-select"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <FileText className="h-4 w-4 text-purple-600" />
            <span>Page Size</span>
          </Label>
          <select
            id="pageSize-select"
            className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white"
            value={invoice.customization.pageSize}
            onChange={(e) =>
              handleCustomizationChange("pageSize", e.target.value)
            }
          >
            {pageSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="margins-select"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <Layout className="h-4 w-4 text-orange-600" />
            <span>Page Margins</span>
          </Label>
          <select
            id="margins-select"
            className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white"
            value={invoice.customization.margins}
            onChange={(e) =>
              handleCustomizationChange("margins", e.target.value)
            }
          >
            {margins.map((margin) => (
              <option key={margin.value} value={margin.value}>
                {margin.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="logoSize-select"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <ImageIcon className="h-4 w-4 text-indigo-600" />
            <span>Logo Size</span>
          </Label>
          <select
            id="logoSize-select"
            className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white"
            value={invoice.customization.logoSize}
            onChange={(e) =>
              handleCustomizationChange("logoSize", e.target.value)
            }
          >
            {logoSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.name} - {size.description}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="headerStyle-select"
            className="text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <Palette className="h-4 w-4 text-pink-600" />
            <span>Header Style</span>
          </Label>
          <select
            id="headerStyle-select"
            className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-white"
            value={invoice.customization.headerStyle}
            onChange={(e) =>
              handleCustomizationChange("headerStyle", e.target.value)
            }
          >
            {headerStyles.map((style) => (
              <option key={style.value} value={style.value}>
                {style.name} - {style.description}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">Professional Features:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Black & white professional design</li>
                <li>Optimized for printing and PDF export</li>
                <li>Customizable typography and spacing</li>
                <li>Multiple page size support</li>
                <li>Adjustable margins and logo sizing</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Live Preview</span>
          </div>
          <p className="text-xs text-green-700 mt-1">
            Changes are applied instantly to your invoice
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomizationTab;
