"use client";
import DashboardNavbar from "@/Component/Dashboard/DashboardNavbar/DashboardNavbar";
import NavBarIcon from "@/Component/Dashboard/NavBarIcon/NavBarIcon";
import SideNav from "@/Component/Dashboard/SideNav/SideNav";

const layout = ({ children }) => {
  return (
    <div className="px-4 py-2 lg:flex lg:px-0 lg:py-0 bg-gray-900 min-h-screen overflow-y-hidden">
      {/* SideNav  */}
      <div className="">
        <div className="hidden lg:block p-6 w-1/2 lg:w-72 bg-blue-200/5 lg:h-full">
          <SideNav />
        </div>
        <div className="lg:hidden text-white flex justify-center items-center mt-2">
          <NavBarIcon />
        </div>
      </div>
      <div className="flex-1 pt-5 lg:px-8 h-auto">
        <div className="">
          <div className="p-3 rounded bg-blue-200/5">
            <DashboardNavbar />
          </div>
        </div>
        {/* content  */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default layout;
