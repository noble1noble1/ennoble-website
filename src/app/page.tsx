"use client";

import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Nav />
      <main className="overflow-hidden">
        <Hero />
        <Problem />
        <Services />
        <Stats />
        <Process />
        <About />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
