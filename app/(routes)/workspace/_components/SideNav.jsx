import Logo from "@/app/_components/Logo";
import { Bell } from "lucide-react";
import React from "react";

function SideNav() {
  return (
    <div className="h-screen fixed md:w-72 hidden md:block bg-blue-50 shadow-md">
      <div className="flex justify-between items-center p-5 ">
        <Logo />
        <Bell className="h-5 w-5 text-gray-500" />
      </div>
      <hr className="my-5" />
    </div>
  );
}

export default SideNav;
