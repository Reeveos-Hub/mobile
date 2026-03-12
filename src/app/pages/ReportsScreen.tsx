/**
 * ReeveOS Mobile — Reports (Live Data)
 * Wired to: GET /dashboard/business/{id}/summary
 */
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0', green: BRAND.success };

interface Summary {
  today: { bookings: number; revenue: number; completedBookings: number; cancelledToday: number; noShows: number; newClients: number; };
  period: { label: string; bookings: number; revenue: number; };
}

export function ReportsScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const { data: summary, loading } = useApi<Summary>(businessId ? `/dashboard/business/${businessId}/summary` : null);

  const stats = summary ? [
    { label: 'Bookings Today', value: `${summary.today.bookings}`, color: C.dark },
    { label: 'Revenue Today', value: `£${summary.today.revenue.toFixed(0)}`, color: C.gold },
    { label: 'Completed', value: `${summary.today.completedBookings}`, color: C.green },
    { label: 'Cancelled', value: `${summary.today.cancelledToday}`, color: BRAND.error },
    { label: 'No Shows', value: `${summary.today.noShows}`, color: BRAND.warning },
    { label: 'New Clients', value: `${summary.today.newClients}`, color: BRAND.info },
  ] : [];

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1 as any)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>Reports</h1>
        </div>
      </div>
      <div className="flex-1 px-5 pb-28">
        {loading ? (
          <div className="flex flex-col items-center py-16">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
          </div>
        ) : (
          <>
            {/* Period summary */}
            {summary && (
              <div className="p-4 rounded-[16px] mb-4" style={{ backgroundColor: C.dark }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.gold, textTransform: 'uppercase', letterSpacing: 0.5 }}>{summary.period.label}</p>
                <p style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: -1, marginTop: 4 }}>£{summary.period.revenue.toFixed(0)}</p>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#FFFFFF80', marginTop: 2 }}>{summary.period.bookings} bookings</p>
              </div>
            )}
            {/* Today stats grid */}
            <h3 style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 10, letterSpacing: -0.3 }}>Today</h3>
            <div className="grid grid-cols-2 gap-2">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-[14px]" style={{ border: `1px solid ${C.subtle}` }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.3 }}>{s.label}</p>
                  <p style={{ fontSize: 24, fontWeight: 800, color: s.color, letterSpacing: -0.5, marginTop: 4 }}>{s.value}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
