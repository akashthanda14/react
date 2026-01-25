import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-foreground mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Start free. Upgrade when you're ready.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <div className="p-8 bg-card border border-border rounded-2xl">
                        <h3 className="text-2xl font-bold text-foreground mb-2">Free</h3>
                        <div className="text-4xl font-extrabold text-foreground mb-6">
                            $0<span className="text-lg font-normal text-muted-foreground">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">3 modules unlocked</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">Basic playground access</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">2 case studies</span>
                            </li>
                        </ul>
                        <Link
                            href="/onboarding"
                            className="block w-full px-6 py-3 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-card/80 transition-all text-center"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Pro Tier */}
                    <div className="p-8 bg-gradient-to-br from-blue-900/20 to-blue-600/10 border border-neon rounded-2xl relative">
                        <div className="absolute -top-3 right-8 px-3 py-1 bg-neon text-background text-sm font-semibold rounded-full">
                            Popular
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
                        <div className="text-4xl font-extrabold text-foreground mb-6">
                            $29<span className="text-lg font-normal text-muted-foreground">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">All 8 modules unlocked</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">Unlimited playground access</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">All case studies</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">Interview mode with AI feedback</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">Priority support</span>
                            </li>
                        </ul>
                        <button className="w-full px-6 py-3 bg-neon text-background font-semibold rounded-lg hover:bg-neon/90 transition-all">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
