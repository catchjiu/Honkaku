import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { ArtistDetailContent } from "@/components/artists/ArtistDetailContent";

export default async function ArtistGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const artist = await prisma.artist.findFirst({
    where: { slug, status: { not: "INACTIVE" } },
    include: {
      portfolioImages: {
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!artist) notFound();

  const artworks = artist.portfolioImages.map((img) => ({
    id: img.id,
    title: img.title ?? img.altText,
    image_url: img.url,
    tags: img.tags,
  }));

  return (
    <ArtistDetailContent
      artist={{
        name: artist.name,
        slug: artist.slug,
        specialty: artist.specialty,
        avatarUrl: artist.avatarUrl,
        instagramUrl: artist.instagramUrl,
      }}
      artworks={artworks}
    />
  );
}
