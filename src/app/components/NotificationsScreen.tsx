import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const C = {
  bg: "#FFFFFF",
  dark: "#111111",
  gold: "#C9A84C",
  goldLight: "#F5EDD6",
  muted: "#999999",
  subtle: "#F0F0F0",
};

const initialNotifications = [
  {
    id: 1, title: "New booking", desc: "Sarah Mitchell booked Balayage & Cut for Thu 13 Mar at 10:00", time: "2 min ago", read: false, color: "#C9A84C",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="#C9A84C" strokeWidth="1.3" /><path d="M1.5 6h11" stroke="#C9A84C" strokeWidth="1.3" /></svg>,
  },
  {
    id: 2, title: "Cancellation", desc: "Amy Roberts cancelled Chemical Peel on Sat 15 Mar — slot now open", time: "1 hr ago", read: false, color: "#EF4444",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#EF4444" strokeWidth="1.3" /><path d="M5 5l4 4M9 5l-4 4" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
  {
    id: 3, title: "Payment received", desc: "£85.00 from Grace Williams for Full Highlights", time: "2 hrs ago", read: false, color: "#22C55E",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#22C55E" strokeWidth="1.3" /><path d="M1.5 6.5h11" stroke="#22C55E" strokeWidth="1.3" /></svg>,
  },
  {
    id: 4, title: "Reminder sent", desc: "Automated 24hr reminder sent to Jen Davies for tomorrow 10:30", time: "3 hrs ago", read: true, color: "#9CA3AF",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5a4 4 0 00-4 4v2.5l-1 2h10l-1-2V5.5a4 4 0 00-4-4z" stroke="#9CA3AF" strokeWidth="1.3" /><path d="M5.5 11a1.5 1.5 0 003 0" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
  {
    id: 5, title: "Low stock alert", desc: "SPF 50 Moisturiser — only 3 units remaining. Reorder soon.", time: "5 hrs ago", read: true, color: "#F59E0B",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2l5.5 10H1.5L7 2z" stroke="#F59E0B" strokeWidth="1.3" strokeLinejoin="round" /><path d="M7 6v2.5" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round" /><circle cx="7" cy="10" r="0.5" fill="#F59E0B" /></svg>,
  },
  {
    id: 6, title: "AI insight", desc: "Your no-show rate dropped to 2% this week — great job! Rebooking rate is at 72%.", time: "Yesterday", read: true, color: "#C9A84C",
    icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" fill="#C9A84C" /></svg>,
  },
  {
    id: 7, title: "5-star review", desc: "Sarah Jenkins left a 5-star review: 'Absolutely love my balayage! Best salon in Cardiff.'", time: "Yesterday", read: true, color: "#C9A84C",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.8 3.6 4 .6-2.9 2.8.7 4L7 10.2 3.4 12l.7-4L1.2 5.2l4-.6L7 1z" fill="#C9A84C" /></svg>,
  },
  {
    id: 8, title: "Waitlist fill", desc: "Rebecca Moore was auto-booked into Amy Roberts' cancelled slot on Sat 15 Mar", time: "2 days ago", read: true, color: "#3B82F6",
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#3B82F6" strokeWidth="1.3" /><path d="M5 7l1.5 1.5L9 5.5" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
];

export function NotificationsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex flex-col min-h-full font-['Figtree']" style={{ backgroundColor: C.bg }}>
      {/* Header */}
      <div className="px-5 pt-[56px] pb-2.5 sticky top-0 z-20" style={{ backgroundColor: `${C.bg}EE`, backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.subtle}` }}>
        <div className="flex items-center gap-3 mb-2.5">
          <button
            onClick={() => navigate(-1 as any)}
            className="flex items-center justify-center"
            style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: C.subtle }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex-1">
            <p style={{ fontSize: 15, fontWeight: 800, color: C.dark, lineHeight: 1.2 }}>Notifications</p>
            {unreadCount > 0 && (
              <p style={{ fontSize: 10, fontWeight: 600, color: C.gold, marginTop: 1 }}>{unreadCount} unread</p>
            )}
          </div>
          <button onClick={markAllRead} style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>Mark all read</button>
        </div>

        {/* Filter */}
        <div className="flex gap-0.5 p-0.5 rounded-[8px]" style={{ backgroundColor: C.subtle }}>
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-1 py-1.5 rounded-[6px] capitalize transition-all"
              style={{
                fontSize: 10,
                fontWeight: 700,
                backgroundColor: filter === f ? C.dark : "transparent",
                color: filter === f ? C.gold : C.muted,
              }}
            >
              {f === "all" ? "All" : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="pb-28">
        <AnimatePresence>
          {displayed.map((n, i) => (
            <motion.button
              key={n.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setNotifications((prev) => prev.map((nn) => nn.id === n.id ? { ...nn, read: true } : nn))}
              className="w-full flex items-start gap-2.5 px-5 py-3 text-left active:bg-[#FAFAFA] transition-colors"
              style={{ borderBottom: "1px solid #F8F8F8", backgroundColor: n.read ? "#FFFFFF" : "#FAFAF8" }}
            >
              {/* Unread dot */}
              <div className="mt-2 shrink-0" style={{ width: 6, height: 6 }}>
                {!n.read && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#3B82F6" }} />}
              </div>
              {/* Icon */}
              <div
                className="flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${n.color}12, ${n.color}04)` }}
              >
                {n.icon}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p style={{ fontSize: 12, fontWeight: n.read ? 600 : 700, color: C.dark }}>{n.title}</p>
                  {!n.read && (
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: C.gold }} />
                  )}
                </div>
                <p className="mt-0.5" style={{ fontSize: 10, fontWeight: 500, color: "#888", lineHeight: 1.5 }}>{n.desc}</p>
                <p className="mt-1" style={{ fontSize: 9, fontWeight: 600, color: "#CCC" }}>{n.time}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {filter === "unread" && unreadCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center pt-16 px-6"
          >
            <div className="flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: C.subtle }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" stroke={C.subtle} strokeWidth="2" />
              </svg>
            </div>
            <p className="mt-3" style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>All caught up</p>
            <p className="mt-1 text-center" style={{ fontSize: 11, fontWeight: 500, color: C.muted, lineHeight: 1.5 }}>
              No unread notifications. New bookings and updates will appear here.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
