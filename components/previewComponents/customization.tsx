import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { updateCustomization } from "@/store/invoiceSlice";
import { Palette } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

const CustomizationTab: React.FC = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.invoice);

  return (
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
  );
};

export default CustomizationTab;
