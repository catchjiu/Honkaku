"use client";

import { SectionLabel, SectionTitle } from "@/components/ui";
import { FadeInUp } from "@/components/ui/motion";

export function GalleryHeader() {
  return (
    <FadeInUp>
      <SectionLabel>Portfolio</SectionLabel>
      <SectionTitle as="h1" className="mt-3">
        Gallery
      </SectionTitle>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground-muted">
        Browse our portfolio of tattoo artistry. Click any image to view in
        full.
      </p>
    </FadeInUp>
  );
}
