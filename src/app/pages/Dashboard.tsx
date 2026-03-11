import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

// Warm organic palette with original branding accents
const C = {
  bg: "#FFFFFF",
  card: "#FFFFFF",
  dark: "#111111",
  gold: "#C9A84C",
  goldLight: "#F5EDD6",
  brownLight: "#F2F2F2",
  coralLight: "#F0F0F0",
  muted: "#999999",
  subtle: "#F0F0F0",
  green: "#6BAF7C",
};

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const DATES = [9, 10, 11, 12, 13, 14, 15];
const TODAY_INDEX = 2; // Wednesday Mar 11

const upcoming = [
  { id: 1, client: "Sarah Jenkins", service: "Balayage & Cut", time: "10:30", duration: "2h 30m", price: "£175", status: "Arrived", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" },
  { id: 2, client: "Michael Chen", service: "Skin Fade", time: "1:00", duration: "45m", price: "£28", status: "Confirmed", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150" },
  { id: 3, client: "Jade Patterson", service: "Full Highlights", time: "2:15", duration: "2h", price: "£145", status: "Pending", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(TODAY_INDEX);

  return (
    <div className="flex flex-col min-h-full font-['Figtree']" style={{ backgroundColor: C.bg }}>
      {/* Header */}
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full overflow-hidden border-2"
              style={{ borderColor: C.gold }}
            >
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>{getGreeting()}</p>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>
                Lucy
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/notifications")}
              className="relative w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: C.subtle }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: C.gold }} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: 28, fontWeight: 800, color: C.dark, letterSpacing: -0.5, lineHeight: 1.1 }}>
          Daily Activity
        </h2>
      </div>

      {/* Week Strip Calendar */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between">
          {DAYS.map((day, i) => {
            const isToday = i === selectedDay;
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className="flex flex-col items-center gap-1.5 py-2 relative"
                style={{ width: 40 }}
              >
                <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, textTransform: "uppercase" }}>
                  {day}
                </span>
                <div
                  className="flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: isToday ? C.dark : "transparent",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: isToday ? 800 : 500,
                      color: isToday ? "#FFFFFF" : C.dark,
                    }}
                  >
                    {DATES[i]}
                  </span>
                </div>
                {isToday && (
                  <div
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full"
                    style={{ backgroundColor: C.gold }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stat Rows */}
      <div className="px-5 space-y-2.5 mb-5">
        {[
          { icon: "⭐", value: "8th", label: "Busiest day this month", accent: C.gold },
          { icon: "⏱", value: "5h 20m", label: "Today's routine", accent: C.gold },
          { icon: "💰", value: "£485", label: "Total revenue", accent: C.gold },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-center justify-between"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: C.subtle }}
            >
              <span style={{ fontSize: 11 }}>{stat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{stat.value}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.muted }}>{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Action Cards */}
      <div className="px-5 mb-5">
        <div className="flex gap-3">
          {/* Gold card */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/ai")}
            className="flex-1 p-4 flex flex-col justify-between"
            style={{
              borderRadius: 20,
              backgroundColor: C.goldLight,
              minHeight: 150,
            }}
          >
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, lineHeight: 1.2 }}>
                AI Salon
                <br />
                Assistant
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1l2 4.5 5 .7-3.6 3.5.85 5L8 12.5l-4.25 2.2.85-5L1 6.2l5-.7L8 1z" fill={C.gold} />
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>Pro</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke={C.gold} strokeWidth="1.3" />
                    <path d="M8 4v4l2.5 2.5" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>24h</span>
                </div>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, color: C.gold, opacity: 0.7 }}>Smart</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: C.dark, lineHeight: 1 }}>
                Ask
                <span style={{ fontSize: 14, fontWeight: 500, color: C.muted, marginLeft: 4 }}>Me</span>
              </p>
            </div>
          </motion.button>

          {/* Warm card */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/payment")}
            className="flex-1 p-4 flex flex-col justify-between"
            style={{
              borderRadius: 20,
              backgroundColor: C.brownLight,
              minHeight: 150,
            }}
          >
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, lineHeight: 1.2 }}>
                Tap to
                <br />
                Pay
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1l2 4.5 5 .7-3.6 3.5.85 5L8 12.5l-4.25 2.2.85-5L1 6.2l5-.7L8 1z" fill={C.gold} />
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>3</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke={C.gold} strokeWidth="1.3" />
                    <path d="M8 4v4l2.5 2.5" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>NFC</span>
                </div>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, color: C.gold, opacity: 0.7 }}>Pending</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: C.dark, lineHeight: 1 }}>
                £348
                <span style={{ fontSize: 14, fontWeight: 500, color: C.muted, marginLeft: 4 }}>due</span>
              </p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Up Next */}
      <div className="px-5 pb-28">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>Up Next</h3>
          <button
            onClick={() => navigate("/calendar")}
            style={{ fontSize: 12, fontWeight: 600, color: C.gold }}
          >
            See all →
          </button>
        </div>

        <div className="space-y-2.5">
          {upcoming.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="flex items-center gap-3 p-3 relative overflow-hidden"
              style={{
                borderRadius: 16,
                backgroundColor: "#FFFFFF",
                border: `1px solid ${C.subtle}`,
              }}
            >
              {/* Status strip */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                style={{
                  backgroundColor:
                    item.status === "Arrived" ? C.green :
                    item.status === "Pending" ? C.gold : C.dark,
                }}
              />

              <div
                className="w-10 h-10 rounded-full overflow-hidden shrink-0 ml-1.5 border"
                style={{ borderColor: C.subtle }}
              >
                <img src={item.avatar} alt={item.client} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="truncate" style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>
                  {item.client}
                </h4>
                <p className="truncate" style={{ fontSize: 12, fontWeight: 500, color: C.muted }}>
                  {item.service}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span style={{ fontSize: 10, fontWeight: 600, color: C.muted }}>{item.duration}</span>
                  <span style={{ fontSize: 10, color: C.subtle }}>·</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>{item.price}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>{item.time}</p>
                <div
                  className="inline-flex items-center px-2 py-0.5 rounded-full mt-0.5"
                  style={{
                    backgroundColor:
                      item.status === "Arrived" ? `${C.green}15` :
                      item.status === "Pending" ? `${C.gold}15` : `${C.gold}12`,
                    fontSize: 9,
                    fontWeight: 700,
                    color:
                      item.status === "Arrived" ? C.green :
                      item.status === "Pending" ? C.gold : C.gold,
                  }}
                >
                  {item.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly insight banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 flex items-center justify-center py-3 px-4"
          style={{
            borderRadius: 14,
            border: `1px solid ${C.subtle}`,
            backgroundColor: "#FFFFFF",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: C.muted, textAlign: "center" }}>
            This week <span style={{ fontWeight: 700, color: C.dark }}>Thursday</span> was the best performance!
          </span>
        </motion.div>
      </div>
    </div>
  );
}