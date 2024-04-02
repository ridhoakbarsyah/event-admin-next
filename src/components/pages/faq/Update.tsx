"use client";

import { useFormState } from "react-dom";
import type { Faq } from "@prisma/client";
import { updateFaq } from "@/lib/actions/faq/updateFaq";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AlertSnackbar } from "@/components/alert/AlertSnackbar";
import { Button } from "@mui/material";
import { FiSend } from "react-icons/fi";

export default function UpdateFaq({ faq }: { faq: Faq }) {
  const UpdateFaqWithId = updateFaq.bind(null, faq.id);

  const [state, formAction] = useFormState(UpdateFaqWithId, null);

  const router = useRouter();

  // Redirect to event page if status is true
  useEffect(() => {
    if (state?.status == "success") {
      setTimeout(() => {
        router.push("/faq");
        router.refresh();
      }, 1500);
    }
  }, [state, router]);

  return (
    <div>
      <AlertSnackbar openSnackBar={(state?.status === "success" || state?.status === "error") && true} type={state?.status === "success" ? "success" : "error"} message={state?.message as string} />

      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="question" className="block text-sm font-medium mb-4">
            Question
          </label>
          <textarea name="question" id="question" className="border border-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 h-35 text-black" defaultValue={faq.question} />
          <div id="question-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red">{state?.Error?.question}</p>
          </div>
        </div>
        {/* Wuestion En */}
        <div className="mb-5">
          <label htmlFor="question_en" className="block text-sm font-medium mb-4">
            Question En
          </label>
          <textarea name="question_en" id="question_en" className="border border-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-35 text-black" defaultValue={faq.questionEn} />
          <div id="question-en-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red">{state?.Error?.question_en}</p>
          </div>
        </div>
        {/* Answer */}
        <div className="mb-5">
          <label htmlFor="answer" className="block text-sm font-medium mb-4">
            Answer
          </label>
          <textarea name="answer" id="answer" className="border border-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-35 text-black" defaultValue={faq.answer} />
          <div id="answer-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red">{state?.Error?.answer}</p>
          </div>
        </div>
        {/* Answer En */}
        <div className="mb-5">
          <label htmlFor="answer_en" className="block text-sm font-medium mb-4">
            Answer En
          </label>
          <textarea name="answer_en" id="answer_en" className="border border-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-35 text-black" defaultValue={faq.answerEn} />
          <div id="answer-en-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red">{state?.Error?.answer_en}</p>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-4">
          <Button className="bg-green-700" variant="contained" type="submit" color="success" endIcon={<FiSend />}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
