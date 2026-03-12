import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const C = {
  bg: "#FFFFFF",
  dark: "#111111",
  gold: "#C9A84C",
  goldLight: "#F5EDD6",
  muted: "#8E8E93",
  subtle: "#F2F2F7",
  border: "#E5E5EA",
};

const BLOCK_COLORS = [
  "#A7D1ED", "#B4A7D6", "#FFC069", "#67D4C4", "#FFA6C9",
  "#A8E6CF", "#FFD3B6", "#C4B5FD", "#FBCFE8", "#93C5FD",
];

const DAYS_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  date.setDate(date.getDate() - ((day + 6) % 7));
  date.setHours(0, 0, 0, 0);
  return date;
}

function fmtTime(h: number): string {
  const hour = Math.floor(h);
  const min = Math.round((h - hour) * 60);
  const ampm = hour >= 12 ? "pm" : "am";
  const h12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return min > 0 ? `${h12}:${min.toString().padStart(2, "0")}${ampm}` : `${h12}${ampm}`;
}

function fmtRange(start: number, dur: number): string {
  return `${fmtTime(start)} - ${fmtTime(start + dur)}`;
}

interface Booking {
  id: string; staffId: string; staffName: string;
  start: number; duration: number;
  client: string; service: string; price: string; color: string;
}

interface StaffMember {
  id: string; name: string; initials: string;
}

// ═══════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════
export function CalendarView() {
  const { businessId } = useAuth();
  const today = new Date();
  const todayDow = (today.getDay() + 6) % 7;

  const [view, setView] = useState<"day" | "week">("day");
  const [selectedDay, setSelectedDay] = useState(todayDow);
  const [selectedAppt, setSelectedAppt] = useState<Booking | null>(null);

  const monday = useMemo(() => getMonday(today), []);

  const selectedDate = useMemo(() => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + selectedDay);
    return d.toISOString().split("T")[0];
  }, [monday, selectedDay]);

  const weekDates = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    }), [monday]);

  const { data: calData } = useApi<any>(
    businessId ? `/calendar/business/${businessId}?date=${selectedDate}&view=day` : null
  );

  const staff: StaffMember[] = useMemo(() =>
    (calData?.staff || []).map((s: any, i: number) => ({
      id: s.id || s._id || `s${i}`,
      name: s.name || "Staff",
      initials: (s.name || "S").split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
    })), [calData]);

  const bookings: Booking[] = useMemo(() =>
    (calData?.bookings || []).map((b: any, i: number) => {
      const [h, m] = (b.time || "09:00").split(":").map(Number);
      return {
        id: b.id || b._id || `b${i}`,
        staffId: b.staffId || b.staff_id || "",
        staffName: b.staffName || "",
        start: h + m / 60,
        duration: (b.duration || 60) / 60,
        client: b.customerName || b.customer_name || "Client",
        service: b.service || b.service_name || "Booking",
        price: `£${b.price || 0}`,
        color: b.serviceColor || BLOCK_COLORS[i % BLOCK_COLORS.length],
      };
    }), [calData]);

  const START_HOUR = 9;
  const END_HOUR = 19;
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
  const HOUR_H = 80;

  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const isToday = selectedDate === today.toISOString().split("T")[0];

  return (
    <div className="flex flex-col h-full font-['Figtree']" style={{ backgroundColor: C.bg }}>
      {/* ─── Header ─── */}
      <div className="sticky top-0 z-30" style={{ backgroundColor: C.bg }}>
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.dark }}>
            {MONTHS[today.getMonth()]} {today.getFullYear()}
          </h1>
          <button onClick={() => setSelectedDay(todayDow)}
            className="px-3 py-1 rounded-full"
            style={{ fontSize: 13, fontWeight: 600, color: C.gold, backgroundColor: C.goldLight }}>
            Today
          </button>
        </div>

        {/* Week strip */}
        <div className="flex px-2 pb-2">
          {weekDates.map((d, i) => {
            const sel = i === selectedDay;
            const isTd = d.toDateString() === today.toDateString();
            return (
              <button key={i} onClick={() => setSelectedDay(i)} className="flex-1 flex flex-col items-center py-1">
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, color: isTd ? C.gold : C.muted }}>{DAYS_SHORT[i]}</span>
                <div className="flex items-center justify-center mt-1" style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: sel ? C.dark : "transparent" }}>
                  <span style={{ fontSize: 17, fontWeight: sel ? 700 : 500, color: sel ? "#FFF" : isTd ? C.gold : C.dark }}>{d.getDate()}</span>
                </div>
                <div className="h-1 mt-0.5">
                  {isTd && !sel && <div className="w-1 h-1 rounded-full mx-auto" style={{ backgroundColor: C.gold }} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* View toggle */}
        <div className="flex mx-5 mb-2 p-0.5 rounded-lg" style={{ backgroundColor: C.subtle }}>
          {(["day", "week"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className="flex-1 py-2 rounded-md"
              style={{ fontSize: 14, fontWeight: 600, backgroundColor: view === v ? C.dark : "transparent", color: view === v ? "#FFF" : C.muted }}>
              {v === "day" ? "Day" : "Week"}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="flex-1 overflow-y-auto pb-20">
        {view === "day" ? (
          /* ═══ DAY VIEW — Staff Columns ═══ */
          <div>
            {/* Staff header row */}
            {staff.length > 0 && (
              <div className="flex sticky top-0 z-10 border-b" style={{ borderColor: C.border, backgroundColor: C.bg }}>
                <div style={{ width: 48, flexShrink: 0 }} />
                {staff.map((s) => (
                  <div key={s.id} className="flex-1 flex flex-col items-center py-2">
                    <div className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, backgroundColor: C.gold }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#FFF" }}>{s.initials}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.dark, marginTop: 3 }}>{s.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Time grid + blocks */}
            <div className="relative" style={{ height: hours.length * HOUR_H }}>
              {/* Hour lines */}
              {hours.map((h, i) => (
                <div key={h} className="absolute w-full flex" style={{ top: i * HOUR_H }}>
                  <div style={{ width: 48, flexShrink: 0, paddingRight: 6, textAlign: "right" }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>{fmtTime(h)}</span>
                  </div>
                  <div className="flex-1 border-t" style={{ borderColor: C.border }} />
                </div>
              ))}

              {/* Half-hour dashed lines */}
              {hours.map((h, i) => (
                <div key={`hf${h}`} className="absolute" style={{ top: i * HOUR_H + HOUR_H / 2, left: 48, right: 0 }}>
                  <div className="border-t border-dashed" style={{ borderColor: "#F0F0F0" }} />
                </div>
              ))}

              {/* Staff column dividers */}
              {staff.length > 1 && staff.slice(1).map((_, i) => {
                const colW = staff.length > 0 ? 100 / staff.length : 100;
                return (
                  <div key={`cd${i}`} className="absolute top-0 bottom-0" style={{ left: `calc(48px + (100% - 48px) * ${(i + 1) / staff.length})`, width: 1, backgroundColor: "#F0F0F0" }} />
                );
              })}

              {/* Current time line */}
              {isToday && currentHour >= START_HOUR && currentHour <= END_HOUR && (
                <div className="absolute z-10 flex items-center" style={{ top: (currentHour - START_HOUR) * HOUR_H, left: 40, right: 0 }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EA4335" }} />
                  <div className="flex-1" style={{ height: 2, backgroundColor: "#EA4335" }} />
                </div>
              )}

              {/* Booking blocks */}
              {bookings.map((b) => {
                const cols = Math.max(staff.length, 1);
                const si = staff.findIndex((s) => s.id === b.staffId);
                const ci = si >= 0 ? si : 0;
                const colW = 100 / cols;
                const top = (b.start - START_HOUR) * HOUR_H;
                const h = Math.max(b.duration * HOUR_H - 2, 28);

                return (
                  <motion.button key={b.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedAppt(b)}
                    className="absolute rounded-lg overflow-hidden text-left"
                    style={{ top, height: h, left: `calc(48px + (100% - 48px) * ${ci / cols} + 2px)`, width: `calc((100% - 48px) / ${cols} - 4px)`, backgroundColor: b.color, padding: "4px 6px", zIndex: 5 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(0,0,0,0.55)", lineHeight: 1.2 }}>{fmtRange(b.start, b.duration)}</p>
                    <p className="truncate" style={{ fontSize: 13, fontWeight: 700, color: "rgba(0,0,0,0.85)", lineHeight: 1.3 }}>{b.client}</p>
                    {h > 50 && <p className="truncate" style={{ fontSize: 11, fontWeight: 500, color: "rgba(0,0,0,0.5)" }}>{b.service}</p>}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ═══ WEEK VIEW — Day Columns ═══ */
          <div>
            <div className="flex sticky top-0 z-10 border-b" style={{ borderColor: C.border, backgroundColor: C.bg }}>
              <div style={{ width: 36, flexShrink: 0 }} />
              {weekDates.map((d, i) => {
                const isTd = d.toDateString() === today.toDateString();
                return (
                  <button key={i} onClick={() => { setSelectedDay(i); setView("day"); }} className="flex-1 flex flex-col items-center py-1.5">
                    <span style={{ fontSize: 9, fontWeight: 600, color: isTd ? C.gold : C.muted }}>{DAYS_SHORT[i].charAt(0)}</span>
                    <span style={{ fontSize: 12, fontWeight: isTd ? 700 : 500, color: isTd ? C.gold : C.dark }}>{d.getDate()}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative" style={{ height: hours.length * 60 }}>
              {hours.map((h, i) => (
                <div key={h} className="absolute w-full flex" style={{ top: i * 60 }}>
                  <div style={{ width: 36, flexShrink: 0, paddingRight: 4, textAlign: "right" }}>
                    <span style={{ fontSize: 9, fontWeight: 500, color: C.muted }}>{fmtTime(h)}</span>
                  </div>
                  <div className="flex-1 border-t" style={{ borderColor: C.border }} />
                </div>
              ))}

              {weekDates.slice(1).map((_, i) => (
                <div key={`wc${i}`} className="absolute top-0 bottom-0" style={{ left: `calc(36px + (100% - 36px) * ${(i + 1) / 7})`, width: 1, backgroundColor: "#F0F0F0" }} />
              ))}

              {/* Show bookings in selected day column only (until API supports week batch) */}
              {bookings.map((b, idx) => {
                const colW = 100 / 7;
                const top = (b.start - START_HOUR) * 60;
                const h = Math.max(b.duration * 60 - 1, 16);
                return (
                  <div key={b.id || idx} className="absolute rounded overflow-hidden"
                    style={{ top, height: h, left: `calc(36px + (100% - 36px) * ${selectedDay / 7} + 1px)`, width: `calc((100% - 36px) / 7 - 2px)`, backgroundColor: b.color, padding: "1px 2px", zIndex: 5 }}>
                    <p className="truncate" style={{ fontSize: 8, fontWeight: 700, color: "rgba(0,0,0,0.8)", lineHeight: 1.1 }}>{b.client.split(" ")[0]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ─── Booking Sheet ─── */}
      <AnimatePresence>
        {selectedAppt && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedAppt(null)} className="fixed inset-0 z-40" style={{ backgroundColor: "rgba(0,0,0,0.3)" }} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl" style={{ backgroundColor: C.bg, maxHeight: "70vh" }}>
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full" style={{ backgroundColor: C.border }} />
              </div>
              <div className="px-5 pb-8">
                {/* Client */}
                <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: C.border }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: selectedAppt.color }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(0,0,0,0.7)" }}>{selectedAppt.client.split(" ").map(w => w[0]).join("").slice(0, 2)}</span>
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: 17, fontWeight: 700, color: C.dark }}>{selectedAppt.client}</p>
                    <p style={{ fontSize: 14, fontWeight: 400, color: C.muted }}>Client</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-full" style={{ fontSize: 13, fontWeight: 600, color: C.gold, border: `1px solid ${C.gold}` }}>Details →</button>
                </div>

                {/* Staff */}
                {(() => { const sm = staff.find(s => s.id === selectedAppt.staffId); return sm ? (
                  <div className="flex items-center gap-3 py-4 border-b" style={{ borderColor: C.border }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: C.gold }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#FFF" }}>{sm.initials}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 600, color: C.dark }}>{sm.name}</p>
                      <p style={{ fontSize: 13, fontWeight: 400, color: C.muted }}>Stylist</p>
                    </div>
                  </div>
                ) : null; })()}

                {/* Time */}
                <div className="py-4 border-b" style={{ borderColor: C.border }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>TIME</p>
                  <p style={{ fontSize: 17, fontWeight: 600, color: C.dark }}>{fmtRange(selectedAppt.start, selectedAppt.duration)}</p>
                </div>

                {/* Service + Price */}
                <div className="py-4 border-b" style={{ borderColor: C.border }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>SERVICE</p>
                      <p style={{ fontSize: 16, fontWeight: 600, color: C.dark }}>{selectedAppt.service}</p>
                    </div>
                    <p style={{ fontSize: 24, fontWeight: 800, color: C.dark }}>{selectedAppt.price}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-5">
                  <button className="flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2" style={{ backgroundColor: C.dark, fontSize: 15, fontWeight: 700, color: "#FFF" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round"><path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" /></svg>
                    Edit
                  </button>
                  <button className="flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2" style={{ backgroundColor: C.gold, fontSize: 15, fontWeight: 700, color: "#FFF" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round"><path d="M2 8a6 6 0 0110.5-4M14 8a6 6 0 01-10.5 4" /><path d="M14 2v4h-4M2 14v-4h4" /></svg>
                    Reschedule
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
