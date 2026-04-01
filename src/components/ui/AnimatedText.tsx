"use client";

import { useEffect, useRef, useState } from "react";

type AnimationType = "words" | "lines" | "chars";

interface AnimatedTextProps {
  text: string;
  animation?: AnimationType;
  delay?: number;
  stagger?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function AnimatedText({
  text,
  animation = "words",
  delay = 0,
  stagger = 0.05,
  className = "",
  as: Tag = "p",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const splitText = () => {
    switch (animation) {
      case "chars":
        return text.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-all duration-500 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${delay + i * stagger}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ));
      case "lines":
        return text.split("\n").map((line, i) => (
          <span
            key={i}
            className="block overflow-hidden"
          >
            <span
              className="block transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(100%)",
                transitionDelay: `${delay + i * (stagger * 3)}s`,
              }}
            >
              {line}
            </span>
          </span>
        ));
      case "words":
      default:
        return text.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <span
              className="inline-block transition-all duration-500 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(100%)",
                transitionDelay: `${delay + i * stagger}s`,
              }}
            >
              {word}
            </span>
          </span>
        ));
    }
  };

  return (
    <div ref={containerRef}>
      <Tag className={className}>{splitText()}</Tag>
    </div>
  );
}
