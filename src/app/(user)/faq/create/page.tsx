"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CreateFaq from "@/components/pages/faq/Create";

export default function Create() {
  return (
    <>
      <Breadcrumb pageName={"Tambah Faq"} />

      <CreateFaq />
    </>
  );
}
