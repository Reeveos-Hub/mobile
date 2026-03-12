import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/AuthContext";
import { useApi } from "../lib/useApi";

const D={bg:"#F2F2F7",card:"#FFF",dark:"#111",gold:"#C9A84C",mu:"#8E8E93",dv:"#C6C6C8",grn:"#34C759"};
const ss={fontFamily:"'Figtree',-apple-system,sans-serif"};
const cs={backgroundColor:D.card,borderRadius:10,marginLeft:16,marginRight:16,overflow:"hidden" as const};

export function ServicesScreen(){
  const nav=useNavigate();const{businessId}=useAuth();
  const{data:apiSvc}=useApi<any[]>(businessId?`/services/business/${businessId}/services`:null);
  const services=(apiSvc||[]).map((s:any,i:number)=>({id:s.id||i,cat:s.category||'Uncategorised',name:s.name||'Service',duration:`${s.duration||0} min`,price:s.price||0,active:s.active!==false}));
  const categories=useMemo(()=>{const cats=new Set(services.map((s:any)=>s.cat));return['All',...Array.from(cats)];},[services]);
  const[tab,setTab]=useState("All");
  const filtered=tab==="All"?services:services.filter((s:any)=>s.cat===tab);
  const activeC=services.filter(s=>s.active).length;
  const avgP=activeC>0?Math.round(services.filter(s=>s.active).reduce((a,s)=>a+s.price,0)/activeC):0;

  return(
    <div style={{...ss,backgroundColor:D.bg,minHeight:"100%",paddingBottom:100}}>
      {/* Header */}
      <div style={{backgroundColor:D.card,padding:"16px 20px 12px",borderBottom:`0.5px solid ${D.dv}`}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <button onClick={()=>nav(-1 as any)} style={{width:32,height:32,borderRadius:8,backgroundColor:D.bg,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={D.dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p style={{fontSize:17,fontWeight:600,color:D.dark,margin:0,flex:1}}>Services & Pricing</p>
          <button style={{width:36,height:36,borderRadius:18,backgroundColor:D.gold,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Stats */}
        <div style={{display:"flex",gap:10}}>
          {[{l:"Active",v:`${activeC}`},{l:"Avg Price",v:`£${avgP}`},{l:"Categories",v:`${categories.length-1}`}].map(s=>(
            <div key={s.l} style={{flex:1,padding:"10px 0",borderRadius:10,backgroundColor:D.bg,textAlign:"center"}}>
              <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:0}}>{s.v}</p>
              <p style={{fontSize:12,fontWeight:500,color:D.mu,marginTop:2,textTransform:"uppercase",letterSpacing:0.5}}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div style={{display:"flex",gap:6,padding:"12px 16px",overflowX:"auto"}}>
        {categories.map(cat=>(
          <button key={cat} onClick={()=>setTab(cat)} style={{padding:"7px 16px",borderRadius:18,border:"none",cursor:"pointer",fontSize:14,fontWeight:tab===cat?700:500,backgroundColor:tab===cat?D.dark:"transparent",color:tab===cat?D.gold:D.mu,whiteSpace:"nowrap",...ss}}>{cat}</button>
        ))}
      </div>

      {/* Service list */}
      <div style={{...cs,marginTop:8}}>
        {filtered.map((svc:any,i:number)=>(
          <React.Fragment key={svc.id}>
            {i>0&&<div style={{height:0.5,backgroundColor:D.dv,marginLeft:56}}/>}
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",minHeight:44,opacity:svc.active?1:0.5}}>
              <div style={{width:3,height:32,borderRadius:2,backgroundColor:svc.active?D.grn:D.dv,flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:17,fontWeight:500,color:D.dark,margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{svc.name}</p>
                <p style={{fontSize:14,fontWeight:400,color:D.mu,margin:0}}>{svc.duration}</p>
              </div>
              <p style={{fontSize:17,fontWeight:700,color:D.dark,margin:0,flexShrink:0}}>£{svc.price}</p>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={D.mu} strokeWidth="2" strokeLinecap="round"><path d="M6 3l5 5-5 5"/></svg>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
