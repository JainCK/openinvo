import { Button } from "@/components/ui/button";
import FeatureGrid from "@/components/featureGrid";
import CtaSection from "@/components/ctaSection";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Circle */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-300/20 rounded-full blur-3xl"></div>
        {/* Medium Circle */}
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-br from-cyan-200/25 to-blue-300/15 rounded-full blur-2xl"></div>
        {/* Small Circles */}
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-300/10 rounded-full blur-xl"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rotate-45 rounded-sm"></div>
        <div className="absolute top-3/4 right-1/3 w-6 h-6 bg-indigo-400/25 rotate-12 rounded-sm"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-cyan-400/35 rotate-45 rounded-full"></div>

        {/* Floating Lines */}
        <svg
          className="absolute top-1/3 right-1/4 w-24 h-24 text-blue-300/20"
          viewBox="0 0 100 100"
        >
          <path
            d="M20,20 Q50,5 80,20 T80,80"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <svg
          className="absolute bottom-1/4 left-1/4 w-32 h-32 text-indigo-300/15"
          viewBox="0 0 100 100"
        >
          <path
            d="M10,50 Q30,10 50,50 T90,50"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100/80 text-blue-800 backdrop-blur-sm border border-blue-200/50">
              ✨ Free Invoice Generator
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Effortless Invoice
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Generation
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700">
              for Local Businesses
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Create professional invoices in minutes. No account needed, no
            complex setup.
            <br className="hidden md:block" />
            Just clean, customizable invoices ready to print or share.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/create">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <TypingAnimation className="text-white font-semibold">
                  Start Generating Invoices
                </TypingAnimation>
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-16">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No Sign-up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Instant Download</span>
            </div>
          </div>
        </div>

        <FeatureGrid />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
