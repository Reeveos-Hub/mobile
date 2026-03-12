import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const C = {
  bg: "#FFFFFF",
  dark: "#111111",
  gold: "#C9A84C",
  goldLight: "#F5EDD6",
  muted: "#999999",
  subtle: "#F0F0F0",
  green: "#6BAF7C",
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekDates() {
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dow + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
}

interface Appointment {
  id: string;
  staffId: string;
  start: number;
  duration: number;
  client: string;
  service: string;
  price: string;
  color: string;
  phone?: string;
  notes?: string;
}

function fmtTime(h: number) {
  const hr = Math.floor(h);
  const mn = h % 1 === 0.5 ? "30" : h % 1 === 0.75 ? "45" : h % 1 === 0.25 ? "15" : "00";
  const ampm = hr >= 12 ? "pm" : "am";
  const d = hr > 12 ? hr - 12 : hr;
  return `${d}:${mn}${ampm}`;
}

// ─── Component ───
export function CalendarView() {
  const { businessId } = useAuth();
  const WEEK_DATES = useMemo(() => getWeekDates(), []);
  const todayDow = (new Date().getDay() + 6) % 7; // Monday=0
  const [view, setView] = useState<"day" | "week">("week");
  const [selectedDay, setSelectedDay] = useState(todayDow);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const selectedDate = useMemo(() => {
    const today = new Date();
    const dow = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dow + 6) % 7));
    const d = new Date(monday);
    d.setDate(monday.getDate() + selectedDay);
    return d.toISOString().split('T')[0];
  }, [selectedDay]);

  const { data: calData } = useApi<any>(businessId ? `/calendar/business/${businessId}?date=${selectedDate}&view=day` : null);

  const staff = (calData?.staff || []).map((s: any) => ({
    id: s.id, name: s.name, img: s.avatar || '', initials: s.name?.[0] || '?', bg: '#C9A84C',
  }));

  const appointments: Appointment[] = (calData?.bookings || []).map((b: any) => {
    const [h, m] = (b.time || '09:00').split(':').map(Number);
    return {
      id: b.id, staffId: b.staffId || 'default', start: h + m / 60,
      duration: (b.duration || 60) / 60, client: b.customerName || 'Client',
      service: b.service || 'Booking', price: `£${b.price || 0}`,
      color: b.serviceColor || '#6BA3C7', notes: b.notes || '',
    };
  });

  const weekAppointments = [[], [], [], [], [], [], []].map(() =>
    appointments.map(a => ({ start: a.start, dur: a.duration, label: a.client.split(' ')[0], color: a.color }))
  );

  const hours = Array.from({ length: 10 }, (_, i) => i + 9);

  return (
    <div className="flex flex-col h-full font-['Figtree']" style={{ backgroundColor: C.bg }}>
      {/* ─── Header ─── */}
      <div className="flex flex-col px-4 pt-[58px] pb-0 sticky top-0 z-30" style={{ backgroundColor: C.bg, boxShadow: "0 2px 12px -8px rgba(0,0,0,0.06)" }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <button className="flex gap-1.5 items-center p-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.dark }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.dark }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.dark }} />
          </button>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 16, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>Mar 2026</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
          <button className="p-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
            </svg>
          </button>
        </div>

        {/* Week strip */}
        <div className="flex items-center px-1 mb-2">
          {WEEK_DAYS.map((d, i) => {
            const isToday = i === selectedDay;
            const hasAppts = weekAppointments[i].length > 0;
            return (
              <button
                key={i}
                onClick={() => { setSelectedDay(i); if (view === "week") setView("day"); }}
                className="flex-1 flex flex-col items-center gap-0.5 py-1 relative"
              >
                <span style={{ fontSize: 10, fontWeight: 700, color: isToday ? C.gold : C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {d}
                </span>
                <div
                  className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: isToday ? C.dark : "transparent",
                    border: isToday ? `2px solid ${C.gold}` : "2px solid transparent",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: isToday ? 800 : 500, color: isToday ? "#FFFFFF" : C.dark }}>
                    {WEEK_DATES[i]}
                  </span>
                </div>
                {hasAppts && !isToday && (
                  <div className="absolute bottom-0 w-1 h-1 rounded-full" style={{ backgroundColor: C.gold }} />
                )}
              </button>
            );
          })}
        </div>

        {/* View toggle */}
        <div className="flex gap-0.5 p-0.5 rounded-[8px] mx-1 mb-2" style={{ backgroundColor: C.subtle }}>
          {(["week", "day"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="flex-1 py-1.5 rounded-[6px] capitalize transition-all"
              style={{
                fontSize: 11,
                fontWeight: 700,
                backgroundColor: view === v ? C.dark : "transparent",
                color: view === v ? C.gold : C.muted,
              }}
            >
              {v} View
            </button>
          ))}
        </div>

        {/* Staff row — only in day view */}
        {view === "day" && (
          <div className="flex pl-[44px] -mx-4 overflow-x-hidden" style={{ borderBottom: `1px solid ${C.subtle}` }}>
            {staff.map((s) => (
              <div key={s.id} className="flex-1 min-w-[33.33%] flex flex-col items-center justify-center pb-2">
                <div className="w-[36px] h-[36px] rounded-full mb-0.5 flex items-center justify-center font-black text-white text-sm overflow-hidden shrink-0 border-2 border-white shadow-sm relative" style={{ backgroundColor: s.bg || "#ccc" }}>
                  {s.img ? <img src={s.img} alt={s.name} className="w-full h-full object-cover" /> : <span>{s.initials}</span>}
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: C.green }} />
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: C.dark, letterSpacing: -0.2 }}>{s.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Grid ─── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-28" style={{ backgroundColor: "#FFFFFF" }}>
        {view === "day" ? (
          <DayView hours={hours} appointments={appointments} staff={staff} onSelect={setSelectedAppt} />
        ) : (
          <WeekView hours={hours} data={weekAppointments} selectedDay={selectedDay} onDayTap={(i) => { setSelectedDay(i); setView("day"); }} />
        )}
      </div>

      {/* ─── FAB ─── */}
      <div className="absolute bottom-28 right-5 z-40 pointer-events-auto">
        <button className="w-[52px] h-[52px] rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg" style={{ backgroundColor: C.gold, boxShadow: "0 8px 20px rgba(201,168,76,0.35)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* ─── Appointment Detail Sheet ─── */}
      <AnimatePresence>
        {selectedAppt && (
          <AppointmentSheet appt={selectedAppt} staff={staff} onClose={() => setSelectedAppt(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Day View ───
function DayView({ hours, appointments, staff, onSelect }: { hours: number[]; appointments: Appointment[]; staff: any[]; onSelect: (a: Appointment) => void }) {
  return (
    <div className="flex relative min-h-[800px] w-full">
      {/* Time Axis */}
      <div className="w-[44px] flex-shrink-0 sticky left-0 z-20 flex flex-col pt-2" style={{ backgroundColor: "#FFFFFF", borderRight: `1px solid ${C.subtle}` }}>
        {hours.map((h) => (
          <div key={h} className="h-[80px] relative">
            <div className="absolute -top-2.5 right-1.5 flex flex-col items-end leading-none">
              <span style={{ fontSize: 11, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>{h > 12 ? h - 12 : h}:00</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 1 }}>{h >= 12 ? "pm" : "am"}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 relative pt-2">
        {hours.map((h) => <div key={h} className="h-[80px]" style={{ borderTop: `1px solid ${C.subtle}` }} />)}
        <div className="absolute inset-0 flex top-2 h-full pointer-events-none">
          {staff.map((s) => <div key={s.id} className="flex-1" style={{ borderRight: `1px solid ${C.subtle}` }} />)}
        </div>
        {appointments.map((apt) => {
          const si = staff.findIndex((s) => s.id === apt.staffId);
          const top = (apt.start - 9) * 80 + 2;
          const h = apt.duration * 80;
          return (
            <motion.button
              key={apt.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(apt)}
              className="absolute p-1.5 m-[2px] overflow-hidden flex flex-col rounded-[8px] shadow-sm text-left"
              style={{ top, height: h - 4, left: `${si * 33.33}%`, width: "calc(33.33% - 4px)", backgroundColor: apt.color }}
            >
              <span style={{ fontSize: 8, fontWeight: 800, color: "rgba(0,0,0,0.45)", lineHeight: 1, letterSpacing: -0.2 }}>
                {fmtTime(apt.start)} - {fmtTime(apt.start + apt.duration)}
              </span>
              <span className="truncate" style={{ fontSize: 10, fontWeight: 800, color: "rgba(0,0,0,0.75)", lineHeight: 1.2, marginTop: 2, letterSpacing: -0.2 }}>{apt.client}</span>
              {apt.duration >= 0.75 && (
                <span className="truncate" style={{ fontSize: 9, fontWeight: 600, color: "rgba(0,0,0,0.4)", lineHeight: 1.2 }}>{apt.service}</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Week View ───
function WeekView({ hours, data, selectedDay, onDayTap }: {
  hours: number[];
  data: { start: number; dur: number; label: string; color: string }[][];
  selectedDay: number;
  onDayTap: (i: number) => void;
}) {
  return (
    <div className="flex relative min-h-[800px] w-full">
      {/* Time Axis */}
      <div className="w-[36px] flex-shrink-0 sticky left-0 z-20 flex flex-col pt-2" style={{ backgroundColor: "#FFFFFF", borderRight: `1px solid ${C.subtle}` }}>
        {hours.map((h) => (
          <div key={h} className="h-[70px] relative">
            <div className="absolute -top-2 right-1 leading-none">
              <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: -0.3 }}>
                {h > 12 ? h - 12 : h}
              </span>
              <span style={{ fontSize: 7, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginLeft: 1 }}>
                {h >= 12 ? "pm" : "am"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 relative pt-2">
        {hours.map((h) => <div key={h} className="h-[70px]" style={{ borderTop: `1px solid ${C.subtle}` }} />)}

        {/* Day columns */}
        <div className="absolute inset-0 flex top-2 h-full">
          {data.map((dayAppts, di) => {
            const isToday = di === selectedDay;
            return (
              <button
                key={di}
                onClick={() => onDayTap(di)}
                className="flex-1 relative active:opacity-80 transition-opacity"
                style={{
                  borderRight: `1px solid ${C.subtle}`,
                  backgroundColor: isToday ? `${C.gold}08` : "transparent",
                }}
              >
                {/* Current time line for today */}
                {isToday && (
                  <div className="absolute left-0 right-0 z-10 flex items-center" style={{ top: (new Date().getHours() + new Date().getMinutes() / 60 - 9) * 70 }}>
                    <div className="w-1.5 h-1.5 rounded-full -ml-0.5" style={{ backgroundColor: "#EF4444" }} />
                    <div className="flex-1 h-[1px]" style={{ backgroundColor: "#EF4444" }} />
                  </div>
                )}
                {/* Appointment blocks */}
                {dayAppts.map((apt, ai) => {
                  const top = (apt.start - 9) * 70;
                  const h = apt.dur * 70;
                  return (
                    <div
                      key={ai}
                      className="absolute left-[2px] right-[2px] rounded-[5px] px-1 py-0.5 overflow-hidden"
                      style={{ top, height: h - 2, backgroundColor: apt.color }}
                    >
                      <span className="block truncate" style={{ fontSize: 8, fontWeight: 800, color: "rgba(0,0,0,0.5)", lineHeight: 1, letterSpacing: -0.2 }}>
                        {fmtTime(apt.start)}
                      </span>
                      {h > 35 && (
                        <span className="block truncate" style={{ fontSize: 8, fontWeight: 700, color: "rgba(0,0,0,0.65)", lineHeight: 1.2, marginTop: 2 }}>
                          {apt.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Appointment Detail Sheet ───
function AppointmentSheet({ appt, staff, onClose }: { appt: Appointment; staff: any[]; onClose: () => void }) {
  const staffMember = staff.find((s) => s.id === appt.staffId);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 z-[200]"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 rounded-t-[24px] z-[201] max-h-[75%] overflow-y-auto"
        style={{ backgroundColor: C.bg, boxShadow: "0 -12px 40px rgba(0,0,0,0.1)" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: C.subtle }} />
        </div>

        {/* Header */}
        <div className="px-5 pb-3 flex items-start justify-between">
          <div className="flex-1">
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3, lineHeight: 1.2 }}>{appt.service}</h2>
            <p style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 3 }}>Appointment details</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-3" style={{ backgroundColor: C.subtle }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Client */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: appt.color }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(0,0,0,0.5)" }}>
                {appt.client.split(" ").map((w) => w[0]).join("")}
              </span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{appt.client}</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>Client</p>
            </div>
            <button className="px-3 py-1.5 rounded-full" style={{ backgroundColor: C.goldLight, fontSize: 11, fontWeight: 700, color: C.gold }}>
              Details →
            </button>
          </div>
        </div>

        {/* Stylist */}
        {staffMember && (
          <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center" style={{ borderColor: C.gold, backgroundColor: staffMember.bg || "#ccc" }}>
                {staffMember.img ? <img src={staffMember.img} alt={staffMember.name} className="w-full h-full object-cover" /> : <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{staffMember.initials}</span>}
              </div>
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{staffMember.name}</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>Stylist</p>
              </div>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Location</p>
          <div className="flex items-center gap-2 px-3 py-2 rounded-[10px]" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}` }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke={C.gold} strokeWidth="1.3" /><path d="M8 14s5-4 5-8a5 5 0 00-10 0c0 4 5 8 5 8z" stroke={C.gold} strokeWidth="1.3" /></svg>
            <span className="flex-1" style={{ fontSize: 11, fontWeight: 500, color: C.dark }}>In-salon · Chair 1</span>
            <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 9, fontWeight: 700, color: C.green, backgroundColor: `${C.green}15` }}>In-Person</span>
          </div>
        </div>

        {/* Notes */}
        {appt.notes && (
          <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Note</p>
            <p className="px-3 py-2 rounded-[10px]" style={{ fontSize: 12, fontWeight: 500, color: C.dark, lineHeight: 1.5, backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}` }}>
              {appt.notes}
            </p>
          </div>
        )}

        {/* Time */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Time</p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={C.gold} strokeWidth="1.3" /><path d="M8 5v3l2 2" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" /></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{fmtTime(appt.start)}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke={C.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{fmtTime(appt.start + appt.duration)}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, color: C.muted, backgroundColor: C.subtle }}>
              {appt.duration >= 1 ? `${Math.floor(appt.duration)}h` : ""}{appt.duration % 1 > 0 ? ` ${(appt.duration % 1) * 60}m` : ""}
            </span>
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginTop: 6 }}>Tue 11 Mar 2026</p>
        </div>

        {/* Price */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <div className="flex items-center justify-between">
            <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>Price</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>{appt.price}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 flex gap-2" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <button className="flex-1 py-3 rounded-[12px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform" style={{ backgroundColor: C.dark }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7.5V11a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h3.5" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" /><path d="M10 2l2 2-5 5H5V7l5-5z" stroke={C.gold} strokeWidth="1.3" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>Edit</span>
          </button>
          <button className="flex-1 py-3 rounded-[12px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-md" style={{ backgroundColor: C.gold, boxShadow: "0 4px 12px rgba(201,168,76,0.3)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.5 2l-5 5v2.5H7l5-5M9.5 2l2.5 2.5" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#FFFFFF" }}>Reschedule</span>
          </button>
        </div>

        {/* Bottom actions */}
        <div className="px-5 pb-6 flex items-center justify-between">
          <div className="flex gap-3">
            {[
              <svg key="1" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 7.5V11a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h3.5" stroke={C.muted} strokeWidth="1.3" strokeLinecap="round" /><path d="M10 2l2 2-5 5H5V7l5-5z" stroke={C.muted} strokeWidth="1.3" strokeLinejoin="round" /></svg>,
              <svg key="2" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.3 1.7l-1.6 1.6m0 0L12 5.6m-2.3-2.3L5 8H3v2l4.7-4.7" stroke={C.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 12h10" stroke={C.muted} strokeWidth="1.3" strokeLinecap="round" /></svg>,
              <svg key="3" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 7v4M10 7v4" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round" /><path d="M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="#EF4444" strokeWidth="1.3" /></svg>,
            ].map((icon, i) => (
              <button key={i} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
                {icon}
              </button>
            ))}
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="4" cy="8" r="1" fill={C.muted} /><circle cx="8" cy="8" r="1" fill={C.muted} /><circle cx="12" cy="8" r="1" fill={C.muted} />
            </svg>
          </button>
        </div>
      </motion.div>
    </>
  );
}