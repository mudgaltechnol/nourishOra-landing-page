import { Clock, Leaf, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Benefits() {
  const benefits = [
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: 'Familiar, Homestyle Food',
      description:
      'Meals inspired by everyday Indian kitchens — comforting, balanced, and predictable.',
    },
    {
      icon: <Scale className="h-8 w-8 text-primary" />,
      title: 'Built for Workdays',
      description:
        'Designed around office routines, not late-night cravings or impulse orders.',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Calm, Reliable Experience',
      description:
        'No guesswork, no stress — just lunch that fits into your day.',
    },
  ];

  return (
    <section id="why-us" className="w-full bg-[#EADECF] py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm font-medium text-secondary-foreground">
            Why Nourishora
          </div>
          <h2 className="font-headline mt-2 text-3xl font-bold tracking-tighter text-zinc-900 sm:text-4xl md:text-5xl">
            More Than Just Food. It's Daily Care.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center bg-white text-zinc-900">
              <CardHeader className="items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {benefit.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-xl font-semibold">
                  {benefit.title}
                </CardTitle>
                <p className="mt-2 text-zinc-700">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
