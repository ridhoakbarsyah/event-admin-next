import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FaqTable from "@/components/pages/faq/FaqList";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Faq() {
  return (
    <>
      <Breadcrumb pageName={"Tambah FAQ"} />

      <div className="flex justify-end">
        <Link href="/faq/create">
          <Button variant="outlined" className="mb-4">
            Tambah FAQ
          </Button>
        </Link>
      </div>

      <FaqTable />
    </>
  );
}
