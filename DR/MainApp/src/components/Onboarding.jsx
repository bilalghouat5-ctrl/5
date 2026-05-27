import { useState, useRef } from "react";
import { ONBOARDING } from "../constants/data.js";
import APP_ICON_IMG from "../assets/appIcon.js";
import { IconCar, IconClock, IconVerified, IconSuccess, IconElectric, IconWedding, IconCrown, IconPin } from "./ui/AppIcons.jsx";

export function Onboarding({onDone}) {
  const [cur, setCur]   = useState(0);
  const [anim, setAnim] = useState(true);
  const [dir, setDir]   = useState(1);
  const [leaving, setLeaving] = useState(false);
  const touchX = useRef(0);
  const touchY = useRef(0);

  const goTo = (next, d) => {
    if (next === ONBOARDING.length) { finish(); return; }
    setDir(d);
    setAnim(false);
    setTimeout(() => { setCur(next); setAnim(true); }, 260);
  };

  const finish = () => {
    setLeaving(true);
    setTimeout(onDone, 420);
  };

  const onTouchStart = e => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = e => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchY.current);
    if (dy > 40 || Math.abs(dx) < 50) return;
    if (dx < 0 && cur < ONBOARDING.length-1) goTo(cur+1, 1);
    else if (dx > 0 && cur > 0) goTo(cur-1, -1);
  };

  const sl = ONBOARDING[cur];

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position:"fixed", inset:0, zIndex:9999,
        background: sl.bg,
        transition:"background .5s ease, opacity .42s ease",
        opacity: leaving ? 0 : 1,
        display:"flex", flexDirection:"column",
        fontFamily:"'Cairo',sans-serif",
        overflow:"hidden",
        // Force full screen coverage
        width:"100%", height:"100%",
        minHeight:"100dvh",
      }}
    >
      {/* ── Full-screen background glow orbs ── */}
      <div style={{position:"absolute",width:"60vw",height:"60vw",maxWidth:420,maxHeight:420,borderRadius:"50%",
        background:`radial-gradient(circle,${sl.accent}44 0%,transparent 70%)`,
        top:"-10%",left:"50%",transform:"translateX(-50%)",filter:"blur(60px)",
        transition:"background .5s ease",pointerEvents:"none"}} />
      <div style={{position:"absolute",width:"40vw",height:"40vw",maxWidth:280,maxHeight:280,borderRadius:"50%",
        background:`radial-gradient(circle,${sl.accent}22 0%,transparent 70%)`,
        bottom:"25%",right:"0%",filter:"blur(40px)",animation:"float 4s ease-in-out infinite",
        pointerEvents:"none"}} />
      <div style={{position:"absolute",width:"30vw",height:"30vw",maxWidth:200,maxHeight:200,borderRadius:"50%",
        background:`radial-gradient(circle,${sl.light}18 0%,transparent 70%)`,
        bottom:"10%",left:"5%",filter:"blur(35px)",animation:"float 5s ease-in-out infinite",animationDelay:".8s",
        pointerEvents:"none"}} />

      {/* ── Top bar: dots + skip ── */}
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",
        padding:"max(52px, env(safe-area-inset-top, 52px)) clamp(18px,5vw,28px) 0",
        position:"relative",zIndex:5,flexShrink:0,
      }}>
        <div style={{display:"flex",gap:7}}>
          {ONBOARDING.map((_,i) => (
            <div key={i} style={{
              height:4, borderRadius:4, cursor:"pointer",
              transition:"all .38s cubic-bezier(.4,0,.2,1)",
              width: i===cur ? 26 : 7,
              background: i===cur ? sl.light : "rgba(255,255,255,.22)",
              boxShadow: i===cur ? `0 0 8px ${sl.light}99` : "none",
            }} onClick={()=>goTo(i, i>cur?1:-1)} />
          ))}
        </div>
        <button onClick={finish} style={{
          background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.14)",
          color:"rgba(255,255,255,.65)", padding:"6px 16px", borderRadius:20,
          cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit",
          backdropFilter:"blur(8px)",
        }}>تخطي</button>
      </div>

      {/* ── Illustration — takes remaining space above card ── */}
      <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", minHeight:0}}>
        {/* Rings */}
        {[Math.min(180,"38vw"), Math.min(270,"55vw"), Math.min(360,"72vw")].map((r,i) => (
          <div key={i} style={{
            position:"absolute",
            width: typeof r === "number" ? r : r,
            height: typeof r === "number" ? r : r,
            borderRadius:"50%",
            border:`1px solid ${sl.accent}${i===0?"55":i===1?"33":"1A"}`,
            animation:`glow ${2.5+i*.4}s ease-in-out infinite`,
            animationDelay:`${i*.25}s`,
            transition:"border-color .5s ease",
          }} />
        ))}

        {/* Icon box */}
        <div style={{
          width:"clamp(96px,22vw,130px)", height:"clamp(96px,22vw,130px)",
          borderRadius:"clamp(22px,5vw,32px)",
          background:`linear-gradient(135deg,${sl.accent},${sl.light}88)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:`0 0 60px ${sl.accent}66, 0 24px 70px rgba(0,0,0,.5)`,
          animation:"float 3.5s ease-in-out infinite",
          position:"relative", zIndex:2,
          transition:"background .5s ease, box-shadow .5s ease",
        }}>
          <div style={{position:"absolute",inset:0,borderRadius:"clamp(22px,5vw,32px)",background:"linear-gradient(135deg,rgba(255,255,255,.18) 0%,transparent 60%)"}} />
          {cur===0 && <img src={APP_ICON_IMG} alt="RENT درايف" style={{ width: "78%", height: "78%", objectFit: "cover", borderRadius: "clamp(16px,4vw,25px)", display: "block" }} />}
          {cur===1 && <IconClock size="clamp(52px,13vw,68px)" color="white"/>}
          {cur===2 && <IconVerified size="clamp(52px,13vw,68px)" color="white"/>}
          {cur===3 && <IconSuccess size="clamp(52px,13vw,68px)" color="white"/>}
        </div>

        {/* Floating tags */}
        {cur===0 && [
          {t:<><IconCrown size={12} color="currentColor"/> فاخرة</>, x:-115, y:-25},
          {t:<><IconElectric size={12} color="currentColor"/> كهربائية</>, x:60, y:-38},
          {t:<><IconWedding size={12} color="currentColor"/> زفاف</>, x:65, y:38},
        ].map((b,i) => (
          <div key={i} style={{
            position:"absolute",
            top:`calc(50% + ${b.y}px)`, left:`calc(50% + ${b.x}px)`,
            transform:"translate(-50%,-50%)",
            background:"rgba(255,255,255,.1)", border:`1px solid ${sl.light}44`,
            backdropFilter:"blur(8px)", borderRadius:20, padding:"5px 12px",
            fontSize:"clamp(10px,2.5vw,12px)", fontWeight:700, color:"rgba(255,255,255,.88)", whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:5,
            animation:`float ${3+i*.5}s ease-in-out infinite`, animationDelay:`${i*.2}s`,
            zIndex:3,
          }}>{b.t}</div>
        ))}
        {cur===1 && [
          {t:<><IconPin size={12} color="currentColor"/> الجزائر</>, x:-110, y:-32},
          {t:<><IconPin size={12} color="currentColor"/> وهران</>, x:72, y:-22},
          {t:<><IconPin size={12} color="currentColor"/> قسنطينة</>, x:58, y:42},
        ].map((b,i) => (
          <div key={i} style={{
            position:"absolute",
            top:`calc(50% + ${b.y}px)`, left:`calc(50% + ${b.x}px)`,
            transform:"translate(-50%,-50%)",
            background:"rgba(255,255,255,.1)", border:`1px solid ${sl.light}44`,
            backdropFilter:"blur(8px)", borderRadius:20, padding:"5px 12px",
            fontSize:"clamp(10px,2.5vw,12px)", fontWeight:700, color:"rgba(255,255,255,.88)", whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:5,
            animation:`float ${3+i*.5}s ease-in-out infinite`, animationDelay:`${i*.2}s`,
            zIndex:3,
          }}>{b.t}</div>
        ))}
      </div>

      {/* ── Content card — bottom sheet style ── */}
      <div style={{
        background:"rgba(7,8,15,.92)",
        backdropFilter:"blur(28px)",
        WebkitBackdropFilter:"blur(28px)",
        borderRadius:"28px 28px 0 0",
        border:"1px solid rgba(255,255,255,.09)",
        borderBottom:"none",
        padding:"clamp(20px,5vw,32px) clamp(18px,5vw,32px) 0",
        display:"flex", flexDirection:"column",
        flexShrink:0,
        // Responsive height — fills more on small screens
        maxHeight:"58vh",
        minHeight:"44vh",
      }}>
        {/* Drag handle */}
        <div style={{width:40,height:4,borderRadius:4,background:"rgba(255,255,255,.18)",margin:"0 auto 20px"}} />

        <div style={{
          flex:1, display:"flex", flexDirection:"column",
          opacity: anim ? 1 : 0,
          transform: anim ? "translateX(0)" : `translateX(${dir > 0 ? "-28px" : "28px"})`,
          transition:"opacity .26s ease, transform .26s cubic-bezier(.4,0,.2,1)",
        }}>
          {/* Badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:5,
            background:`${sl.accent}22`, border:`1px solid ${sl.accent}55`,
            color:sl.light, padding:"4px 12px", borderRadius:20,
            fontSize:"clamp(10px,2.5vw,12px)", fontWeight:800, marginBottom:12, alignSelf:"flex-start",
            transition:"background .5s,border .5s,color .5s",
          }}>{sl.badge}</div>

          {/* Title */}
          <div style={{marginBottom:10}}>
            <div style={{fontSize:"clamp(14px,4vw,20px)",fontWeight:800,color:"rgba(255,255,255,.72)",lineHeight:1.2}}>{sl.title1}</div>
            <div style={{
              fontSize:"clamp(26px,7.5vw,40px)", fontWeight:900, lineHeight:1.05, letterSpacing:"-1.5px",
              background:`linear-gradient(90deg,${sl.light},#fff)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>{sl.title2}</div>
          </div>

          {/* Sub text */}
          <div style={{fontSize:"clamp(11px,2.8vw,13px)",color:"rgba(255,255,255,.45)",lineHeight:1.8,marginBottom:14}}>
            <div>{sl.sub1}</div>
            <div>{sl.sub2}</div>
          </div>

          {/* Stats */}
          <div style={{display:"flex",gap:"clamp(6px,2vw,10px)",marginBottom:18}}>
            {sl.stats.map((s,i) => (
              <div key={i} style={{
                flex:1, background:"rgba(255,255,255,.05)",
                border:`1px solid ${sl.accent}33`,
                borderRadius:14, padding:"clamp(8px,2.2vw,12px) 8px", textAlign:"center",
                transition:"border-color .5s",
              }}>
                <div style={{fontSize:"clamp(15px,4vw,18px)",fontWeight:900,color:sl.light,letterSpacing:"-0.5px",transition:"color .5s"}}>{s.n}</div>
                <div style={{fontSize:"clamp(9px,2.2vw,11px)",color:"rgba(255,255,255,.38)",marginTop:2,fontWeight:600}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{display:"flex",gap:10,paddingBottom:"max(18px, env(safe-area-inset-bottom, 18px))"}}>
            {cur > 0 && (
              <button onClick={()=>goTo(cur-1,-1)} className="btn" style={{
                width:"clamp(44px,12vw,54px)", height:"clamp(46px,12vw,54px)", borderRadius:14,
                border:"1px solid rgba(255,255,255,.12)",
                background:"rgba(255,255,255,.06)",
                color:"rgba(255,255,255,.7)", cursor:"pointer",
                fontSize:20, display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, fontFamily:"inherit",
              }}>‹</button>
            )}
            <button onClick={()=>goTo(cur+1,1)} className="btn" style={{
              flex:1, height:"clamp(46px,12vw,54px)", borderRadius:14, border:"none",
              background:`linear-gradient(135deg,${sl.accent},${sl.light}99)`,
              color:"#fff", fontWeight:900, fontSize:"clamp(13px,3.5vw,16px)",
              cursor:"pointer", fontFamily:"inherit",
              boxShadow:`0 6px 22px ${sl.accent}55`,
              transition:"background .5s, box-shadow .5s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              <span>{sl.cta}</span>
              {cur < ONBOARDING.length-1 && <span style={{fontSize:19}}>›</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
