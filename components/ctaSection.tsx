import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => (
  <div className="mt-20 text-center">
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          Ready to create your first invoice?
        </CardTitle>
        <CardDescription className="text-lg">
          Join thousands of businesses using our simple invoice generator
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/create">
          <Button size="lg" className="w-full sm:w-auto">
            Start Now - It's Free
          </Button>
        </Link>
      </CardContent>
    </Card>
  </div>
);

export default CtaSection;
