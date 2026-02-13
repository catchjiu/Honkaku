"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  as?: "section" | "div";
};

const sizeStyles = {
  default: "py-24 md:py-32 lg:py-40",
  narrow: "py-20 md:py-28 lg:py-36",
  wide: "py-32 md:py-40 lg:py-48",
};

/**
 * Consistent section spacing. Negative space breathes.
 */
export function Section({
  children,
  className = "",
  size = "default",
  as: Component = "section",
}: Props) {
  return (
    <Component className={`${sizeStyles[size]} ${className}`}>
      {children}
    </Component>
  );
}
