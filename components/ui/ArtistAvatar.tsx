"use client";

import { useState } from "react";
import Image from "next/image";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
};

export function ArtistAvatar({
  src,
  alt,
  className = "",
  fill,
  width = 400,
  height = 500,
  sizes,
}: Props) {
  const [failed, setFailed] = useState(false);
  const usePlaceholder = !src || failed;

  if (usePlaceholder) {
    return fill ? (
      <Image
        src={PLACEHOLDER}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
      />
    ) : (
      <Image
        src={PLACEHOLDER}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
