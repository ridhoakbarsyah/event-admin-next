"use client";

import { AlertSnackbar } from "@/components/alert/AlertSnackbar";
import { deleteFaq } from "@/lib/actions/faq/deleteFaq";
import { AlertColor, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import { FaRegTrashAlt } from "react-icons/fa";

export default function DeleteFaq({ id }: { id: number }) {
  const router = useRouter();

  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleDeleteFaq = async (faqId: number) => {
    const action = await deleteFaq(faqId);

    if (action.status) {
      setStatus(action.status);
      setMessage(action.message);

      setTimeout(() => {
        router.refresh();
      }, 1500);
    }
  };

  return (
    <>
      <AlertSnackbar openSnackBar={(status === "success" || status === "error") && true} type={status === "success" ? "success" : "error"} message={message as string} />

      <Button onClick={() => handleDeleteFaq(id)} className="bg-red" variant="contained" color="error" endIcon={<FaRegTrashAlt />}>
        Del
      </Button>
    </>
  );
}
