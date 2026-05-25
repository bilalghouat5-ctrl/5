import { useMemo, useState } from "react";
import { Stars } from "./ui/Stars.jsx";
import { StarPicker } from "./ui/StarPicker.jsx";
import { useNavigate } from "../lib/router.jsx";
import { saveBooking } from "../lib/bookings.js";
import { getCurrentUser } from "../lib/supabase.js";
import {
  IconBack, IconLike, IconCalendar, IconSeat, IconFuel,
  IconGear, IconPin, IconVerified, IconSuccess, IconCar,
  IconPlus, IconMinus, IconStar, IconChevronRight, IconMpg
} from "./ui/AppIcons.jsx";

export function CarDetail({car, onBack, liked, onLike, allReviews, addReview}) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [tab, setTab]       = useState("info");
  const [stars, setStars]   = useState(0);
  const [txt, setTxt]       = useState("");
  const today = new Date();
  const iso = (offset) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset).toISOString().slice(0,10);
  const [startDate, setStartDate] = useState(iso(1));
  const [endDate, setEndDate]     = useState(iso(4));
  const [pickupPlace, setPickupPlace] = useState("الوكالة");
  const [driverPhone, setDriverPhone] = useState(user?.user_metadata?.phone || "");
  const [driverName, setDriverName] = useState(user?.user_metadata?.full_name || user?.email?.split("@")[0] || "");
  const [booked, setBooked] = useState(false);
  const [imgOk, setImgOk]   = useState(false);
  const myRevs = allReviews.filter(r => r.carId === car.id);

  const submit = () => {
    if (!stars || !txt.trim()) return;
    addReview({id:Date.now(), carId:car.id, name:"أنت",
      avatar:"https://i.pravatar.cc/60?img=1", rating:stars, comment:txt, date:"الآن"});
    setStars(0); setTxt(""); setTab("reviews");
  };

  const days = useMemo(() => {
    const diff = (new Date(endDate) - new Date(startDate)) / 86400000;
    return Number.isFinite(diff) ? Math.max(1, Math.ceil(diff)) : 1;
  }, [startDate, endDate]);
  const serviceFee = Math.round(car.price * days * 0.05);
  const total = Math.round(car.price * days + serviceFee);

  const bumpDays = (n) => {
    const d = Math.max(1, days + n);
    const start = new Date(startDate);
    const nextEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate() + d);
    setEndDate(nextEnd.toISOString().slice(0,10));
  };

  const confirmBooking = () => {
    const booking = saveBooking({
      carId: car.id,
      car: car.name,
      img: car.img,
      wilaya: car.wilaya,
      from: startDate,
      to: endDate,
      days,
      price: total,
      dailyPrice: car.price,
      serviceFee,
      pickupPlace,
      driverName: driverName || "مستخدم درايف",
      driverPhone: driverPhone || "غير محدد",
      rating: 0,
      status: "pending",
    });
    setBooked(true);
    navigator.vibrate?.(35);
    setTimeout(() => navigate("/trips"), 750);
    return booking;
  };

  const pills = [
    { icon: <IconSeat  size={20} color="rgba(255,255,255,.85)"/>, label: `${car.seats} مقاعد` },
    { icon: <IconFuel  size={20} color="rgba(255,255,255,.85)"/>, label: car.fuel },
    { icon: <IconMpg   size={20} color="rgba(255,255,255,.85)"/>, label: "20 L/100" },
    { icon: <IconGear  size={20} color="rgba(255,255,255,.85)"/>, label: car.trans },
  ];

  return (
    <div style={{animation:"fadeIn .35s ease", paddingBottom:100}}>

      {/* ── Hero Image full-bleed ── */}
      <div style={{position:"relative", background:"#0D0E1A",
        borderRadius:20, overflow:"hidden", marginBottom:20}}>
        {!imgOk && <div className="skel" style={{height:"clamp(220px,45vw,320px)", borderRadius:0}}/>}
        <img src={car.img} alt={car.name} onLoad={()=>setImgOk(true)}
          style={{width:"100%", height:"clamp(220px,45vw,320px)", objectFit:"cover",
            opacity:imgOk?1:0, transition:"opacity .4s", display:"block"}}/>
        <div style={{position:"absolute", inset:0,
          background:"linear-gradient(to top,#07080F 0%,rgba(0,0,0,.25) 55%,transparent 100%)"}}/>

        {/* Back button */}
        <button onClick={onBack} style={{
          position:"absolute", top:14, left:14,
          width:38, height:38, borderRadius:12, border:"none",
          background:"rgba(0,0,0,.55)", backdropFilter:"blur(10px)",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center"
        }}>
          <IconBack size={18} color="#fff"/>
        </button>

        {/* Like button */}
        <button onClick={onLike} style={{
          position:"absolute", top:14, right:14,
          width:38, height:38, borderRadius:12, border:"none",
          background:"rgba(0,0,0,.55)", backdropFilter:"blur(10px)",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          animation:liked?"heartPop .38s ease both":undefined
        }}>
          <IconLike size={18} active={liked}/>
        </button>

        {/* Badge */}
        {car.badge && (
          <div style={{
            position:"absolute", bottom:90, right:14,
            background:`rgba(0,0,0,.6)`, backdropFilter:"blur(8px)",
            border:"1px solid rgba(255,255,255,.15)",
            color:"#fff", padding:"3px 10px", borderRadius:20,
            fontSize:10, fontWeight:800,
          }}>{car.badge}</div>
        )}

        {/* Name + rating inside image bottom */}
        <div style={{position:"absolute", bottom:18, right:16, left:16}}>
          <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:4}}>
            <div style={{fontSize:22, fontWeight:900, color:"#fff",
              textShadow:"0 2px 16px rgba(0,0,0,.8)", flex:1,
              overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{car.name}</div>
            {car.verified && <IconVerified size={18} color="#34D399"/>}
          </div>
          <div style={{display:"flex", alignItems:"center", gap:7}}>
            <span style={{fontSize:12, color:"rgba(255,255,255,.5)"}}>{car.year}</span>
            <span style={{color:"rgba(255,255,255,.25)"}}>·</span>
            <Stars r={car.rating} size={12}/>
            <span style={{color:"rgba(255,255,255,.4)", fontSize:11}}>({car.trips} رحلة)</span>
          </div>
        </div>
      </div>

      {/* ── Spec Cards (Turo-style) ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        marginBottom: 20,
      }}>
        {/* First 3 cards in a row */}
        {pills.slice(0, 3).map((p, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,.07)",
            border: "1px solid rgba(255,255,255,.11)",
            borderRadius: 14,
            padding: "11px 13px",
          }}>
            {p.icon}
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: "rgba(255,255,255,.85)",
              lineHeight: 1.3,
            }}>{p.label}</span>
          </div>
        ))}
        {/* 4th card (transmission) full width */}
        <div style={{
          gridColumn: "1 / -1",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          background: "rgba(255,255,255,.07)",
          border: "1px solid rgba(255,255,255,.11)",
          borderRadius: 14,
          padding: "11px 16px",
        }}>
          {pills[3].icon}
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: "rgba(255,255,255,.85)",
          }}>{pills[3].label}</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{display:"flex", gap:3, background:"rgba(255,255,255,.04)", borderRadius:13,
        padding:4, marginBottom:18, border:"1px solid rgba(255,255,255,.07)"}}>
        {[["info","رحلتك"],["reviews",`التقييمات (${myRevs.length})`],["write","أضف تقييم"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            flex:1, padding:"9px 6px", borderRadius:9, border:"none",
            fontFamily:"inherit", fontWeight:700, fontSize:12, cursor:"pointer",
            transition:"all .22s",
            background:tab===k?"linear-gradient(135deg,#6D28D9,#4F46E5)":"transparent",
            color:tab===k?"#fff":"rgba(255,255,255,.4)"
          }}>{l}</button>
        ))}
      </div>

      {/* ── Trip Tab ── */}
      {tab==="info" && (
        <div style={{animation:"fadeUp .3s ease"}}>

          {/* Trip section title */}
          <div style={{fontSize:17, fontWeight:900, color:"#fff", marginBottom:14}}>رحلتك</div>

          {/* Trip dates row */}
          <div style={{
            background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
            borderRadius:14, padding:"14px 16px", marginBottom:10,
            display:"flex", alignItems:"center", gap:14
          }}>
            <div style={{
              width:38, height:38, borderRadius:10, flexShrink:0,
              background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.18)",
              display:"flex", alignItems:"center", justifyContent:"center"
            }}>
              <IconCalendar size={18} color="#A78BFA"/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:12, fontWeight:800, color:"#fff", marginBottom:3}}>تواريخ الرحلة</div>
              <div style={{display:"flex", alignItems:"center", gap:8}}>
                <button onClick={()=>bumpDays(-1)} style={{
                  width:26, height:26, borderRadius:"50%",
                  border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.06)",
                  color:"#fff", cursor:"pointer", fontFamily:"inherit",
                  display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                  <IconMinus size={13} color="#fff"/>
                </button>
                <span style={{fontWeight:800, fontSize:14, minWidth:18, textAlign:"center", color:"#C084FC"}}>{days}</span>
                <button onClick={()=>bumpDays(1)} style={{
                  width:26, height:26, borderRadius:"50%",
                  border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.06)",
                  color:"#fff", cursor:"pointer", fontFamily:"inherit",
                  display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                  <IconPlus size={13} color="#fff"/>
                </button>
                <span style={{fontSize:11, color:"rgba(255,255,255,.35)"}}>يوم</span>
              </div>
            </div>
            <IconChevronRight size={16} color="rgba(255,255,255,.25)"/>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            <label style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"11px 12px"}}>
              <div style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,.38)",marginBottom:6}}>تاريخ الاستلام</div>
              <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} style={{width:"100%",background:"transparent",border:"none",outline:"none",color:"#fff",fontFamily:"inherit",fontWeight:800}}/>
            </label>
            <label style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"11px 12px"}}>
              <div style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,.38)",marginBottom:6}}>تاريخ الإرجاع</div>
              <input type="date" value={endDate} min={startDate} onChange={e=>setEndDate(e.target.value)} style={{width:"100%",background:"transparent",border:"none",outline:"none",color:"#fff",fontFamily:"inherit",fontWeight:800}}/>
            </label>
          </div>

          {/* Pickup location row */}
          <div style={{
            background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
            borderRadius:14, padding:"14px 16px", marginBottom:20,
            display:"flex", alignItems:"center", gap:14
          }}>
            <div style={{
              width:38, height:38, borderRadius:10, flexShrink:0,
              background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.18)",
              display:"flex", alignItems:"center", justifyContent:"center"
            }}>
              <IconPin size={18} color="#A78BFA"/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:12, fontWeight:800, color:"#fff", marginBottom:3}}>موقع الاستلام والإعادة</div>
              <div style={{fontSize:11, color:"rgba(255,255,255,.45)"}}>{car.wilaya}</div>
            </div>
            <IconChevronRight size={16} color="rgba(255,255,255,.25)"/>
          </div>

          <div style={{display:"flex",gap:8,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",marginBottom:10}}>
            {["الوكالة","توصيل داخل الولاية","المطار","الفندق"].map(opt=>(
              <button key={opt} onClick={()=>setPickupPlace(opt)} className="btn-press" style={{flexShrink:0,border:"1px solid rgba(255,255,255,.08)",background:pickupPlace===opt?"linear-gradient(135deg,#6D28D9,#4F46E5)":"rgba(255,255,255,.045)",color:"#fff",borderRadius:999,padding:"8px 12px",fontFamily:"inherit",fontSize:11,fontWeight:800,cursor:"pointer"}}>{opt}</button>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            <input value={driverName} onChange={e=>setDriverName(e.target.value)} placeholder="اسم السائق" style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"12px",color:"#fff",fontFamily:"inherit",outline:"none"}}/>
            <input value={driverPhone} onChange={e=>setDriverPhone(e.target.value)} placeholder="رقم الهاتف" inputMode="tel" style={{width:"100%",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:14,padding:"12px",color:"#fff",fontFamily:"inherit",outline:"none"}}/>
          </div>

          {/* Price breakdown */}
          <div style={{background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
            borderRadius:14, padding:"14px 16px"}}>
            <div style={{fontSize:14, fontWeight:800, color:"#fff", marginBottom:12}}>تفاصيل السعر</div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:12,
              color:"rgba(255,255,255,.45)", marginBottom:8}}>
              <span>{car.price.toLocaleString()} دج × {days} أيام</span>
              <span>{(car.price*days).toLocaleString()} دج</span>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:12,
              color:"rgba(255,255,255,.45)", marginBottom:12}}>
              <span>رسوم الخدمة</span>
              <span>{serviceFee.toLocaleString()} دج</span>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:14,
              paddingTop:10, borderTop:"1px solid rgba(255,255,255,.07)"}}>
              <span style={{color:"rgba(255,255,255,.5)"}}>قبل الضرائب</span>
              <span style={{color:"#C084FC"}}>{total.toLocaleString()} دج</span>
            </div>
          </div>

          <div style={{marginTop:12,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {["إرسال الطلب", "موافقة الوكالة", "الدفع عند الاستلام"].map((step,i)=>(
              <div key={step} style={{background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.18)",borderRadius:13,padding:"10px 8px",textAlign:"center"}}>
                <div style={{width:20,height:20,borderRadius:"50%",margin:"0 auto 6px",background:i===0?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.08)",color:"#fff",fontSize:11,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{i+1}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.55)",fontWeight:800,lineHeight:1.45}}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Reviews Tab ── */}
      {tab==="reviews" && (
        <div style={{display:"flex", flexDirection:"column", gap:12, animation:"fadeUp .3s ease"}}>
          {myRevs.length===0 && (
            <div style={{textAlign:"center", padding:"40px 0", color:"rgba(255,255,255,.3)"}}>
              لا توجد تقييمات بعد
            </div>
          )}
          {myRevs.map((rv,i)=>(
            <div key={rv.id} style={{background:"rgba(255,255,255,.04)",
              border:"1px solid rgba(255,255,255,.07)", borderRadius:14, padding:14,
              animation:`fadeUp .35s ease ${i*.07}s both`}}>
              <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:9}}>
                <img src={rv.avatar} style={{width:40, height:40, borderRadius:"50%",
                  objectFit:"cover", border:"2px solid rgba(124,58,237,.4)"}}/>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700, fontSize:13, color:"#fff"}}>{rv.name}</div>
                  <div style={{fontSize:10, color:"rgba(255,255,255,.3)"}}>{rv.date}</div>
                </div>
                <Stars r={rv.rating} size={12}/>
              </div>
              <p style={{color:"rgba(255,255,255,.62)", fontSize:13, lineHeight:1.75}}>{rv.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Write Review Tab ── */}
      {tab==="write" && (
        <div style={{background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)",
          borderRadius:16, padding:18, animation:"fadeUp .3s ease"}}>
          <div style={{display:"flex", alignItems:"center", gap:8,
            fontWeight:800, fontSize:15, color:"#fff", marginBottom:16}}>
            <IconStar size={17} color="#FBBF24"/>
            شاركنا تجربتك
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:12, color:"rgba(255,255,255,.38)", marginBottom:8}}>التقييم</div>
            <StarPicker value={stars} onChange={setStars}/>
          </div>
          <textarea value={txt} onChange={e=>setTxt(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
            style={{width:"100%", minHeight:90, padding:12, borderRadius:11,
              background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)",
              color:"#fff", fontSize:13, fontFamily:"inherit", outline:"none",
              resize:"vertical", lineHeight:1.7}}
            onFocus={e=>e.target.style.borderColor="rgba(124,58,237,.6)"}
            onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.1)"}/>
          <button className="btn" onClick={submit} style={{
            marginTop:12, width:"100%", padding:12, borderRadius:11, border:"none",
            background:"linear-gradient(135deg,#6D28D9,#4F46E5)", color:"#fff",
            fontWeight:800, fontSize:14, cursor:"pointer", fontFamily:"inherit",
            opacity:(!stars||!txt.trim())?.4:1,
            display:"flex", alignItems:"center", justifyContent:"center", gap:8}}>
            <IconStar size={15} color="#fff"/>
            إرسال التقييم
          </button>
        </div>
      )}

      {/* ── Fixed bottom bar ── */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        background:"rgba(7,8,15,.96)", backdropFilter:"blur(20px)",
        borderTop:"1px solid rgba(255,255,255,.07)",
        padding:"12px 16px max(14px,env(safe-area-inset-bottom))",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:14,
        zIndex:200
      }}>
        <div>
          <div style={{fontSize:11, color:"rgba(255,255,255,.35)", marginBottom:1}}>قبل الضرائب</div>
          <div style={{display:"flex", alignItems:"baseline", gap:5}}>
            <span style={{fontSize:11, color:"rgba(255,255,255,.3)",
              textDecoration:"line-through"}}>{(car.price*days).toLocaleString()}</span>
            <span style={{fontSize:20, fontWeight:900, color:"#C084FC"}}>
              {total.toLocaleString()}
              <span style={{fontSize:11, fontWeight:400, color:"rgba(255,255,255,.35)"}}> دج</span>
            </span>
          </div>
        </div>
        {booked
          ? <div style={{
              flex:1, maxWidth:200, padding:"13px 0", borderRadius:14,
              background:"rgba(52,211,153,.1)", border:"1px solid rgba(52,211,153,.28)",
              color:"#34D399", fontWeight:800, fontSize:14,
              display:"flex", alignItems:"center", justifyContent:"center", gap:7,
              animation:"fadeUp .3s ease"
            }}>
              <IconSuccess size={18}/>
              تم الحجز!
            </div>
          : <button className="btn" onClick={confirmBooking}
              style={{
                flex:1, maxWidth:200, padding:13, borderRadius:14, border:"none",
                background:"linear-gradient(135deg,#6D28D9,#4F46E5)", color:"#fff",
                fontWeight:800, fontSize:15, cursor:"pointer", fontFamily:"inherit",
                boxShadow:"0 6px 22px rgba(109,40,217,.38)",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8
              }}>
              <IconCar size={17} color="#fff"/>
              احجز الآن
            </button>
        }
      </div>
    </div>
  );
}
