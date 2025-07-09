import type React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const CtaSection: React.FC = () => (
  <div className="mt-24 mb-16 relative">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 rounded-3xl blur-3xl"></div>

    <Card className="max-w-4xl mx-auto relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 backdrop-blur-sm">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 rounded-full blur-xl"></div>

      <CardHeader className="text-center pb-6 relative z-10">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200/50">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Ready to get started?
            </span>
          </div>
        </div>

        <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Create Your First Invoice
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            in Minutes, Not Hours
          </span>
        </CardTitle>

        <CardDescription className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Join thousands of businesses using our simple, powerful invoice
          generator. No credit card required, no hidden fees.
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center pb-8 relative z-10">
        {/* Benefits List */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          {[
            "100% Free Forever",
            "No Account Required",
            "Instant PDF Download",
            "Professional Templates",
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2 text-gray-700"
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/create">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <span className="mr-2">Start Creating Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-lg px-8 py-6 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 bg-transparent"
          >
            View Sample Invoice
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          ✨ Trusted by 10,000+ businesses worldwide
        </p>
      </CardContent>
    </Card>
  </div>
);

export default CtaSection;
