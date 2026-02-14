import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { ContactContent } from "@/components/contact/ContactContent";

export default async function ContactPage() {
  const artists = await prisma.artist.findMany({
    where: { status: { not: "INACTIVE" } },
    select: { id: true, name: true },
    orderBy: { sortOrder: "asc" },
  });

  return <ContactContent artists={artists} />;
}
