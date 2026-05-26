import { useState } from "react";
import { IconClose, IconFilter, IconGear, IconFuel, IconVerified } from "./ui/AppIcons.jsx";

export function FilterPanel({advF, setAdvF, onClose}) {
  const [L, setL] = useState(advF);
  const up = (k,v) => setL(p=>({...p,[k]:v}));
  return (
    <div style={{position:"fixed",inset:0,zIndex:700,background:"rgba(0,0,0,.72)",backdropFilter:"blur(10px)"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        position:"absolute",top:0,right:0,
        width:"min(clamp(300px,80vw,360px),94vw)",height:"100%",
        background:"#09091C",borderLeft:"1px solid rgba(255,255,255,.08)",
        display:"flex",flexDirection:"column",
        animation:"slideR .3s cubic-bezier(.4,0,.2,1) both",
      }}>
        <style>{`@keyframes slideR{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

        {/* Header */}
        <div style={{padding:"18px 18px 14px",borderBottom:"1px solid rgba(255,255,255,.07)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <IconFilter size={16} color="#A78BFA"/>
            <span style={{fontWeight:900,fontSize:16,color:"#fff"}}>الفلاتر</span>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.08)",border:"none",color:"rgba(255,255,255,.6)",width:30,height:30,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <IconClose size={14} color="rgba(255,255,255,.6)"/>
          </button>
        </div>

        <div style={{flex:1,overflowY:"auto",WebkitOverflowScrolling:"touch",padding:18,display:"flex",flexDirection:"column",gap:22}}>
          {/* Price */}
          <div>
            <div style={{fontSize:11,fontWeight:800,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10}}>السعر اليومي (دج)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["minP","من"],["maxP","إلى"]].map(([k,l])=>(
                <div key={k}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.3)",marginBottom:5}}>{l}</div>
                  <input type="number" value={L[k]} onChange={e=>up(k,e.target.value)} placeholder="0"
                    style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,color:"#fff",padding:"11px 12px",fontSize:14,fontFamily:"inherit",outline:"none"}}/>
                </div>
              ))}
            </div>
          </div>

          {/* Fuel */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:800,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10}}>
              <IconFuel size={13} color="rgba(255,255,255,.4)"/>
              الوقود
            </div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {["الكل","بنزين","ديزل","كهربائي"].map(f=>(
                <button key={f} onClick={()=>up("fuel",f)} style={{
                  padding:"7px 14px",borderRadius:40,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:12,
                  border:`1.5px solid ${L.fuel===f?"#7C3AED":"rgba(255,255,255,.1)"}`,
                  background:L.fuel===f?"rgba(124,58,237,.2)":"rgba(255,255,255,.04)",
                  color:L.fuel===f?"#C084FC":"rgba(255,255,255,.5)",transition:"all .2s",
                }}>{f}</button>
              ))}
            </div>
          </div>

          {/* Trans */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:800,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10}}>
              <IconGear size={13} color="rgba(255,255,255,.4)"/>
              ناقل الحركة
            </div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
              {["الكل","أوتوماتيك","يدوي"].map(tr=>(
                <button key={tr} onClick={()=>up("trans",tr)} style={{
                  padding:"7px 14px",borderRadius:40,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:12,
                  border:`1.5px solid ${L.trans===tr?"#7C3AED":"rgba(255,255,255,.1)"}`,
                  background:L.trans===tr?"rgba(124,58,237,.2)":"rgba(255,255,255,.04)",
                  color:L.trans===tr?"#C084FC":"rgba(255,255,255,.5)",transition:"all .2s",
                }}>{tr}</button>
              ))}
            </div>
          </div>

          {/* Verified */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,.04)",borderRadius:13,padding:"13px 15px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <IconVerified size={16}/>
              <span style={{fontSize:13,color:"rgba(255,255,255,.78)",fontWeight:600}}>الوكالات الموثقة فقط</span>
            </div>
            <button onClick={()=>up("verified",!L.verified)} style={{
              width:46,height:25,borderRadius:13,border:"none",cursor:"pointer",position:"relative",
              background:L.verified?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.12)",
              transition:"background .3s",
            }}>
              <span style={{
                position:"absolute",top:2.5,width:20,height:20,borderRadius:"50%",background:"#fff",
                transition:"right .28s,left .28s",
                right:L.verified?2.5:"auto", left:L.verified?"auto":2.5,
                boxShadow:"0 1px 4px rgba(0,0,0,.25)",
              }}/>
            </button>
          </div>
        </div>

        {/* Footer buttons */}
        <div style={{padding:18,borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",gap:10}}>
          <button onClick={()=>setAdvF({fuel:"الكل",trans:"الكل",verified:false,minP:"",maxP:""})}
            style={{flex:1,padding:"12px",borderRadius:11,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",color:"rgba(255,255,255,.5)",fontFamily:"inherit",fontWeight:700,fontSize:14,cursor:"pointer"}}>
            إعادة تعيين
          </button>
          <button onClick={()=>{setAdvF(L);onClose();}}
            style={{flex:2,padding:"12px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",color:"#fff",fontFamily:"inherit",fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:"0 4px 16px rgba(124,58,237,.38)",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            <IconVerified size={15} color="#fff"/>
            تطبيق
          </button>
        </div>
      </div>
    </div>
  );
}
