import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { api } from "../lib/apiClient";
import { useAuth } from "../lib/AuthContext";

const C = {
  dark: "#111111",
  gold: "#C9A84C",
  muted: "#999999",
  inactive: "#8E8E93",
  bg: "#FFFFFF",
  border: "#F0F0F0",
};

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (aiOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [aiOpen]);

  const handleAiSubmit = async () => {
    if (!aiQuery.trim() || aiLoading) return;
    setAiLoading(true);
    try {
      // Navigate to AI page with query
      navigate("/ai");
      setAiOpen(false);
      setAiQuery("");
    } finally {
      setAiLoading(false);
    }
  };

  const items = [
    { name: "Home", path: "/", icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? C.dark : C.inactive} strokeWidth={a ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="2" fill={a ? C.dark : "none"} fillOpacity={a ? "0.12" : "0"} />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" fill={a ? C.dark : "none"} fillOpacity={a ? "0.12" : "0"} />
        <rect x="3" y="14" width="7" height="7" rx="2" />
      </svg>
    )},
    { name: "Calendar", path: "/calendar", icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? C.dark : C.inactive} strokeWidth={a ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="3" fill={a ? C.dark : "none"} fillOpacity={a ? "0.08" : "0"} />
        <path d="M16 3v4" /><path d="M8 3v4" /><path d="M3 11h18" />
      </svg>
    )},
    { name: "Clients", path: "/clients", icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? C.dark : C.inactive} strokeWidth={a ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" fill={a ? C.dark : "none"} fillOpacity={a ? "0.1" : "0"} />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )},
    { name: "Menu", path: "/menu", icon: (a: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={a ? C.dark : C.inactive} strokeWidth={a ? "2" : "1.5"} strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="16" y2="12" /><line x1="4" y1="17" x2="18" y2="17" />
      </svg>
    )},
  ];

  // AI sparkle icon
  const AiIcon = ({ color = C.inactive }: { color?: string }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" />
    </svg>
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100]"
      style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}
    >
      <div
        className="flex items-center justify-between px-2"
        style={{ height: 56 }}
      >
        <AnimatePresence mode="wait">
          {aiOpen ? (
            /* ─── AI Search Mode ─── */
            <motion.div
              key="ai-input"
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.3 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center gap-2 flex-1 mx-1"
              style={{ originX: 0.5 }}
            >
              {/* Close button */}
              <button
                onClick={() => { setAiOpen(false); setAiQuery(""); }}
                className="w-9 h-9 flex items-center justify-center shrink-0 rounded-full"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>

              {/* Input field */}
              <div
                className="flex-1 flex items-center gap-2 px-4 rounded-full"
                style={{ height: 40, backgroundColor: "#F5F5F5" }}
              >
                <AiIcon color={C.gold} />
                <input
                  ref={inputRef}
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleAiSubmit(); }}
                  placeholder="Ask ReeveOS..."
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: 15, fontWeight: 500, color: C.dark, fontFamily: "'Figtree', sans-serif" }}
                />
              </div>

              {/* Send */}
              <button
                onClick={handleAiSubmit}
                className="w-9 h-9 flex items-center justify-center shrink-0 rounded-full"
                style={{ backgroundColor: aiQuery.trim() ? C.gold : "#F5F5F5" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={aiQuery.trim() ? "#FFF" : C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2L2 7l5 2 2 5z" />
                </svg>
              </button>
            </motion.div>
          ) : (
            /* ─── Normal Nav Mode ─── */
            <motion.div
              key="nav-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between flex-1"
            >
              {/* First two nav items */}
              {items.slice(0, 2).map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative flex flex-col items-center justify-center flex-1"
                    style={{ height: 56 }}
                  >
                    {item.icon(active)}
                    <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? C.dark : C.inactive, marginTop: 2, letterSpacing: 0.2 }}>
                      {item.name}
                    </span>
                    {active && <div className="absolute bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: C.gold }} />}
                  </Link>
                );
              })}

              {/* AI button — small, centered, same size as others */}
              <button
                onClick={() => setAiOpen(true)}
                className="relative flex flex-col items-center justify-center flex-1"
                style={{ height: 56 }}
              >
                <AiIcon color={isActive("/ai") ? C.gold : C.inactive} />
                <span style={{ fontSize: 10, fontWeight: isActive("/ai") ? 700 : 500, color: isActive("/ai") ? C.gold : C.inactive, marginTop: 2, letterSpacing: 0.2 }}>
                  AI
                </span>
              </button>

              {/* Last two nav items */}
              {items.slice(2).map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative flex flex-col items-center justify-center flex-1"
                    style={{ height: 56 }}
                  >
                    {item.icon(active)}
                    <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? C.dark : C.inactive, marginTop: 2, letterSpacing: 0.2 }}>
                      {item.name}
                    </span>
                    {active && <div className="absolute bottom-1 w-1 h-1 rounded-full" style={{ backgroundColor: C.gold }} />}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Safe area padding for iPhone home indicator */}
      <div style={{ height: 'env(safe-area-inset-bottom, 0px)', backgroundColor: C.bg }} />
    </div>
  );
}
