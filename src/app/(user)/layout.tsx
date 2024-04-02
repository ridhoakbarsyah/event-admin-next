import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ReactNode } from "react";

export default function UserLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    );
}
