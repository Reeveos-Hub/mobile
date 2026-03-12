import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Staff
const staffMembers = [
  { id: "natalie", name: "Natalie", initials: "NR", color: "#C9A84C", img: "https://images.unsplash.com/photo-1737063935340-f9af0940c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { id: "jade", name: "Jade", initials: "JC", color: "#22C55E", img: "https://images.unsplash.com/photo-1551382031-62db072aed3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { id: "marcus", name: "Marcus", initials: "MW", color: "#3B82F6", img: "https://images.unsplash.com/photo-1747830280502-f33d7305a714?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
];

// Week dates
const weekDates = [
  { day: "M", date: 9 },
  { day: "T", date: 10, isToday: true },
  { day: "W", date: 11 },
  { day: "T", date: 12 },
  { day: "F", date: 13 },
  { day: "S", date: 14 },
  { day: "S", date: 15 },
];

interface Appointment {
  id: string;
  staffId: string;
  name: string;
  service: string;
  startHour: number;
  startMin: number;
  durationMin: number;
  color: string;
  price: string;
}

const appointments: Appointment[] = [
  { id: "1", staffId: "natalie", name: "Grace Williams", service: "RF Needling", startHour: 9, startMin: 0, durationMin: 60, color: "#C9A84C", price: "£120" },
  { id: "2", staffId: "jade", name: "Emily Chen", service: "Chemical Peel", startHour: 9, startMin: 30, durationMin: 45, color: "#22C55E", price: "£85" },
  { id: "3", staffId: "marcus", name: "Lydia Ford", service: "Brow Lamination", startHour: 10, startMin: 0, durationMin: 30, color: "#F472B6", price: "£45" },
  { id: "4", staffId: "natalie", name: "Sarah Mitchell", service: "Microneedling", startHour: 11, startMin: 0, durationMin: 60, color: "#F59E0B", price: "£95" },
  { id: "5", staffId: "jade", name: "Jen Davies", service: "Polynucleotides", startHour: 11, startMin: 0, durationMin: 90, color: "#EF4444", price: "£180" },
  { id: "6", staffId: "marcus", name: "John Garner", service: "Skin Consultation", startHour: 10, startMin: 30, durationMin: 30, color: "#8B5CF6", price: "Free" },
  { id: "7", staffId: "marcus", name: "Fannie Barber", service: "Dermal Filler", startHour: 11, startMin: 30, durationMin: 60, color: "#F97316", price: "£250" },
  { id: "8", staffId: "natalie", name: "Myra Gray", service: "Hot Stone Massage", startHour: 12, startMin: 30, durationMin: 60, color: "#9333EA", price: "£75" },
  { id: "9", staffId: "jade", name: "Gene Barker", service: "Hair Colouring", startHour: 13, startMin: 0, durationMin: 60, color: "#06B6D4", price: "£110" },
  { id: "10", staffId: "marcus", name: "Winnie Fisher", service: "Refining Facial", startHour: 13, startMin: 0, durationMin: 60, color: "#10B981", price: "£90" },
  { id: "11", staffId: "natalie", name: "Rebecca Moore", service: "Consultation", startHour: 14, startMin: 0, durationMin: 30, color: "#EC4899", price: "Free" },
  { id: "12", staffId: "jade", name: "Shawn Duncan", service: "Eyebrow Waxing", startHour: 14, startMin: 30, durationMin: 45, color: "#F59E0B", price: "£25" },
  { id: "13", staffId: "natalie", name: "Amy Roberts", service: "Chemical Peel", startHour: 15, startMin: 0, durationMin: 45, color: "#22C55E", price: "£85" },
  { id: "14", staffId: "marcus", name: "Fannie Barber", service: "Follow-up", startHour: 14, startMin: 30, durationMin: 30, color: "#F97316", price: "£40" },
];

const HOUR_HEIGHT = 72; // px per hour
const START_HOUR = 9;
const END_HOUR = 17;
const COL_WIDTH = 105; // px per staff column

function timeToY(hour: number, min: number): number {
  return (hour - START_HOUR + min / 60) * HOUR_HEIGHT;
}

export function CalendarScreen() {
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [activeStaff, setActiveStaff] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredAppts = activeStaff
    ? appointments.filter((a) => a.staffId === activeStaff)
    : appointments;

  const visibleStaff = activeStaff
    ? staffMembers.filter((s) => s.id === activeStaff)
    : staffMembers;

  const totalHours = END_HOUR - START_HOUR;
  const gridHeight = totalHours * HOUR_HEIGHT;

  return (
    <div className="flex flex-col h-full">
      {/* ─── HEADER ─── */}
      <div className="bg-white shrink-0">
        <div className="px-5 pt-[52px] pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111111", lineHeight: 1.2 }}>Tue 10 Mar</h1>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 5.5l3 3 3-3" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="flex items-center gap-0.5 p-1" style={{ borderRadius: 10, backgroundColor: "#F3F4F6" }}>
                <div className="flex items-center justify-center" style={{ width: 30, height: 26, borderRadius: 7, backgroundColor: "#111111" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="2" width="4" height="4" rx="1" fill="#C9A84C" />
                    <rect x="8" y="2" width="4" height="4" rx="1" fill="#C9A84C" />
                    <rect x="2" y="8" width="4" height="4" rx="1" fill="#C9A84C" />
                    <rect x="8" y="8" width="4" height="4" rx="1" fill="#C9A84C" />
                  </svg>
                </div>
                <div className="flex items-center justify-center" style={{ width: 30, height: 26, borderRadius: 7 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <line x1="2" y1="4" x2="12" y2="4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="7" x2="12" y2="7" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="2" y1="10" x2="12" y2="10" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              {/* Filter */}
              <button className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "#F3F4F6" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12M4 8h8M6 12h4" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Week strip */}
          <div className="flex mt-3 -mx-1">
            {weekDates.map((d) => (
              <button key={d.date} className="flex-1 flex flex-col items-center gap-1 py-1.5">
                <span style={{ fontSize: 10, fontWeight: 600, color: d.isToday ? "#C9A84C" : "#BBBBBB", letterSpacing: 0.5 }}>{d.day}</span>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: d.isToday ? "#111111" : "transparent",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: d.isToday ? "#FFFFFF" : "#111111" }}>{d.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Staff row */}
        <div className="flex items-center gap-0 px-5 py-2.5" style={{ borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0" }}>
          <button
            onClick={() => setActiveStaff(null)}
            className="flex items-center justify-center shrink-0 mr-2"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: !activeStaff ? "#111111" : "#F3F4F6",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: !activeStaff ? "#C9A84C" : "#999" }}>All</span>
          </button>
          {staffMembers.map((s) => {
            const isActive = activeStaff === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStaff(isActive ? null : s.id)}
                className="flex items-center gap-2 px-2.5 py-1.5 shrink-0 mr-1.5"
                style={{
                  borderRadius: 20,
                  backgroundColor: isActive ? "#111111" : "transparent",
                  border: isActive ? "none" : "1.5px solid #EBEBEB",
                }}
              >
                <div className="rounded-full overflow-hidden" style={{ width: 22, height: 22, border: `1.5px solid ${isActive ? "#C9A84C" : s.color}40` }}>
                  <ImageWithFallback src={s.img} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? "#C9A84C" : "#111111" }}>{s.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TIMELINE GRID ─── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-auto relative">
        <div className="flex" style={{ minHeight: gridHeight + 20 }}>
          {/* Time labels */}
          <div className="shrink-0 sticky left-0 z-10 bg-white" style={{ width: 44 }}>
            {Array.from({ length: totalHours + 1 }, (_, i) => {
              const hour = START_HOUR + i;
              const label = hour <= 12 ? `${hour}${hour < 12 ? "am" : "pm"}` : `${hour - 12}pm`;
              return (
                <div
                  key={hour}
                  className="absolute flex items-start justify-end pr-2"
                  style={{ top: i * HOUR_HEIGHT - 6, right: 0 }}
                >
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#BBBBBB" }}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* Grid columns */}
          <div className="flex-1 relative" style={{ minWidth: visibleStaff.length * COL_WIDTH }}>
            {/* Horizontal grid lines */}
            {Array.from({ length: totalHours + 1 }, (_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{ top: i * HOUR_HEIGHT, height: 1, backgroundColor: "#F3F4F6" }}
              />
            ))}
            {/* Half-hour lines */}
            {Array.from({ length: totalHours }, (_, i) => (
              <div
                key={`half-${i}`}
                className="absolute left-0 right-0"
                style={{ top: i * HOUR_HEIGHT + HOUR_HEIGHT / 2, height: 1, backgroundColor: "#FAFAF8" }}
              />
            ))}

            {/* Column dividers */}
            {visibleStaff.map((_, i) => (
              i > 0 && (
                <div
                  key={`div-${i}`}
                  className="absolute top-0 bottom-0"
                  style={{ left: i * COL_WIDTH, width: 1, backgroundColor: "#F0F0F0" }}
                />
              )
            ))}

            {/* Current time indicator */}
            {(() => {
              const now = new Date();
              const currentY = timeToY(11, 0); // Simulate 11:00 for demo
              return (
                <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ top: currentY }}>
                  <div className="flex items-center">
                    <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#EF4444", marginLeft: -4 }} />
                    <div className="flex-1" style={{ height: 1.5, backgroundColor: "#EF4444" }} />
                  </div>
                </div>
              );
            })()}

            {/* Appointment blocks */}
            {filteredAppts.map((appt) => {
              const staffIndex = visibleStaff.findIndex((s) => s.id === appt.staffId);
              if (staffIndex === -1) return null;

              const top = timeToY(appt.startHour, appt.startMin);
              const height = (appt.durationMin / 60) * HOUR_HEIGHT;
              const left = staffIndex * COL_WIDTH + 3;
              const width = COL_WIDTH - 6;

              const isSelected = selectedAppt?.id === appt.id;

              return (
                <motion.button
                  key={appt.id}
                  onClick={() => setSelectedAppt(isSelected ? null : appt)}
                  className="absolute text-left overflow-hidden"
                  style={{
                    top,
                    left,
                    width,
                    height: Math.max(height, 28),
                    borderRadius: 10,
                    backgroundColor: `${appt.color}18`,
                    borderLeft: `3px solid ${appt.color}`,
                    padding: "4px 6px",
                    zIndex: isSelected ? 30 : 10,
                    boxShadow: isSelected ? `0 4px 16px ${appt.color}30` : "none",
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <p className="truncate" style={{ fontSize: 10, fontWeight: 700, color: appt.color, lineHeight: 1.2 }}>
                    {appt.name}
                  </p>
                  {height >= 40 && (
                    <p className="truncate" style={{ fontSize: 9, fontWeight: 500, color: `${appt.color}99`, lineHeight: 1.2, marginTop: 1 }}>
                      {appt.service}
                    </p>
                  )}
                  {height >= 55 && (
                    <p className="truncate" style={{ fontSize: 9, fontWeight: 700, color: appt.color, lineHeight: 1, marginTop: 2 }}>
                      {appt.price}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── APPOINTMENT DETAIL SHEET ─── */}
      <AnimatePresence>
        {selectedAppt && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="absolute bottom-[82px] left-0 right-0 z-40 bg-white px-5 pb-5 pt-4"
            style={{ borderRadius: "20px 20px 0 0", boxShadow: "0 -12px 40px rgba(0,0,0,0.12)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${selectedAppt.color}25, ${selectedAppt.color}10)` }}
                >
                  <span style={{ fontSize: 13, fontWeight: 800, color: selectedAppt.color }}>
                    {selectedAppt.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111111" }}>{selectedAppt.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "#999" }}>
                    {selectedAppt.service} · {selectedAppt.durationMin}min · {selectedAppt.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppt(null)}
                className="flex items-center justify-center"
                style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: "#F3F4F6" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 4l6 6M10 4l-6 6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-2 py-3"
                style={{ borderRadius: 12, border: "1.5px solid #EBEBEB" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>Reschedule</span>
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-3"
                style={{ borderRadius: 12, backgroundColor: "#111111" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 7.5l2.5 2.5 4.5-5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#C9A84C" }}>Check in</span>
              </button>
              <button
                className="flex items-center justify-center"
                style={{ width: 46, height: 46, borderRadius: 12, border: "1.5px solid #EBEBEB" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="4" r="1" fill="#999" />
                  <circle cx="8" cy="8" r="1" fill="#999" />
                  <circle cx="8" cy="12" r="1" fill="#999" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
