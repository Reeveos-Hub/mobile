import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  { title:"Your day\nat a glance", body:"Bookings, revenue, and your next client — the moment you open the app.",
    visual:<svg width="140" height="140" viewBox="0 0 140 140" fill="none"><rect x="20" y="30" width="100" height="80" rx="16" stroke="#C9A84C" strokeWidth="2" opacity="0.2"/><rect x="30" y="40" width="35" height="25" rx="8" fill="#C9A84C" opacity="0.15"/><rect x="75" y="40" width="35" height="25" rx="8" fill="#C9A84C" opacity="0.1"/><rect x="30" y="75" width="80" height="8" rx="4" fill="#C9A84C" opacity="0.12"/><rect x="30" y="90" width="55" height="8" rx="4" fill="#C9A84C" opacity="0.08"/><text x="38" y="57" fill="#C9A84C" fontSize="16" fontWeight="800">8</text><text x="83" y="57" fill="#C9A84C" fontSize="14" fontWeight="800">£485</text></svg> },
  { title:"Talk to\nyour business", body:"'How many no-shows this month?' ReeveOS answers with real data.",
    visual:<svg width="140" height="140" viewBox="0 0 140 140" fill="none"><rect x="20" y="35" width="90" height="30" rx="15" fill="#C9A84C" opacity="0.1"/><rect x="30" y="75" width="80" height="30" rx="15" fill="#111" opacity="0.06"/><path d="M70 20l3 9 9 1.5-6.5 5.5 1.5 9L70 41l-8 4 1.5-9L57 30.5l9-1.5 4-9z" fill="#C9A84C" opacity="0.3"/></svg> },
  { title:"Get paid\nanywhere", body:"Take card payments on your iPhone. No terminal needed.",
    visual:<svg width="140" height="140" viewBox="0 0 140 140" fill="none"><rect x="30" y="30" width="80" height="55" rx="12" stroke="#C9A84C" strokeWidth="2" opacity="0.2"/><path d="M30 50h80" stroke="#C9A84C" strokeWidth="2" opacity="0.15"/><circle cx="70" cy="105" r="15" stroke="#C9A84C" strokeWidth="1.5" opacity="0.15"/><circle cx="70" cy="105" r="8" stroke="#C9A84C" strokeWidth="1.5" opacity="0.25"/></svg> },
  { title:"Built for\nyour business", body:"Bookings, clients, forms, loyalty — everything in one place. GDPR compliant.",
    visual:<svg width="140" height="140" viewBox="0 0 140 140" fill="none"><path d="M70 20L40 35v25c0 22 13 42 30 48 17-6 30-26 30-48V35L70 20z" stroke="#C9A84C" strokeWidth="2" fill="#C9A84C" opacity="0.06"/><path d="M58 68l8 8 16-18" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/></svg> },
];

export function OnboardingScreen() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const goNext = () => { if (current < slides.length - 1) setCurrent(current + 1); else navigate("/"); };

  return (
    <div style={{
      position:"fixed", inset:0, display:"flex", flexDirection:"column",
      backgroundColor:"#FFFFFF", overflow:"hidden", touchAction:"manipulation",
      overscrollBehavior:"none", fontFamily:"'Figtree',-apple-system,sans-serif",
    }}>
      {/* Safe area top */}
      <div style={{height:52,flexShrink:0}} />

      {/* Skip */}
      <div style={{display:"flex",justifyContent:"flex-end",padding:"0 20px"}}>
        <button onClick={()=>navigate("/")} style={{fontSize:14,fontWeight:600,color:"#8E8E93",minHeight:44,background:"none",border:"none",cursor:"pointer"}}>Skip</button>
      </div>

      {/* Content */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 32px"}}>
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}} transition={{duration:0.3}} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{marginBottom:32}}>{slides[current].visual}</div>
            <h1 style={{fontSize:28,fontWeight:800,color:"#111",lineHeight:1.15,whiteSpace:"pre-line",textAlign:"center",margin:0}}>{slides[current].title}</h1>
            <p style={{marginTop:12,fontSize:15,fontWeight:500,color:"#8E8E93",lineHeight:1.5,textAlign:"center",maxWidth:260}}>{slides[current].body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"0 20px 40px"}}>
        {/* Dots */}
        <div style={{display:"flex",gap:8,marginBottom:24}}>
          {slides.map((_,i)=>(
            <div key={i} style={{width:i===current?24:8,height:8,borderRadius:4,backgroundColor:i===current?"#111":"#E5E5EA",transition:"all 0.3s"}}/>
          ))}
        </div>
        {/* CTA */}
        <button onClick={goNext} style={{width:"100%",padding:"16px 0",borderRadius:16,backgroundColor:"#111",border:"none",cursor:"pointer",boxShadow:"0 4px 16px rgba(17,17,17,0.25)"}}>
          <span style={{fontSize:15,fontWeight:700,color:"#C9A84C"}}>{current===slides.length-1?"Get Started":"Next"}</span>
        </button>
      </div>
    </div>
  );
}
