import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { QuickAddSheet } from "./QuickAddSheet";

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="flex-1 overflow-y-auto relative">
        <Outlet />
      </div>

      {/* Premium Tab Bar */}
      <div className="shrink-0 relative" style={{ backgroundColor: "#FFFFFF" }}>
        {/* Soft top edge */}
        <div className="absolute -top-6 left-0 right-0 h-6 pointer-events-none" style={{ background: "linear-gradient(to top, #FFFFFF, transparent)" }} />

        <div className="flex items-center justify-around px-3" style={{ height: 72, paddingBottom: 8 }}>
          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center gap-1"
            style={{ minWidth: 56, minHeight: 44 }}
          >
            <div className="flex items-center justify-center" style={{ width: 28, height: 28 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
                  fill={isActive("/") ? "#111111" : "none"}
                  stroke={isActive("/") ? "#111111" : "#BBBBBB"}
                  strokeWidth="1.8" strokeLinejoin="round" />
                {isActive("/") && <rect x="9" y="14" width="6" height="7" rx="1" fill="#C9A84C" />}
              </svg>
            </div>
            <span style={{ fontSize: 10, fontWeight: isActive("/") ? 700 : 500, color: isActive("/") ? "#111111" : "#BBBBBB", letterSpacing: 0.2 }}>Home</span>
          </button>

          {/* Calendar */}
          <button
            onClick={() => navigate("/calendar")}
            className="flex flex-col items-center gap-1"
            style={{ minWidth: 56, minHeight: 44 }}
          >
            <div className="flex items-center justify-center" style={{ width: 28, height: 28 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="17" rx="2"
                  fill={isActive("/calendar") ? "#111111" : "none"}
                  stroke={isActive("/calendar") ? "#111111" : "#BBBBBB"}
                  strokeWidth="1.8" />
                <line x1="3" y1="9" x2="21" y2="9" stroke={isActive("/calendar") ? "#C9A84C" : "#BBBBBB"} strokeWidth="1.8" />
                <line x1="8" y1="3" x2="8" y2="6" stroke={isActive("/calendar") ? "#C9A84C" : "#BBBBBB"} strokeWidth="1.8" strokeLinecap="round" />
                <line x1="16" y1="3" x2="16" y2="6" stroke={isActive("/calendar") ? "#C9A84C" : "#BBBBBB"} strokeWidth="1.8" strokeLinecap="round" />
                {isActive("/calendar") && <>
                  <circle cx="8" cy="13" r="1.5" fill="#C9A84C" />
                  <circle cx="12" cy="13" r="1.5" fill="#C9A84C" />
                  <circle cx="8" cy="17" r="1.5" fill="#C9A84C" />
                </>}
              </svg>
            </div>
            <span style={{ fontSize: 10, fontWeight: isActive("/calendar") ? 700 : 500, color: isActive("/calendar") ? "#111111" : "#BBBBBB", letterSpacing: 0.2 }}>Calendar</span>
          </button>

          {/* FAB — Quick Add */}
          <button
            onClick={() => setShowQuickAdd(true)}
            className="flex items-center justify-center"
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              backgroundColor: "#111111",
              boxShadow: "0 8px 24px rgba(17,17,17,0.35), 0 2px 8px rgba(201,168,76,0.15)",
              marginTop: -20,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="11" y1="4" x2="11" y2="18" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="4" y1="11" x2="18" y2="11" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Clients */}
          <button
            onClick={() => navigate("/clients")}
            className="flex flex-col items-center gap-1"
            style={{ minWidth: 56, minHeight: 44 }}
          >
            <div className="flex items-center justify-center" style={{ width: 28, height: 28 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4"
                  fill={isActive("/clients") ? "#111111" : "none"}
                  stroke={isActive("/clients") ? "#111111" : "#BBBBBB"}
                  strokeWidth="1.8" />
                <path d="M4 21c0-3.314 3.582-6 8-6s8 2.686 8 6"
                  fill={isActive("/clients") ? "#111111" : "none"}
                  stroke={isActive("/clients") ? "#111111" : "#BBBBBB"}
                  strokeWidth="1.8" strokeLinecap="round" />
                {isActive("/clients") && <circle cx="12" cy="8" r="2" fill="#C9A84C" />}
              </svg>
            </div>
            <span style={{ fontSize: 10, fontWeight: isActive("/clients") ? 700 : 500, color: isActive("/clients") ? "#111111" : "#BBBBBB", letterSpacing: 0.2 }}>Clients</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1"
            style={{ minWidth: 56, minHeight: 44 }}
          >
            <div className="flex items-center justify-center" style={{ width: 28, height: 28 }}>
              {isActive("/profile") ? (
                <div className="flex items-center justify-center rounded-full" style={{ width: 26, height: 26, backgroundColor: "#111111", border: "2px solid #C9A84C" }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#C9A84C" }}>NR</span>
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-full" style={{ width: 26, height: 26, backgroundColor: "#EBEBEB" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#999999" }}>NR</span>
                </div>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: isActive("/profile") ? 700 : 500, color: isActive("/profile") ? "#111111" : "#BBBBBB", letterSpacing: 0.2 }}>Profile</span>
          </button>
        </div>
      </div>

      <QuickAddSheet open={showQuickAdd} onClose={() => setShowQuickAdd(false)} />
    </div>
  );
}
