import { useState } from "react";
import { useCarsByType } from "../../hooks/useSupabaseData.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconLike, IconPin, IconCrown, IconElectric, IconSuv, IconCar, IconSeat } from "../ui/AppIcons.jsx";

const ICONS = {
  luxury: IconCrown,
  electric: IconElectric,
  "4x4": IconSuv,
  van: IconCar,
  wedding: IconSeat,
};

export function CategoryCarsSection({
  delay = 0,
  onOpen,
  userWilaya,
  onSeeAll,
  type,
  title,
  sub,
  accent = "#A78BFA",
  badge = "مميز",
  glow,
}) {
  const { ref, handlers } = useSpringScroll();
  const [liked, setLiked] = useState(new Set());
  const { cars, loading } = useCarsByType(type);
  const BadgeIcon = ICONS[type] || IconCar;
  const shadow = glow || `${accent}22`;

  const list = userWilaya
    ? [...cars.filter(c => c.wilaya === userWilaya), ...cars.filter(c => c.wilaya !== userWilaya)]
    : cars;

  return (
    <div style={{ marginBottom:"clamp(24px,4vw,40px)", animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader title={title} sub={sub} accent={accent} delay={delay} onSeeAll={onSeeAll}/>

      <div ref={ref} {...handlers} style={{
        display:"flex", gap:"clamp(10px,2.5vw,16px)", overflowX:"scroll", overflowY:"hidden",
        scrollbarWidth:"none", padding:"6px clamp(12px,3vw,20px) 14px", cursor:"grab",
        userSelect:"none", WebkitOverflowScrolling:"touch",
      }}>
        {loading
          ? [0,1,2].map(i => <CardSkeleton key={i}/>)
          : list.map((car, i) => (
          <div key={car.id} className="btn-press" onClick={()=>onOpen(car)} style={{
            flexShrink:0, width:"clamp(200px, calc(var(--section-card-w, 200px) + 40px), 260px)",
            background:"rgba(255,255,255,.03)",
            border:`1px solid ${accent}24`,
            borderRadius:20, overflow:"hidden", cursor:"pointer",
            animation:`springIn .5s cubic-bezier(.34,1.56,.64,1) ${delay+i*.07}s both`,
            boxShadow: i===0 ? `0 8px 30px ${shadow}` : "none",
          }}>
            <div style={{ position:"relative", height:"clamp(120px,25vw,160px)", overflow:"hidden", background:"#0D0E1A" }}>
              {car.img && <img src={car.img} alt={car.name} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s ease" }}/>} 
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 54%)" }}/>
              <div style={{
                position:"absolute", top:10, right:10,
                background:`linear-gradient(135deg,${accent},${accent}cc)`,
                color:"#fff", padding:"2px 9px", borderRadius:20,
                fontSize:"clamp(8px,2vw,10px)", fontWeight:900, letterSpacing:".2px",
                display:"flex", alignItems:"center", gap:4,
              }}>
                <BadgeIcon size={9} color="#fff"/>
                {badge}
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
                  <span style={{ fontSize:"clamp(13px,3.5vw,17px)", fontWeight:900, color:accent }}>{car.price.toLocaleString()}</span>
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

function CardSkeleton() {
  return (
    <div style={{ flexShrink:0, width:"clamp(200px, calc(var(--section-card-w, 200px) + 40px), 260px)", borderRadius:20, overflow:"hidden", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)" }}>
      <div className="skel" style={{ height:"clamp(120px,25vw,160px)" }}/>
      <div style={{ padding:"12px 14px" }}>
        <div className="skel" style={{ height:12, borderRadius:6, width:"62%", marginBottom:8 }}/>
        <div className="skel" style={{ height:15, borderRadius:6, width:"42%" }}/>
      </div>
    </div>
  );
}
