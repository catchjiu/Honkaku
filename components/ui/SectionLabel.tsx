"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Uppercase subheading with refined tracking. Architectural magazine feel.
 */
export function SectionLabel({ children, className = "" }: Props) {
  return (
    <p
      className={`font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-foreground-muted ${className}`}
    >
      {children}
    </p>
  );
}
