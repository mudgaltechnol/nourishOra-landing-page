import { Button, buttonVariants } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#242D28] py-6 md:py-8 lg:py-10">
       <div
        className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/bamboo-left.png')" }}
      />
      <div
        className="absolute -top-48 -right-48 h-[40rem] w-[40rem] bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/bamboo-right.png')" }}
      />

      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-primary-foreground sm:text-6xl md:text-7xl">
            Thoughtfully Cooked. Simply Delivered{' '}
            <span className="text-secondary">Every Bite</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/80 md:mx-0">
            Nourishora brings you clean, hygienic meals crafted for daily
            consumption — that keeps food simple and dependable.
          </p>
          <div className="flex justify-center md:justify-start">
             <a href="#waitlist" className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'font-bold group')}>
                Notify Me At Launch <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <div className="relative mx-auto max-w-lg">
          {heroImage && (
             <Image
                src="/f14.png"
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={600}
                height={600}
                className="rounded-lg object-cover shadow-2xl"
              />
          )}
        </div>
      </div>
    </section>
  );
}
