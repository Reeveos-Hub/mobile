import { useState, useMemo } from "react";

const STAFF_COLORS=['#D4A574','#6BA3C7','#A87BBF','#6BC7A3'];
const C={bg:"#F5F5F5",card:"#FFF",dark:"#111",gold:"#C9A84C",gL:"#F5EDD6",mu:"#999",bd:"#EBEBEB",red:"#EF4444"};
const DY=["MON","TUE","WED","THU","FRI","SAT","SUN"];
const HH=80,SH=9,EH=18,MIN_CARD=52,WHH=80;
const hrs=Array.from({length:EH-SH},(_,i)=>i+SH);
const ST=[{id:"natalie",name:"Natalie",i:"N",color:STAFF_COLORS[0]},{id:"grace",name:"Grace",i:"G",color:STAFF_COLORS[1]},{id:"emily",name:"Emily",i:"E",color:STAFF_COLORS[2]},{id:"jen",name:"Jen",i:"J",color:STAFF_COLORS[3]}];
const BLOCKS_BY_DAY:Record<number,{staffId:string;start:number;dur:number;label:string}[]>={3:[{staffId:"natalie",start:13,dur:1,label:"LUNCH"}],4:[{staffId:"grace",start:9,dur:1,label:"TRAINING"},{staffId:"emily",start:12,dur:1,label:"PERSONAL"}]};
const BK:Record<number,{id:string;sId:string;s:number;d:number;c:string;sv:string;p:number;st:string}[]>={0:[{id:"b1",sId:"grace",s:10.5,d:0.5,c:"Rebecca Roberts",sv:"Dermaplaning",p:45,st:"confirmed"},{id:"b2",sId:"grace",s:11,d:1.25,c:"Sophie Thomas",sv:"Luxury Lymphatic Lift",p:120,st:"confirmed"},{id:"b3",sId:"jen",s:10,d:1,c:"Sarah Williams",sv:"Express Lymphatic Lift",p:55,st:"pending"}],1:[{id:"b4",sId:"natalie",s:9.5,d:1,c:"Amy Roberts",sv:"Chemical Peel",p:85,st:"confirmed"},{id:"b5",sId:"emily",s:10,d:0.75,c:"Hannah Price",sv:"Dermaplaning",p:45,st:"confirmed"},{id:"b6",sId:"natalie",s:11,d:1.5,c:"Olivia James",sv:"Microneedling Facial",p:150,st:"confirmed"},{id:"b7",sId:"grace",s:13,d:1,c:"Lucy Thompson",sv:"RF Needling",p:130,st:"pending"},{id:"b8",sId:"jen",s:14,d:1,c:"Natalie Hughes",sv:"Chemical Peel",p:85,st:"completed"}],2:[{id:"b9",sId:"natalie",s:10,d:1,c:"Jen Davies",sv:"Polynucleotides",p:180,st:"confirmed"},{id:"b10",sId:"emily",s:10,d:1,c:"Sarah Mitchell",sv:"Chemical Peel",p:85,st:"confirmed"},{id:"b11",sId:"natalie",s:12,d:1,c:"Grace Williams",sv:"Lymphatic Lift",p:95,st:"confirmed"},{id:"b12",sId:"grace",s:11,d:0.75,c:"Natalie Hughes",sv:"Dermaplaning",p:45,st:"completed"},{id:"b13",sId:"emily",s:14,d:1,c:"Rebecca Moore",sv:"Microneedling",p:150,st:"pending"},{id:"b14",sId:"jen",s:15,d:1.5,c:"Victoria Brown",sv:"Microneedling — Neck",p:150,st:"confirmed"}],3:[{id:"b15",sId:"natalie",s:9,d:1,c:"Charlotte Davies",sv:"Microneedling Facial",p:150,st:"checked_in"},{id:"b16",sId:"grace",s:11,d:0.75,c:"Jessica Edwards",sv:"Express Lymphatic",p:65,st:"confirmed"},{id:"b17",sId:"emily",s:11,d:1,c:"Victoria Brown",sv:"Microneedling Facial",p:150,st:"confirmed"},{id:"b18",sId:"natalie",s:14,d:1,c:"Charlotte Davies",sv:"RF Needling",p:120,st:"pending"},{id:"b19",sId:"grace",s:14,d:1.5,c:"Amy Roberts",sv:"RF Needling",p:130,st:"confirmed"},{id:"b20",sId:"emily",s:13.5,d:1,c:"Jen Davies",sv:"Polynucleotides",p:180,st:"confirmed"},{id:"b21",sId:"natalie",s:15.75,d:0.75,c:"Sarah Mitchell",sv:"Chemical Peel",p:85,st:"confirmed"},{id:"b22",sId:"jen",s:15.5,d:1,c:"Sarah Williams",sv:"Express Lymphatic",p:55,st:"pending"}],4:[{id:"b23",sId:"natalie",s:10,d:1.5,c:"Hannah Price",sv:"Luxury Lymphatic",p:120,st:"confirmed"},{id:"b24",sId:"grace",s:10,d:1,c:"Olivia James",sv:"Dermaplaning",p:45,st:"completed"},{id:"b25",sId:"emily",s:10,d:0.75,c:"Lucy Thompson",sv:"Express Lymphatic",p:65,st:"confirmed"},{id:"b26",sId:"natalie",s:13,d:1,c:"Grace Williams",sv:"Chemical Peel",p:85,st:"confirmed"},{id:"b27",sId:"jen",s:11,d:1,c:"Rebecca Roberts",sv:"Dermaplaning",p:45,st:"confirmed"}],5:[{id:"b28",sId:"natalie",s:9,d:1,c:"Sophie Thomas",sv:"Microneedling",p:150,st:"confirmed"},{id:"b29",sId:"grace",s:9.5,d:1.5,c:"Rebecca Roberts",sv:"RF Needling",p:130,st:"confirmed"},{id:"b30",sId:"emily",s:11,d:1,c:"Amy Roberts",sv:"Chemical Peel",p:85,st:"pending"}],6:[]};

const UK_HOLIDAYS:Record<string,{l:string;t:string}>={"2026-01-01":{l:"New Year's Day",t:"bank"},"2026-03-15":{l:"Mother's Day",t:"note"},"2026-03-29":{l:"Clocks Go Forward",t:"note"},"2026-04-03":{l:"Good Friday",t:"bank"},"2026-04-06":{l:"Easter Monday",t:"bank"},"2026-05-04":{l:"Early May Bank Holiday",t:"bank"},"2026-05-25":{l:"Spring Bank Holiday",t:"bank"},"2026-06-21":{l:"Father's Day",t:"note"},"2026-08-31":{l:"Summer Bank Holiday",t:"bank"},"2026-10-25":{l:"Clocks Go Back",t:"note"},"2026-10-31":{l:"Halloween",t:"note"},"2026-11-05":{l:"Bonfire Night",t:"note"},"2026-12-25":{l:"Christmas Day",t:"bank"},"2026-12-28":{l:"Boxing Day (sub)",t:"bank"}};
const UPCOMING_HOLIDAYS=Object.entries(UK_HOLIDAYS).filter(([k])=>new Date(k)>=new Date()).slice(0,6);

const fmtC=(h:number)=>{const hr=Math.floor(h),mn=Math.round((h-hr)*60);return mn>0?`${hr}:${String(mn).padStart(2,'0')}`:`${hr}`;};
const fmtR=(s:number,d:number)=>`${fmtC(s)}-${fmtC(s+d)}`;
const fmtAP=(h:number)=>{const hr=h>12?h-12:h===0?12:h;return`${hr}${h>=12?'pm':'am'}`;};
const txtColor=(bg:string)=>{const hex=bg.replace('#','');const r=parseInt(hex.substring(0,2),16),g=parseInt(hex.substring(2,4),16),b=parseInt(hex.substring(4,6),16);return(0.299*r+0.587*g+0.114*b)/255>0.55?'#111':'#FFF';};
const pad=(n:number)=>String(n).padStart(2,"0");
const dateKey=(d:Date)=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const CheckIcon=({c}:{c:string})=><svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"><path d="M3 8l4 4 6-7"/></svg>;
const ClockIcon=({c}:{c:string})=><svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 1.5"/></svg>;

function computeLayout(bookings:any[],staffId:string){
  const col=bookings.filter(b=>b.sId===staffId).sort((a,b)=>a.s-b.s);
  return col.map((b,i)=>{
    const next=col[i+1];const topPx=(b.s-SH)*HH;const natH=b.d*HH;const usedH=Math.max(natH,MIN_CARD);
    let h=usedH;
    if(next){const nextTop=(next.s-SH)*HH;if(usedH>nextTop-topPx-2)h=Math.max(nextTop-topPx-2,24);}
    return{...b,top:topPx+1,height:h,isCompact:h<40};
  });
}

export function CalendarView(){
  const today=new Date(),todayDow=(today.getDay()+6)%7,todayDate=today.getDate(),mo=today.getMonth(),yr=today.getFullYear();
  const [view,setView]=useState("Day");
  const [selDay,setSelDay]=useState(todayDow);
  const [sheet,setSheet]=useState<any>(null);
  const [showMenu,setShowMenu]=useState(false);
  const [showSearch,setShowSearch]=useState(false);
  const [searchQ,setSearchQ]=useState("");
  const [staffFilter,setStaffFilter]=useState("all");
  const [fabOpen,setFabOpen]=useState(false);
  const [modal,setModal]=useState<string|null>(null);
  const [blockForm,setBlockForm]=useState({staff_id:"",start:"09:00",end:"17:00",preset:"custom",reason:""});
  const [monthMode,setMonthMode]=useState("calendar");

  const mon=useMemo(()=>{const d=new Date(today);d.setDate(d.getDate()-todayDow);return d;},[]);
  const wk=useMemo(()=>Array.from({length:7},(_,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);return d;}),[mon]);
  const bk=(BK[selDay]||[]).filter(b=>{if(staffFilter!=="all"&&b.sId!==staffFilter)return false;if(searchQ){const q=searchQ.toLowerCase();return b.c.toLowerCase().includes(q)||b.sv.toLowerCase().includes(q);}return true;});
  const blocks=BLOCKS_BY_DAY[selDay]||[];
  const ch=today.getHours()+today.getMinutes()/60;
  const isTd=selDay===todayDow;
  const cols=ST.length,TCW=36;
  const ss:any={fontFamily:"'Figtree',-apple-system,sans-serif"};
  const allLayouts=useMemo(()=>{const r:any[]=[];ST.forEach(s=>r.push(...computeLayout(bk,s.id)));return r;},[bk]);
  const inp:any={width:"100%",padding:"10px 12px",borderRadius:10,border:`1px solid ${C.bd}`,fontSize:14,...ss,boxSizing:"border-box",outline:"none"};
  const lbl:any={fontSize:11,fontWeight:600,color:"#555",letterSpacing:0.8,textTransform:"uppercase",display:"block",margin:"0 0 5px"};

  const monthGrid=useMemo(()=>{
    const first=new Date(yr,mo,1),last=new Date(yr,mo+1,0);
    const startDow=(first.getDay()+6)%7;
    const weeks:any[]=[];let week:any[]=Array(startDow).fill(null);
    for(let d=1;d<=last.getDate();d++){week.push(d);if(week.length===7){weeks.push(week);week=[];}}
    if(week.length)weeks.push([...week,...Array(7-week.length).fill(null)]);
    return weeks;
  },[]);

  const scheduleWeeks=useMemo(()=>{
    const first=new Date(yr,mo,1),last=new Date(yr,mo+1,0);
    const weeks:any[]=[];let d=new Date(first);d.setDate(d.getDate()-((d.getDay()+6)%7));
    while(d<=last||weeks.length<5){
      const days=Array.from({length:7},(_,i)=>{const dd=new Date(d);dd.setDate(d.getDate()+i);return dd;});
      weeks.push(days);d.setDate(d.getDate()+7);if(weeks.length>=6)break;
    }
    return weeks;
  },[]);

  const bkCounts=useMemo(()=>{
    const m:Record<number,number>={};const wkStart=new Date(today);wkStart.setDate(today.getDate()-todayDow);
    for(let i=0;i<7;i++){const d=new Date(wkStart);d.setDate(wkStart.getDate()+i);if(BK[i])m[d.getDate()]=BK[i].length;}
    return m;
  },[]);

  return(
    <div style={{...ss,backgroundColor:C.bg,height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
      <style>{`.cs::-webkit-scrollbar{width:3px}.cs::-webkit-scrollbar-track{background:transparent}.cs::-webkit-scrollbar-thumb{background:#D0D0D0;border-radius:3px}`}</style>

      {/* HEADER */}
      <div style={{backgroundColor:C.card,borderBottom:`1px solid ${C.bd}`,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px 4px"}}>
          <button onClick={()=>setShowMenu(true)} style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:"none",border:"none",cursor:"pointer"}}><svg width="16" height="16" viewBox="0 0 24 24" fill={C.dark}><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg></button>
          <span style={{fontSize:15,fontWeight:700,color:C.dark}}>{today.toLocaleDateString("en-GB",{month:"short",year:"numeric"})}</span>
          <div style={{display:"flex",gap:2}}>
            <button onClick={()=>setShowSearch(!showSearch)} style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:"none",border:"none",cursor:"pointer"}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
            <button onClick={()=>setStaffFilter(staffFilter==="all"?ST[0].id:"all")} style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:staffFilter!=="all"?C.gL:"none",border:"none",cursor:"pointer",borderRadius:14}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={staffFilter!=="all"?C.gold:C.dark} strokeWidth="2" strokeLinecap="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></button>
          </div>
        </div>
        {showSearch&&(<div style={{padding:"0 14px 6px"}}><div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:10,backgroundColor:C.bg}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.mu} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input value={searchQ} onChange={(e:any)=>setSearchQ(e.target.value)} placeholder="Search clients, services..." style={{flex:1,border:"none",background:"transparent",outline:"none",fontSize:13,fontWeight:500,color:C.dark,...ss}}/>{searchQ&&<button onClick={()=>setSearchQ("")} style={{background:"none",border:"none",cursor:"pointer",color:C.mu,fontSize:14}}>✕</button>}</div></div>)}
        <div style={{display:"flex",padding:"2px 4px"}}>
          {wk.map((d,i)=>{const sel=i===selDay,td=i===todayDow;return(<button key={i} onClick={()=>setSelDay(i)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",background:"none",border:"none",cursor:"pointer",padding:"1px 0"}}><span style={{fontSize:9,fontWeight:600,letterSpacing:0.5,color:td?C.gold:C.mu}}>{DY[i]}</span><div style={{width:30,height:30,borderRadius:15,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:sel?C.dark:"transparent",marginTop:2}}><span style={{fontSize:14,fontWeight:sel?700:500,color:sel?"#FFF":td?C.gold:C.dark}}>{d.getDate()}</span></div><div style={{height:3,marginTop:1}}>{td&&!sel&&<div style={{width:3,height:3,borderRadius:2,backgroundColor:C.gold,margin:"0 auto"}}/>}</div></button>);})}
        </div>
        <div style={{display:"flex",background:C.bg,borderRadius:20,padding:3,margin:"0 14px 8px"}}>
          {(["Day","Week","Month"] as const).map(v=>(<button key={v} onClick={()=>setView(v)} style={{padding:"7px 18px",borderRadius:18,border:"none",cursor:"pointer",fontSize:12,fontWeight:view===v?700:500,background:view===v?"#fff":"transparent",color:view===v?C.dark:C.mu,boxShadow:view===v?"0 2px 6px rgba(0,0,0,0.06)":"none",flex:1,...ss}}>{v}</button>))}
        </div>
      </div>

      {/* BODY */}
      <div className="cs" style={{flex:1,overflowY:"auto",backgroundColor:C.card}}>

        {/* DAY VIEW */}
        {view==="Day"&&(<div>
          <div style={{display:"flex",height:50,borderBottom:`1px solid ${C.bd}`,background:C.card,position:"sticky",top:0,zIndex:10}}>
            <div style={{width:TCW,flexShrink:0}}/>
            {ST.map(s=>(<div key={s.id} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderLeft:`1px solid ${C.bd}`,opacity:staffFilter!=="all"&&staffFilter!==s.id?0.3:1}}><div style={{width:28,height:28,borderRadius:14,border:`2px solid ${s.color}`,padding:1,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:"100%",height:"100%",borderRadius:"50%",background:`linear-gradient(135deg,${s.color},${s.color}BB)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#fff"}}>{s.i}</div></div><span style={{fontSize:9,fontWeight:600,color:C.dark,marginTop:2}}>{s.name}</span></div>))}
          </div>
          <div style={{position:"relative",height:hrs.length*HH,backgroundColor:C.card}}>
            {hrs.map((h,i)=>(<div key={h} style={{position:"absolute",top:i*HH,width:"100%",display:"flex"}}><div style={{width:TCW,flexShrink:0,textAlign:"right",paddingRight:4}}><span style={{fontSize:9,fontWeight:500,color:C.mu}}>{fmtAP(h)}</span></div><div style={{flex:1,borderTop:`1px solid ${C.bd}`}}/></div>))}
            {hrs.map((_,i)=>(<div key={`hf${i}`} style={{position:"absolute",top:i*HH+HH/2,left:TCW,right:0,borderTop:"1px dashed #F0F0F0"}}/>))}
            {ST.slice(1).map((_,i)=>(<div key={`cd${i}`} style={{position:"absolute",top:0,bottom:0,left:`calc(${TCW}px + (100% - ${TCW}px) * ${(i+1)/cols})`,width:1,backgroundColor:C.bd}}/>))}
            {isTd&&ch>=SH&&ch<=EH&&(<div style={{position:"absolute",top:(ch-SH)*HH,left:TCW-4,right:0,display:"flex",alignItems:"center",zIndex:8}}><div style={{width:8,height:8,borderRadius:4,backgroundColor:C.red}}/><div style={{flex:1,height:2,backgroundColor:C.red}}/></div>)}
            {blocks.map((bl,bi)=>{const ci=Math.max(ST.findIndex(s=>s.id===bl.staffId),0);const top=(bl.start-SH)*HH,h=bl.dur*HH;return(<div key={`bl${bi}`} style={{position:"absolute",top:top+1,height:h-2,borderRadius:4,left:`calc(${TCW}px + (100% - ${TCW}px) * ${ci/cols} + 2px)`,width:`calc((100% - ${TCW}px) / ${cols} - 4px)`,background:"repeating-linear-gradient(135deg,#D5D5D5,#D5D5D5 3px,#E8E8E8 3px,#E8E8E8 7px)",border:"1px solid #D0D0D0",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1}}><span style={{fontSize:8,fontWeight:800,color:"#999",textTransform:"uppercase",letterSpacing:2}}>{bl.label}</span></div>);})}
            {allLayouts.map((b:any)=>{const ci=Math.max(ST.findIndex(s=>s.id===b.sId),0);const staff=ST.find(s=>s.id===b.sId);const bg=b.st==="completed"?"#D1D5DB":b.st==="no_show"?C.red:(staff?.color||STAFF_COLORS[0]);const done=b.st==="completed";const tc=txtColor(bg);const cardH=b.height;const compact=b.isCompact;const hasRoom=cardH>=60,hasSome=cardH>=40;return(<button key={b.id} onClick={()=>setSheet(b)} style={{position:"absolute",top:b.top,height:cardH,left:`calc(${TCW}px + (100% - ${TCW}px) * ${ci/cols} + 2px)`,width:`calc((100% - ${TCW}px) / ${cols} - 4px)`,borderRadius:5,background:done?`${bg}90`:bg,opacity:done?0.75:b.st==="no_show"?0.6:1,cursor:"pointer",overflow:"hidden",color:tc,boxShadow:"0 1px 4px rgba(0,0,0,0.08)",padding:compact?"2px 4px":"3px 5px",display:"flex",flexDirection:compact?"row":"column",alignItems:compact?"center":"flex-start",gap:compact?3:0,border:"none",textAlign:"left",zIndex:5,boxSizing:"border-box",...ss}}>
              {!compact&&<div style={{position:"absolute",top:3,right:3,opacity:0.6}}>{(b.st==="confirmed"||b.st==="completed"||b.st==="checked_in")?<CheckIcon c={tc}/>:b.st==="pending"?<ClockIcon c={tc}/>:null}</div>}
              {compact?(<><span style={{fontSize:8,fontWeight:600,opacity:0.8,flexShrink:0}}>{fmtC(b.s)}</span><span style={{fontSize:9,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{b.c.split(" ")[0]}</span><span style={{fontSize:7,fontWeight:700,opacity:0.7,flexShrink:0}}>£{b.p}</span></>):(<><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:2,width:"100%"}}><span style={{fontSize:9,fontWeight:600,opacity:0.8,lineHeight:1}}>{fmtR(b.s,b.d)}</span><span style={{fontSize:8,fontWeight:700,background:`rgba(${tc==="#FFF"?"255,255,255":"0,0,0"},0.15)`,borderRadius:3,padding:"1px 4px",flexShrink:0}}>£{b.p}</span></div><div style={{fontSize:hasSome?12:10,fontWeight:700,lineHeight:1.2,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:hasSome?"normal":"nowrap",display:"-webkit-box",WebkitLineClamp:hasSome?2:1,WebkitBoxOrient:"vertical",width:"100%"} as any}>{b.c}</div>{hasRoom&&<div style={{fontSize:10,fontWeight:500,opacity:0.75,lineHeight:1.2,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%"}}>{b.sv}</div>}</>)}
            </button>);})}
          </div>
        </div>)}

        {/* WEEK VIEW */}
        {view==="Week"&&(<div style={{position:"relative",minHeight:"100%",height:hrs.length*WHH,backgroundColor:C.card}}>
          {hrs.map((h,i)=>(<div key={h} style={{position:"absolute",top:i*WHH,width:"100%",display:"flex"}}><div style={{width:28,flexShrink:0,textAlign:"right",paddingRight:3}}><span style={{fontSize:8,fontWeight:500,color:C.mu}}>{fmtAP(h)}</span></div><div style={{flex:1,borderTop:`1px solid ${C.bd}`}}/></div>))}
          {wk.slice(1).map((_,i)=>(<div key={`wc${i}`} style={{position:"absolute",top:0,bottom:0,left:`calc(28px + (100% - 28px) * ${(i+1)/7})`,width:1,backgroundColor:"#F0F0F0"}}/>))}
          {Object.entries(BK).map(([di,db])=>db.map((b,bi)=>{const staff=ST.find(s=>s.id===b.sId);const bg=staff?.color||STAFF_COLORS[0];const tc=txtColor(bg);const top=(b.s-SH)*WHH,h=Math.max(b.d*WHH-1,18);return(<div key={`${di}-${b.id}`} onClick={()=>{setSelDay(Number(di));setView("Day");}} style={{position:"absolute",top,height:h,left:`calc(28px + (100% - 28px) * ${Number(di)/7} + 1px)`,width:`calc((100% - 28px) / 7 - 2px)`,backgroundColor:bg,borderRadius:3,padding:"2px 3px",zIndex:5,overflow:"hidden",cursor:"pointer"}}><p style={{fontSize:8,fontWeight:700,color:tc,margin:0,lineHeight:1.1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.c.split(" ")[0]}</p>{h>=30&&<p style={{fontSize:7,fontWeight:600,color:tc,opacity:0.7,margin:0}}>{fmtC(b.s)}</p>}</div>);}))}
        </div>)}

        {/* MONTH VIEW */}
        {view==="Month"&&(<div style={{backgroundColor:C.card,minHeight:"100%"}}>
          <div style={{display:"flex",background:C.bg,borderRadius:16,padding:2,margin:"8px 14px",gap:2}}>
            {(["calendar","schedule"] as const).map(m=>(<button key={m} onClick={()=>setMonthMode(m)} style={{flex:1,padding:"6px 0",borderRadius:14,border:"none",cursor:"pointer",fontSize:11,fontWeight:monthMode===m?700:500,backgroundColor:monthMode===m?"#FFF":"transparent",color:monthMode===m?C.dark:C.mu,boxShadow:monthMode===m?"0 1px 3px rgba(0,0,0,0.06)":"none",textTransform:"capitalize",...ss}}>{m}</button>))}
          </div>

          {monthMode==="calendar"?(
            <div style={{padding:"4px 10px 20px"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:4}}>
                {DY.map(d=>(<div key={d} style={{textAlign:"center",fontSize:10,fontWeight:600,color:C.mu,padding:"4px 0"}}>{d.charAt(0)}</div>))}
              </div>
              {monthGrid.map((week:any[],wi:number)=>(<div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
                {week.map((day:any,di:number)=>{
                  if(!day)return <div key={di} style={{minHeight:56}}/>;
                  const isTdy=day===todayDate;const cnt=bkCounts[day]||0;const hol=UK_HOLIDAYS[`${yr}-${pad(mo+1)}-${pad(day)}`];
                  return(<button key={di} onClick={()=>{const d=new Date(yr,mo,day);const wkStart=new Date(today);wkStart.setDate(today.getDate()-todayDow);const diff=Math.round((d.getTime()-wkStart.getTime())/(864e5));if(diff>=0&&diff<7){setSelDay(diff);setView("Day");}}} style={{minHeight:56,border:"none",cursor:"pointer",backgroundColor:isTdy?"#FFF9F0":"transparent",display:"flex",flexDirection:"column",alignItems:"center",padding:"4px 1px",borderTop:`1px solid ${C.bd}`,borderLeft:di>0?`1px solid ${C.bd}`:"none",...ss}}>
                    <div style={{width:isTdy?26:22,height:isTdy?26:22,borderRadius:13,backgroundColor:isTdy?C.gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:12,fontWeight:isTdy?700:500,color:isTdy?"#FFF":di===6?"#CCC":C.dark}}>{day}</span></div>
                    {cnt>0&&<div style={{marginTop:2,display:"flex",gap:1}}>{Array.from({length:Math.min(cnt,4)}).map((_,i)=>(<div key={i} style={{width:4,height:4,borderRadius:2,backgroundColor:STAFF_COLORS[i%4]}}/>))}</div>}
                    {hol&&<span style={{fontSize:7,fontWeight:600,color:hol.t==="bank"?"#10B981":C.gold,marginTop:1,textAlign:"center",lineHeight:1}}>{hol.l.split(" ")[0]}</span>}
                  </button>);
                })}
              </div>))}
            </div>
          ):(
            <div style={{padding:"0 0 20px"}}>
              {scheduleWeeks.map((days:any[],wi:number)=>{
                const s=days[0],e=days[6];
                const label=`${s.toLocaleDateString("en-GB",{month:"short"}).toUpperCase()} ${s.getDate()} – ${e.getDate()}`;
                const events:any[]=[];
                days.forEach((day:any)=>{const key=dateKey(day);const hol=UK_HOLIDAYS[key];if(hol)events.push({date:day,label:hol.l,type:hol.t});const wkStart=new Date(today);wkStart.setDate(today.getDate()-todayDow);const diff=Math.round((day.getTime()-wkStart.getTime())/(864e5));if(diff>=0&&diff<7&&BK[diff]&&BK[diff].length>0)events.push({date:day,label:`${BK[diff].length} appointments`,type:"booking",dayIdx:diff});});
                const isTodayWeek=days.some((d:any)=>dateKey(d)===dateKey(today));
                return(<div key={wi}>
                  <div style={{padding:"14px 16px 6px",color:C.mu,fontSize:11,fontWeight:600,letterSpacing:1}}>{label}</div>
                  {events.length===0&&!isTodayWeek&&<div style={{padding:"6px 16px 10px"}}><span style={{fontSize:14,color:"#CCC",fontStyle:"italic"}}>Nothing planned</span></div>}
                  {events.map((ev:any,ei:number)=>{
                    const isTdy=dateKey(ev.date)===dateKey(today);const showDate=ei===0||dateKey(ev.date)!==dateKey(events[ei-1]?.date);const dow=(ev.date.getDay()+6)%7;
                    return(<div key={ei} style={{display:"flex",alignItems:"center",padding:"6px 16px",gap:12,cursor:ev.type==="booking"?"pointer":"default"}} onClick={()=>{if(ev.type==="booking"){setSelDay(ev.dayIdx);setView("Day");}}}>
                      <div style={{width:44,textAlign:"center",flexShrink:0}}>{showDate&&(<div><div style={{fontSize:10,fontWeight:600,color:isTdy?C.gold:C.mu}}>{DY[dow]}</div><div style={{width:isTdy?34:26,height:isTdy?34:26,borderRadius:isTdy?17:13,backgroundColor:isTdy?C.gold:"transparent",display:"flex",alignItems:"center",justifyContent:"center",margin:"2px auto 0"}}><span style={{fontSize:isTdy?15:14,fontWeight:isTdy?700:500,color:isTdy?"#FFF":ev.date.getMonth()===mo?C.dark:"#CCC"}}>{ev.date.getDate()}</span></div></div>)}</div>
                      <div style={{flex:1,padding:"10px 14px",borderRadius:10,backgroundColor:ev.type==="bank"?"#10B981":ev.type==="note"?"#0EA5E9":ev.type==="booking"?C.gL:C.bg}}><span style={{fontSize:14,fontWeight:600,color:ev.type==="bank"||ev.type==="note"?"#FFF":C.dark,...ss}}>{ev.label}</span></div>
                    </div>);
                  })}
                </div>);
              })}
            </div>
          )}
        </div>)}
      </div>

      {/* FAB */}
      {fabOpen&&<div onClick={()=>setFabOpen(false)} style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.2)",zIndex:18}}/>}
      <div style={{position:"absolute",bottom:14,right:14,zIndex:20,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:10}}>
        {fabOpen&&[{k:"appt",l:"New Appointment",d:"Add an appointment",bg:C.dark},{k:"walkin",l:"Walk-in",d:"Quick-add a walk-in",bg:C.gold},{k:"block",l:"Block Time",d:"Block out a slot",bg:"#666"}].map(o=>(<button key={o.k} onClick={()=>{setFabOpen(false);setModal(o.k);}} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 16px",borderRadius:14,border:"none",backgroundColor:C.card,cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",...ss}}><div style={{width:32,height:32,borderRadius:16,backgroundColor:o.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round"><line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/></svg></div><div style={{textAlign:"left"}}><div style={{fontSize:14,fontWeight:700,color:C.dark}}>{o.l}</div><div style={{fontSize:11,color:C.mu}}>{o.d}</div></div></button>))}
        <button onClick={()=>setFabOpen(!fabOpen)} style={{width:48,height:48,borderRadius:24,backgroundColor:C.dark,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,0,0,0.25)",transition:"transform 0.2s",transform:fabOpen?"rotate(45deg)":"none"}}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round"><line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/></svg></button>
      </div>

      {/* MODALS */}
      {modal&&(<><div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.3)",zIndex:40}}/><div style={{...ss,position:"fixed",bottom:0,left:0,right:0,zIndex:50,backgroundColor:C.card,borderRadius:"20px 20px 0 0",maxWidth:430,margin:"0 auto",maxHeight:"85vh",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"center",padding:"12px 0 0"}}><div style={{width:40,height:4,borderRadius:2,backgroundColor:C.bd}}/></div>{modal==="walkin"&&<div style={{height:4,background:`linear-gradient(90deg, ${C.gold}40, ${C.gold}10)`}}/>}<div style={{padding:"16px 24px 0"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:40,height:40,borderRadius:20,backgroundColor:modal==="walkin"?C.gL:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={modal==="walkin"?C.gold:C.dark} strokeWidth="2" strokeLinecap="round"><line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/></svg></div><div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18,fontWeight:700,color:C.dark}}>{modal==="appt"?"New Appointment":modal==="walkin"?"Walk-in":"Block Time"}</span>{modal==="walkin"&&<span style={{fontSize:11,fontWeight:600,color:C.gold,backgroundColor:C.gL,padding:"3px 10px",borderRadius:12}}>Starting now</span>}</div><div style={{fontSize:13,color:C.mu}}>{modal==="appt"?"Add an appointment":modal==="walkin"?"Quick-add a walk-in":"Block out a time slot"}</div></div></div><button onClick={()=>setModal(null)} style={{width:32,height:32,borderRadius:16,backgroundColor:C.bg,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></button></div>
        {modal==="appt"&&(<><div style={{marginBottom:18}}><label style={lbl}>Client Name</label><input placeholder="Full name" style={inp}/></div><div style={{display:"flex",gap:12,marginBottom:18}}><div style={{flex:1}}><label style={lbl}>Phone</label><input placeholder="07..." style={inp}/></div><div style={{flex:1}}><label style={lbl}>Email</label><input placeholder="email@..." style={inp}/></div></div><div style={{display:"flex",gap:12,marginBottom:18}}><div style={{flex:1}}><label style={lbl}>Date</label><input placeholder="Select date" style={inp}/></div><div style={{flex:1}}><label style={lbl}>Time</label><input placeholder="Select time" style={inp}/></div></div><div style={{marginBottom:24}}><label style={lbl}>Notes</label><textarea placeholder="Treatment notes..." rows={3} style={{...inp,resize:"none"} as any}/></div></>)}
        {modal==="walkin"&&(<><div style={{marginBottom:18}}><label style={lbl}>Client Name</label><input placeholder="Name" style={inp}/></div><div style={{marginBottom:18}}><label style={lbl}>Phone</label><input placeholder="07..." style={inp}/></div><div style={{marginBottom:24}}><label style={lbl}>Notes</label><textarea placeholder="Quick note..." rows={3} style={{...inp,resize:"none"} as any}/></div></>)}
        {modal==="block"&&(<><div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>{[{id:"lunch",l:"Lunch",s:"12:00",e:"13:00"},{id:"staff_meeting",l:"Staff Meeting",s:"09:00",e:"10:00"},{id:"training",l:"Training",s:"14:00",e:"16:00"},{id:"personal",l:"Personal",s:"10:00",e:"11:00"},{id:"custom",l:"Custom",s:"",e:""}].map(p=>(<button key={p.id} onClick={()=>setBlockForm((f:any)=>({...f,preset:p.id,start:p.s||f.start,end:p.e||f.end,reason:p.id==="custom"?f.reason:p.l}))} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${blockForm.preset===p.id?C.dark:C.bd}`,background:blockForm.preset===p.id?C.dark:"#FFF",fontSize:12,fontWeight:600,color:blockForm.preset===p.id?"#FFF":"#666",cursor:"pointer",...ss}}>{p.l}</button>))}</div><p style={{fontSize:12,fontWeight:600,color:"#333",margin:"0 0 6px"}}>Staff member</p><div style={{display:"flex",gap:5,marginBottom:14}}>{ST.map(s=>(<button key={s.id} onClick={()=>setBlockForm((f:any)=>({...f,staff_id:s.id}))} style={{padding:"6px 11px",borderRadius:8,border:`1px solid ${blockForm.staff_id===s.id?C.dark:C.bd}`,background:blockForm.staff_id===s.id?C.dark:"#FFF",fontSize:11,fontWeight:600,color:blockForm.staff_id===s.id?"#FFF":"#666",cursor:"pointer",...ss}}>{s.name}</button>))}</div><div style={{display:"flex",gap:10,marginBottom:14}}><div style={{flex:1}}><label style={{...lbl,fontSize:11}}>Start</label><input value={blockForm.start} onChange={(e:any)=>setBlockForm((f:any)=>({...f,start:e.target.value}))} style={inp}/></div><div style={{flex:1}}><label style={{...lbl,fontSize:11}}>End</label><input value={blockForm.end} onChange={(e:any)=>setBlockForm((f:any)=>({...f,end:e.target.value}))} style={inp}/></div></div>{blockForm.preset==="custom"&&<div style={{marginBottom:14}}><label style={{...lbl,fontSize:11}}>Reason</label><input value={blockForm.reason} onChange={(e:any)=>setBlockForm((f:any)=>({...f,reason:e.target.value}))} placeholder="e.g. Dentist" style={inp}/></div>}</>)}
      </div><div style={{padding:"0 24px 28px"}}>{modal==="block"?(<div style={{display:"flex",gap:10}}><button onClick={()=>setModal(null)} style={{flex:1,padding:"12px 0",borderRadius:12,border:`1px solid ${C.bd}`,background:"#FFF",fontSize:14,fontWeight:600,color:C.dark,cursor:"pointer",...ss}}>Cancel</button><button onClick={()=>setModal(null)} style={{flex:1,padding:"12px 0",borderRadius:12,border:"none",background:C.dark,fontSize:14,fontWeight:700,color:"#FFF",cursor:"pointer",...ss}}>Block Time</button></div>):(<button onClick={()=>setModal(null)} style={{width:"100%",padding:"16px 0",borderRadius:16,border:"none",backgroundColor:modal==="walkin"?C.gold:C.dark,fontSize:16,fontWeight:700,color:"#FFF",cursor:"pointer",...ss}}>{modal==="walkin"?"Check In Walk-in":"Confirm Appointment"}</button>)}</div></div></>)}

      {/* BOOKING SHEET */}
      {sheet&&(<><div onClick={()=>setSheet(null)} style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.35)",zIndex:40}}/><div style={{...ss,position:"fixed",bottom:0,left:0,right:0,zIndex:50,backgroundColor:C.card,borderRadius:"20px 20px 0 0",maxWidth:430,margin:"0 auto"}}><div style={{display:"flex",justifyContent:"center",padding:"12px 0 8px"}}><div style={{width:40,height:4,borderRadius:2,backgroundColor:C.bd}}/></div><div style={{padding:"0 20px 28px"}}><div style={{display:"flex",alignItems:"center",gap:10,paddingBottom:14,borderBottom:`1px solid ${C.bd}`}}><div style={{width:42,height:42,borderRadius:21,backgroundColor:C.gL,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:15,fontWeight:700,color:C.gold}}>{sheet.c.split(" ").map((w:string)=>w[0]).join("").slice(0,2)}</span></div><div style={{flex:1}}><p style={{fontSize:16,fontWeight:700,color:C.dark,margin:0}}>{sheet.c}</p><p style={{fontSize:13,color:C.mu,margin:0}}>Client</p></div></div>{(()=>{const sm=ST.find(s=>s.id===sheet.sId);return sm?(<div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 0",borderBottom:`1px solid ${C.bd}`}}><div style={{width:34,height:34,borderRadius:17,background:`linear-gradient(135deg,${sm.color},${sm.color}BB)`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:12,fontWeight:700,color:"#FFF"}}>{sm.i}</span></div><div><p style={{fontSize:15,fontWeight:600,color:C.dark,margin:0}}>{sm.name}</p><p style={{fontSize:12,color:C.mu,margin:0}}>Stylist</p></div></div>):null;})()}<div style={{padding:"14px 0",borderBottom:`1px solid ${C.bd}`}}><p style={{fontSize:11,fontWeight:600,color:C.mu,letterSpacing:1,textTransform:"uppercase",margin:"0 0 5px"}}>TIME</p><p style={{fontSize:16,fontWeight:600,color:C.dark,margin:0}}>{fmtR(sheet.s,sheet.d)} <span style={{fontSize:11,fontWeight:600,color:C.mu,backgroundColor:C.bg,padding:"2px 7px",borderRadius:10,marginLeft:4}}>{sheet.d>=1?`${sheet.d}h`:`${Math.round(sheet.d*60)}m`}</span></p></div><div style={{padding:"14px 0",borderBottom:`1px solid ${C.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><p style={{fontSize:11,fontWeight:600,color:C.mu,letterSpacing:1,textTransform:"uppercase",margin:"0 0 3px"}}>SERVICE</p><p style={{fontSize:14,fontWeight:600,color:C.dark,margin:0}}>{sheet.sv}</p></div><p style={{fontSize:22,fontWeight:800,color:C.dark,margin:0}}>£{sheet.p}</p></div><div style={{display:"flex",gap:10,marginTop:18}}><button style={{flex:1,padding:"12px 0",borderRadius:12,border:"none",cursor:"pointer",backgroundColor:C.dark,fontSize:14,fontWeight:700,color:"#FFF",...ss}}>Edit</button><button style={{flex:1,padding:"12px 0",borderRadius:12,border:"none",cursor:"pointer",backgroundColor:C.gold,fontSize:14,fontWeight:700,color:"#FFF",...ss}}>Reschedule</button></div></div></div></>)}

      {/* SIDE MENU */}
      {showMenu&&(<><div onClick={()=>setShowMenu(false)} style={{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.3)",zIndex:40}}/><div style={{...ss,position:"fixed",top:0,left:0,bottom:0,width:270,backgroundColor:C.card,zIndex:50,boxShadow:"4px 0 20px rgba(0,0,0,0.1)",overflowY:"auto"}}>
        <div style={{padding:"20px 18px 10px"}}><h2 style={{fontSize:18,fontWeight:700,color:C.dark,margin:0}}>Calendar</h2></div>
        <div style={{borderTop:`1px solid ${C.bd}`,padding:"6px 0"}}>{(["Day","Week","Month"] as const).map(v=>(<button key={v} onClick={()=>{setView(v);setShowMenu(false);}} style={{display:"block",width:"100%",padding:"10px 18px",border:"none",background:view===v?"#F0F5FF":"transparent",cursor:"pointer",fontSize:14,fontWeight:view===v?600:400,color:view===v?C.gold:C.dark,textAlign:"left",...ss}}>{v}</button>))}</div>
        <div style={{borderTop:`1px solid ${C.bd}`,padding:"10px 18px"}}>
          <p style={{fontSize:11,fontWeight:600,color:C.mu,letterSpacing:1,textTransform:"uppercase",margin:"0 0 8px"}}>Staff</p>
          {ST.map(s=>(<button key={s.id} onClick={()=>setStaffFilter(staffFilter===s.id?"all":s.id)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"7px 0",border:"none",background:"transparent",cursor:"pointer",...ss}}><div style={{width:20,height:20,borderRadius:4,border:`2px solid ${staffFilter===s.id||staffFilter==="all"?s.color:C.bd}`,backgroundColor:staffFilter===s.id||staffFilter==="all"?s.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{(staffFilter===s.id||staffFilter==="all")&&<svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round"><path d="M3 8l4 4 6-7"/></svg>}</div><span style={{fontSize:13,fontWeight:500,color:C.dark}}>{s.name}</span></button>))}
        </div>
        <div style={{borderTop:`1px solid ${C.bd}`,padding:"12px 18px"}}>
          <p style={{fontSize:11,fontWeight:600,color:C.mu,letterSpacing:1,textTransform:"uppercase",margin:"0 0 10px"}}>Upcoming Holidays</p>
          {UPCOMING_HOLIDAYS.map(([key,hol])=>{const d=new Date(key);return(<div key={key} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><div style={{width:8,height:8,borderRadius:4,backgroundColor:hol.t==="bank"?"#10B981":C.gold,flexShrink:0}}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.dark}}>{hol.l}</div><div style={{fontSize:11,color:C.mu}}>{d.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}</div></div>{hol.t==="bank"&&<span style={{fontSize:9,fontWeight:700,color:"#10B981",backgroundColor:"#F0FDF4",padding:"2px 6px",borderRadius:8}}>BANK</span>}</div>);})}
        </div>
      </div></>)}
    </div>
  );
}
