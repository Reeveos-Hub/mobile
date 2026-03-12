import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const D={bg:"#F2F2F7",card:"#FFF",dark:"#111",gold:"#C9A84C",mu:"#8E8E93",dv:"#C6C6C8",grn:"#34C759"};
const ss={fontFamily:"'Figtree',-apple-system,sans-serif"};
const cs={backgroundColor:D.card,borderRadius:10,marginLeft:16,marginRight:16,overflow:"hidden" as const};

const revData=[{day:"Mon",value:320},{day:"Tue",value:540},{day:"Wed",value:420},{day:"Thu",value:680},{day:"Fri",value:780},{day:"Sat",value:920},{day:"Sun",value:210}];
const svcBreak=[{name:"Microneedling",pct:34,rev:1260,color:D.gold},{name:"RF Needling",pct:22,rev:814,color:D.dark},{name:"Chemical Peel",pct:18,rev:666,color:"#8B6914"},{name:"Lymphatic Lift",pct:14,rev:518,color:"#D4B483"},{name:"Other",pct:12,rev:444,color:D.dv}];

export function ReportsScreen(){
  const nav=useNavigate();const{businessId}=useAuth();
  const{data:sum}=useApi<any>(businessId?`/dashboard/business/${businessId}/summary`:null);
  const[period,setPeriod]=useState("Week");
  const total=sum?.period?.revenue||revData.reduce((s,d)=>s+d.value,0);

  return(
    <div style={{...ss,backgroundColor:D.bg,minHeight:"100%",paddingBottom:100}}>
      {/* Header */}
      <div style={{backgroundColor:D.card,padding:"16px 20px 20px",borderBottom:`0.5px solid ${D.dv}`}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <button onClick={()=>nav(-1 as any)} style={{width:32,height:32,borderRadius:8,backgroundColor:D.bg,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={D.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p style={{fontSize:17,fontWeight:600,color:D.dark,margin:0}}>Reports</p>
        </div>

        {/* Period toggle */}
        <div style={{display:"flex",padding:2,borderRadius:10,backgroundColor:D.bg,marginBottom:20}}>
          {["Week","Month","Year"].map(p=>(
            <button key={p} onClick={()=>setPeriod(p)} style={{flex:1,padding:"8px 0",borderRadius:8,border:"none",cursor:"pointer",fontSize:14,fontWeight:600,backgroundColor:period===p?D.gold:"transparent",color:period===p?"#FFF":D.mu,...ss}}>{p}</button>
          ))}
        </div>

        {/* Key metric */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
          <div>
            <p style={{fontSize:13,fontWeight:600,color:D.mu,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 4px"}}>Total Revenue</p>
            <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
              <p style={{fontSize:28,fontWeight:800,color:D.dark,margin:0,letterSpacing:-1,lineHeight:1}}>£{total.toLocaleString()}</p>
              <span style={{fontSize:14,fontWeight:700,color:D.grn,marginBottom:2}}>+18%</span>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{fontSize:13,fontWeight:600,color:D.mu,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 4px"}}>Avg/Day</p>
            <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:0,opacity:0.6}}>£{Math.round(total/7)}</p>
          </div>
        </div>
      </div>

      {/* Revenue chart */}
      <div style={{...cs,marginTop:20,padding:16}}>
        <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:"0 0 12px"}}>Revenue This Week</p>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={revData} margin={{top:2,right:0,left:-30,bottom:0}}>
            <defs><linearGradient id="gld" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={D.gold} stopOpacity={0.2}/><stop offset="95%" stopColor={D.gold} stopOpacity={0}/></linearGradient></defs>
            <XAxis dataKey="day" tick={{fontSize:12,fontWeight:600,fill:D.mu}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:10,fill:D.dv}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{background:D.dark,border:"none",borderRadius:8,color:"#fff",fontSize:14,fontWeight:700}} formatter={(v:any)=>[`£${v}`,""]} labelStyle={{color:D.gold}}/>
            <Area type="monotone" dataKey="value" stroke={D.gold} strokeWidth={2} fill="url(#gld)" dot={false}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:`20px 16px 0`}}>
        {[{l:"Appointments",v:`${sum?.period?.bookings||'-'}`},{l:"Avg Ticket",v:sum?`£${Math.round(sum.period.revenue/Math.max(sum.period.bookings,1))}`:'-'},{l:"No-Shows",v:`${sum?.today?.noShows||0}`},{l:"New Clients",v:`${sum?.today?.newClients||0}`}].map((s,i)=>(
          <div key={s.l} style={{backgroundColor:D.card,borderRadius:10,padding:16}}>
            <p style={{fontSize:13,fontWeight:600,color:D.mu,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 6px"}}>{s.l}</p>
            <p style={{fontSize:22,fontWeight:800,color:D.dark,margin:0,letterSpacing:-0.5}}>{s.v}</p>
          </div>
        ))}
      </div>

      {/* Top services */}
      <div style={{...cs,marginTop:20,padding:16}}>
        <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:"0 0 16px"}}>Top Services</p>
        {svcBreak.map((svc,i)=>(
          <div key={svc.name} style={{marginBottom:i<svcBreak.length-1?12:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:8,height:8,borderRadius:4,backgroundColor:svc.color}}/>
                <p style={{fontSize:14,fontWeight:600,color:D.dark,margin:0}}>{svc.name}</p>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:14,fontWeight:500,color:D.mu}}>{svc.pct}%</span>
                <p style={{fontSize:14,fontWeight:700,color:D.dark,margin:0}}>£{svc.rev}</p>
              </div>
            </div>
            <div style={{height:6,backgroundColor:D.bg,borderRadius:3,overflow:"hidden"}}>
              <motion.div initial={{width:0}} animate={{width:`${svc.pct}%`}} transition={{delay:0.2+i*0.06,duration:0.5}} style={{height:"100%",borderRadius:3,backgroundColor:svc.color}}/>
            </div>
          </div>
        ))}
      </div>

      {/* Client health */}
      <div style={{...cs,marginTop:20,padding:16,marginBottom:20}}>
        <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:"0 0 12px"}}>Client Health</p>
        <div style={{display:"flex",gap:10}}>
          {[{l:"Retention",v:"-",c:D.grn},{l:"Avg Rating",v:"-",c:D.gold},{l:"Rebooking",v:"-",c:"#3B82F6"}].map(m=>(
            <div key={m.l} style={{flex:1,textAlign:"center",padding:"12px 0",backgroundColor:D.bg,borderRadius:10}}>
              <p style={{fontSize:20,fontWeight:800,color:m.c,margin:0}}>{m.v}</p>
              <p style={{fontSize:12,fontWeight:500,color:D.mu,marginTop:4,textTransform:"uppercase",letterSpacing:0.5}}>{m.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
