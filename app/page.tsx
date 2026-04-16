"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Link, BarChart3, Zap, Shield } from "lucide-react";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  if (isSignedIn) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Shorten Your Links,
            <br />
            <span className="text-blue-600 dark:text-blue-400">Track Your Success</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Create short, memorable links and gain insights into your audience with our powerful analytics dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started Free
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Our Link Shortener?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Shorten URLs instantly with our optimized infrastructure for maximum speed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit">
                  <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>
                  Track clicks, geographic data, and referral sources to understand your audience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-fit">
                  <Link className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Custom Aliases</CardTitle>
                <CardDescription>
                  Create branded short links with custom aliases that match your domain.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-red-100 dark:bg-red-900 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Enterprise-grade security with 99.9% uptime and data protection.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of users who trust our platform for their link shortening needs.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="text-lg px-8 py-3">
              Create Your Account
            </Button>
          </SignUpButton>
        </section>
      </div>
    </div>
  );
}
