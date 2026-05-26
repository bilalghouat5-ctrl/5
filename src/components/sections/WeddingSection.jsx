import { useState } from "react";
import { useCarsByType } from "../../hooks/useSupabaseData.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconLike, IconPin, IconWedding } from "../ui/AppIcons.jsx";

export function WeddingSection({ delay, onOpen, userWilaya, onSeeAll }) {
  const { ref, handlers } = useSpringScroll();
  const [liked, setLiked] = useState(new Set());
  const { cars: WEDDING_CARS, loading } = useCarsByType("wedding");

  const list = userWilaya
    ? [...WEDDING_CARS.filter(c => c.wilaya === userWilaya), ...WEDDING_CARS.filter(c => c.wilaya !== userWilaya)]
    : WEDDING_CARS;

  return (
    <div style={{ marginBottom:"clamp(24px,4vw,40px)", animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader title="سيارات الزفاف" sub="ليلة لا تُنسى تستحق السيارة المثالية" accent="#F472B6" delay={delay} onSeeAll={onSeeAll}/>

      <div ref={ref} {...handlers} style={{
        display:"flex", gap:"clamp(10px,2.5vw,16px)", overflowX:"scroll", overflowY:"hidden",
        scrollbarWidth:"none", padding:"6px clamp(12px,3vw,20px) 14px", cursor:"grab",
        userSelect:"none", WebkitOverflowScrolling:"touch",
      }}>
        {list.map((car, i) => (
          <div key={car.id} className="btn-press" onClick={()=>onOpen(car)} style={{
            flexShrink:0, width:"clamp(200px, calc(var(--section-card-w, 200px) + 40px), 260px)",
            background:"rgba(255,255,255,.03)",
            border:"1px solid rgba(244,114,182,.12)",
            borderRadius:20, overflow:"hidden", cursor:"pointer",
            animation:`springIn .5s cubic-bezier(.34,1.56,.64,1) ${delay+i*.07}s both`,
            boxShadow: i===0 ? "0 8px 30px rgba(244,114,182,.12)" : "none",
          }}>
            <div style={{ position:"relative", height:"clamp(120px,25vw,160px)", overflow:"hidden", background:"#0D0E1A" }}>
              <img src={car.img} alt={car.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s ease" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 50%)" }}/>
              <div style={{
                position:"absolute", top:10, right:10,
                background:"linear-gradient(135deg,#F472B6,#F9A8D4)",
                color:"#fff", padding:"2px 9px", borderRadius:20,
                fontSize:"clamp(8px,2vw,10px)", fontWeight:900, letterSpacing:".3px",
                display:"flex", alignItems:"center", gap:4,
              }}>
                <IconWedding size={9} color="#fff"/>
                زفاف
              </div>
              <button onClick={e=>{e.stopPropagation();setLiked(p=>{const n=new Set(p);n.has(car.id)?n.delete(car.id):n.add(car.id);return n;});}}
                style={{ position:"absolute",top:9,left:9,width:"clamp(26px,7vw,32px)",height:"clamp(26px,7vw,32px)",borderRadius:"50%",border:"none",background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",animation:liked.has(car.id)?"heartPop .38s ease both":undefined }}>
                <IconLike size={12} active={liked.has(car.id)}/>
              </button>
            </div>
            <div style={{ padding:"clamp(10px,2.5vw,14px) clamp(12px,3vw,16px)" }}>
              <div style={{ fontSize:"clamp(12px,3vw,15px)", fontWeight:800, color:"#fff", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{car.name}</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:"clamp(9px,2.2vw,11px)", color:"rgba(255,255,255,.35)", marginBottom:9 }}>
                <IconPin size={10} color="rgba(255,255,255,.35)"/>
                {car.wilaya}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:9, borderTop:"1px solid rgba(255,255,255,.07)" }}>
                <Stars r={car.rating} size={11}/>
                <div>
                  <span style={{ fontSize:"clamp(13px,3.5vw,17px)", fontWeight:900, color:"#F9A8D4" }}>{car.price.toLocaleString()}</span>
                  <span style={{ fontSize:"clamp(9px,2.2vw,11px)", color:"rgba(255,255,255,.3)" }}> دج/يوم</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
