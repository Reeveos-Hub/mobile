import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

type SwitchProps = { on: boolean; onToggle: () => void };
function Toggle({ on, onToggle }: SwitchProps) {
  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-[22px] rounded-full transition-colors duration-300 shrink-0"
      style={{ backgroundColor: on ? "#C9A84C" : "#E5E7EB" }}
    >
      <motion.div
        animate={{ x: on ? 18 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow-sm"
      />
    </button>
  );
}

type ToggleKey =
  | "smsReminders"
  | "emailReceipts"
  | "pushNotif"
  | "onlineBooking"
  | "depositRequired"
  | "autoConfirm"
  | "cancellationFee"
  | "waitlist"
  | "darkMode";

const sections: { title: string; items: { key: ToggleKey; label: string; sub: string }[] }[] = [
  {
    title: "NOTIFICATIONS",
    items: [
      { key: "smsReminders", label: "SMS Reminders", sub: "24hrs before appointment" },
      { key: "emailReceipts", label: "Email Receipts", sub: "Auto-send after payment" },
      { key: "pushNotif", label: "Push Notifications", sub: "Bookings & cancellations" },
    ],
  },
  {
    title: "BOOKING",
    items: [
      { key: "onlineBooking", label: "Online Booking", sub: "Clients book via your link" },
      { key: "depositRequired", label: "Require Deposit", sub: "50% upfront for new clients" },
      { key: "autoConfirm", label: "Auto-Confirm", sub: "Skip manual approval" },
      { key: "cancellationFee", label: "Cancellation Fee", sub: "<24hr cancellations" },
      { key: "waitlist", label: "Waitlist", sub: "Auto-fill cancelled slots" },
    ],
  },
  {
    title: "APPEARANCE",
    items: [
      { key: "darkMode", label: "Dark Mode (Beta)", sub: "System-wide dark theme" },
    ],
  },
];

export function SettingsScreen() {
  const navigate = useNavigate();
  const { businessId } = useAuth();
  const { data: bizSettings } = useApi<any>(businessId ? `/settings/business/${businessId}` : null);
  const bookingSlug = bizSettings?.slug || businessId || '';
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    smsReminders: true,
    emailReceipts: true,
    pushNotif: true,
    onlineBooking: true,
    depositRequired: false,
    autoConfirm: true,
    cancellationFee: false,
    waitlist: true,
    darkMode: false,
  });

  const toggle = (key: ToggleKey) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col min-h-full font-['Figtree']" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1 as any)}
            className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#111111", letterSpacing: -0.3 }}>App Settings</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="flex-1 px-5 pt-4 pb-28 space-y-4">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.06 }}
          >
            <p className="text-[9px] font-bold text-[#BBB] uppercase tracking-[1.5px] mb-2 px-0.5">
              {section.title}
            </p>
            <div className="bg-white rounded-[14px] border border-[#F0F0F0] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] overflow-hidden divide-y divide-[#F8F8F8]">
              {section.items.map((item) => (
                <div key={item.key} className="flex items-center gap-3 px-3.5 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#111] truncate">{item.label}</p>
                    <p className="text-[10px] font-medium text-[#BBB] mt-0.5 truncate">{item.sub}</p>
                  </div>
                  <Toggle
                    on={toggles[item.key]}
                    onToggle={() => toggle(item.key)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Booking Link */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p className="text-[9px] font-bold text-[#BBB] uppercase tracking-[1.5px] mb-2 px-0.5">BOOKING LINK</p>
          <div className="bg-white rounded-[14px] border border-[#F0F0F0] p-3.5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)]">
            <p className="text-[10px] font-medium text-[#BBB] mb-1.5">Your public booking URL</p>
            <div className="flex items-center gap-2 bg-[#FAFAFA] border border-[#EAEAEC] rounded-[10px] px-3 py-2">
              <p className="flex-1 text-[11px] font-bold text-[#111] truncate">portal.rezvo.app/book/{bookingSlug}</p>
              <button className="text-[#C9A84C] text-[10px] font-black shrink-0">Copy</button>
            </div>
          </div>
        </motion.div>

        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[9px] font-bold text-[#BBB] uppercase tracking-[1.5px] mb-2 px-0.5">WORKING HOURS</p>
          <div className="bg-white rounded-[14px] border border-[#F0F0F0] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] overflow-hidden divide-y divide-[#F8F8F8]">
            {[
              { day: "Mon - Fri", hours: "9:00 AM - 6:00 PM" },
              { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
              { day: "Sunday", hours: "Closed" },
            ].map((wh) => (
              <div key={wh.day} className="flex items-center justify-between px-3.5 py-2.5">
                <p className="text-[11px] font-bold text-[#111]">{wh.day}</p>
                <p className="text-[11px] font-medium text-[#999]">{wh.hours}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <p className="text-[9px] font-bold text-[#EF4444]/60 uppercase tracking-[1.5px] mb-2 px-0.5">DANGER ZONE</p>
          <div className="bg-white rounded-[14px] border border-[#FEE2E2] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] overflow-hidden divide-y divide-[#FEF2F2]">
            {["Clear Notifications", "Delete Client Data", "Delete Account"].map((label) => (
              <button key={label} className="w-full px-3.5 py-2.5 text-left text-[12px] font-bold text-[#EF4444]">
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}