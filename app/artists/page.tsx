import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { ArtistsContent } from "@/components/artists/ArtistsContent";

export default async function ArtistsPage() {
  const artists = await prisma.artist.findMany({
    where: { status: { not: "INACTIVE" } },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <ArtistsContent
      artists={artists.map((a) => ({
        id: a.id,
        name: a.name,
        slug: a.slug,
        specialty: a.specialty,
        avatarUrl: a.avatarUrl,
        instagramUrl: a.instagramUrl,
      }))}
    />
  );
}
