/**
 * ReeveOS Mobile — Notifications (Live Data)
 * Wired to: GET /notifications/business/{id}
 */
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0' };

interface Notification {
  id?: string; _id?: string; title: string; message: string; category?: string;
  read: boolean; created_at: string; type?: string;
}
interface NotifResponse { notifications: Notification[]; unread_count: number; count: number; }

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function catColor(cat?: string): string {
  switch (cat) {
    case 'booking': return BRAND.gold;
    case 'cancellation': return BRAND.error;
    case 'payment': return BRAND.success;
    default: return BRAND.grey400;
  }
}

export function NotificationsScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const { data, loading } = useApi<NotifResponse>(businessId ? `/notifications/business/${businessId}` : null);

  const notifs = data?.notifications ?? [];
  const unread = data?.unread_count ?? 0;

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1 as any)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>Notifications</h1>
          {unread > 0 && <span className="ml-auto px-2 py-0.5 rounded-full" style={{ fontSize: 11, fontWeight: 700, color: '#fff', backgroundColor: BRAND.error }}>{unread}</span>}
        </div>
      </div>
      <div className="flex-1 px-5 pb-28">
        {loading ? (
          <div className="flex flex-col items-center py-16">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
          </div>
        ) : notifs.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 12 }}>All caught up</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 4 }}>No new notifications</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifs.map((n, i) => {
              const color = catColor(n.category);
              return (
                <motion.div key={n.id || n._id || i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex items-start gap-3 p-3.5 rounded-[14px] relative" style={{ border: `1px solid ${C.subtle}`, backgroundColor: n.read ? C.bg : `${C.goldLight}40` }}>
                  {!n.read && <div className="absolute top-4 left-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.gold }} />}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${color}15` }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.3" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{n.title}</h4>
                    <p className="line-clamp-2" style={{ fontSize: 11, fontWeight: 500, color: C.muted, marginTop: 2 }}>{n.message}</p>
                    <p style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginTop: 4 }}>{timeAgo(n.created_at)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
