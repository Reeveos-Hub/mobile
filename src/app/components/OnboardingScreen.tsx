import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    title: "Your day\nat a glance",
    body: "Bookings, revenue, and your next client — the moment you open the app.",
    visual: (
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <rect x="20" y="30" width="100" height="80" rx="16" stroke="#C9A84C" strokeWidth="2" opacity="0.2" />
        <rect x="30" y="40" width="35" height="25" rx="8" fill="#C9A84C" opacity="0.15" />
        <rect x="75" y="40" width="35" height="25" rx="8" fill="#C9A84C" opacity="0.1" />
        <rect x="30" y="75" width="80" height="8" rx="4" fill="#C9A84C" opacity="0.12" />
        <rect x="30" y="90" width="55" height="8" rx="4" fill="#C9A84C" opacity="0.08" />
        <text x="38" y="57" fill="#C9A84C" fontSize="16" fontWeight="800">8</text>
        <text x="83" y="57" fill="#C9A84C" fontSize="14" fontWeight="800">£485</text>
      </svg>
    ),
  },
  {
    title: "Talk to\nyour business",
    body: "'How many no-shows this month?' 'Send a reminder to Sarah.' ReeveOS answers.",
    visual: (
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <rect x="20" y="35" width="90" height="30" rx="15" fill="#C9A84C" opacity="0.1" />
        <rect x="30" y="75" width="80" height="30" rx="15" fill="#111111" opacity="0.06" />
        <path d="M70 20l3 9 9 1.5-6.5 5.5 1.5 9L70 41l-8 4 1.5-9L57 30.5l9-1.5 4-9z" fill="#C9A84C" opacity="0.3" />
        <text x="32" y="54" fill="#C9A84C" fontSize="10" fontWeight="600" opacity="0.8">No-shows this month?</text>
        <text x="42" y="94" fill="#666" fontSize="10" fontWeight="600" opacity="0.5">Just 2 — 1.8% rate</text>
      </svg>
    ),
  },
  {
    title: "Get paid\nanywhere",
    body: "Take card payments on your iPhone. No terminal needed. Funds hit your bank instantly.",
    visual: (
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <rect x="30" y="30" width="80" height="55" rx="12" stroke="#C9A84C" strokeWidth="2" opacity="0.2" />
        <path d="M30 50h80" stroke="#C9A84C" strokeWidth="2" opacity="0.15" />
        <rect x="38" y="62" width="25" height="6" rx="3" fill="#C9A84C" opacity="0.2" />
        <circle cx="70" cy="105" r="15" stroke="#C9A84C" strokeWidth="1.5" opacity="0.15" />
        <circle cx="70" cy="105" r="8" stroke="#C9A84C" strokeWidth="1.5" opacity="0.25" />
        <path d="M66 105h8M70 101v8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Built for\nyour business",
    body: "Bookings, clients, forms, loyalty — everything in one place. GDPR compliant. Your data stays yours.",
    visual: (
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <path d="M70 20L40 35v25c0 22 13 42 30 48 17-6 30-26 30-48V35L70 20z" stroke="#C9A84C" strokeWidth="2" fill="#C9A84C" opacity="0.06" />
        <path d="M58 68l8 8 16-18" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </svg>
    ),
  },
];

export function OnboardingScreen() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const goNext = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else navigate("/");
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="h-[52px] shrink-0" />

      {/* Skip */}
      <div className="flex justify-end px-5">
        <button onClick={() => navigate("/")} style={{ fontSize: 13, fontWeight: 600, color: "#999999", minHeight: 44 }}>
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Visual */}
            <div className="mb-8">
              {slides[current].visual}
            </div>

            {/* Title */}
            <h1 className="text-center" style={{ fontSize: 28, fontWeight: 800, color: "#111111", lineHeight: 1.15, whiteSpace: "pre-line" }}>
              {slides[current].title}
            </h1>

            {/* Body */}
            <p className="mt-3 text-center max-w-[260px]" style={{ fontSize: 14, fontWeight: 500, color: "#999999", lineHeight: 1.5 }}>
              {slides[current].body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center pb-10 px-5">
        {/* Dots */}
        <div className="flex gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === current ? "#111111" : "#F0F0F0",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={goNext}
          className="w-full py-4 mt-1"
          style={{
            borderRadius: 16,
            backgroundColor: "#111111",
            boxShadow: "0 4px 16px rgba(17,17,17,0.25)",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: "#C9A84C" }}>
            {current === slides.length - 1 ? "Get Started" : "Next"}
          </span>
        </button>
      </div>
    </div>
  );
}