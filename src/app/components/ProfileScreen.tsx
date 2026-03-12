import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const C = {
  bg: "#FFFFFF",
  dark: "#111111",
  gold: "#C9A84C",
  goldLight: "#F5EDD6",
  muted: "#999999",
  subtle: "#F0F0F0",
  green: "#6BAF7C",
};

const sections = [
  {
    title: "ACCOUNT",
    items: [
      { label: "Edit Profile", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3.5" stroke={C.dark} strokeWidth="1.3" /><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" /></svg> },
      { label: "Notification Preferences", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 00-5 5v3l-1.2 2.5h14.4L16 10V7a5 5 0 00-5-5z" stroke={C.dark} strokeWidth="1.3" /><path d="M7 14.5a2 2 0 004 0" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" /></svg> },
      { label: "Security & Privacy", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="4" y="8" width="10" height="8" rx="2" stroke={C.dark} strokeWidth="1.3" /><path d="M6 8V6a3 3 0 016 0v2" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" /></svg> },
    ],
  },
  {
    title: "BUSINESS",
    items: [
      { label: "Business Settings", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="6" width="14" height="10" rx="1.5" stroke={C.dark} strokeWidth="1.3" /><path d="M6 6V4a3 3 0 016 0v2" stroke={C.dark} strokeWidth="1.3" /></svg> },
      { label: "Services & Menu", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 5h12M3 9h12M3 13h8" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" /></svg> },
      { label: "Staff / Operators", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="6" r="3" stroke={C.dark} strokeWidth="1.3" /><circle cx="12" cy="7" r="2.5" stroke={C.dark} strokeWidth="1.3" /><path d="M2 16c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" /></svg> },
      { label: "Booking Page", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="2" stroke={C.dark} strokeWidth="1.3" /><path d="M7 6h4M7 9h4M7 12h2" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" /></svg> },
    ],
  },
  {
    title: "BILLING",
    items: [
      { label: "Current Plan", badge: "Scale", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l2 4 4.5.5-3.3 3 .8 4.5L9 12l-4 2 .8-4.5-3.3-3L7 6l2-4z" stroke={C.dark} strokeWidth="1.3" strokeLinejoin="round" /></svg> },
      { label: "Payment Method", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" stroke={C.dark} strokeWidth="1.3" /><path d="M2 8h14" stroke={C.dark} strokeWidth="1.3" /></svg> },
      { label: "Stripe Account", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2.5" stroke={C.dark} strokeWidth="1.3" /><path d="M7 7c1.5-1.5 3.5-1 3.5 1S9 10 7 11" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" /></svg> },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { label: "Help Centre", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke={C.dark} strokeWidth="1.3" /><path d="M7 7a2 2 0 113 1.7c-.5.4-1 1-1 1.8" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" /><circle cx="9" cy="13" r="0.5" fill={C.dark} /></svg> },
      { label: "Privacy Policy", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L3 5v4c0 4 2.7 7.5 6 8.5 3.3-1 6-4.5 6-8.5V5L9 2z" stroke={C.dark} strokeWidth="1.3" strokeLinejoin="round" /></svg> },
      { label: "Data Export (GDPR)", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v8M6 8l3 3 3-3" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 13v2h12v-2" stroke={C.dark} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    ],
  },
];

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user, businessId } = useAuth();
  const { data: clientData } = useApi<any>(businessId ? `/clients-v2/business/${businessId}?limit=1` : null);
  const userName = user?.name || 'User';
  const userEmail = user?.email || '';
  const initials = userName.split(' ').map((w: string) => w[0]).join('').slice(0,2).toUpperCase();
  const totalClients = clientData?.pagination?.total ?? '-';
  const memberYear = user?.created_at ? new Date(user.created_at).getFullYear() : '-';

  return (
    <div className="flex flex-col font-['Figtree']" style={{ backgroundColor: C.bg }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1 as any)}
            className="flex items-center justify-center"
            style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: C.subtle }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke={C.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>Profile</p>
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="rounded-full overflow-hidden flex items-center justify-center" style={{ width: 52, height: 52, border: `2.5px solid ${C.gold}`, backgroundColor: '#F5EDD6' }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: C.gold }}>{initials}</span>
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 17, fontWeight: 800, color: C.dark, lineHeight: 1.2 }}>{userName}</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: C.muted, marginTop: 1 }}>{userEmail}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="px-2 py-0.5" style={{ borderRadius: 6, fontSize: 9, fontWeight: 700, backgroundColor: C.gold, color: "#FFF" }}>Scale Plan</span>
              <span className="px-2 py-0.5" style={{ borderRadius: 6, fontSize: 9, fontWeight: 700, backgroundColor: C.goldLight, color: C.gold }}>Owner</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Business card */}
      <div className="mx-5 mt-1">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-3.5"
          style={{ borderRadius: 14, backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}`, boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: C.goldLight }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="5" width="12" height="9" rx="1.5" stroke={C.gold} strokeWidth="1.3" />
                  <path d="M5 5V3.5a3 3 0 016 0V5" stroke={C.gold} strokeWidth="1.3" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{userName}'s Business</p>
                <p style={{ fontSize: 10, fontWeight: 500, color: C.muted, marginTop: 1 }}>24 King Street, Cardiff, CF10 1FD</p>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Quick stats */}
      <div className="flex gap-2 mx-5 mt-3">
        {[
          { label: "Clients", value: String(totalClients), color: C.dark },
          { label: "Member", value: String(memberYear), color: C.green },
        ].map((s) => (
          <div key={s.label} className="flex-1 py-2.5 px-2.5 rounded-[14px] text-center" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}` }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 8, fontWeight: 600, color: C.muted, marginTop: 4, letterSpacing: 0.5, textTransform: "uppercase" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Settings sections */}
      <div className="px-5 pb-28 mt-2">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + si * 0.04 }}
            className="mt-3"
          >
            <p className="mb-1.5" style={{ fontSize: 9, fontWeight: 700, color: "#BBBBBB", letterSpacing: 1.2, textTransform: "uppercase" }}>
              {section.title}
            </p>
            <div style={{ borderRadius: 14, backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}`, overflow: "hidden" }}>
              {section.items.map((item: any, i) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left active:bg-[#FAFAFA] transition-colors"
                  style={{ borderBottom: i < section.items.length - 1 ? `1px solid #F8F8F8` : "none", minHeight: 42 }}
                >
                  <div className="flex items-center justify-center shrink-0" style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: "#F8F8F8" }}>
                    {item.icon}
                  </div>
                  <span className="flex-1" style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 mr-1" style={{ borderRadius: 6, fontSize: 10, fontWeight: 700, color: C.gold, backgroundColor: C.goldLight }}>
                      {item.badge}
                    </span>
                  )}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="#CCC" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Sign out */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full mt-4 py-3 active:scale-[0.98] transition-transform"
          style={{ borderRadius: 14, backgroundColor: "#FEF2F2", fontSize: 12, fontWeight: 700, color: "#EF4444" }}
        >
          Sign Out
        </motion.button>
        <p className="text-center mt-2" style={{ fontSize: 9, fontWeight: 500, color: "#DDD" }}>ReeveOS v2.0.0 · Build 1</p>
      </div>
    </div>
  );
}
