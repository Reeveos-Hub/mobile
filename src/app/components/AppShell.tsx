import React from "react";
import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function AppShell() {
  return (
    <div className="relative w-full h-full flex flex-col font-['Figtree'] overflow-hidden" style={{ backgroundColor: "#F2F2F7" }}>
      {/* Scrollable Area */}
      <div className="flex-1 w-full h-full relative overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-[72px]">
        <Outlet />
      </div>

      {/* Bottom Navigation — fixed to bottom in BottomNav component */}
      <BottomNav />
    </div>
  );
}