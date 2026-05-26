import { useState, useRef, useEffect } from "react";
import { CarCard } from "./CarCard.jsx";

export function Carousel({cars, onOpenCar, liked, onLike}) {
  const CARD_W = 286;
  const GAP    = 14;
  const STEP   = CARD_W + GAP;
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode]   = useState("carousel");
  const scrollEl  = useRef(null);
  const vel       = useRef(0);
  const raf       = useRef(null);
  const dragging  = useRef(false);
  const startX    = useRef(0);
  const scrollStart = useRef(0);
  const lastX     = useRef(0);
  const lastT     = useRef(0);

  useEffect(()=>{ if(scrollEl.current) scrollEl.current.scrollLeft=0; setActiveIdx(0); },[cars.length]);

  const onScroll = () => {
    if(!scrollEl.current) return;
    setActiveIdx(Math.round(scrollEl.current.scrollLeft/STEP));
  };

  const ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;

  const smoothTo = (target, dur=360) => {
    const el=scrollEl.current; if(!el) return;
    const start=el.scrollLeft, diff=target-start, t0=performance.now();
    const step=now=>{ const t=Math.min((now-t0)/dur,1); el.scrollLeft=start+diff*ease(t); if(t<1) raf.current=requestAnimationFrame(step); else onScroll(); };
    cancelAnimationFrame(raf.current);
    raf.current=requestAnimationFrame(step);
  };

  const goTo = i => smoothTo(Math.max(0,Math.min(i,cars.length-1))*STEP);

  const pDown = e => {
    dragging.current=true;
    const x=e.touches?e.touches[0].clientX:e.clientX;
    startX.current=x; lastX.current=x; lastT.current=Date.now();
    scrollStart.current=scrollEl.current.scrollLeft;
    vel.current=0; cancelAnimationFrame(raf.current);
    e.preventDefault();
  };
  const pMove = e => {
    if(!dragging.current) return;
    const x=e.touches?e.touches[0].clientX:e.clientX;
    scrollEl.current.scrollLeft=scrollStart.current-(x-startX.current);
    const dt=Date.now()-lastT.current||1;
    vel.current=(lastX.current-x)/dt*14;
    lastX.current=x; lastT.current=Date.now();
  };
  const pUp = () => {
    if(!dragging.current) return;
    dragging.current=false;
    let v=vel.current;
    const momentum=()=>{ if(Math.abs(v)<.4){smoothTo(Math.round(scrollEl.current.scrollLeft/STEP)*STEP,280);return;} scrollEl.current.scrollLeft+=v; v*=.86; raf.current=requestAnimationFrame(momentum); };
    momentum();
  };

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        {viewMode==="carousel" && (
          <div style={{display:"flex",gap:7}}>
            {[["›",activeIdx-1,activeIdx===0],["‹",activeIdx+1,activeIdx>=cars.length-1]].map(([ic,ni,dis],i)=>(
              <button key={i} onClick={()=>goTo(ni)} disabled={dis} style={{
                width:34,height:34,borderRadius:"50%",border:"none",
                background:dis?"rgba(255,255,255,.04)":"rgba(255,255,255,.1)",
                color:dis?"rgba(255,255,255,.18)":"#fff",
                cursor:dis?"not-allowed":"pointer",fontSize:18,display:"flex",
                alignItems:"center",justifyContent:"center",transition:"all .2s",
              }}>{ic}</button>
            ))}
          </div>
        )}
        <div style={{flex:1}}/>
        <div style={{display:"flex",gap:3,background:"rgba(255,255,255,.05)",borderRadius:10,padding:3}}>
          {[["carousel","⟷ تمرير"],["grid","⊞ شبكة"]].map(([m,l])=>(
            <button key={m} onClick={()=>setViewMode(m)} style={{
              padding:"6px 12px",borderRadius:7,border:"none",fontFamily:"inherit",fontWeight:700,fontSize:11,cursor:"pointer",
              background:m===viewMode?"linear-gradient(135deg,#6D28D9,#4F46E5)":"transparent",
              color:m===viewMode?"#fff":"rgba(255,255,255,.4)",transition:"all .22s",
            }}>{l}</button>
          ))}
        </div>
      </div>

      {viewMode==="grid"
        ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(260px,100%),1fr))",gap:14}}>
            {cars.map((car,i)=><CarCard key={car.id} car={car} idx={i} onClick={()=>onOpenCar(car)} liked={liked.has(car.id)} onLike={()=>onLike(car.id)}/>)}
          </div>
        : <div>
            <div ref={scrollEl} onScroll={onScroll}
              onMouseDown={pDown} onMouseMove={pMove} onMouseUp={pUp} onMouseLeave={pUp}
              onTouchStart={e=>{pDown(e.touches[0]); e.preventDefault();}} onTouchMove={e=>pMove(e.touches[0])} onTouchEnd={pUp}
              style={{display:"flex",gap:GAP,overflowX:"scroll",overflowY:"hidden",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",paddingBottom:8,paddingRight:14,cursor:"grab",userSelect:"none"}}>
              <style>{`[data-carousel]::-webkit-scrollbar{display:none}`}</style>
              {cars.map((car,i)=>{
                const dist=Math.abs(i-activeIdx);
                return(
                  <div key={car.id} style={{flexShrink:0,width:CARD_W,transform:dist===0?"scale(1)":dist===1?"scale(.965)":"scale(.93)",opacity:dist===0?1:dist===1?.72:.48,transition:"transform .32s ease,opacity .32s ease"}}>
                    <CarCard car={car} idx={i} onClick={()=>onOpenCar(car)} liked={liked.has(car.id)} onLike={()=>onLike(car.id)}/>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:5,marginTop:12,flexWrap:"wrap"}}>
              {Array.from({length:Math.min(cars.length,12)}).map((_,i)=>{
                const ri=cars.length>12?Math.floor(i*(cars.length/12)):i;
                const act=cars.length>12?Math.floor(activeIdx*(12/cars.length))===i:activeIdx===ri;
                return(
                  <button key={i} onClick={()=>goTo(ri)} style={{
                    width:act?22:6,height:6,borderRadius:3,border:"none",padding:0,cursor:"pointer",
                    background:act?"linear-gradient(90deg,#7C3AED,#818CF8)":"rgba(255,255,255,.2)",
                    transition:"all .3s cubic-bezier(.4,0,.2,1)",
                  }}/>
                );
              })}
            </div>
            <div style={{textAlign:"center",marginTop:7,fontSize:11,color:"rgba(255,255,255,.2)"}}>
              {activeIdx+1} / {cars.length} · اسحب أو استخدم الأسهم
            </div>
          </div>
      }
    </div>
  );
}
