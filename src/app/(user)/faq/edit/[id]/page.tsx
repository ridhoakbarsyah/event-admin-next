import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EditForm from "@/components/pages/faq/Update";
import { getFaqById } from "@/lib/actions/faq/getFaq";
import { notFound } from "next/navigation";

export default async function Update({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const faq = await getFaqById(id);

  if (!faq) {
    return notFound();
  }

  return (
    <>
      <Breadcrumb pageName={"Edit FAQ"} />

      <EditForm faq={faq} />
    </>
  );
}
