'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Header() {
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-sm font-medium uppercase tracking-wider text-[#1F3D2B] transition-colors hover:text-[#1F3D2B]"
    >
      {children}
    </a>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#F9FAF8]">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="NourishOra Logo"
            width={140}
            height={140}
            className="rounded-full"
          />
          <span className="font-headline text-2xl font-bold text-[#1F2D2B]">
            NourishOra
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-8 text-sm">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#why-us">Why Choose Us</NavLink>
          </nav>
          <a href="#waitlist" className={cn(buttonVariants({variant: 'secondary'}), "font-bold")}>
            Join Waitlist
          </a>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="grid gap-6 p-6">
                <Link href="/" className="flex items-center gap-2">
                   <Image
                    src="/logo.png"
                    alt="NourishOra Logo"
                    width={140}
                    height={140}
                    className="rounded-full"
                  />
                  <span className="font-headline text-xl font-semibold text-[#1F2D2B]">
                    Nourishora
                  </span>
                </Link>
                <nav className="grid gap-4">
                  <NavLink href="#home">Home</NavLink>
                  <NavLink href="#about">About Us</NavLink>
                  <NavLink href="#why-us">Why Choose Us</NavLink>
                </nav>
                <a href="#waitlist">
                  <Button className="w-full font-bold" variant="secondary">Join Waitlist</Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
