import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1599387737838-660b75526801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBiZWF1dGljaWFuJTIwc3R5bGluZyUyMGNsaWVudHxlbnwxfHx8fDE3NzMyNTAwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Hair salon beautician" },
  { src: "https://images.unsplash.com/photo-1761931403671-d020a14928d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBzaG9wJTIwcHJvZmVzc2lvbmFsJTIwaGFpcmN1dHxlbnwxfHx8fDE3NzMyNTAwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Barber shop professional" },
  { src: "https://images.unsplash.com/photo-1727932204039-2127385a9cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXN5JTIwdXBzY2FsZSUyMHJlc3RhdXJhbnQlMjBkaW5pbmd8ZW58MXx8fHwxNzczMjUwMDExfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Busy upscale restaurant" },
  { src: "https://images.unsplash.com/photo-1770991966683-472a770d0ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwYmFyaXN0YSUyMGNvZmZlZXxlbnwxfHx8fDE3NzMyNTAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Modern café barista" },
  { src: "https://images.unsplash.com/photo-1761718210055-e83ca7e2c9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGZhY2lhbCUyMHRyZWF0bWVudCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMyNTAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Beauty salon treatment" },
];

export function WelcomeScreen() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[54px]">
      {/* Rotating background images with crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentIndex}
            src={IMAGES[currentIndex].src}
            alt={IMAGES[currentIndex].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "easeOut" } }}
          />
        </AnimatePresence>
        {/* Gradient overlays */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-20 flex items-center justify-between px-6 pt-[58px]"
      >
        <button
          className="w-[38px] h-[38px] rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          ReeveOS
        </span>
        <button
          className="w-[38px] h-[38px] rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
      </motion.div>

      {/* Main content overlay — bottom portion */}
      <div className="relative z-20 flex-1 flex flex-col justify-end px-6 pb-6">
        {/* Image indicator dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-1.5 mb-4"
        >
          {IMAGES.map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                width: i === currentIndex ? 20 : 6,
                backgroundColor: i === currentIndex ? "#C9A84C" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: -0.5,
            }}
          >
            Your Salon
            <br />
            Business
          </h1>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 mt-4"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/10">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l2 4.5 5 .7-3.6 3.5.85 5L8 12.5l-4.25 2.2.85-5L1 6.2l5-.7L8 1z" fill="#C9A84C" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>4.9</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/10">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.3" />
              <path d="M8 4v4l2.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>8 today</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/10">
            <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>£485</span>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-2 mt-3"
        >
          {["#beauty", "#premium", "#independent"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: 0.3,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Activity info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 flex flex-col gap-1.5"
        >
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M2 12l4-4 3 3 5-7" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
              12% ahead of last week
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3" width="12" height="10" rx="2" stroke="#C9A84C" strokeWidth="1.3" />
              <path d="M5 1v3M11 1v3M2 7h12" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
              Next: Sarah Mitchell — 11:00 AM
            </span>
          </div>
        </motion.div>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
          className="mt-6 w-full flex items-center justify-center gap-3 py-4"
          style={{
            borderRadius: 50,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="#111111">
            <path d="M4 2l10 6-10 6V2z" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#111111", letterSpacing: 0.3 }}>
            Start
          </span>
        </motion.button>
      </div>
    </div>
  );
}
