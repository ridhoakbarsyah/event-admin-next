import { ReactNode } from "react";
import OuterLayout from "./OuterLayout";

export default function DefaultLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <OuterLayout>
        {children}
      </OuterLayout>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
}
