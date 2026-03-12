/**
 * ReeveOS Mobile — Dashboard (Live Data)
 *
 * Wired to:
 *   GET /dashboard/business/{id}/summary  → stats, next booking
 *   GET /dashboard/business/{id}/today    → today's booking list
 *
 * All data fetched in-memory only. Nothing cached to browser storage.
 * HIPAA / ICO / GDPR compliant.
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

// ─── Colours (matching original design) ─────────────────────────────

const C = {
  bg: '#FFFFFF',
  dark: BRAND.black,
  gold: BRAND.gold,
  goldLight: '#F5EDD6',
  brownLight: '#F2F2F2',
  subtle: '#F0F0F0',
  muted: '#999999',
  green: BRAND.success,
};

// ─── Types (matching backend response shapes) ───────────────────────

interface DashboardSummary {
  today: {
    date: string;
    bookings: number;
    revenue: number;
    newClients: number;
    completedBookings: number;
    upcomingBookings: number;
    cancelledToday: number;
    noShows: number;
  };
  period: {
    label: string;
    bookings: number;
    revenue: number;
  };
  nextBooking: {
    id: string;
    customerName: string;
    service: string;
    time: string;
    staff: string | null;
  } | null;
}

interface TodayBooking {
  id: string;
  time: string;
  endTime?: string;
  customerName: string;
  service: string;
  staff: string | null;
  status: string;
  isNext: boolean;
}

interface TodayResponse {
  bookings: TodayBooking[];
}

// ─── Helpers ────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getWeekDates() {
  const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();
  const dayOfWeek = today.getDay();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - dayOfWeek + i);
    return {
      day: DAY_LABELS[i],
      date: d.getDate(),
      isToday: i === dayOfWeek,
    };
  });
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function statusColour(status: string): string {
  switch (status) {
    case 'checked_in': case 'completed': return C.green;
    case 'pending': case 'no_show': return C.gold;
    default: return C.dark;
  }
}

// ─── SVG Icons (monochrome branded, no emojis) ─────────────────────

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="2.5" width="11" height="9.5" rx="1.5" stroke={C.gold} strokeWidth="1.2" />
      <path d="M1.5 5.5h11" stroke={C.gold} strokeWidth="1.2" />
      <path d="M4.5 1v2M9.5 1v2" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke={C.gold} strokeWidth="1.2" />
      <path d="M7 4v3.5l2.5 1.5" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5v11M9.5 3.5H5.75a1.75 1.75 0 100 3.5h2.5a1.75 1.75 0 110 3.5H4.5" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="4.5" r="2.5" stroke={C.gold} strokeWidth="1.2" />
      <path d="M2 12.5c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
      <path d="M8 1l2 4.5 5 .7-3.6 3.5.85 5L8 12.5l-4.25 2.2.85-5L1 6.2l5-.7L8 1z" fill={C.gold} />
    </svg>
  );
}

function SmallClockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={C.gold} strokeWidth="1.3" />
      <path d="M8 4v4l2.5 2.5" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Initials avatar — no stock photos, no external URLs */
function Avatar({ name, src, size = 40 }: { name: string; src?: string | null; size?: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  if (src) {
    return (
      <div className="rounded-full overflow-hidden shrink-0 border" style={{ width: size, height: size, borderColor: C.subtle }}>
        <img src={src} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: size, height: size, backgroundColor: C.subtle }}>
      <span style={{ fontSize: size * 0.38, fontWeight: 700, color: C.dark }}>{initials}</span>
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────

export function Dashboard() {
  const navigate = useNavigate();
  const { user, businessId } = useAuth();
  const weekDates = useMemo(() => getWeekDates(), []);
  const todayIndex = weekDates.findIndex(d => d.isToday);
  const [selectedDay, setSelectedDay] = useState(todayIndex >= 0 ? todayIndex : 0);

  const { data: summary, loading: summaryLoading, error: summaryError } = useApi<DashboardSummary>(
    businessId ? `/dashboard/business/${businessId}/summary` : null,
  );

  const { data: todayData, loading: todayLoading } = useApi<TodayResponse>(
    businessId ? `/dashboard/business/${businessId}/today` : null,
  );

  const bookings = todayData?.bookings ?? [];
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  const stats = summary ? [
    { icon: 'calendar' as const, value: `${summary.today.bookings}`, label: 'Bookings today' },
    { icon: 'revenue' as const, value: `£${summary.today.revenue.toFixed(0)}`, label: 'Revenue today' },
    { icon: 'users' as const, value: `${summary.today.newClients}`, label: 'New clients' },
  ] : [];

  // No business linked
  if (!businessId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-20" style={{ backgroundColor: C.bg }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <p style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginTop: 16, textAlign: 'center' }}>No business linked</p>
        <p style={{ fontSize: 13, fontWeight: 500, color: C.muted, marginTop: 6, textAlign: 'center' }}>Log in to reeveos.app to set up your business first.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      {/* Header */}
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2" style={{ borderColor: C.gold }}>
              <Avatar name={user?.name ?? 'User'} src={user?.avatar} size={44} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>{getGreeting()}</p>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>{firstName}</h1>
            </div>
          </div>
          <button onClick={() => navigate('/notifications')} className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <BellIcon />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: C.gold }} />
          </button>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: C.dark, letterSpacing: -0.5, lineHeight: 1.1 }}>Daily Activity</h2>
      </div>

      {/* Week Strip */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between">
          {weekDates.map((wd, i) => {
            const isSelected = i === selectedDay;
            return (
              <button key={i} onClick={() => setSelectedDay(i)} className="flex flex-col items-center gap-1.5 py-2 relative" style={{ width: 40 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, textTransform: 'uppercase' }}>{wd.day}</span>
                <div className="flex items-center justify-center rounded-full transition-all duration-300" style={{ width: 36, height: 36, backgroundColor: isSelected ? C.dark : 'transparent' }}>
                  <span style={{ fontSize: 15, fontWeight: isSelected ? 800 : 500, color: isSelected ? '#FFFFFF' : C.dark }}>{wd.date}</span>
                </div>
                {wd.isToday && <div className="absolute -bottom-0.5 w-1 h-1 rounded-full" style={{ backgroundColor: C.gold }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 space-y-2.5 mb-5">
        {summaryLoading ? (
          <div className="flex justify-center py-4">
            <div className="w-5 h-5 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
          </div>
        ) : summaryError ? (
          <p style={{ fontSize: 12, color: C.muted, textAlign: 'center', padding: '8px 0' }}>Could not load stats</p>
        ) : (
          stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: C.subtle }}>
                <span style={{ display: 'inline-flex', width: 14, height: 14 }}>
                  {stat.icon === 'calendar' && <CalendarIcon />}
                  {stat.icon === 'revenue' && <RevenueIcon />}
                  {stat.icon === 'users' && <UserIcon />}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{stat.value}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.muted }}>{stat.label}</span>
            </motion.div>
          ))
        )}
      </div>

      {/* Action Cards */}
      <div className="px-5 mb-5">
        <div className="flex gap-3">
          <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/ai')} className="flex-1 p-4 flex flex-col justify-between" style={{ borderRadius: 20, backgroundColor: C.goldLight, minHeight: 150 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, lineHeight: 1.2 }}>AI Salon<br />Assistant</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1"><StarIcon /><span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>Pro</span></div>
                <div className="flex items-center gap-1"><SmallClockIcon /><span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>24h</span></div>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, color: C.gold, opacity: 0.7 }}>Smart</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: C.dark, lineHeight: 1 }}>Ask<span style={{ fontSize: 14, fontWeight: 500, color: C.muted, marginLeft: 4 }}>Me</span></p>
            </div>
          </motion.button>

          <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/payment')} className="flex-1 p-4 flex flex-col justify-between" style={{ borderRadius: 20, backgroundColor: C.brownLight, minHeight: 150 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, lineHeight: 1.2 }}>Tap to<br />Pay</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1"><StarIcon /><span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>{summary?.today.upcomingBookings ?? '-'}</span></div>
                <div className="flex items-center gap-1"><SmallClockIcon /><span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>NFC</span></div>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, color: C.gold, opacity: 0.7 }}>{summary?.period.label ?? 'This week'}</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: C.dark, lineHeight: 1 }}>£{summary?.period.revenue?.toFixed(0) ?? '0'}<span style={{ fontSize: 14, fontWeight: 500, color: C.muted, marginLeft: 4 }}>week</span></p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Up Next — real bookings */}
      <div className="px-5 pb-28">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>Up Next</h3>
          <button onClick={() => navigate('/calendar')} style={{ fontSize: 12, fontWeight: 600, color: C.gold }}>See all →</button>
        </div>

        {todayLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
            <p style={{ fontSize: 13, fontWeight: 500, color: C.muted, marginTop: 12 }}>Loading...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center py-10">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 12 }}>No bookings today</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 4 }}>Your schedule is clear</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {bookings.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }} className="flex items-center gap-3 p-3 relative overflow-hidden" style={{ borderRadius: 16, backgroundColor: '#FFFFFF', border: `1px solid ${C.subtle}` }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full" style={{ backgroundColor: statusColour(item.status) }} />
                <div className="ml-1.5"><Avatar name={item.customerName} size={40} /></div>
                <div className="flex-1 min-w-0">
                  <h4 className="truncate" style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{item.customerName}</h4>
                  <p className="truncate" style={{ fontSize: 12, fontWeight: 500, color: C.muted }}>{item.service}</p>
                  {item.staff && <p className="truncate" style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginTop: 2 }}>with {item.staff}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>{item.time}</p>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full mt-0.5" style={{ backgroundColor: `${statusColour(item.status)}15`, fontSize: 9, fontWeight: 700, color: statusColour(item.status) }}>{formatStatus(item.status)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {summary && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4 flex items-center justify-center py-3 px-4" style={{ borderRadius: 14, border: `1px solid ${C.subtle}`, backgroundColor: '#FFFFFF' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: C.muted, textAlign: 'center' }}>
              This week: <span style={{ fontWeight: 700, color: C.dark }}>{summary.period.bookings} bookings</span> · £{summary.period.revenue.toFixed(0)} revenue
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
