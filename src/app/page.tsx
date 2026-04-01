import { Button } from "@/components/ui/Button";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <main className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 md:px-8 lg:px-12">
        {/* Wordmark */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-satoshi font-black text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em] text-text-primary lowercase">
            ennoble
          </h1>
        </div>

        {/* Headline */}
        <h2 className="font-satoshi font-bold text-[clamp(1.5rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-text-primary text-center max-w-3xl mb-4 md:mb-6">
          We find what&apos;s broken.
          <br />
          Then we build what&apos;s next.
        </h2>

        {/* Subheadline */}
        <p className="font-inter text-[clamp(1rem,2vw,1.25rem)] text-text-secondary text-center max-w-xl mb-10 md:mb-14">
          AI operations for businesses that make real things.
        </p>

        {/* CTA */}
        <Button href="https://calendly.com/znob" variant="primary" size="lg">
          Book a Call
        </Button>

        {/* Subtle bottom indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-8 bg-gradient-to-b from-text-tertiary/50 to-transparent" />
        </div>
      </main>
    </>
  );
}
