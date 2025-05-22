import { Button } from "@/components/ui/button";
import FeatureGrid from "@/components/featureGrid";
import CtaSection from "@/components/ctaSection";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Effortless Invoice Generation
            <span className="text-blue-600 block">for Local Businesses</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create professional invoices in minutes. No account needed, no
            complex setup. Just clean, customizable invoices ready to print or
            share.
          </p>
          <Link href="/create">
            <Button size="lg" className="text-lg px-8 py-6">
              <TypingAnimation> Start Generating Invoices</TypingAnimation>
            </Button>
          </Link>
        </div>
        <FeatureGrid />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
