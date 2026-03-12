import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const D={bg:"#F2F2F7",card:"#FFF",dark:"#111",gold:"#C9A84C",gL:"#F5EDD6",mu:"#8E8E93",dv:"#C6C6C8",grn:"#34C759"};
const ss={fontFamily:"'Figtree',-apple-system,sans-serif"};
const cs={backgroundColor:D.card,borderRadius:10,marginLeft:16,marginRight:16,overflow:"hidden" as const};

const faqs=[
  {q:"How do I add a new appointment?",a:"Tap the + button on the Calendar screen or use the quick-add button on the Home screen. Select client, service, date and time."},
  {q:"Can clients book online?",a:"Yes! Share your booking link from Settings → Booking Link. Clients can view availability and book 24/7."},
  {q:"How does Tap to Pay work?",a:"Open Take Payment, enter the amount, and hold a contactless card near your iPhone. No extra hardware required."},
  {q:"How do I send reminders?",a:"SMS reminders are sent automatically 24 hours before each appointment. Toggle this in Settings → Notifications."},
  {q:"What is the Scale plan?",a:"Scale is £59/month — unlocks Shop, advanced analytics, floor plan, white-label, and priority support."},
  {q:"How do I export data (GDPR)?",a:"Go to Profile → Data Export. We'll compile a full export of your data within 48 hours and email it to you."},
];

const contacts=[
  {label:"Email Support",sub:"hello@reeveos.app",tag:"< 24hr"},
  {label:"Live Chat",sub:"In-app messaging",tag:"Online"},
];

export function HelpScreen(){
  const nav=useNavigate();
  const[openFaq,setOpenFaq]=useState<number|null>(null);

  return(
    <div style={{...ss,backgroundColor:D.bg,minHeight:"100%",paddingBottom:100}}>
      {/* Header */}
      <div style={{backgroundColor:D.card,padding:"16px 20px",borderBottom:`0.5px solid ${D.dv}`}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <button onClick={()=>nav(-1 as any)} style={{width:32,height:32,borderRadius:8,backgroundColor:D.bg,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={D.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p style={{fontSize:17,fontWeight:600,color:D.dark,margin:0}}>Help & Support</p>
        </div>
        {/* Search */}
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,backgroundColor:D.bg}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke={D.mu} strokeWidth="1.5"/><path d="M10.5 10.5L14 14" stroke={D.mu} strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input placeholder="Search help articles..." style={{flex:1,backgroundColor:"transparent",border:"none",outline:"none",fontSize:17,fontWeight:400,color:D.dark,...ss}}/>
        </div>
      </div>

      {/* Contact options */}
      <div style={{...cs,marginTop:20}}>
        {contacts.map((c,i)=>(
          <React.Fragment key={c.label}>
            {i>0&&<div style={{height:0.5,backgroundColor:D.dv,marginLeft:56}}/>}
            <button style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 16px",background:"none",border:"none",cursor:"pointer",...ss}}>
              <div style={{width:36,height:36,borderRadius:18,backgroundColor:D.gL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke={D.gold} strokeWidth="1.5" strokeLinecap="round"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/><path d="M3 7l7 5 7-5"/></svg>
              </div>
              <div style={{flex:1,textAlign:"left"}}>
                <p style={{fontSize:17,fontWeight:500,color:D.dark,margin:0}}>{c.label}</p>
                <p style={{fontSize:14,fontWeight:400,color:D.mu,margin:0}}>{c.sub}</p>
              </div>
              <span style={{fontSize:12,fontWeight:600,color:D.grn,backgroundColor:`${D.grn}12`,padding:"3px 10px",borderRadius:10}}>{c.tag}</span>
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Resources */}
      <div style={{marginTop:32}}>
        <p style={{fontSize:13,fontWeight:600,color:D.mu,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 8px",paddingLeft:20}}>Resources</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0 16px"}}>
          {["Getting Started","Video Tutorials","API Docs","Community"].map(r=>(
            <button key={r} style={{backgroundColor:D.card,borderRadius:10,padding:16,border:"none",cursor:"pointer",textAlign:"left",...ss}}>
              <p style={{fontSize:14,fontWeight:600,color:D.dark,margin:0}}>{r}</p>
            </button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div style={{marginTop:32}}>
        <p style={{fontSize:13,fontWeight:600,color:D.mu,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 8px",paddingLeft:20}}>Frequently Asked</p>
        <div style={cs}>
          {faqs.map((faq,i)=>(
            <React.Fragment key={i}>
              {i>0&&<div style={{height:0.5,backgroundColor:D.dv,marginLeft:16}}/>}
              <div>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{display:"flex",alignItems:"center",width:"100%",padding:"12px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left",...ss}}>
                  <p style={{flex:1,fontSize:17,fontWeight:400,color:D.dark,margin:0}}>{faq.q}</p>
                  <motion.div animate={{rotate:openFaq===i?180:0}} transition={{duration:0.2}}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={D.mu} strokeWidth="2" strokeLinecap="round"><path d="M4 6l4 4 4-4"/></svg>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq===i&&(
                    <motion.div key="a" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.2}} style={{overflow:"hidden"}}>
                      <p style={{padding:"0 16px 14px",fontSize:15,fontWeight:400,color:D.mu,lineHeight:1.5,margin:0}}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <p style={{textAlign:"center",fontSize:12,fontWeight:500,color:D.mu,marginTop:32}}>ReeveOS v2.0 · Build 1</p>
    </div>
  );
}
