"use client";

import { SectionLabel, SectionTitle } from "@/components/ui";
import { FadeInUp } from "@/components/ui/motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function GalleryHeader() {
  const { t } = useLanguage();

  return (
    <FadeInUp>
      <SectionLabel>{t("gallery.label")}</SectionLabel>
      <SectionTitle as="h1" className="mt-3">
        {t("gallery.title")}
      </SectionTitle>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-foreground-muted">
        {t("gallery.description")}
      </p>
    </FadeInUp>
  );
}
