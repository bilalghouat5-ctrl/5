import { useMemo, useState } from "react";
import { ALGERIA_WILAYAS } from "../constants/data.js";
import { IconClose, IconSpark, IconPin, IconMoneyDzd, IconCar, IconChevronRight } from "./ui/AppIcons.jsx";
import { Stars } from "./ui/Stars.jsx";

const GOALS = [
  { key: "daily", label: "استعمال يومي", types: ["sedan", "suv"] },
  { key: "family", label: "عائلة", types: ["suv", "4x4", "van"] },
  { key: "luxury", label: "فاخرة", types: ["luxury", "electric"] },
  { key: "wedding", label: "زفاف", types: ["wedding", "luxury"] },
];

export function SmartSuggestSheet({ cars, userWilaya, onClose, onOpenCar }) {
  const [wilaya, setWilaya] = useState(userWilaya || "الجزائر");
  const [budget, setBudget] = useState("10000");
  const [goal, setGoal] = useState("daily");

  const picks = useMemo(() => {
    const limit = Number(budget || 0) || Infinity;
    const target = GOALS.find(g => g.key === goal) || GOALS[0];
    return [...cars]
      .map(car => {
        let score = 0;
        if (car.wilaya === wilaya) score += 45;
        if (target.types.includes(car.type)) score += 28;
        if (car.price <= limit) score += 22;
        score += Math.min(12, Number(car.rating || 0) * 2);
        score += Math.min(8, Number(car.trips || 0) / 60);
        if (car.verified) score += 6;
        return { ...car, smartScore: Math.round(score) };
      })
      .sort((a, b) => b.smartScore - a.smartScore || a.price - b.price)
      .slice(0, 4);
  }, [cars, wilaya, budget, goal]);

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:850,background:"rgba(0,0,0,.55)",backdropFilter:"blur(12px)",display:"flex",alignItems:"flex-end",animation:"fadeIn .22s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:620,margin:"0 auto",background:"rgba(9,9,28,.98)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"24px 24px 0 0",boxShadow:"0 -30px 70px rgba(0,0,0,.55)",padding:"12px 16px max(18px,env(safe-area-inset-bottom))",animation:"sheetUp .42s cubic-bezier(.22,1,.36,1)"}}>
        <div style={{width:42,height:4,borderRadius:10,background:"rgba(255,255,255,.18)",margin:"0 auto 14px"}}/>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:42,height:42,borderRadius:15,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 28px rgba(124,58,237,.35)"}}>
            <IconSpark size={20} color="#fff"/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:16,fontWeight:900,color:"#fff"}}>اقترح لي سيارة</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.38)"}}>اختيار ذكي حسب الولاية، السعر ونوع الرحلة</div>
          </div>
          <button onClick={onClose} style={{width:36,height:36,borderRadius:12,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <IconClose size={16} color="rgba(255,255,255,.65)"/>
          </button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <label style={{background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:11}}>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:800,color:"rgba(255,255,255,.45)",marginBottom:7}}><IconPin size={12} color="#A78BFA"/> الولاية</div>
            <select value={wilaya} onChange={e=>setWilaya(e.target.value)} style={{width:"100%",background:"transparent",border:"none",outline:"none",color:"#fff",fontFamily:"inherit",fontWeight:800}}>
              {ALGERIA_WILAYAS.map(w=><option key={w} value={w} style={{background:"#09091C"}}>{w}</option>)}
            </select>
          </label>
          <label style={{background:"rgba(255,255,255,.045)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:11}}>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:800,color:"rgba(255,255,255,.45)",marginBottom:7}}><IconMoneyDzd size={12} color="#A78BFA"/> الميزانية/اليوم</div>
            <input value={budget} onChange={e=>setBudget(e.target.value)} inputMode="numeric" style={{width:"100%",background:"transparent",border:"none",outline:"none",color:"#fff",fontFamily:"inherit",fontWeight:900}} />
          </label>
        </div>

        <div style={{display:"flex",gap:8,overflowX:"auto",WebkitOverflowScrolling:"touch",paddingBottom:8,scrollbarWidth:"none",marginBottom:12}}>
          {GOALS.map(g=>(
            <button key={g.key} onClick={()=>setGoal(g.key)} className="btn-press" style={{flexShrink:0,border:"1px solid rgba(255,255,255,.08)",background:goal===g.key?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.045)",color:"#fff",borderRadius:999,padding:"9px 13px",fontFamily:"inherit",fontSize:12,fontWeight:800,cursor:"pointer"}}>
              {g.label}
            </button>
          ))}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10,maxHeight:"44vh",overflowY:"auto",WebkitOverflowScrolling:"touch",paddingBottom:4}}>
          {picks.map((car, i)=>(
            <button key={car.id} onClick={()=>{ onClose(); onOpenCar(car); }} style={{display:"flex",alignItems:"center",gap:11,textAlign:"right",width:"100%",background:i===0?"linear-gradient(135deg,rgba(124,58,237,.16),rgba(79,70,229,.08))":"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:16,padding:10,cursor:"pointer",fontFamily:"inherit",animation:`fadeUp .3s ease ${i*.05}s both`}}>
              <img src={car.img} alt="" style={{width:74,height:56,borderRadius:12,objectFit:"cover",flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <div data-no-i18n="true" style={{fontSize:13,fontWeight:900,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{car.name}</div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3,fontSize:11,color:"rgba(255,255,255,.38)"}}><IconPin size={10} color="rgba(255,255,255,.38)"/>{car.wilaya} · {car.price.toLocaleString()} دج/يوم</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}><Stars r={car.rating} size={10}/><span style={{fontSize:10,color:"#A78BFA",fontWeight:900}}>تطابق {car.smartScore}%</span></div>
              </div>
              <IconChevronRight size={16} color="rgba(255,255,255,.28)"/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
