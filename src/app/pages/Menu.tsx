import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const D={bg:"#F2F2F7",card:"#FFF",dark:"#111",gold:"#C9A84C",gL:"#F5EDD6",mu:"#8E8E93",dv:"#C6C6C8"};
const ss={fontFamily:"'Figtree',-apple-system,sans-serif"};
const cs={backgroundColor:D.card,borderRadius:10,marginLeft:16,marginRight:16,overflow:"hidden" as const};

const sections=[
  {title:"",items:[
    {label:"My Profile",sub:"Account details",path:"/profile",ic:"M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-4 3.6-7 8-7s8 3 8 7"},
  ]},
  {title:"BUSINESS",items:[
    {label:"Services & Pricing",sub:"Manage your menu",path:"/services",ic:"M3 5h12M3 9h12M3 13h8"},
    {label:"Client List",sub:"View all clients",path:"/clients",ic:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"},
    {label:"Reports & Analytics",sub:"Revenue & insights",path:"/reports",ic:"M18 20V10M12 20V4M6 20v-6"},
    {label:"Take Payment",sub:"Stripe NFC",path:"/payment",ic:"M2 5h20v14H2zM2 10h20"},
  ]},
  {title:"APP",items:[
    {label:"Notifications",sub:"Manage alerts",path:"/notifications",ic:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"},
    {label:"App Settings",sub:"Booking, hours, appearance",path:"/settings",ic:"M12 12a3 3 0 100-6 3 3 0 000 6z"},
    {label:"Help & Support",sub:"FAQs & contact",path:"/help",ic:"M12 12a10 10 0 100-10"},
    {label:"Shop",sub:"Products & inventory",path:"/shop",ic:"M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"},
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

      {/* Profile card */}
      <div style={{backgroundColor:D.card,paddingBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px 0"}}>
          <div style={{width:56,height:56,borderRadius:28,border:`2px solid ${D.gold}`,backgroundColor:D.gL,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:20,fontWeight:800,color:D.gold}}>{ini}</span>
          </div>
          <div style={{flex:1}}>
            <h2 style={{fontSize:22,fontWeight:700,color:D.dark,margin:0}}>{userName}</h2>
            <p style={{fontSize:14,fontWeight:500,color:D.gold,margin:0}}>Salon Owner</p>
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

      {/* Menu sections */}
      {sections.map((sec,si)=>(
        <div key={si} style={{marginTop:si===0?12:32}}>
          {sec.title&&<p style={{fontSize:13,fontWeight:600,color:D.mu,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 8px",paddingLeft:20}}>{sec.title}</p>}
          <div style={cs}>
            {sec.items.map((item,i)=>(
              <React.Fragment key={item.label}>
                {i>0&&<div style={{height:0.5,backgroundColor:D.dv,marginLeft:56}}/>}
                <button onClick={()=>nav(item.path)} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"0 16px",minHeight:44,background:"none",border:"none",cursor:"pointer",textAlign:"left",...ss}}>
                  <div style={{width:28,height:28,borderRadius:7,backgroundColor:D.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={D.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={item.ic}/></svg>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:17,fontWeight:400,color:D.dark,margin:0}}>{item.label}</p>
                  </div>
                  <p style={{fontSize:14,fontWeight:400,color:D.mu,margin:0,marginRight:4}}>{item.sub}</p>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={D.mu} strokeWidth="2" strokeLinecap="round"><path d="M6 3l5 5-5 5"/></svg>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}

      {/* Log out */}
      <div style={{margin:"32px 16px 0"}}>
        <button onClick={()=>logout()} style={{width:"100%",padding:"14px 0",borderRadius:10,backgroundColor:"#FF3B3010",border:"none",cursor:"pointer",fontSize:17,fontWeight:600,color:"#FF3B30",...ss}}>Log Out</button>
      </div>
      <p style={{textAlign:"center",fontSize:12,fontWeight:500,color:D.mu,marginTop:12}}>ReeveOS v2.0 · Build 1</p>
    </div>
  );
}
