import React from "react";
import { Link, useLocation } from "react-router";

const C = {
  dark: "#111111",
  gold: "#C9A84C",
  muted: "#999999",
  inactive: "#CCCCCC",
  bg: "#FFFFFF",
};

export function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const items = [
    { name: "Home", path: "/", icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? C.dark : C.inactive} strokeWidth={a ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="2" fill={a ? C.dark : "none"} fillOpacity={a ? "0.12" : "0"} />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" fill={a ? C.dark : "none"} fillOpacity={a ? "0.12" : "0"} />
        <rect x="3" y="14" width="7" height="7" rx="2" />
      </svg>
    )},
    { name: "Calendar", path: "/calendar", icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? C.dark : C.inactive} strokeWidth={a ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="3" fill={a ? C.dark : "none"} fillOpacity={a ? "0.08" : "0"} />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M3 11h18" />
      </svg>
    )},
    { name: "Clients", path: "/clients", icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? C.dark : C.inactive} strokeWidth={a ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" fill={a ? C.dark : "none"} fillOpacity={a ? "0.1" : "0"} />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )},
    { name: "Menu", path: "/menu", icon: (a: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? C.dark : C.inactive} strokeWidth={a ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="16" y2="12" />
        <line x1="4" y1="17" x2="18" y2="17" />
      </svg>
    )},
  ];

  const isAIActive = isActive("/ai");

  return (
    <div className="absolute bottom-4 w-full px-4 pointer-events-none z-[100]">
      <div className="relative">
        {/* Raised center AI button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[24px] z-20 pointer-events-auto">
          <Link
            to="/ai"
            className="relative flex items-center justify-center w-[50px] h-[50px] rounded-full transition-transform duration-300 active:scale-95"
            style={{
              background: isAIActive
                ? `linear-gradient(145deg, ${C.gold}, #A88B3A)`
                : `linear-gradient(145deg, ${C.dark}, #1A1A1A)`,
              boxShadow: isAIActive
                ? `0 6px 24px rgba(201,168,76,0.4)`
                : `0 6px 20px rgba(17,17,17,0.35)`,
              border: `2px solid ${isAIActive ? C.gold : "rgba(201,168,76,0.25)"}`,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={isAIActive ? "#FFFFFF" : C.gold} strokeWidth="2" />
            </svg>
            {isAIActive && (
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
            )}
          </Link>
          <span
            className="block text-center mt-0.5"
            style={{ fontSize: 9, fontWeight: 700, color: isAIActive ? C.gold : C.inactive, letterSpacing: 0.5 }}
          >
            AI
          </span>
        </div>

        {/* Nav bar body */}
        <div
          className="rounded-[22px] h-[56px] flex items-center pointer-events-auto relative overflow-hidden"
          style={{
            backgroundColor: C.bg,
            boxShadow: "0 8px 32px -8px rgba(17,17,17,0.12), 0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          {/* Left items */}
          <div className="flex-1 flex items-center justify-evenly h-full">
            {items.slice(0, 2).map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center h-full w-[54px]"
                >
                  {item.icon(active)}
                  <span
                    className="mt-0.5"
                    style={{
                      fontSize: 9,
                      fontWeight: active ? 700 : 500,
                      color: active ? C.dark : C.inactive,
                      letterSpacing: 0.3,
                    }}
                  >
                    {item.name}
                  </span>
                  {active && (
                    <div
                      className="absolute bottom-1.5 w-1 h-1 rounded-full"
                      style={{ backgroundColor: C.gold }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Center spacer */}
          <div className="w-[60px] flex-shrink-0" />

          {/* Right items */}
          <div className="flex-1 flex items-center justify-evenly h-full">
            {items.slice(2).map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center h-full w-[54px]"
                >
                  {item.icon(active)}
                  <span
                    className="mt-0.5"
                    style={{
                      fontSize: 9,
                      fontWeight: active ? 700 : 500,
                      color: active ? C.dark : C.inactive,
                      letterSpacing: 0.3,
                    }}
                  >
                    {item.name}
                  </span>
                  {active && (
                    <div
                      className="absolute bottom-1.5 w-1 h-1 rounded-full"
                      style={{ backgroundColor: C.gold }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}