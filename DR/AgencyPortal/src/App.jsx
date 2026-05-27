import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const supabase = createClient(SUPABASE_URL || "https://placeholder.supabase.co", SUPABASE_ANON_KEY || "placeholder-anon-key", { auth:{persistSession:true, autoRefreshToken:true} });

// ═══════════════════════════════════════════════════════════════════════════
// Qatar2022Font — embedded via @font-face (Google Fonts CDN)
// This ensures the font loads correctly in all environments including VS Code
// ═══════════════════════════════════════════════════════════════════════════
const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
  @font-face {
    font-family: 'Qatar2022Font';
    src: url('https://fonts.gstatic.com/s/cairo/v28/SLXVc1nY6HkvangtZmpcWmhzfH5lWWgcQyypdqSNBA.woff2') format('woff2');
    font-weight: 400 900;
    font-style: normal;
    font-display: swap;
  }
  * { font-family: 'Qatar2022Font', 'Cairo', 'Tajawal', 'Segoe UI', Arial, sans-serif !important; }
`;

// ═══════════════════════════════════════════════════════════════════════════
// AGENCY PORTAL — بوابة الوكالة المستقلة | Portail Agence Indépendant
// DriveRENT — منصة تأجير السيارات الجزائرية
// ═══════════════════════════════════════════════════════════════════════════

const Ic = {
  Home:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Car:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg>,
  Rings:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg>,
  Map:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  Msg:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Send:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Search:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  ChevD:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Back:()=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Shield:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Check:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Bolt:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Refresh:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
  Pin:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Cal:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Users:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Phone:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.82 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.08-1.08a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  Star:(f)=><svg width="13" height="13" viewBox="0 0 24 24" fill={f?"#F59E0B":"none"} stroke="#F59E0B" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Info:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Menu:()=><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Van:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="9" width="22" height="11" rx="1"/><path d="M1 12h22M9 9V5a2 2 0 012-2h4a2 2 0 012 2v4"/><circle cx="6" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>,
  Sun:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  Globe:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Plus:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Truck:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Tag:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Bell:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  FourX4:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="10" width="22" height="10" rx="2"/><path d="M5 10V6a2 2 0 012-2h6l4 4v4"/><path d="M15 6h0"/><circle cx="6" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><line x1="9" y1="4" x2="9" y2="10"/></svg>,
};

const ALL_WILAYAS = [
  {c:"01",ar:"أدرار",fr:"Adrar"},{c:"02",ar:"الشلف",fr:"Chlef"},
  {c:"03",ar:"الأغواط",fr:"Laghouat"},{c:"04",ar:"أم البواقي",fr:"Oum El Bouaghi"},
  {c:"05",ar:"باتنة",fr:"Batna"},{c:"06",ar:"بجاية",fr:"Béjaïa"},
  {c:"07",ar:"بسكرة",fr:"Biskra"},{c:"08",ar:"بشار",fr:"Béchar"},
  {c:"09",ar:"البليدة",fr:"Blida"},{c:"10",ar:"البويرة",fr:"Bouira"},
  {c:"11",ar:"تمنراست",fr:"Tamanrasset"},{c:"12",ar:"تبسة",fr:"Tébessa"},
  {c:"13",ar:"تلمسان",fr:"Tlemcen"},{c:"14",ar:"تيارت",fr:"Tiaret"},
  {c:"15",ar:"تيزي وزو",fr:"Tizi Ouzou"},{c:"16",ar:"الجزائر",fr:"Alger"},
  {c:"17",ar:"الجلفة",fr:"Djelfa"},{c:"18",ar:"جيجل",fr:"Jijel"},
  {c:"19",ar:"سطيف",fr:"Sétif"},{c:"20",ar:"سعيدة",fr:"Saïda"},
  {c:"21",ar:"سكيكدة",fr:"Skikda"},{c:"22",ar:"سيدي بلعباس",fr:"Sidi Bel Abbès"},
  {c:"23",ar:"عنابة",fr:"Annaba"},{c:"24",ar:"قالمة",fr:"Guelma"},
  {c:"25",ar:"قسنطينة",fr:"Constantine"},{c:"26",ar:"المدية",fr:"Médéa"},
  {c:"27",ar:"مستغانم",fr:"Mostaganem"},{c:"28",ar:"المسيلة",fr:"M'Sila"},
  {c:"29",ar:"معسكر",fr:"Mascara"},{c:"30",ar:"ورقلة",fr:"Ouargla"},
  {c:"31",ar:"وهران",fr:"Oran"},{c:"32",ar:"البيض",fr:"El Bayadh"},
  {c:"33",ar:"إليزي",fr:"Illizi"},{c:"34",ar:"برج بوعريريج",fr:"Bordj Bou Arréridj"},
  {c:"35",ar:"بومرداس",fr:"Boumerdès"},{c:"36",ar:"الطارف",fr:"El Tarf"},
  {c:"37",ar:"تندوف",fr:"Tindouf"},{c:"38",ar:"تيسمسيلت",fr:"Tissemsilt"},
  {c:"39",ar:"الوادي",fr:"El Oued"},{c:"40",ar:"خنشلة",fr:"Khenchela"},
  {c:"41",ar:"سوق أهراس",fr:"Souk Ahras"},{c:"42",ar:"تيبازة",fr:"Tipaza"},
  {c:"43",ar:"ميلة",fr:"Mila"},{c:"44",ar:"عين الدفلى",fr:"Aïn Defla"},
  {c:"45",ar:"النعامة",fr:"Naâma"},{c:"46",ar:"عين تموشنت",fr:"Aïn Témouchent"},
  {c:"47",ar:"غرداية",fr:"Ghardaïa"},{c:"48",ar:"غليزان",fr:"Relizane"},
  {c:"49",ar:"تيميمون",fr:"Timimoun"},{c:"50",ar:"برج باجي مختار",fr:"Bordj Badji Mokhtar"},
  {c:"51",ar:"أولاد جلال",fr:"Ouled Djellal"},{c:"52",ar:"بني عباس",fr:"Béni Abbès"},
  {c:"53",ar:"إن صالح",fr:"In Salah"},{c:"54",ar:"إن ڤزام",fr:"In Guezzam"},
  {c:"55",ar:"توقرت",fr:"Touggourt"},{c:"56",ar:"جانت",fr:"Djanet"},
  {c:"57",ar:"المغير",fr:"El M'Ghair"},{c:"58",ar:"المنيعة",fr:"El Menia"},
];

const REGIONS = {};

const AgencyLogo = ({agency, size=40, style={}}) => {
  const colors = [
    {bg:"#7C3AED",accent:"#A855F7"}, // purple
    {bg:"#0F766E",accent:"#14B8A6"}, // teal
    {bg:"#1D4ED8",accent:"#3B82F6"}, // blue
    {bg:"#B45309",accent:"#F59E0B"}, // amber
    {bg:"#065F46",accent:"#10B981"}, // emerald
    {bg:"#9D174D",accent:"#EC4899"}, // pink
  ];
  const c = colors[(agency.id-1) % colors.length];
  const initials = agency.initials || (agency.ar ? agency.ar.slice(0,2) : agency.fr.slice(0,2));
  return (
    <div style={{
      width:size, height:size, borderRadius: size*0.25,
      background:`linear-gradient(135deg,${c.bg},${c.accent})`,
      display:"flex", alignItems:"center", justifyContent:"center",
      flexShrink:0, position:"relative", overflow:"hidden",
      boxShadow:`0 4px 14px ${c.bg}55`,
      ...style
    }}>
      {/* Car icon watermark */}
      <svg width={size*0.55} height={size*0.55} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position:"absolute",bottom:-2,right:-2}}>
        <rect x="1" y="11" width="22" height="9" rx="2"/><path d="M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
      </svg>
      <span style={{fontSize:size*0.32, fontWeight:900, color:"#fff", letterSpacing:"-0.5px", position:"relative", zIndex:1, fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>{initials}</span>
    </div>
  );
};

const AGENCIES = [];

const INIT_CONVS = [];

// ── Agency Accounts (approved logins) ─────────────────────────────────────
// In production these would be stored securely server-side
const AGENCY_ACCOUNTS = [];

// ── Bookings initial data ──────────────────────────────────────────────────
const INIT_BOOKINGS = [];


const Stars = ({r})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:2}}>
    {[1,2,3,4,5].map(i=><span key={i}>{Ic.Star(i<=Math.round(r))}</span>)}
    <span style={{color:"#94a3b8",fontSize:12,marginRight:3}}>{r}</span>
  </span>
);
const Chip = ({icon,label,c="#86EFAC",bg="rgba(134,239,172,.09)",br="rgba(134,239,172,.25)"})=>(
  <span style={{display:"inline-flex",alignItems:"center",gap:4,background:bg,border:`1px solid ${br}`,color:c,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{icon}{label}</span>
);
const BtnGlow = ({onClick,style,children})=>(
  <button onClick={onClick} style={{transition:"all .25s",cursor:"pointer",...style}}
    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.03)";e.currentTarget.style.filter="brightness(1.15)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.filter="none";}}>
    {children}
  </button>
);
const allWilayas = ALL_WILAYAS;

// ────────────────────────────────────────────────────────────────────────────
// AGENCY PORTAL — لوحة تحكم الوكالة المستقلة (حجوزات + رسائل)
// ────────────────────────────────────────────────────────────────────────────
function AgencyPortal({lang,agency,bookings,setBookings,convs,setConvs,userCars,setUserCars,allWilayas,onLogout}){
  const [tab,setTab]=useState("overview");
  const [activeConv,setActiveConv]=useState(convs[0]?.id||null);
  const [replyIn,setReplyIn]=useState("");
  const [notif,setNotif]=useState(null);
  const rtl=lang==="ar";

  // ── Real-time chat state ──
  const [agencyTyping,setAgencyTyping]=useState(false);
  const [typingTimer,setTypingTimer]=useState(null);
  const [attachPreview,setAttachPreview]=useState(null);
  const [showAttachMenu,setShowAttachMenu]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [msgSearch,setMsgSearch]=useState("");
  const [toastNotifs,setToastNotifs]=useState([]);
  const chatEndRef=useRef(null);
  const fileInputRef=useRef(null);
  const imgInputRef=useRef(null);
  const onlineClients={1:true,2:false,3:true,4:true,5:false,6:true};

  useEffect(()=>{ chatEndRef.current?.scrollIntoView({behavior:"smooth"}); },[convs,activeConv]);

  // simulate incoming message every ~20s
  useEffect(()=>{
    const REPLIES={ar:["شكراً على ردك السريع! 🙏","هل يمكنني رؤية صور السيارة؟","ما هي الأسعار للأسبوع القادم؟","هل السيارة متاحة يوم الجمعة؟","ممتاز! سأؤكد الحجز اليوم 👍"],fr:["Merci pour votre réponse! 🙏","Puis-je voir des photos?","Quels prix pour la semaine prochaine?","Disponible vendredi?","Parfait! Je confirme 👍"],en:["Thanks for the quick reply! 🙏","Can I see car photos?","Prices for next week?","Available Friday?","Great! Confirming today 👍"]};
    const t=setInterval(()=>{
      setConvs(prev=>{
        if(!prev.length) return prev;
        const idx=Math.floor(Math.random()*prev.length);
        const conv=prev[idx];
        const reps=REPLIES[lang]||REPLIES.ar;
        const txt=reps[Math.floor(Math.random()*reps.length)];
        const nid=Date.now();
        setToastNotifs(p=>[...p,{id:nid,text:txt,convId:conv.id}]);
        setTimeout(()=>setToastNotifs(p=>p.filter(n=>n.id!==nid)),4500);
        return prev.map((c,i)=>i===idx?{...c,msgs:[...c.msgs,{id:nid,from:"user",text:txt,time:new Date().toLocaleTimeString("fr-DZ",{hour:"2-digit",minute:"2-digit"}),status:"delivered"}]}:c);
      });
    },20000);
    return ()=>clearInterval(t);
  },[lang]);

  const handleReplyChange=e=>{
    setReplyIn(e.target.value);
    setAgencyTyping(true);
    if(typingTimer) clearTimeout(typingTimer);
    const t=setTimeout(()=>setAgencyTyping(false),1500);
    setTypingTimer(t);
  };

  const handleFileAttach=e=>{
    const file=e.target.files?.[0]; if(!file) return;
    const isImg=file.type.startsWith("image/");
    const reader=new FileReader();
    reader.onload=ev=>setAttachPreview({type:isImg?"image":"doc",name:file.name,url:ev.target.result,size:(file.size/1024).toFixed(1)+"KB"});
    reader.readAsDataURL(file);
    setShowAttachMenu(false);
  };

  // ── Settings state ──
  const [settingsTab,setSettingsTab]=useState("profile"); // profile | security | contact | agency
  const [agencyProfile,setAgencyProfile]=useState({
    displayName:lang==="ar"?agency.ar:agency.fr,
    username:"",
    logoPreview:null,
    phone:agency.phone||"",
    email:"",
    nameAr:agency.ar||"",
    nameFr:agency.fr||"",
    wilaya:agency.wilaya||"",
    address:"",
    description:(agency.about&&agency.about[lang])||"",
    whatsapp:"",
    website:"",
    workingHours:"",
    experience:agency.exp||1,
  });
  const [passForm,setPassForm]=useState({current:"",newPass:"",confirm:""});
  const [showPassCurrent,setShowPassCurrent]=useState(false);
  const [showPassNew,setShowPassNew]=useState(false);
  const [passErr,setPassErr]=useState("");
  const [settingsDirty,setSettingsDirty]=useState(false);
  const setAP=k=>e=>{setAgencyProfile(p=>({...p,[k]:e.target.value}));setSettingsDirty(true);};
  const setPF=k=>e=>setPassForm(p=>({...p,[k]:e.target.value}));

  const handleLogoUpload=e=>{
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>{setAgencyProfile(p=>({...p,logoPreview:ev.target.result}));setSettingsDirty(true);};
    reader.readAsDataURL(file);
  };

  const saveProfile=()=>{
    showNotif(l.sSaved||"✅ تم الحفظ!");
    setSettingsDirty(false);
  };

  const changePassword=()=>{
    setPassErr("");
    if(!passForm.newPass||passForm.newPass.length<6){setPassErr(l.sPassWeak);return;}
    if(passForm.newPass!==passForm.confirm){setPassErr(l.sPassMismatch);return;}
    setPassForm({current:"",newPass:"",confirm:""});
    showNotif(l.sPassChanged||"✅ تم تغيير كلمة المرور!");
  };

  // ── Car form state ──
  const EMPTY_CAR_FORM={name:"",fuel:"petrol",type:"sedan",price:"",year:new Date().getFullYear(),seats:5,transmission:"manual",imgPreview:null,imgFile:null,color:"",description:"",available:true};
  const [showCarForm,setShowCarForm]=useState(false);
  const [carForm,setCarForm]=useState(EMPTY_CAR_FORM);
  const [editingCar,setEditingCar]=useState(null);
  const [dragOver,setDragOver]=useState(false);
  const setF=k=>e=>setCarForm(f=>({...f,[k]:e.target.value}));

  const FUELS=[
    {k:"petrol",   ar:"بنزين",      fr:"Essence",    en:"Petrol",   icon:"⛽"},
    {k:"diesel",   ar:"ديزل",       fr:"Diesel",     en:"Diesel",   icon:"🛢️"},
    {k:"electric", ar:"كهربائي",    fr:"Électrique", en:"Electric", icon:"⚡"},
    {k:"hybrid",   ar:"هجين",       fr:"Hybride",    en:"Hybrid",   icon:"🔋"},
    {k:"lpg",      ar:"غاز",        fr:"GPL",        en:"LPG",      icon:"💨"},
  ];
  const CAR_TYPES_P=[
    {k:"sedan",      ar:"سيدان",    fr:"Berline",    en:"Sedan"},
    {k:"suv",        ar:"SUV",      fr:"SUV",        en:"SUV"},
    {k:"4x4",        ar:"4×4",      fr:"4×4",        en:"4×4"},
    {k:"luxury",     ar:"فاخرة",   fr:"Luxe",       en:"Luxury"},
    {k:"van",        ar:"فان",      fr:"Van",        en:"Van"},
    {k:"electric",   ar:"كهربائية",fr:"Électrique", en:"Electric"},
    {k:"wedding",    ar:"زفاف",    fr:"Mariage",    en:"Wedding"},
  ];

  const handleCarImg=file=>{
    if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>setCarForm(f=>({...f,imgPreview:ev.target.result,imgFile:file}));
    reader.readAsDataURL(file);
  };

  const submitCar=()=>{
    if(!carForm.name.trim()) return;
    const typeObj=CAR_TYPES_P.find(t=>t.k===carForm.type);
    const newCar={
      id:editingCar?editingCar.id:Date.now(),
      agencyId:agency.id,
      name:carForm.name.trim(),
      fuel:carForm.fuel,
      type:carForm.type,
      badge:typeObj?typeObj.ar:carForm.type,
      price:+carForm.price||0,
      year:+carForm.year||new Date().getFullYear(),
      seats:+carForm.seats||5,
      transmission:carForm.transmission,
      color:carForm.color||"",
      description:carForm.description||"",
      available: carForm.available !== false,
      img:carForm.imgPreview||"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
      wilaya:agency.wilaya||"16",
      rating:0,trips:0,reviews:0,tags:[],wedding:carForm.type==="wedding",
    };
    if(editingCar){
      setUserCars(p=>p.map(c=>c.id===editingCar.id?newCar:c));
      showNotif(l.carUpdated);
    } else {
      setUserCars(p=>[...p,newCar]);
      showNotif(l.carAdded);
    }
    setCarForm(EMPTY_CAR_FORM);setEditingCar(null);setShowCarForm(false);
  };

  const startEditCar=car=>{
    setCarForm({name:car.name,fuel:car.fuel||"petrol",type:car.type||"sedan",price:String(car.price||""),year:String(car.year||new Date().getFullYear()),seats:String(car.seats||5),transmission:car.transmission||"manual",imgPreview:car.img||null,imgFile:null,color:car.color||"",description:car.description||"",available:car.available!==false});
    setEditingCar(car);setShowCarForm(true);
  };

  const deleteCar=id=>{
    setUserCars(p=>p.filter(c=>c.id!==id));
    showNotif(l.carDeleted);
  };

  const toggleAvailability=id=>{
    setUserCars(p=>p.map(c=>c.id===id?{...c,available:c.available===false}:c));
    const car=userCars.find(c=>c.id===id);
    const nowAvailable=car?.available===false;
    showNotif(nowAvailable
      ? (lang==="ar"?"✅ السيارة متاحة الآن":lang==="fr"?"✅ Véhicule maintenant disponible":"✅ Car is now available")
      : (lang==="ar"?"🔴 السيارة غير متاحة الآن":lang==="fr"?"🔴 Véhicule maintenant indisponible":"🔴 Car is now unavailable")
    );
  };

  const IS={width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:11,color:"#fff",padding:"11px 14px",fontSize:14,fontFamily:"inherit"};

  const L={
    ar:{portal:"بوابة الوكالة",overview:"نظرة عامة",bookings:"طلبات الحجز",messages:"الرسائل",cars:"سياراتي",settings:"الإعدادات",
      myProfile:"بياناتي الشخصية",
      logout:"تسجيل خروج",welcome:"مرحباً",
      pending:"قيد الانتظار",confirmed:"مؤكد",cancelled:"ملغى",
      confirm:"قبول",cancel:"رفض",
      client:"العميل",phone:"الهاتف",car:"السيارة",dates:"التواريخ",days:"أيام",total:"المجموع",status:"الحالة",actions:"الإجراءات",
      noBookings:"لا توجد طلبات حجز حتى الآن",noMessages:"لا توجد رسائل",
      reply:"رد...",send:"إرسال",
      totalBookings:"إجمالي الطلبات",confirmed2:"المؤكدة",revenue:"الإيرادات",rating:"التقييم",
      newBooking:"طلب حجز جديد",newMsg:"رسالة جديدة",
      addCar:"إضافة سيارة",editCar:"تعديل",deleteCar:"حذف",
      carName:"اسم السيارة",carNamePh:"مثال: Toyota Corolla",
      fuelType:"نوع الوقود",price:"السعر / يوم (دج)",pricePh:"5000",
      carType:"نوع السيارة",year:"سنة الصنع",seats:"المقاعد",
      carPhoto:"صورة السيارة",dragPhoto:"اسحب الصورة هنا أو انقر للاختيار",
      photoHint:"PNG, JPG — حجم أقصى 5MB",
      submitCar:"حفظ السيارة",updateCar:"تحديث السيارة",cancelForm:"إلغاء",
      carAdded:"✅ تمت إضافة السيارة بنجاح!",carUpdated:"✅ تم تحديث السيارة!",carDeleted:"🗑️ تم حذف السيارة",
      noCars:"لا توجد سيارات مضافة بعد",addFirst:"أضف سيارتك الأولى الآن",
      transmission:"ناقل الحركة",manual:"يدوي",auto:"أوتوماتيك",
      optional:"اختياري",
      carColor:"لون السيارة",carColorPh:"مثال: أبيض، أسود، أحمر...",
      carDesc:"وصف السيارة",carDescPh:"وصف مختصر عن السيارة، مميزاتها وحالتها...",
      availability:"التوفر",available:"متاح",unavailable:"غير متاح",
      toggleAvailable:"تعيين كمتاح",toggleUnavailable:"تعيين كغير متاح",
      // settings
      settingsTitle:"إعدادات الحساب",settingsSub:"إدارة معلومات وكالتك وبيانات الدخول",
      sProfileTab:"الملف الشخصي",sSecurityTab:"الأمان",sContactTab:"معلومات التواصل",
      sLogoLabel:"شعار الوكالة",sLogoHint:"انقر لتغيير الصورة الشخصية",sLogoSub:"PNG أو JPG · أقصى حجم 5MB",
      sDisplayName:"اسم العرض",sDisplayNamePh:"اسم الوكالة كما يظهر للعملاء",
      sUsername:"اسم المستخدم",sUsernamePh:"اسم الدخول إلى اللوحة",
      sCurrentPass:"كلمة المرور الحالية",sNewPass:"كلمة المرور الجديدة",sConfirmPass:"تأكيد كلمة المرور الجديدة",
      sPhone:"رقم الهاتف",sPhonePh:"0555 xx xx xx",
      sEmail:"البريد الإلكتروني",sEmailPh:"exemple@email.com",
      sSave:"حفظ التغييرات",sSaved:"✅ تم الحفظ بنجاح!",sCancel:"إلغاء",
      sPassMismatch:"كلمتا المرور غير متطابقتين",sPassWeak:"كلمة المرور قصيرة جداً (6 أحرف على الأقل)",
      sPassChanged:"✅ تم تغيير كلمة المرور بنجاح!",
      sAgencyTab:"بيانات الوكالة",
      sNameAr:"اسم الوكالة (عربي)",sNameArPh:"مثال: وكالة النور",
      sNameFr:"اسم الوكالة (فرنسي)",sNameFrPh:"Ex: Agence El Nour",
      sWilaya:"الولاية",sAddress:"العنوان التفصيلي",sAddressPh:"الحي، الشارع، المدينة",
      sDescription:"وصف الوكالة",sDescriptionPh:"اكتب نبذة مختصرة عن وكالتك، خدماتها ومزاياها...",
      sWhatsapp:"واتساب",sWhatsappPh:"0555 xx xx xx",
      sWebsite:"الموقع الإلكتروني",sWebsitePh:"https://monagence.dz",
      sWorkingHours:"ساعات العمل",sWorkingHoursPh:"يومياً 8ص–8م",
      sExperience:"سنوات الخبرة",
      sAgencySaved:"✅ تم حفظ بيانات الوكالة!",
      sVerifiedBadge:"وكالة معتمدة ✓",sNotVerified:"قيد المراجعة",
    },
    fr:{portal:"Portail Agence",overview:"Vue d'ensemble",bookings:"Réservations",messages:"Messages",cars:"Mes voitures",settings:"Paramètres",
      myProfile:"Mon Profil",
      logout:"Déconnexion",welcome:"Bienvenue",
      pending:"En attente",confirmed:"Confirmé",cancelled:"Annulé",
      confirm:"Accepter",cancel:"Refuser",
      client:"Client",phone:"Téléphone",car:"Véhicule",dates:"Dates",days:"jours",total:"Total",status:"Statut",actions:"Actions",
      noBookings:"Aucune réservation pour l'instant",noMessages:"Aucun message",
      reply:"Répondre...",send:"Envoyer",
      totalBookings:"Total réservations",confirmed2:"Confirmées",revenue:"Revenus",rating:"Note",
      newBooking:"Nouvelle réservation",newMsg:"Nouveau message",
      addCar:"Ajouter un véhicule",editCar:"Modifier",deleteCar:"Supprimer",
      carName:"Nom du véhicule",carNamePh:"Ex: Toyota Corolla",
      fuelType:"Type de carburant",price:"Prix / jour (DA)",pricePh:"5000",
      carType:"Type de véhicule",year:"Année",seats:"Places",
      carPhoto:"Photo du véhicule",dragPhoto:"Glissez la photo ici ou cliquez pour choisir",
      photoHint:"PNG, JPG — taille max 5MB",
      submitCar:"Enregistrer",updateCar:"Mettre à jour",cancelForm:"Annuler",
      carAdded:"✅ Véhicule ajouté avec succès!",carUpdated:"✅ Véhicule mis à jour!",carDeleted:"🗑️ Véhicule supprimé",
      noCars:"Aucun véhicule ajouté",addFirst:"Ajoutez votre premier véhicule",
      transmission:"Transmission",manual:"Manuelle",auto:"Automatique",
      optional:"optionnel",
      carColor:"Couleur du véhicule",carColorPh:"Ex: Blanc, Noir, Rouge...",
      carDesc:"Description du véhicule",carDescPh:"Description courte, caractéristiques et état...",
      availability:"Disponibilité",available:"Disponible",unavailable:"Indisponible",
      toggleAvailable:"Marquer disponible",toggleUnavailable:"Marquer indisponible",
      sProfileTab:"Profil",sSecurityTab:"Sécurité",sContactTab:"Contact",
      sLogoLabel:"Logo de l'agence",sLogoHint:"Cliquez pour changer la photo",sLogoSub:"PNG ou JPG · max 5MB",
      sDisplayName:"Nom d'affichage",sDisplayNamePh:"Nom affiché aux clients",
      sUsername:"Nom d'utilisateur",sUsernamePh:"Identifiant de connexion",
      sCurrentPass:"Mot de passe actuel",sNewPass:"Nouveau mot de passe",sConfirmPass:"Confirmer le nouveau mot de passe",
      sPhone:"Téléphone",sPhonePh:"0555 xx xx xx",
      sEmail:"Email",sEmailPh:"exemple@email.com",
      sSave:"Enregistrer",sSaved:"✅ Enregistré avec succès!",sCancel:"Annuler",
      sPassMismatch:"Les mots de passe ne correspondent pas",sPassWeak:"Mot de passe trop court (6 caractères min.)",
      sPassChanged:"✅ Mot de passe changé avec succès!",
      sAgencyTab:"Données agence",
      sNameAr:"Nom de l'agence (arabe)",sNameArPh:"Ex: وكالة النور",
      sNameFr:"Nom de l'agence (français)",sNameFrPh:"Ex: Agence El Nour",
      sWilaya:"Wilaya",sAddress:"Adresse détaillée",sAddressPh:"Quartier, rue, ville",
      sDescription:"Description de l'agence",sDescriptionPh:"Décrivez votre agence, services et atouts...",
      sWhatsapp:"WhatsApp",sWhatsappPh:"0555 xx xx xx",
      sWebsite:"Site web",sWebsitePh:"https://monagence.dz",
      sWorkingHours:"Horaires",sWorkingHoursPh:"Lun-Sam 8h-20h",
      sExperience:"Années d'expérience",
      sAgencySaved:"✅ Données enregistrées!",
      sVerifiedBadge:"Agence vérifiée ✓",sNotVerified:"En cours de vérification",
    },
    en:{portal:"Agency Portal",overview:"Overview",bookings:"Bookings",messages:"Messages",cars:"My Cars",settings:"Settings",
      myProfile:"My Profile",
      logout:"Sign Out",welcome:"Welcome",
      pending:"Pending",confirmed:"Confirmed",cancelled:"Cancelled",
      confirm:"Accept",cancel:"Reject",
      client:"Client",phone:"Phone",car:"Car",dates:"Dates",days:"days",total:"Total",status:"Status",actions:"Actions",
      noBookings:"No bookings yet",noMessages:"No messages yet",
      reply:"Reply...",send:"Send",
      totalBookings:"Total Bookings",confirmed2:"Confirmed",revenue:"Revenue",rating:"Rating",
      newBooking:"New Booking",newMsg:"New Message",
      addCar:"Add Car",editCar:"Edit",deleteCar:"Delete",
      carName:"Car Name",carNamePh:"e.g. Toyota Corolla",
      fuelType:"Fuel Type",price:"Price / day (DZD)",pricePh:"5000",
      carType:"Car Type",year:"Year",seats:"Seats",
      carPhoto:"Car Photo",dragPhoto:"Drag photo here or click to select",
      photoHint:"PNG, JPG — max 5MB",
      submitCar:"Save Car",updateCar:"Update Car",cancelForm:"Cancel",
      carAdded:"✅ Car added successfully!",carUpdated:"✅ Car updated!",carDeleted:"🗑️ Car deleted",
      noCars:"No cars added yet",addFirst:"Add your first car now",
      transmission:"Transmission",manual:"Manual",auto:"Automatic",
      optional:"optional",
      carColor:"Car Color",carColorPh:"e.g. White, Black, Red...",
      carDesc:"Car Description",carDescPh:"Brief description, features and condition...",
      availability:"Availability",available:"Available",unavailable:"Unavailable",
      toggleAvailable:"Mark as Available",toggleUnavailable:"Mark as Unavailable",
      sProfileTab:"Profile",sSecurityTab:"Security",sContactTab:"Contact",
      sLogoLabel:"Agency Logo",sLogoHint:"Click to change profile picture",sLogoSub:"PNG or JPG · max 5MB",
      sDisplayName:"Display Name",sDisplayNamePh:"Name shown to clients",
      sUsername:"Username",sUsernamePh:"Login identifier",
      sCurrentPass:"Current Password",sNewPass:"New Password",sConfirmPass:"Confirm New Password",
      sPhone:"Phone Number",sPhonePh:"0555 xx xx xx",
      sEmail:"Email Address",sEmailPh:"example@email.com",
      sSave:"Save Changes",sSaved:"✅ Saved successfully!",sCancel:"Cancel",
      sPassMismatch:"Passwords do not match",sPassWeak:"Password too short (6 chars min.)",
      sPassChanged:"✅ Password changed successfully!",
      sAgencyTab:"Agency Data",
      sNameAr:"Agency Name (Arabic)",sNameArPh:"Ex: وكالة النور",
      sNameFr:"Agency Name (French)",sNameFrPh:"Ex: Agence El Nour",
      sWilaya:"Wilaya",sAddress:"Detailed Address",sAddressPh:"District, street, city",
      sDescription:"Agency Description",sDescriptionPh:"Describe your agency, services and strengths...",
      sWhatsapp:"WhatsApp",sWhatsappPh:"0555 xx xx xx",
      sWebsite:"Website",sWebsitePh:"https://myagency.dz",
      sWorkingHours:"Working Hours",sWorkingHoursPh:"Daily 8am–8pm",
      sExperience:"Years of Experience",
      sAgencySaved:"✅ Agency data saved!",
      sVerifiedBadge:"Verified Agency ✓",sNotVerified:"Under review",
    },
  };
  const l=L[lang]||L.ar;

  const pendingCount=bookings.filter(b=>b.status==="pending").length;
  const newMsgCount=convs.reduce((s,c)=>s+(c.msgs.filter(m=>m.from==="user"&&!m.read).length),0);

  // ── Subscription state (simulated from admin data) ──
  const [subData] = useState(()=>({
    plan: agency.plan || "standard",
    monthlyPrice: agency.monthlyPrice || 5000,
    subscriptionStart: agency.subscriptionStart || "2025-03-01",
    subscriptionEnd: agency.subscriptionEnd || "2025-09-01",
    subscriptionMonths: agency.subscriptionMonths || 6,
  }));
  const [renewalSent,setRenewalSent] = useState(agency.renewalRequest||false);
  const [renewalMonths,setRenewalMonths] = useState(subData.subscriptionMonths||1);
  const [renewalNote,setRenewalNote] = useState("");
  const [showRenewForm,setShowRenewForm] = useState(false);
  const [changePlanReq,setChangePlanReq] = useState(false);
  const [requestedPlan,setRequestedPlan] = useState(subData.plan);

  const subDaysLeft = (end) => {
    if(!end) return 0;
    return Math.max(0, Math.ceil((new Date(end)-new Date())/(1000*60*60*24)));
  };
  const subTotal = (start,end) => {
    if(!start||!end) return 30;
    return Math.max(1, Math.ceil((new Date(end)-new Date(start))/(1000*60*60*24)));
  };
  const d = subDaysLeft(subData.subscriptionEnd);
  const total = subTotal(subData.subscriptionStart, subData.subscriptionEnd);
  const pct = subData.subscriptionEnd ? Math.max(0,Math.min(1,d/total)) : 0;
  const subExpired = d===0 && subData.subscriptionEnd;
  const subCritical = d<=3 && d>0;
  const subWarning = d<=7 && d>3;
  const subColor = subExpired||subCritical?"#EF4444":subWarning?"#F59E0B":"#10B981";

  const PLAN_INFO = {
    basic:{label:lang==="ar"?"أساسية":lang==="fr"?"Basique":"Basic",icon:"🔵",color:"#3B82F6",features:{ar:["5 سيارات","دعم عادي","ظهور عادي","بدون تمييز"],fr:["5 voitures","Support standard","Visibilité normale","Sans distinction"],en:["5 cars","Standard support","Normal visibility","No featured listing"]}},
    standard:{label:lang==="ar"?"قياسية":lang==="fr"?"Standard":"Standard",icon:"🟣",color:"#7C3AED",features:{ar:["15 سيارة","دعم أولوية","ظهور متقدم","إمكانية التمييز"],fr:["15 voitures","Support prioritaire","Visibilité avancée","Mise en avant possible"],en:["15 cars","Priority support","Advanced visibility","Featured listing possible"]}},
    premium:{label:lang==="ar"?"مميزة":lang==="fr"?"Premium":"Premium",icon:"⭐",color:"#F59E0B",features:{ar:["سيارات غير محدودة","دعم 24/7","تمييز تلقائي","شريط السلايدر"],fr:["Voitures illimitées","Support 24/7","Mise en avant auto","Slider premium"],en:["Unlimited cars","24/7 support","Auto featured","Premium slider"]}},
  };

  const sendRenewalRequest = () => {
    setRenewalSent(true);
    setShowRenewForm(false);
    showNotif(lang==="ar"?"✅ تم إرسال طلب التجديد بنجاح! سيراجعه الإدارة قريباً":"✅ Renewal request sent!");
  };

  const sendPlanChangeRequest = () => {
    setChangePlanReq(true);
    showNotif(lang==="ar"?"✅ تم إرسال طلب تعديل الباقة! سيراجعه الإدارة قريباً":"✅ Plan change request sent!");
  };

  const confirmBooking=id=>{
    setBookings(p=>p.map(b=>b.id===id?{...b,status:"confirmed"}:b));
    showNotif(lang==="ar"?"✅ تم قبول الحجز":lang==="fr"?"✅ Réservation confirmée":"✅ Booking confirmed");
  };
  const cancelBooking=id=>{
    setBookings(p=>p.map(b=>b.id===id?{...b,status:"cancelled"}:b));
    showNotif(lang==="ar"?"❌ تم رفض الحجز":lang==="fr"?"❌ Réservation refusée":"❌ Booking rejected");
  };
  const showNotif=msg=>{setNotif(msg);setTimeout(()=>setNotif(null),3000);};

  const sendReply=()=>{
    if(!replyIn.trim()&&!attachPreview) return;
    if(!activeConv) return;
    const txt=replyIn; setReplyIn("");
    const attach=attachPreview; setAttachPreview(null);
    setAgencyTyping(false);
    const newMsg={id:Date.now(),from:"agency",text:txt,time:new Date().toLocaleTimeString("fr-DZ",{hour:"2-digit",minute:"2-digit"}),read:true,status:"sent",...(attach?{attach}:{})};
    setConvs(p=>p.map(c=>c.id===activeConv?{...c,msgs:[...c.msgs,newMsg]}:c));
    const mid=newMsg.id;
    setTimeout(()=>setConvs(p=>p.map(c=>c.id===activeConv?{...c,msgs:c.msgs.map(m=>m.id===mid?{...m,status:"delivered"}:m)}:c)),800);
  };

  const activeConvObj=convs.find(c=>c.id===activeConv);

  const SIDEBAR_TABS=[
    {k:"overview",icon:"📊",label:l.overview},
    {k:"bookings",icon:"📋",label:l.bookings,badge:pendingCount},
    {k:"messages",icon:"💬",label:l.messages,badge:newMsgCount},
    {k:"cars",icon:"🚗",label:l.cars},
    {k:"subscription",icon:"💳",label:lang==="ar"?"اشتراكي":lang==="fr"?"Mon Abonnement":"My Subscription", badge:(subExpired||subCritical)?1:0},
    {k:"myprofile",icon:"👤",label:l.myProfile},
  ];

  return(
    <div style={{fontFamily:rtl?"'Qatar2022Font','Cairo','Tajawal',sans-serif":"'Qatar2022Font','Outfit',sans-serif",direction:rtl?"rtl":"ltr",background:"#06060F",color:"#F1F5F9",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Outfit:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#7C3AED;border-radius:2px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(${rtl?"-":"+"}20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes notifIn{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
        @keyframes typing1{0%,100%{transform:translateY(0);opacity:.4}33%{transform:translateY(-5px);opacity:1}}
        @keyframes typing2{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-5px);opacity:1}}
        @keyframes typing3{0%,100%{transform:translateY(0);opacity:.4}66%{transform:translateY(-5px);opacity:1}}
        input:focus,textarea:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
        select{background:#0D0D1E!important;color:#F1F5F9!important;-webkit-appearance:none;appearance:none;} select option{background:#0D0D1E!important;color:#F1F5F9!important;} select:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
      `}</style>

      {/* Notification toast */}
      {notif&&<div style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:"rgba(52,211,153,.15)",border:"1px solid rgba(52,211,153,.4)",borderRadius:12,padding:"10px 22px",fontSize:14,fontWeight:700,color:"#34D399",animation:"notifIn .35s ease both",backdropFilter:"blur(12px)"}}>{notif}</div>}

      {/* ── TOP BAR ── */}
      <div style={{background:"rgba(10,10,20,.95)",backdropFilter:"blur(18px)",borderBottom:"1px solid rgba(255,255,255,.06)",padding:"0 24px",height:62,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:38,height:38,borderRadius:12,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏢</div>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:"#fff",lineHeight:1}}>{l.portal}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{lang==="ar"?agency.ar:agency.fr}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {agencyProfile.logoPreview
            ? <img src={agencyProfile.logoPreview} alt="" style={{width:34,height:34,borderRadius:9,objectFit:"cover",border:"2px solid rgba(124,58,237,.4)"}}/>
            : <AgencyLogo agency={agency} size={34}/>}
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)",display:"none"}} className="dko">{agencyProfile.displayName||lang==="ar"?agency.ar:agency.fr}</div>
          <button onClick={onLogout} style={{display:"flex",alignItems:"center",gap:6,background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",color:"#FCA5A5",padding:"7px 13px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>
            🚪 {l.logout}
          </button>
        </div>
      </div>

      <div style={{display:"flex",flex:1,minHeight:0}}>
        {/* ── SIDEBAR ── */}
        <div style={{width:220,background:"rgba(255,255,255,.02)",borderRight:"1px solid rgba(255,255,255,.06)",padding:"18px 12px",display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
          {SIDEBAR_TABS.map(tb=>(
            <button key={tb.k} onClick={()=>setTab(tb.k)} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",borderRadius:11,border:"none",background:tab===tb.k?"rgba(124,58,237,.18)":"transparent",color:tab===tb.k?"#C084FC":"rgba(255,255,255,.45)",cursor:"pointer",fontSize:13,fontWeight:600,textAlign:"start",transition:"all .2s",position:"relative"}}>
              <span style={{fontSize:16}}>{tb.icon}</span>
              {tb.label}
              {tb.badge>0&&<span style={{marginRight:"auto",marginLeft:"auto",background:"#EF4444",color:"#fff",fontSize:10,fontWeight:800,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:6,right:lang==="ar"?"auto":8,left:lang==="ar"?8:"auto"}}>{tb.badge}</span>}
            </button>
          ))}
          {/* Agency info */}
          <div style={{marginTop:"auto",background:"rgba(124,58,237,.07)",border:"1px solid rgba(124,58,237,.15)",borderRadius:12,padding:"13px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              {agencyProfile.logoPreview
                ? <img src={agencyProfile.logoPreview} alt="" style={{width:32,height:32,borderRadius:9,objectFit:"cover"}}/>
                : <AgencyLogo agency={agency} size={32}/>}
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.7)",lineHeight:1.3}}>{agencyProfile.displayName||lang==="ar"?agency.ar:agency.fr}</div>
            </div>
            {agency.verified&&<div style={{fontSize:10,color:"#34D399",fontWeight:700,marginBottom:6}}>✓ {lang==="ar"?"وكالة معتمدة":"Agence approuvée"}</div>}
            {/* Subscription mini indicator */}
            <div onClick={()=>setTab("subscription")} style={{cursor:"pointer",background:"rgba(0,0,0,.2)",borderRadius:8,padding:"7px 10px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:9,color:"rgba(255,255,255,.35)"}}>{(PLAN_INFO[subData.plan]||PLAN_INFO.standard).icon} {(PLAN_INFO[subData.plan]||PLAN_INFO.standard).label}</span>
                <span style={{fontSize:9,fontWeight:700,color:subColor}}>{d}{lang==="ar"?"ي":"d"}</span>
              </div>
              <div style={{height:3,background:"rgba(255,255,255,.08)",borderRadius:99,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct*100}%`,background:subColor,borderRadius:99}}/>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{flex:1,overflowY:"auto",padding:"24px"}}>

          {/* ── OVERVIEW TAB ── */}
          {tab==="overview"&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <h2 style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:6}}>{l.welcome}, {lang==="ar"?agency.ar:agency.fr} 👋</h2>
              <p style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:24}}>{new Date().toLocaleDateString(lang==="ar"?"ar-DZ":lang==="fr"?"fr-FR":"en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>

              {/* KPI cards */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14,marginBottom:28}}>
                {[
                  {icon:"📋",label:l.totalBookings,value:bookings.length,color:"#C084FC",bg:"rgba(124,58,237,.1)"},
                  {icon:"✅",label:l.confirmed2,value:bookings.filter(b=>b.status==="confirmed").length,color:"#34D399",bg:"rgba(52,211,153,.08)"},
                  {icon:"⏳",label:l.pending,value:bookings.filter(b=>b.status==="pending").length,color:"#FBBF24",bg:"rgba(251,191,36,.08)"},
                  {icon:"💰",label:l.revenue,value:bookings.filter(b=>b.status==="confirmed").reduce((s,b)=>s+b.total,0).toLocaleString()+" دج",color:"#60A5FA",bg:"rgba(96,165,250,.08)"},
                  {icon:"🟢",label:l.available,value:userCars.filter(c=>c.available!==false).length,color:"#34D399",bg:"rgba(5,150,105,.08)",onClick:()=>setTab("cars")},
                  {icon:"🔴",label:l.unavailable,value:userCars.filter(c=>c.available===false).length,color:"#F87171",bg:"rgba(239,68,68,.08)",onClick:()=>setTab("cars")},
                ].map((kpi,i)=>(
                  <div key={i} onClick={kpi.onClick} style={{background:kpi.bg,border:`1px solid ${kpi.color}22`,borderRadius:16,padding:"18px 20px",animation:`fadeUp .4s ease ${i*.07}s both`,cursor:kpi.onClick?"pointer":"default",transition:"transform .2s,box-shadow .2s"}}
                    onMouseEnter={e=>{if(kpi.onClick){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 24px ${kpi.color}22`;}}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                    <div style={{fontSize:26,marginBottom:8}}>{kpi.icon}</div>
                    <div style={{fontSize:22,fontWeight:900,color:kpi.color,marginBottom:4}}>{kpi.value}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.38)",fontWeight:600}}>{kpi.label}</div>
                  </div>
                ))}
              </div>

              {/* Subscription mini-card in overview */}
              {(()=>{
                const plan=PLAN_INFO[subData.plan]||PLAN_INFO.standard;
                return (
                  <div onClick={()=>setTab("subscription")} style={{background:`linear-gradient(135deg,${plan.color}12,rgba(255,255,255,.02))`,border:`1px solid ${plan.color}33`,borderRadius:16,padding:"16px 20px",marginBottom:18,cursor:"pointer",transition:"all .2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=plan.color+"66";e.currentTarget.style.transform="translateY(-2px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=plan.color+"33";e.currentTarget.style.transform="none";}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <span style={{fontSize:22}}>{plan.icon}</span>
                        <div>
                          <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:2}}>
                            {lang==="ar"?"باقة الاشتراك الحالية":lang==="fr"?"Abonnement actuel":"Current Plan"}
                          </div>
                          <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>
                            {lang==="ar"?"باقة":lang==="fr"?"Formule":"Plan"} {plan.label}
                            <span style={{fontSize:12,fontWeight:400,color:"rgba(255,255,255,.4)",marginRight:6,marginLeft:6}}>·</span>
                            <span style={{fontSize:12,color:plan.color,fontWeight:700}}>{subData.monthlyPrice.toLocaleString()} {lang==="ar"?"دج/شهر":"DZD/mois"}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:22,fontWeight:900,color:subColor,lineHeight:1}}>{d}</div>
                          <div style={{fontSize:9,color:"rgba(255,255,255,.3)"}}>يوم متبقي</div>
                        </div>
                        <span style={{color:"rgba(255,255,255,.3)",fontSize:14}}>←</span>
                      </div>
                    </div>
                    {/* mini progress */}
                    <div style={{marginTop:12,height:4,background:"rgba(255,255,255,.06)",borderRadius:99,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${pct*100}%`,background:subColor,borderRadius:99,transition:"width .6s"}}/>
                    </div>
                  </div>
                );
              })()}

              {/* Recent bookings */}
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"18px 20px",marginBottom:18}}>
                <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span>🕒 {lang==="ar"?"آخر الطلبات":lang==="fr"?"Dernières réservations":"Recent Bookings"}</span>
                  <button onClick={()=>setTab("bookings")} style={{background:"none",border:"none",color:"#7C3AED",cursor:"pointer",fontSize:12,fontWeight:700}}>{lang==="ar"?"عرض الكل →":"Voir tout →"}</button>
                </div>
                {bookings.slice(0,3).map((b,i)=>(
                  <div key={b.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<2?"1px solid rgba(255,255,255,.05)":"none"}}>
                    <div style={{width:36,height:36,borderRadius:9,background:"rgba(124,58,237,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🚗</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.clientName}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{b.carName} · {b.from} → {b.to}</div>
                    </div>
                    <div>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:20,background:b.status==="confirmed"?"rgba(52,211,153,.15)":b.status==="pending"?"rgba(251,191,36,.15)":"rgba(239,68,68,.15)",color:b.status==="confirmed"?"#34D399":b.status==="pending"?"#FBBF24":"#F87171"}}>
                        {b.status==="confirmed"?l.confirmed:b.status==="pending"?l.pending:l.cancelled}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent messages */}
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"18px 20px"}}>
                <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span>💬 {lang==="ar"?"الرسائل الأخيرة":lang==="fr"?"Messages récents":"Recent Messages"}</span>
                  <button onClick={()=>setTab("messages")} style={{background:"none",border:"none",color:"#7C3AED",cursor:"pointer",fontSize:12,fontWeight:700}}>{lang==="ar"?"عرض الكل →":"Voir tout →"}</button>
                </div>
                {convs.length===0&&<div style={{fontSize:13,color:"rgba(255,255,255,.3)",textAlign:"center",padding:"20px 0"}}>{l.noMessages}</div>}
                {convs.slice(0,3).map((c,i)=>{
                  const last=c.msgs[c.msgs.length-1];
                  return(
                    <div key={c.id} onClick={()=>{setTab("messages");setActiveConv(c.id);}} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 0",borderBottom:i<convs.length-1?"1px solid rgba(255,255,255,.05)":"none",cursor:"pointer"}}>
                      <div style={{width:34,height:34,borderRadius:8,background:"rgba(99,102,241,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>👤</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,fontWeight:600,color:"#fff"}}>{lang==="ar"?"عميل #"+c.id:"Client #"+c.id}</div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.33)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{last?.text||"..."}</div>
                      </div>
                      {last&&<span style={{fontSize:9,color:"rgba(255,255,255,.2)",flexShrink:0}}>{last.time}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── BOOKINGS TAB ── */}
          {tab==="bookings"&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
                <h2 style={{fontSize:18,fontWeight:800,color:"#fff"}}>📋 {l.bookings}</h2>
                <div style={{display:"flex",gap:8}}>
                  {["all","pending","confirmed","cancelled"].map(s=>(
                    <button key={s} style={{padding:"6px 13px",borderRadius:20,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",color:"rgba(255,255,255,.5)",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                      {s==="all"?(lang==="ar"?"الكل":"Tous"):s==="pending"?l.pending:s==="confirmed"?l.confirmed:l.cancelled}
                    </button>
                  ))}
                </div>
              </div>

              {bookings.length===0&&(
                <div style={{textAlign:"center",padding:"60px 0",color:"rgba(255,255,255,.3)"}}>
                  <div style={{fontSize:48,marginBottom:14}}>📭</div>
                  <div style={{fontSize:14}}>{l.noBookings}</div>
                </div>
              )}

              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {bookings.map((b,i)=>(
                  <div key={b.id} style={{background:"rgba(255,255,255,.03)",border:`1px solid ${b.status==="confirmed"?"rgba(52,211,153,.2)":b.status==="pending"?"rgba(251,191,36,.2)":"rgba(239,68,68,.15)"}`,borderRadius:16,padding:"18px 20px",animation:`fadeUp .35s ease ${i*.06}s both`}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                        <div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:3,textTransform:"uppercase",letterSpacing:"1px"}}>{l.client}</div>
                          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{b.clientName}</div>
                          <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:2}}>{b.clientPhone}</div>
                        </div>
                        <div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:3,textTransform:"uppercase",letterSpacing:"1px"}}>{l.car}</div>
                          <div style={{fontSize:13,fontWeight:600,color:"#C084FC"}}>{b.carName}</div>
                        </div>
                        <div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:3,textTransform:"uppercase",letterSpacing:"1px"}}>{l.dates}</div>
                          <div style={{fontSize:13,color:"rgba(255,255,255,.7)"}}>{b.from} → {b.to}</div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{b.days} {l.days}</div>
                        </div>
                        <div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:3,textTransform:"uppercase",letterSpacing:"1px"}}>{l.total}</div>
                          <div style={{fontSize:15,fontWeight:800,color:"#34D399"}}>{b.total.toLocaleString()} دج</div>
                        </div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                        <span style={{fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,background:b.status==="confirmed"?"rgba(52,211,153,.15)":b.status==="pending"?"rgba(251,191,36,.15)":"rgba(239,68,68,.15)",color:b.status==="confirmed"?"#34D399":b.status==="pending"?"#FBBF24":"#F87171"}}>
                          {b.status==="confirmed"?l.confirmed:b.status==="pending"?l.pending:l.cancelled}
                        </span>
                        {b.status==="pending"&&(
                          <div style={{display:"flex",gap:7}}>
                            <button onClick={()=>confirmBooking(b.id)} style={{background:"rgba(52,211,153,.15)",border:"1px solid rgba(52,211,153,.3)",color:"#34D399",padding:"7px 14px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>✓ {l.confirm}</button>
                            <button onClick={()=>cancelBooking(b.id)} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",color:"#F87171",padding:"7px 14px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700}}>✗ {l.cancel}</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MESSAGES TAB — Real-time Chat ── */}
          {tab==="messages"&&(
            <div style={{animation:"fadeUp .4s ease both",height:"calc(100vh - 130px)",display:"flex",flexDirection:"column"}}>
              {/* Header */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <h2 style={{fontSize:18,fontWeight:800,color:"#fff"}}>
                  💬 {l.messages}
                  {convs.reduce((s,c)=>s+c.msgs.filter(m=>m.from==="user"&&!m.read).length,0)>0&&(
                    <span style={{marginRight:8,marginLeft:8,background:"#EF4444",color:"#fff",fontSize:11,fontWeight:800,padding:"2px 8px",borderRadius:20,animation:"pulse 2s infinite"}}>
                      {convs.reduce((s,c)=>s+c.msgs.filter(m=>m.from==="user"&&!m.read).length,0)}
                    </span>
                  )}
                </h2>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.35)",display:"flex",alignItems:"center",gap:5}}>
                    <span style={{width:7,height:7,borderRadius:"50%",background:"#34D399",display:"inline-block",animation:"pulse 2s infinite"}}/>
                    {lang==="ar"?"مباشر":"Live"}
                  </span>
                </div>
              </div>

              {/* Toast notifications */}
              <div style={{position:"fixed",top:20,right:20,zIndex:999,display:"flex",flexDirection:"column",gap:8}}>
                {toastNotifs.map(n=>(
                  <div key={n.id} onClick={()=>{setActiveConv(n.convId);setTab("messages");}} style={{background:"rgba(17,17,34,.97)",border:"1px solid rgba(124,58,237,.5)",borderRadius:14,padding:"12px 16px",display:"flex",gap:11,alignItems:"center",cursor:"pointer",animation:"notifIn .35s ease both",boxShadow:"0 8px 32px rgba(0,0,0,.6)",backdropFilter:"blur(12px)",maxWidth:300}}>
                    <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>👤</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#C084FC",marginBottom:2}}>{lang==="ar"?"رسالة جديدة ●":"Nouveau message ●"}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.75)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:12,flex:1,minHeight:0}}>
                {/* Sidebar — conversations */}
                <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                  <div style={{padding:"11px 13px",borderBottom:"1px solid rgba(255,255,255,.06)",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:"1px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span>{l.messages}</span>
                    <span style={{background:"rgba(124,58,237,.2)",color:"#C084FC",fontSize:10,padding:"2px 7px",borderRadius:9,fontWeight:800}}>{convs.length}</span>
                  </div>
                  <div style={{flex:1,overflowY:"auto"}}>
                    {convs.length===0&&<div style={{textAlign:"center",padding:"30px 12px",color:"rgba(255,255,255,.28)",fontSize:12}}>{l.noMessages}</div>}
                    {convs.map(c=>{
                      const last=c.msgs[c.msgs.length-1];
                      const unread=c.msgs.filter(m=>m.from==="user"&&!m.read).length;
                      const isOnline=onlineClients[c.id];
                      return(
                        <div key={c.id} onClick={()=>setActiveConv(c.id)} style={{padding:"12px 13px",cursor:"pointer",background:activeConv===c.id?"rgba(124,58,237,.16)":"transparent",borderBottom:"1px solid rgba(255,255,255,.04)",borderRight:activeConv===c.id?"3px solid #7C3AED":"3px solid transparent",transition:"background .15s"}}>
                          <div style={{display:"flex",gap:9,alignItems:"center"}}>
                            <div style={{position:"relative",flexShrink:0}}>
                              <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,rgba(99,102,241,.3),rgba(124,58,237,.2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,border:"1px solid rgba(255,255,255,.08)"}}>👤</div>
                              <div style={{position:"absolute",bottom:-1,right:-1,width:10,height:10,borderRadius:"50%",background:isOnline?"#34D399":"rgba(255,255,255,.2)",border:"2px solid #06060F"}}/>
                            </div>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:12,fontWeight:700,color:"#fff",display:"flex",alignItems:"center",justifyContent:"space-between",gap:4}}>
                                <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lang==="ar"?"عميل #"+c.id:"Client #"+c.id}</span>
                                <span style={{fontSize:9,color:"rgba(255,255,255,.25)",flexShrink:0}}>{last?.time||""}</span>
                              </div>
                              <div style={{fontSize:10,color:"rgba(255,255,255,.32)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                                {last?.attach?"📎 "+last.attach.name:last?.text||"..."}
                              </div>
                            </div>
                            {unread>0&&<span style={{width:18,height:18,borderRadius:"50%",background:"#7C3AED",color:"#fff",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,animation:"pulse 2s infinite"}}>{unread}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chat window */}
                <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                  {!activeConv?(
                    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:14,color:"rgba(255,255,255,.2)"}}>
                      <div style={{width:64,height:64,borderRadius:18,background:"rgba(124,58,237,.08)",border:"1px solid rgba(124,58,237,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>💬</div>
                      <div style={{fontSize:13,fontWeight:600}}>{lang==="ar"?"اختر محادثة للبدء":lang==="fr"?"Sélectionnez une conversation":"Select a conversation"}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.15)"}}>{lang==="ar"?"الدردشة المباشرة جاهزة":"Real-time chat ready"}</div>
                    </div>
                  ):(activeConvObj ? <>
                      {/* Chat header */}
                      <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.02)"}}>
                        <div style={{position:"relative"}}>
                          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,rgba(99,102,241,.3),rgba(124,58,237,.2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,border:"1px solid rgba(255,255,255,.08)"}}>👤</div>
                          <div style={{position:"absolute",bottom:-1,right:-1,width:10,height:10,borderRadius:"50%",background:onlineClients[activeConv]?"#34D399":"rgba(255,255,255,.25)",border:"2px solid #0a0a18"}}/>
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{lang==="ar"?"عميل #"+activeConv:"Client #"+activeConv}</div>
                          <div style={{fontSize:10,color:onlineClients[activeConv]?"#34D399":"rgba(255,255,255,.3)",display:"flex",alignItems:"center",gap:4}}>
                            {onlineClients[activeConv]?<><span style={{width:5,height:5,borderRadius:"50%",background:"#34D399",display:"inline-block",animation:"pulse 2s infinite"}}/>{lang==="ar"?"متصل الآن":lang==="fr"?"En ligne":"Online now"}</>:<span>{lang==="ar"?"غير متصل":lang==="fr"?"Hors ligne":"Offline"}</span>}
                          </div>
                        </div>
                        {/* Search toggle */}
                        <button onClick={()=>{setSearchOpen(v=>!v);setMsgSearch("");}} style={{background:searchOpen?"rgba(124,58,237,.25)":"rgba(255,255,255,.05)",border:`1px solid ${searchOpen?"rgba(124,58,237,.5)":"rgba(255,255,255,.1)"}`,color:searchOpen?"#C084FC":"rgba(255,255,255,.4)",width:32,height:32,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
                          <Ic.Search/>
                        </button>
                      </div>

                      {/* Search bar */}
                      {searchOpen&&(
                        <div style={{padding:"8px 14px",borderBottom:"1px solid rgba(255,255,255,.05)",background:"rgba(124,58,237,.04)"}}>
                          <div style={{position:"relative"}}>
                            <input value={msgSearch} onChange={e=>setMsgSearch(e.target.value)} placeholder={lang==="ar"?"ابحث في الرسائل...":"Search messages..."} style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(124,58,237,.25)",borderRadius:9,color:"#fff",padding:"8px 14px 8px 34px",fontSize:12}}/>
                            <span style={{position:"absolute",top:"50%",left:10,transform:"translateY(-50%)",color:"rgba(255,255,255,.3)"}}><Ic.Search/></span>
                          </div>
                        </div>
                      )}

                      {/* Messages */}
                      <div style={{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:10}} onClick={()=>setShowAttachMenu(false)}>
                        {(searchOpen&&msgSearch.trim()?activeConvObj?.msgs.filter(m=>m.text?.toLowerCase().includes(msgSearch.toLowerCase())):activeConvObj?.msgs)?.map((m,i)=>(
                          <div key={m.id||i} style={{display:"flex",justifyContent:m.from==="agency"?"flex-end":"flex-start",animation:"fadeUp .2s ease both"}}>
                            {m.from==="user"&&(
                              <div style={{width:28,height:28,borderRadius:8,background:"rgba(99,102,241,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0,marginLeft:rtl?0:8,marginRight:rtl?8:0,alignSelf:"flex-end"}}>👤</div>
                            )}
                            <div style={{maxWidth:"70%"}}>
                              <div style={{padding:m.attach&&m.attach.type==="image"?"6px":"10px 14px",borderRadius:m.from==="agency"?rtl?"4px 16px 16px 16px":"16px 4px 16px 16px":rtl?"16px 4px 16px 16px":"4px 16px 16px 16px",background:m.from==="agency"?"linear-gradient(135deg,#7C3AED,#5B4DE8)":"rgba(255,255,255,.08)",fontSize:13,lineHeight:1.6,color:"#fff",wordBreak:"break-word"}}>
                                {m.attach&&m.attach.type==="image"&&<img src={m.attach.url} alt={m.attach.name} style={{width:"100%",maxWidth:220,borderRadius:10,display:"block",marginBottom:m.text?6:0}}/>}
                                {m.attach&&m.attach.type==="doc"&&(
                                  <div style={{display:"flex",gap:9,alignItems:"center",padding:"6px 10px",background:"rgba(255,255,255,.06)",borderRadius:9,marginBottom:m.text?6:0}}>
                                    <span style={{fontSize:22}}>📄</span>
                                    <div>
                                      <div style={{fontSize:12,fontWeight:600,color:"#fff"}}>{m.attach.name}</div>
                                      <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{m.attach.size}</div>
                                    </div>
                                  </div>
                                )}
                                {m.text&&<span>{m.text}</span>}
                                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:4,marginTop:3}}>
                                  <span style={{fontSize:9,color:"rgba(255,255,255,.3)"}}>{m.time}</span>
                                  {m.from==="agency"&&(
                                    <span style={{fontSize:10,color:m.status==="delivered"?"#34D399":"rgba(255,255,255,.3)"}}>
                                      {m.status==="sent"?"✓":"✓✓"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* typing indicator */}
                        {agencyTyping&&(
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{width:28,height:28,borderRadius:8,background:"rgba(99,102,241,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>👤</div>
                            <div style={{background:"rgba(255,255,255,.08)",borderRadius:"4px 16px 16px 16px",padding:"10px 14px",display:"flex",gap:4,alignItems:"center"}}>
                              <span style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.5)",animation:"typing1 1.2s infinite"}}/>
                              <span style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.5)",animation:"typing2 1.2s infinite"}}/>
                              <span style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,.5)",animation:"typing3 1.2s infinite"}}/>
                            </div>
                          </div>
                        )}
                        <div ref={chatEndRef}/>
                      </div>

                      {/* Attach preview bar */}
                      {attachPreview&&(
                        <div style={{padding:"8px 14px",borderTop:"1px solid rgba(255,255,255,.05)",background:"rgba(124,58,237,.06)",display:"flex",alignItems:"center",gap:10}}>
                          {attachPreview.type==="image"?<img src={attachPreview.url} alt="" style={{width:44,height:44,borderRadius:8,objectFit:"cover"}}/>:<span style={{fontSize:24}}>📄</span>}
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:12,fontWeight:600,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{attachPreview.name}</div>
                            <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{attachPreview.size}</div>
                          </div>
                          <button onClick={()=>setAttachPreview(null)} style={{background:"rgba(239,68,68,.2)",border:"1px solid rgba(239,68,68,.3)",color:"#F87171",width:26,height:26,borderRadius:6,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                        </div>
                      )}

                      {/* Input bar */}
                      <div style={{padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",gap:8,alignItems:"flex-end",background:"rgba(255,255,255,.015)"}}>
                        {/* Attach button */}
                        <div style={{position:"relative"}}>
                          <button onClick={e=>{e.stopPropagation();setShowAttachMenu(v=>!v);}} style={{background:showAttachMenu?"rgba(124,58,237,.25)":"rgba(255,255,255,.05)",border:`1px solid ${showAttachMenu?"rgba(124,58,237,.5)":"rgba(255,255,255,.1)"}`,color:showAttachMenu?"#C084FC":"rgba(255,255,255,.4)",width:38,height:38,borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,transition:"all .2s"}}>📎</button>
                          {showAttachMenu&&(
                            <div onClick={e=>e.stopPropagation()} style={{position:"absolute",bottom:46,left:0,background:"rgba(14,14,28,.97)",border:"1px solid rgba(124,58,237,.3)",borderRadius:12,padding:6,display:"flex",flexDirection:"column",gap:4,minWidth:160,boxShadow:"0 8px 32px rgba(0,0,0,.6)",zIndex:50}}>
                              <button onClick={()=>{imgInputRef.current?.click();}} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",background:"transparent",border:"none",color:"rgba(255,255,255,.75)",cursor:"pointer",borderRadius:8,fontSize:12,fontWeight:600,textAlign:"start",transition:"background .15s"}}>
                                <span style={{fontSize:18}}>🖼️</span>{lang==="ar"?"إرسال صورة":lang==="fr"?"Envoyer une image":"Send Image"}
                              </button>
                              <button onClick={()=>{fileInputRef.current?.click();}} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",background:"transparent",border:"none",color:"rgba(255,255,255,.75)",cursor:"pointer",borderRadius:8,fontSize:12,fontWeight:600,textAlign:"start",transition:"background .15s"}}>
                                <span style={{fontSize:18}}>📄</span>{lang==="ar"?"إرسال وثيقة":lang==="fr"?"Envoyer un document":"Send Document"}
                              </button>
                            </div>
                          )}
                        </div>
                        <input ref={imgInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFileAttach}/>
                        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" style={{display:"none"}} onChange={handleFileAttach}/>
                        <input
                          value={replyIn}
                          onChange={handleReplyChange}
                          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendReply();}}}
                          placeholder={l.reply}
                          style={{...IS,borderRadius:11,flex:1,minHeight:38,resize:"none"}}
                        />
                        <button onClick={sendReply} disabled={!replyIn.trim()&&!attachPreview} style={{background:replyIn.trim()||attachPreview?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.06)",border:"none",color:replyIn.trim()||attachPreview?"#fff":"rgba(255,255,255,.25)",width:42,height:38,borderRadius:11,cursor:replyIn.trim()||attachPreview?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .25s",flexShrink:0}}>
                          <Ic.Send/>
                        </button>
                      </div>
                    </>
                  : null)}
                </div>
              </div>
            </div>
          )}

          {/* ── CARS TAB ── */}
          {tab==="cars"&&(
            <div style={{animation:"fadeUp .4s ease both"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22}}>
                <h2 style={{fontSize:18,fontWeight:800,color:"#fff"}}>🚗 {l.cars}
                  <span style={{marginRight:10,marginLeft:10,fontSize:13,color:"rgba(255,255,255,.35)",fontWeight:500}}>({userCars.length})</span>
                </h2>
                {!showCarForm&&(
                  <button onClick={()=>{setCarForm(EMPTY_CAR_FORM);setEditingCar(null);setShowCarForm(true);}} style={{display:"flex",alignItems:"center",gap:7,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"9px 18px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700}}>
                    <Ic.Plus/> {l.addCar}
                  </button>
                )}
              </div>

              {/* ── ADD / EDIT CAR FORM ── */}
              {showCarForm&&(
                <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(124,58,237,.3)",borderRadius:18,padding:"24px 26px",marginBottom:24,animation:"fadeUp .35s ease both"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                    <h3 style={{fontSize:16,fontWeight:800,color:"#C084FC"}}>
                      {editingCar?"✏️ "+l.editCar:"➕ "+l.addCar}
                    </h3>
                    <button onClick={()=>{setShowCarForm(false);setEditingCar(null);setCarForm(EMPTY_CAR_FORM);}} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.5)",padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:12}}>
                      ✕ {l.cancelForm}
                    </button>
                  </div>

                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

                    {/* Left column */}
                    <div style={{display:"flex",flexDirection:"column",gap:16}}>

                      {/* Car Name */}
                      <div>
                        <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{l.carName}</label>
                        <input value={carForm.name} onChange={setF("name")} placeholder={l.carNamePh}
                          style={{...IS,border:!carForm.name.trim()&&carForm.name!==undefined?"1px solid rgba(239,68,68,.35)":"1px solid rgba(255,255,255,.12)"}}/>
                        {!carForm.name.trim()&&<div style={{fontSize:11,color:"#F87171",marginTop:4}}>{lang==="ar"?"هذا الحقل مطلوب":lang==="fr"?"Ce champ est requis":"This field is required"}</div>}
                      </div>

                      {/* Fuel Type */}
                      <div>
                        <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:9}}>{l.fuelType}</label>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
                          {FUELS.map(f=>(
                            <button key={f.k} onClick={()=>setCarForm(cf=>({...cf,fuel:f.k}))}
                              style={{padding:"9px 4px",borderRadius:10,border:`2px solid ${carForm.fuel===f.k?"#7C3AED":"rgba(255,255,255,.1)"}`,background:carForm.fuel===f.k?"rgba(124,58,237,.22)":"rgba(255,255,255,.03)",color:carForm.fuel===f.k?"#C084FC":"rgba(255,255,255,.5)",cursor:"pointer",textAlign:"center",transition:"all .2s",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                              <span style={{fontSize:18}}>{f.icon}</span>
                              <span style={{fontSize:10,fontWeight:700}}>{lang==="ar"?f.ar:lang==="fr"?f.fr:f.en}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Car Type */}
                      <div>
                        <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{l.carType}</label>
                        <select value={carForm.type} onChange={setF("type")} style={{...IS,background:"#0D0D1E",colorScheme:"dark",cursor:"pointer"}}>
                          {CAR_TYPES_P.map(t=><option key={t.k} value={t.k}>{lang==="ar"?t.ar:lang==="fr"?t.fr:t.en}</option>)}
                        </select>
                      </div>

                      {/* Price + Year */}
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                        <div>
                          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{l.price}</label>
                          <input type="number" value={carForm.price} onChange={setF("price")} placeholder={l.pricePh} style={IS}/>
                        </div>
                        <div>
                          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{l.year}</label>
                          <input type="number" value={carForm.year} onChange={setF("year")} min="2000" max="2025" style={IS}/>
                        </div>
                      </div>

                      {/* Seats + Transmission */}
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                        <div>
                          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{l.seats}</label>
                          <input type="number" value={carForm.seats} onChange={setF("seats")} min="2" max="20" style={IS}/>
                        </div>
                        <div>
                          <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{l.transmission}</label>
                          <div style={{display:"flex",gap:6}}>
                            {[{k:"manual",label:l.manual},{k:"auto",label:l.auto}].map(tr=>(
                              <button key={tr.k} onClick={()=>setCarForm(f=>({...f,transmission:tr.k}))}
                                style={{flex:1,padding:"10px 6px",borderRadius:9,border:`2px solid ${carForm.transmission===tr.k?"#7C3AED":"rgba(255,255,255,.1)"}`,background:carForm.transmission===tr.k?"rgba(124,58,237,.2)":"rgba(255,255,255,.03)",color:carForm.transmission===tr.k?"#C084FC":"rgba(255,255,255,.45)",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all .2s"}}>
                                {tr.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Car Color */}
                      <div>
                        <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{l.carColor}</label>
                        <input value={carForm.color} onChange={setF("color")} placeholder={l.carColorPh} style={IS}/>
                      </div>

                      {/* Car Description */}
                      <div>
                        <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{l.carDesc}</label>
                        <textarea value={carForm.description} onChange={setF("description")} placeholder={l.carDescPh} rows={3} style={{...IS,resize:"vertical",lineHeight:1.65}}/>
                      </div>

                      {/* Availability Toggle */}
                      <div>
                        <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:9}}>{l.availability}</label>
                        <div style={{display:"flex",gap:8}}>
                          <button onClick={()=>setCarForm(f=>({...f,available:true}))}
                            style={{flex:1,padding:"11px",borderRadius:10,border:`2px solid ${carForm.available!==false?"#059669":"rgba(255,255,255,.1)"}`,background:carForm.available!==false?"rgba(5,150,105,.18)":"rgba(255,255,255,.03)",color:carForm.available!==false?"#34D399":"rgba(255,255,255,.4)",cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .2s"}}>
                            <span style={{fontSize:15}}>🟢</span>{l.available}
                          </button>
                          <button onClick={()=>setCarForm(f=>({...f,available:false}))}
                            style={{flex:1,padding:"11px",borderRadius:10,border:`2px solid ${carForm.available===false?"#EF4444":"rgba(255,255,255,.1)"}`,background:carForm.available===false?"rgba(239,68,68,.15)":"rgba(255,255,255,.03)",color:carForm.available===false?"#F87171":"rgba(255,255,255,.4)",cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .2s"}}>
                            <span style={{fontSize:15}}>🔴</span>{l.unavailable}
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Right column — Photo upload */}
                    <div style={{display:"flex",flexDirection:"column",gap:14}}>
                      <div>
                        <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:9}}>
                          {l.carPhoto} <span style={{color:"rgba(255,255,255,.25)",fontSize:10,fontWeight:500,textTransform:"none"}}>({l.optional})</span>
                        </label>

                        {/* Preview or drop zone */}
                        {carForm.imgPreview?(
                          <div style={{position:"relative",borderRadius:14,overflow:"hidden",border:"2px solid rgba(124,58,237,.4)"}}>
                            <img src={carForm.imgPreview} alt="" style={{width:"100%",height:200,objectFit:"cover",display:"block"}}/>
                            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 50%)"}}/>
                            <div style={{position:"absolute",bottom:10,left:10,right:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                              <span style={{fontSize:11,color:"rgba(255,255,255,.7)",fontWeight:600}}>📸 {lang==="ar"?"الصورة المختارة":lang==="fr"?"Photo sélectionnée":"Selected photo"}</span>
                              <button onClick={()=>setCarForm(f=>({...f,imgPreview:null,imgFile:null}))}
                                style={{background:"rgba(239,68,68,.8)",border:"none",color:"#fff",width:26,height:26,borderRadius:"50%",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                            </div>
                          </div>
                        ):(
                          <div
                            onDragOver={e=>{e.preventDefault();setDragOver(true);}}
                            onDragLeave={()=>setDragOver(false)}
                            onDrop={e=>{e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f&&f.type.startsWith("image/"))handleCarImg(f);}}
                            onClick={()=>document.getElementById("portalCarImg").click()}
                            style={{border:`2px dashed ${dragOver?"#7C3AED":"rgba(124,58,237,.35)"}`,borderRadius:14,padding:"32px 20px",textAlign:"center",cursor:"pointer",background:dragOver?"rgba(124,58,237,.08)":"rgba(124,58,237,.03)",transition:"all .25s",minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
                            <div style={{width:54,height:54,borderRadius:14,background:"rgba(124,58,237,.14)",border:"1px solid rgba(124,58,237,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>📸</div>
                            <div style={{color:"rgba(255,255,255,.55)",fontSize:13,fontWeight:600}}>{l.dragPhoto}</div>
                            <div style={{color:"rgba(255,255,255,.25)",fontSize:11}}>{l.photoHint}</div>
                            <input id="portalCarImg" type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleCarImg(e.target.files[0])}/>
                          </div>
                        )}

                        {/* URL fallback */}
                        <div style={{marginTop:10}}>
                          <label style={{display:"block",fontSize:10,color:"rgba(255,255,255,.3)",marginBottom:5}}>
                            {lang==="ar"?"أو أدخل رابط الصورة":lang==="fr"?"Ou saisir l'URL de la photo":"Or enter image URL"}
                          </label>
                          <input
                            value={carForm.imgPreview&&!carForm.imgFile?carForm.imgPreview:""}
                            onChange={e=>setCarForm(f=>({...f,imgPreview:e.target.value,imgFile:null}))}
                            placeholder="https://..."
                            style={{...IS,fontSize:12,padding:"9px 12px"}}/>
                        </div>
                      </div>

                      {/* Mini preview card */}
                      {carForm.name&&(
                        <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,overflow:"hidden",animation:"fadeUp .3s ease both"}}>
                          <div style={{height:90,overflow:"hidden",position:"relative",background:"#0a0a16"}}>
                            {carForm.imgPreview&&<img src={carForm.imgPreview} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.75}}/>}
                            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.8),transparent)"}}/>
                            <div style={{position:"absolute",bottom:7,left:10,fontSize:12,fontWeight:700,color:"#fff"}}>{carForm.name||"—"}</div>
                          </div>
                          <div style={{padding:"9px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
                            <span style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{FUELS.find(f=>f.k===carForm.fuel)?.icon} {lang==="ar"?FUELS.find(f=>f.k===carForm.fuel)?.ar:FUELS.find(f=>f.k===carForm.fuel)?.en}</span>
                            <span style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{carForm.year}</span>
                            <span style={{fontSize:13,fontWeight:800,color:"#C084FC"}}>{carForm.price?Number(carForm.price).toLocaleString()+" دج":""}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div style={{display:"flex",gap:10,marginTop:22,paddingTop:18,borderTop:"1px solid rgba(255,255,255,.07)"}}>
                    <button onClick={()=>{setShowCarForm(false);setEditingCar(null);setCarForm(EMPTY_CAR_FORM);}}
                      style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.5)",padding:"11px 22px",borderRadius:11,cursor:"pointer",fontSize:14,fontWeight:600}}>
                      {l.cancelForm}
                    </button>
                    <button onClick={submitCar}
                      disabled={!carForm.name.trim()}
                      style={{flex:1,background:carForm.name.trim()?"linear-gradient(135deg,#059669,#34D399)":"rgba(255,255,255,.06)",border:"none",color:carForm.name.trim()?"#fff":"rgba(255,255,255,.2)",padding:"12px",borderRadius:11,cursor:carForm.name.trim()?"pointer":"not-allowed",fontSize:14,fontWeight:800,transition:"all .2s"}}>
                      🚗 {editingCar?l.updateCar:l.submitCar}
                    </button>
                  </div>
                </div>
              )}

              {/* ── CARS GRID ── */}
              {userCars.length===0&&!showCarForm?(
                <div style={{textAlign:"center",padding:"60px 0",color:"rgba(255,255,255,.3)"}}>
                  <div style={{fontSize:56,marginBottom:14}}>🚗</div>
                  <div style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,.4)",marginBottom:8}}>{l.noCars}</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.2)",marginBottom:22}}>{l.addFirst}</div>
                  <button onClick={()=>{setCarForm(EMPTY_CAR_FORM);setEditingCar(null);setShowCarForm(true);}}
                    style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"11px 26px",borderRadius:11,cursor:"pointer",fontSize:14,fontWeight:700,display:"inline-flex",alignItems:"center",gap:8}}>
                    <Ic.Plus/>{l.addCar}
                  </button>
                </div>
              ):(
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
                  {userCars.map((car,i)=>{
                    const fuelObj=FUELS.find(f=>f.k===car.fuel);
                    return(
                      <div key={car.id} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,overflow:"hidden",animation:`fadeUp .35s ease ${i*.07}s both`,transition:"box-shadow .2s"}}
                        onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(124,58,237,.18)"}
                        onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                        <div style={{position:"relative",height:148,background:"#0a0a1a",overflow:"hidden"}}>
                          <img src={car.img} alt={car.name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:car.available===false?0.4:0.85,transition:"transform .35s,opacity .3s"}}
                            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                          {/* Unavailable overlay */}
                          {car.available===false&&(
                            <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                              <span style={{fontSize:11,fontWeight:800,color:"#F87171",background:"rgba(239,68,68,.2)",border:"1px solid rgba(239,68,68,.4)",borderRadius:20,padding:"4px 12px",backdropFilter:"blur(6px)"}}>🔴 {l.unavailable}</span>
                            </div>
                          )}
                          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 55%)"}}/>
                          {/* Fuel badge */}
                          <div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.6)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.12)",borderRadius:20,padding:"3px 9px",fontSize:11,color:"#fff",fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
                            {fuelObj?.icon} {lang==="ar"?fuelObj?.ar:lang==="fr"?fuelObj?.fr:fuelObj?.en}
                          </div>
                          {/* Availability badge */}
                          <div style={{position:"absolute",top:8,left:8,background:car.available===false?"rgba(239,68,68,.25)":"rgba(5,150,105,.25)",backdropFilter:"blur(8px)",border:`1px solid ${car.available===false?"rgba(239,68,68,.4)":"rgba(52,211,153,.4)"}`,borderRadius:20,padding:"3px 9px",fontSize:10,color:car.available===false?"#F87171":"#34D399",fontWeight:700}}>
                            {car.available===false?"🔴":"🟢"} {car.available===false?l.unavailable:l.available}
                          </div>
                          <div style={{position:"absolute",bottom:8,left:10,right:10,display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
                            <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{car.name}</span>
                            <span style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>{car.year}</span>
                          </div>
                        </div>
                        <div style={{padding:"12px 13px"}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
                            <div style={{display:"flex",gap:6,alignItems:"center"}}>
                              <span style={{fontSize:10,background:"rgba(124,58,237,.15)",color:"#C084FC",padding:"2px 8px",borderRadius:20,fontWeight:700,border:"1px solid rgba(124,58,237,.25)"}}>{lang==="ar"?CAR_TYPES_P.find(t=>t.k===car.type)?.ar||car.type:CAR_TYPES_P.find(t=>t.k===car.type)?.en||car.type}</span>
                              <span style={{fontSize:10,background:"rgba(255,255,255,.06)",color:"rgba(255,255,255,.4)",padding:"2px 8px",borderRadius:20}}>
                                {car.transmission==="auto"?(lang==="ar"?"أوتو":lang==="fr"?"Auto":"Auto"):(lang==="ar"?"يدوي":lang==="fr"?"Manuelle":"Manual")}
                              </span>
                            </div>
                            <span style={{fontSize:14,fontWeight:800,color:"#34D399"}}>{car.price?.toLocaleString()||0} <span style={{fontSize:9,color:"rgba(255,255,255,.3)"}}>دج/يوم</span></span>
                          </div>
                          <div style={{display:"flex",gap:7,marginTop:10}}>
                            <button onClick={()=>toggleAvailability(car.id)}
                              style={{flex:1,background:car.available===false?"rgba(5,150,105,.12)":"rgba(239,68,68,.1)",border:`1px solid ${car.available===false?"rgba(52,211,153,.3)":"rgba(239,68,68,.25)"}`,color:car.available===false?"#34D399":"#F87171",padding:"7px",borderRadius:9,cursor:"pointer",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                              {car.available===false?<>🟢 {l.available}</>:<>🔴 {l.unavailable}</>}
                            </button>
                            <button onClick={()=>startEditCar(car)}
                              style={{background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.25)",color:"#C084FC",padding:"7px 10px",borderRadius:9,cursor:"pointer",fontSize:12}}>
                              ✏️
                            </button>
                            <button onClick={()=>deleteCar(car.id)}
                              style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",color:"#F87171",padding:"7px 11px",borderRadius:9,cursor:"pointer",fontSize:12}}>
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── MY PROFILE TAB ── */}
          {tab==="myprofile"&&(
            <div style={{animation:"fadeUp .4s ease both",maxWidth:800}}>
              <div style={{marginBottom:24}}>
                <h2 style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:4}}>👤 {l.myProfile}</h2>
                <p style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>{lang==="ar"?"إدارة بياناتك الشخصية ومعلومات وكالتك":lang==="fr"?"Gérez vos données personnelles":"Manage your personal data and agency info"}</p>
              </div>

              {/* ── بطاقة الملف الشخصي العلوية ── */}
              <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.22),rgba(99,102,241,.12))",border:"1px solid rgba(124,58,237,.35)",borderRadius:20,padding:"24px 26px",marginBottom:20,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
                {/* صورة الوكالة */}
                <div style={{position:"relative",flexShrink:0}}>
                  {agencyProfile.logoPreview
                    ?<img src={agencyProfile.logoPreview} alt="" style={{width:86,height:86,borderRadius:20,objectFit:"cover",border:"3px solid rgba(124,58,237,.6)",boxShadow:"0 8px 28px rgba(124,58,237,.35)"}}/>
                    :<AgencyLogo agency={agency} size={86} style={{border:"3px solid rgba(124,58,237,.5)",boxShadow:"0 8px 28px rgba(124,58,237,.3)"}}/>
                  }
                  <label htmlFor="mpLogoInput" style={{position:"absolute",bottom:-5,right:-5,width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"2px solid #06060F",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:12}}>✏️</label>
                  <input id="mpLogoInput" type="file" accept="image/*" style={{display:"none"}} onChange={handleLogoUpload}/>
                </div>
                {/* معلومات */}
                <div style={{flex:1,minWidth:180}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
                    <span style={{fontSize:20,fontWeight:900,color:"#fff"}}>{agencyProfile.displayName||lang==="ar"?agency.ar:agency.fr}</span>
                    {agency.verified&&<span style={{background:"rgba(52,211,153,.15)",border:"1px solid rgba(52,211,153,.3)",color:"#34D399",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20}}>✓ {lang==="ar"?"معتمدة":"Vérifiée"}</span>}
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:12,fontSize:12,color:"rgba(255,255,255,.45)"}}>
                    <span>📍 {lang==="ar"?agency.city?.ar:agency.city?.fr}</span>
                    <span>📞 {agencyProfile.phone||agency.phone||"—"}</span>
                    <span>⭐ {agency.rating}/5</span>
                    {agencyProfile.email&&<span>✉️ {agencyProfile.email}</span>}
                    {agencyProfile.whatsapp&&<span>💬 {agencyProfile.whatsapp}</span>}
                  </div>
                </div>
                {/* أرقام سريعة */}
                <div style={{display:"flex",gap:10}}>
                  {[
                    {e:"🚗",v:userCars.length,l:lang==="ar"?"سيارة":"cars"},
                    {e:"📋",v:bookings.length,l:lang==="ar"?"حجز":"bookings"},
                    {e:"✅",v:bookings.filter(b=>b.status==="confirmed").length,l:lang==="ar"?"مؤكد":"confirmed"},
                  ].map((s,i)=>(
                    <div key={i} style={{textAlign:"center",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:12,padding:"10px 12px"}}>
                      <div style={{fontSize:18,marginBottom:3}}>{s.e}</div>
                      <div style={{fontSize:15,fontWeight:800,color:"#C084FC"}}>{s.v}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,.35)",fontWeight:600}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── شبكة ثنائية العمود ── */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>

                {/* بيانات الحساب */}
                <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:20,display:"flex",flexDirection:"column",gap:16}}>
                  <div style={{fontSize:12,fontWeight:800,color:"#C084FC",display:"flex",alignItems:"center",gap:7,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                    🪪 {lang==="ar"?"بيانات الحساب":lang==="fr"?"Compte":"Account"}
                  </div>

                  {/* صورة الشعار */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sLogoLabel}</label>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      {agencyProfile.logoPreview
                        ?<img src={agencyProfile.logoPreview} alt="" style={{width:42,height:42,borderRadius:10,objectFit:"cover",border:"2px solid rgba(124,58,237,.4)"}}/>
                        :<AgencyLogo agency={agency} size={42} style={{border:"2px solid rgba(124,58,237,.3)"}}/>
                      }
                      <div style={{display:"flex",gap:7}}>
                        <label htmlFor="mpLogoInput2" style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(124,58,237,.15)",border:"1px solid rgba(124,58,237,.3)",color:"#C084FC",padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:700}}>
                          📁 {lang==="ar"?"رفع":lang==="fr"?"Choisir":"Upload"}
                        </label>
                        <input id="mpLogoInput2" type="file" accept="image/*" style={{display:"none"}} onChange={handleLogoUpload}/>
                        {agencyProfile.logoPreview&&<button onClick={()=>{setAgencyProfile(p=>({...p,logoPreview:null}));setSettingsDirty(true);}} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",color:"#FCA5A5",padding:"6px 10px",borderRadius:8,cursor:"pointer",fontSize:11}}>🗑️</button>}
                      </div>
                    </div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.22)",marginTop:5}}>{l.sLogoSub}</div>
                  </div>

                  {/* اسم العرض */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sDisplayName}</label>
                    <input value={agencyProfile.displayName} onChange={setAP("displayName")} placeholder={l.sDisplayNamePh}
                      style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",fontSize:13,fontFamily:"inherit"}}/>
                  </div>

                  {/* اسم المستخدم */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sUsername}</label>
                    <div style={{position:"relative"}}>
                      <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:lang==="ar"?"auto":11,right:lang==="ar"?11:"auto",color:"rgba(255,255,255,.3)",fontSize:13,pointerEvents:"none"}}>@</span>
                      <input value={agencyProfile.username} onChange={setAP("username")} placeholder={l.sUsernamePh}
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",paddingLeft:lang==="ar"?"12px":"30px",paddingRight:lang==="ar"?"30px":"12px",fontSize:13,fontFamily:"inherit"}}/>
                    </div>
                  </div>

                  {/* البريد الإلكتروني */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sEmail}</label>
                    <div style={{position:"relative"}}>
                      <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:lang==="ar"?"auto":11,right:lang==="ar"?11:"auto",fontSize:13,pointerEvents:"none"}}>✉️</span>
                      <input value={agencyProfile.email} onChange={setAP("email")} placeholder={l.sEmailPh} type="email" dir="ltr"
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",paddingLeft:lang==="ar"?"12px":"32px",paddingRight:lang==="ar"?"32px":"12px",fontSize:13,fontFamily:"inherit"}}/>
                    </div>
                  </div>
                </div>

                {/* معلومات التواصل */}
                <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:20,display:"flex",flexDirection:"column",gap:16}}>
                  <div style={{fontSize:12,fontWeight:800,color:"#60A5FA",display:"flex",alignItems:"center",gap:7,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                    📞 {lang==="ar"?"معلومات التواصل":lang==="fr"?"Contact":"Contact Info"}
                  </div>

                  {/* الهاتف */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sPhone}</label>
                    <div style={{position:"relative"}}>
                      <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:lang==="ar"?"auto":11,right:lang==="ar"?11:"auto",fontSize:13,pointerEvents:"none"}}>📞</span>
                      <input value={agencyProfile.phone} onChange={setAP("phone")} placeholder={l.sPhonePh} type="tel" dir="ltr"
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",paddingLeft:lang==="ar"?"12px":"32px",paddingRight:lang==="ar"?"32px":"12px",fontSize:13,fontFamily:"inherit"}}/>
                    </div>
                  </div>

                  {/* واتساب */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sWhatsapp}</label>
                    <div style={{position:"relative"}}>
                      <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:lang==="ar"?"auto":11,right:lang==="ar"?11:"auto",fontSize:13,pointerEvents:"none"}}>💬</span>
                      <input value={agencyProfile.whatsapp} onChange={setAP("whatsapp")} placeholder={l.sWhatsappPh} dir="ltr"
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",paddingLeft:lang==="ar"?"12px":"32px",paddingRight:lang==="ar"?"32px":"12px",fontSize:13,fontFamily:"inherit"}}/>
                    </div>
                  </div>

                  {/* الموقع */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sWebsite}</label>
                    <div style={{position:"relative"}}>
                      <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:lang==="ar"?"auto":11,right:lang==="ar"?11:"auto",fontSize:13,pointerEvents:"none"}}>🌐</span>
                      <input value={agencyProfile.website} onChange={setAP("website")} placeholder={l.sWebsitePh} dir="ltr"
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",paddingLeft:lang==="ar"?"12px":"32px",paddingRight:lang==="ar"?"32px":"12px",fontSize:13,fontFamily:"inherit"}}/>
                    </div>
                  </div>

                  {/* ساعات العمل */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sWorkingHours}</label>
                    <div style={{position:"relative"}}>
                      <span style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:lang==="ar"?"auto":11,right:lang==="ar"?11:"auto",fontSize:13,pointerEvents:"none"}}>🕐</span>
                      <input value={agencyProfile.workingHours} onChange={setAP("workingHours")} placeholder={l.sWorkingHoursPh}
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",paddingLeft:lang==="ar"?"12px":"32px",paddingRight:lang==="ar"?"32px":"12px",fontSize:13,fontFamily:"inherit"}}/>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── بيانات الوكالة والوصف ── */}
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:20,marginBottom:16,display:"flex",flexDirection:"column",gap:16}}>
                <div style={{fontSize:12,fontWeight:800,color:"#34D399",display:"flex",alignItems:"center",gap:7,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                  🏢 {lang==="ar"?"بيانات الوكالة":lang==="fr"?"Données agence":"Agency Data"}
                </div>
                <div style={{maxWidth:320}}>
                  {/* الولاية */}
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sWilaya}</label>
                    <select value={agencyProfile.wilaya} onChange={setAP("wilaya")}
                      style={{width:"100%",background:"#0D0D1E",colorScheme:"dark",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",fontSize:13,fontFamily:"inherit",cursor:"pointer"}}>
                      <option value="" style={{background:"#0D0D1E",color:"#F1F5F9"}}>{lang==="ar"?"-- الولاية --":"-- Wilaya --"}</option>
                      {allWilayas.map(w=><option key={w.c} value={w.c} style={{background:"#0D0D1E",color:"#F1F5F9"}}>{w.c} — {lang==="ar"?w.ar:w.fr}</option>)}
                    </select>
                  </div>
                </div>
                {/* العنوان */}
                <div>
                  <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sAddress}</label>
                  <input value={agencyProfile.address} onChange={setAP("address")} placeholder={l.sAddressPh}
                    style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",fontSize:13,fontFamily:"inherit"}}/>
                </div>
                {/* الوصف */}
                <div>
                  <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sDescription}</label>
                  <textarea value={agencyProfile.description} onChange={setAP("description")} placeholder={l.sDescriptionPh} rows={3}
                    style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",fontSize:13,fontFamily:"inherit",resize:"vertical",lineHeight:1.65}}/>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.25)",marginTop:4,textAlign:lang==="ar"?"right":"left"}}>{agencyProfile.description.length}/500</div>
                </div>

              </div>

              {/* ── كلمة المرور ── */}
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:20,marginBottom:20,display:"flex",flexDirection:"column",gap:16}}>
                <div style={{fontSize:12,fontWeight:800,color:"#FBBF24",display:"flex",alignItems:"center",gap:7,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                  🔐 {lang==="ar"?"الأمان وكلمة المرور":lang==="fr"?"Sécurité":"Security & Password"}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sCurrentPass}</label>
                    <div style={{position:"relative"}}>
                      <input type={showPassCurrent?"text":"password"} value={passForm.current} onChange={setPF("current")} placeholder="••••••••"
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",paddingRight:36,fontSize:13,fontFamily:"inherit"}}/>
                      <button onClick={()=>setShowPassCurrent(p=>!p)} style={{position:"absolute",top:"50%",right:10,transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:12}}>{showPassCurrent?"🙈":"👁️"}</button>
                    </div>
                  </div>
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sNewPass}</label>
                    <div style={{position:"relative"}}>
                      <input type={showPassNew?"text":"password"} value={passForm.newPass} onChange={setPF("newPass")} placeholder="••••••••"
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",paddingRight:36,fontSize:13,fontFamily:"inherit"}}/>
                      <button onClick={()=>setShowPassNew(p=>!p)} style={{position:"absolute",top:"50%",right:10,transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:12}}>{showPassNew?"🙈":"👁️"}</button>
                    </div>
                    {passForm.newPass.length>0&&(
                      <div style={{display:"flex",gap:3,marginTop:5}}>
                        {[1,2,3,4].map(i=>{const s=passForm.newPass.length<4?1:passForm.newPass.length<6?2:/[A-Z]/.test(passForm.newPass)&&/[0-9]/.test(passForm.newPass)?4:3;return<div key={i} style={{flex:1,height:3,borderRadius:3,background:i<=s?s<=1?"#EF4444":s<=2?"#F59E0B":s<=3?"#60A5FA":"#34D399":"rgba(255,255,255,.1)"}}/>;})}
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{display:"block",color:"rgba(255,255,255,.4)",fontSize:10,fontWeight:700,marginBottom:7,textTransform:"uppercase",letterSpacing:"1px"}}>{l.sConfirmPass}</label>
                    <input type="password" value={passForm.confirm} onChange={setPF("confirm")} placeholder="••••••••"
                      style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.11)",borderRadius:9,color:"#fff",padding:"10px 12px",fontSize:13,fontFamily:"inherit",borderColor:passForm.confirm&&passForm.confirm!==passForm.newPass?"rgba(239,68,68,.6)":passForm.confirm&&passForm.confirm===passForm.newPass?"rgba(52,211,153,.5)":"rgba(255,255,255,.11)"}}/>
                    {passForm.confirm&&passForm.confirm===passForm.newPass&&<div style={{fontSize:10,color:"#34D399",marginTop:4}}>✓ {lang==="ar"?"متطابقة":"Match"}</div>}
                  </div>
                </div>
                {passErr&&<div style={{background:"rgba(239,68,68,.09)",border:"1px solid rgba(239,68,68,.22)",borderRadius:8,padding:"8px 13px",fontSize:12,color:"#FCA5A5"}}>⚠️ {passErr}</div>}
                <div>
                  <button onClick={changePassword} style={{background:"rgba(251,191,36,.12)",border:"1px solid rgba(251,191,36,.28)",color:"#FCD34D",padding:"10px 24px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:700,display:"inline-flex",alignItems:"center",gap:7}}>
                    🔑 {lang==="ar"?"تغيير كلمة المرور":lang==="fr"?"Changer le mot de passe":"Change Password"}
                  </button>
                </div>
              </div>

              {/* ── أزرار الحفظ ── */}
              <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                <button onClick={()=>{
                  setAgencyProfile({displayName:lang==="ar"?agency.ar:agency.fr,username:"",logoPreview:null,phone:agency.phone||"",email:"",nameAr:agency.ar||"",nameFr:agency.fr||"",wilaya:agency.wilaya||"",address:"",description:(agency.about&&agency.about[lang])||"",whatsapp:"",website:"",workingHours:"",experience:agency.exp||1});
                  setSettingsDirty(false);
                }} style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.45)",padding:"11px 24px",borderRadius:11,cursor:"pointer",fontSize:13,fontWeight:600}}>
                  ✕ {l.sCancel}
                </button>
                <button onClick={saveProfile} disabled={!settingsDirty}
                  style={{background:settingsDirty?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.04)",border:"none",color:settingsDirty?"#fff":"rgba(255,255,255,.2)",padding:"11px 34px",borderRadius:11,cursor:settingsDirty?"pointer":"not-allowed",fontSize:14,fontWeight:800,display:"flex",alignItems:"center",gap:8,transition:"all .2s",boxShadow:settingsDirty?"0 4px 18px rgba(124,58,237,.4)":"none"}}>
                  ✅ {l.sSave}
                </button>
              </div>
            </div>
          )}

          {/* ── SUBSCRIPTION TAB ── */}
          {tab==="subscription"&&(
            <div style={{animation:"fadeUp .4s ease both",maxWidth:680}}>
              <h2 style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:6}}>
                💳 {lang==="ar"?"اشتراكي":lang==="fr"?"Mon Abonnement":"My Subscription"}
              </h2>
              <p style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:24}}>
                {lang==="ar"?"تفاصيل باقتك الحالية وتجديد الاشتراك":lang==="fr"?"Détails de votre abonnement actuel":"Your current subscription details"}
              </p>

              {/* Status Banner */}
              {(subExpired||subCritical||subWarning)&&(
                <div style={{background:subExpired||subCritical?"rgba(239,68,68,.08)":"rgba(245,158,11,.08)",border:`1px solid ${subColor}33`,borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:18}}>{subExpired?"⛔":subCritical?"🔴":"⚠️"}</span>
                  <span style={{fontSize:13,fontWeight:700,color:subColor}}>
                    {subExpired
                      ? (lang==="ar"?"انتهى اشتراكك! يرجى التجديد فوراً":lang==="fr"?"Votre abonnement a expiré!":"Your subscription has expired!")
                      : subCritical
                      ? (lang==="ar"?`ينتهي اشتراكك خلال ${d} أيام`:lang==="fr"?`Expire dans ${d} jours`:`Expires in ${d} days`)
                      : (lang==="ar"?`تنبيه: ${d} يوم متبقي`:lang==="fr"?`${d} jours restants`:`${d} days remaining`)}
                  </span>
                </div>
              )}

              {/* Plan Card */}
              {(()=>{
                const planKey = subData.plan;
                const plan = PLAN_INFO[planKey]||PLAN_INFO.standard;
                const ringSize=80,stroke=5,r=(ringSize-stroke*2)/2,circ=2*Math.PI*r,dash=circ*(1-pct);
                return (
                  <div style={{background:"rgba(255,255,255,.035)",border:`1px solid ${plan.color}33`,borderRadius:20,padding:24,marginBottom:16}}>
                    <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:20,flexWrap:"wrap"}}>
                      {/* Ring */}
                      <div style={{position:"relative",width:ringSize,height:ringSize,flexShrink:0}}>
                        <svg width={ringSize} height={ringSize} style={{transform:"rotate(-90deg)"}}>
                          <circle cx={ringSize/2} cy={ringSize/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke}/>
                          <circle cx={ringSize/2} cy={ringSize/2} r={r} fill="none" stroke={subColor} strokeWidth={stroke}
                            strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
                            style={{transition:"stroke-dashoffset .6s ease"}}/>
                        </svg>
                        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                          {subExpired
                            ? <span style={{fontSize:10,color:"#EF4444",fontWeight:900}}>منتهي</span>
                            : <><span style={{fontSize:18,fontWeight:900,color:subColor,lineHeight:1}}>{d}</span><span style={{fontSize:8,color:"rgba(255,255,255,.35)"}}>يوم</span></>
                          }
                        </div>
                      </div>

                      {/* Plan info */}
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                          <span style={{fontSize:24}}>{plan.icon}</span>
                          <span style={{fontSize:20,fontWeight:900,color:"#fff"}}>
                            {lang==="ar"?"باقة":lang==="fr"?"Formule":"Plan"} {plan.label}
                          </span>
                          <span style={{background:plan.color+"22",color:plan.color,borderRadius:8,padding:"3px 12px",fontSize:12,fontWeight:700}}>
                            {lang==="ar"?"نشط":lang==="fr"?"Actif":"Active"}
                          </span>
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                          {[
                            [lang==="ar"?"السعر الشهري":lang==="fr"?"Prix/mois":"Monthly Price", `${subData.monthlyPrice.toLocaleString()} ${lang==="ar"?"دج":"DZD"}`],
                            [lang==="ar"?"مدة الاشتراك":lang==="fr"?"Durée":"Duration", `${subData.subscriptionMonths} ${lang==="ar"?"شهر":lang==="fr"?"mois":"months"}`],
                            [lang==="ar"?"تاريخ البداية":lang==="fr"?"Début":"Start", new Date(subData.subscriptionStart).toLocaleDateString(lang==="ar"?"ar-DZ":lang==="fr"?"fr-FR":"en-GB")],
                            [lang==="ar"?"تاريخ الانتهاء":lang==="fr"?"Fin":"End", new Date(subData.subscriptionEnd).toLocaleDateString(lang==="ar"?"ar-DZ":lang==="fr"?"fr-FR":"en-GB")],
                          ].map(([lbl,val])=>(
                            <div key={lbl} style={{background:"rgba(255,255,255,.04)",borderRadius:10,padding:"9px 12px"}}>
                              <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:3}}>{lbl}</div>
                              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{val}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div style={{marginBottom:4}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(255,255,255,.35)",marginBottom:6}}>
                        <span>{lang==="ar"?"مدة الاشتراك":lang==="fr"?"Durée":""}</span>
                        <span style={{color:subColor,fontWeight:700}}>{Math.round(pct*100)}% {lang==="ar"?"متبقي":"remaining"}</span>
                      </div>
                      <div style={{height:6,background:"rgba(255,255,255,.06)",borderRadius:99,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${pct*100}%`,background:`linear-gradient(90deg,${subColor},${subColor}aa)`,borderRadius:99,transition:"width .6s"}}/>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Features */}
              <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:20,marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:12}}>
                  {lang==="ar"?"مزايا باقتك":lang==="fr"?"Avantages inclus":"Included benefits"}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {(PLAN_INFO[subData.plan]||PLAN_INFO.standard).features[lang==="en"?"en":lang==="fr"?"fr":"ar"].map(f=>(
                    <div key={f} style={{display:"flex",alignItems:"center",gap:8,background:"rgba(52,211,153,.06)",border:"1px solid rgba(52,211,153,.15)",borderRadius:9,padding:"8px 12px"}}>
                      <span style={{color:"#34D399",fontSize:14}}>✓</span>
                      <span style={{fontSize:12,color:"rgba(255,255,255,.75)"}}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal / Plan change actions */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                {/* Renew button */}
                <div style={{background:"rgba(124,58,237,.07)",border:"1px solid rgba(124,58,237,.2)",borderRadius:16,padding:18}}>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:6}}>
                    🔄 {lang==="ar"?"تجديد الاشتراك":lang==="fr"?"Renouveler":"Renew Subscription"}
                  </div>
                  <p style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:12,lineHeight:1.5}}>
                    {lang==="ar"?"أرسل طلب تجديد للإدارة للموافقة عليه":lang==="fr"?"Envoyez une demande de renouvellement à l'administration":"Send a renewal request to the administration"}
                  </p>
                  {renewalSent?(
                    <div style={{background:"rgba(52,211,153,.08)",border:"1px solid rgba(52,211,153,.2)",borderRadius:9,padding:"10px 14px",fontSize:12,color:"#34D399",fontWeight:700}}>
                      ✅ {lang==="ar"?"تم إرسال الطلب — في انتظار الموافقة":lang==="fr"?"Demande envoyée — en attente":"Request sent — awaiting approval"}
                    </div>
                  ):showRenewForm?(
                    <div>
                      <div style={{marginBottom:10}}>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:6}}>{lang==="ar"?"مدة التجديد":lang==="fr"?"Durée":"Duration"}</div>
                        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                          {[1,3,6,12].map(m=>(
                            <button key={m} onClick={()=>setRenewalMonths(m)}
                              style={{background:renewalMonths===m?"linear-gradient(135deg,#7C3AED,#4F46E5)":"rgba(255,255,255,.06)",border:`1px solid ${renewalMonths===m?"#7C3AED":"rgba(255,255,255,.1)"}`,color:renewalMonths===m?"#fff":"rgba(255,255,255,.5)",borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:700}}>
                              {m}{lang==="ar"?"ش":lang==="fr"?"m":"mo"}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{marginBottom:10}}>
                        <textarea value={renewalNote} onChange={e=>setRenewalNote(e.target.value)} rows={2}
                          placeholder={lang==="ar"?"ملاحظات إضافية (اختياري)":lang==="fr"?"Notes supplémentaires (optionnel)":"Additional notes (optional)"}
                          style={{width:"100%",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,color:"#fff",padding:"8px 10px",fontSize:12,resize:"none",fontFamily:"inherit"}}/>
                      </div>
                      <div style={{display:"flex",gap:7}}>
                        <button onClick={sendRenewalRequest}
                          style={{flex:1,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",borderRadius:9,padding:"9px",cursor:"pointer",fontSize:12,fontWeight:800}}>
                          📤 {lang==="ar"?"إرسال الطلب":"Envoyer"}
                        </button>
                        <button onClick={()=>setShowRenewForm(false)}
                          style={{background:"rgba(255,255,255,.05)",border:"none",color:"rgba(255,255,255,.4)",borderRadius:9,padding:"9px 12px",cursor:"pointer",fontSize:12}}>✕</button>
                      </div>
                    </div>
                  ):(
                    <button onClick={()=>setShowRenewForm(true)}
                      style={{width:"100%",background:"linear-gradient(135deg,rgba(124,58,237,.3),rgba(79,70,229,.2))",border:"1px solid rgba(124,58,237,.4)",color:"#C084FC",borderRadius:10,padding:"10px",cursor:"pointer",fontSize:13,fontWeight:800}}>
                      🔄 {lang==="ar"?"طلب تجديد":lang==="fr"?"Demander renouvellement":"Request Renewal"}
                    </button>
                  )}
                </div>

                {/* Plan change */}
                <div style={{background:"rgba(245,158,11,.06)",border:"1px solid rgba(245,158,11,.18)",borderRadius:16,padding:18}}>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:6}}>
                    ⚡ {lang==="ar"?"تعديل الباقة":lang==="fr"?"Changer de formule":"Change Plan"}
                  </div>
                  <p style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:12,lineHeight:1.5}}>
                    {lang==="ar"?"اطلب الترقية أو تعديل باقتك الحالية":lang==="fr"?"Demandez une mise à niveau ou un changement de formule":"Request an upgrade or plan change"}
                  </p>
                  {changePlanReq?(
                    <div style={{background:"rgba(52,211,153,.08)",border:"1px solid rgba(52,211,153,.2)",borderRadius:9,padding:"10px 14px",fontSize:12,color:"#34D399",fontWeight:700}}>
                      ✅ {lang==="ar"?"تم إرسال طلب التعديل":lang==="fr"?"Demande envoyée":"Change request sent"}
                    </div>
                  ):(
                    <div>
                      <select value={requestedPlan} onChange={e=>setRequestedPlan(e.target.value)}
                        style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(245,158,11,.3)",borderRadius:9,color:"#fff",padding:"8px 12px",fontSize:12,marginBottom:9,fontFamily:"inherit"}}>
                        {Object.entries(PLAN_INFO).map(([k,p])=><option key={k} value={k}>{p.icon} {p.label} — {k==="basic"?3500:k==="standard"?5000:8000} {lang==="ar"?"دج/شهر":"DZD/mois"}</option>)}
                      </select>
                      <button onClick={sendPlanChangeRequest} disabled={requestedPlan===subData.plan}
                        style={{width:"100%",background:requestedPlan===subData.plan?"rgba(255,255,255,.04)":"linear-gradient(135deg,rgba(245,158,11,.3),rgba(245,158,11,.15))",border:`1px solid ${requestedPlan===subData.plan?"rgba(255,255,255,.08)":"rgba(245,158,11,.4)"}`,color:requestedPlan===subData.plan?"rgba(255,255,255,.25)":"#FCD34D",borderRadius:10,padding:"10px",cursor:requestedPlan===subData.plan?"not-allowed":"pointer",fontSize:13,fontWeight:800}}>
                        ⚡ {lang==="ar"?"طلب التعديل":lang==="fr"?"Demander":"Request Change"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact admin note */}
              <div style={{background:"rgba(59,130,246,.06)",border:"1px solid rgba(59,130,246,.15)",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:18,flexShrink:0}}>ℹ️</span>
                <p style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.6,margin:0}}>
                  {lang==="ar"
                    ? "يتم مراجعة جميع طلبات التجديد وتعديل الباقة من طرف الإدارة خلال 24 ساعة. في حال الاستعجال يمكنك التواصل مع الدعم."
                    : lang==="fr"
                    ? "Toutes les demandes sont examinées par l'administration dans les 24h. En cas d'urgence, contactez le support."
                    : "All renewal and plan change requests are reviewed by the administration within 24 hours. For urgent matters, contact support."
                  }
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}



function mapAgencyProfile(profile, agencyRow={}) {
  const name = agencyRow.name || agencyRow.agency_name || profile.agency_name || profile.full_name || profile.username || "Agency";
  const cityName = agencyRow.city || agencyRow.wilaya_name || "";
  return {
    id: agencyRow.id || profile.agency_id,
    ar: agencyRow.name_ar || agencyRow.ar || name,
    fr: agencyRow.name_fr || agencyRow.fr || name,
    city:{ar:cityName || agencyRow.wilaya || "", fr:cityName || agencyRow.wilaya || ""},
    wilaya: agencyRow.wilaya || "16",
    initials: String(name).slice(0,2),
    rating: Number(agencyRow.rating || 0), trips: Number(agencyRow.trips || agencyRow.bookings_count || 0), exp: Number(agencyRow.experience || agencyRow.exp || 1),
    verified: Boolean(agencyRow.verified), phone: agencyRow.phone || profile.phone || "",
    about:{ar:agencyRow.description_ar || agencyRow.description || "", fr:agencyRow.description_fr || agencyRow.description || "", en:agencyRow.description_en || agencyRow.description || ""},
    plan: agencyRow.plan || agencyRow.subscription_plan || "basic",
    monthlyPrice: Number(agencyRow.monthly_price || 0),
    subscriptionStart: agencyRow.subscription_start || null,
    subscriptionEnd: agencyRow.subscription_end || null,
    subscriptionMonths: Number(agencyRow.subscription_months || 0),
    renewalRequest: Boolean(agencyRow.renewal_request),
  };
}
function mapBookingRow(row){ return { id:row.id, agencyId:row.agency_id, carName:row.car_name || "سيارة", clientName:row.driver_name || row.user_name || row.client_name || "مستخدم", clientPhone:row.driver_phone || row.client_phone || "", from:row.pickup_date || row.from || "", to:row.return_date || row.to || "", days:Number(row.days || 1), total:Number(row.total_price || row.price || 0), status:row.status || "pending", time:row.created_at || ""}; }
function mapMessageRow(row){ return { id:row.thread_id || row.id, agencyId:row.agency_id, msgs:[{id:row.id, from:row.direction === "agency_to_user" ? "agency" : "user", text:row.body || row.subject || "رسالة", time:row.created_at || "", status:row.status || "delivered"}]}; }
function groupMessages(rows){
  const by={};
  rows.forEach(r=>{ const k=r.thread_id || r.id; if(!by[k]) by[k]={id:k,agencyId:r.agency_id,msgs:[]}; by[k].msgs.push({id:r.id,from:r.direction === "agency_to_user" ? "agency" : "user",text:r.body || r.subject || "رسالة",time:r.created_at || "",status:r.status || "delivered"}); });
  return Object.values(by);
}

// ────────────────────────────────────────────────────────────────────────────
// STANDALONE AGENCY PORTAL APP
// ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("ar");

  // ── Qatar2022Font injection ────────────────────────────────────────────
  useEffect(() => {
    const id = "qatar2022-font-style";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = FONT_STYLE;
      document.head.appendChild(el);
    }
  }, []);
  const [loggedIn, setLoggedIn] = useState(null); // agency object when logged in
  const [bookings, setBookings] = useState([]);
  const [convs, setConvs] = useState([]);
  const [userCars, setUserCars] = useState([]);
  const [loginForm, setLoginForm] = useState({username:"", password:""});
  const [loginErr, setLoginErr] = useState("");

  const rtl = lang === "ar";

  const handleLogin = async () => {
    setLoginErr("");
    if(!supabaseReady) { setLoginErr(lang==="ar"?"أضف متغيرات Supabase في Vercel أولاً":"Set Supabase environment variables first"); return; }
    try {
      const username = String(loginForm.username||"").trim().toLowerCase();
      const {data: profiles, error: pErr} = await supabase.from("profiles").select("*").eq("username", username).limit(1);
      if(pErr) throw pErr;
      const profile = profiles?.[0];
      if(!profile || profile.role !== "agency") throw new Error(lang==="ar"?"هذا الحساب لا يملك صلاحية الوكالة":"This account is not an agency account");
      if(profile.status && profile.status !== "active") throw new Error(lang==="ar"?"الحساب غير مفعّل":"Account is not active");
      const {error: authError} = await supabase.auth.signInWithPassword({email: profile.email, password: loginForm.password});
      if(authError) throw authError;
      const {data: agRows} = await supabase.from("agencies").select("*").eq("id", profile.agency_id).limit(1);
      const ag = mapAgencyProfile(profile, agRows?.[0] || {});
      const filter = profile.agency_id;
      const [bRes,mRes,cRes] = await Promise.all([
        supabase.from("bookings").select("*").eq("agency_id", filter).order("created_at",{ascending:false}),
        supabase.from("messages").select("*").eq("agency_id", filter).order("created_at",{ascending:true}),
        supabase.from("cars").select("*").eq("agency_id", filter).order("created_at",{ascending:false}),
      ]);
      if(Array.isArray(bRes.data)) setBookings(bRes.data.map(mapBookingRow));
      if(Array.isArray(mRes.data)) setConvs(groupMessages(mRes.data));
      if(Array.isArray(cRes.data)) setUserCars(cRes.data.map(c=>({id:c.id,agencyId:c.agency_id,name:c.name||c.car_name||"سيارة",price:Number(c.price||0),image:c.img||c.image||"",status:c.status||"pending"})));
      setLoggedIn(ag);
      setLoginErr("");
    } catch(e) { setLoginErr(e.message || (lang==="ar"?"اسم المستخدم أو كلمة المرور غير صحيحة":"Invalid username or password")); }
  };

  if (loggedIn) {
    return (
      <AgencyPortal
        lang={lang}
        agency={loggedIn}
        bookings={bookings.filter(b => b.agencyId === loggedIn.id)}
        setBookings={setBookings}
        convs={convs.filter(c => c.agencyId === loggedIn.id)}
        setConvs={setConvs}
        userCars={userCars.filter(c => c.agencyId === loggedIn.id)}
        setUserCars={setUserCars}
        allWilayas={ALL_WILAYAS}
        onLogout={() => { setLoggedIn(null); setLoginForm({username:"",password:""}); }}
      />
    );
  }

  // Login Screen
  return (
    <div style={{fontFamily:rtl?"'Qatar2022Font','Cairo','Tajawal',sans-serif":"'Qatar2022Font','Outfit',sans-serif",direction:rtl?"rtl":"ltr",background:"#06060F",color:"#F1F5F9",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Outfit:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input:focus{outline:none!important;border-color:rgba(139,92,246,.65)!important;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <div style={{width:"100%",maxWidth:420,animation:"fadeUp .5s ease both"}}>
        {/* Language switcher */}
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:28}}>
          {[{k:"ar",label:"عربي"},{k:"fr",label:"FR"},{k:"en",label:"EN"}].map(({k,label})=>(
            <button key={k} onClick={()=>setLang(k)} style={{background:lang===k?"rgba(124,58,237,.2)":"rgba(255,255,255,.04)",border:`1px solid ${lang===k?"rgba(124,58,237,.6)":"rgba(255,255,255,.1)"}`,color:lang===k?"#C084FC":"rgba(255,255,255,.5)",padding:"6px 14px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700}}>{label}</button>
          ))}
        </div>

        {/* Logo + title */}
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:72,height:72,borderRadius:20,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:"0 0 40px rgba(124,58,237,.5)"}}>
            <span style={{fontSize:32}}>🏢</span>
          </div>
          <div style={{fontSize:26,fontWeight:900,color:"#fff",marginBottom:6,fontFamily:"'Qatar2022Font','Cairo',sans-serif"}}>
            {lang==="ar"?"بوابة الوكالة":lang==="fr"?"Portail Agence":"Agency Portal"}
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.4)"}}>
            {lang==="ar"?"RENT درايف — منصة التأجير الجزائرية":"RENT Drive — Algeria's Car Rental Platform"}
          </div>
        </div>

        {/* Login Card */}
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(124,58,237,.2)",borderRadius:20,padding:"32px 28px"}}>
          <div style={{marginBottom:20}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>
              {lang==="ar"?"اسم المستخدم":lang==="fr"?"Nom d'utilisateur":"Username"}
            </label>
            <input
              value={loginForm.username}
              onChange={e=>setLoginForm(f=>({...f,username:e.target.value}))}
              placeholder={lang==="ar"?"اسم المستخدم":"Username"}
              style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:11,color:"#fff",padding:"12px 15px",fontSize:14,fontFamily:"inherit"}}
            />
          </div>
          <div style={{marginBottom:8}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>
              {lang==="ar"?"كلمة المرور":lang==="fr"?"Mot de passe":"Password"}
            </label>
            <input
              type="password"
              value={loginForm.password}
              onChange={e=>setLoginForm(f=>({...f,password:e.target.value}))}
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              placeholder="••••••••"
              style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.12)",borderRadius:11,color:"#fff",padding:"12px 15px",fontSize:14,fontFamily:"inherit"}}
            />
          </div>
          {loginErr&&<div style={{background:"rgba(239,68,68,.09)",border:"1px solid rgba(239,68,68,.22)",borderRadius:9,padding:"9px 13px",fontSize:12,color:"#FCA5A5",marginBottom:14}}>⚠️ {loginErr}</div>}
          <button
            onClick={handleLogin}
            style={{width:"100%",background:"linear-gradient(135deg,#7C3AED,#4F46E5)",border:"none",color:"#fff",padding:"13px",borderRadius:11,cursor:"pointer",fontSize:15,fontWeight:800,marginTop:16,boxShadow:"0 6px 24px rgba(124,58,237,.4)",transition:"opacity .2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=".9"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}
          >
            {lang==="ar"?"دخول →":lang==="fr"?"Se connecter →":"Sign In →"}
          </button>
        </div>

        <div style={{textAlign:"center",marginTop:20,fontSize:11,color:"rgba(255,255,255,.2)"}}>
          © 2026 RENT درايف — Agency
        </div>
      </div>
    </div>
  );
}
