import React, { useState } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { useApi } from './lib/useApi';
import { BRAND } from './lib/brand';

// ── EXACT TOKENS FROM theme.js ──
const T = {
  black: '#111111', gold: '#C9A84C', goldFaint: '#F8F0DC',
  white: '#FFFFFF', textPrimary: '#111111', textSecondary: '#374151',
  textMuted: '#565B66', textLight: '#7D828C',
  bgPage: '#FFFFFF', bgSubtle: '#F9FAFB', bgMuted: '#F3F4F6',
  borderLight: '#E5E7EB', sidebarBg: '#000000',
  sidebarText: '#FAF7F2', sidebarMuted: 'rgba(250,247,242,0.4)',
  statusSuccess: '#22C55E', statusWarning: '#F59E0B', statusError: '#EF4444',
};
const F = "'Figtree', system-ui, -apple-system, sans-serif";

const TABS = [
  { id: 'home', label: 'Home', route: '/' },
  { id: 'calendar', label: 'Calendar', route: '/calendar' },
  { id: 'ai', label: 'Reeve AI', route: '/ai' },
  { id: 'clients', label: 'Clients', route: '/clients' },
];
const SLIDE_NAV = [
  { label: 'BOOKINGS', items: [
    { id: 'bookings', label: 'All Bookings', badge: null },
    { id: 'notifications', label: 'Notifications', badge: null },
  ]},
  { label: 'BUSINESS', items: [
    { id: 'services', label: 'Services & Pricing' },
    { id: 'reports', label: 'Reports & Analytics' },
    { id: 'shop', label: 'Shop & Products' },
  ]},
  { label: 'ACCOUNT', items: [
    { id: 'settings', label: 'Settings' },
    { id: 'help', label: 'Help & Support' },
  ]},
];

// ── ICONS ──
const Ic = {
  menu: (c = T.textMuted) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round"><line x1="3" y1="6.5" x2="21" y2="6.5"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17.5" x2="21" y2="17.5"/></svg>,
  bell: (c = T.textMuted) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  chevR: (c = T.textLight) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
  back: (c = T.textMuted) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
  mic: (c = T.textLight) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  plus: (c = T.textLight) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  search: (c = T.textLight) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.statusError} strokeWidth="1.6" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  tabHome: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>,
  tabCal: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  tabAI: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><path d="M12 2a4 4 0 014 4v1h1a3 3 0 010 6h-1v1a4 4 0 01-8 0v-1H7a3 3 0 010-6h1V6a4 4 0 014-4z"/></svg>,
  tabClients: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
};
const TAB_ICONS: Record<string, (c: string) => React.ReactNode> = {
  home: Ic.tabHome, calendar: Ic.tabCal, ai: Ic.tabAI, clients: Ic.tabClients,
};

function Rmark({ size = 28 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.26), background: T.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ color: T.black, fontWeight: 800, fontSize: Math.round(size * 0.38), fontFamily: F, letterSpacing: '-0.02em', lineHeight: 1 }}>R.</span>
    </div>
  );
}

// ── LOGIN SCREEN ──
function LoginScreen() {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    await login(email, password);
  };

  return (
    <div style={{ minHeight: '100vh', background: T.black, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', fontFamily: F }}>
      <div style={{ marginBottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Rmark size={56} />
        <div style={{ fontSize: 22, fontWeight: 700, color: T.white, letterSpacing: '-0.02em' }}>ReeveOS</div>
        <div style={{ fontSize: 14, color: T.sidebarMuted }}>Sign in to your business</div>
      </div>
      <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: T.white, fontSize: 15, fontFamily: F, outline: 'none', boxSizing: 'border-box' }}
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: T.white, fontSize: 15, fontFamily: F, outline: 'none', boxSizing: 'border-box' }}
        />
        {error && <div style={{ fontSize: 13, color: T.statusError, textAlign: 'center' }}>{error}</div>}
        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '14px 0', borderRadius: 12, background: T.gold, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700, color: T.black, fontFamily: F, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}

// ── SHARED PAGE WRAPPER ──
function PageWrapper({ title, onBack, children }: { title: string; onBack: () => void; children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 48, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${T.borderLight}`, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, margin: -8, display: 'flex' }}>{Ic.back()}</button>
        <span style={{ fontSize: 16, fontWeight: 700, color: T.textPrimary, letterSpacing: '-0.02em' }}>{title}</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' } as any}>{children}</div>
    </div>
  );
}

// ── HOME SCREEN ──
function HomeScreen({ businessId, userName }: { businessId: string | null; userName: string }) {
  const { data: summary } = useApi<any>(businessId ? `/dashboard/business/${businessId}/summary` : null);
  const { data: bookings } = useApi<any[]>(businessId ? `/bookings/business/${businessId}/today` : null);
  const sc: Record<string, string> = { confirmed: T.statusSuccess, pending: T.statusWarning, cancelled: T.statusError };
  const today = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ flex: 1, overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', paddingBottom: 8 } as any}>
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ fontSize: 11, color: T.textLight, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{today}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: T.textPrimary, letterSpacing: '-0.025em', marginTop: 2 }}>{greeting}, {userName}</div>
      </div>
      <div style={{ display: 'flex', gap: 10, padding: '0 16px 14px' }}>
        {[
          { label: 'Today', value: summary ? `£${(summary.today?.revenue || 0).toFixed(0)}` : '—', sub: `${summary?.today?.bookings || 0} bookings` },
          { label: 'This week', value: summary ? `£${(summary.week?.revenue || 0).toFixed(0)}` : '—', sub: 'Revenue' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: T.bgPage, borderRadius: 12, padding: '12px 14px', border: `1px solid ${T.borderLight}` }}>
            <div style={{ fontSize: 11, color: T.textLight, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.textPrimary, letterSpacing: '-0.03em' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: T.textLight, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 16px 14px', background: T.goldFaint, borderRadius: 12, padding: '10px 14px', border: `1px solid ${T.gold}25`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 9, background: T.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: T.black }}>R.</span>
        </div>
        <div style={{ flex: 1, fontSize: 12.5, color: T.textPrimary, fontWeight: 500, lineHeight: 1.4 }}>Ask Reeve AI anything about your business</div>
      </div>
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.textPrimary, marginBottom: 10 }}>Today's bookings</div>
        {bookings && bookings.length > 0 ? (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
            {bookings.map((b: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderBottom: i < bookings.length - 1 ? `1px solid ${T.borderLight}` : 'none' }}>
                <div style={{ fontSize: 11, color: T.textLight, fontWeight: 600, minWidth: 36 }}>{b.time || b.start_time?.slice(11, 16)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: T.textPrimary }}>{b.client_name || b.client?.name}</div>
                  <div style={{ fontSize: 12, color: T.textLight, marginTop: 1 }}>{b.service_name || b.service?.name}</div>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: `${sc[b.status] || T.statusSuccess}15`, color: sc[b.status] || T.statusSuccess, textTransform: 'capitalize' as const }}>{b.status}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, padding: '24px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 13, color: T.textLight }}>No bookings today</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CALENDAR SCREEN ──
function CalendarScreen({ businessId }: { businessId: string | null }) {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const { data: bookings } = useApi<any[]>(businessId ? `/bookings/business/${businessId}/date/${selectedDay.toISOString().slice(0, 10)}` : null);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - d.getDay() + i); return d;
  });
  const colors = [T.gold, '#6BA3C7', '#A87BBF', '#6BC7A3'];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', padding: '8px 12px 10px', gap: 4, flexShrink: 0, borderBottom: `1px solid ${T.borderLight}` }}>
        {weekDates.map((d, i) => {
          const isSelected = d.toDateString() === selectedDay.toDateString();
          return (
            <div key={i} onClick={() => setSelectedDay(new Date(d))} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '7px 2px', borderRadius: 10, background: isSelected ? T.black : 'transparent', cursor: 'pointer' }}>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: isSelected ? 'rgba(255,255,255,0.5)' : T.textLight, textTransform: 'uppercase' as const }}>{days[d.getDay()]}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: isSelected ? T.white : T.textPrimary }}>{d.getDate()}</div>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', padding: '10px 14px 8px' } as any}>
        {bookings && bookings.length > 0 ? (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
            {bookings.map((b: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '11px 14px', borderBottom: i < bookings.length - 1 ? `1px solid ${T.borderLight}` : 'none', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 11, color: T.textLight, fontWeight: 600, minWidth: 36, paddingTop: 2 }}>{b.time || b.start_time?.slice(11, 16)}</div>
                <div style={{ flex: 1, borderLeft: `3px solid ${colors[i % colors.length]}`, paddingLeft: 10 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: T.textPrimary }}>{b.client_name || b.client?.name}</div>
                  <div style={{ fontSize: 12, color: T.textLight, marginTop: 1 }}>{b.service_name || b.service?.name}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, padding: '24px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 13, color: T.textLight }}>No bookings on this day</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── AI SCREEN ──
function AIScreen({ onMenu }: { onMenu: () => void }) {
  const suggestions = ['How\'s today looking?', 'Any cancellations this week?', 'What\'s my revenue this month?', 'Draft a reminder for tomorrow'];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px 16px' }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: T.goldFaint, border: `1px solid ${T.gold}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 19, fontWeight: 800, color: T.gold, fontFamily: F }}>R.</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 300, color: T.textPrimary, textAlign: 'center' as const, lineHeight: 1.35, letterSpacing: '-0.025em' }}>
          How can I help you<br /><span style={{ color: T.gold, fontWeight: 500 }}>this morning?</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%', marginTop: 28 }}>
          {suggestions.map(s => (
            <button key={s} style={{ background: T.bgSubtle, border: `1px solid ${T.borderLight}`, borderRadius: 10, padding: '10px 13px', textAlign: 'left' as const, cursor: 'pointer', fontSize: 13, color: T.textMuted, fontFamily: F, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {s}{Ic.chevR(T.gold)}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 12px 10px', flexShrink: 0 }}>
        <div style={{ background: T.bgSubtle, borderRadius: 16, border: `1px solid ${T.borderLight}`, padding: '12px 14px 10px' }}>
          <div style={{ fontSize: 14, color: T.textLight, fontFamily: F, marginBottom: 10 }}>Ask Reeve AI...</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>{Ic.plus()}</button>
            <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
              {Ic.mic()}
              <button style={{ width: 30, height: 30, borderRadius: '50%', background: T.black, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="9" viewBox="0 0 26 14" fill="none" stroke={T.white} strokeWidth="2" strokeLinecap="round"><path d="M1 7 Q4 1 7 7 Q10 13 13 7 Q16 1 19 7 Q22 13 25 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        <button onClick={onMenu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0c0c0c', border: 'none', borderRadius: '14px 14px 0 0', width: 120, height: 32, cursor: 'pointer', fontFamily: F }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.white, letterSpacing: '0.04em' }}>Menu</span>
        </button>
      </div>
    </div>
  );
}

// ── CLIENTS SCREEN ──
function ClientsScreen({ businessId }: { businessId: string | null }) {
  const { data: clients } = useApi<any[]>(businessId ? `/clients/business/${businessId}` : null);

  return (
    <div style={{ flex: 1, overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', paddingBottom: 8 } as any}>
      <div style={{ padding: '12px 16px 8px' }}>
        <div style={{ background: T.bgSubtle, borderRadius: 12, border: `1px solid ${T.borderLight}`, padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          {Ic.search()}<span style={{ fontSize: 14, color: T.textLight, fontFamily: F }}>Search clients...</span>
        </div>
      </div>
      <div style={{ padding: '4px 16px' }}>
        {clients && clients.length > 0 ? (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
            {clients.slice(0, 30).map((c: any, i: number) => {
              const name = c.name || c.first_name + ' ' + c.last_name;
              const ini = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderBottom: i < clients.length - 1 ? `1px solid ${T.borderLight}` : 'none', cursor: 'pointer' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: T.goldFaint, border: `1px solid ${T.gold}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: T.gold, flexShrink: 0 }}>{ini}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: T.textPrimary }}>{name}</div>
                    <div style={{ fontSize: 12, color: T.textLight, marginTop: 1 }}>{c.email || c.phone || ''}</div>
                  </div>
                  {Ic.chevR()}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, padding: '24px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 13, color: T.textLight }}>No clients yet</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── BOOKINGS PAGE ──
function BookingsPage({ businessId, onBack }: { businessId: string | null; onBack: () => void }) {
  const { data: bookings } = useApi<any[]>(businessId ? `/bookings/business/${businessId}?limit=50` : null);
  const sc: Record<string, string> = { confirmed: T.statusSuccess, pending: T.statusWarning, cancelled: T.statusError };
  return (
    <PageWrapper title="All Bookings" onBack={onBack}>
      <div style={{ padding: '12px 16px' }}>
        {bookings && bookings.length > 0 ? (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
            {bookings.map((b: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderBottom: i < bookings.length - 1 ? `1px solid ${T.borderLight}` : 'none' }}>
                <div style={{ fontSize: 11, color: T.textLight, fontWeight: 600, minWidth: 36 }}>{(b.time || b.start_time?.slice(11, 16))}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: T.textPrimary }}>{b.client_name || b.client?.name}</div>
                  <div style={{ fontSize: 12, color: T.textLight, marginTop: 1 }}>{b.service_name || b.service?.name}</div>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: `${sc[b.status] || T.statusSuccess}15`, color: sc[b.status] || T.statusSuccess, textTransform: 'capitalize' as const }}>{b.status}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, padding: '24px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 13, color: T.textLight }}>No bookings found</div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

// ── SERVICES PAGE ──
function ServicesPage({ businessId, onBack }: { businessId: string | null; onBack: () => void }) {
  const { data: services } = useApi<any[]>(businessId ? `/services/business/${businessId}` : null);
  return (
    <PageWrapper title="Services & Pricing" onBack={onBack}>
      <div style={{ padding: '12px 16px' }}>
        {services && services.length > 0 ? (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
            {services.map((s: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderBottom: i < services.length - 1 ? `1px solid ${T.borderLight}` : 'none', cursor: 'pointer' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: T.textLight, marginTop: 1 }}>{s.duration} min</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.textPrimary }}>£{s.price}</div>
                {Ic.chevR()}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, padding: '24px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 13, color: T.textLight }}>No services found</div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

// ── NOTIFICATIONS PAGE ──
function NotificationsPage({ businessId, onBack }: { businessId: string | null; onBack: () => void }) {
  const { data: notifs } = useApi<any>(businessId ? `/notifications/business/${businessId}?limit=30` : null);
  const items = notifs?.notifications || notifs || [];
  return (
    <PageWrapper title="Notifications" onBack={onBack}>
      <div style={{ padding: '12px 16px' }}>
        {items.length > 0 ? (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
            {items.map((n: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderBottom: i < items.length - 1 ? `1px solid ${T.borderLight}` : 'none', background: !n.read ? `${T.gold}06` : 'transparent' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: !n.read ? T.gold : 'transparent', flexShrink: 0, marginTop: 5 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: !n.read ? 700 : 500, color: T.textPrimary }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2, lineHeight: 1.4 }}>{n.message || n.body}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, padding: '24px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 13, color: T.textLight }}>No notifications</div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

// ── REPORTS PAGE ──
function ReportsPage({ businessId, onBack }: { businessId: string | null; onBack: () => void }) {
  const { data: analytics } = useApi<any>(businessId ? `/analytics/business/${businessId}/overview` : null);
  return (
    <PageWrapper title="Reports & Analytics" onBack={onBack}>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'This month', value: analytics ? `£${(analytics.revenue?.month || 0).toFixed(0)}` : '—' },
            { label: 'Total bookings', value: analytics?.bookings?.month || '—' },
            { label: 'Avg booking', value: analytics ? `£${(analytics.avg_booking_value || 0).toFixed(0)}` : '—' },
            { label: 'Clients', value: analytics?.clients?.total || '—' },
          ].map(s => (
            <div key={s.label} style={{ background: T.bgPage, borderRadius: 12, padding: '12px 14px', border: `1px solid ${T.borderLight}` }}>
              <div style={{ fontSize: 11, color: T.textLight, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: T.textPrimary, letterSpacing: '-0.03em' }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

// ── SETTINGS PAGE ──
function SettingsPage({ onBack }: { onBack: () => void }) {
  const { user, logout } = useAuth();
  return (
    <PageWrapper title="Settings" onBack={onBack}>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden', marginBottom: 20 }}>
          {[
            { label: 'Name', value: user?.name || '—' },
            { label: 'Email', value: user?.email || '—' },
            { label: 'Role', value: user?.role || '—' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: i < 2 ? `1px solid ${T.borderLight}` : 'none' }}>
              <span style={{ fontSize: 13.5, color: T.textMuted }}>{r.label}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: T.textPrimary }}>{r.value}</span>
            </div>
          ))}
        </div>
        <button onClick={() => logout()} style={{ width: '100%', padding: '13px 0', borderRadius: 12, background: `${T.statusError}12`, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: T.statusError, fontFamily: F }}>
          Log Out
        </button>
      </div>
    </PageWrapper>
  );
}

// ── HELP PAGE ──
function HelpPage({ onBack }: { onBack: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'How do I add a new appointment?', a: 'Tap the Calendar tab then tap any empty time slot.' },
    { q: 'How do I send a client reminder?', a: 'Tap a booking and select Send Reminder, or use Reeve AI.' },
    { q: 'How do I add a new service?', a: 'Go to Services & Pricing in the menu and tap Add Service.' },
    { q: 'How do I view my revenue?', a: 'Go to Reports & Analytics in the menu.' },
    { q: 'How do I update my booking link?', a: 'Manage your booking link from the web portal.' },
  ];
  return (
    <PageWrapper title="Help & Support" onBack={onBack}>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${T.borderLight}` : 'none' }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' as const }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: T.textPrimary, flex: 1, paddingRight: 10 }}>{f.q}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.textLight} strokeWidth="2" strokeLinecap="round" style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 200ms', flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {open === i && <div style={{ padding: '0 14px 13px', fontSize: 13, color: T.textMuted, lineHeight: 1.5 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

// ── SHOP PAGE ──
function ShopPage({ businessId, onBack }: { businessId: string | null; onBack: () => void }) {
  const { data: products } = useApi<any[]>(businessId ? `/shop/business/${businessId}/products` : null);
  return (
    <PageWrapper title="Shop & Products" onBack={onBack}>
      <div style={{ padding: '12px 16px' }}>
        {products && products.length > 0 ? (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, overflow: 'hidden' }}>
            {products.map((p: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', borderBottom: i < products.length - 1 ? `1px solid ${T.borderLight}` : 'none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: T.textLight, marginTop: 1 }}>{p.stock !== undefined ? `${p.stock} in stock` : ''}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.textPrimary }}>£{p.price}</div>
                {Ic.chevR()}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: T.bgPage, borderRadius: 14, border: `1px solid ${T.borderLight}`, padding: '24px 16px', textAlign: 'center' as const }}>
            <div style={{ fontSize: 13, color: T.textLight }}>No products yet</div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

// ── MAIN APP (authenticated) ──
function MainApp() {
  const { user, businessId, logout } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activePage, setActivePage] = useState<string | null>(null);

  const userName = user?.name?.split(' ')[0] || 'there';
  const isAI = activeTab === 'ai' && !activePage;

  const handleNav = (id: string) => { setActivePage(id); setNavOpen(false); };
  const handleTab = (id: string) => { setActiveTab(id); setActivePage(null); setNavOpen(false); };

  return (
    <div style={{ position: 'fixed', inset: 0, fontFamily: F, overflow: 'hidden' }}>
      <style>{`*::-webkit-scrollbar{display:none}*{-webkit-tap-highlight-color:transparent}`}</style>

      {/* SLIDE NAV — sits behind */}
      <div style={{ position: 'absolute', inset: 0, background: T.sidebarBg, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '52px 20px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setNavOpen(false)}>
            <Rmark size={32} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.sidebarText, letterSpacing: '-0.02em' }}>{user?.name || 'My Business'}</div>
              <div style={{ fontSize: 11, color: T.sidebarMuted, marginTop: 1 }}>{user?.email}</div>
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 20px 8px', flexShrink: 0 }} />
        <div style={{ flex: 1, overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', paddingBottom: 8 } as any}>
          {SLIDE_NAV.map(section => (
            <div key={section.label}>
              <div style={{ padding: '10px 20px 3px', fontSize: 10, fontWeight: 700, color: T.sidebarMuted, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{section.label}</div>
              {section.items.map((item: any) => (
                <button key={item.id} onClick={() => handleNav(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 20px', border: 'none', cursor: 'pointer', background: 'transparent' }}>
                  <span style={{ fontSize: 15, fontWeight: 400, color: T.sidebarText, fontFamily: F }}>{item.label}</span>
                  {Ic.chevR(T.sidebarMuted)}
                </button>
              ))}
            </div>
          ))}
          <div style={{ margin: '20px 20px 0' }}>
            <button onClick={() => logout()} style={{ width: '100%', padding: '12px 0', borderRadius: 10, background: 'rgba(239,68,68,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {Ic.logout()}
              <span style={{ fontSize: 14, fontWeight: 600, color: T.statusError, fontFamily: F }}>Log Out</span>
            </button>
          </div>
        </div>
        <div style={{ padding: '10px 20px 34px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${T.gold}22`, border: `1px solid ${T.gold}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: T.gold }}>{userName[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.sidebarText }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: T.sidebarMuted }}>Growth Plan</div>
          </div>
        </div>
      </div>

      {/* MAIN PANEL — slides right */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10, background: T.bgPage,
        transform: navOpen ? 'translateX(74%)' : 'translateX(0)',
        transition: 'transform 380ms cubic-bezier(0.32, 0.72, 0, 1)',
        borderRadius: navOpen ? '20px 0 0 20px' : '0',
        overflow: 'hidden',
        boxShadow: navOpen ? '-10px 0 40px rgba(0,0,0,0.3)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Top bar */}
        <div style={{ height: 52, padding: '0 16px', paddingTop: 'env(safe-area-inset-top, 0px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: activePage ? `1px solid ${T.borderLight}` : isAI ? 'none' : `1px solid ${T.borderLight}` }}>
          <button onClick={() => setNavOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, margin: -8, display: 'flex' }}>{Ic.menu()}</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: T.bgSubtle, borderRadius: 999, padding: '5px 11px', border: `1px solid ${T.borderLight}` }}>
            <Rmark size={16} />
            <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{user?.name?.split(' ')[0] || 'ReeveOS'}</span>
          </div>
          <button onClick={() => handleNav('notifications')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, margin: -8, display: 'flex', position: 'relative' }}>
            {Ic.bell()}
            <div style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, borderRadius: '50%', background: T.gold, border: `1.5px solid ${T.bgPage}` }} />
          </button>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {!activePage && activeTab === 'home'     && <HomeScreen businessId={businessId} userName={userName} />}
          {!activePage && activeTab === 'calendar' && <CalendarScreen businessId={businessId} />}
          {!activePage && activeTab === 'ai'       && <AIScreen onMenu={() => handleTab('home')} />}
          {!activePage && activeTab === 'clients'  && <ClientsScreen businessId={businessId} />}
          {activePage === 'bookings'      && <BookingsPage businessId={businessId} onBack={() => setActivePage(null)} />}
          {activePage === 'notifications' && <NotificationsPage businessId={businessId} onBack={() => setActivePage(null)} />}
          {activePage === 'services'      && <ServicesPage businessId={businessId} onBack={() => setActivePage(null)} />}
          {activePage === 'reports'       && <ReportsPage businessId={businessId} onBack={() => setActivePage(null)} />}
          {activePage === 'shop'          && <ShopPage businessId={businessId} onBack={() => setActivePage(null)} />}
          {activePage === 'settings'      && <SettingsPage onBack={() => setActivePage(null)} />}
          {activePage === 'help'          && <HelpPage onBack={() => setActivePage(null)} />}
        </div>

        {/* Bottom tab bar — hidden on AI and sub-pages */}
        {!activePage && !isAI && (
          <div style={{ flexShrink: 0, background: T.black, display: 'flex', alignItems: 'center', height: 60, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => handleTab(tab.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', position: 'relative' }}>
                  <div style={{ color: isActive ? T.white : 'rgba(255,255,255,0.4)' }}>{TAB_ICONS[tab.id](isActive ? T.white : 'rgba(255,255,255,0.4)')}</div>
                  <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? T.white : 'rgba(255,255,255,0.4)', letterSpacing: '0.01em' }}>{tab.label}</span>
                  {isActive && <div style={{ position: 'absolute', bottom: 2, width: 3, height: 3, borderRadius: '50%', background: T.gold }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* AI Menu notch */}
        {!activePage && isAI && (
          <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            <button onClick={() => handleTab('home')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0c0c0c', border: 'none', borderRadius: '14px 14px 0 0', width: 120, height: 32, cursor: 'pointer', fontFamily: F }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.white, letterSpacing: '0.04em' }}>Menu</span>
            </button>
          </div>
        )}

        {navOpen && <div onClick={() => setNavOpen(false)} style={{ position: 'absolute', inset: 0, zIndex: 20, cursor: 'pointer' }} />}
      </div>
    </div>
  );
}

// ── ROOT ──
function Root() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: T.black, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Rmark size={48} />
      </div>
    );
  }

  return isAuthenticated ? <MainApp /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
