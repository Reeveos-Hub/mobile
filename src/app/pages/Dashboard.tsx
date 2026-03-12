import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const D = { bg:"#F2F2F7", card:"#FFF", dark:"#111", gold:"#C9A84C", gL:"#F5EDD6", mu:"#8E8E93", dv:"#C6C6C8", su:"#E5E5EA", grn:"#34C759" };
const DAYS=["S","M","T","W","T","F","S"];
function wkDates(){const t=new Date(),dow=t.getDay();return Array.from({length:7},(_,i)=>{const d=new Date(t);d.setDate(t.getDate()-dow+i);return d.getDate();});}
function greet(){const h=new Date().getHours();return h<12?"Good morning":h<17?"Good afternoon":"Good evening";}

export function Dashboard(){
  const nav=useNavigate();const{user,businessId}=useAuth();
  const DATES=wkDates(),TDI=new Date().getDay();
  const[selDay,setSelDay]=useState(TDI);
  const{data:sum}=useApi<any>(businessId?`/dashboard/business/${businessId}/summary`:null);
  const{data:td}=useApi<any>(businessId?`/dashboard/business/${businessId}/today`:null);
  const name=user?.name?.split(' ')[0]||'there';
  const ini=(user?.name||'U').split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase();
  const upcoming=(td?.bookings||[]).map((b:any,i:number)=>({id:i+1,client:b.customerName||'Client',service:b.service||'Booking',time:b.time||'',price:b.price?`£${b.price}`:'',status:(b.status||'confirmed').replace(/_/g,' ').replace(/\b\w/g,(c:string)=>c.toUpperCase())}));
  const tB=sum?.today?.bookings||0,tR=sum?.today?.revenue||0,wR=sum?.period?.revenue||0,wB=sum?.period?.bookings||0;
  const ss={fontFamily:"'Figtree',-apple-system,sans-serif"};
  const cs={backgroundColor:D.card,borderRadius:10,marginLeft:16,marginRight:16,overflow:"hidden" as const};

  return(
    <div style={{...ss,backgroundColor:D.bg,minHeight:"100%",paddingBottom:100}}>

      {/* Profile header */}
      <div style={{backgroundColor:D.card,paddingBottom:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:22,border:`2px solid ${D.gold}`,backgroundColor:D.gL,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:16,fontWeight:800,color:D.gold}}>{ini}</span>
            </div>
            <div>
              <p style={{fontSize:14,fontWeight:500,color:D.mu,margin:0}}>{greet()}</p>
              <h1 style={{fontSize:22,fontWeight:700,color:D.dark,margin:0}}>{name}</h1>
            </div>
          </div>
          <button onClick={()=>nav("/notifications")} style={{width:36,height:36,borderRadius:18,backgroundColor:D.bg,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={D.dark} strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <div style={{position:"absolute",top:6,right:6,width:8,height:8,borderRadius:4,backgroundColor:D.gold}}/>
          </button>
        </div>
      </div>

      {/* Week strip */}
      <div style={{...cs,marginTop:12,padding:"8px 4px"}}>
        <div style={{display:"flex"}}>
          {DAYS.map((d,i)=>{const sel=i===selDay;return(
            <button key={i} onClick={()=>setSelDay(i)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",background:"none",border:"none",cursor:"pointer",padding:"4px 0"}}>
              <span style={{fontSize:12,fontWeight:600,color:D.mu}}>{d}</span>
              <div style={{width:36,height:36,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:sel?D.dark:"transparent",marginTop:4}}>
                <span style={{fontSize:17,fontWeight:sel?700:500,color:sel?"#FFF":D.dark}}>{DATES[i]}</span>
              </div>
              {sel&&<div style={{width:4,height:4,borderRadius:2,backgroundColor:D.gold,marginTop:3}}/>}
              {!sel&&<div style={{height:4,marginTop:3}}/>}
            </button>
          );})}
        </div>
      </div>

      {/* Today's stats */}
      <div style={{...cs,marginTop:32,padding:16}}>
        <p style={{fontSize:13,fontWeight:600,color:D.mu,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 12px"}}>Today's Overview</p>
        <div style={{display:"flex",gap:12}}>
          {[{l:"Bookings",v:`${tB}`},{l:"Remaining",v:`${sum?.today?.upcomingBookings||0}`},{l:"Revenue",v:`£${tR.toLocaleString()}`}].map((s,i)=>(
            <div key={i} style={{flex:1,textAlign:"center"}}>
              <p style={{fontSize:24,fontWeight:800,color:D.dark,margin:0,letterSpacing:-0.5}}>{s.v}</p>
              <p style={{fontSize:12,fontWeight:500,color:D.mu,marginTop:4}}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{display:"flex",gap:12,margin:"32px 16px 0"}}>
        <motion.button onClick={()=>nav("/ai")} whileTap={{scale:0.97}} style={{flex:1,padding:16,borderRadius:10,backgroundColor:D.gL,border:"none",cursor:"pointer",textAlign:"left",minHeight:120,...ss}}>
          <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:0}}>AI Assistant</p>
          <p style={{fontSize:14,fontWeight:500,color:D.gold,margin:"4px 0 0"}}>Ask anything</p>
          <p style={{fontSize:28,fontWeight:800,color:D.dark,margin:"16px 0 0",lineHeight:1}}>Ask <span style={{fontSize:14,fontWeight:500,color:D.mu}}>Me</span></p>
        </motion.button>
        <motion.button onClick={()=>nav("/payment")} whileTap={{scale:0.97}} style={{flex:1,padding:16,borderRadius:10,backgroundColor:D.card,border:"none",cursor:"pointer",textAlign:"left",minHeight:120,...ss}}>
          <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:0}}>Tap to Pay</p>
          <p style={{fontSize:14,fontWeight:500,color:D.mu,margin:"4px 0 0"}}>Stripe NFC</p>
          <p style={{fontSize:28,fontWeight:800,color:D.dark,margin:"16px 0 0",lineHeight:1}}>£{wR.toLocaleString()}<span style={{fontSize:12,fontWeight:500,color:D.mu,marginLeft:4}}>week</span></p>
        </motion.button>
      </div>

      {/* Up Next */}
      <div style={{...cs,marginTop:32}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 16px 12px"}}>
          <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:0}}>Up Next</p>
          <button onClick={()=>nav("/calendar")} style={{fontSize:14,fontWeight:600,color:D.gold,background:"none",border:"none",cursor:"pointer"}}>See all →</button>
        </div>
        {upcoming.length===0&&<div style={{padding:"12px 16px 20px",textAlign:"center"}}><p style={{fontSize:17,color:D.mu}}>No upcoming appointments</p></div>}
        {upcoming.map((item:any,i:number)=>(
          <React.Fragment key={item.id}>
            {i>0&&<div style={{height:0.5,backgroundColor:D.dv,marginLeft:16}}/>}
            <div onClick={()=>nav("/calendar")} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",minHeight:44,cursor:"pointer"}}>
              <div style={{width:3,height:36,borderRadius:2,backgroundColor:item.status==="Arrived"?D.grn:item.status==="Pending"?D.gold:D.dark,flexShrink:0}}/>
              <div style={{width:40,height:40,borderRadius:20,backgroundColor:D.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:14,fontWeight:700,color:D.dark}}>{item.client.split(' ').map((w:string)=>w[0]).join('').slice(0,2)}</span>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:17,fontWeight:600,color:D.dark,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.client}</p>
                <p style={{fontSize:14,fontWeight:500,color:D.mu,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.service}</p>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:0}}>{item.time}</p>
                <span style={{fontSize:11,fontWeight:600,color:item.status==="Arrived"?D.grn:D.gold,backgroundColor:item.status==="Arrived"?`${D.grn}15`:`${D.gold}15`,padding:"2px 8px",borderRadius:10}}>{item.status}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Weekly summary */}
      <div style={{...cs,marginTop:32,padding:16,marginBottom:20}}>
        <p style={{fontSize:14,fontWeight:500,color:D.mu,textAlign:"center",margin:0}}>
          This week: <span style={{fontWeight:700,color:D.dark}}>{wB} bookings</span> · £{wR.toLocaleString()} revenue
        </p>
      </div>
    </div>
  );
}
