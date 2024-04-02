"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { IoAddCircleOutline, IoChatboxEllipsesOutline, IoChevronDown, IoFileTrayFullOutline, IoHomeOutline, IoPeopleOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import SidebarContext from "../Layouts/SidebarContext";
import SidebarLinkGroup from "./SidebarLinkGroup";
import SidebarNavLink from "./SidebarNavLink";
import SidebarNavLinkGroup from "./SidebarNavLinkGroup";

const Sidebar = () => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)

  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image width={176} height={32} src={"/images/logo/logo.svg"} alt="Logo" priority />
        </Link>

        <button ref={trigger} onClick={() => setSidebarOpen(!sidebarOpen)} title="Toggle Sidebar" className="block lg:hidden">
          <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <SidebarNavLink href="/dashboard" active={pathname.includes("dashboard")}>
                  <IoHomeOutline size={20} />
                  Dashboard
                </SidebarNavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Pengaturan Event --> */}
              <SidebarLinkGroup activeCondition={pathname.includes("event") || pathname.includes("category")}>
                {(handleClick, open) => {
                  return (
                    <>
                      <SidebarNavLink
                        href="#"
                        active={pathname.includes("event") || pathname.includes("category")}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <IoAddCircleOutline size={20} />
                        Pengaturan Event
                        <IoChevronDown size={20} strokeWidth={1.5} className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && "rotate-180"}`} />
                      </SidebarNavLink>
                      {/* Dropdown Menu Start */}
                      <div className={`translate transform overflow-hidden ${!open && "hidden"}`}>
                        <ul className="mb-[1.375rem] mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarNavLinkGroup href="/event" active={pathname === "/event"}>
                              Event
                            </SidebarNavLinkGroup>
                          </li>
                          <li>
                            <SidebarNavLinkGroup href="/category" active={pathname === "/category"}>
                              Event Kategori
                            </SidebarNavLinkGroup>
                          </li>
                        </ul>
                      </div>
                      {/* Dropdown Menu End*/}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Peserta --> */}
              <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <IoPeopleOutline />
                  Peserta
                </Link>
              </li>
              {/* <!-- Menu Item Peserta --> */}

              {/* <!-- Menu Item Peserta Offline --> */}
              <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <IoPeopleOutline />
                  Peserta Offline
                </Link>
              </li>
              {/* <!-- Menu Item Peserta Offline --> */}

              {/* <!-- Menu Item Data User --> */}
              <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <IoPersonOutline />
                  Data User
                </Link>
              </li>
              {/* <!-- Menu Item Data User --> */}

              {/* <!-- Menu Item Penukaran BIB --> */}
              <li>
                <Link href="/" className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                  <svg className="fill-current" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_130_9756)">
                      <path
                        d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9756">
                        <rect width="18" height="18" fill="white" transform="translate(0 0.052124)" />
                      </clipPath>
                    </defs>
                  </svg>
                  Penukaran BIB
                </Link>
              </li>
              {/* <!-- Menu Item Penukaran BIB --> */}

              {/* <!-- Menu Item Sponsor --> */}
              <li>
                <Link
                  href="/sponsor"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("sponsor") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <IoFileTrayFullOutline />
                  Sponsor
                </Link>
              </li>
              {/* <!-- Menu Item Sponsor --> */}

              {/* <!-- Menu Item FAQ --> */}
              <li>
                <SidebarNavLink href="/faq" active={pathname.includes("faq")}>
                  <IoChatboxEllipsesOutline size={20} />
                  FAQ
                </SidebarNavLink>
              </li>
              {/* <!-- Menu Item FAQ --> */}

              {/* <!-- Menu Item Pengaturan --> */}
              <li>
                <Link
                  href="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("settings") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <IoSettingsOutline />
                  Pengaturan
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
