import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";

const MainLayout = () => {
  // backgrund state initialized for when the user will be able to select their own backgrounds. The initial state is blue
  const [background, setBackground] = useState("#84d5f5");

  return (
    <div
      className="relative"
      style={{
        background: `${background} center / cover`,
      }}
    >
      <TopBar />
      <div className="flex">
        <div className="flex-shrink bg-black bg-opacity-40 dark:bg-opacity-70 ">
          <SideBar />
        </div>
        <div className="w-full bg-black bg-opacity-0 dark:bg-opacity-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
