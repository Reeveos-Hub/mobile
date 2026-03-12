/**
 * ReeveOS Mobile — Services Screen (Live Data)
 * Wired to: GET /services/business/{id}/services
 */
import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0', green: BRAND.success };

interface Service {
  id: string; name: string; price: number; duration: number; category?: string;
  active?: boolean; description?: string; color?: string;
}

export function ServicesScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('All');

  const { data: services, loading } = useApi<Service[]>(
    businessId ? `/services/business/${businessId}/services` : null,
  );

  const allServices = services ?? [];
  const categories = useMemo(() => {
    const cats = new Set(allServices.map(s => s.category || 'Uncategorised'));
    return ['All', ...Array.from(cats)];
  }, [allServices]);

  const filtered = activeTab === 'All' ? allServices : allServices.filter(s => (s.category || 'Uncategorised') === activeTab);
  const activeCount = allServices.filter(s => s.active !== false).length;
  const avgPrice = activeCount > 0 ? Math.round(allServices.filter(s => s.active !== false).reduce((a, s) => a + (s.price || 0), 0) / activeCount) : 0;

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1 as any)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>Services</h1>
        </div>
        {/* Stats bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 px-3 py-2 rounded-[12px]" style={{ backgroundColor: C.subtle }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: C.muted }}>Active</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: C.dark }}>{activeCount}</p>
          </div>
          <div className="flex-1 px-3 py-2 rounded-[12px]" style={{ backgroundColor: C.goldLight }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: C.gold }}>Avg Price</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: C.dark }}>£{avgPrice}</p>
          </div>
        </div>
        {/* Category tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
              style={{ fontSize: 11, fontWeight: 700, backgroundColor: activeTab === cat ? C.dark : C.subtle, color: activeTab === cat ? C.gold : C.muted }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 pb-28">
        {loading ? (
          <div className="flex flex-col items-center py-16">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
            <p style={{ fontSize: 13, fontWeight: 500, color: C.muted, marginTop: 12 }}>Loading services...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 12 }}>No services</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 4 }}>Add services in your dashboard</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-[14px]" style={{ border: `1px solid ${C.subtle}` }}>
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: s.color || C.goldLight }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke={C.dark} strokeWidth="1.2" /><path d="M8 5.5v5M5.5 8h5" stroke={C.dark} strokeWidth="1.2" strokeLinecap="round" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate" style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{s.name}</h4>
                    {s.active === false && <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: 8, fontWeight: 700, color: C.muted, backgroundColor: C.subtle }}>Inactive</span>}
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>{s.duration} min · {s.category || 'Uncategorised'}</p>
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: C.dark }}>£{s.price}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
