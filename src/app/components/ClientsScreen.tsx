/**
 * ReeveOS Mobile — Clients Screen (Live Data)
 * Wired to: GET /clients-v2/business/{id}
 */
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0', green: BRAND.success };

interface Client {
  id: string; name: string; email: string; phone: string; avatar?: string | null;
  tags: string[]; totalBookings: number; totalSpent: number; lastVisit?: string | null; source: string;
}
interface ClientsResponse { clients: Client[]; pagination: { total: number }; segments: Record<string, number>; }

function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: size, height: size, backgroundColor: C.subtle }}>
      <span style={{ fontSize: size * 0.38, fontWeight: 700, color: C.dark }}>{initials}</span>
    </div>
  );
}

export function ClientsScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState('all');

  const { data, loading, refetch } = useApi<ClientsResponse>(
    businessId ? `/clients-v2/business/${businessId}?segment=${segment}${search ? `&search=${encodeURIComponent(search)}` : ''}` : null,
  );

  const clients = data?.clients ?? [];
  const total = data?.pagination?.total ?? 0;
  const segments = data?.segments ?? {};

  const segmentTabs = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'returning', label: 'Returning' },
    { key: 'at_risk', label: 'At Risk' },
  ];

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1 as any)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>Clients</h1>
          <span className="ml-auto px-2 py-0.5 rounded-full" style={{ fontSize: 11, fontWeight: 700, color: C.gold, backgroundColor: C.goldLight }}>{total}</span>
        </div>
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-[12px] mb-3" style={{ backgroundColor: C.subtle }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke={C.muted} strokeWidth="1.3" /><path d="M10.5 10.5L14 14" stroke={C.muted} strokeWidth="1.3" strokeLinecap="round" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..."
            className="flex-1 bg-transparent outline-none" style={{ fontSize: 13, fontWeight: 500, color: C.dark }} />
        </div>
        {/* Segment tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {segmentTabs.map(s => (
            <button key={s.key} onClick={() => setSegment(s.key)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
              style={{ fontSize: 11, fontWeight: 700, backgroundColor: segment === s.key ? C.dark : C.subtle, color: segment === s.key ? C.gold : C.muted }}>
              {s.label} {segments[s.key] !== undefined ? `(${segments[s.key]})` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 pb-28">
        {loading ? (
          <div className="flex flex-col items-center py-16">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: C.subtle, borderTopColor: C.gold }} />
            <p style={{ fontSize: 13, fontWeight: 500, color: C.muted, marginTop: 12 }}>Loading clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="7" r="4" /><path d="M5.5 21c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
            </svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, marginTop: 12 }}>No clients yet</p>
            <p style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 4 }}>Clients appear here after their first booking</p>
          </div>
        ) : (
          <div className="space-y-2">
            {clients.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-[14px]" style={{ border: `1px solid ${C.subtle}` }}>
                <Avatar name={c.name} />
                <div className="flex-1 min-w-0">
                  <h4 className="truncate" style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{c.name}</h4>
                  <p className="truncate" style={{ fontSize: 11, fontWeight: 500, color: C.muted }}>{c.phone || c.email || 'No contact'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ fontSize: 10, fontWeight: 600, color: C.muted }}>{c.totalBookings} visits</span>
                    <span style={{ fontSize: 10, color: C.subtle }}>·</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.dark }}>£{c.totalSpent.toFixed(0)}</span>
                    {c.tags.slice(0, 2).map(t => (
                      <span key={t} className="px-1.5 py-0.5 rounded-full" style={{ fontSize: 8, fontWeight: 700, color: C.gold, backgroundColor: C.goldLight }}>{t}</span>
                    ))}
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" /></svg>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
