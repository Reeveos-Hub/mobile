/**
 * ReeveOS Mobile — Profile Screen (Live Data)
 * Uses AuthContext user data + GET /settings/business/{id}
 */
import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import { useApi } from '../lib/useApi';
import { BRAND, FONT } from '../lib/brand';

const C = { bg: '#FFFFFF', dark: BRAND.black, gold: BRAND.gold, goldLight: '#F5EDD6', muted: '#999999', subtle: '#F0F0F0' };

interface BusinessSettings { name?: string; address?: string; phone?: string; email?: string; category?: string; logo?: string; }

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user, businessId, logout } = useAuth();
  const { data: biz } = useApi<BusinessSettings>(businessId ? `/settings/business/${businessId}` : null);

  const initials = (user?.name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const menuItems = [
    { label: 'Business Settings', icon: 'settings', path: '/settings' },
    { label: 'Staff Management', icon: 'users', path: '/services' },
    { label: 'Notification Preferences', icon: 'bell', path: '/notifications' },
    { label: 'Help & Support', icon: 'help', path: '/help' },
  ];

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: C.bg, fontFamily: FONT.family }}>
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1 as any)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: -0.5 }}>Profile</h1>
        </div>

        {/* Avatar + info */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center border-3" style={{ backgroundColor: C.goldLight, borderColor: C.gold, borderWidth: 3 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: C.gold }}>{initials}</span>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.dark, marginTop: 12 }}>{user?.name || 'User'}</h2>
          <p style={{ fontSize: 13, fontWeight: 500, color: C.muted }}>{user?.email}</p>
          <p style={{ fontSize: 11, fontWeight: 600, color: C.gold, marginTop: 4 }}>{user?.role?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
          {biz?.name && <p style={{ fontSize: 12, fontWeight: 600, color: C.dark, marginTop: 4 }}>{biz.name}</p>}
        </div>
      </div>

      <div className="px-5 pb-28">
        <div className="space-y-1.5">
          {menuItems.map(item => (
            <button key={item.label} onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 p-3.5 rounded-[14px] text-left transition-all active:scale-[0.98]" style={{ border: `1px solid ${C.subtle}` }}>
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round">
                  {item.icon === 'settings' && <><circle cx="8" cy="8" r="2.5" /><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2" /></>}
                  {item.icon === 'users' && <><circle cx="8" cy="5" r="2.5" /><path d="M3 14c0-3 2.2-4.5 5-4.5s5 1.5 5 4.5" /></>}
                  {item.icon === 'bell' && <><path d="M12 6a4 4 0 00-8 0c0 5-2 6-2 6h12s-2-1-2-6" /><path d="M9.15 14a1.5 1.5 0 01-2.3 0" /></>}
                  {item.icon === 'help' && <><circle cx="8" cy="8" r="6" /><path d="M6 6a2 2 0 013.5 1.5c0 1.5-2 1.5-2 3" /><circle cx="8" cy="12.5" r="0.5" fill={C.dark} /></>}
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.dark, flex: 1 }}>{item.label}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          ))}
        </div>

        <button onClick={() => { logout(); navigate('/login'); }}
          className="w-full mt-6 py-3.5 rounded-[14px] flex items-center justify-center gap-2 active:scale-[0.97]"
          style={{ border: `1px solid #EF444440`, backgroundColor: '#FEF2F2' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round">
            <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M6 8h8" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#EF4444' }}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
