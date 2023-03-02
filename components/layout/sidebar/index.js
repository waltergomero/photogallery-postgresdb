import React, { Fragment } from "react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  BsArrowLeftShort,
  BsChevronDown,
  BsFillImageFill,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs";
import {
  AiFillEnvironment,
  AiOutlineBarChart,
  AiOutlineFileText,
  AiOutlineLogout,
  AiOutlineMail,
} from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    { title: "Gallery", path: "/admin/gallery" },
    {
      title: "Categories",
      icon: <AiOutlineFileText />,
      path: "/admin/category",
    },
    { title: "Status", icon: <BsFillImageFill />, path: "/admin/status" },
    { title: "Users", icon: <AiOutlineBarChart />, path: "/admin/user" },
    // {
    //   title: "Services",
    //   spacing: true,
    //   icon: <AiOutlineMail />,
    //   path: "/services",
    // },
    // {
    //   title: "projects",
    //   icon: <BsReverseLayoutTextSidebarReverse />,
    //   path: "",
    //   submenu: true,
    //   submenuItems: [
    //     { title: "submenu 1", path: "/others/submenu1" },
    //     { title: "submenu 2" },
    //     { title: "submenu 3" },
    //   ],
    // },
  ];

  function handleClick() {
    setOpen(!open);
  }

  function handleSubmenuClick() {
    setSubmenuOpen(!submenuOpen);
  }

  return (
    <div
      className={`sticky top-0 bg-red-500 h-screen p-5 pt-8 ${
        open ? "w-52" : "w-20"
      } duration-300 relative `}
    >
      <BsArrowLeftShort
        className={`bg-white text-red-600 text-3xl
        rounded-full absolute -right-3 top-9 border border-red-500 cursor-pointer
        ${!open && "rotate-180"}`}
        onClick={handleClick}
      />
      <div className="inline-flex">
        <AiFillEnvironment className="bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2" />
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Photo Gallery
        </h1>
      </div>
      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <Fragment key={index}>
            <li>
              <Link
                href={`${menu.path}`}
                alt=""
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-1 hover:bg-red-600 
                            rounded-md ${menu.spacing ? "mt-9" : "mt-2"} 
                                       ${
                                         router.asPath == menu.path &&
                                         "bg-red-600 text-white"
                                       }`}
              >
                <span className="text-xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-small flex-1 duration-300 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`${submenuOpen && "rotate-180"}`}
                    onClick={handleSubmenuClick}
                  />
                )}
              </Link>
            </li>
            {menu.submenu && submenuOpen && open && (
              <ul>
                {menu.submenuItems.map((submenuItem, index) => (
                  <li key={index}>
                    <Link
                      href={`${submenuItem.path} `}
                      className={`text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-red-600 rounded-md 
                                    ${
                                      router.asPath == submenuItem.path &&
                                      "bg-red-600 text-white"
                                    }`}
                    >
                      {submenuItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Fragment>
        ))}
      </ul>
      <ul className="pt-2">
        <li className="flex rounded-md p-2 cursor-pointer hover:bg-red-600 text-gray-100 text-sm items-center gap-x-4">
          <AiOutlineLogout />
          <Link href="/" className="flex-1" onClick={() => signOut()}>
            <span
              className={` text-base font-small flex-1 duration-300 ${
                !open && "hidden "
              }`}
            >
              Log Out
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

Sidebar.auth = true;
