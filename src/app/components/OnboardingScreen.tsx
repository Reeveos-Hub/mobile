import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const slides = [
  { img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80", label: "Your Salon Business", tags: ["beauty","premium","independent"] },
  { img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", label: "Your Coffee Shop", tags: ["cafe","artisan","local"] },
  { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", label: "Your Restaurant", tags: ["dining","gourmet","hospitality"] },
  { img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80", label: "Your Barbershop", tags: ["grooming","style","craft"] },
  { img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80", label: "Your Wellness Studio", tags: ["health","wellness","balance"] },
  { img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80", label: "Your Local Business", tags: ["community","growth","independent"] },
];

export function OnboardingScreen() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { user, businessId } = useAuth();
  const { data: sum } = useApi<any>(businessId ? `/dashboard/business/${businessId}/summary` : null);
  const { data: td } = useApi<any>(businessId ? `/dashboard/business/${businessId}/today` : null);

  const todayBookings = sum?.today?.bookings || 8;
  const revenue = sum?.today?.revenue || 485;
  const nextClient = (td?.bookings || [])[0];
  const nextName = nextClient?.customerName || "Sarah Mitchell";
  const nextTime = nextClient?.time || "11:00 AM";

  // Auto-rotate every 4s
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      position:"fixed", inset:0, overflow:"hidden", touchAction:"manipulation",
      overscrollBehavior:"none", fontFamily:"'Figtree',-apple-system,sans-serif",
      backgroundColor:"#111",
    }}>
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position:"absolute", inset:0,
            backgroundImage: `url(${slides[current].img})`,
            backgroundSize:"cover", backgroundPosition:"center",
          }}
        />
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.92) 100%)" }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", height:"100%", padding:"0 24px" }}>

        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:52 }}>
          <button onClick={() => navigate(-1 as any)} style={{ width:36, height:36, borderRadius:18, backgroundColor:"rgba(255,255,255,0.15)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round"><path d="M10 3L5 8l5 5"/></svg>
          </button>
          <span style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.7)", letterSpacing:2, textTransform:"uppercase" }}>ReeveOS</span>
          <button style={{ width:36, height:36, borderRadius:18, backgroundColor:"rgba(255,255,255,0.15)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round"><path d="M12 3L3 12M8 3h4v4"/></svg>
          </button>
        </div>

        {/* Spacer */}
        <div style={{ flex:1 }} />

        {/* Dots */}
        <div style={{ display:"flex", gap:6, marginBottom:16 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ width: i===current ? 20 : 6, height:6, borderRadius:3, backgroundColor: i===current ? "#FFF" : "rgba(255,255,255,0.35)", transition:"all 0.3s" }} />
          ))}
        </div>

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={current}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }}
            transition={{ duration:0.4 }}
            style={{ fontSize:34, fontWeight:800, color:"#FFF", lineHeight:1.1, margin:"0 0 14px" }}
          >
            {slides[current].label}
          </motion.h1>
        </AnimatePresence>

        {/* Stats pills */}
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          <span style={{ display:"flex", alignItems:"center", gap:4, padding:"5px 12px", borderRadius:20, backgroundColor:"rgba(255,255,255,0.12)", fontSize:13, fontWeight:700, color:"#FFF" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#C9A84C"><path d="M8 1l2 4.5 5 .7-3.6 3.5.85 5L8 12.5l-4.25 2.2.85-5L1 6.2l5-.7L8 1z"/></svg>
            4.9
          </span>
          <span style={{ display:"flex", alignItems:"center", gap:4, padding:"5px 12px", borderRadius:20, backgroundColor:"rgba(255,255,255,0.12)", fontSize:13, fontWeight:700, color:"#FFF" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#FFF" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 1.5"/></svg>
            {todayBookings} today
          </span>
          <span style={{ padding:"5px 12px", borderRadius:20, backgroundColor:"rgba(201,168,76,0.25)", fontSize:13, fontWeight:700, color:"#C9A84C" }}>
            £{revenue}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {slides[current].tags.map(t => (
            <span key={t} style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.5)" }}>#{t}</span>
          ))}
        </div>

        {/* Insights */}
        <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"><path d="M2 12l4-4 3 3 5-7"/></svg>
            <span style={{ fontSize:14, fontWeight:500, color:"rgba(255,255,255,0.7)" }}>12% ahead of last week</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M2 6h12"/></svg>
            <span style={{ fontSize:14, fontWeight:500, color:"rgba(255,255,255,0.7)" }}>Next: {nextName} — {nextTime}</span>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => navigate("/", { replace: true })}
          style={{
            width:"100%", padding:"18px 0", borderRadius:16,
            backgroundColor:"#FFF", border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            marginBottom: 40,
            fontFamily:"'Figtree',-apple-system,sans-serif",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="#111"><path d="M5 3l8 5-8 5V3z"/></svg>
          <span style={{ fontSize:17, fontWeight:700, color:"#111" }}>Start</span>
        </button>
      </div>
    </div>
  );
}
