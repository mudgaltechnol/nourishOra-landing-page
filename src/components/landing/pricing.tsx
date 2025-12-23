import { IndianRupee } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-[#EADECF] py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-4xl px-4 text-center text-zinc-900">
        <div className="mb-8">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className="flex items-baseline">
            <IndianRupee className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />
            <span className="font-headline text-5xl font-bold sm:text-6xl md:text-7xl">
              125 – 180
            </span>
          </div>
          <span className="ml-3 text-lg font-medium text-zinc-700">/ meal</span>
        </div>

        <p className="mx-auto max-w-2xl text-lg text-zinc-600">
          Pricing varies slightly based on the meal type — with everyday meals
          at the lower end and premium dishes priced a bit higher.
        </p>

        <p className="mx-auto mt-4 max-w-xl text-base font-semibold text-primary">
          Subscription plans will bring the average cost down even further.
        </p>

        <div className="mt-8 text-sm text-zinc-500">
          <p>Final pricing will be shared at launch.</p>
        </div>
      </div>
    </section>
  );
}
