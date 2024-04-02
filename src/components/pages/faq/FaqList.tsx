import { getFaq } from "@/lib/actions/faq/getFaq";
import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import DeleteFaq from "./Delete";

export default async function FaqList() {
  const faq = await getFaq();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="dark:text-white">No</TableCell>
            <TableCell className="dark:text-white">Question</TableCell>
            <TableCell className="dark:text-white">Answer</TableCell>
            <TableCell className="dark:text-white" align="center">
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(faq) &&
            faq.map((faq, index) => (
              <TableRow key={faq.id}>
                <TableCell className="dark:text-white">{index + 1}</TableCell>
                <TableCell className="dark:text-white">{faq.question}</TableCell>
                <TableCell className="dark:text-white">{faq.answer}</TableCell>
                <TableCell>
                  <div className="flex gap-x-3 justify-center">
                    <Link href={`/faq/edit/${faq.id}`}>
                      <Button className="bg-blue-700" variant="contained" color="primary" endIcon={<FaRegEdit />}>
                        Edit
                      </Button>
                    </Link>
                    {/* Delete */}
                    <DeleteFaq id={Number(faq.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
