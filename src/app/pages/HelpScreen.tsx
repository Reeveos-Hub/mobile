import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "How do I add a new appointment?",
    a: "Tap the + button on the Calendar screen or use the quick-add button on the Home screen. You can select a client, service, date and time in a few taps.",
  },
  {
    q: "Can clients book online?",
    a: "Yes! Share your unique booking link from App Settings → Booking Link. Clients can view availability and book 24/7.",
  },
  {
    q: "How does Stripe Tap to Pay work?",
    a: "Open Take Payment from the home screen, enter the amount, and hold a contactless card or device near your iPhone. No extra hardware required.",
  },
  {
    q: "How do I send appointment reminders?",
    a: "SMS reminders are sent automatically 24 hours before each appointment. You can toggle this in App Settings → Notifications.",
  },
  {
    q: "What is the Scale plan?",
    a: "Scale is our premium tier at £59/month and unlocks the Shop module (products, gift cards, inventory), advanced analytics, and priority support.",
  },
  {
    q: "How do I export my data (GDPR)?",
    a: "Go to Profile → Data Export (GDPR). We'll compile a full export of your client and booking data within 48 hours and email it to you.",
  },
];

const contactOptions = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M3 7l7 5 7-5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Email Support",
    sub: "hello@reeveos.app",
    tag: "< 24hr",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path d="M18 13.5c0 .4-.1.7-.3 1l-1.3 1.6c-.3.4-.7.7-1.2.9-.5.2-1 .3-1.5.3-1.2-.1-2.5-.5-3.7-1.3-1.2-.8-2.3-1.9-3.1-3.1-.8-1.2-1.3-2.4-1.3-3.7 0-.5.1-1 .3-1.5.2-.5.5-.9.9-1.2L8.2 4.8c.5-.5 1.1-.5 1.5 0l2.4 2.4c.5.5.5 1.1 0 1.5L11 9.9c.6 1.1 1.5 2 2.6 2.6l1.2-1.1c.5-.5 1.1-.5 1.5 0l2.4 2.4c.2.2.3.5.3.7z" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    label: "Live Chat",
    sub: "In-app messaging",
    tag: "Online",
  },
];

const resources = [
  { label: "Getting Started Guide", icon: "📖" },
  { label: "Video Tutorials", icon: "🎥" },
  { label: "API Documentation", icon: "🔧" },
  { label: "Community Forum", icon: "💬" },
];

export function HelpScreen() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-full font-['Figtree']" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <div className="px-5 pt-[58px] pb-4">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1 as any)}
            className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ backgroundColor: "#F0F0F0" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#111111", letterSpacing: -0.3 }}>Help & Support</p>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2.5 px-3 h-9 rounded-[10px]" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0F0F0" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="#999999" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            placeholder="Search help articles..."
            className="flex-1 bg-transparent text-[11px] font-medium text-[#111111] placeholder:text-[#111111]/30 outline-none"
          />
        </div>
      </div>

      <div className="flex-1 px-5 pt-4 pb-28 space-y-4">
        {/* Contact Options */}
        <div className="space-y-2">
          {contactOptions.map((opt, i) => (
            <motion.button
              key={opt.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="w-full bg-white rounded-[12px] px-3.5 py-3 flex items-center gap-3 border border-[#F0F0F0] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-[#F5EDD6] flex items-center justify-center shrink-0">
                {opt.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-[12px] font-bold text-[#111] tracking-tight">{opt.label}</p>
                <p className="text-[10px] font-medium text-[#BBB] mt-0.5">{opt.sub}</p>
              </div>
              <span className="text-[9px] font-bold text-[#10B981] bg-[#10B981]/8 px-2 py-0.5 rounded-full shrink-0">
                {opt.tag}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Resources */}
        <div>
          <p className="text-[9px] font-bold text-[#BBB] uppercase tracking-[1.5px] mb-2 px-0.5">
            RESOURCES
          </p>
          <div className="grid grid-cols-2 gap-2">
            {resources.map((r, i) => (
              <motion.button
                key={r.label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className="bg-white rounded-[12px] px-3 py-3 border border-[#F0F0F0] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] text-left active:scale-[0.97]"
              >
                <span className="text-[16px]">{r.icon}</span>
                <p className="text-[10px] font-bold text-[#111] mt-1.5 tracking-tight">{r.label}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <p className="text-[9px] font-bold text-[#BBB] uppercase tracking-[1.5px] mb-2 px-0.5">
            FREQUENTLY ASKED
          </p>
          <div className="bg-white rounded-[14px] border border-[#F0F0F0] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] overflow-hidden divide-y divide-[#F8F8F8]">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left"
                >
                  <p className="flex-1 text-[11px] font-bold text-[#111]">{faq.q}</p>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="#BBB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-3.5 pb-3 text-[11px] font-medium text-[#888] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Version */}
        <p className="text-center text-[9px] font-medium text-[#DDD]">ReeveOS v1.0.0 · Build 1</p>
      </div>
    </div>
  );
}