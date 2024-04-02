import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoChevronDown, IoLogOutOutline, IoPersonOutline } from "react-icons/io5";

const DropdownUser = () => {
  const { data: session } = useSession()

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {session?.user.name}
          </span>
          <span className="block text-xs">{session?.user.role}</span>
        </span>

        <span className="size-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/user/avatar.jpg"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
            className="rounded-full"
          />
        </span>

        <IoChevronDown />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <IoPersonOutline size={22} />
              My Profile
            </Link>
          </li>
        </ul>
        <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
          <IoLogOutOutline size={22} />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
