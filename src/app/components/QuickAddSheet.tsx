import React from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const options = [
  {
    label: "New Booking",
    desc: "Schedule a client",
    color: "#C9A84C",
    action: "/app/calendar",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="14" rx="2.5" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M2 8h16" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M7 1.5v3M13 1.5v3" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="12.5" r="1.5" fill="#C9A84C" />
      </svg>
    ),
  },
  {
    label: "Walk-in",
    desc: "Client here now",
    color: "#22C55E",
    action: "/app/calendar",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="6" r="3" stroke="#22C55E" strokeWidth="1.5" />
        <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 9l2 2 3-3" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Take Payment",
    desc: "Stripe Tap to Pay",
    color: "#3B82F6",
    action: "/app/payment",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="#3B82F6" strokeWidth="1.5" />
        <path d="M2 9h16" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="4" y="12" width="4" height="2" rx="1" fill="#3B82F6" opacity="0.4" />
      </svg>
    ),
  },
];

export function QuickAddSheet({ open, onClose }: Props) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="absolute bottom-0 left-0 right-0 z-50 bg-white px-5 pb-10 pt-4"
            style={{ borderRadius: "24px 24px 0 0", boxShadow: "0 -12px 48px rgba(0,0,0,0.15)" }}
          >
            {/* Handle */}
            <div className="w-9 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: "#E0E0E0" }} />

            <p style={{ fontSize: 18, fontWeight: 800, color: "#111111", marginBottom: 16 }}>Quick actions</p>

            <div className="flex flex-col gap-2.5">
              {options.map((opt) => (
                <motion.button
                  key={opt.label}
                  onClick={() => { onClose(); navigate(opt.action); }}
                  className="flex items-center gap-4 p-4"
                  style={{
                    borderRadius: 16,
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #F0F0F0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    minHeight: 64,
                  }}
                  whileTap={{ scale: 0.97, backgroundColor: "#FAFAF8" }}
                >
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${opt.color}15, ${opt.color}08)`,
                    }}
                  >
                    {opt.icon}
                  </div>
                  <div className="text-left flex-1">
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>{opt.label}</p>
                    <p style={{ fontSize: 11, fontWeight: 500, color: "#999", marginTop: 1 }}>{opt.desc}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M6 4l4 4-4 4" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              ))}
            </div>

            {/* Cancel */}
            <button
              onClick={onClose}
              className="w-full mt-4 py-3.5"
              style={{ borderRadius: 14, backgroundColor: "#F5F5F5", fontSize: 13, fontWeight: 700, color: "#999" }}
            >
              Cancel
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
