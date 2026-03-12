import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => { const t = setTimeout(() => navigate("/login"), 2200); return () => clearTimeout(t); }, [navigate]);

  return (
    <div style={{
      position:"fixed", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(165deg, #111111 0%, #0A0A0A 50%, #111111 100%)",
      overflow:"hidden", touchAction:"none", overscrollBehavior:"none",
      fontFamily:"'Figtree',-apple-system,sans-serif",
    }}>
      {/* Radial glow */}
      <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", top:"35%", left:"50%", transform:"translate(-50%,-50%)" }} />

      <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:"easeOut"}} style={{ position:"relative", width:80, height:80, borderRadius:40, border:"2px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{color:"#C9A84C",fontSize:38,fontWeight:800,lineHeight:1}}>R</span>
        <motion.div style={{position:"absolute",width:8,height:8,backgroundColor:"#C9A84C",borderRadius:4,bottom:18,right:18}} initial={{scale:0}} animate={{scale:1}} transition={{delay:0.4,type:"spring",stiffness:300}} />
      </motion.div>

      <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}} style={{marginTop:20,fontSize:28,fontWeight:800,color:"#FFFFFF",letterSpacing:0.5}}>
        ReeveOS
      </motion.p>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7,duration:0.6}} style={{marginTop:8,fontSize:12,fontWeight:500,color:"rgba(255,255,255,0.3)",letterSpacing:0.5}}>
        Your business, in your pocket
      </motion.p>

      {/* Loading bar */}
      <div style={{position:"absolute",bottom:48,width:48,height:3,borderRadius:2,overflow:"hidden",backgroundColor:"rgba(255,255,255,0.06)"}}>
        <motion.div style={{height:"100%",backgroundColor:"#C9A84C",borderRadius:2}} initial={{width:"0%"}} animate={{width:"100%"}} transition={{duration:2,ease:"easeInOut"}} />
      </div>
    </div>
  );
}
