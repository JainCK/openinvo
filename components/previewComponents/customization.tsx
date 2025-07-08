import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { updateCustomization } from "@/store/invoiceSlice";
import { Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const fonts = [
  { name: "Arial (Sans Serif)", value: "Arial, sans-serif" },
  { name: "Times New Roman (Serif)", value: "Times New Roman, serif" },
  { name: "Georgia (Serif)", value: "Georgia, serif" },
  { name: "Helvetica (Sans Serif)", value: "Helvetica, sans-serif" },
  { name: "Calibri (Sans Serif)", value: "Calibri, sans-serif" },
];

const layouts = [
  { name: "Spacious", value: "spacious" },
  { name: "Compact", value: "compact" },
  { name: "Minimal", value: "minimal" },
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
  { name: "Small", value: "small" },
  { name: "Medium", value: "medium" },
  { name: "Large", value: "large" },
];

const headerStyles = [
  { name: "Classic", value: "classic" },
  { name: "Modern", value: "modern" },
  { name: "Minimal", value: "minimal" },
];

const CustomizationTab: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Professional Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="font-select">Font Family</Label>
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
          <Label htmlFor="layout-select">Layout Spacing</Label>
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

        <div>
          <Label htmlFor="pageSize-select">Page Size</Label>
          <select
            id="pageSize-select"
            className="w-full mt-1 p-2 border rounded-md"
            value={invoice.customization.pageSize}
            onChange={(e) =>
              dispatch(
                updateCustomization({
                  field: "pageSize",
                  value: e.target.value,
                })
              )
            }
          >
            {pageSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="margins-select">Page Margins</Label>
          <select
            id="margins-select"
            className="w-full mt-1 p-2 border rounded-md"
            value={invoice.customization.margins}
            onChange={(e) =>
              dispatch(
                updateCustomization({
                  field: "margins",
                  value: e.target.value,
                })
              )
            }
          >
            {margins.map((margin) => (
              <option key={margin.value} value={margin.value}>
                {margin.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="logoSize-select">Logo Size</Label>
          <select
            id="logoSize-select"
            className="w-full mt-1 p-2 border rounded-md"
            value={invoice.customization.logoSize}
            onChange={(e) =>
              dispatch(
                updateCustomization({
                  field: "logoSize",
                  value: e.target.value,
                })
              )
            }
          >
            {logoSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="headerStyle-select">Header Style</Label>
          <select
            id="headerStyle-select"
            className="w-full mt-1 p-2 border rounded-md"
            value={invoice.customization.headerStyle}
            onChange={(e) =>
              dispatch(
                updateCustomization({
                  field: "headerStyle",
                  value: e.target.value,
                })
              )
            }
          >
            {headerStyles.map((style) => (
              <option key={style.value} value={style.value}>
                {style.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <p className="font-medium mb-1">Professional Features:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Black & white professional design</li>
            <li>Optimized for printing and PDF export</li>
            <li>Customizable typography and spacing</li>
            <li>Multiple page size support</li>
            <li>Adjustable margins and logo sizing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomizationTab;
