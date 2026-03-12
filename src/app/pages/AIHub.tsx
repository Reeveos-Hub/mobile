/**
 * ReeveOS Mobile — AI Hub (Live Data)
 * Uses AuthContext for user name, no hardcoded names
 */
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0', green: BRAND.success };

interface Summary { today: { bookings: number; revenue: number; upcomingBookings: number }; period: { revenue: number }; }

export function AIHub() {
  const navigate = useNavigate();
  const { user, businessId } = useAuth();
  const { data: summary } = useApi<Summary>(businessId ? `/dashboard/business/${businessId}/summary` : null);
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  const quickActions = [
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M2 6h12M5 1v2.5M11 1v2.5" /></svg>, text: 'View schedule' },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round"><circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" /></svg>, text: 'Gap analysis' },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round"><path d="M14 8A6 6 0 112 8a6 6 0 0112 0z" /><path d="M8 5v6M5 8h6" /></svg>, text: 'Add booking' },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round"><line x1="12" y1="14" x2="12" y2="6" /><line x1="8" y1="14" x2="8" y2="2" /><line x1="4" y1="14" x2="4" y2="10" /></svg>, text: 'Revenue report' },
  ];

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-4">
        <h1 style={{ fontSize: 26, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>AI Assistant</h1>
        <p style={{ fontSize: 13, fontWeight: 500, color: C.muted, marginTop: 4 }}>Your smart business companion</p>
      </div>

      <div className="flex-1 px-5 pb-28">
        {/* Greeting card */}
        <div className="p-4 rounded-[16px] mb-4" style={{ backgroundColor: C.dark }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>
            Hey {firstName}! You have <span style={{ color: C.gold }}>{summary?.today.upcomingBookings ?? '...'} upcoming</span> bookings today
            {summary ? ` and £${summary.today.revenue.toFixed(0)} in revenue so far.` : '.'}
          </p>
        </div>

        {/* Quick actions */}
        <h3 style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {quickActions.map((a, i) => (
            <motion.button key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2.5 p-3 rounded-[12px] active:scale-[0.97] transition-transform text-left"
              style={{ border: `1px solid ${C.subtle}` }}>
              <div className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0" style={{ backgroundColor: C.goldLight }}>{a.icon}</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>{a.text}</span>
            </motion.button>
          ))}
        </div>

        {/* Revenue card */}
        {summary && (
          <div className="p-4 rounded-[16px] mb-4" style={{ backgroundColor: C.goldLight }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: 0.5 }}>This Week</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: C.dark, letterSpacing: -1, marginTop: 4 }}>£{summary.period.revenue.toFixed(0)}</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: C.muted, marginTop: 2 }}>Total weekly revenue</p>
          </div>
        )}

        {/* AI chat prompt */}
        <div className="flex items-center gap-3 p-3 rounded-[14px]" style={{ border: `1px solid ${C.subtle}` }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.goldLight }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round">
              <path d="M8 1l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9l-3 1.5.5-3.5L3 4.5 6.5 4z" />
            </svg>
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: C.muted, flex: 1 }}>Ask me anything about your business...</p>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round"><path d="M14 2L2 7l5 2 2 5z" /></svg>
        </div>
      </div>
    </div>
  );
}
