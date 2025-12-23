'use client';

import * as React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="text-sm font-medium uppercase tracking-wider text-zinc-600 transition-colors hover:text-zinc-900"

  >
    {children}
  </a>
);


export default function Header() {
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#F9FAF8]">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <a href="#home" className="flex items-center gap-2">
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
        </a>

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
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-black" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="grid gap-6 p-6">
                <a href="#home" className="flex items-center gap-2">
                   <Image
                    src="/logo.png"
                    alt="NourishOra Logo"
                    width={140}
                    height={140}
                    className="rounded-full"
                  />
                </a>
                <nav className="grid gap-4">                 
                  <NavLink href="#home" onClick={() => setIsSheetOpen(false)}>Home</NavLink>
                  <NavLink href="#about" onClick={() => setIsSheetOpen(false)}>About Us</NavLink>
                  <NavLink href="#why-us" onClick={() => setIsSheetOpen(false)}>Why Choose Us</NavLink>
                </nav>
                <a href="#waitlist" onClick={() => setIsSheetOpen(false)}>
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
