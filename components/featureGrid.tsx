import React from "react";
import { Zap, Users, Download, FileText, Shield, Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    icon: <Zap className="h-10 w-10 text-blue-600" />,
    title: "Lightning Fast",
    description:
      "Create professional invoices in under 5 minutes with our intuitive interface",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Users className="h-10 w-10 text-indigo-600" />,
    title: "No Sign-up Needed",
    description:
      "Start creating immediately. No accounts, no passwords, no hassle whatsoever",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Download className="h-10 w-10 text-purple-600" />,
    title: "Instant Download",
    description:
      "Download high-quality PDFs or print directly from your browser",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <FileText className="h-10 w-10 text-cyan-600" />,
    title: "Fully Customizable",
    description:
      "Add your logo, choose colors, and customize layouts to match your brand",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: <Shield className="h-10 w-10 text-green-600" />,
    title: "Secure & Private",
    description:
      "Your data stays in your browser. We don't store any personal information",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <Clock className="h-10 w-10 text-orange-600" />,
    title: "Always Available",
    description:
      "Access our tool 24/7 from any device. No downtime, no maintenance breaks",
    gradient: "from-orange-500 to-red-500",
  },
];

const FeatureGrid: React.FC = () => (
  <div className="mt-24 mb-16">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why Choose{" "}
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          OpenInvo
        </span>
        ?
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Everything you need to create professional invoices, without the
        complexity
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, idx) => (
        <Card
          key={idx}
          className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          ></div>

          <CardHeader className="text-center pb-4 relative z-10">
            <div
              className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
            >
              {React.cloneElement(feature.icon, {
                className: "h-8 w-8 text-white",
              })}
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center relative z-10">
            <CardDescription className="text-gray-600 leading-relaxed">
              {feature.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default FeatureGrid;
