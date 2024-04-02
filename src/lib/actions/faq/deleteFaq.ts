"use server";

import { prisma } from "@/lib/prisma";

export async function deleteFaq(id: number) {
  try {
    const faq = await prisma.faq.count({
      where: {
        id,
      },
    });

    if (faq < 0) return { status: "error", message: "Cant delete, faq" };

    await prisma.faq.delete({
      where: {
        id,
      },
    });
    return { status: "success", message: "Faq deleted successfully" };
  } catch (error) {
    console.error("Failed to delete faq:", error);
    return { status: "error", message: "Failed to delete faq" };
  }
}
