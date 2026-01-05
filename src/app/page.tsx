import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Layout, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Layout className="h-6 w-6 text-primary" />
            <span>Pulsarbase</span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="container mx-auto px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                The Single Source of Truth for Your Projects
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                Eliminate client ghosting and scope creep. Pulsarbase is the premium client portal that turns your freelance business into a professional enterprise.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/dashboard">
                    Launch Console <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
          {/* Background Gradient */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto py-24 px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Why Pulsarbase?</h2>
            <p className="mt-4 text-muted-foreground">Built by freelancers, for freelancers.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Real-time Progress"
              description="Keep clients in the loop with live milestone tracking. No more 'What's the status?' emails."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Scope Protection"
              description="Formal milestone approvals ensure you get paid for the work you do. Kill scope creep instantly."
            />
            <FeatureCard
              icon={Layout}
              title="Asset Vault"
              description="A centralized library for all blueprints, designs, and recordings. Stop digging through Drive links."
            />
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Pulsarbase. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
