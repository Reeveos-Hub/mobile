import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { BRAND } from '../lib/brand';

const SLIDE_NAV = [
  { label: 'BOOKINGS', items: [
    { id: 'bookings',      label: 'All Bookings',       route: '/bookings',      badge: null },
    { id: 'notifications', label: 'Notifications',      route: '/notifications', badge: null },
  ]},
  { label: 'BUSINESS', items: [
    { id: 'services', label: 'Services & Pricing',  route: '/services' },
    { id: 'reports',  label: 'Reports & Analytics', route: '/reports'  },
    { id: 'shop',     label: 'Shop & Products',     route: '/shop'     },
  ]},
  { label: 'ACCOUNT', items: [
    { id: 'settings', label: 'Settings',     route: '/settings' },
    { id: 'help',     label: 'Help & Support', route: '/help'   },
  ]},
];

const TABS = [
  { id: 'home',     label: 'Home',     route: '/'         },
  { id: 'calendar', label: 'Calendar', route: '/calendar' },
  { id: 'ai',       label: 'Reeve AI', route: '/ai'       },
  { id: 'clients',  label: 'Clients',  route: '/clients'  },
];

const F = "'Figtree', system-ui, -apple-system, sans-serif";

// ── ICONS ──
const menuIcon = (c = '#565B66') => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
    <line x1="3" y1="6.5" x2="21" y2="6.5"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17.5" x2="21" y2="17.5"/>
  </svg>
);
const bellIcon = (c = '#565B66') => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);
const chevRIcon = (c = '#7D828C') => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const tabIcons: Record<string, (c: string) => React.ReactNode> = {
  home: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/></svg>,
  calendar: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  ai: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><path d="M12 2a4 4 0 014 4v1h1a3 3 0 010 6h-1v1a4 4 0 01-8 0v-1H7a3 3 0 010-6h1V6a4 4 0 014-4z"/></svg>,
  clients: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
};

function Rmark({ size = 28 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.26), background: BRAND.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ color: BRAND.black, fontWeight: 800, fontSize: Math.round(size * 0.38), fontFamily: F, letterSpacing: '-0.02em', lineHeight: 1 }}>R.</span>
    </div>
  );
}

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, businessId, logout } = useAuth();
  const [navOpen, setNavOpen] = useState(false);

  const isAI = location.pathname === '/ai';
  const activeTab = TABS.find(t => t.route === location.pathname)?.id || 'home';

  const userName = (user as any)?.name || 'User';
  const businessName = (user as any)?.business_name || 'My Business';
  const initials = userName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  const handleTab = (route: string) => {
    navigate(route);
    setNavOpen(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, fontFamily: F, overflow: 'hidden' }}>
      <style>{`*::-webkit-scrollbar{display:none} *{-webkit-tap-highlight-color:transparent}`}</style>

      {/* ── SLIDE NAV (sits behind at z-index 0) ── */}
      <div style={{ position: 'absolute', inset: 0, background: '#000000', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '52px 20px 14px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setNavOpen(false)}>
            <Rmark size={32} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FAF7F2', letterSpacing: '-0.02em' }}>{businessName}</div>
              <div style={{ fontSize: 11, color: 'rgba(250,247,242,0.4)', marginTop: 1 }}>{userName}</div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 20px 8px', flexShrink: 0 }} />

        {/* Nav items */}
        <div style={{ flex: 1, overflowY: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', paddingBottom: 8 } as any}>
          {SLIDE_NAV.map(section => (
            <div key={section.label}>
              <div style={{ padding: '10px 20px 3px', fontSize: 10, fontWeight: 700, color: 'rgba(250,247,242,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{section.label}</div>
              {section.items.map((item: any) => (
                <button key={item.id} onClick={() => { navigate(item.route); setNavOpen(false); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 20px', border: 'none', cursor: 'pointer', background: 'transparent' }}>
                  <span style={{ fontSize: 15, fontWeight: 400, color: '#FAF7F2', letterSpacing: '-0.01em', fontFamily: F }}>{item.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {item.badge && (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: BRAND.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: BRAND.black }}>{item.badge}</span>
                      </div>
                    )}
                    {chevRIcon('rgba(250,247,242,0.4)')}
                  </div>
                </button>
              ))}
            </div>
          ))}

          {/* Log out */}
          <div style={{ margin: '20px 20px 0' }}>
            <button onClick={() => logout()} style={{ width: '100%', padding: '12px 0', borderRadius: 10, background: 'rgba(239,68,68,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#EF4444', fontFamily: F }}>Log Out</span>
            </button>
          </div>
        </div>

        {/* User footer */}
        <div style={{ padding: '10px 20px 34px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${BRAND.gold}22`, border: `1px solid ${BRAND.gold}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: BRAND.gold, flexShrink: 0 }}>{initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#FAF7F2' }}>{userName}</div>
            <div style={{ fontSize: 11, color: 'rgba(250,247,242,0.4)' }}>Growth Plan</div>
          </div>
          {chevRIcon('rgba(250,247,242,0.4)')}
        </div>
      </div>

      {/* ── MAIN PANEL (slides right to reveal nav) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: '#FFFFFF',
        transform: navOpen ? 'translateX(74%)' : 'translateX(0)',
        transition: 'transform 380ms cubic-bezier(0.32, 0.72, 0, 1)',
        borderRadius: navOpen ? '20px 0 0 20px' : '0',
        overflow: 'hidden',
        boxShadow: navOpen ? '-10px 0 40px rgba(0,0,0,0.3)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Top bar — hidden on AI screen */}
        {!isAI && (
          <div style={{ height: 52, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderBottom: '1px solid #E5E7EB', paddingTop: 'env(safe-area-inset-top, 0px)' }}>
            <button onClick={() => setNavOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, margin: -8, display: 'flex' }}>
              {menuIcon()}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F9FAFB', borderRadius: 999, padding: '5px 11px', border: '1px solid #E5E7EB' }}>
              <Rmark size={16} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111111' }}>{businessName}</span>
            </div>
            <button onClick={() => navigate('/notifications')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, margin: -8, display: 'flex', position: 'relative' }}>
              {bellIcon()}
              <div style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, borderRadius: '50%', background: BRAND.gold, border: '1.5px solid #FFFFFF' }} />
            </button>
          </div>
        )}

        {/* AI top bar — just hamburger */}
        {isAI && (
          <div style={{ height: 52, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, paddingTop: 'env(safe-area-inset-top, 0px)' }}>
            <button onClick={() => setNavOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, margin: -8, display: 'flex' }}>
              {menuIcon()}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#F9FAFB', borderRadius: 999, padding: '5px 11px', border: '1px solid #E5E7EB' }}>
              <Rmark size={16} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111111' }}>{businessName}</span>
            </div>
            <div style={{ width: 34 }} />
          </div>
        )}

        {/* Page content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </div>

        {/* Bottom tab bar — hidden on AI screen */}
        {!isAI && (
          <div style={{ flexShrink: 0, background: '#111111', display: 'flex', alignItems: 'center', height: 60, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              const iconFn = tabIcons[tab.id];
              return (
                <button key={tab.id} onClick={() => handleTab(tab.route)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', position: 'relative' }}>
                  <div style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }}>{iconFn(isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)')}</div>
                  <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)', letterSpacing: '0.01em' }}>{tab.label}</span>
                  {isActive && <div style={{ position: 'absolute', bottom: 2, width: 3, height: 3, borderRadius: '50%', background: BRAND.gold }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* AI Menu notch */}
        {isAI && (
          <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0c0c0c', border: 'none', borderRadius: '14px 14px 0 0', width: 120, height: 32, cursor: 'pointer', fontFamily: F }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.04em' }}>Menu</span>
            </button>
          </div>
        )}

        {/* Tap-to-close overlay */}
        {navOpen && <div onClick={() => setNavOpen(false)} style={{ position: 'absolute', inset: 0, zIndex: 20, cursor: 'pointer' }} />}
      </div>
    </div>
  );
}
