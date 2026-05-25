import { useState } from "react";
import { CARS } from "../constants/data.js";
import { Stars } from "./ui/Stars.jsx";
import {
  IconBack, IconLike, IconPin, IconVerified, IconCar,
  IconBuilding, IconStar, IconCalendar, IconSeat, IconFuel, IconGear
} from "./ui/AppIcons.jsx";

export function AgencyDetail({ agency, onBack, onOpenCar, liked, onLike }) {
  const [tab, setTab] = useState("cars");
  const [imgOk, setImgOk] = useState(false);

  const agencyCars = CARS.filter(c => c.wilaya === agency.wilaya);

  return (
    <div style={{animation:"fadeIn .35s ease", paddingBottom:90}}>

      {/* Back */}
      <button onClick={onBack} style={{
        display:"inline-flex", alignItems:"center", gap:7,
        background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)",
        color:"rgba(255,255,255,.7)", padding:"8px 15px", borderRadius:12,
        cursor:"pointer", marginBottom:16, fontSize:13, fontWeight:700, fontFamily:"inherit"
      }}>
        <IconBack size={16} color="rgba(255,255,255,.7)"/>
        رجوع
      </button>

      {/* Hero Image */}
      <div style={{borderRadius:20, overflow:"hidden", position:"relative", marginBottom:20, background:"#0D0E1A"}}>
        {!imgOk && <div className="skel" style={{height:220, borderRadius:0}}/>}
        <img src={agency.img} alt={agency.name} onLoad={()=>setImgOk(true)}
          style={{width:"100%", height:220, objectFit:"cover",
            opacity:imgOk?1:0, transition:"opacity .4s", display:"block"}}/>
        <div style={{position:"absolute", inset:0, background:"linear-gradient(to top,#07080F 0%,transparent 55%)"}}/>
        {agency.badge && (
          <div style={{
            position:"absolute", top:12, right:12,
            background:`linear-gradient(135deg,${agency.color},${agency.color}cc)`,
            color:"#fff", padding:"3px 11px", borderRadius:20,
            fontSize:10, fontWeight:900,
            boxShadow:`0 3px 10px ${agency.color}55`,
            animation:"badgePop .4s cubic-bezier(.34,1.56,.64,1) both",
          }}>{agency.badge}</div>
        )}
        <div style={{position:"absolute", bottom:18, right:16}}>
          <div style={{fontSize:22, fontWeight:900, color:"#fff", textShadow:"0 2px 16px rgba(0,0,0,.8)", marginBottom:6}}>{agency.name}</div>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <Stars r={agency.rating} size={13}/>
            <span style={{color:"rgba(255,255,255,.45)", fontSize:11}}>{agency.cars} سيارة</span>
          </div>
        </div>
      </div>

      {/* Specs row */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:18}}>
        {[
          [<IconPin size={18} color="#A78BFA"/>,       "الولاية",    agency.wilaya],
          [<IconCar size={18} color="#A78BFA"/>,       "السيارات",   `${agency.cars} سيارة`],
          [<IconBuilding size={18} color="#A78BFA"/>,  "التقييم",    `${agency.rating}`],
        ].map(([icon, label, val], i) => (
          <div key={i} style={{
            background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
            borderRadius:13, padding:"13px 10px",
            display:"flex", flexDirection:"column", alignItems:"center", gap:7
          }}>
            <div style={{width:34, height:34, borderRadius:9,
              background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.18)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
              {icon}
            </div>
            <div style={{fontSize:10, color:"rgba(255,255,255,.35)", textAlign:"center"}}>{label}</div>
            <div style={{fontSize:12, fontWeight:800, color:"#fff", textAlign:"center"}}>{val}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:"flex", gap:3, background:"rgba(255,255,255,.04)", borderRadius:13,
        padding:4, marginBottom:18, border:"1px solid rgba(255,255,255,.07)"}}>
        {[["cars",`سيارات الوكالة (${agencyCars.length})`],["info","معلومات"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            flex:1, padding:"9px 6px", borderRadius:9, border:"none",
            fontFamily:"inherit", fontWeight:700, fontSize:12, cursor:"pointer",
            transition:"all .22s",
            background:tab===k?"linear-gradient(135deg,#6D28D9,#4F46E5)":"transparent",
            color:tab===k?"#fff":"rgba(255,255,255,.4)"
          }}>{l}</button>
        ))}
      </div>

      {/* Cars Tab */}
      {tab==="cars" && (
        <div style={{display:"flex", flexDirection:"column", gap:12, animation:"fadeUp .3s ease"}}>
          {agencyCars.length===0 && (
            <div style={{textAlign:"center", padding:"40px 0", color:"rgba(255,255,255,.3)"}}>
              لا توجد سيارات متاحة
            </div>
          )}
          {agencyCars.map((car, i) => (
            <div key={car.id} className="btn-press" onClick={()=>onOpenCar(car)} style={{
              display:"flex", gap:0, alignItems:"stretch",
              background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
              borderRadius:16, overflow:"hidden", cursor:"pointer",
              animation:`fadeUp .35s ease ${i*.07}s both`
            }}>
              <div style={{width:110, flexShrink:0, position:"relative", overflow:"hidden", background:"#0D0E1A"}}>
                <img src={car.img} alt={car.name}
                  style={{width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s ease"}}/>
                <div style={{position:"absolute", inset:0, background:"linear-gradient(to right,transparent,rgba(7,8,15,.25))"}}/>
                {car.badge && (
                  <div style={{
                    position:"absolute", bottom:7, right:7,
                    background:"rgba(0,0,0,.65)", backdropFilter:"blur(6px)",
                    color:"#fff", padding:"2px 7px", borderRadius:20,
                    fontSize:8, fontWeight:900,
                  }}>{car.badge}</div>
                )}
              </div>
              <div style={{flex:1, padding:"13px 14px"}}>
                <div style={{fontSize:13, fontWeight:800, color:"#fff", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{car.name}</div>
                <div style={{fontSize:10, color:"rgba(255,255,255,.35)", marginBottom:7}}>
                  <IconPin size={9} color="rgba(255,255,255,.35)"/> {car.wilaya} · {car.year}
                </div>
                <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:7}}>
                  <Stars r={car.rating} size={10}/>
                  <span style={{fontSize:10, color:"rgba(255,255,255,.3)"}}>{car.trips} رحلة</span>
                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <span style={{fontSize:14, fontWeight:900, color:"#C084FC"}}>
                    {car.price.toLocaleString()}
                    <span style={{fontSize:9, color:"rgba(255,255,255,.3)"}}> دج/يوم</span>
                  </span>
                  {car.verified && (
                    <IconVerified size={16} color="#34D399"/>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Tab */}
      {tab==="info" && (
        <div style={{animation:"fadeUp .3s ease"}}>
          <div style={{background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
            borderRadius:16, padding:18}}>
            {/* Agency header */}
            <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:16, paddingBottom:14, borderBottom:"1px solid rgba(255,255,255,.07)"}}>
              <div style={{
                width:44, height:44, borderRadius:12,
                background:`${agency.color}22`, border:`1px solid ${agency.color}44`,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0
              }}>
                <IconBuilding size={22} color={agency.color}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:900, fontSize:15, color:"#fff"}}>{agency.name}</div>
                <div style={{fontSize:11, color:"rgba(255,255,255,.35)", marginTop:2}}>وكالة معتمدة · {agency.wilaya}</div>
              </div>
              <IconVerified size={20} color="#34D399"/>
            </div>
            {/* Info rows */}
            {[
              ["الولاية",       agency.wilaya],
              ["عدد السيارات",  `${agency.cars} سيارة`],
              ["التقييم العام", `${agency.rating} / 5`],
              ["الحالة",        "مفتوحة · 24/7"],
              ["الوثوقية",      "موثقة رسمياً"],
            ].map(([label, val], i) => (
              <div key={i} style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"10px 0",
                borderTop:"1px solid rgba(255,255,255,.06)"
              }}>
                <span style={{fontSize:12, color:"rgba(255,255,255,.38)"}}>{label}</span>
                <span style={{fontSize:13, fontWeight:700, color:"#fff"}}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
