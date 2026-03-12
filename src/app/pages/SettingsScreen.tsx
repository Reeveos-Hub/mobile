import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const D={bg:"#F2F2F7",card:"#FFF",dark:"#111",gold:"#C9A84C",mu:"#8E8E93",dv:"#C6C6C8",grn:"#34C759",red:"#FF3B30"};
const ss={fontFamily:"'Figtree',-apple-system,sans-serif"};
const cs={backgroundColor:D.card,borderRadius:10,marginLeft:16,marginRight:16,overflow:"hidden" as const};

function Toggle({on,onToggle}:{on:boolean;onToggle:()=>void}){
  return(<button onClick={onToggle} style={{width:51,height:31,borderRadius:16,backgroundColor:on?D.grn:"#E9E9EA",border:"none",cursor:"pointer",position:"relative",flexShrink:0,transition:"background 0.2s"}}>
    <motion.div animate={{x:on?22:2}} transition={{type:"spring",stiffness:500,damping:28}} style={{position:"absolute",top:2,width:27,height:27,borderRadius:14,backgroundColor:"#FFF",boxShadow:"0 1px 3px rgba(0,0,0,0.15)"}}/>
  </button>);
}

type TK="smsReminders"|"emailReceipts"|"pushNotif"|"onlineBooking"|"depositRequired"|"autoConfirm"|"cancellationFee"|"waitlist"|"darkMode";
const sections:{title:string;items:{key:TK;label:string;sub:string}[]}[]=[
  {title:"NOTIFICATIONS",items:[
    {key:"smsReminders",label:"SMS Reminders",sub:"24hrs before appointment"},
    {key:"emailReceipts",label:"Email Receipts",sub:"Auto-send after payment"},
    {key:"pushNotif",label:"Push Notifications",sub:"Bookings & cancellations"},
  ]},
  {title:"BOOKING",items:[
    {key:"onlineBooking",label:"Online Booking",sub:"Clients book via your link"},
    {key:"depositRequired",label:"Require Deposit",sub:"50% upfront for new clients"},
    {key:"autoConfirm",label:"Auto-Confirm",sub:"Skip manual approval"},
    {key:"cancellationFee",label:"Cancellation Fee",sub:"<24hr cancellations"},
    {key:"waitlist",label:"Waitlist",sub:"Auto-fill cancelled slots"},
  ]},
  {title:"APPEARANCE",items:[
    {key:"darkMode",label:"Dark Mode (Beta)",sub:"System-wide dark theme"},
  ]},
];

export function SettingsScreen(){
  const nav=useNavigate();
  const{businessId}=useAuth();
  const{data:biz}=useApi<any>(businessId?`/settings/business/${businessId}`:null);
  const slug=biz?.slug||businessId||'';
  const[toggles,setToggles]=useState<Record<TK,boolean>>({smsReminders:true,emailReceipts:true,pushNotif:true,onlineBooking:true,depositRequired:false,autoConfirm:true,cancellationFee:false,waitlist:true,darkMode:false});
  const toggle=(k:TK)=>setToggles(p=>({...p,[k]:!p[k]}));

  return(
    <div style={{...ss,backgroundColor:D.bg,minHeight:"100%",paddingBottom:100}}>
      {/* Header */}
      <div style={{backgroundColor:D.card,padding:"16px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:`0.5px solid ${D.dv}`}}>
        <button onClick={()=>nav(-1 as any)} style={{width:32,height:32,borderRadius:8,backgroundColor:D.bg,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={D.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <p style={{fontSize:17,fontWeight:600,color:D.dark,margin:0}}>Settings</p>
      </div>

      {/* Toggle sections */}
      {sections.map((sec,si)=>(
        <div key={sec.title} style={{marginTop:si===0?20:32}}>
          <p style={{fontSize:13,fontWeight:600,color:D.mu,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 8px",paddingLeft:20}}>{sec.title}</p>
          <div style={cs}>
            {sec.items.map((item,i)=>(
              <React.Fragment key={item.key}>
                {i>0&&<div style={{height:0.5,backgroundColor:D.dv,marginLeft:16}}/>}
                <div style={{display:"flex",alignItems:"center",gap:12,padding:"0 16px",minHeight:44}}>
                  <div style={{flex:1}}>
                    <p style={{fontSize:17,fontWeight:400,color:D.dark,margin:0}}>{item.label}</p>
                    <p style={{fontSize:14,fontWeight:400,color:D.mu,margin:0}}>{item.sub}</p>
                  </div>
                  <Toggle on={toggles[item.key]} onToggle={()=>toggle(item.key)}/>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}

      {/* Booking Link */}
      <div style={{marginTop:32}}>
        <p style={{fontSize:13,fontWeight:600,color:D.mu,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 8px",paddingLeft:20}}>Booking Link</p>
        <div style={{...cs,padding:16}}>
          <p style={{fontSize:14,fontWeight:400,color:D.mu,margin:"0 0 8px"}}>Your public booking URL</p>
          <div style={{display:"flex",alignItems:"center",gap:8,backgroundColor:D.bg,borderRadius:10,padding:"10px 12px"}}>
            <p style={{flex:1,fontSize:14,fontWeight:600,color:D.dark,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>portal.rezvo.app/book/{slug}</p>
            <button style={{fontSize:14,fontWeight:700,color:D.gold,background:"none",border:"none",cursor:"pointer"}}>Copy</button>
          </div>
        </div>
      </div>

      {/* Working Hours */}
      <div style={{marginTop:32}}>
        <p style={{fontSize:13,fontWeight:600,color:D.mu,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 8px",paddingLeft:20}}>Working Hours</p>
        <div style={cs}>
          {[{d:"Mon – Fri",h:"9:00 AM – 6:00 PM"},{d:"Saturday",h:"9:00 AM – 4:00 PM"},{d:"Sunday",h:"Closed"}].map((wh,i)=>(
            <React.Fragment key={wh.d}>
              {i>0&&<div style={{height:0.5,backgroundColor:D.dv,marginLeft:16}}/>}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",minHeight:44}}>
                <p style={{fontSize:17,fontWeight:400,color:D.dark,margin:0}}>{wh.d}</p>
                <p style={{fontSize:17,fontWeight:400,color:D.mu,margin:0}}>{wh.h}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div style={{marginTop:32}}>
        <p style={{fontSize:13,fontWeight:600,color:`${D.red}99`,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 8px",paddingLeft:20}}>Danger Zone</p>
        <div style={{...cs,borderColor:"#FEE2E2"}}>
          {["Clear Notifications","Delete Client Data","Delete Account"].map((label,i)=>(
            <React.Fragment key={label}>
              {i>0&&<div style={{height:0.5,backgroundColor:"#FEE2E2",marginLeft:16}}/>}
              <button style={{display:"block",width:"100%",padding:"0 16px",minHeight:44,textAlign:"left",fontSize:17,fontWeight:400,color:D.red,background:"none",border:"none",cursor:"pointer",...ss}}>{label}</button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
