import { useState } from "react";
import { useAgencies } from "../../hooks/useSupabaseData.js";
import { useSpringScroll } from "../../hooks/useSpringScroll.js";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconLike, IconPin, IconVerified } from "../ui/AppIcons.jsx";

export function AgenciesSection({ delay, onOpen, userWilaya }) {
  const { ref, handlers } = useSpringScroll();
  const [liked, setLiked] = useState(new Set());
  const { agencies, loading } = useAgencies();

  const list = userWilaya
    ? [...agencies.filter(a => a.wilaya === userWilaya), ...agencies.filter(a => a.wilaya !== userWilaya)]
    : agencies;

  return (
    <div style={{ marginBottom:"clamp(24px,4vw,40px)", animation:`fadeUp .55s ease ${delay}s both` }}>
      <SectionHeader
        title={userWilaya ? `وكالات ${userWilaya}` : "الوكالات المميزة"}
        sub={userWilaya ? `أفضل وكالات في ولاية ${userWilaya}` : "وكالات موثقة بأعلى التقييمات"}
      />
      <div ref={ref} {...handlers} style={{ display:"flex", gap:14, overflowX:"auto", paddingBottom:8, scrollbarWidth:"none", cursor:"grab", WebkitOverflowScrolling:"touch" }}>
        {loading
          ? [0,1,2].map(i => <AgencySkeleton key={i}/>)
          : list.map(ag => (
          <div key={ag.id} onClick={() => onOpen(ag)} style={{
            flexShrink:0, width:"clamp(200px,46vw,230px)",
            background:"rgba(255,255,255,.04)",
            border:"1px solid rgba(255,255,255,.08)",
            borderRadius:18, overflow:"hidden", cursor:"pointer",
            transition:"transform .2s, box-shadow .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.4)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";}}>
            {/* Image */}
            <div style={{ position:"relative", height:110, background:`${ag.color}18`, overflow:"hidden" }}>
              {ag.img
                ? <img src={ag.img} alt={ag.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                : <div style={{ width:"100%", height:"100%", background:`linear-gradient(135deg,${ag.color}33,${ag.color}11)` }}/>
              }
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.55))" }}/>
              {ag.badge && (
                <div style={{ position:"absolute", top:10, right:10, background:ag.color, color:"#fff", fontSize:10, fontWeight:800, padding:"3px 8px", borderRadius:20 }}>{ag.badge}</div>
              )}
              <button onClick={e=>{e.stopPropagation();setLiked(p=>{const n=new Set(p);n.has(ag.id)?n.delete(ag.id):n.add(ag.id);return n;})}}
                style={{ position:"absolute", top:8, left:8, width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,.4)", backdropFilter:"blur(6px)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <IconLike active={liked.has(ag.id)} size={13}/>
              </button>
            </div>
            {/* Info */}
            <div style={{ padding:"12px 13px 13px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}>
                <span style={{ fontWeight:800, fontSize:13, color:"#fff", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ag.name}</span>
                <IconVerified size={13} color="#34D399"/>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <IconPin size={11} color="rgba(255,255,255,.4)"/>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,.4)" }}>{ag.wilaya}</span>
                </div>
                <Stars r={ag.rating} size={10}/>
              </div>
              {ag.cars > 0 && (
                <div style={{ marginTop:6, fontSize:11, color:`${ag.color}`, fontWeight:700 }}>{ag.cars} سيارة متاحة</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgencySkeleton() {
  return (
    <div style={{ flexShrink:0, width:"clamp(200px,46vw,230px)", borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)" }}>
      <div className="skel" style={{ height:110 }}/>
      <div style={{ padding:"12px 13px" }}>
        <div className="skel" style={{ height:13, borderRadius:6, marginBottom:8, width:"70%" }}/>
        <div className="skel" style={{ height:11, borderRadius:6, width:"50%" }}/>
      </div>
    </div>
  );
}
