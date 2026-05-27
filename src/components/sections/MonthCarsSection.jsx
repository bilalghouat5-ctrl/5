import { useState } from "react";
import { useCarsByType } from "../../hooks/useSupabaseData.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconLike, IconPin } from "../ui/AppIcons.jsx";

export function MonthCarsSection({ delay, onOpen, userWilaya, liked, onLike, onSeeAll }) {
  const { ref, handlers } = useSpringScroll();
  const { cars, loading } = useCarsByType("month");
  const bc = { فاخرة:"#F59E0B", SUV:"#34D399", كهربائية:"#60A5FA", سيدان:"#A78BFA" };

  const list = userWilaya
    ? [...cars.filter(c => c.wilaya === userWilaya), ...cars.filter(c => c.wilaya !== userWilaya)]
    : cars;

  return (
    <div style={{ marginBottom:"clamp(24px,4vw,40px)", animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader
        title={userWilaya ? `أفضل سيارات في ${userWilaya}` : "سيارات الشهر"}
        sub={userWilaya ? `الأكثر طلباً في ${userWilaya}` : "الأكثر طلباً هذا الشهر"}
        accent="#A78BFA"
        onSeeAll={onSeeAll}
      />
      <div ref={ref} {...handlers} style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:8, scrollbarWidth:"none", cursor:"grab", WebkitOverflowScrolling:"touch" }}>
        {loading
          ? [0,1,2].map(i => <CarSkeleton key={i}/>)
          : list.map(car => (
          <div key={car.id} onClick={() => onOpen(car)} style={{
            flexShrink:0, width:"clamp(200px,48vw,240px)",
            background:"rgba(255,255,255,.04)",
            border:"1px solid rgba(255,255,255,.08)",
            borderRadius:18, overflow:"hidden", cursor:"pointer",
            transition:"transform .2s, box-shadow .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.4)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{ position:"relative", height:130, overflow:"hidden", background:"rgba(255,255,255,.03)" }}>
              {car.img && <img src={car.img} alt={car.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 45%,rgba(0,0,0,.6))" }}/>
              {car.badge && (
                <div style={{ position:"absolute", top:10, right:10, background:bc[car.badge]||"rgba(124,58,237,.8)", color:"#fff", fontSize:10, fontWeight:800, padding:"3px 8px", borderRadius:20 }}>{car.badge}</div>
              )}
              <button onClick={e=>{e.stopPropagation();onLike?.(car.id);}}
                style={{ position:"absolute", top:8, left:8, width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,.4)", backdropFilter:"blur(6px)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <IconLike active={liked?.has(car.id)} size={13}/>
              </button>
              <div style={{ position:"absolute", bottom:8, left:10, right:10 }}>
                <div data-no-i18n="true" style={{ fontSize:12, fontWeight:800, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{car.name}</div>
              </div>
            </div>
            <div style={{ padding:"10px 12px 12px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <IconPin size={11} color="rgba(255,255,255,.4)"/>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,.4)" }}>{car.wilaya}</span>
                </div>
                <Stars r={car.rating} size={10}/>
              </div>
              <div style={{ fontWeight:900, fontSize:14, color:"#A78BFA" }}>{car.price.toLocaleString()} <span style={{ fontSize:11, fontWeight:500, color:"rgba(255,255,255,.4)" }}>دج/يوم</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CarSkeleton() {
  return (
    <div style={{ flexShrink:0, width:"clamp(200px,48vw,240px)", borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)" }}>
      <div className="skel" style={{ height:130 }}/>
      <div style={{ padding:"10px 12px" }}>
        <div className="skel" style={{ height:11, borderRadius:6, marginBottom:7, width:"60%" }}/>
        <div className="skel" style={{ height:14, borderRadius:6, width:"40%" }}/>
      </div>
    </div>
  );
}
