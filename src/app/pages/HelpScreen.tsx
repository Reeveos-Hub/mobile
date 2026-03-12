/**
 * ReeveOS Mobile — Help & Support (Clean)
 */
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0' };

const faqs = [
  { q: 'How do I add a new service?', a: 'Go to Services & Pricing from the menu, then tap the + button to add a new service with name, duration, and price.' },
  { q: 'How do cancellation fees work?', a: 'Booking fees are charged based on your tier: 24hr for basic, 48hr for mid, 72hr for advanced plans. Configure this in Settings.' },
  { q: 'How do I manage my staff?', a: 'Staff management is available in your web dashboard at portal.rezvo.app. You can add staff, set schedules, and assign services.' },
  { q: 'What payment methods are supported?', a: 'ReeveOS supports Stripe Connect for card payments and Dojo for in-person card processing. Tap to Pay with NFC is also available.' },
];

const contactOptions = [
  { label: 'Email Support', desc: 'support@reeveos.app', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M2 3l6 5 6-5" /></svg> },
  { label: 'Help Centre', desc: 'reeveos.app/help', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.gold} strokeWidth="1.3" strokeLinecap="round"><circle cx="8" cy="8" r="6" /><path d="M6 6a2 2 0 013.5 1.5c0 1.5-2 1.5-2 3" /><circle cx="8" cy="12.5" r="0.5" fill={C.gold} /></svg> },
];

export function HelpScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1 as any)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>Help & Support</h1>
        </div>
      </div>
      <div className="flex-1 px-5 pb-28">
        <h3 style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 8 }}>FAQs</h3>
        <div className="space-y-2 mb-6">
          {faqs.map((f, i) => (
            <motion.details key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-[14px] overflow-hidden" style={{ border: `1px solid ${C.subtle}` }}>
              <summary className="p-3 cursor-pointer" style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{f.q}</summary>
              <p className="px-3 pb-3" style={{ fontSize: 12, fontWeight: 500, color: C.muted, lineHeight: 1.5 }}>{f.a}</p>
            </motion.details>
          ))}
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Contact Us</h3>
        <div className="space-y-2">
          {contactOptions.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-[14px]" style={{ border: `1px solid ${C.subtle}` }}>
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: C.goldLight }}>{c.icon}</div>
              <div className="flex-1">
                <p style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{c.label}</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
