import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { RMark } from "./RMark";
import { AIChatSheet } from "./AIChatSheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Staff data
const staff = [
  { name: "Natalie", initials: "NR", color: "#C9A84C", img: "https://images.unsplash.com/photo-1737063935340-f9af0940c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { name: "Jade", initials: "JC", color: "#22C55E", img: "https://images.unsplash.com/photo-1551382031-62db072aed3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { name: "Marcus", initials: "MW", color: "#3B82F6", img: "https://images.unsplash.com/photo-1747830280502-f33d7305a714?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
];

const schedule = [
  { time: "09:00", end: "10:00", name: "Grace Williams", service: "RF Needling", price: "£120", color: "#C9A84C", status: "done" as const },
  { time: "10:15", end: "11:00", name: "Emily Chen", service: "Chemical Peel", price: "£85", color: "#22C55E", status: "done" as const },
  { time: "11:00", end: "12:00", name: "Sarah Mitchell", service: "Microneedling", price: "£95", color: "#F59E0B", status: "next" as const },
  { time: "12:30", end: "13:15", name: "Jen Davies", service: "Polynucleotides", price: "£180", color: "#EF4444", status: "upcoming" as const },
  { time: "13:30", end: "14:00", name: "Rebecca Moore", service: "Consultation", price: "Free", color: "#9333EA", status: "upcoming" as const },
  { time: "14:30", end: "15:30", name: "Natalie Hughes", service: "RF Needling", price: "£120", color: "#C9A84C", status: "upcoming" as const },
  { time: "15:30", end: "16:15", name: "Amy Roberts", service: "Chemical Peel", price: "£85", color: "#22C55E", status: "upcoming" as const },
  { time: "16:30", end: "17:30", name: "Lucy Thompson", service: "Microneedling", price: "£95", color: "#F59E0B", status: "upcoming" as const },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase();
}

export function HomeScreen() {
  const navigate = useNavigate();
  const [showAI, setShowAI] = useState(false);
  const nextAppt = schedule.find((s) => s.status === "next")!;

  return (
    <div className="flex flex-col">
      {/* ─── HERO HEADER ─── */}
      <div style={{ background: "linear-gradient(165deg, #111111 0%, #1a1a1a 60%, #222218 100%)" }} className="px-5 pt-[52px] pb-6">
        {/* Top row */}
        <div className="flex items-center justify-between mb-5">
          <RMark size={30} variant="dark" />
          <div className="flex items-center gap-2">
            {/* Notification bell — custom, not lucide */}
            <button
              onClick={() => navigate("/notifications")}
              className="relative flex items-center justify-center"
              style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2a5.5 5.5 0 00-5.5 5.5v3l-1.2 2.4a.8.8 0 00.7 1.1h12a.8.8 0 00.7-1.1L15.5 10.5v-3A5.5 5.5 0 0010 2z" stroke="#fff" strokeWidth="1.5" fill="none" />
                <path d="M8 15a2 2 0 004 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="absolute -top-0.5 -right-0.5" style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444", border: "2px solid #111111" }} />
            </button>
            {/* Avatar */}
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center justify-center rounded-full overflow-hidden"
              style={{ width: 36, height: 36, border: "2px solid #C9A84C" }}
            >
              <ImageWithFallback
                src={staff[0].img}
                alt="Natalie"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>
          </div>
        </div>

        {/* Greeting */}
        <p style={{ fontSize: 13, fontWeight: 600, color: "#C9A84C", letterSpacing: 0.5 }}>{getGreeting()}</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15, marginTop: 2 }}>Natalie</h1>

        {/* AI Insight — woven into the header naturally */}
        <motion.button
          onClick={() => setShowAI(true)}
          className="mt-4 w-full flex items-start gap-3 p-3.5"
          style={{
            borderRadius: 16,
            background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
            border: "1px solid rgba(201,168,76,0.15)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Pulsing orb — not a Lucide icon */}
          <div className="relative shrink-0" style={{ width: 32, height: 32 }}>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.25)" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" fill="#C9A84C" />
              </svg>
            </div>
          </div>
          <div className="flex-1 text-left">
            <p style={{ fontSize: 12, fontWeight: 700, color: "#C9A84C", lineHeight: 1.3 }}>
              You're 12% ahead of last week
            </p>
            <p style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.45)", lineHeight: 1.4, marginTop: 2 }}>
              8 bookings today · £485 confirmed · 0 no-shows
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-1">
            <path d="M6 4l4 4-4 4" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        {/* Stat Pills */}
        <div className="flex gap-2.5 mt-4">
          {[
            { value: "8", label: "Bookings", sub: "today" },
            { value: "£485", label: "Revenue", sub: "confirmed" },
            { value: "0", label: "No-shows", sub: "this week" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex-1 py-3 px-3"
              style={{
                borderRadius: 14,
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginTop: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── NEXT UP CARD ─── */}
      <div className="px-5 -mt-0">
        <div
          className="mt-4 overflow-hidden"
          style={{
            borderRadius: 18,
            background: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Color accent bar */}
          <div style={{ height: 3, backgroundColor: nextAppt.color }} />
          <button
            onClick={() => navigate("/calendar")}
            className="w-full flex items-center gap-3.5 p-4 text-left"
          >
            <div className="relative shrink-0">
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: 48, height: 48, background: `linear-gradient(135deg, ${nextAppt.color}25, ${nextAppt.color}10)` }}
              >
                <span style={{ fontSize: 15, fontWeight: 800, color: nextAppt.color }}>{getInitials(nextAppt.name)}</span>
              </div>
              {/* Live pulse */}
              <motion.div
                className="absolute -top-0.5 -right-0.5 rounded-full"
                style={{ width: 12, height: 12, backgroundColor: "#22C55E", border: "2.5px solid #FFFFFF" }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p style={{ fontSize: 15, fontWeight: 700, color: "#111111" }}>{nextAppt.name}</p>
                <span
                  className="inline-flex items-center px-2 py-0.5"
                  style={{ borderRadius: 6, backgroundColor: "rgba(201,168,76,0.1)", fontSize: 9, fontWeight: 700, color: "#C9A84C", letterSpacing: 0.5 }}
                >
                  NEXT
                </span>
              </div>
              <p style={{ fontSize: 12, fontWeight: 500, color: "#888888", marginTop: 1 }}>{nextAppt.service} · {nextAppt.price}</p>
            </div>
            <div className="text-right shrink-0">
              <p style={{ fontSize: 18, fontWeight: 800, color: "#111111", lineHeight: 1 }}>{nextAppt.time}</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#C9A84C", marginTop: 3 }}>in 49 min</p>
            </div>
          </button>
        </div>
      </div>

      {/* ─── QUICK ACTIONS ─── */}
      <div className="flex gap-2.5 px-5 mt-4">
        <button
          onClick={() => navigate("/payment")}
          className="flex-1 flex items-center justify-center gap-2 py-3"
          style={{
            borderRadius: 14,
            backgroundColor: "#111111",
            boxShadow: "0 2px 8px rgba(17,17,17,0.2)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="10" rx="2" stroke="#C9A84C" strokeWidth="1.5" />
            <path d="M1 7h14" stroke="#C9A84C" strokeWidth="1.5" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>Tap to Pay</span>
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3"
          style={{
            borderRadius: 14,
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #EBEBEB",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#111111" strokeWidth="1.5" />
            <path d="M5.5 8.5l2 2 3-4" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#111111" }}>Walk-in</span>
        </button>
        <button
          className="flex items-center justify-center"
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            backgroundColor: "#FFFFFF",
            border: "1.5px solid #EBEBEB",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M15 11l-3 3-3-3" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 14V4" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 7l3-3 3 3" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 4v10" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ─── TODAY'S SCHEDULE ─── */}
      <div className="px-5 mt-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <p style={{ fontSize: 11, fontWeight: 700, color: "#999999", letterSpacing: 1.2, textTransform: "uppercase" }}>
            Today's Schedule
          </p>
          <button onClick={() => navigate("/calendar")} style={{ fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>
            View all
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {schedule.map((appt, i) => {
            const isDone = appt.status === "done";
            const isNext = appt.status === "next";

            return (
              <motion.div
                key={appt.time + appt.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3"
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  backgroundColor: isNext ? "#FFFFFF" : isDone ? "transparent" : "#FFFFFF",
                  border: isNext ? `1.5px solid ${appt.color}40` : isDone ? "none" : "1px solid #F0F0F0",
                  boxShadow: isNext ? `0 4px 16px ${appt.color}15` : "none",
                  opacity: isDone ? 0.5 : 1,
                }}
              >
                {/* Time */}
                <div className="shrink-0" style={{ width: 38 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: isDone ? "#BBBBBB" : "#111111", lineHeight: 1 }}>{appt.time}</p>
                  <p style={{ fontSize: 9, fontWeight: 500, color: "#CCCCCC", marginTop: 2 }}>{appt.end}</p>
                </div>
                {/* Color bar */}
                <div className="self-stretch shrink-0" style={{ width: 3, borderRadius: 2, backgroundColor: isDone ? "#DDDDDD" : appt.color }} />
                {/* Avatar */}
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 34,
                    height: 34,
                    background: isDone ? "#F3F4F6" : `linear-gradient(135deg, ${appt.color}20, ${appt.color}08)`,
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: isDone ? "#BBBBBB" : appt.color }}>{getInitials(appt.name)}</span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: 13, fontWeight: 700, color: isDone ? "#BBBBBB" : "#111111" }}>{appt.name}</p>
                  <p className="truncate" style={{ fontSize: 11, fontWeight: 500, color: isDone ? "#CCCCCC" : "#999999", marginTop: 1 }}>{appt.service}</p>
                </div>
                {/* Price / Status */}
                <div className="shrink-0 text-right">
                  {isDone ? (
                    <div className="flex items-center justify-center" style={{ width: 20, height: 20, borderRadius: 6, backgroundColor: "#F0F0F0" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 6.5l2 2 4-4" stroke="#BBBBBB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : (
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#111111" }}>{appt.price}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── Floating AI pill ─── */}
      <div className="sticky bottom-2 z-30 flex justify-center px-5 pb-1">
        <motion.button
          onClick={() => setShowAI(true)}
          className="flex items-center gap-2.5 px-5 py-3"
          style={{
            borderRadius: 50,
            backgroundColor: "#111111",
            boxShadow: "0 8px 32px rgba(17,17,17,0.4), 0 0 0 1px rgba(201,168,76,0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative" style={{ width: 18, height: 18 }}>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: "rgba(201,168,76,0.3)" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" fill="#C9A84C" />
              </svg>
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Ask ReeveOS...</span>
          <div style={{ width: 1, height: 14, backgroundColor: "rgba(255,255,255,0.1)" }} />
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="7" width="2" height="6" rx="1" fill="#C9A84C" opacity="0.5" />
            <rect x="7" y="4" width="2" height="9" rx="1" fill="#C9A84C" opacity="0.7" />
            <rect x="11" y="6" width="2" height="7" rx="1" fill="#C9A84C" opacity="0.5" />
          </svg>
        </motion.button>
      </div>

      <AIChatSheet open={showAI} onClose={() => setShowAI(false)} />
    </div>
  );
}
