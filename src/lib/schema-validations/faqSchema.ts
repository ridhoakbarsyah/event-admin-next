import { z } from "zod";

const faqSchema = z.object({
  question: z.string().min(3, "question harus lebih dari 3 karakter"),
  question_en: z.string().min(3, "question_en harus lebih dari 3 karakter"),
  answer: z.string().min(3, "answer harus lebih dari 3 karakter"),
  answer_en: z.string().min(3, "answer_en harus lebih dari 3 karakter"),
});

export default faqSchema;
