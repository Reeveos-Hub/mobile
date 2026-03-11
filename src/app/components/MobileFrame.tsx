import React from "react";
import { Outlet } from "react-router";

export function MobileFrame() {
  return (
    <div className="fixed inset-0 flex items-center justify-center font-['Figtree'] overflow-hidden" style={{ backgroundColor: "#111111" }}>
      {/* Phone container strictly locked to 393x852 */}
      <div
        className="relative bg-white flex flex-col"
        style={{
          width: "393px",
          height: "852px",
          borderRadius: "54px",
          boxShadow: "0 0 0 12px #111111, 0 0 0 14px #333333, 0 40px 100px -10px rgba(17,17,17,0.3)",
          transform: "scale(min(1, min(100vh / 900, 100vw / 420)))",
          transformOrigin: "center center",
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-0 w-full h-[54px] z-50 pointer-events-none flex justify-center pt-3">
          <div className="w-[125px] h-[35px] bg-[#111111] rounded-[24px] shadow-inner" />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10 rounded-[54px]" style={{ backgroundColor: "#FFFFFF" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}