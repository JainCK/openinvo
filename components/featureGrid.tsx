import React from "react";
import { Zap, Users, Download, FileText } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    icon: <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
    title: "Quick & Easy",
    description:
      "Create professional invoices in under 5 minutes with our intuitive form",
  },
  {
    icon: <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
    title: "No Sign-up Needed",
    description:
      "Start creating immediately. No accounts, no passwords, no hassle",
  },
  {
    icon: <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
    title: "Printable PDF",
    description: "Download or Print directly from your browser",
  },
  {
    icon: <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />,
    title: "Customizable",
    description:
      "Add your logo, choose colors, and customize the layout to match your brand",
  },
];

const FeatureGrid: React.FC = () => (
  <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
    {features.map((feature, idx) => (
      <Card className="text-center" key={idx}>
        <CardHeader>
          {feature.icon}
          <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{feature.description}</CardDescription>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default FeatureGrid;
