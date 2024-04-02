import { prisma } from "@/lib/prisma";

export async function getFaq() {
  try {
    const faq = await prisma.faq.findMany();
    return faq;
  } catch (error) {
    throw new Error("Failed to fetch faq data");
  }
}

export async function getFaqById(id: number) {
  try {
    const faq = await prisma.faq.findUnique({
      where: { id: Number(id) },
    });
    return faq;
  } catch (error) {
    throw new Error("Failed to fetch faq data");
  }
}
