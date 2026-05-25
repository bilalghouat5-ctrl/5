import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "./lib/router.jsx";
import CSS from "./styles/globalCSS.js";
import APP_ICON_IMG from "./assets/appIcon.js";
import { INIT_REVIEWS } from "./constants/data.js";
import { Onboarding } from "./components/Onboarding.jsx";
import { IconSearch, IconHeart, IconRoad, IconBubble, IconMore } from "./components/ui/NavIcons.jsx";
import { IconSearchSm, IconFilter, IconClose, IconPin, IconSpark, IconMap } from "./components/ui/AppIcons.jsx";
import { FilterPanel } from "./components/FilterPanel.jsx";
import { SkeletonCard } from "./components/ui/SkeletonCard.jsx";
import { Stars } from "./components/ui/Stars.jsx";
import { CarDetail } from "./components/CarDetail.jsx";
import { AgencyDetail } from "./components/AgencyDetail.jsx";
import { FavoritesPage } from "./components/pages/FavoritesPage.jsx";
import { TripsPage }     from "./components/pages/TripsPage.jsx";
import { MessagesPage }  from "./components/pages/MessagesPage.jsx";
import { ProfilePage }   from "./components/pages/ProfilePage.jsx";
import { AllSectionPage } from "./components/pages/AllSectionPage.jsx";
import { AgenciesSection } from "./components/sections/AgenciesSection.jsx";
import { MonthCarsSection } from "./components/sections/MonthCarsSection.jsx";
import { WeddingSection } from "./components/sections/WeddingSection.jsx";
import { LuxurySection } from "./components/sections/LuxurySection.jsx";
import { GuestAuthSheet } from "./components/GuestAuthSheet.jsx";
import { useLocation as useGeoLocation } from "./hooks/useLocation.js";
import { getCurrentUser } from "./lib/supabase.js";
import { useCars } from "./hooks/useSupabaseData.js";
import { LocationPermissionScreen } from "./components/LocationPermissionScreen.jsx";
import { SmartSuggestSheet } from "./components/SmartSuggestSheet.jsx";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt.jsx";


export default function App() {
  const navigate  = useNavigate();
  const location  = useLocation();          // from react-router-dom
  const pathname  = location.pathname;      // e.g. "/car/42", "/favorites"

  // ── Persist state ─────────────────────────────────────────────────────────
  const [onboarded, setOnboarded]     = useState(false);
  const [locationDone, setLocationDone] = useState(() => localStorage.getItem("locDone") === "1");
  const { status: locStatus, wilaya: detectedWilaya, requestLocation } = useGeoLocation();
  const [userWilaya, setUserWilaya]   = useState(() => localStorage.getItem("wilaya") || null);
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const isLoggedIn = !!currentUser;

  // ── UI state ──────────────────────────────────────────────────────────────
  const [selCar, setSelCar]       = useState(null);
  const [selAgency, setSelAgency] = useState(null);
  const [skelLoading, setSkelLoading] = useState(false);
  const [filterOpen, setFilterOpen]   = useState(false);
  const [authSheet, setAuthSheet] = useState(false);
  const [smartOpen, setSmartOpen] = useState(false);
  const [showPwaPrompt, setShowPwaPrompt] = useState(() => localStorage.getItem("driverent_pwa_closed") !== "1");
  const [fType, setFType]         = useState("all");
  const [searchText, setSearchText] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [advF, setAdvF] = useState({fuel:"الكل",trans:"الكل",verified:false,minP:"",maxP:""});
  const [liked, setLiked]     = useState(new Set());
  const [sort, setSort]       = useState("pop");
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const { cars: sbCars, loading: carsLoading } = useCars();
  const searchRef = useRef();

  // ── Inject global CSS once ────────────────────────────────────────────────
  useEffect(()=>{
    const el=document.createElement("style");
    el.textContent=CSS;
    document.head.appendChild(el);
    return()=>document.head.removeChild(el);
  },[]);

  // ── Sync auth across tabs ─────────────────────────────────────────────────
  useEffect(() => {
    const sync = () => setCurrentUser(getCurrentUser());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // ── Persist location state ────────────────────────────────────────────────
  useEffect(() => {
    if (locStatus === "granted" && detectedWilaya) {
      setUserWilaya(detectedWilaya);
      setLocationDone(true);
      localStorage.setItem("wilaya", detectedWilaya);
      localStorage.setItem("locDone", "1");
    } else if (locStatus === "denied") {
      setLocationDone(true);
      localStorage.setItem("locDone", "1");
    }
  }, [locStatus, detectedWilaya]);

  // ── Restore selCar / selAgency from URL on mount ──────────────────────────
  useEffect(() => {
    const match = pathname.match(/^\/(car|agency)\/(.+)$/);
    if (match) {
      const [, type, id] = match;
      if (type === "car") {
        const car = sbCars.find(c => String(c.id) === id);
        if (car) setSelCar(car);
      }
      if (type === "agency") {
        // agencies are loaded via sections; best-effort
      }
    }
  }, [pathname, sbCars]);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const normalizeCar = car => ({
    year: 2024,
    seats: 5,
    fuel: "بنزين",
    trans: "أوتوماتيك",
    trips: 0,
    reviews: 0,
    badge: car?.badge || "فاخرة",
    verified: true,
    freeCancel: true,
    type: car?.type || "sedan",
    ...car,
  });

  const openCar = car => {
    const normalized = normalizeCar(car);
    setSkelLoading(true);
    setTimeout(()=>{
      setSkelLoading(false);
      setSelCar(normalized);
      navigate(`/car/${normalized.id}`);
      window.scrollTo(0,0);
    }, 480);
  };

  const openAgency = ag => {
    setSelAgency(ag);
    navigate(`/agency/${ag.id}`);
    window.scrollTo(0,0);
  };

  const goHome = () => {
    setSelCar(null);
    setSelAgency(null);
    navigate("/");
  };

  const toggleLike = id => setLiked(p=>{ const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; });

  const refreshLocation = () => {
    navigator.vibrate?.(18);
    requestLocation();
  };

  // ── Derive current "tab" from URL ─────────────────────────────────────────
  const currentTab = (() => {
    if (pathname.startsWith("/car/"))    return "home";
    if (pathname.startsWith("/agency/")) return "home";
    if (pathname.startsWith("/all/"))    return "home";
    if (pathname === "/favorites")       return "favorites";
    if (pathname === "/trips")           return "trips";
    if (pathname === "/messages")        return "messages";
    if (pathname === "/profile")         return "profile";
    return "home";
  })();

  // ── Filtering / search ─────────────────────────────────────────────────────
  const filtered = sbCars
    .filter(c=>fType==="all"||c.type===fType)
    .filter(c=>{ if(!searchText) return true; const q=searchText.toLowerCase(); return c.name.toLowerCase().includes(q)||c.badge.includes(searchText)||c.wilaya.includes(searchText); })
    .filter(c=>advF.fuel==="الكل"||c.fuel===advF.fuel)
    .filter(c=>advF.trans==="الكل"||c.trans===advF.trans)
    .filter(c=>!advF.verified||c.verified)
    .filter(c=>!advF.minP||c.price>=+advF.minP)
    .filter(c=>!advF.maxP||c.price<=+advF.maxP)
    .sort((a,b)=>sort==="pop"?b.trips-a.trips:sort==="new"?b.year-a.year:a.price-b.price);

  const suggs = searchText ? sbCars.filter(c=>{ const q=searchText.toLowerCase(); return c.name.toLowerCase().includes(q)||c.wilaya.includes(searchText); }).slice(0,5) : [];
  const nActive = [advF.fuel!=="الكل",advF.trans!=="الكل",advF.verified,advF.minP,advF.maxP].filter(Boolean).length;

  // ── Pre-router screens ─────────────────────────────────────────────────────
  if (!onboarded) return <Onboarding onDone={()=>setOnboarded(true)}/>;

  if (!locationDone) {
    return (
      <LocationPermissionScreen
        status={locStatus}
        onGranted={() => requestLocation()}
        onManualSelect={(w) => { setUserWilaya(w); setLocationDone(true); localStorage.setItem("wilaya",w); localStorage.setItem("locDone","1"); }}
        onSkip={() => { setUserWilaya(null); setLocationDone(true); localStorage.setItem("locDone","1"); }}
      />
    );
  }

  // ── Render current route content ───────────────────────────────────────────
  const renderPage = () => {
    if (pathname.startsWith("/car/") && selCar)
      return <CarDetail car={selCar} onBack={()=>{ setSelCar(null); navigate(-1); }} liked={liked.has(selCar.id)} onLike={()=>toggleLike(selCar.id)} allReviews={reviews} addReview={r=>setReviews(p=>[r,...p])}/>;

    if (pathname.startsWith("/agency/") && selAgency)
      return <AgencyDetail agency={selAgency} onBack={()=>{ setSelAgency(null); navigate(-1); }} onOpenCar={openCar} liked={liked} onLike={toggleLike}/>;

    if (pathname.startsWith("/all/")) {
      const section = pathname.split("/")[2] || "agencies";
      return <AllSectionPage
        section={section}
        userWilaya={userWilaya}
        onBack={()=>navigate("/")}
        onOpenAgency={openAgency}
        onOpenCar={openCar}
        liked={liked}
        onLike={toggleLike}
      />;
    }

    if (pathname === "/favorites")
      return <FavoritesPage liked={liked} onLike={toggleLike} onOpenCar={openCar}/>;

    if (pathname === "/trips")    return <TripsPage/>;
    if (pathname === "/messages") return <MessagesPage/>;
    if (pathname === "/profile")  return <ProfilePage onLogout={()=>{ setCurrentUser(null); navigate("/"); }}/>;

    // Default: Home
    return (
      <>
        {/* Hero */}
        <div style={{textAlign:"center",padding:"var(--hero-padding, 22px 10px 18px)",animation:"fadeUp .5s ease"}}>
          {userWilaya ? (
            <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:9,padding:"4px 12px 4px 10px",borderRadius:20,background:"rgba(52,168,83,.12)",border:"1px solid rgba(52,168,83,.3)",color:"#34D399",fontSize:11,fontWeight:700,cursor:"pointer"}}
              onClick={()=>{ setUserWilaya(null); setLocationDone(false); localStorage.removeItem("wilaya"); localStorage.removeItem("locDone"); }}>
              <IconPin size={12} color="#34D399"/>
              {userWilaya}
              <IconClose size={10} color="#34D399"/>
            </div>
          ) : (
            <div style={{display:"inline-block",marginBottom:9,padding:"3px 13px",borderRadius:20,background:"rgba(109,40,217,.14)",border:"1px solid rgba(109,40,217,.26)",color:"#A78BFA",fontSize:11,fontWeight:700}}>أكثر من +1000 سيارة تنتظركم</div>
          )}
          <h1 style={{fontSize:"clamp(22px,5vw,38px)",fontWeight:900,lineHeight:1.2,background:"linear-gradient(135deg,#F1F5F9 40%,#A78BFA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:20,letterSpacing:"-1px"}}>
            {userWilaya ? `سيارات في ${userWilaya}` : "أجر سيارتك المثالية بكل سهولة"}
          </h1>

          {/* Search */}
          <div style={{maxWidth:"clamp(300px,90vw,520px)",margin:"0 auto",position:"relative"}}>
            <div style={{display:"flex",gap:9}}>
              <div style={{flex:1,position:"relative"}}>
                <div style={{display:"flex",alignItems:"center",background:"rgba(255,255,255,.06)",border:`1.5px solid ${searchFocus?"rgba(124,58,237,.65)":"rgba(255,255,255,.1)"}`,borderRadius:13,transition:"border-color .22s,box-shadow .22s",boxShadow:searchFocus?"0 0 0 3px rgba(124,58,237,.15)":"none"}}>
                  <span style={{padding:"0 11px",color:searchFocus?"#A78BFA":"rgba(255,255,255,.28)",flexShrink:0,display:"flex",alignItems:"center"}}>
                    <IconSearchSm size={15} color={searchFocus?"#A78BFA":"rgba(255,255,255,.28)"}/>
                  </span>
                  <input ref={searchRef} value={searchText} onChange={e=>setSearchText(e.target.value)}
                    onFocus={()=>setSearchFocus(true)} onBlur={()=>setTimeout(()=>setSearchFocus(false),200)}
                    placeholder="ابحث: سيارة، ولاية، نوع..."
                    style={{flex:1,background:"transparent",border:"none",color:"#fff",padding:"13px 6px",fontSize:14,fontFamily:"inherit",outline:"none",minWidth:0}}/>
                  {searchText&&(
                    <button onClick={()=>setSearchText("")} style={{background:"none",border:"none",color:"rgba(255,255,255,.35)",cursor:"pointer",padding:"0 11px",display:"flex",alignItems:"center",minHeight:44}}>
                      <IconClose size={16} color="rgba(255,255,255,.35)"/>
                    </button>
                  )}
                </div>
                {searchFocus&&suggs.length>0&&(
                  <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,zIndex:500,background:"#0C0C1E",border:"1px solid rgba(124,58,237,.28)",borderRadius:13,overflow:"hidden",boxShadow:"0 20px 50px rgba(0,0,0,.6)",animation:"fadeUp .18s ease"}}>
                    {suggs.map((c,i)=>(
                      <div key={c.id} className="sug" onMouseDown={()=>openCar(c)} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 13px",cursor:"pointer",borderBottom:i<suggs.length-1?"1px solid rgba(255,255,255,.05)":"none"}}>
                        <img src={c.img} alt="" style={{width:44,height:33,objectFit:"cover",borderRadius:7,flexShrink:0}}/>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:700,fontSize:13,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{c.wilaya} · {c.price.toLocaleString()} دج/يوم</div>
                        </div>
                        <Stars r={c.rating} size={10}/>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={()=>setFilterOpen(true)} style={{display:"flex",alignItems:"center",gap:6,background:nActive>0?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.06)",border:`1.5px solid ${nActive>0?"transparent":"rgba(255,255,255,.1)"}`,color:nActive>0?"#fff":"rgba(255,255,255,.5)",padding:"0 14px",borderRadius:13,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,flexShrink:0,transition:"all .22s",minHeight:46,boxShadow:nActive>0?"0 4px 16px rgba(124,58,237,.35)":"none"}}>
                <IconFilter size={14} color={nActive>0?"#fff":"rgba(255,255,255,.5)"}/>
                فلتر {nActive>0&&`(${nActive})`}
              </button>
            </div>

            <div style={{display:"flex",gap:8,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",padding:"12px 2px 0",justifyContent:"center"}}>
              <button onClick={refreshLocation} className="btn-press" style={{flexShrink:0,display:"flex",alignItems:"center",gap:6,border:"1px solid rgba(124,58,237,.24)",background:"rgba(124,58,237,.1)",color:"#C4B5FD",borderRadius:999,padding:"9px 13px",fontFamily:"inherit",fontSize:11,fontWeight:900,cursor:"pointer"}}>
                <IconMap size={13} color="#A78BFA"/>
                {locStatus === "requesting" ? "تحديد الموقع..." : "قريب مني"}
              </button>
              <button onClick={()=>setSmartOpen(true)} className="btn-press" style={{flexShrink:0,display:"flex",alignItems:"center",gap:6,border:"1px solid rgba(124,58,237,.24)",background:"linear-gradient(135deg,rgba(124,58,237,.18),rgba(79,70,229,.1))",color:"#fff",borderRadius:999,padding:"9px 13px",fontFamily:"inherit",fontSize:11,fontWeight:900,cursor:"pointer"}}>
                <IconSpark size={13} color="#C4B5FD"/>
                اقترح لي سيارة
              </button>
            </div>
          </div>
        </div>

        {/* Sections */}
        <AgenciesSection delay={0} onOpen={openAgency} userWilaya={userWilaya} onSeeAll={()=>navigate("/all/agencies")}/>
        <MonthCarsSection delay={.05} onOpen={openCar} userWilaya={userWilaya} liked={liked} onLike={toggleLike} onSeeAll={()=>navigate("/all/month")}/>
        <WeddingSection delay={.1} onOpen={openCar} userWilaya={userWilaya} onSeeAll={()=>navigate("/all/wedding")}/>
        <LuxurySection delay={.15} onOpen={openCar} userWilaya={userWilaya} onSeeAll={()=>navigate("/all/luxury")}/>
      </>
    );
  };

  return (
    <div style={{minHeight:"100vh",background:"#07080F",color:"#F1F5F9",overscrollBehavior:"contain"}}>

      {/* Skeleton overlay */}
      {skelLoading&&(
        <div style={{position:"fixed",inset:0,zIndex:800,background:"rgba(7,8,15,.92)",backdropFilter:"blur(12px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18}}>
          <div style={{display:"grid",gridTemplateColumns:"var(--grid-cols, repeat(auto-fill,minmax(min(260px,44vw),1fr)))",gap:"clamp(10px,2.5vw,16px)",width:"min(var(--app-max-width, 900px),92vw)",maxHeight:"65vh",overflow:"hidden"}}>
            {[0,1,2,3,4,5].map(i=><SkeletonCard key={i}/>)}
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.28)",animation:"fadeUp 1.4s infinite"}}>جاري التحميل...</div>
        </div>
      )}

      {filterOpen&&<FilterPanel advF={advF} setAdvF={setAdvF} onClose={()=>setFilterOpen(false)}/>}
      {authSheet && <GuestAuthSheet
        onClose={()=>setAuthSheet(false)}
        onLogin={()=>{ setAuthSheet(false); navigate("/login"); }}
        onRegister={()=>{ setAuthSheet(false); navigate("/register"); }}
      />}
      {smartOpen && <SmartSuggestSheet cars={sbCars} userWilaya={userWilaya} onClose={()=>setSmartOpen(false)} onOpenCar={openCar}/>}

      {/* ── Top Nav ─────────────────────────────────────────────────────── */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(7,8,15,.94)",backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",borderBottom:"1px solid rgba(255,255,255,.07)",padding:"var(--standalone-extra-top, 0px) clamp(12px,3vw,24px) 0",height:"var(--top-nav-total, var(--nav-height, 58px))",display:"flex",alignItems:"center",gap:"clamp(8px,2vw,16px)"}}>
        <div onClick={goHome} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}}>
          <img src={APP_ICON_IMG} alt="logo" style={{width:36,height:36,objectFit:"contain",flexShrink:0,borderRadius:9}}/>
          <span style={{fontWeight:900,fontSize:"clamp(13px,3.5vw,17px)",color:"#fff",letterSpacing:"-0.3px",lineHeight:1}}>
            <span style={{color:"#A78BFA"}}>RENT</span> درايف
          </span>
        </div>
        <div style={{flex:1}}/>
        <button onClick={()=>navigate("/agency-register")} style={{
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          gap:4,
          background:"#7C3AED",
          border:"none",
          borderRadius:12, padding:"8px clamp(10px,2.5vw,14px)",
          cursor:"pointer", fontFamily:"inherit",
          flexShrink:0,
          transition:"all .18s",
          minWidth:"clamp(54px,14vw,70px)",
        }}
          onMouseEnter={e=>{e.currentTarget.style.background="#6D28D9";e.currentTarget.style.transform="scale(1.05)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#7C3AED";e.currentTarget.style.transform="scale(1)";}}>
          <span style={{
            fontSize:"clamp(9px,2.2vw,11px)", fontWeight:800,
            color:"#fff",
            whiteSpace:"nowrap", lineHeight:1.4, textAlign:"center",
          }}>أضف<br/>وكالتك</span>
        </button>
      </nav>

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <div style={{maxWidth:"var(--app-max-width, 900px)",margin:"0 auto",padding:"clamp(14px,3vw,24px) var(--app-padding, 14px)"}}>
        {renderPage()}
      </div>

      {/* ── Bottom Nav ───────────────────────────────────────────────────── */}
      <div className="bottom-nav" style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(7,8,15,.96)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",justifyContent:"space-around",padding:"10px 0 max(10px,env(safe-area-inset-bottom))",zIndex:99}}>
        {[
          { label:"استكشف", Icon:IconSearch, path:"/"          },
          { label:"المفضلة", Icon:IconHeart,  path:"/favorites" },
          { label:"رحلاتي",  Icon:IconRoad,   path:"/trips"     },
          { label:"رسائل",   Icon:IconBubble, path:"/messages"  },
          { label:"حسابي",   Icon:IconMore,   path:"/profile"   },
        ].map(({label,Icon,path})=>{
          const isHome = path === "/";
          const active = isHome
            ? (pathname === "/" || pathname.startsWith("/car/") || pathname.startsWith("/agency/"))
            : pathname === path;
          const isProtected = !isHome;

          return (
            <button key={label} onClick={()=>{
              if (isProtected && !isLoggedIn) {
                setAuthSheet(true);
                return;
              }
              navigate(path);
              window.scrollTo(0,0);
            }} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",padding:"4px clamp(6px,2vw,12px)",transition:"opacity .2s",flex:1,maxWidth:80}}>
              <Icon active={active}/>
              <span className="nav-label" style={{fontSize:"clamp(9px,2.5vw,11px)",fontWeight:active?700:500,color:active?"#A78BFA":"rgba(255,255,255,.32)",transition:"color .2s"}}>{label}</span>
            </button>
          );
        })}
      </div>

      {showPwaPrompt && <PWAInstallPrompt onClose={()=>{ localStorage.setItem("driverent_pwa_closed","1"); setShowPwaPrompt(false); }}/>} 
    </div>
  );
}
