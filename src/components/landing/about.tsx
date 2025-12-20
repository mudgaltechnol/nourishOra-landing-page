import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function About() {
  const features = [
    {
      title: 'Everyday Meals',
      imageId: 'everyday-meal',
      description:
        'Balanced roti, rice, dal, and seasonal sabzi combinations made for daily nutrition.',
    },
    {
      title: 'Light & Comfort Foods',
      imageId: 'comfort-food',
      description:
        'Simple, easy-to-digest meals that keep you energized without feeling heavy.',
    },
    {
      title: 'Weekly Specials',
      imageId: 'weekly-special',
      description:
        'Carefully planned premium or special dishes — served occasionally, not excessively.',
    },
  ];

  const chefImage = PlaceHolderImages.find((img) => img.id === 'chef-image');

  return (
    <section id="about" className="w-full bg-[#CBCCCC] text-zinc-900 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-24">
          <div className="space-y-4 text-center md:text-left">
            <div className="text-sm font-medium uppercase tracking-wider text-secondary-foreground">
              About Nourishora
            </div>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Everyday Meals, Done the Right Way
            </h2>
            <p className="max-w-[600px] text-zinc-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              At Nourishora, food is not about occasions — it's about
              consistency. We focus on preparing healthy, hygienic, homestyle
              meals using fresh ingredients and simple recipes, designed for
              everyday consumption. Our goal is to make eating well effortless,
              reliable, and something you can trust daily.
            </p>
            <a
              href="#waitlist"
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              Join the Early Access List
            </a>
          </div>
          <div className="relative h-full min-h-[400px] w-full max-w-md">
            {chefImage && (
              <Image
                src="/chef.png"
                alt={chefImage.description}
                data-ai-hint={chefImage.imageHint}
                fill
                className="rounded-lg object-cover shadow-2xl"
              />
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-12 text-center md:mt-32 md:grid-cols-3">
          {features.map((feature) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === feature.imageId
            );
            return (
              <div key={feature.title} className="flex flex-col items-center">
                {image && (
                  <Image
                    src={
                      feature.imageId === 'everyday-meal' ? '/f2.jpg' :
                      feature.imageId === 'comfort-food' ? '/f3.jpg' :
                      feature.imageId === 'weekly-special' ? '/f14.png' :
                      image.imageUrl
                    }
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    width={400}
                    height={300}
                    className="aspect-[4/3] w-full max-w-sm rounded-lg object-cover"
                  />
                )}
                <h3 className="font-headline mt-6 text-2xl font-bold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-xs text-zinc-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
