/**
 * ReeveOS Mobile — Calendar View (Live Data)
 *
 * Wired to: GET /calendar/business/{id}?date=YYYY-MM-DD&view=day
 * Returns: staff list, bookings with times/durations/colours
 *
 * HIPAA / ICO / GDPR: All data in-memory only.
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = {
  bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6',
  muted: '#999999', subtle: '#F0F0F0', green: BRAND.success,
};

// ─── Types (matching backend) ───────────────────────────────────────

interface StaffMember { id: string; name: string; avatar?: string | null; }
interface CalBooking {
  id: string; staffId: string; staffName: string; time: string; endTime?: string;
  duration: number; customerName: string; service: string; serviceColor: string;
  status: string; price: number; notes?: string; isNewClient?: boolean;
}
interface CalendarResponse {
  date: string; view: string;
  openingHours: { open: string; close: string };
  staff: StaffMember[]; bookings: CalBooking[];
}

// ─── Helpers ────────────────────────────────────────────────────────

function timeToHours(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h + m / 60;
}

function fmtTime(h: number): string {
  const hr = Math.floor(h);
  const mn = Math.round((h % 1) * 60);
  const ampm = hr >= 12 ? 'pm' : 'am';
  const d = hr > 12 ? hr - 12 : hr === 0 ? 12 : hr;
  return `${d}:${mn.toString().padStart(2, '0')}${ampm}`;
}

function getWeekDates() {
  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dow + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      label: DAY_LABELS[i],
      date: d.getDate(),
      fullDate: d.toISOString().split('T')[0],
      isToday: d.toDateString() === today.toDateString(),
    };
  });
}

function formatMonth(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function Avatar({ name, src, size = 36 }: { name: string; src?: string | null; size?: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  if (src) return (
    <div className="rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm" style={{ width: size, height: size }}>
      <img src={src} alt={name} className="w-full h-full object-cover" />
    </div>
  );
  return (
    <div className="rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm" style={{ width: size, height: size, backgroundColor: C.gold }}>
      <span style={{ fontSize: size * 0.35, fontWeight: 800, color: '#fff' }}>{initials}</span>
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────

export function CalendarView() {
  const { businessId } = useAuth();
  const weekDates = useMemo(() => getWeekDates(), []);
  const todayIndex = weekDates.findIndex(d => d.isToday);
  const [selectedDay, setSelectedDay] = useState(todayIndex >= 0 ? todayIndex : 0);
  const [view, setView] = useState<'day' | 'week'>('day');
  const [selectedAppt, setSelectedAppt] = useState<CalBooking | null>(null);

  const selectedDate = weekDates[selectedDay]?.fullDate || new Date().toISOString().split('T')[0];

  const { data, loading } = useApi<CalendarResponse>(
    businessId ? `/calendar/business/${businessId}?date=${selectedDate}&view=day` : null,
  );

  const staff = data?.staff ?? [];
  const bookings = data?.bookings ?? [];
  const openHour = data?.openingHours ? parseInt(data.openingHours.open.split(':')[0]) : 9;
  const closeHour = data?.openingHours ? parseInt(data.openingHours.close.split(':')[0]) : 19;
  const hours = Array.from({ length: closeHour - openHour + 1 }, (_, i) => i + openHour);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      {/* Header */}
      <div className="flex flex-col px-4 pt-[58px] pb-0 sticky top-0 z-30" style={{ backgroundColor: C.bg, boxShadow: '0 2px 12px -8px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between mb-3 px-1">
          <button className="flex gap-1.5 items-center p-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.dark }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.dark }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.dark }} />
          </button>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>
            {formatMonth(selectedDate)}
          </span>
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
          {weekDates.map((wd, i) => {
            const isSelected = i === selectedDay;
            const dayBookings = bookings.filter(() => isSelected); // highlight selected
            return (
              <button key={i} onClick={() => { setSelectedDay(i); if (view === 'week') setView('day'); }}
                className="flex-1 flex flex-col items-center gap-0.5 py-1 relative">
                <span style={{ fontSize: 10, fontWeight: 700, color: isSelected ? C.gold : C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{wd.label}</span>
                <div className="flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ width: 32, height: 32, backgroundColor: isSelected ? C.dark : 'transparent', border: isSelected ? `2px solid ${C.gold}` : '2px solid transparent' }}>
                  <span style={{ fontSize: 14, fontWeight: isSelected ? 800 : 500, color: isSelected ? '#FFFFFF' : C.dark }}>{wd.date}</span>
                </div>
                {wd.isToday && !isSelected && <div className="absolute bottom-0 w-1 h-1 rounded-full" style={{ backgroundColor: C.gold }} />}
              </button>
            );
          })}
        </div>

        {/* View toggle */}
        <div className="flex gap-0.5 p-0.5 rounded-[8px] mx-1 mb-2" style={{ backgroundColor: C.subtle }}>
          {(['day', 'week'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className="flex-1 py-1.5 rounded-[6px] capitalize transition-all"
              style={{ fontSize: 11, fontWeight: 700, backgroundColor: view === v ? C.dark : 'transparent', color: view === v ? C.gold : C.muted }}>
              {v} View
            </button>
          ))}
        </div>

        {/* Staff row */}
        {view === 'day' && staff.length > 0 && (
          <div className="flex pl-[44px] -mx-4 overflow-x-hidden" style={{ borderBottom: `1px solid ${C.subtle}` }}>
            {staff.map(s => (
              <div key={s.id} className="flex-1 flex flex-col items-center justify-center pb-2" style={{ minWidth: `${100 / Math.max(staff.length, 1)}%` }}>
                <div className="relative">
                  <Avatar name={s.name} src={s.avatar} size={36} />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: C.green }} />
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: C.dark, letterSpacing: -0.2 }}>{s.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative pb-28" style={{ backgroundColor: '#FFFFFF' }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
            <p style={{ fontSize: 13, fontWeight: 500, color: C.muted, marginTop: 12 }}>Loading calendar...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 12 }}>No appointments</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 4 }}>Nothing scheduled for this day</p>
          </div>
        ) : view === 'day' ? (
          <DayView hours={hours} bookings={bookings} staff={staff} openHour={openHour} onSelect={setSelectedAppt} />
        ) : (
          <WeekView hours={hours} bookings={bookings} openHour={openHour} />
        )}
      </div>

      {/* FAB */}
      <div className="absolute bottom-28 right-5 z-40">
        <button className="w-[52px] h-[52px] rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg" style={{ backgroundColor: C.gold, boxShadow: '0 8px 20px rgba(201,168,76,0.35)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </button>
      </div>

      {/* Detail Sheet */}
      <AnimatePresence>
        {selectedAppt && <AppointmentSheet appt={selectedAppt} staff={staff} date={selectedDate} onClose={() => setSelectedAppt(null)} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Day View ───────────────────────────────────────────────────────

function DayView({ hours, bookings, staff, openHour, onSelect }: {
  hours: number[]; bookings: CalBooking[]; staff: StaffMember[]; openHour: number;
  onSelect: (b: CalBooking) => void;
}) {
  const colCount = Math.max(staff.length, 1);
  const colWidth = 100 / colCount;

  return (
    <div className="flex relative min-h-[800px] w-full">
      <div className="w-[44px] flex-shrink-0 sticky left-0 z-20 flex flex-col pt-2" style={{ backgroundColor: '#FFFFFF', borderRight: `1px solid ${C.subtle}` }}>
        {hours.map(h => (
          <div key={h} className="h-[80px] relative">
            <div className="absolute -top-2.5 right-1.5 flex flex-col items-end leading-none">
              <span style={{ fontSize: 11, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>{h > 12 ? h - 12 : h}:00</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 1 }}>{h >= 12 ? 'pm' : 'am'}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 relative pt-2">
        {hours.map(h => <div key={h} className="h-[80px]" style={{ borderTop: `1px solid ${C.subtle}` }} />)}
        <div className="absolute inset-0 flex top-2 h-full pointer-events-none">
          {staff.map(s => <div key={s.id} className="flex-1" style={{ borderRight: `1px solid ${C.subtle}` }} />)}
        </div>
        {bookings.map(b => {
          const si = staff.findIndex(s => s.id === b.staffId);
          const col = si >= 0 ? si : 0;
          const startH = timeToHours(b.time);
          const dur = b.duration / 60; // duration is in minutes from API
          const top = (startH - openHour) * 80 + 2;
          const h = Math.max(dur * 80, 30);
          return (
            <motion.button key={b.id} whileTap={{ scale: 0.97 }} onClick={() => onSelect(b)}
              className="absolute p-1.5 m-[2px] overflow-hidden flex flex-col rounded-[8px] shadow-sm text-left"
              style={{ top, height: h - 4, left: `${col * colWidth}%`, width: `calc(${colWidth}% - 4px)`, backgroundColor: b.serviceColor || '#6BA3C7' }}>
              <span style={{ fontSize: 8, fontWeight: 800, color: 'rgba(0,0,0,0.45)', lineHeight: 1, letterSpacing: -0.2 }}>
                {fmtTime(startH)} - {fmtTime(startH + dur)}
              </span>
              <span className="truncate" style={{ fontSize: 10, fontWeight: 800, color: 'rgba(0,0,0,0.75)', lineHeight: 1.2, marginTop: 2, letterSpacing: -0.2 }}>{b.customerName}</span>
              {dur >= 0.75 && <span className="truncate" style={{ fontSize: 9, fontWeight: 600, color: 'rgba(0,0,0,0.4)', lineHeight: 1.2 }}>{b.service}</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Week View ──────────────────────────────────────────────────────

function WeekView({ hours, bookings, openHour }: { hours: number[]; bookings: CalBooking[]; openHour: number }) {
  return (
    <div className="flex relative min-h-[700px] w-full">
      <div className="w-[36px] flex-shrink-0 sticky left-0 z-20 flex flex-col pt-2" style={{ backgroundColor: '#FFFFFF', borderRight: `1px solid ${C.subtle}` }}>
        {hours.map(h => (
          <div key={h} className="h-[70px] relative">
            <div className="absolute -top-2 right-1 leading-none">
              <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: -0.3 }}>{h > 12 ? h - 12 : h}</span>
              <span style={{ fontSize: 7, fontWeight: 700, color: C.muted, textTransform: 'uppercase', marginLeft: 1 }}>{h >= 12 ? 'pm' : 'am'}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 relative pt-2">
        {hours.map(h => <div key={h} className="h-[70px]" style={{ borderTop: `1px solid ${C.subtle}` }} />)}
        <div className="absolute inset-0 flex top-2 h-full">
          {Array.from({ length: 7 }, (_, di) => (
            <div key={di} className="flex-1 relative" style={{ borderRight: `1px solid ${C.subtle}` }}>
              {bookings.map((b, bi) => {
                const startH = timeToHours(b.time);
                const dur = b.duration / 60;
                const top = (startH - openHour) * 70;
                const h = Math.max(dur * 70, 20);
                return (
                  <div key={bi} className="absolute left-[2px] right-[2px] rounded-[5px] px-1 py-0.5 overflow-hidden"
                    style={{ top, height: h - 2, backgroundColor: b.serviceColor || '#6BA3C7' }}>
                    <span className="block truncate" style={{ fontSize: 8, fontWeight: 800, color: 'rgba(0,0,0,0.5)', lineHeight: 1 }}>{fmtTime(startH)}</span>
                    {h > 35 && <span className="block truncate" style={{ fontSize: 8, fontWeight: 700, color: 'rgba(0,0,0,0.65)', lineHeight: 1.2, marginTop: 2 }}>{b.customerName.split(' ')[0]}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Appointment Detail Sheet ───────────────────────────────────────

function AppointmentSheet({ appt, staff, date, onClose }: { appt: CalBooking; staff: StaffMember[]; date: string; onClose: () => void }) {
  const staffMember = staff.find(s => s.id === appt.staffId);
  const startH = timeToHours(appt.time);
  const dur = appt.duration / 60;

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/30 z-[200]" />
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 rounded-t-[24px] z-[201] max-h-[75%] overflow-y-auto"
        style={{ backgroundColor: C.bg, boxShadow: '0 -12px 40px rgba(0,0,0,0.1)' }}>
        <div className="flex justify-center pt-3 pb-2"><div className="w-10 h-1 rounded-full" style={{ backgroundColor: C.subtle }} /></div>
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
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: appt.serviceColor || C.subtle }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(0,0,0,0.5)' }}>{appt.customerName.split(' ').map(w => w[0]).join('')}</span>
            </div>
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{appt.customerName}</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>{appt.isNewClient ? 'New Client' : 'Client'}</p>
            </div>
          </div>
        </div>
        {/* Staff */}
        {staffMember && (
          <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
            <div className="flex items-center gap-3">
              <Avatar name={staffMember.name} src={staffMember.avatar} size={40} />
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{staffMember.name}</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>Staff</p>
              </div>
            </div>
          </div>
        )}
        {/* Notes */}
        {appt.notes && (
          <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Note</p>
            <p className="px-3 py-2 rounded-[10px]" style={{ fontSize: 12, fontWeight: 500, color: C.dark, lineHeight: 1.5, backgroundColor: '#FFFFFF', border: `1px solid ${C.subtle}` }}>{appt.notes}</p>
          </div>
        )}
        {/* Time */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Time</p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={C.gold} strokeWidth="1.3" /><path d="M8 5v3l2 2" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" /></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{fmtTime(startH)}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke={C.muted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{fmtTime(startH + dur)}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, color: C.muted, backgroundColor: C.subtle }}>
              {appt.duration >= 60 ? `${Math.floor(appt.duration / 60)}h` : ''}{appt.duration % 60 > 0 ? ` ${appt.duration % 60}m` : ''}
            </span>
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginTop: 6 }}>{formatFullDate(date)}</p>
        </div>
        {/* Price */}
        <div className="px-5 py-3" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <div className="flex items-center justify-between">
            <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>Price</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>£{appt.price}</p>
          </div>
        </div>
        {/* Actions */}
        <div className="px-5 py-4 pb-8 flex gap-2" style={{ borderTop: `1px solid ${C.subtle}` }}>
          <button className="flex-1 py-3 rounded-[12px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform" style={{ backgroundColor: C.dark }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7.5V11a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h3.5" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" /><path d="M10 2l2 2-5 5H5V7l5-5z" stroke={C.gold} strokeWidth="1.3" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>Edit</span>
          </button>
          <button className="flex-1 py-3 rounded-[12px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform shadow-md" style={{ backgroundColor: C.gold, boxShadow: '0 4px 12px rgba(201,168,76,0.3)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>Reschedule</span>
          </button>
        </div>
      </motion.div>
    </>
  );
}
