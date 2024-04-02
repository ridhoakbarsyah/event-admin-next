"use server";

import { prisma } from "@/lib/prisma";
import faqSchema from "@/lib/schema-validations/faqSchema";

export async function updateFaq(id: number, prevState: any, formData: FormData) {
  const validatedFields = faqSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.faq.update({
      data: {
        question: validatedFields.data.question,
        questionEn: validatedFields.data.question_en,
        answer: validatedFields.data.answer,
        answerEn: validatedFields.data.answer_en,
      },
      where: { id },
    });
    return { status: "success", message: "Faq updated successfully" };
  } catch (error) {
    console.error("Failed to update faq:", error);
    return { status: "error", message: "Failed to update Faq" };
  }
}
