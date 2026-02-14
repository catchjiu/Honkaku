"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = [
  "PENDING",
  "APPROVED",
  "SCHEDULED",
  "COMPLETED",
  "WAITLISTED",
  "DECLINED",
  "CANCELLED",
] as const;

export async function updateBookingStatus(
  id: string,
  status: (typeof VALID_STATUSES)[number]
): Promise<{ error?: string }> {
  if (!VALID_STATUSES.includes(status)) {
    return { error: "Invalid status" };
  }

  try {
    await prisma.bookingRequest.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/bookings");
    return {};
  } catch (err) {
    console.error("[Bookings] Update status failed:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to update status",
    };
  }
}

export async function deleteBooking(id: string): Promise<{ error?: string }> {
  try {
    await prisma.bookingRequest.delete({
      where: { id },
    });
    revalidatePath("/admin/bookings");
    return {};
  } catch (err) {
    console.error("[Bookings] Delete failed:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to delete booking",
    };
  }
}
