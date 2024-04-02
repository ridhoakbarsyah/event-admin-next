"use server";

import { prisma } from "@/lib/prisma";
import faqSchema from "@/lib/schema-validations/faqSchema";

export async function createFaq(prevState: any, formData: FormData) {
  const validatedFields = faqSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.faq.create({
      data: {
        question: validatedFields.data.question,
        questionEn: validatedFields.data.question_en,
        answer: validatedFields.data.answer,
        answerEn: validatedFields.data.answer_en,
      },
    });
    return { status: "success", message: "Faq created successfully" };
  } catch (error) {
    console.error("Failed to create faq:", error);
    return { status: "error", message: "Failed to delete faq" };
  }
}
