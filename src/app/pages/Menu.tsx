import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const D={bg:"#F2F2F7",card:"#FFF",dark:"#111",gold:"#C9A84C",gL:"#F5EDD6",mu:"#8E8E93",dv:"#C6C6C8",red:"#FF3B30"};
const ss:any={fontFamily:"'Figtree',-apple-system,sans-serif"};
const cs:any={backgroundColor:D.card,borderRadius:10,marginLeft:16,marginRight:16,overflow:"hidden"};

// Monochrome SVG icons — 18x18, strokeWidth 1.8
const icons:Record<string,JSX.Element>={
  profile:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>,
  services:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16M4 12h10M4 18h6"/></svg>,
  reports:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  notif:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  settings:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  help:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="#111"/></svg>,
};

const sections=[
  {title:"",items:[
    {label:"Edit Profile",sub:"Account & business details",path:"/settings",icon:"profile"},
  ]},
  {title:"BUSINESS",items:[
    {label:"Services & Pricing",sub:"Manage your menu",path:"/services",icon:"services"},
    {label:"Reports & Analytics",sub:"Revenue & insights",path:"/reports",icon:"reports"},
  ]},
  {title:"APP",items:[
    {label:"Notifications",sub:"Manage alerts",path:"/notifications",icon:"notif"},
    {label:"App Settings",sub:"Booking, hours, appearance",path:"/settings",icon:"settings"},
    {label:"Help & Support",sub:"FAQs & contact",path:"/help",icon:"help"},
  ]},
];

export function Menu(){
  const nav=useNavigate();
  const{user,businessId,logout}=useAuth();
  const{data:sum}=useApi<any>(businessId?`/dashboard/business/${businessId}/summary`:null);
  const userName=user?.name||'User';
  const ini=userName.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase();

  return(
    <div style={{...ss,backgroundColor:D.bg,minHeight:"100%",paddingBottom:100}}>
      {/* Profile header */}
      <div style={{backgroundColor:D.card,paddingBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px 0"}}>
          <div style={{width:56,height:56,borderRadius:28,border:`2px solid ${D.gold}`,backgroundColor:D.gL,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:20,fontWeight:800,color:D.gold}}>{ini}</span>
          </div>
          <div style={{flex:1}}>
            <h2 style={{fontSize:22,fontWeight:700,color:D.dark,margin:0}}>{userName}</h2>
            <p style={{fontSize:13,fontWeight:400,color:D.mu,margin:"2px 0 4px"}}>{user?.email || ''}</p>
            <div style={{display:"flex",gap:6}}>
              <span style={{fontSize:10,fontWeight:700,color:"#FFF",backgroundColor:D.gold,padding:"2px 8px",borderRadius:8}}>Scale Plan</span>
              <span style={{fontSize:10,fontWeight:700,color:D.gold,backgroundColor:D.gL,padding:"2px 8px",borderRadius:8}}>Owner</span>
            </div>
          </div>
          <button onClick={()=>nav("/profile")} style={{width:32,height:32,borderRadius:16,backgroundColor:D.bg,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={D.mu} strokeWidth="2" strokeLinecap="round"><path d="M6 3l5 5-5 5"/></svg>
          </button>
        </div>
        {/* Mini stats */}
        <div style={{display:"flex",gap:10,margin:"14px 20px 0"}}>
          {[{l:"Today",v:sum?`${sum.today?.bookings} appts`:"-"},{l:"Revenue",v:sum?`£${sum.today?.revenue?.toFixed(0)}`:"-"}].map(s=>(
            <div key={s.l} style={{flex:1,padding:"10px 0",borderRadius:10,backgroundColor:D.bg,textAlign:"center"}}>
              <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:0}}>{s.v}</p>
              <p style={{fontSize:12,fontWeight:500,color:D.mu,marginTop:2,textTransform:"uppercase",letterSpacing:0.5}}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      {sections.map((sec,si)=>(
        <div key={si} style={{marginTop:si===0?12:32}}>
          {sec.title&&<p style={{fontSize:13,fontWeight:600,color:D.mu,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 8px",paddingLeft:20}}>{sec.title}</p>}
          <div style={cs}>
            {sec.items.map((item,i)=>(
              <React.Fragment key={item.label}>
                {i>0&&<div style={{height:0.5,backgroundColor:D.dv,marginLeft:56}}/>}
                <button onClick={()=>nav(item.path)} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left",...ss}}>
                  <div style={{width:32,height:32,borderRadius:8,backgroundColor:D.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {icons[item.icon]}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:17,fontWeight:500,color:D.dark,margin:0}}>{item.label}</p>
                    <p style={{fontSize:14,fontWeight:400,color:D.mu,margin:0}}>{item.sub}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={D.mu} strokeWidth="2" strokeLinecap="round"><path d="M6 3l5 5-5 5"/></svg>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}

      {/* Log out */}
      <div style={{margin:"32px 16px 0"}}>
        <button onClick={()=>logout()} style={{width:"100%",padding:"14px 0",borderRadius:10,backgroundColor:`${D.red}10`,border:"none",cursor:"pointer",fontSize:17,fontWeight:600,color:D.red,...ss}}>Log Out</button>
      </div>
      <p style={{textAlign:"center",fontSize:12,fontWeight:500,color:D.mu,marginTop:12}}>ReeveOS v2.0 · Build 1</p>
    </div>
  );
}
