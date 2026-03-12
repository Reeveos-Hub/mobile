/**
 * ReeveOS Mobile — Settings (Live Data)
 * Wired to: GET /settings/business/{id}
 */
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0' };

interface BizSettings {
  name?: string; slug?: string; bookingUrl?: string;
  smsReminders?: boolean; emailReceipts?: boolean; onlineBooking?: boolean;
  depositRequired?: boolean; autoConfirm?: boolean; cancellationPolicy?: string;
  waitlist?: boolean; openingHours?: Record<string, { open: string; close: string; closed?: boolean }>;
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="relative w-10 h-[22px] rounded-full transition-colors duration-300 shrink-0"
      style={{ backgroundColor: on ? C.gold : '#E5E7EB' }}>
      <motion.div animate={{ x: on ? 18 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm" />
    </button>
  );
}

export function SettingsScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const { data: biz, loading } = useApi<BizSettings>(businessId ? `/settings/business/${businessId}` : null);

  // Local toggle state (initialised from API, changes not persisted yet — read-only demo)
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const getToggle = (key: string, apiVal?: boolean) => overrides[key] ?? apiVal ?? false;
  const toggle = (key: string) => setOverrides(prev => ({ ...prev, [key]: !getToggle(key, (biz as any)?.[key]) }));

  const bookingUrl = biz?.bookingUrl || (biz?.slug ? `portal.rezvo.app/book/${biz.slug}` : 'portal.rezvo.app/book/');

  const sections = [
    { title: 'NOTIFICATIONS', items: [
      { key: 'smsReminders', label: 'SMS Reminders', sub: '24hrs before appointment', val: biz?.smsReminders },
      { key: 'emailReceipts', label: 'Email Receipts', sub: 'Auto-send after payment', val: biz?.emailReceipts },
    ]},
    { title: 'BOOKING', items: [
      { key: 'onlineBooking', label: 'Online Booking', sub: 'Clients book via your link', val: biz?.onlineBooking },
      { key: 'depositRequired', label: 'Require Booking Fee', sub: 'Upfront for new clients', val: biz?.depositRequired },
      { key: 'autoConfirm', label: 'Auto-Confirm', sub: 'Skip manual approval', val: biz?.autoConfirm },
      { key: 'waitlist', label: 'Waitlist', sub: 'Auto-fill cancelled slots', val: biz?.waitlist },
    ]},
  ];

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1 as any)} className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <p style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>App Settings</p>
        </div>
      </div>
      <div className="flex-1 px-5 pt-4 pb-28 space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
          </div>
        ) : (
          <>
            {sections.map((section, si) => (
              <motion.div key={section.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.06 }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: '#BBB', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, paddingLeft: 2 }}>{section.title}</p>
                <div className="bg-white rounded-[14px] overflow-hidden divide-y divide-[#F8F8F8]" style={{ border: `1px solid ${C.subtle}` }}>
                  {section.items.map(item => (
                    <div key={item.key} className="flex items-center gap-3 px-3.5 py-2.5">
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{item.label}</p>
                        <p style={{ fontSize: 10, fontWeight: 500, color: '#BBB', marginTop: 2 }}>{item.sub}</p>
                      </div>
                      <Toggle on={getToggle(item.key, item.val)} onToggle={() => toggle(item.key)} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Booking Link */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: '#BBB', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, paddingLeft: 2 }}>BOOKING LINK</p>
              <div className="bg-white rounded-[14px] p-3.5" style={{ border: `1px solid ${C.subtle}` }}>
                <p style={{ fontSize: 10, fontWeight: 500, color: '#BBB', marginBottom: 6 }}>Your public booking URL</p>
                <div className="flex items-center gap-2 rounded-[10px] px-3 py-2" style={{ backgroundColor: '#FAFAFA', border: `1px solid #EAEAEC` }}>
                  <p className="flex-1 truncate" style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>{bookingUrl}</p>
                  <button onClick={() => navigator.clipboard?.writeText(`https://${bookingUrl}`)} style={{ fontSize: 10, fontWeight: 800, color: C.gold }}>Copy</button>
                </div>
              </div>
            </motion.div>

            {/* Business name */}
            {biz?.name && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: '#BBB', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, paddingLeft: 2 }}>BUSINESS</p>
                <div className="bg-white rounded-[14px] p-3.5" style={{ border: `1px solid ${C.subtle}` }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{biz.name}</p>
                </div>
              </motion.div>
            )}

            {/* Danger Zone */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: '#EF444490', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, paddingLeft: 2 }}>DANGER ZONE</p>
              <div className="bg-white rounded-[14px] overflow-hidden divide-y divide-[#FEF2F2]" style={{ border: '1px solid #FEE2E2' }}>
                {['Clear Notifications', 'Delete Client Data', 'Delete Account'].map(label => (
                  <button key={label} className="w-full px-3.5 py-2.5 text-left" style={{ fontSize: 12, fontWeight: 700, color: '#EF4444' }}>{label}</button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
