interface SectionProps {
  children: React.ReactNode;
  bg?: "primary" | "secondary";
  className?: string;
  id?: string;
}

const bgStyles = {
  primary: "bg-bg-primary",
  secondary: "bg-bg-secondary",
};

export function Section({
  children,
  bg = "primary",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 lg:py-40 ${bgStyles[bg]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}
