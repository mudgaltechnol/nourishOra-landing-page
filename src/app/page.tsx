import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import About from '@/components/landing/about';
import Benefits from '@/components/landing/benefits';
import Locations from '@/components/landing/locations';
import WaitlistForm from '@/components/landing/waitlist-form';
import Pricing from '@/components/landing/pricing';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Benefits />
        <Locations />
        <Pricing />
        <WaitlistForm />
      </main>
      <footer className="bg-background border-t border-border/40 text-foreground/60">
        <div className="container mx-auto max-w-7xl px-4 py-6 text-center">
          <p>&copy; {new Date().getFullYear()} Nourishora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
