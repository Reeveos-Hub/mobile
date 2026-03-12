import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const C = {
  bg: "#FFFFFF",
  dark: "#111111",
  gold: "#C9A84C",
  muted: "#999999",
  subtle: "#F0F0F0",
};

const menuItems = [
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>, label: "My Profile", value: "", path: "/profile" },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h12M3 9h12M3 13h8" /></svg>, label: "Services & Pricing", value: "", path: "/services" },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, label: "Client List", value: "", path: "/clients" },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>, label: "Reports & Analytics", value: "", path: "/reports" },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>, label: "Take Payment", value: "Stripe NFC", path: "/payment" },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>, label: "Notifications", value: "", path: "/notifications" },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>, label: "App Settings", value: "", path: "/settings" },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>, label: "Help & Support", value: "", path: "/help" },
  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>, label: "Shop", value: "Scale", path: "/shop" },
];

export function Menu() {
  const navigate = useNavigate();
  const { user, businessId, logout } = useAuth();
  const { data: summary } = useApi<any>(businessId ? `/dashboard/business/${businessId}/summary` : null);
  const userName = user?.name || 'User';
  const initials = userName.split(' ').map((w: string) => w[0]).join('').slice(0,2).toUpperCase();

  return (
    <div className="flex flex-col min-h-full font-['Figtree']" style={{ backgroundColor: C.bg }}>
      {/* Header */}
      <div className="px-5 pt-[58px] pb-5">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-14 h-14 rounded-full overflow-hidden border-2 shadow-md flex items-center justify-center"
            style={{ borderColor: C.gold, backgroundColor: '#F5EDD6' }}
          >
            <span style={{ fontSize: 20, fontWeight: 800, color: C.gold }}>{initials}</span>
          </div>
          <div className="flex-1">
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: -0.3 }}>{userName}</h2>
            <p style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>Salon Owner</p>
          </div>
          <button onClick={() => navigate("/profile")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: C.subtle }}>
            <ChevronRight size={16} color={C.dark} />
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-2">
          {[
            { label: "Today", value: summary ? `${summary.today?.bookings} appts` : "-" },
            { label: "Revenue", value: summary ? `£${summary.today?.revenue?.toFixed(0)}` : "-" },
          ].map((s) => (
            <div key={s.label} className="flex-1 py-2.5 px-3 rounded-[14px] text-center" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${C.subtle}` }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: C.dark, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 9, fontWeight: 600, color: C.muted, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 px-5 pb-28 space-y-1.5">
        {menuItems.map((item, i) => (
          <motion.button
            key={i}
            onClick={() => navigate(item.path)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="w-full bg-white rounded-[14px] px-3.5 py-3 flex items-center gap-3 active:scale-[0.98] group"
            style={{ border: `1px solid ${C.subtle}` }}
          >
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0" style={{ backgroundColor: C.bg, color: C.dark }}>
              {item.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 style={{ fontSize: 13, fontWeight: 700, color: C.dark, letterSpacing: -0.2 }}>{item.label}</h3>
            </div>
            {item.value && (
              <span style={{ fontSize: 10, fontWeight: 600, color: C.gold }}>{item.value}</span>
            )}
            <ChevronRight size={14} className="text-[#C8BFB3] ml-0.5" />
          </motion.button>
        ))}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-3">
          <button className="w-full h-11 rounded-[14px] flex items-center justify-center gap-2 text-[#FF5A5F] font-bold text-[12px] active:scale-[0.98]" style={{ backgroundColor: "#FF5A5F10", border: "1px solid #FF5A5F15" }}>
            <LogOut size={14} strokeWidth={2.5} />
            Log Out
          </button>
        </motion.div>
        <p className="text-center text-[9px] font-medium pt-2" style={{ color: C.muted }}>ReeveOS v2.0.0 · Build 1</p>
      </div>
    </div>
  );
}