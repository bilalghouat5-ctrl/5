import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const supabase = createClient(SUPABASE_URL || "https://placeholder.supabase.co", SUPABASE_ANON_KEY || "placeholder-anon-key", {
  auth: { persistSession: true, autoRefreshToken: true }
});

// ═══════════════════════════════════════════════════════════════
// DRIVERENT — لوحة التحكم الرئيسية | Admin Control Panel
// ═══════════════════════════════════════════════════════════════
const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
  @font-face {
    font-family: 'Qatar2022Font';
    src: url('https://fonts.gstatic.com/s/cairo/v28/SLXVc1nY6HkvangtZmpcWmhzfH5lWWgcQyypdqSNBA.woff2') format('woff2');
    font-weight: 400 900; font-style: normal; font-display: swap;
  }
  * { font-family: 'Qatar2022Font','Cairo','Tajawal','Segoe UI',Arial,sans-serif !important; box-sizing:border-box; }
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track{background:rgba(255,255,255,.03)}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:3px}
  input,select,textarea{outline:none}
  select{color:#fff!important;background:#0F0F1A!important}
  select option{color:#fff!important;background:#0F0F1A!important}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
  @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes sliderMove{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  .adm-sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:148;backdrop-filter:blur(4px);}
  .adm-sidebar{transition:transform .28s cubic-bezier(.4,0,.2,1);}
  @media(max-width:768px){
    .adm-sidebar{position:fixed!important;top:60px!important;right:0!important;height:calc(100vh - 60px)!important;z-index:149!important;transform:translateX(0);}
    .adm-sidebar.closed{transform:translateX(100%)!important;}
    .adm-sidebar-overlay.open{display:block!important;}
    .adm-main{padding:16px!important;}
    .adm-header-name{display:none!important;}
    .adm-stats-grid{grid-template-columns:1fr 1fr!important;}
    .adm-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
    .adm-table-wrap table{min-width:600px;}
    .adm-plan-grid{grid-template-columns:1fr!important;}
    .adm-form-2col{grid-template-columns:1fr!important;}
  }
  @media(min-width:769px){
    .adm-sidebar{position:sticky!important;transform:none!important;}
    .adm-sidebar.closed{width:0!important;min-width:0!important;}
  }
  @media(max-width:480px){
    input,select,textarea{font-size:16px!important;}
    button{min-height:40px;}
  }
`;

// ── Icons — Modern SVG set ─────────────────────────────────────
const I = {
  Dashboard:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>,
  Agencies:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>,
  Cars:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l2-4h10l2 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2"/><circle cx="7.5" cy="17" r="2.5"/><circle cx="16.5" cy="17" r="2.5"/><path d="M7.5 14.5h9"/></svg>,
  Bookings:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2.5"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14l2 2 4-4"/></svg>,
  Messages:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="12" y2="14"/></svg>,
  Reviews:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Admins:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75"/><path d="M21 21v-2a4 4 0 00-3-3.85"/></svg>,
  Notifications:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Profile:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  Shield:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Check:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Eye:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Edit:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  Star:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Pin:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Plus:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Search:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Menu:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>,
  ChevDown:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevRight:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Crown:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M4 20l2-10 6 6 6-6 2 10"/><circle cx="12" cy="7" r="2"/></svg>,
  Block:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  Clock:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Map:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  DZ:()=><span style={{fontSize:16}}>🇩🇿</span>,
  Logout:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Warning:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Send:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Slider:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M8 7V5m8 2V5M8 17v2m8-2v2"/></svg>,
  Requests:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="11" y2="17"/></svg>,
  Pricing:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2M9.5 9a2.5 2.5 0 015 0c0 1.5-1 2-2.5 3s-2.5 1.5-2.5 3a2.5 2.5 0 005 0"/></svg>,
  Toggle:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="7"/><circle cx="16" cy="12" r="4" fill="currentColor"/></svg>,
  ToggleOff:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="7"/><circle cx="8" cy="12" r="4" fill="currentColor"/></svg>,
  Renew:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>,
};

// ── Wilayas ───────────────────────────────────────────────────
const WILAYAS = [
  {c:"01",ar:"أدرار"},{c:"02",ar:"الشلف"},{c:"03",ar:"الأغواط"},{c:"04",ar:"أم البواقي"},
  {c:"05",ar:"باتنة"},{c:"06",ar:"بجاية"},{c:"07",ar:"بسكرة"},{c:"08",ar:"بشار"},
  {c:"09",ar:"البليدة"},{c:"10",ar:"البويرة"},{c:"11",ar:"تمنراست"},{c:"12",ar:"تبسة"},
  {c:"13",ar:"تلمسان"},{c:"14",ar:"تيارت"},{c:"15",ar:"تيزي وزو"},{c:"16",ar:"الجزائر"},
  {c:"17",ar:"الجلفة"},{c:"18",ar:"جيجل"},{c:"19",ar:"سطيف"},{c:"20",ar:"سعيدة"},
  {c:"21",ar:"سكيكدة"},{c:"22",ar:"سيدي بلعباس"},{c:"23",ar:"عنابة"},{c:"24",ar:"قالمة"},
  {c:"25",ar:"قسنطينة"},{c:"26",ar:"المدية"},{c:"27",ar:"مستغانم"},{c:"28",ar:"المسيلة"},
  {c:"29",ar:"معسكر"},{c:"30",ar:"ورقلة"},{c:"31",ar:"وهران"},{c:"32",ar:"البيض"},
  {c:"33",ar:"إليزي"},{c:"34",ar:"برج بوعريريج"},{c:"35",ar:"بومرداس"},{c:"36",ar:"الطارف"},
  {c:"37",ar:"تندوف"},{c:"38",ar:"تيسمسيلت"},{c:"39",ar:"الوادي"},{c:"40",ar:"خنشلة"},
  {c:"41",ar:"سوق أهراس"},{c:"42",ar:"تيبازة"},{c:"43",ar:"ميلة"},{c:"44",ar:"عين الدفلى"},
  {c:"45",ar:"النعامة"},{c:"46",ar:"عين تموشنت"},{c:"47",ar:"غرداية"},{c:"48",ar:"غليزان"},
  {c:"49",ar:"تيميمون"},{c:"50",ar:"برج باجي مختار"},{c:"51",ar:"أولاد جلال"},{c:"52",ar:"بني عباس"},
  {c:"53",ar:"إن صالح"},{c:"54",ar:"إن ڤزام"},{c:"55",ar:"توقرت"},{c:"56",ar:"جانت"},
  {c:"57",ar:"المغير"},{c:"58",ar:"المنيعة"},
];

// ── Mock Data ─────────────────────────────────────────────────
const INIT_AGENCIES = [];

const INIT_CARS = [];

const INIT_BOOKINGS = [];

const INIT_REVIEWS = [];

// Admin accounts with roles
const ADMIN_ACCOUNTS = [];

const ROLES = {
  superadmin:{label:"مدير عام",color:"#7C3AED",perm:"all"},
  agencies:{label:"مشرف وكالات",color:"#0EA5E9",perm:"agencies"},
  messages:{label:"مشرف رسائل",color:"#10B981",perm:"messages"},
  reviews:{label:"مشرف تعليقات",color:"#F59E0B",perm:"reviews"},
};

// ── Helpers ────────────────────────────────────────────────────
const getWilaya = (c) => WILAYAS.find(w=>w.c===c)?.ar || c;
const daysLeft = (end) => {
  if(!end) return 0;
  const diff = new Date(end) - new Date();
  return Math.max(0, Math.ceil(diff/(1000*60*60*24)));
};
const totalDays = (start, end) => {
  if(!start||!end) return 30;
  const diff = new Date(end) - new Date(start);
  return Math.max(1, Math.ceil(diff/(1000*60*60*24)));
};
const formatDate = (d) => d ? new Date(d).toLocaleDateString("ar-DZ") : "—";

// ── Subscription Countdown Ring Component ──────────────────────
function SubCountdown({agency, onRenew, compact=false}) {
  const d = daysLeft(agency.subscriptionEnd);
  const total = totalDays(agency.subscriptionStart, agency.subscriptionEnd);
  const pct = agency.subscriptionEnd ? Math.max(0, Math.min(1, d/total)) : 0;
  const expired = d===0 && agency.subscriptionEnd;
  const critical = d<=3 && d>0;
  const warning = d<=7 && d>3;
  const color = expired?"#EF4444":critical?"#EF4444":warning?"#F59E0B":"#10B981";
  const size = compact ? 44 : 56;
  const stroke = compact ? 3.5 : 4;
  const r = (size-stroke*2)/2;
  const circ = 2*Math.PI*r;
  const dash = circ * (1-pct);

  if(!agency.subscriptionEnd) return (
    <span style={{fontSize:11,color:S.textDim}}>—</span>
  );

  return (
    <div style={{display:"flex",alignItems:"center",gap:compact?6:8}}>
      <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
        <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={stroke}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
            strokeDasharray={circ} strokeDashoffset={dash}
            strokeLinecap="round"
            style={{transition:"stroke-dashoffset .6s ease, stroke .4s ease"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
          {expired
            ? <span style={{fontSize:compact?8:9,color:S.red,fontWeight:900,lineHeight:1}}>منتهي</span>
            : <>
                <span style={{fontSize:compact?11:14,fontWeight:900,color,lineHeight:1}}>{d}</span>
                {!compact&&<span style={{fontSize:8,color:S.textDim,lineHeight:1}}>يوم</span>}
              </>
          }
        </div>
      </div>
      <div>
        <div style={{fontSize:11,fontWeight:700,color:expired?S.red:critical?S.red:warning?S.amber:S.textMuted,marginBottom:2}}>
          {expired?"انتهى الاشتراك":critical?`⚠ ينتهي خلال ${d} أيام`:warning?`تنبيه: ${d} يوم`:`${d} يوم متبقي`}
        </div>
        <div style={{fontSize:10,color:S.textDim}}>{formatDate(agency.subscriptionEnd)}</div>
        {(expired||critical)&&onRenew&&(
          <button onClick={e=>{e.stopPropagation();onRenew(agency.id);}}
            style={{marginTop:3,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:5,padding:"3px 9px",cursor:"pointer",fontSize:10,fontWeight:700}}>
            🔄 تجديد
          </button>
        )}
      </div>
    </div>
  );
}

const S = {
  /* Colors */
  bg:"#0A0A12", bgCard:"rgba(255,255,255,.04)", bgCard2:"rgba(255,255,255,.06)",
  border:"rgba(255,255,255,.08)", border2:"rgba(255,255,255,.14)",
  text:"#F1F0E8", textMuted:"rgba(255,255,255,.45)", textDim:"rgba(255,255,255,.25)",
  purple:"#7C3AED", purpleLight:"rgba(124,58,237,.15)", purpleBright:"#9F67F8",
  green:"#10B981", red:"#EF4444", amber:"#F59E0B", blue:"#3B82F6",
  sidebar:180,
};


function adminProfileToSession(profile) {
  const role = profile.role === "admin" ? "superadmin" : (profile.role || "admin_staff");
  const permissionsObject = profile.permissions && typeof profile.permissions === "object" ? profile.permissions : {};
  const permissions = role === "superadmin" ? ["all"] : Object.entries(permissionsObject).filter(([,v])=>Boolean(v)).map(([k])=>k);
  return {
    id: profile.id,
    name: profile.full_name || profile.name || profile.username || "Admin",
    username: profile.username || profile.email || "admin",
    email: profile.email || "",
    role,
    avatar: (profile.full_name || profile.username || "A").slice(0,1),
    permissions,
    active: (profile.status || "active") === "active",
    createdAt: profile.created_at || new Date().toISOString().slice(0,10),
  };
}
function mapAgencyRow(r){
  return {
    id:r.id, name:r.name||r.ar||r.agency_name||"وكالة", owner:r.owner_name||r.owner||r.full_name||"", phone:r.phone||"", wilaya:r.wilaya||r.city||"00", email:r.email||"",
    status:r.status||"pending", verified:Boolean(r.verified), featured:Boolean(r.featured), plan:r.plan||r.subscription_plan||"basic", monthlyPrice:Number(r.monthly_price||r.monthlyPrice||0),
    subscriptionMonths:Number(r.subscription_months||r.subscriptionMonths||0), subscriptionStart:r.subscription_start||r.subscriptionStart||null, subscriptionEnd:r.subscription_end||r.subscriptionEnd||null,
    cars:Number(r.cars_count||r.cars||0), bookings:Number(r.bookings_count||r.bookings||0), rating:Number(r.rating||0), pendingApproval:(r.status||"")==="pending", renewalRequest:Boolean(r.renewal_request), suspended:(r.status||"")==="suspended",
    createdAt:r.created_at||new Date().toISOString(), messages:[],
  };
}
function mapCarRow(r){ return {id:r.id, name:r.name||r.car_name||"سيارة", agencyId:r.agency_id, agency:r.agency_name||"", brand:r.brand||"", model:r.model||"", price:Number(r.price||0), wilaya:r.wilaya||"00", status:r.status||"pending", isNew:(r.status||"")==="pending", image:r.img||r.image||""}; }
function mapBookingRow(r){ return {id:r.id, agencyId:r.agency_id, customer:r.driver_name||r.user_name||r.client_name||"مستخدم", phone:r.driver_phone||r.client_phone||"", car:r.car_name||"سيارة", wilaya:r.wilaya||"00", price:Number(r.total_price||r.price||0), platformFee:Number(r.platform_fee||0), status:r.status||"pending", createdAt:r.created_at||""}; }
function mapReviewRow(r){ return {id:r.id, agencyId:r.agency_id, agency:r.agency_name||"وكالة", user:r.user_name||"مستخدم", rating:Number(r.rating||0), text:r.comment||r.text||"", status:r.status||"pending", createdAt:r.created_at||""}; }
function mapAdminRow(r){ return adminProfileToSession(r); }

// ══════════════════════════════════════════════════════════════
export default function AdminPanel() {
  const [auth, setAuth] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [agencies, setAgencies] = useState(INIT_AGENCIES);
  const [cars, setCars] = useState(INIT_CARS);
  const [bookings, setBookings] = useState(INIT_BOOKINGS);
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const [admins, setAdmins] = useState(ADMIN_ACCOUNTS);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Shared user requests (from DriveRENT via localStorage) ──
  const [userRequests, setUserRequests] = useState([]);
  const refreshUserRequests=()=>{
    if(!supabaseReady) return;
    supabase.from("pending_requests").select("*").eq("status","pending").order("request_date",{ascending:false})
      .then(({data})=>{
        if(Array.isArray(data)) {
          setUserRequests(data.map(r=>({
            id:r.id,username:r.username,name:r.name||r.username,
            phone:r.phone,avatar:r.avatar,status:r.status||"pending",requestDate:r.request_date,
          })));
        }
      });
  };
  const pendingUserCount = userRequests.filter(r=>r.status==="pending").length;
  const [notifications, setNotifications] = useState([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [selectedConvAgency, setSelectedConvAgency] = useState(null);
  const [loginForm, setLoginForm] = useState({username:"",password:""});
  const [loginErr, setLoginErr] = useState("");

  async function loadAdminData() {
    if(!supabaseReady) return;
    const [agRes,cRes,bRes,rRes,pRes] = await Promise.all([
      supabase.from("agencies").select("*").order("created_at",{ascending:false}),
      supabase.from("cars").select("*").order("created_at",{ascending:false}),
      supabase.from("bookings").select("*").order("created_at",{ascending:false}),
      supabase.from("reviews").select("*").order("created_at",{ascending:false}),
      supabase.from("profiles").select("*").in("role",["admin","admin_staff"]).order("created_at",{ascending:false}),
    ]);
    if(Array.isArray(agRes.data)) setAgencies(agRes.data.map(mapAgencyRow));
    if(Array.isArray(cRes.data)) setCars(cRes.data.map(mapCarRow));
    if(Array.isArray(bRes.data)) setBookings(bRes.data.map(mapBookingRow));
    if(Array.isArray(rRes.data)) setReviews(rRes.data.map(mapReviewRow));
    if(Array.isArray(pRes.data)) setAdmins(pRes.data.map(mapAdminRow));
  }


  const unreadCount = notifications.filter(n=>!n.read).length;

  useEffect(()=>{ loadAdminData().catch(()=>{}); },[]);

  // ── Supabase real-time: طلبات التسجيل الجديدة ──────────────────────────
  useEffect(()=>{
    if(!supabaseReady) return;
    refreshUserRequests();
    const channel=supabase.channel("admin_pending_rt")
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"pending_requests"},(payload)=>{
        const r=payload.new;
        setUserRequests(prev=>prev.find(x=>x.id===r.id)?prev:[{
          id:r.id,username:r.username,name:r.name||r.username,
          phone:r.phone,avatar:r.avatar,status:"pending",requestDate:r.request_date,
        },...prev]);
        setAgencies(prev=>{
          if(prev.find(a=>a.id===r.id)) return prev;
          return [{
            id:r.id,name:r.name||r.username,owner:r.name||r.username,
            phone:r.phone,wilaya:"00",email:"",status:"pending",
            verified:false,featured:false,plan:"basic",monthlyPrice:3500,
            subscriptionMonths:0,subscriptionStart:null,subscriptionEnd:null,
            cars:0,bookings:0,rating:0,pendingApproval:true,
            renewalRequest:false,suspended:false,
            createdAt:r.request_date||new Date().toISOString(),messages:[],
          },...prev];
        });
        setNotifications(prev=>[{
          id:"req_"+r.id,type:"new",
          msg:"🔔 طلب تسجيل جديد: "+(r.name||r.username)+" — "+r.phone,
          time:"الآن",read:false,
        },...prev]);
      }).subscribe();
    return ()=>{ channel.unsubscribe(); };
  },[]);

  function canAccess(section) {
    if(!auth) return false;
    if(auth.role==="superadmin") return true;
    return auth.permissions.includes(section);
  }

  async function handleLogin() {
    setLoginErr("");
    if(!supabaseReady) { setLoginErr("أضف متغيرات Supabase في Vercel أولاً"); return; }
    try {
      const username = String(loginForm.username||"").trim().toLowerCase();
      const {data: profiles, error: profileError} = await supabase.from("profiles").select("*").eq("username", username).limit(1);
      if(profileError) throw profileError;
      const profile = profiles?.[0];
      if(!profile || !["admin","admin_staff"].includes(profile.role)) throw new Error("هذا الحساب لا يملك صلاحية الإدارة");
      if(profile.status && profile.status !== "active") throw new Error("الحساب غير مفعّل");
      const {error: authError} = await supabase.auth.signInWithPassword({email: profile.email, password: loginForm.password});
      if(authError) throw authError;
      setAuth(adminProfileToSession(profile)); setPage("dashboard"); await loadAdminData();
    } catch(e) { setLoginErr(e.message || "اسم المستخدم أو كلمة المرور غير صحيحة"); }
  }

  function handleAgencyAction(id, action, value) {
    setAgencies(prev => prev.map(ag => {
      if(ag.id !== id) return ag;
      switch(action) {
        case "approve": return {...ag, status:"active", pendingApproval:false};
        case "reject": return {...ag, status:"rejected", pendingApproval:false};
        case "verify": return {...ag, verified:true};
        case "unverify": return {...ag, verified:false};
        case "suspend": return {...ag, suspended:true, status:"suspended"};
        case "unsuspend": return {...ag, suspended:false, status:"active"};
        case "feature": return {...ag, featured:!ag.featured};
        case "setMonths": return {...ag, subscriptionMonths:value};
        case "setPrice": return {...ag, monthlyPrice:value};
        case "setPlan": return {...ag, plan:value};
        case "setSubscriptionDates": return {...ag, subscriptionStart:value.start, subscriptionEnd:value.end};
        case "approveRenewal": {
          const now = new Date();
          const months = ag.renewalMonths || ag.subscriptionMonths || 1;
          const end = new Date(now);
          end.setMonth(end.getMonth() + months);
          return {...ag,
            subscriptionStart: now.toISOString().split("T")[0],
            subscriptionEnd: end.toISOString().split("T")[0],
            subscriptionMonths: months,
            renewalRequest: false,
            renewalMonths: null,
            renewalRequestDate: null,
            status: "active",
            suspended: false,
          };
        }
        case "rejectRenewal":
          return {...ag, renewalRequest:false, renewalMonths:null, renewalRequestDate:null};
        case "setRenewalMonths":
          return {...ag, renewalMonths:value};
        case "delete": return {...ag, _deleted:true};
        default: return ag;
      }
    }).filter(ag=>!ag._deleted));
  }

  if(!auth) return <LoginScreen form={loginForm} setForm={setLoginForm} onLogin={handleLogin} err={loginErr} />;

  const navItems = [
    {key:"dashboard",   label:"لوحة التحكم",      icon:<I.Dashboard/>,  perm:"all"},
    {key:"agencies",    label:"الوكالات",           icon:<I.Agencies/>,   perm:"agencies"},
    {key:"requests",    label:"طلبات التسجيل",      icon:<I.Requests/>,   perm:"agencies", badge:agencies.filter(a=>a.pendingApproval).length},
    {key:"renewals",    label:"طلبات التجديد",      icon:<I.Renew/>,      perm:"agencies", badge:agencies.filter(a=>a.renewalRequest).length},
    {key:"featured",    label:"الوكالات المميزة",   icon:<I.Slider/>,     perm:"agencies", badge:agencies.filter(a=>a.featured).length},
    {key:"cars",        label:"السيارات",            icon:<I.Cars/>,       perm:"cars",     badge:cars.filter(c=>c.isNew).length},
    {key:"bookings",    label:"الحجوزات",            icon:<I.Bookings/>,   perm:"bookings"},
    {key:"messages",    label:"الرسائل",             icon:<I.Messages/>,   perm:"messages", badge:agencies.filter(a=>a.messages?.length>0).length},
    {key:"reviews",     label:"التعليقات",           icon:<I.Reviews/>,    perm:"reviews",  badge:reviews.filter(r=>r.status==="pending").length},
    {key:"user_accounts",label:"حسابات الزوار",     icon:<I.Admins/>,     perm:"superadmin", badge:pendingUserCount},
    {key:"pricing",     label:"التسعيرة",            icon:<I.Pricing/>,    perm:"superadmin"},
    {key:"admins",      label:"المشرفون",            icon:<I.Admins/>,     perm:"superadmin"},
    {key:"profile",     label:"الملف الشخصي",       icon:<I.Profile/>,    perm:"all"},
  ];

  return (
    <div dir="rtl" style={{minHeight:"100vh",background:S.bg,color:S.text,display:"flex",flexDirection:"column"}}>
      <style>{FONT_STYLE}</style>

      {/* Top Bar */}
      <header style={{height:60,background:"rgba(10,10,18,.95)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${S.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",position:"sticky",top:0,zIndex:100,gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setSidebarOpen(v=>!v)} style={{background:"none",border:"none",color:S.textMuted,cursor:"pointer",padding:4}}>
            <I.Menu/>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🚗</div>
            <span style={{fontWeight:900,fontSize:16,color:"#fff"}}>RENT <span style={{color:S.purpleBright,fontSize:13,fontWeight:700}}>درايف Admin</span></span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {/* Notification Bell */}
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowNotifPanel(v=>!v)} style={{background:"none",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:10,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=S.border2;e.currentTarget.style.color="#fff"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=S.border;e.currentTarget.style.color=S.textMuted}}>
              <I.Notifications/>
              {unreadCount>0&&<span style={{background:S.red,color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{unreadCount}</span>}
            </button>
            {showNotifPanel && <NotifPanel notifications={notifications} setNotifications={setNotifications} setShowNotifPanel={setShowNotifPanel} setPage={setPage} agencies={agencies} />}
          </div>
          {/* Admin Profile */}
          <div style={{display:"flex",alignItems:"center",gap:8,background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,padding:"5px 12px"}}>
            <div style={{width:28,height:28,borderRadius:7,background:ROLES[auth.role]?.color||S.purple,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:"#fff"}}>
              {auth.avatar}
            </div>
            <div className="adm-header-name">
              <div style={{fontSize:12,fontWeight:700,color:"#fff",lineHeight:1.2}}>{auth.name}</div>
              <div style={{fontSize:10,color:S.textDim}}>{ROLES[auth.role]?.label}</div>
            </div>
          </div>
          <button onClick={()=>setAuth(null)} style={{background:"none",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:10,padding:"6px 10px",cursor:"pointer"}}><I.Logout/></button>
        </div>
      </header>

      <div style={{display:"flex",flex:1,position:"relative"}}>
        {/* ── SIDEBAR OVERLAY (mobile) ── */}
        <div className={`adm-sidebar-overlay${sidebarOpen?" open":""}`} onClick={()=>setSidebarOpen(false)}/>

        {/* ── SIDEBAR ── */}
        <aside className={`adm-sidebar${sidebarOpen?"":" closed"}`}
          style={{width:S.sidebar,minWidth:S.sidebar,background:"rgba(10,10,18,.95)",borderLeft:`1px solid ${S.border}`,overflow:"hidden auto",top:60,height:"calc(100vh - 60px)"}}>
          <nav style={{padding:"16px 12px",display:"flex",flexDirection:"column",gap:4}}>
            {navItems.filter(n=>n.perm==="all"||canAccess(n.perm)||auth.role==="superadmin").map(item=>(
              <button key={item.key} onClick={()=>{setPage(item.key);if(window.innerWidth<=768)setSidebarOpen(false);}}
                style={{background:page===item.key?S.purpleLight:"none",border:`1px solid ${page===item.key?S.purple+"44":"transparent"}`,color:page===item.key?"#fff":S.textMuted,borderRadius:10,padding:"11px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"right",fontSize:13,fontWeight:page===item.key?700:400,transition:"all .2s",position:"relative"}}
                onMouseEnter={e=>{if(page!==item.key){e.currentTarget.style.background=S.bgCard2;e.currentTarget.style.color="#fff"}}}
                onMouseLeave={e=>{if(page!==item.key){e.currentTarget.style.background="none";e.currentTarget.style.color=S.textMuted}}}>
                <span style={{color:page===item.key?S.purpleBright:"inherit"}}>{item.icon}</span>
                <span style={{flex:1}}>{item.label}</span>
                {item.badge>0&&<span style={{background:S.red,color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{item.badge}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="adm-main" style={{flex:1,padding:"24px",overflowY:"auto",maxHeight:"calc(100vh - 60px)"}}>
          {page==="dashboard" && <Dashboard agencies={agencies} cars={cars} bookings={bookings} reviews={reviews} setPage={setPage} notifications={notifications} />}
          {page==="agencies" && <AgenciesPage agencies={agencies} cars={cars} bookings={bookings} onAction={handleAgencyAction} setSelectedAgency={setSelectedAgency} selectedAgency={selectedAgency} setAgencies={setAgencies} />}
          {page==="requests"  && <RequestsPage  agencies={agencies} onAction={handleAgencyAction} />}
          {page==="renewals"  && <RenewalsPage  agencies={agencies} onAction={handleAgencyAction} />}
          {page==="featured" && <FeaturedPage agencies={agencies} onAction={handleAgencyAction} />}
          {page==="cars" && <CarsPage cars={cars} agencies={agencies} setCars={setCars} bookings={bookings} />}
          {page==="bookings" && <BookingsPage bookings={bookings} agencies={agencies} cars={cars} setBookings={setBookings} setCars={setCars} />}
          {page==="messages" && canAccess("messages") && <MessagesPage agencies={agencies} selectedConvAgency={selectedConvAgency} setSelectedConvAgency={setSelectedConvAgency} />}
          {page==="reviews" && canAccess("reviews") && <ReviewsPage reviews={reviews} agencies={agencies} setReviews={setReviews} />}
          {page==="user_accounts" && auth.role==="superadmin" && <UserAccountsPage userRequests={userRequests} setUserRequests={setUserRequests} refreshUserRequests={refreshUserRequests} />}
          {page==="pricing" && auth.role==="superadmin" && <PricingPage agencies={agencies} onAction={handleAgencyAction} />}
          {page==="admins" && auth.role==="superadmin" && <AdminsPage admins={admins} setAdmins={setAdmins} auth={auth} />}
          {page==="profile" && <ProfilePage auth={auth} setAdmins={setAdmins} admins={admins} />}
        </main>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ══════════════════════════════════════════════════════════════
function LoginScreen({form,setForm,onLogin,err}) {
  return (
    <div dir="rtl" style={{minHeight:"100vh",background:S.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{FONT_STYLE}</style>
      <div style={{width:"100%",maxWidth:420,animation:"fadeIn .4s ease"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:72,height:72,borderRadius:20,background:`linear-gradient(135deg,${S.purple},#1D4ED8)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:32}}>🛡️</div>
          <div style={{fontSize:26,fontWeight:900,color:"#fff",marginBottom:4}}>لوحة التحكم</div>
          <div style={{fontSize:13,color:S.textMuted}}>RENT درايف — منصة الإدارة المركزية</div>
        </div>
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:20,padding:"32px 28px"}}>
          {[{label:"اسم المستخدم",key:"username",type:"text"},{label:"كلمة المرور",key:"password",type:"password"}].map(f=>(
            <div key={f.key} style={{marginBottom:18}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:S.textDim,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                onKeyDown={e=>e.key==="Enter"&&onLogin()}
                style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,borderRadius:11,color:"#fff",padding:"12px 15px",fontSize:14,transition:"border-color .2s"}}
                onFocus={e=>e.target.style.borderColor=S.purple}
                onBlur={e=>e.target.style.borderColor=S.border}
              />
            </div>
          ))}
          {err&&<div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",borderRadius:9,padding:"9px 13px",fontSize:12,color:"#FCA5A5",marginBottom:14}}>⚠️ {err}</div>}
          <button onClick={onLogin} style={{width:"100%",background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",padding:"13px",borderRadius:11,cursor:"pointer",fontSize:15,fontWeight:800,marginTop:8,boxShadow:`0 6px 24px rgba(124,58,237,.3)`}}>
            دخول لوحة التحكم ←
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:16,fontSize:10,color:S.textDim}}>© 2026 RENT درايف — لوحة الإدارة</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// NOTIFICATIONS PANEL
// ══════════════════════════════════════════════════════════════
function NotifPanel({notifications,setNotifications,setShowNotifPanel,setPage}) {
  return (
    <div style={{position:"absolute",top:"calc(100% + 8px)",left:0,width:340,background:"#12121E",border:`1px solid ${S.border}`,borderRadius:16,boxShadow:"0 24px 48px rgba(0,0,0,.6)",zIndex:200,animation:"fadeIn .2s ease",overflow:"hidden"}}>
      <div style={{padding:"14px 16px",borderBottom:`1px solid ${S.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:700,fontSize:14,color:"#fff"}}>التنبيهات</span>
        <button onClick={()=>{setNotifications(p=>p.map(n=>({...n,read:true})));setShowNotifPanel(false)}} style={{background:"none",border:"none",color:S.textMuted,cursor:"pointer",fontSize:11}}>تعيين الكل مقروءاً</button>
      </div>
      <div style={{maxHeight:360,overflowY:"auto"}}>
        {notifications.map(n=>(
          <div key={n.id} onClick={()=>{setNotifications(p=>p.map(x=>x.id===n.id?{...x,read:true}:x));setShowNotifPanel(false);if(n.type==="new"||n.type==="warning")setPage("agencies");if(n.type==="review")setPage("reviews")}}
            style={{padding:"12px 16px",borderBottom:`1px solid ${S.border}`,cursor:"pointer",background:n.read?"none":"rgba(124,58,237,.06)",transition:"background .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.04)"}
            onMouseLeave={e=>e.currentTarget.style.background=n.read?"none":"rgba(124,58,237,.06)"}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <div style={{width:32,height:32,borderRadius:8,background:n.type==="warning"?"rgba(245,158,11,.15)":n.type==="new"?"rgba(16,185,129,.15)":"rgba(59,130,246,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {n.type==="warning"?<I.Warning/>:n.type==="new"?<I.Plus/>:<I.Star/>}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:"#fff",lineHeight:1.4,marginBottom:3}}>{n.msg}</div>
                <div style={{fontSize:11,color:S.textDim}}>{n.time}</div>
              </div>
              {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",background:S.purple,flexShrink:0,marginTop:4}}/>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STAT CARD
// ══════════════════════════════════════════════════════════════
function StatCard({label,value,sub,color,icon}) {
  return (
    <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,padding:"20px",transition:"border-color .2s",animation:"fadeIn .3s ease"}}
      onMouseEnter={e=>e.currentTarget.style.borderColor=color+"55"}
      onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{width:40,height:40,borderRadius:10,background:color+"22",display:"flex",alignItems:"center",justifyContent:"center",color:color,fontSize:20}}>{icon}</div>
        {sub&&<span style={{fontSize:11,color:S.textDim,background:S.bgCard2,padding:"3px 8px",borderRadius:6}}>{sub}</span>}
      </div>
      <div style={{fontSize:28,fontWeight:900,color:"#fff",lineHeight:1.2,marginBottom:4}}>{value}</div>
      <div style={{fontSize:12,color:S.textMuted}}>{label}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// DASHBOARD PAGE
// ══════════════════════════════════════════════════════════════
function Dashboard({agencies,cars,bookings,reviews,setPage,notifications}) {
  const pending = agencies.filter(a=>a.pendingApproval).length;
  const expiring = agencies.filter(a=>daysLeft(a.subscriptionEnd)<=7&&a.subscriptionEnd&&!a.suspended);
  const newCars = cars.filter(c=>c.isNew).length;
  const pendingReviews = reviews.filter(r=>r.status==="pending").length;
  const totalRevenue = agencies.reduce((s,a)=>s+(a.monthlyPrice*(a.subscriptionMonths||0)),0);

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:900,color:"#fff",margin:0,marginBottom:4}}>لوحة التحكم الرئيسية</h1>
        <p style={{fontSize:13,color:S.textMuted,margin:0}}>مرحباً بك في نظام إدارة منصة DriveRENT</p>
      </div>

      {/* Warning Banners */}
      {pending>0&&(
        <div style={{background:"rgba(16,185,129,.08)",border:"1px solid rgba(16,185,129,.2)",borderRadius:12,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
          <I.Warning/><span style={{fontSize:13,color:"#34D399",fontWeight:700}}>{pending} وكالة جديدة تنتظر موافقتك في قائمة طلبات التسجيل</span>
          <button onClick={()=>setPage("requests")} style={{marginRight:"auto",background:"rgba(16,185,129,.2)",border:"none",color:"#34D399",borderRadius:7,padding:"4px 12px",cursor:"pointer",fontSize:12,fontWeight:700}}>راجع الآن</button>
        </div>
      )}
      {expiring.length>0&&(
        <div style={{background:"rgba(245,158,11,.08)",border:"1px solid rgba(245,158,11,.2)",borderRadius:12,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
          <I.Clock/><span style={{fontSize:13,color:"#FCD34D",fontWeight:700}}>{expiring.length} وكالة اشتراكها ينتهي قريباً</span>
          <button onClick={()=>setPage("agencies")} style={{marginRight:"auto",background:"rgba(245,158,11,.2)",border:"none",color:"#FCD34D",borderRadius:7,padding:"4px 12px",cursor:"pointer",fontSize:12,fontWeight:700}}>تجديد الاشتراكات</button>
        </div>
      )}

      {/* Stats Grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14,marginBottom:28}}>
        <StatCard label="إجمالي الوكالات" value={agencies.length} sub={`${agencies.filter(a=>a.status==="active").length} نشطة`} color={S.purple} icon="🏢"/>
        <StatCard label="إجمالي السيارات" value={cars.length} sub={`${newCars} جديدة`} color={S.blue} icon="🚗"/>
        <StatCard label="الحجوزات" value={bookings.length} sub={`${bookings.filter(b=>b.status==="pending").length} معلقة`} color={S.green} icon="📅"/>
        <StatCard label="تعليقات معلقة" value={pendingReviews} color={S.amber} icon="⭐"/>
        <StatCard label="إجمالي الإيرادات" value={totalRevenue.toLocaleString()+" دج"} sub="من الاشتراكات" color="#EC4899" icon="💰"/>
        <StatCard label="وكالات موثقة" value={agencies.filter(a=>a.verified).length} sub={`من ${agencies.length}`} color={S.green} icon="✅"/>
      </div>

      {/* Two column layout */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        {/* Recent Pending */}
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,padding:20}}>
          <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
            <I.Warning/> طلبات التسجيل المعلقة
          </div>
          {agencies.filter(a=>a.pendingApproval).length===0?
            <div style={{fontSize:12,color:S.textDim,textAlign:"center",padding:"20px 0"}}>لا توجد طلبات معلقة</div>:
            agencies.filter(a=>a.pendingApproval).map(ag=>(
              <div key={ag.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${S.border}`}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{ag.name}</div>
                  <div style={{fontSize:11,color:S.textMuted}}>{getWilaya(ag.wilaya)} · {ag.owner}</div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <span style={{background:"rgba(245,158,11,.15)",color:"#FCD34D",borderRadius:6,padding:"2px 8px",fontSize:10,fontWeight:700}}>جديد</span>
                </div>
              </div>
            ))
          }
        </div>

        {/* Expiring subscriptions */}
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,padding:20}}>
          <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
            <I.Clock/> اشتراكات تنتهي قريباً
          </div>
          {agencies.filter(a=>a.subscriptionEnd&&daysLeft(a.subscriptionEnd)<=30&&!a.suspended).length===0?
            <div style={{fontSize:12,color:S.textDim,textAlign:"center",padding:"20px 0"}}>لا توجد اشتراكات منتهية قريباً</div>:
            agencies.filter(a=>a.subscriptionEnd&&daysLeft(a.subscriptionEnd)<=30&&!a.suspended).sort((a,b)=>daysLeft(a.subscriptionEnd)-daysLeft(b.subscriptionEnd)).slice(0,5).map(ag=>{
              const d = daysLeft(ag.subscriptionEnd);
              return (
                <div key={ag.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${S.border}`}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{ag.name}</div>
                    <div style={{fontSize:11,color:S.textMuted}}>{getWilaya(ag.wilaya)}</div>
                  </div>
                  <span style={{background:d<=3?"rgba(239,68,68,.15)":d<=7?"rgba(245,158,11,.15)":"rgba(59,130,246,.15)",color:d<=3?S.red:d<=7?S.amber:S.blue,borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700}}>
                    {d<=0?"منتهي":`${d} يوم`}
                  </span>
                </div>
              );
            })
          }
        </div>

        {/* Wilaya Distribution */}
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,padding:20}}>
          <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
            <I.Map/> توزيع الوكالات حسب الولايات
          </div>
          {Object.entries(agencies.reduce((acc,ag)=>{const w=getWilaya(ag.wilaya);acc[w]=(acc[w]||0)+1;return acc},{})).sort(([,a],[,b])=>b-a).slice(0,6).map(([w,count])=>(
            <div key={w} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{fontSize:12,color:S.textMuted,width:90,textAlign:"right"}}>{w}</div>
              <div style={{flex:1,background:"rgba(255,255,255,.05)",borderRadius:4,height:8,overflow:"hidden"}}>
                <div style={{height:"100%",background:`linear-gradient(90deg,${S.purple},${S.purpleBright})`,width:`${(count/agencies.length)*100}%`,borderRadius:4,transition:"width .5s"}}/>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:"#fff",width:20}}>{count}</div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,padding:20}}>
          <div style={{fontWeight:800,fontSize:14,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
            <I.Bookings/> آخر الحجوزات
          </div>
          {bookings.slice(-4).reverse().map(bk=>(
            <div key={bk.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${S.border}`}}>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{bk.customer}</div>
                <div style={{fontSize:11,color:S.textMuted}}>{getWilaya(bk.wilaya)}</div>
              </div>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{bk.price.toLocaleString()} دج</div>
                <span style={{fontSize:10,fontWeight:700,color:bk.status==="confirmed"?S.green:bk.status==="pending"?S.amber:S.blue,background:bk.status==="confirmed"?"rgba(16,185,129,.1)":bk.status==="pending"?"rgba(245,158,11,.1)":"rgba(59,130,246,.1)",borderRadius:5,padding:"2px 7px"}}>{bk.status==="confirmed"?"مؤكد":bk.status==="pending"?"معلق":"مكتمل"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// AGENCIES PAGE
// ══════════════════════════════════════════════════════════════
function AgenciesPage({agencies,cars,bookings,onAction,setSelectedAgency,selectedAgency,setAgencies}) {
  const [search,setSearch] = useState("");
  const [filterWilaya,setFilterWilaya] = useState("");
  const [filterStatus,setFilterStatus] = useState("");
  const [showAddModal,setShowAddModal] = useState(false);
  const [editingPriceId,setEditingPriceId] = useState(null);
  const [tempPrice,setTempPrice] = useState("");
  const [editingMonthsId,setEditingMonthsId] = useState(null);
  const [tempMonths,setTempMonths] = useState("");
  const [renewModal,setRenewModal] = useState(null); // agency id to renew
  const [renewMonths,setRenewMonths] = useState(1);

  const filtered = agencies.filter(ag=>{
    if(ag.pendingApproval) return false; // فقط في صفحة طلبات التسجيل
    const matchSearch = !search || ag.name.includes(search)||ag.owner.includes(search)||ag.email.includes(search);
    const matchWilaya = !filterWilaya || ag.wilaya===filterWilaya;
    const matchStatus = !filterStatus || ag.status===filterStatus || (filterStatus==="featured"&&ag.featured);
    return matchSearch&&matchWilaya&&matchStatus;
  });

  const agCars = (id) => cars.filter(c=>c.agencyId===id).length;
  const agBookings = (id) => bookings.filter(b=>b.agencyId===id).length;

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:2}}>إدارة الوكالات</h1>
          <p style={{fontSize:12,color:S.textMuted,margin:0}}>{agencies.filter(a=>!a.pendingApproval).length} وكالة مسجلة · {agencies.filter(a=>a.featured).length} مميزة</p>
        </div>
        <button onClick={()=>setShowAddModal(true)} style={{background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:10,padding:"9px 18px",cursor:"pointer",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:8}}>
          <I.Plus/> إضافة وكالة
        </button>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        <div style={{position:"relative",flex:1,minWidth:160}}>
          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:S.textMuted}}><I.Search/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث عن وكالة..."
            style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"9px 38px 9px 14px",fontSize:13}} />
        </div>
        <select value={filterWilaya} onChange={e=>setFilterWilaya(e.target.value)}
          style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"9px 14px",fontSize:13,minWidth:130}}>
          <option value="">كل الولايات</option>
          {WILAYAS.map(w=><option key={w.c} value={w.c}>{w.ar}</option>)}
        </select>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
          style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"9px 14px",fontSize:13,minWidth:130}}>
          <option value="">كل الحالات</option>
          <option value="active">نشطة</option>
          <option value="suspended">موقوفة</option>
          <option value="featured">مميزة</option>
        </select>
      </div>

      {/* Table */}
      <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,overflow:"hidden"}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:900}}>
            <thead>
              <tr style={{background:"rgba(255,255,255,.04)"}}>
                {["الوكالة","الولاية","الحالة","الاشتراك","عداد الاشتراك","السيارات","الحجوزات","التقييم","إجراءات"].map(h=>(
                  <th key={h} style={{padding:"12px 14px",fontSize:11,fontWeight:700,color:S.textDim,textAlign:"right",borderBottom:`1px solid ${S.border}`,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(ag=>{
                return (
                  <tr key={ag.id} style={{borderBottom:`1px solid ${S.border}`,transition:"background .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"}
                    onMouseLeave={e=>e.currentTarget.style.background="none"}>
                    <td style={{padding:"12px 14px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:36,height:36,borderRadius:9,background:`linear-gradient(135deg,${S.purple}44,#4F46E544)`,border:`1px solid ${S.purple}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🏢</div>
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{ag.name}</span>
                            {ag.verified&&<span style={{color:S.blue,fontSize:12}}><I.Shield/></span>}
                            {ag.featured&&<span style={{color:"#F59E0B",fontSize:12}}><I.Crown/></span>}
                          </div>
                          <div style={{fontSize:11,color:S.textMuted}}>{ag.owner} · {ag.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:"12px 14px"}}><span style={{fontSize:12,color:S.textMuted}}>{getWilaya(ag.wilaya)}</span></td>
                    <td style={{padding:"12px 14px"}}>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:7,
                        background:ag.pendingApproval?"rgba(245,158,11,.15)":ag.suspended?"rgba(239,68,68,.12)":ag.status==="active"?"rgba(16,185,129,.12)":"rgba(107,114,128,.12)",
                        color:ag.pendingApproval?S.amber:ag.suspended?S.red:ag.status==="active"?S.green:"#9CA3AF"}}>
                        {ag.pendingApproval?"في الانتظار":ag.suspended?"موقوفة":ag.status==="active"?"نشطة":ag.status==="rejected"?"مرفوضة":"معلقة"}
                      </span>
                    </td>
                    <td style={{padding:"12px 14px"}}>
                      {editingPriceId===ag.id?(
                        <div style={{display:"flex",gap:4}}>
                          <input value={tempPrice} onChange={e=>setTempPrice(e.target.value)} style={{width:80,background:"rgba(255,255,255,.08)",border:`1px solid ${S.purple}`,borderRadius:6,color:"#fff",padding:"4px 8px",fontSize:12}} />
                          <button onClick={()=>{onAction(ag.id,"setPrice",parseInt(tempPrice));setEditingPriceId(null)}} style={{background:S.green+"22",border:"none",color:S.green,borderRadius:5,padding:"4px 6px",cursor:"pointer"}}><I.Check/></button>
                          <button onClick={()=>setEditingPriceId(null)} style={{background:"rgba(239,68,68,.15)",border:"none",color:S.red,borderRadius:5,padding:"4px 6px",cursor:"pointer"}}><I.X/></button>
                        </div>
                      ):(
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:12,color:"#fff",fontWeight:700}}>{ag.monthlyPrice.toLocaleString()} دج</span>
                          <button onClick={()=>{setEditingPriceId(ag.id);setTempPrice(ag.monthlyPrice)}} style={{background:"none",border:"none",color:S.textDim,cursor:"pointer",padding:2}}><I.Edit/></button>
                        </div>
                      )}
                    </td>
                    <td style={{padding:"12px 14px",minWidth:160}}>
                      <SubCountdown agency={ag} compact={true}
                        onRenew={id=>{setRenewModal(id);setRenewMonths(ag.subscriptionMonths||1);}}/>
                    </td>
                    <td style={{padding:"12px 14px",textAlign:"center"}}><span style={{fontSize:13,color:"#fff",fontWeight:700}}>{agCars(ag.id)}</span></td>
                    <td style={{padding:"12px 14px",textAlign:"center"}}><span style={{fontSize:13,color:"#fff",fontWeight:700}}>{agBookings(ag.id)}</span></td>
                    <td style={{padding:"12px 14px"}}>
                      {ag.rating>0?<span style={{fontSize:12,color:"#F59E0B",fontWeight:700}}>⭐ {ag.rating}</span>:<span style={{fontSize:11,color:S.textDim}}>—</span>}
                    </td>
                    <td style={{padding:"12px 14px"}}>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                        <ActionBtn color={ag.verified?S.amber:S.blue} onClick={()=>onAction(ag.id,ag.verified?"unverify":"verify")} title={ag.verified?"إلغاء التوثيق":"توثيق"}><I.Shield/></ActionBtn>
                        <ActionBtn color={ag.featured?"#F59E0B":S.textDim} onClick={()=>onAction(ag.id,"feature")} title={ag.featured?"إلغاء التمييز":"تمييز"}><I.Crown/></ActionBtn>
                        <ActionBtn color={ag.suspended?S.green:S.amber} onClick={()=>onAction(ag.id,ag.suspended?"unsuspend":"suspend")} title={ag.suspended?"تفعيل":"إيقاف"}><I.Block/></ActionBtn>
                        <ActionBtn color={S.purple} onClick={()=>{setRenewModal(ag.id);setRenewMonths(ag.subscriptionMonths||1);}} title="تجديد الاشتراك">🔄</ActionBtn>
                        <ActionBtn color={S.textMuted} onClick={()=>setSelectedAgency(ag.id===selectedAgency?null:ag.id)} title="تفاصيل"><I.Eye/></ActionBtn>
                        <ActionBtn color={S.red} onClick={()=>onAction(ag.id,"delete")} title="حذف"><I.Trash/></ActionBtn>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agency Detail Panel */}
      {selectedAgency&&<AgencyDetailPanel agency={agencies.find(a=>a.id===selectedAgency)} cars={cars} bookings={bookings} onClose={()=>setSelectedAgency(null)} onAction={onAction}/>}
      {showAddModal&&<AddAgencyModal onClose={()=>setShowAddModal(false)} setAgencies={setAgencies}/>}

      {/* Renewal Modal */}
      {renewModal&&(()=>{
        const ag = agencies.find(a=>a.id===renewModal);
        if(!ag) return null;
        const nowEnd = ag.subscriptionEnd;
        const nowDays = daysLeft(nowEnd);
        const previewEnd = (()=>{const d=new Date();d.setMonth(d.getMonth()+renewMonths);return d.toLocaleDateString("ar-DZ");})();
        return (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setRenewModal(null)}>
            <div style={{background:"#12121E",border:`1px solid ${S.purple}44`,borderRadius:20,padding:28,width:420,animation:"fadeIn .2s ease"}} onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                <div>
                  <h2 style={{fontSize:16,fontWeight:800,color:"#fff",margin:0,marginBottom:4}}>🔄 تجديد الاشتراك</h2>
                  <div style={{fontSize:12,color:S.textMuted}}>{ag.name}</div>
                </div>
                <button onClick={()=>setRenewModal(null)} style={{background:"none",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:8,padding:"5px 9px",cursor:"pointer"}}><I.X/></button>
              </div>

              {/* Current status */}
              <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:14,marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:12,color:S.textDim}}>الحالة الحالية</span>
                  <SubCountdown agency={ag}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[["بداية الاشتراك",formatDate(ag.subscriptionStart)],["نهاية الاشتراك",formatDate(ag.subscriptionEnd)||"—"],["الاشتراك الشهري",`${ag.monthlyPrice.toLocaleString()} دج`],["الأيام المتبقية",nowDays>0?`${nowDays} يوم`:"منتهي"]].map(([l,v])=>(
                    <div key={l} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"7px 10px"}}>
                      <div style={{fontSize:10,color:S.textDim,marginBottom:1}}>{l}</div>
                      <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal options */}
              <div style={{marginBottom:16}}>
                <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:8}}>مدة التجديد</label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:10}}>
                  {[1,3,6,12].map(m=>(
                    <button key={m} onClick={()=>setRenewMonths(m)}
                      style={{background:renewMonths===m?`linear-gradient(135deg,${S.purple},#4F46E5)`:"rgba(255,255,255,.06)",border:`1px solid ${renewMonths===m?S.purple:S.border}`,color:renewMonths===m?"#fff":S.textMuted,borderRadius:9,padding:"8px 4px",cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .15s"}}>
                      {m} {m===1?"شهر":"أشهر"}
                    </button>
                  ))}
                </div>
                <select value={renewMonths} onChange={e=>setRenewMonths(parseInt(e.target.value))}
                  style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"9px 12px",fontSize:13}}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(m=><option key={m} value={m}>{m} شهر — {(ag.monthlyPrice*m).toLocaleString()} دج</option>)}
                </select>
              </div>

              {/* Preview */}
              <div style={{background:`rgba(124,58,237,.08)`,border:`1px solid rgba(124,58,237,.2)`,borderRadius:10,padding:"10px 14px",marginBottom:18}}>
                <div style={{fontSize:11,color:S.textDim,marginBottom:4}}>معاينة التجديد</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:13,color:"#fff",fontWeight:700}}>سيبدأ من: اليوم</div>
                    <div style={{fontSize:12,color:S.textMuted}}>سينتهي في: {previewEnd}</div>
                  </div>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontSize:16,fontWeight:900,color:S.purpleBright}}>{(ag.monthlyPrice*renewMonths).toLocaleString()} دج</div>
                    <div style={{fontSize:10,color:S.textDim}}>المبلغ الإجمالي</div>
                  </div>
                </div>
              </div>

              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setRenewModal(null)} style={{flex:1,background:S.bgCard,border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:9,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:600}}>إلغاء</button>
                <button onClick={()=>{onAction(ag.id,"renewSubscription",renewMonths);setRenewModal(null);}}
                  style={{flex:2,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:9,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:800,boxShadow:`0 4px 18px rgba(124,58,237,.35)`}}>
                  ✅ تأكيد التجديد لـ {renewMonths} {renewMonths===1?"شهر":"أشهر"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function ActionBtn({color,onClick,title,children}) {
  return (
    <button title={title} onClick={onClick}
      style={{background:`${color}18`,border:`1px solid ${color}33`,color:color,borderRadius:7,padding:"5px 7px",cursor:"pointer",display:"flex",alignItems:"center",transition:"all .15s"}}
      onMouseEnter={e=>{e.currentTarget.style.background=`${color}30`;e.currentTarget.style.borderColor=color}}
      onMouseLeave={e=>{e.currentTarget.style.background=`${color}18`;e.currentTarget.style.borderColor=`${color}33`}}>
      {children}
    </button>
  );
}

function AgencyDetailPanel({agency,cars,bookings,onClose,onAction}) {
  const agCars = cars.filter(c=>c.agencyId===agency.id);
  const agBookings = bookings.filter(b=>b.agencyId===agency.id);
  return (
    <div style={{position:"fixed",top:60,left:0,bottom:0,width:380,background:"#10101A",borderLeft:`1px solid ${S.border}`,zIndex:90,overflowY:"auto",padding:20,animation:"slideIn .25s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:16,fontWeight:800,color:"#fff",margin:0}}>تفاصيل الوكالة</h2>
        <button onClick={onClose} style={{background:"none",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:8,padding:"5px 9px",cursor:"pointer"}}><I.X/></button>
      </div>
      <div style={{background:S.bgCard,borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:4}}>{agency.name}</div>
        <div style={{fontSize:12,color:S.textMuted,marginBottom:12}}>{agency.owner} · {agency.phone}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[["الولاية",getWilaya(agency.wilaya)],["الاشتراك",`${agency.monthlyPrice.toLocaleString()} دج/شهر`],["المدة",`${agency.subscriptionMonths} شهر`],["ينتهي",formatDate(agency.subscriptionEnd)],["السيارات",agCars.length],["الحجوزات",agBookings.length]].map(([l,v])=>(
            <div key={l} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"8px 10px"}}>
              <div style={{fontSize:10,color:S.textDim,marginBottom:2}}>{l}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:S.bgCard,borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:10}}>السيارات ({agCars.length})</div>
        {agCars.map(c=>(
          <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${S.border}`}}>
            <div>
              <span style={{fontSize:12,color:"#fff",fontWeight:600}}>{c.brand} {c.model}</span>
              {c.isNew&&<span style={{background:"rgba(16,185,129,.15)",color:S.green,fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:4,marginRight:5}}>جديد</span>}
            </div>
            <span style={{fontSize:11,color:S.textMuted}}>{c.price.toLocaleString()} دج/ي</span>
          </div>
        ))}
        {agCars.length===0&&<div style={{fontSize:12,color:S.textDim,textAlign:"center",padding:10}}>لا توجد سيارات</div>}
      </div>
      <div style={{background:S.bgCard,borderRadius:14,padding:16}}>
        <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:10}}>الحجوزات ({agBookings.length})</div>
        {agBookings.slice(-3).reverse().map(b=>(
          <div key={b.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${S.border}`}}>
            <div style={{fontSize:12,color:"#fff"}}>{b.customer}</div>
            <div style={{textAlign:"left"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#fff"}}>{b.price.toLocaleString()} دج</div>
              <div style={{fontSize:10,color:S.textDim}}>{formatDate(b.from)}</div>
            </div>
          </div>
        ))}
        {agBookings.length===0&&<div style={{fontSize:12,color:S.textDim,textAlign:"center",padding:10}}>لا توجد حجوزات</div>}
      </div>
    </div>
  );
}

function AddAgencyModal({onClose,setAgencies}) {
  const [form,setForm] = useState({name:"",owner:"",phone:"",email:"",wilaya:"16",plan:"standard",monthlyPrice:5000,subscriptionMonths:3});
  async function handleAdd() {
    const now = new Date();
    const end = new Date(now);
    end.setMonth(end.getMonth()+Number(form.subscriptionMonths||1));
    const row={
      name:form.name, owner_name:form.owner, phone:form.phone, email:form.email,
      wilaya:form.wilaya, status:"active", verified:false, featured:false, plan:form.plan,
      monthly_price:Number(form.monthlyPrice||0), subscription_months:Number(form.subscriptionMonths||1),
      subscription_start:now.toISOString().split("T")[0], subscription_end:end.toISOString().split("T")[0]
    };
    if(supabaseReady) { await supabase.from("agencies").insert(row).catch(()=>{}); }
    setAgencies(p=>[...p,{...mapAgencyRow(row), id:"ag"+Date.now(), createdAt:now.toISOString()}]);
    onClose();
  }
  const fields = [{k:"name",l:"اسم الوكالة"},{k:"owner",l:"المالك"},{k:"phone",l:"الهاتف"},{k:"email",l:"البريد الإلكتروني"}];
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#12121E",border:`1px solid ${S.border}`,borderRadius:18,padding:28,width:440,animation:"fadeIn .2s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{fontSize:16,fontWeight:800,color:"#fff",margin:0}}>إضافة وكالة جديدة</h2>
          <button onClick={onClose} style={{background:"none",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:8,padding:"5px 9px",cursor:"pointer"}}><I.X/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          {fields.map(f=>(
            <div key={f.k}>
              <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:5}}>{f.l}</label>
              <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"9px 12px",fontSize:13}}/>
            </div>
          ))}
          <div>
            <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:5}}>الولاية</label>
            <select value={form.wilaya} onChange={e=>setForm(p=>({...p,wilaya:e.target.value}))}
              style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"9px 12px",fontSize:13}}>
              {WILAYAS.map(w=><option key={w.c} value={w.c}>{w.ar}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:5}}>الباقة</label>
            <select value={form.plan} onChange={e=>setForm(p=>({...p,plan:e.target.value,monthlyPrice:e.target.value==="premium"?8000:e.target.value==="standard"?5000:3500}))}
              style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"9px 12px",fontSize:13}}>
              <option value="basic">أساسية - 3500 دج</option>
              <option value="standard">قياسية - 5000 دج</option>
              <option value="premium">مميزة - 8000 دج</option>
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:5}}>السعر الشهري (دج)</label>
            <input type="number" value={form.monthlyPrice} onChange={e=>setForm(p=>({...p,monthlyPrice:e.target.value}))}
              style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"9px 12px",fontSize:13}}/>
          </div>
          <div>
            <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:5}}>مدة الاشتراك (أشهر)</label>
            <select value={form.subscriptionMonths} onChange={e=>setForm(p=>({...p,subscriptionMonths:parseInt(e.target.value)}))}
              style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"9px 12px",fontSize:13}}>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(m=><option key={m} value={m}>{m} شهر</option>)}
            </select>
          </div>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{background:S.bgCard,border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:9,padding:"9px 18px",cursor:"pointer",fontSize:13}}>إلغاء</button>
          <button onClick={handleAdd} style={{background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:9,padding:"9px 20px",cursor:"pointer",fontSize:13,fontWeight:700}}>إضافة</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// CARS PAGE — Enhanced with wilaya filter, availability toggle
// ══════════════════════════════════════════════════════════════
function CarsPage({cars,agencies,setCars,bookings}) {
  const [search,setSearch] = useState("");
  const [filterAgency,setFilterAgency] = useState("");
  const [filterWilaya,setFilterWilaya] = useState("");
  const [filterNew,setFilterNew] = useState(false);
  const [filterAvail,setFilterAvail] = useState("all"); // all | available | unavailable

  // Count agencies per wilaya
  const wilayaCounts = agencies.reduce((acc,ag)=>{acc[ag.wilaya]=(acc[ag.wilaya]||0)+1;return acc},{});
  const activeWilayas = WILAYAS.filter(w=>wilayaCounts[w.c]);

  // A car is effectively unavailable if it has a confirmed booking today or if available===false
  const isCarEffectivelyUnavailable = (car) => {
    if(car.available===false) return true;
    const today = new Date().toISOString().split("T")[0];
    return bookings.some(b=>b.carId===car.id && b.status==="confirmed" && b.from<=today && b.to>=today);
  };

  const filtered = cars.filter(c=>{
    const ag = agencies.find(a=>a.id===c.agencyId);
    const matchSearch = !search||(c.brand+c.model).toLowerCase().includes(search.toLowerCase())||c.plateNum.includes(search);
    const matchAgency = !filterAgency||c.agencyId===filterAgency;
    const matchWilaya = !filterWilaya||(ag&&ag.wilaya===filterWilaya);
    const matchNew = !filterNew||c.isNew;
    const unavail = isCarEffectivelyUnavailable(c);
    const matchAvail = filterAvail==="all"||(filterAvail==="available"&&!unavail)||(filterAvail==="unavailable"&&unavail);
    return matchSearch&&matchAgency&&matchWilaya&&matchNew&&matchAvail;
  });

  const toggleAvailability = (id) => {
    setCars(p=>p.map(x=>x.id===id?{...x,available:!x.available}:x));
  };

  const removeFromPlatform = (id) => {
    setCars(p=>p.map(x=>x.id===id?{...x,hiddenFromPlatform:true}:x));
  };

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:2}}>مراقبة السيارات</h1>
          <p style={{fontSize:12,color:S.textMuted,margin:0}}>{cars.length} سيارة · <span style={{color:S.green}}>{cars.filter(c=>c.available!==false).length} متاحة</span> · <span style={{color:S.red}}>{cars.filter(c=>c.available===false).length} غير متاحة</span></p>
        </div>
      </div>

      {/* Wilaya map bar */}
      {activeWilayas.length>0&&(
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:14,padding:"12px 16px",marginBottom:16,overflowX:"auto"}}>
          <div style={{fontSize:11,color:S.textDim,fontWeight:700,marginBottom:10}}>📍 الوكالات حسب الولاية — انقر للتصفية</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={()=>setFilterWilaya("")}
              style={{background:filterWilaya===""?`linear-gradient(135deg,${S.purple},#4F46E5)`:"rgba(255,255,255,.06)",border:`1px solid ${filterWilaya===""?S.purple:S.border}`,color:"#fff",borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all .15s"}}>
              الكل ({agencies.length})
            </button>
            {activeWilayas.map(w=>(
              <button key={w.c} onClick={()=>setFilterWilaya(w.c===filterWilaya?"":w.c)}
                style={{background:filterWilaya===w.c?`linear-gradient(135deg,${S.purple},#4F46E5)`:"rgba(255,255,255,.04)",border:`1px solid ${filterWilaya===w.c?S.purple:S.border}`,color:filterWilaya===w.c?"#fff":S.textMuted,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:600,transition:"all .15s",display:"flex",alignItems:"center",gap:5}}>
                {w.ar}
                <span style={{background:filterWilaya===w.c?"rgba(255,255,255,.2)":"rgba(124,58,237,.2)",color:filterWilaya===w.c?"#fff":S.purpleBright,borderRadius:99,padding:"1px 6px",fontSize:10,fontWeight:800}}>{wilayaCounts[w.c]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:160}}>
          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:S.textMuted}}><I.Search/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث بالعلامة أو رقم اللوحة..."
            style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"9px 38px 9px 14px",fontSize:13}}/>
        </div>
        <select value={filterAgency} onChange={e=>setFilterAgency(e.target.value)}
          style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"9px 14px",fontSize:13,minWidth:160}}>
          <option value="">كل الوكالات</option>
          {agencies.map(ag=><option key={ag.id} value={ag.id}>{ag.name}</option>)}
        </select>
        <div style={{display:"flex",gap:6}}>
          {[["all","الكل",S.textMuted],["available","متاحة",S.green],["unavailable","غير متاحة",S.red]].map(([v,l,c])=>(
            <button key={v} onClick={()=>setFilterAvail(v)}
              style={{background:filterAvail===v?`${c}22`:"rgba(255,255,255,.04)",border:`1px solid ${filterAvail===v?c:S.border}`,color:filterAvail===v?c:S.textMuted,borderRadius:8,padding:"7px 12px",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all .15s"}}>
              {l}
            </button>
          ))}
        </div>
        <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13,color:filterNew?S.green:S.textMuted}}>
          <input type="checkbox" checked={filterNew} onChange={e=>setFilterNew(e.target.checked)} style={{width:16,height:16,accentColor:S.green}}/>
          الجديدة فقط
        </label>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14}}>
        {filtered.map(c=>{
          const ag = agencies.find(a=>a.id===c.agencyId);
          const unavail = isCarEffectivelyUnavailable(c);
          const confirmedToday = bookings.some(b=>b.carId===c.id&&b.status==="confirmed");
          return (
            <div key={c.id} style={{background:S.bgCard,border:`1px solid ${unavail?"rgba(239,68,68,.25)":c.isNew?"rgba(16,185,129,.3)":S.border}`,borderRadius:14,padding:16,transition:"all .2s",opacity:c.hiddenFromPlatform?.8:1}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=unavail?"rgba(239,68,68,.5)":c.isNew?S.green:S.border2}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=unavail?"rgba(239,68,68,.25)":c.isNew?"rgba(16,185,129,.3)":S.border}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontSize:15,fontWeight:800,color:"#fff"}}>{c.brand} {c.model}</span>
                    {c.isNew&&<span style={{background:"rgba(16,185,129,.15)",color:S.green,fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:5}}>✦ جديد</span>}
                    {confirmedToday&&<span style={{background:"rgba(59,130,246,.15)",color:S.blue,fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:5}}>محجوز</span>}
                  </div>
                  <div style={{fontSize:11,color:S.textMuted,marginTop:2}}>{c.year} · {c.plateNum}</div>
                </div>
                {/* Availability toggle */}
                <button onClick={()=>toggleAvailability(c.id)}
                  title={unavail?"تفعيل التوفر":"إيقاف التوفر"}
                  style={{background:unavail?"rgba(239,68,68,.12)":"rgba(16,185,129,.12)",border:`1px solid ${unavail?"rgba(239,68,68,.3)":"rgba(16,185,129,.3)"}`,color:unavail?S.red:S.green,borderRadius:8,padding:"5px 8px",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,transition:"all .2s"}}>
                  {unavail?<I.ToggleOff/>:<I.Toggle/>}
                  {unavail?"غير متاح":"متاح"}
                </button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:12}}>
                {[["السعر",`${c.price.toLocaleString()} دج/ي`],["الحجوزات",c.bookings],["الولاية",getWilaya(ag?.wilaya||"")],["أضيف",formatDate(c.addedDate)]].map(([l,v])=>(
                  <div key={l} style={{background:"rgba(255,255,255,.04)",borderRadius:7,padding:"6px 9px"}}>
                    <div style={{fontSize:10,color:S.textDim}}>{l}</div>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:S.textMuted,display:"flex",alignItems:"center",gap:5,marginBottom:10}}>
                🏢 {ag?.name||"وكالة محذوفة"}
              </div>
              <div style={{display:"flex",gap:6}}>
                {c.isNew&&<button onClick={()=>setCars(p=>p.map(x=>x.id===c.id?{...x,isNew:false}:x))}
                  style={{flex:1,background:"rgba(16,185,129,.1)",border:`1px solid rgba(16,185,129,.2)`,color:S.green,borderRadius:8,padding:"6px",cursor:"pointer",fontSize:11,fontWeight:700}}>
                  ✓ مراجَع
                </button>}
                <button onClick={()=>removeFromPlatform(c.id)}
                  title="إخفاء من المنصة الرئيسية"
                  style={{flex:1,background:c.hiddenFromPlatform?"rgba(239,68,68,.2)":"rgba(255,255,255,.05)",border:`1px solid ${c.hiddenFromPlatform?"rgba(239,68,68,.4)":S.border}`,color:c.hiddenFromPlatform?S.red:S.textMuted,borderRadius:8,padding:"6px",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all .2s"}}>
                  {c.hiddenFromPlatform?"⚠ مخفية":"🚫 إخفاء من المنصة"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:S.textDim,fontSize:14}}>لا توجد سيارات تطابق البحث</div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// BOOKINGS PAGE
// ══════════════════════════════════════════════════════════════
function BookingsPage({bookings,agencies,cars,setBookings,setCars}) {
  const [search,setSearch]=useState("");
  const [filterStatus,setFilterStatus]=useState("");

  const filtered = bookings.filter(b=>{
    const matchSearch = !search||b.customer.includes(search)||b.phone.includes(search);
    const matchStatus = !filterStatus||b.status===filterStatus;
    return matchSearch&&matchStatus;
  });

  const total = filtered.reduce((s,b)=>s+b.price,0);

  // Confirm booking → auto mark car unavailable on main platform
  const confirmBooking = (bkId) => {
    const bk = bookings.find(b=>b.id===bkId);
    setBookings(p=>p.map(b=>b.id===bkId?{...b,status:"confirmed"}:b));
    if(bk) setCars(p=>p.map(c=>c.id===bk.carId?{...c,available:false}:c));
  };

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      <div style={{marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:2}}>مراقبة الحجوزات</h1>
        <p style={{fontSize:12,color:S.textMuted,margin:0}}>{bookings.length} حجز · إجمالي {total.toLocaleString()} دج</p>
      </div>

      <div className="adm-stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {[["الكل",bookings.length,"#fff"],["مؤكدة",bookings.filter(b=>b.status==="confirmed").length,S.green],["معلقة",bookings.filter(b=>b.status==="pending").length,S.amber],["مكتملة",bookings.filter(b=>b.status==="completed").length,S.blue]].map(([l,v,c])=>(
          <div key={l} style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:12,padding:"14px 16px"}}>
            <div style={{fontSize:11,color:S.textMuted,marginBottom:4}}>{l}</div>
            <div style={{fontSize:22,fontWeight:900,color:c}}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <div style={{position:"relative",flex:1}}>
          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:S.textMuted}}><I.Search/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث بالاسم أو الهاتف..."
            style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"9px 38px 9px 14px",fontSize:13}}/>
        </div>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
          style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"9px 14px",fontSize:13}}>
          <option value="">كل الحالات</option>
          <option value="confirmed">مؤكدة</option>
          <option value="pending">معلقة</option>
          <option value="completed">مكتملة</option>
          <option value="cancelled">ملغاة</option>
        </select>
      </div>

      <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"rgba(255,255,255,.04)"}}>
              {["الزبون","الولاية","السيارة","الوكالة","الفترة","المبلغ","الحالة","إجراء"].map(h=>(
                <th key={h} style={{padding:"12px 14px",fontSize:11,fontWeight:700,color:S.textDim,textAlign:"right",borderBottom:`1px solid ${S.border}`,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(bk=>{
              const car = cars.find(c=>c.id===bk.carId);
              const ag = agencies.find(a=>a.id===bk.agencyId);
              return (
                <tr key={bk.id} style={{borderBottom:`1px solid ${S.border}`}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"}
                  onMouseLeave={e=>e.currentTarget.style.background="none"}>
                  <td style={{padding:"11px 14px"}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{bk.customer}</div>
                    <div style={{fontSize:11,color:S.textMuted}}>{bk.phone}</div>
                  </td>
                  <td style={{padding:"11px 14px"}}><span style={{fontSize:12,color:S.textMuted}}>{getWilaya(bk.wilaya)}</span></td>
                  <td style={{padding:"11px 14px"}}><span style={{fontSize:12,color:"#fff"}}>{car?`${car.brand} ${car.model}`:"—"}</span></td>
                  <td style={{padding:"11px 14px"}}><span style={{fontSize:11,color:S.textMuted}}>{ag?.name||"—"}</span></td>
                  <td style={{padding:"11px 14px"}}><span style={{fontSize:11,color:S.textMuted,whiteSpace:"nowrap"}}>{formatDate(bk.from)} → {formatDate(bk.to)}</span></td>
                  <td style={{padding:"11px 14px"}}><span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{bk.price.toLocaleString()} دج</span></td>
                  <td style={{padding:"11px 14px"}}>
                    <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:7,
                      background:bk.status==="confirmed"?"rgba(16,185,129,.12)":bk.status==="pending"?"rgba(245,158,11,.12)":bk.status==="completed"?"rgba(59,130,246,.12)":"rgba(239,68,68,.12)",
                      color:bk.status==="confirmed"?S.green:bk.status==="pending"?S.amber:bk.status==="completed"?S.blue:S.red}}>
                      {bk.status==="confirmed"?"مؤكد":bk.status==="pending"?"معلق":bk.status==="completed"?"مكتمل":"ملغى"}
                    </span>
                  </td>
                  <td style={{padding:"11px 14px"}}>
                    {bk.status==="pending"&&(
                      <div style={{display:"flex",gap:5}}>
                        <ActionBtn color={S.green} onClick={()=>confirmBooking(bk.id)} title="تأكيد — يُخفي السيارة من المنصة"><I.Check/></ActionBtn>
                        <ActionBtn color={S.red} onClick={()=>setBookings(p=>p.map(b=>b.id===bk.id?{...b,status:"cancelled"}:b))} title="إلغاء"><I.X/></ActionBtn>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MESSAGES PAGE
// ══════════════════════════════════════════════════════════════
function MessagesPage({agencies,selectedConvAgency,setSelectedConvAgency}) {
  const withMessages = agencies.filter(a=>a.messages&&a.messages.length>0);
  const selAg = agencies.find(a=>a.id===selectedConvAgency);

  return (
    <div style={{animation:"fadeIn .3s ease",display:"flex",gap:16,height:"calc(100vh - 150px)"}}>
      {/* Conversations List */}
      <div style={{width:280,background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,overflow:"hidden",flexShrink:0}}>
        <div style={{padding:"14px 16px",borderBottom:`1px solid ${S.border}`}}>
          <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>المحادثات</div>
          <div style={{fontSize:11,color:S.textMuted}}>{withMessages.length} وكالة لديها رسائل</div>
        </div>
        <div style={{overflowY:"auto",maxHeight:"calc(100% - 60px)"}}>
          {withMessages.map(ag=>(
            <div key={ag.id} onClick={()=>setSelectedConvAgency(ag.id)}
              style={{padding:"12px 16px",borderBottom:`1px solid ${S.border}`,cursor:"pointer",background:selectedConvAgency===ag.id?S.purpleLight:"none",transition:"background .15s"}}
              onMouseEnter={e=>{if(selectedConvAgency!==ag.id)e.currentTarget.style.background="rgba(255,255,255,.03)"}}
              onMouseLeave={e=>{if(selectedConvAgency!==ag.id)e.currentTarget.style.background="none"}}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <div style={{width:38,height:38,borderRadius:10,background:`linear-gradient(135deg,${S.purple}44,#4F46E544)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🏢</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ag.name}</div>
                  <div style={{fontSize:11,color:S.textMuted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ag.messages[ag.messages.length-1]?.text}</div>
                </div>
                <span style={{background:`${S.purple}22`,color:S.purpleBright,borderRadius:"50%",width:20,height:20,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{ag.messages.length}</span>
              </div>
            </div>
          ))}
          {withMessages.length===0&&<div style={{padding:"32px 16px",textAlign:"center",fontSize:12,color:S.textDim}}>لا توجد رسائل</div>}
        </div>
      </div>

      {/* Conversation View */}
      <div style={{flex:1,background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        {selAg?(
          <>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${S.border}`,display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:9,background:`linear-gradient(135deg,${S.purple}44,#4F46E544)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🏢</div>
              <div>
                <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{selAg.name}</div>
                <div style={{fontSize:11,color:S.textMuted}}>{selAg.owner} · {getWilaya(selAg.wilaya)}</div>
              </div>
              {selAg.verified&&<span style={{marginRight:"auto",background:"rgba(59,130,246,.12)",color:S.blue,borderRadius:7,padding:"3px 10px",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:4}}><I.Shield/> موثقة</span>}
            </div>
            <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10}}>
              {selAg.messages.map(msg=>(
                <div key={msg.id} style={{display:"flex",flexDirection:"column",alignItems:msg.from==="وكالة"?"flex-start":"flex-end",gap:3}}>
                  <div style={{fontSize:10,color:S.textDim}}>{msg.from} · {msg.date} {msg.time}</div>
                  <div style={{maxWidth:"75%",background:msg.from==="وكالة"?"rgba(255,255,255,.06)":S.purpleLight,border:`1px solid ${msg.from==="وكالة"?S.border:S.purple+"44"}`,borderRadius:12,padding:"10px 14px",fontSize:13,color:"#fff",lineHeight:1.5}}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{padding:"12px 16px",borderTop:`1px solid ${S.border}`,background:"rgba(0,0,0,.2)",display:"flex",gap:8}}>
              <div style={{fontSize:11,color:S.textDim,display:"flex",alignItems:"center",gap:5,padding:"8px 14px",background:"rgba(255,255,255,.04)",borderRadius:9,flex:1}}>
                <I.Eye/> وضع القراءة فقط — يمكنك مراقبة المحادثات دون التدخل
              </div>
            </div>
          </>
        ):(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,color:S.textDim}}>
            <div style={{fontSize:40,opacity:.4}}>💬</div>
            <div style={{fontSize:14}}>اختر محادثة لعرضها</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// REVIEWS PAGE
// ══════════════════════════════════════════════════════════════
function ReviewsPage({reviews,agencies,setReviews}) {
  const [filter,setFilter] = useState("pending");

  const filtered = reviews.filter(r=>!filter||r.status===filter);

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      <div style={{marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:2}}>إدارة التعليقات</h1>
        <p style={{fontSize:12,color:S.textMuted,margin:0}}>{reviews.filter(r=>r.status==="pending").length} تعليق ينتظر المراجعة</p>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["pending","معلقة",S.amber],["approved","مقبولة",S.green],["rejected","مرفوضة",S.red],["","الكل",S.textMuted]].map(([v,l,c])=>(
          <button key={v} onClick={()=>setFilter(v)}
            style={{background:filter===v?`${c}22`:"none",border:`1px solid ${filter===v?c:S.border}`,color:filter===v?c:S.textMuted,borderRadius:9,padding:"7px 16px",cursor:"pointer",fontSize:12,fontWeight:filter===v?700:400,transition:"all .2s"}}>
            {l} ({(v?reviews.filter(r=>r.status===v):reviews).length})
          </button>
        ))}
      </div>

      <div style={{display:"grid",gap:12}}>
        {filtered.map(rev=>{
          const ag = agencies.find(a=>a.id===rev.agencyId);
          return (
            <div key={rev.id} style={{background:S.bgCard,border:`1px solid ${rev.status==="pending"?"rgba(245,158,11,.25)":S.border}`,borderRadius:14,padding:18,display:"flex",gap:16,alignItems:"flex-start"}}>
              <div style={{width:42,height:42,borderRadius:11,background:`linear-gradient(135deg,rgba(245,158,11,.2),rgba(245,158,11,.05))`,border:"1px solid rgba(245,158,11,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>⭐</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:2}}>{rev.customer}</div>
                    <div style={{fontSize:11,color:S.textMuted}}>{ag?.name} · {formatDate(rev.createdAt)}</div>
                  </div>
                  <div style={{display:"flex",gap:5}}>
                    {[1,2,3,4,5].map(s=><span key={s} style={{color:s<=rev.rating?"#F59E0B":"rgba(255,255,255,.15)",fontSize:14}}>★</span>)}
                  </div>
                </div>
                <p style={{fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.6,margin:"0 0 12px 0"}}>{rev.text}</p>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:7,
                    background:rev.status==="pending"?"rgba(245,158,11,.12)":rev.status==="approved"?"rgba(16,185,129,.12)":"rgba(239,68,68,.12)",
                    color:rev.status==="pending"?S.amber:rev.status==="approved"?S.green:S.red}}>
                    {rev.status==="pending"?"معلق":rev.status==="approved"?"مقبول":"مرفوض"}
                  </span>
                  {rev.status==="pending"&&<>
                    <button onClick={()=>setReviews(p=>p.map(r=>r.id===rev.id?{...r,status:"approved"}:r))}
                      style={{background:"rgba(16,185,129,.12)",border:`1px solid rgba(16,185,129,.2)`,color:S.green,borderRadius:7,padding:"5px 14px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                      <I.Check/> قبول
                    </button>
                    <button onClick={()=>setReviews(p=>p.map(r=>r.id===rev.id?{...r,status:"rejected"}:r))}
                      style={{background:"rgba(239,68,68,.1)",border:`1px solid rgba(239,68,68,.2)`,color:S.red,borderRadius:7,padding:"5px 14px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
                      <I.X/> رفض
                    </button>
                  </>}
                  {rev.status!=="pending"&&<button onClick={()=>setReviews(p=>p.filter(r=>r.id!==rev.id))}
                    style={{background:"rgba(107,114,128,.1)",border:`1px solid rgba(107,114,128,.2)`,color:S.textMuted,borderRadius:7,padding:"5px 12px",cursor:"pointer",fontSize:11}}>
                    حذف
                  </button>}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:S.textDim,fontSize:14}}>لا توجد تعليقات في هذه الفئة</div>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// REQUESTS PAGE — قائمة طلبات التسجيل + معاينة كاملة
// ══════════════════════════════════════════════════════════════
function RequestsPage({agencies,onAction}) {
  const requests = agencies.filter(a=>a.pendingApproval);
  const [previewId,setPreviewId] = useState(null);
  const [search,setSearch] = useState("");

  const filtered = requests.filter(ag=>
    !search || ag.name.includes(search) || ag.owner.includes(search) || ag.wilaya.includes(search)
  );

  const previewAg = agencies.find(a=>a.id===previewId);

  const planColors = {premium:"#F59E0B",standard:S.purple,basic:S.blue};
  const planLabels = {premium:"مميزة ⭐",standard:"قياسية",basic:"أساسية"};

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:4}}>📋 طلبات التسجيل</h1>
          <p style={{fontSize:12,color:S.textMuted,margin:0}}>
            {requests.length > 0
              ? <><span style={{color:S.amber,fontWeight:700}}>{requests.length}</span> طلب ينتظر المراجعة والموافقة</>
              : "لا توجد طلبات معلقة"}
          </p>
        </div>
        {requests.length > 0 && (
          <div style={{background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.25)",borderRadius:10,padding:"8px 16px",display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:S.amber,animation:"pulse 1.5s infinite"}}/>
            <span style={{fontSize:12,color:S.amber,fontWeight:700}}>{requests.length} طلب جديد</span>
          </div>
        )}
      </div>

      {/* Search */}
      {requests.length > 0 && (
        <div style={{position:"relative",marginBottom:18,maxWidth:360}}>
          <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",color:S.textMuted}}><I.Search/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث باسم الوكالة أو المالك..."
            style={{width:"100%",background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"9px 38px 9px 14px",fontSize:13}}/>
        </div>
      )}

      {/* Empty state */}
      {requests.length === 0 ? (
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:18,padding:"72px 20px",textAlign:"center"}}>
          <div style={{fontSize:52,marginBottom:16,opacity:.4}}>📭</div>
          <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:8}}>لا توجد طلبات معلقة</div>
          <div style={{fontSize:13,color:S.textMuted}}>جميع طلبات التسجيل تمت معالجتها</div>
        </div>
      ) : (
        <div style={{display:"grid",gap:12}}>
          {filtered.map((ag,idx)=>{
            const planColor = planColors[ag.plan]||S.blue;
            const planLabel = planLabels[ag.plan]||"أساسية";
            return (
              <div key={ag.id}
                style={{background:S.bgCard,border:`1px solid rgba(245,158,11,.2)`,borderRadius:16,overflow:"hidden",transition:"border-color .2s,box-shadow .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(245,158,11,.45)";e.currentTarget.style.boxShadow="0 4px 24px rgba(245,158,11,.08)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(245,158,11,.2)";e.currentTarget.style.boxShadow="none"}}>

                {/* Row */}
                <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
                  {/* Index + avatar */}
                  <div style={{position:"relative",flexShrink:0}}>
                    <div style={{width:50,height:50,borderRadius:14,background:`linear-gradient(135deg,rgba(245,158,11,.2),rgba(245,158,11,.06))`,border:"1px solid rgba(245,158,11,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🏢</div>
                    <div style={{position:"absolute",top:-6,right:-6,background:S.amber,color:"#000",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{idx+1}</div>
                  </div>

                  {/* Info */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                      <span style={{fontSize:15,fontWeight:800,color:"#fff"}}>{ag.name}</span>
                      <span style={{background:planColor+"20",color:planColor,borderRadius:6,padding:"2px 10px",fontSize:10,fontWeight:800}}>{planLabel}</span>
                      <span style={{background:"rgba(245,158,11,.12)",color:S.amber,borderRadius:6,padding:"2px 9px",fontSize:10,fontWeight:700}}>🕐 جديد</span>
                    </div>
                    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                      <span style={{fontSize:12,color:S.textMuted,display:"flex",alignItems:"center",gap:4}}>
                        👤 {ag.owner}
                      </span>
                      <span style={{fontSize:12,color:S.textMuted,display:"flex",alignItems:"center",gap:4}}>
                        <I.Pin/> {getWilaya(ag.wilaya)}
                      </span>
                      <span style={{fontSize:12,color:S.textMuted}}>📞 {ag.phone}</span>
                      <span style={{fontSize:11,color:S.textDim}}>📅 {formatDate(ag.createdAt)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{display:"flex",gap:8,flexShrink:0,alignItems:"center"}}>
                    <button onClick={()=>setPreviewId(ag.id===previewId?null:ag.id)}
                      style={{background:previewId===ag.id?S.purpleLight:"rgba(255,255,255,.06)",border:`1px solid ${previewId===ag.id?S.purple+"55":S.border}`,color:previewId===ag.id?S.purpleBright:S.textMuted,borderRadius:9,padding:"8px 14px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}>
                      <I.Eye/> {previewId===ag.id?"إخفاء":"معاينة"}
                    </button>
                    <button onClick={()=>onAction(ag.id,"reject")}
                      style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",color:S.red,borderRadius:9,padding:"8px 16px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,.18)"}
                      onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,.08)"}>
                      <I.X/> رفض
                    </button>
                    <button onClick={()=>onAction(ag.id,"approve")}
                      style={{background:`linear-gradient(135deg,${S.green},#059669)`,border:"none",color:"#fff",borderRadius:9,padding:"8px 20px",cursor:"pointer",fontSize:12,fontWeight:800,display:"flex",alignItems:"center",gap:6,boxShadow:"0 4px 14px rgba(16,185,129,.25)",transition:"all .2s"}}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                      <I.Check/> قبول وتفعيل
                    </button>
                  </div>
                </div>

                {/* Inline Preview Panel */}
                {previewId===ag.id && (
                  <div style={{borderTop:`1px solid rgba(124,58,237,.2)`,background:"rgba(124,58,237,.04)",padding:"20px 24px",animation:"fadeIn .2s ease"}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>

                      {/* Col 1 — بيانات الوكالة */}
                      <div>
                        <div style={{fontSize:12,fontWeight:800,color:S.purpleBright,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                          🏢 بيانات الوكالة
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                          {[
                            ["اسم الوكالة", ag.name],
                            ["المالك/المدير", ag.owner],
                            ["رقم الهاتف", ag.phone],
                            ["البريد الإلكتروني", ag.email||"—"],
                            ["الولاية", getWilaya(ag.wilaya)],
                            ["تاريخ الطلب", formatDate(ag.createdAt)],
                          ].map(([l,v])=>(
                            <div key={l} style={{background:"rgba(255,255,255,.04)",borderRadius:9,padding:"9px 12px"}}>
                              <div style={{fontSize:10,color:S.textDim,marginBottom:3}}>{l}</div>
                              <div style={{fontSize:12,fontWeight:700,color:"#fff",wordBreak:"break-all"}}>{v}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Col 2 — بيانات الاشتراك */}
                      <div>
                        <div style={{fontSize:12,fontWeight:800,color:S.purpleBright,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
                          💰 بيانات الاشتراك المطلوب
                        </div>
                        <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:14,marginBottom:10}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                            <div>
                              <div style={{fontSize:11,color:S.textDim,marginBottom:4}}>الباقة المطلوبة</div>
                              <span style={{background:planColor+"22",color:planColor,borderRadius:8,padding:"4px 14px",fontSize:13,fontWeight:800}}>{planLabel}</span>
                            </div>
                            <div style={{textAlign:"left"}}>
                              <div style={{fontSize:11,color:S.textDim,marginBottom:2}}>السعر الشهري</div>
                              <div style={{fontSize:20,fontWeight:900,color:planColor}}>{(ag.monthlyPrice||0).toLocaleString()} <span style={{fontSize:11,fontWeight:400}}>دج</span></div>
                            </div>
                          </div>
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                            {[
                              ["مدة الاشتراك", `${ag.subscriptionMonths||1} شهر`],
                              ["الإجمالي", `${((ag.monthlyPrice||0)*(ag.subscriptionMonths||1)).toLocaleString()} دج`],
                            ].map(([l,v])=>(
                              <div key={l} style={{background:"rgba(255,255,255,.05)",borderRadius:8,padding:"8px 10px"}}>
                                <div style={{fontSize:10,color:S.textDim,marginBottom:2}}>{l}</div>
                                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{v}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Features of the plan */}
                        <div style={{background:"rgba(255,255,255,.03)",borderRadius:10,padding:"10px 14px"}}>
                          <div style={{fontSize:10,color:S.textDim,marginBottom:8,fontWeight:700}}>مزايا الباقة</div>
                          {({
                            premium:["سيارات غير محدودة","ظهور في شريط السلايدر","دعم 24/7","تمييز تلقائي"],
                            standard:["حتى 15 سيارة","أولوية في الدعم","إمكانية التمييز","ظهور متقدم"],
                            basic:["حتى 5 سيارات","دعم عادي","ظهور عادي","بدون تمييز"],
                          }[ag.plan]||["حتى 5 سيارات","دعم عادي"]).map(f=>(
                            <div key={f} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                              <div style={{width:5,height:5,borderRadius:"50%",background:planColor,flexShrink:0}}/>
                              <span style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom actions in preview */}
                    <div style={{marginTop:18,paddingTop:16,borderTop:`1px solid rgba(255,255,255,.07)`,display:"flex",justifyContent:"flex-end",gap:10}}>
                      <button onClick={()=>{onAction(ag.id,"reject");setPreviewId(null);}}
                        style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",color:S.red,borderRadius:9,padding:"9px 22px",cursor:"pointer",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",gap:7}}>
                        <I.X/> رفض الطلب
                      </button>
                      <button onClick={()=>{onAction(ag.id,"approve");setPreviewId(null);}}
                        style={{background:`linear-gradient(135deg,${S.green},#059669)`,border:"none",color:"#fff",borderRadius:9,padding:"9px 28px",cursor:"pointer",fontSize:13,fontWeight:800,display:"flex",alignItems:"center",gap:7,boxShadow:"0 4px 18px rgba(16,185,129,.3)"}}>
                        <I.Check/> قبول وتفعيل الوكالة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length===0&&search&&(
            <div style={{textAlign:"center",padding:"40px",color:S.textDim,fontSize:13}}>لا توجد نتائج للبحث عن "{search}"</div>
          )}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// RENEWALS PAGE — طلبات تجديد الاشتراك
// ══════════════════════════════════════════════════════════════
function RenewalsPage({agencies,onAction}) {
  const renewals = agencies.filter(a=>a.renewalRequest);
  const [previewId,setPreviewId] = useState(null);
  const [editMonths,setEditMonths] = useState({});

  const planColors = {premium:"#F59E0B",standard:S.purple,basic:S.blue};
  const planLabels = {premium:"مميزة ⭐",standard:"قياسية",basic:"أساسية"};

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:4}}>🔄 طلبات تجديد الاشتراك</h1>
          <p style={{fontSize:12,color:S.textMuted,margin:0}}>
            {renewals.length>0
              ? <><span style={{color:"#A78BFA",fontWeight:700}}>{renewals.length}</span> طلب تجديد ينتظر الموافقة</>
              : "لا توجد طلبات تجديد معلقة"}
          </p>
        </div>
        {renewals.length>0&&(
          <div style={{background:"rgba(124,58,237,.1)",border:`1px solid rgba(124,58,237,.3)`,borderRadius:10,padding:"8px 16px",display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:S.purple,animation:"pulse 1.5s infinite"}}/>
            <span style={{fontSize:12,color:S.purpleBright,fontWeight:700}}>{renewals.length} طلب جديد</span>
          </div>
        )}
      </div>

      {/* Empty */}
      {renewals.length===0?(
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:18,padding:"72px 20px",textAlign:"center"}}>
          <div style={{fontSize:52,marginBottom:16,opacity:.4}}>🔄</div>
          <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:8}}>لا توجد طلبات تجديد</div>
          <div style={{fontSize:13,color:S.textMuted}}>ستظهر هنا طلبات التجديد من الوكالات</div>
        </div>
      ):(
        <div style={{display:"grid",gap:14}}>
          {renewals.map((ag,idx)=>{
            const planColor = planColors[ag.plan]||S.blue;
            const planLabel = planLabels[ag.plan]||"أساسية";
            const d = daysLeft(ag.subscriptionEnd);
            const expired = d===0 && ag.subscriptionEnd;
            const urgColor = expired?S.red:d<=7?S.amber:S.green;
            const reqMonths = editMonths[ag.id]??ag.renewalMonths??ag.subscriptionMonths??1;
            const previewTotal = (ag.monthlyPrice||0)*reqMonths;
            const previewEndDate = (()=>{const dt=new Date();dt.setMonth(dt.getMonth()+reqMonths);return dt.toLocaleDateString("ar-DZ");})();

            return (
              <div key={ag.id}
                style={{background:S.bgCard,border:`1px solid rgba(124,58,237,.25)`,borderRadius:16,overflow:"hidden",transition:"border-color .2s,box-shadow .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(124,58,237,.5)";e.currentTarget.style.boxShadow=`0 4px 24px rgba(124,58,237,.1)`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(124,58,237,.25)";e.currentTarget.style.boxShadow="none"}}>

                {/* Main row */}
                <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
                  {/* Avatar + index */}
                  <div style={{position:"relative",flexShrink:0}}>
                    <div style={{width:50,height:50,borderRadius:14,background:`linear-gradient(135deg,rgba(124,58,237,.25),rgba(124,58,237,.08))`,border:`1px solid rgba(124,58,237,.3)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🏢</div>
                    <div style={{position:"absolute",top:-6,right:-6,background:S.purple,color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{idx+1}</div>
                  </div>

                  {/* Info */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
                      <span style={{fontSize:15,fontWeight:800,color:"#fff"}}>{ag.name}</span>
                      <span style={{background:planColor+"20",color:planColor,borderRadius:6,padding:"2px 10px",fontSize:10,fontWeight:800}}>{planLabel}</span>
                      <span style={{background:urgColor+"18",color:urgColor,borderRadius:6,padding:"2px 10px",fontSize:10,fontWeight:800}}>
                        {expired?"⛔ منتهي":d<=7?`⚠ ${d} يوم متبقي`:`✓ ${d} يوم متبقي`}
                      </span>
                      <span style={{background:"rgba(124,58,237,.12)",color:S.purpleBright,borderRadius:6,padding:"2px 9px",fontSize:10,fontWeight:700}}>🔄 طلب تجديد</span>
                    </div>
                    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                      <span style={{fontSize:12,color:S.textMuted}}>👤 {ag.owner}</span>
                      <span style={{fontSize:12,color:S.textMuted}}><I.Pin/> {getWilaya(ag.wilaya)}</span>
                      <span style={{fontSize:12,color:S.textMuted}}>📞 {ag.phone}</span>
                      <span style={{fontSize:11,color:S.textDim}}>📅 طُلب في: {formatDate(ag.renewalRequestDate)}</span>
                    </div>
                  </div>

                  {/* Quick months selector */}
                  <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                    <div style={{display:"flex",gap:4}}>
                      {[1,3,6,12].map(m=>(
                        <button key={m} onClick={()=>setEditMonths(p=>({...p,[ag.id]:m}))}
                          style={{background:reqMonths===m?`linear-gradient(135deg,${S.purple},#4F46E5)`:"rgba(255,255,255,.06)",border:`1px solid ${reqMonths===m?S.purple:S.border}`,color:reqMonths===m?"#fff":S.textMuted,borderRadius:7,padding:"5px 9px",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all .15s"}}>
                          {m}ش
                        </button>
                      ))}
                    </div>
                    <button onClick={()=>setPreviewId(previewId===ag.id?null:ag.id)}
                      style={{background:previewId===ag.id?S.purpleLight:"rgba(255,255,255,.06)",border:`1px solid ${previewId===ag.id?S.purple+"55":S.border}`,color:previewId===ag.id?S.purpleBright:S.textMuted,borderRadius:9,padding:"7px 13px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5,transition:"all .2s"}}>
                      <I.Eye/> {previewId===ag.id?"إخفاء":"تفاصيل"}
                    </button>
                  </div>

                  {/* Action buttons */}
                  <div style={{display:"flex",gap:8,flexShrink:0}}>
                    <button onClick={()=>{onAction(ag.id,"rejectRenewal");}}
                      style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",color:S.red,borderRadius:9,padding:"8px 14px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5,transition:"all .2s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,.18)"}
                      onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,.08)"}>
                      <I.X/> رفض
                    </button>
                    <button onClick={()=>{onAction(ag.id,"setRenewalMonths",reqMonths);onAction(ag.id,"approveRenewal");}}
                      style={{background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:9,padding:"8px 18px",cursor:"pointer",fontSize:12,fontWeight:800,display:"flex",alignItems:"center",gap:5,boxShadow:`0 4px 14px rgba(124,58,237,.3)`,transition:"all .2s"}}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                      <I.Check/> تجديد {reqMonths}ش
                    </button>
                  </div>
                </div>

                {/* Inline Preview */}
                {previewId===ag.id&&(
                  <div style={{borderTop:`1px solid rgba(124,58,237,.2)`,background:"rgba(124,58,237,.04)",padding:"20px 24px",animation:"fadeIn .2s ease"}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>

                      {/* Col 1 — بيانات الوكالة */}
                      <div>
                        <div style={{fontSize:11,fontWeight:800,color:S.purpleBright,marginBottom:10,display:"flex",alignItems:"center",gap:5}}>🏢 بيانات الوكالة</div>
                        <div style={{display:"grid",gap:7}}>
                          {[["الوكالة",ag.name],["المالك",ag.owner],["الهاتف",ag.phone],["البريد",ag.email||"—"],["الولاية",getWilaya(ag.wilaya)],["التقييم",ag.rating>0?`⭐ ${ag.rating}`:"—"]].map(([l,v])=>(
                            <div key={l} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"7px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                              <span style={{fontSize:10,color:S.textDim}}>{l}</span>
                              <span style={{fontSize:11,fontWeight:700,color:"#fff"}}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Col 2 — الاشتراك الحالي */}
                      <div>
                        <div style={{fontSize:11,fontWeight:800,color:S.purpleBright,marginBottom:10,display:"flex",alignItems:"center",gap:5}}>📋 الاشتراك الحالي</div>
                        <div style={{background:"rgba(255,255,255,.03)",borderRadius:12,padding:14,marginBottom:10}}>
                          <SubCountdown agency={ag}/>
                        </div>
                        <div style={{display:"grid",gap:7}}>
                          {[["الباقة",planLabel],["السعر الشهري",`${ag.monthlyPrice.toLocaleString()} دج`],["بداية",formatDate(ag.subscriptionStart)],["نهاية",formatDate(ag.subscriptionEnd)],["السيارات",`${ag.cars} سيارة`],["الحجوزات",`${ag.bookings} حجز`]].map(([l,v])=>(
                            <div key={l} style={{background:"rgba(255,255,255,.04)",borderRadius:8,padding:"7px 10px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                              <span style={{fontSize:10,color:S.textDim}}>{l}</span>
                              <span style={{fontSize:11,fontWeight:700,color:"#fff"}}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Col 3 — معاينة التجديد */}
                      <div>
                        <div style={{fontSize:11,fontWeight:800,color:S.purpleBright,marginBottom:10,display:"flex",alignItems:"center",gap:5}}>🔄 معاينة التجديد</div>

                        {/* Months picker */}
                        <div style={{marginBottom:12}}>
                          <div style={{fontSize:10,color:S.textDim,marginBottom:7,fontWeight:700}}>مدة التجديد المطلوبة</div>
                          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:8}}>
                            {[1,3,6,12].map(m=>(
                              <button key={m} onClick={()=>setEditMonths(p=>({...p,[ag.id]:m}))}
                                style={{background:reqMonths===m?`linear-gradient(135deg,${S.purple},#4F46E5)`:"rgba(255,255,255,.06)",border:`1px solid ${reqMonths===m?S.purple:S.border}`,color:reqMonths===m?"#fff":S.textMuted,borderRadius:7,padding:"7px 4px",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all .15s"}}>
                                {m} {m===1?"شهر":"أشهر"}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Preview card */}
                        <div style={{background:`linear-gradient(135deg,rgba(124,58,237,.15),rgba(79,70,229,.08))`,border:`1px solid rgba(124,58,237,.3)`,borderRadius:12,padding:14,marginBottom:12}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                            <div>
                              <div style={{fontSize:10,color:S.textDim,marginBottom:3}}>يبدأ من اليوم</div>
                              <div style={{fontSize:12,color:"#fff",fontWeight:700}}>ينتهي: {previewEndDate}</div>
                            </div>
                            <div style={{textAlign:"left"}}>
                              <div style={{fontSize:10,color:S.textDim,marginBottom:2}}>الإجمالي</div>
                              <div style={{fontSize:20,fontWeight:900,color:S.purpleBright}}>{previewTotal.toLocaleString()}<span style={{fontSize:10,fontWeight:400}}> دج</span></div>
                            </div>
                          </div>
                          <div style={{height:1,background:"rgba(255,255,255,.08)",marginBottom:10}}/>
                          <div style={{fontSize:10,color:S.textDim,display:"flex",justifyContent:"space-between"}}>
                            <span>{ag.monthlyPrice.toLocaleString()} دج × {reqMonths} شهر</span>
                            <span style={{color:planColor,fontWeight:700}}>{planLabel}</span>
                          </div>
                        </div>

                        {/* Confirm actions */}
                        <div style={{display:"flex",gap:8}}>
                          <button onClick={()=>{onAction(ag.id,"rejectRenewal");setPreviewId(null);}}
                            style={{flex:1,background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",color:S.red,borderRadius:9,padding:"9px 0",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                            <I.X/> رفض
                          </button>
                          <button onClick={()=>{onAction(ag.id,"setRenewalMonths",reqMonths);onAction(ag.id,"approveRenewal");setPreviewId(null);}}
                            style={{flex:2,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:9,padding:"9px 0",cursor:"pointer",fontSize:12,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",gap:5,boxShadow:`0 4px 14px rgba(124,58,237,.3)`}}>
                            <I.Check/> تأكيد التجديد
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
// ══════════════════════════════════════════════════════════════
function FeaturedPage({agencies,onAction}) {
  const featured = agencies.filter(a=>a.featured&&!a.suspended);
  const eligible = agencies.filter(a=>!a.featured&&a.verified&&!a.suspended&&a.status==="active");
  const [featuredTimers,setFeaturedTimers] = useState(()=>{
    const init={};
    agencies.filter(a=>a.featured).forEach(ag=>{
      const now = new Date();
      const start = new Date(now.getFullYear(),now.getMonth(),1);
      const end = new Date(now.getFullYear(),now.getMonth()+1,1);
      init[ag.id]={start:start.toISOString().split("T")[0],end:end.toISOString().split("T")[0]};
    });
    return init;
  });

  const getDaysInMonth = ()=>new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate();
  const getDayOfMonth = ()=>new Date().getDate();

  const featurePct = () => Math.round((getDayOfMonth()/getDaysInMonth())*100);
  const daysRemaining = ()=>getDaysInMonth()-getDayOfMonth();

  const handleFeature = (id) => {
    onAction(id,"feature");
    if(!featuredTimers[id]) {
      const now = new Date();
      const start = new Date(now.getFullYear(),now.getMonth(),1);
      const end = new Date(now.getFullYear(),now.getMonth()+1,1);
      setFeaturedTimers(p=>({...p,[id]:{start:start.toISOString().split("T")[0],end:end.toISOString().split("T")[0]}}));
    }
  };

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      <div style={{marginBottom:22}}>
        <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:4}}>🌟 الوكالات المميزة — شريط السلايدر</h1>
        <p style={{fontSize:12,color:S.textMuted,margin:0}}>{featured.length} وكالة مميزة تظهر في الشريط · تجديد تلقائي كل بداية شهر</p>
      </div>

      {/* Slider Preview */}
      <div style={{background:S.bgCard,border:`1px solid rgba(124,58,237,.3)`,borderRadius:18,padding:"16px 0",marginBottom:22,overflow:"hidden"}}>
        <div style={{padding:"0 20px",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
          <I.Slider/>
          <span style={{fontSize:12,fontWeight:700,color:S.purpleBright}}>معاينة شريط السلايدر على المنصة الرئيسية</span>
          <span style={{marginRight:"auto",background:"rgba(16,185,129,.12)",color:S.green,borderRadius:7,padding:"2px 10px",fontSize:10,fontWeight:700}}>🔴 مباشر</span>
        </div>
        {featured.length===0 ? (
          <div style={{padding:"24px",textAlign:"center",color:S.textDim,fontSize:12}}>لا توجد وكالات مميزة — أضف وكالات لتظهر في الشريط</div>
        ) : (
          <div style={{overflow:"hidden",position:"relative"}}>
            <div style={{display:"flex",gap:14,animation:"sliderMove 20s linear infinite",width:"max-content",padding:"0 20px"}}>
              {[...featured,...featured].map((ag,i)=>(
                <div key={ag.id+"-"+i} style={{flexShrink:0,width:200,background:`linear-gradient(135deg,rgba(124,58,237,.15),rgba(79,70,229,.08))`,border:`1px solid rgba(124,58,237,.3)`,borderRadius:14,padding:"14px 16px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🏢</div>
                    <div>
                      <div style={{fontSize:11,fontWeight:800,color:"#fff",lineHeight:1.2}}>{ag.name}</div>
                      <div style={{fontSize:10,color:S.purpleBright}}>⭐ {ag.rating>0?ag.rating:"جديد"}</div>
                    </div>
                  </div>
                  <div style={{fontSize:10,color:S.textMuted}}>{getWilaya(ag.wilaya)}</div>
                  <div style={{marginTop:6,background:"rgba(255,255,255,.08)",borderRadius:6,padding:"3px 8px",fontSize:9,color:S.purpleBright,textAlign:"center",fontWeight:700}}>🌟 وكالة مميزة</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Monthly counter info */}
      <div style={{background:"rgba(124,58,237,.07)",border:`1px solid rgba(124,58,237,.2)`,borderRadius:14,padding:"14px 18px",marginBottom:22,display:"flex",alignItems:"center",gap:16}}>
        <div style={{width:56,height:56,borderRadius:14,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",flexShrink:0}}>
          <span style={{fontSize:18,fontWeight:900,color:"#fff",lineHeight:1}}>{daysRemaining()}</span>
          <span style={{fontSize:9,color:"rgba(255,255,255,.7)"}}>يوم</span>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:800,color:"#fff",marginBottom:4}}>
            {daysRemaining()} يوم حتى التجديد التلقائي
          </div>
          <div style={{height:6,background:"rgba(255,255,255,.07)",borderRadius:99,overflow:"hidden",marginBottom:4}}>
            <div style={{height:"100%",width:`${featurePct()}%`,background:`linear-gradient(90deg,${S.purple},${S.purpleBright})`,borderRadius:99,transition:"width .5s"}}/>
          </div>
          <div style={{fontSize:11,color:S.textDim}}>
            اليوم {getDayOfMonth()} من {getDaysInMonth()} · يُعاد تفعيل الاشتراك المميز تلقائياً في بداية كل شهر
          </div>
        </div>
      </div>

      {/* Current featured agencies */}
      <div style={{marginBottom:22}}>
        <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
          <span style={{color:"#F59E0B"}}>⭐</span> الوكالات المميزة حالياً ({featured.length})
        </div>
        {featured.length===0&&<div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:12,padding:"28px",textAlign:"center",color:S.textDim,fontSize:13}}>لا توجد وكالات مميزة حالياً</div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
          {featured.map(ag=>{
            const t = featuredTimers[ag.id];
            const dLeft = t?Math.max(0,Math.ceil((new Date(t.end)-new Date())/(86400000))):daysRemaining();
            const pct = Math.round((getDayOfMonth()/getDaysInMonth())*100);
            return (
              <div key={ag.id} style={{background:S.bgCard,border:`1px solid rgba(245,158,11,.3)`,borderRadius:14,padding:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:800,color:"#fff",marginBottom:2}}>{ag.name}</div>
                    <div style={{fontSize:11,color:S.textMuted}}>{getWilaya(ag.wilaya)} · ⭐ {ag.rating||"—"}</div>
                  </div>
                  <button onClick={()=>onAction(ag.id,"feature")}
                    style={{background:"rgba(239,68,68,.1)",border:`1px solid rgba(239,68,68,.25)`,color:S.red,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:700}}>
                    ✕ إزالة
                  </button>
                </div>
                {/* Monthly countdown */}
                <div style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontSize:10,color:S.textDim}}>العداد الشهري</span>
                    <span style={{fontSize:10,fontWeight:700,color:dLeft<=3?S.red:dLeft<=7?S.amber:S.green}}>{dLeft} يوم</span>
                  </div>
                  <div style={{height:5,background:"rgba(255,255,255,.06)",borderRadius:99,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${100-pct}%`,background:dLeft<=3?`linear-gradient(90deg,${S.red},#FF6B6B)`:dLeft<=7?`linear-gradient(90deg,${S.amber},#FBBF24)`:`linear-gradient(90deg,${S.green},#34D399)`,borderRadius:99,transition:"width .5s"}}/>
                  </div>
                </div>
                <div style={{fontSize:10,color:S.textDim}}>🔄 يُجدَّد في: أول {new Date(new Date().getFullYear(),new Date().getMonth()+1,1).toLocaleDateString("ar-DZ")}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add to featured */}
      <div>
        <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
          <I.Plus/> إضافة وكالة للشريط المميز ({eligible.length} متاحة)
        </div>
        {eligible.length===0&&<div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:12,padding:"20px",textAlign:"center",color:S.textDim,fontSize:12}}>جميع الوكالات الموثقة النشطة مضافة بالفعل</div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
          {eligible.map(ag=>(
            <div key={ag.id} style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,transition:"border-color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(245,158,11,.3)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:1}}>{ag.name}</div>
                <div style={{fontSize:11,color:S.textMuted}}>{getWilaya(ag.wilaya)} · {ag.plan}</div>
              </div>
              <button onClick={()=>handleFeature(ag.id)}
                style={{background:`linear-gradient(135deg,rgba(245,158,11,.2),rgba(245,158,11,.1))`,border:`1px solid rgba(245,158,11,.4)`,color:"#FCD34D",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=`linear-gradient(135deg,rgba(245,158,11,.35),rgba(245,158,11,.2))`}}
                onMouseLeave={e=>{e.currentTarget.style.background=`linear-gradient(135deg,rgba(245,158,11,.2),rgba(245,158,11,.1))`}}>
                ⭐ إضافة
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PRICING PAGE — إدارة تسعيرة الاشتراكات (محسّن)
// ══════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
// PLAN CARD — standalone component (no nested definition)
// ══════════════════════════════════════════════════════════════
function PlanCard({planKey,info,isCustom=false,agencies,editingPlan,editBuf,setEditBuf,editFeatIdx,setEditFeatIdx,startEdit,saveEdit,setEditingPlan,applyToAll,setDeleteConfirm}) {
  const agCount = agencies.filter(a=>a.plan===planKey).length;
  const isEditing = editingPlan===planKey;
  const monthlyRevenue = info.isFree ? 0 : info.price * agCount;

  return (
    <div style={{background:S.bgCard,border:`2px solid ${isEditing?info.color:info.color+"33"}`,borderRadius:18,padding:22,transition:"border-color .2s",position:"relative"}}
      onMouseEnter={e=>{if(!isEditing)e.currentTarget.style.borderColor=info.color+"77";}}
      onMouseLeave={e=>{if(!isEditing)e.currentTarget.style.borderColor=info.color+"33";}}>

      {info.isFree&&<div style={{position:"absolute",top:14,left:14,background:"linear-gradient(135deg,#34D39933,#10B98122)",border:"1px solid #34D39955",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:800,color:"#34D399"}}>🎁 مجانية 6 أشهر</div>}
      {isCustom&&!isEditing&&<div style={{position:"absolute",top:14,left:14,background:"rgba(99,102,241,.15)",border:"1px solid rgba(99,102,241,.3)",borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700,color:"#818CF8"}}>✨ مخصصة</div>}

      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16,marginTop:info.isFree||isCustom?22:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:46,height:46,borderRadius:13,background:info.color+"1A",border:`1px solid ${info.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
            {isEditing?(
              <input value={editBuf.icon||""} onChange={e=>setEditBuf(p=>({...p,icon:e.target.value}))}
                style={{width:34,background:"none",border:"none",color:"#fff",fontSize:20,textAlign:"center",padding:0}}/>
            ):info.icon}
          </div>
          <div>
            {isEditing?(
              <input value={editBuf.label||""} onChange={e=>setEditBuf(p=>({...p,label:e.target.value}))}
                style={{background:"rgba(255,255,255,.08)",border:`1px solid ${info.color}66`,borderRadius:7,color:"#fff",padding:"4px 9px",fontSize:14,fontWeight:800,width:120,marginBottom:3}}/>
            ):(
              <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>باقة {info.label}</div>
            )}
            <div style={{fontSize:11,color:S.textMuted,marginTop:2}}>{agCount} وكالة مشتركة</div>
          </div>
        </div>
        <div style={{display:"flex",gap:5,flexShrink:0}}>
          {!isEditing?(
            <>
              <button onClick={()=>startEdit(planKey)}
                style={{background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:8,padding:"5px 9px",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",gap:4}}>
                <I.Edit/> تعديل
              </button>
              {isCustom&&(
                <button onClick={()=>setDeleteConfirm(planKey)}
                  style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",color:S.red,borderRadius:8,padding:"5px 8px",cursor:"pointer",fontSize:11}}>
                  <I.Trash/>
                </button>
              )}
            </>
          ):(
            <div style={{display:"flex",gap:5}}>
              <button onClick={()=>saveEdit(planKey)} style={{background:S.green+"22",border:`1px solid ${S.green}44`,color:S.green,borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:700}}>✓ حفظ</button>
              <button onClick={()=>setEditingPlan(null)} style={{background:"rgba(255,255,255,.04)",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:7,padding:"5px 8px",cursor:"pointer",fontSize:11}}>✕</button>
            </div>
          )}
        </div>
      </div>

      {/* Duration */}
      {isEditing?(
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10,color:S.textDim,marginBottom:5,fontWeight:700}}>مدة الباقة (أشهر) — اتركه فارغاً إذا غير محددة</div>
          <input type="number" value={editBuf.durationMonths||""} onChange={e=>setEditBuf(p=>({...p,durationMonths:e.target.value}))} min="1" max="24" placeholder="مثال: 6"
            style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${info.color}44`,borderRadius:8,color:"#fff",padding:"7px 10px",fontSize:12}}/>
        </div>
      ):(info.durationMonths&&(
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,background:info.color+"0F",border:`1px solid ${info.color}22`,borderRadius:8,padding:"6px 11px"}}>
          <span style={{fontSize:13}}>⏱️</span>
          <span style={{fontSize:12,color:info.color,fontWeight:700}}>مدة {info.durationMonths} أشهر ثم تنتهي تلقائياً</span>
        </div>
      ))}

      {/* Description */}
      {isEditing?(
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10,color:S.textDim,marginBottom:5,fontWeight:700}}>وصف مختصر</div>
          <input value={editBuf.desc||""} onChange={e=>setEditBuf(p=>({...p,desc:e.target.value}))}
            style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${info.color}44`,borderRadius:8,color:"#fff",padding:"7px 10px",fontSize:12}}/>
        </div>
      ):(
        <div style={{fontSize:11,color:S.textMuted,marginBottom:12,lineHeight:1.55}}>{info.desc}</div>
      )}

      {/* Features */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:10,color:S.textDim,fontWeight:700,marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          المزايا
          {isEditing&&<button onClick={()=>setEditBuf(p=>({...p,featuresBuf:[...(p.featuresBuf||[]),"ميزة جديدة"]}))}
            style={{background:info.color+"20",border:"none",color:info.color,borderRadius:5,padding:"2px 8px",cursor:"pointer",fontSize:10,fontWeight:700}}>+ إضافة</button>}
        </div>
        {(isEditing?(editBuf.featuresBuf||[]):info.features).map((f,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:info.color,flexShrink:0,marginTop:1}}/>
            {isEditing&&editFeatIdx===i?(
              <div style={{display:"flex",flex:1,gap:4}}>
                <input value={(editBuf.featuresBuf||[])[i]||""} onChange={e=>setEditBuf(p=>({...p,featuresBuf:p.featuresBuf.map((x,j)=>j===i?e.target.value:x)}))}
                  autoFocus style={{flex:1,background:"rgba(255,255,255,.09)",border:`1px solid ${info.color}66`,borderRadius:6,color:"#fff",padding:"3px 8px",fontSize:12}}/>
                <button onClick={()=>setEditFeatIdx(null)} style={{background:"none",border:"none",color:S.green,cursor:"pointer",fontSize:14,fontWeight:900}}>✓</button>
                <button onClick={()=>{setEditBuf(p=>({...p,featuresBuf:p.featuresBuf.filter((_,j)=>j!==i)}));setEditFeatIdx(null);}} style={{background:"none",border:"none",color:S.red,cursor:"pointer",fontSize:14}}>✕</button>
              </div>
            ):(
              <span onClick={()=>isEditing&&setEditFeatIdx(i)}
                style={{fontSize:12,color:"rgba(255,255,255,.68)",flex:1,cursor:isEditing?"pointer":"default",padding:isEditing?"2px 6px":"0",borderRadius:4,background:isEditing?"rgba(255,255,255,.05)":"none"}}>{f}</span>
            )}
          </div>
        ))}
      </div>

      {/* Price */}
      <div style={{background:"rgba(255,255,255,.04)",borderRadius:12,padding:"13px 16px",marginBottom:12}}>
        {info.isFree?(
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:28,fontWeight:900,color:"#34D399"}}>مجانية</span>
            <span style={{fontSize:12,color:S.textDim}}>لمدة 6 أشهر</span>
          </div>
        ):(
          isEditing?(
            <div>
              <div style={{fontSize:10,color:S.textDim,marginBottom:5}}>السعر الشهري (دج)</div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input type="number" value={editBuf.price||0} onChange={e=>setEditBuf(p=>({...p,price:e.target.value}))}
                  style={{flex:1,background:"rgba(255,255,255,.08)",border:`1px solid ${info.color}`,borderRadius:8,color:"#fff",padding:"8px 12px",fontSize:18,fontWeight:700}}/>
                <span style={{fontSize:12,color:S.textDim,whiteSpace:"nowrap"}}>دج/شهر</span>
              </div>
            </div>
          ):(
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
              <div>
                <span style={{fontSize:26,fontWeight:900,color:info.color}}>{info.price.toLocaleString()}</span>
                <span style={{fontSize:12,color:S.textMuted}}> دج/شهر</span>
              </div>
              <button onClick={()=>applyToAll(planKey)}
                style={{background:`${info.color}22`,border:`1px solid ${info.color}44`,color:info.color,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>
                🔄 تطبيق على الكل
              </button>
            </div>
          )
        )}
      </div>

      {/* Stats */}
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1,background:"rgba(255,255,255,.03)",borderRadius:9,padding:"8px 12px",textAlign:"center"}}>
          <div style={{fontSize:9,color:S.textDim,marginBottom:2}}>وكالات</div>
          <div style={{fontSize:16,fontWeight:900,color:"#fff"}}>{agCount}</div>
        </div>
        <div style={{flex:2,background:"rgba(255,255,255,.03)",borderRadius:9,padding:"8px 12px",textAlign:"center"}}>
          <div style={{fontSize:9,color:S.textDim,marginBottom:2}}>الإيراد الشهري</div>
          <div style={{fontSize:13,fontWeight:900,color:info.isFree?S.textDim:info.color}}>
            {info.isFree?"— مجاني —":`${monthlyRevenue.toLocaleString()} دج`}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PRICING PAGE
// ══════════════════════════════════════════════════════════════
function PricingPage({agencies,onAction}) {
  const BUILTIN_DEFAULTS = {
    free:    {price:0,    label:"مجانية",  icon:"🎁", color:"#34D399", isFree:true,  durationMonths:6,   desc:"باقة مجانية لمدة 6 أشهر للوكالات الجديدة", features:["3 سيارات كحد أقصى","دعم عادي","ظهور في المنصة","بدون تمييز"]},
    basic:   {price:3500, label:"أساسية",  icon:"🔵", color:S.blue,    isFree:false, durationMonths:null, desc:"حتى 5 سيارات، دعم عادي، ظهور عادي",          features:["5 سيارات كحد أقصى","دعم عادي","ظهور عادي في المنصة","بدون تمييز"]},
    standard:{price:5000, label:"قياسية",  icon:"🟣", color:S.purple,  isFree:false, durationMonths:null, desc:"حتى 15 سيارة، أولوية في الدعم، إمكانية التمييز", features:["15 سيارة كحد أقصى","دعم ذو أولوية","ظهور متقدم في المنصة","إمكانية التمييز"]},
    premium: {price:8000, label:"مميزة",   icon:"⭐", color:"#F59E0B", isFree:false, durationMonths:null, desc:"سيارات غير محدودة، دعم 24/7، تمييز تلقائي",   features:["سيارات غير محدودة","دعم 24/7","تمييز تلقائي","الظهور في شريط السلايدر"]},
  };

  const [builtinPlans,  setBuiltinPlans]  = useState(()=>Object.fromEntries(Object.entries(BUILTIN_DEFAULTS).map(([k,v])=>[k,{...v}])));
  const [customPlans,   setCustomPlans]   = useState([]);
  const [editingPlan,   setEditingPlan]   = useState(null);
  const [editBuf,       setEditBuf]       = useState({});
  const [editFeatIdx,   setEditFeatIdx]   = useState(null);
  const [saved,         setSaved]         = useState("");
  const [showNewForm,   setShowNewForm]   = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newFormErr,    setNewFormErr]    = useState("");
  const emptyNew = {label:"",icon:"🔷",color:"#6366F1",price:"",durationMonths:"",desc:"",features:[""]};
  const [newForm, setNewForm] = useState(emptyNew);

  const allPlans = {...builtinPlans, ...Object.fromEntries(customPlans.map(p=>[p.id,p]))};
  const showSaved = msg => { setSaved(msg); setTimeout(()=>setSaved(""),3000); };

  const startEdit = key => {
    const plan = allPlans[key];
    setEditBuf({...plan, featuresBuf:[...(plan.features||[])], durationMonths:plan.durationMonths||""});
    setEditingPlan(key);
    setEditFeatIdx(null);
  };

  const saveEdit = key => {
    const isBuiltin = key in builtinPlans;
    const updated = {
      ...allPlans[key],
      label:    editBuf.label,
      desc:     editBuf.desc,
      price:    editBuf.isFree ? 0 : (parseInt(editBuf.price)||0),
      features: (editBuf.featuresBuf||[]).filter(f=>f.trim()),
      durationMonths: editBuf.durationMonths ? parseInt(editBuf.durationMonths) : null,
    };
    if(isBuiltin) setBuiltinPlans(p=>({...p,[key]:updated}));
    else setCustomPlans(p=>p.map(cp=>cp.id===key?updated:cp));
    if(!updated.isFree) agencies.filter(a=>a.plan===key).forEach(ag=>onAction(ag.id,"setPrice",updated.price));
    setEditingPlan(null);
    showSaved(`✅ تم حفظ باقة "${updated.label}"`);
  };

  const applyToAll = key => {
    const plan = allPlans[key];
    if(plan.isFree) return;
    agencies.filter(a=>a.plan===key).forEach(ag=>onAction(ag.id,"setPrice",plan.price));
    showSaved(`✅ تم تطبيق ${plan.price.toLocaleString()} دج على ${agencies.filter(a=>a.plan===key).length} وكالة`);
  };

  const submitNew = () => {
    setNewFormErr("");
    if(!newForm.label.trim()) { setNewFormErr("اسم الباقة مطلوب"); return; }
    if(newForm.price==="") { setNewFormErr("السعر مطلوب"); return; }
    const features = newForm.features.filter(f=>f.trim());
    if(features.length===0) { setNewFormErr("أضف ميزة واحدة على الأقل"); return; }
    const id = "custom_"+Date.now();
    const plan = {
      id, label:newForm.label.trim(), icon:newForm.icon||"🔷", color:newForm.color||"#6366F1",
      isFree:false, price:parseInt(newForm.price)||0,
      durationMonths: newForm.durationMonths ? parseInt(newForm.durationMonths) : null,
      desc:newForm.desc.trim()||features.join("، "), features,
    };
    setCustomPlans(p=>[...p,plan]);
    setShowNewForm(false);
    setNewForm(emptyNew);
    showSaved(`✅ تم إنشاء باقة "${plan.label}"`);
  };

  const deleteCustomPlan = id => {
    setCustomPlans(p=>p.filter(cp=>cp.id!==id));
    setDeleteConfirm(null);
    showSaved("🗑️ تم حذف الباقة");
  };

  const COLOR_PRESETS = ["#7C3AED","#3B82F6","#10B981","#F59E0B","#EF4444","#EC4899","#14B8A6","#6366F1","#F97316","#8B5CF6"];

  // Shared props for PlanCard
  const cardProps = {agencies, editingPlan, editBuf, setEditBuf, editFeatIdx, setEditFeatIdx, startEdit, saveEdit, setEditingPlan, applyToAll, setDeleteConfirm};

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:22,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:4}}>💰 إدارة تسعيرة الاشتراكات</h1>
          <p style={{fontSize:12,color:S.textMuted,margin:0}}>تعديل الباقات الحالية وإنشاء باقات مخصصة جديدة</p>
        </div>
        <button onClick={()=>{setShowNewForm(v=>!v);setNewFormErr("");}}
          style={{background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:11,padding:"10px 20px",cursor:"pointer",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:8}}>
          <I.Plus/> {showNewForm?"إلغاء":"إنشاء باقة جديدة"}
        </button>
      </div>

      {/* Toast */}
      {saved&&(
        <div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.25)",borderRadius:10,padding:"11px 16px",marginBottom:18,fontSize:13,color:S.green,display:"flex",alignItems:"center",gap:8,animation:"fadeIn .3s ease"}}>
          <I.Check/> {saved}
        </div>
      )}

      {/* New Plan Form */}
      {showNewForm&&(
        <div style={{background:"rgba(99,102,241,.06)",border:"1px solid rgba(99,102,241,.28)",borderRadius:18,padding:24,marginBottom:24,animation:"fadeIn .3s ease"}}>
          <div style={{fontSize:15,fontWeight:800,color:"#fff",marginBottom:18}}>✨ إنشاء باقة مخصصة جديدة</div>
          <div className="adm-form-2col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
            <div>
              <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:6}}>اسم الباقة *</label>
              <input value={newForm.label} onChange={e=>setNewForm(p=>({...p,label:e.target.value}))} placeholder="مثال: ذهبية"
                style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(99,102,241,.35)",borderRadius:9,color:"#fff",padding:"9px 13px",fontSize:13}}/>
            </div>
            <div>
              <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:6}}>الأيقونة (إيموجي)</label>
              <input value={newForm.icon} onChange={e=>setNewForm(p=>({...p,icon:e.target.value}))} placeholder="🔷"
                style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,color:"#fff",padding:"9px 13px",fontSize:20,textAlign:"center"}}/>
            </div>
            <div>
              <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:6}}>السعر الشهري (دج) *</label>
              <input type="number" value={newForm.price} onChange={e=>setNewForm(p=>({...p,price:e.target.value}))} placeholder="0"
                style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(99,102,241,.35)",borderRadius:9,color:"#fff",padding:"9px 13px",fontSize:13}}/>
            </div>
            <div>
              <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:6}}>مدة محددة؟ (أشهر — اختياري)</label>
              <input type="number" value={newForm.durationMonths} onChange={e=>setNewForm(p=>({...p,durationMonths:e.target.value}))} placeholder="فارغ = غير محددة" min="1" max="24"
                style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,color:"#fff",padding:"9px 13px",fontSize:13}}/>
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:6}}>وصف مختصر (اختياري)</label>
            <input value={newForm.desc} onChange={e=>setNewForm(p=>({...p,desc:e.target.value}))} placeholder="سيُولَّد تلقائياً من المزايا إذا تُرك فارغاً"
              style={{width:"100%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:9,color:"#fff",padding:"9px 13px",fontSize:13}}/>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:8}}>لون الباقة</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
              {COLOR_PRESETS.map(c=>(
                <div key={c} onClick={()=>setNewForm(p=>({...p,color:c}))}
                  style={{width:28,height:28,borderRadius:8,background:c,cursor:"pointer",border:newForm.color===c?"3px solid #fff":"2px solid transparent",transition:"all .15s"}}/>
              ))}
              <input type="color" value={newForm.color} onChange={e=>setNewForm(p=>({...p,color:e.target.value}))}
                style={{width:28,height:28,border:"none",borderRadius:7,cursor:"pointer",padding:0,background:"none"}}/>
            </div>
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,color:S.textDim,fontWeight:700,marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              المزايا *
              <button onClick={()=>setNewForm(p=>({...p,features:[...p.features,""]}))}
                style={{background:`${newForm.color}20`,border:"none",color:newForm.color,borderRadius:6,padding:"3px 9px",cursor:"pointer",fontSize:11,fontWeight:700}}>+ إضافة ميزة</button>
            </div>
            {newForm.features.map((f,i)=>(
              <div key={i} style={{display:"flex",gap:7,alignItems:"center",marginBottom:7}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:newForm.color,flexShrink:0}}/>
                <input value={f} onChange={e=>setNewForm(p=>({...p,features:p.features.map((x,j)=>j===i?e.target.value:x)}))}
                  placeholder={`الميزة ${i+1}`}
                  style={{flex:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:7,color:"#fff",padding:"7px 10px",fontSize:12}}/>
                {newForm.features.length>1&&(
                  <button onClick={()=>setNewForm(p=>({...p,features:p.features.filter((_,j)=>j!==i)}))}
                    style={{background:"none",border:"none",color:S.red,cursor:"pointer",fontSize:15,padding:"0 4px"}}>✕</button>
                )}
              </div>
            ))}
          </div>
          {/* Preview */}
          <div style={{background:`${newForm.color}0F`,border:`1px solid ${newForm.color}33`,borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22}}>{newForm.icon||"🔷"}</span>
            <div>
              <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{newForm.label||"اسم الباقة"}</div>
              <div style={{fontSize:11,color:newForm.color,fontWeight:700}}>{newForm.price?`${parseInt(newForm.price||0).toLocaleString()} دج/شهر`:"مجاني"}{newForm.durationMonths?` — ${newForm.durationMonths} أشهر`:""}</div>
            </div>
          </div>
          {newFormErr&&<div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.25)",borderRadius:8,padding:"8px 13px",fontSize:12,color:"#F87171",marginBottom:12}}>⚠️ {newFormErr}</div>}
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>{setShowNewForm(false);setNewForm(emptyNew);setNewFormErr("");}}
              style={{flex:1,background:"rgba(255,255,255,.05)",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:600}}>إلغاء</button>
            <button onClick={submitNew}
              style={{flex:2,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:800}}>
              ✨ إنشاء الباقة
            </button>
          </div>
        </div>
      )}

      {/* Builtin Plans */}
      <div style={{fontSize:13,fontWeight:800,color:S.textMuted,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
        <span style={{width:3,height:14,borderRadius:2,background:S.purple,display:"inline-block"}}/>
        الباقات الرسمية
      </div>
      <div className="adm-plan-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:28}}>
        {Object.entries(builtinPlans).map(([key,info])=>(
          <PlanCard key={key} planKey={key} info={info} isCustom={false} {...cardProps}/>
        ))}
      </div>

      {/* Custom Plans */}
      {customPlans.length>0&&(
        <>
          <div style={{fontSize:13,fontWeight:800,color:S.textMuted,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:3,height:14,borderRadius:2,background:"#6366F1",display:"inline-block"}}/>
            الباقات المخصصة ({customPlans.length})
          </div>
          <div className="adm-plan-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:28}}>
            {customPlans.map(plan=>(
              <PlanCard key={plan.id} planKey={plan.id} info={plan} isCustom={true} {...cardProps}/>
            ))}
          </div>
        </>
      )}

      {/* Agency Table */}
      <div style={{marginTop:8}}>
        <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
          💼 اشتراكات الوكالات الفردية
          <span style={{fontSize:11,color:S.textMuted,fontWeight:400}}>— تعديل الباقة والسعر لكل وكالة</span>
        </div>
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,overflow:"hidden"}}>
          <div className="adm-table-wrap" style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:580}}>
            <thead>
              <tr style={{background:"rgba(255,255,255,.04)"}}>
                {["الوكالة","الولاية","الباقة","السعر","الانتهاء","تغيير","إجراء"].map(h=>(
                  <th key={h} style={{padding:"11px 14px",fontSize:11,fontWeight:700,color:S.textDim,textAlign:"right",borderBottom:`1px solid ${S.border}`,whiteSpace:"nowrap"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agencies.filter(a=>!a.pendingApproval&&a.status!=="rejected").map(ag=>(
                <AgencyPriceRow key={ag.id} ag={ag} onAction={onAction} allPlans={allPlans}/>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Delete confirm */}
      {deleteConfirm&&(
        <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.75)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#0F0F1A",border:"1px solid rgba(239,68,68,.4)",borderRadius:18,padding:28,maxWidth:360,width:"100%",textAlign:"center",animation:"fadeIn .2s ease"}}>
            <div style={{fontSize:40,marginBottom:14}}>🗑️</div>
            <h3 style={{fontSize:16,fontWeight:900,color:"#fff",marginBottom:8}}>حذف الباقة المخصصة</h3>
            <p style={{fontSize:13,color:S.textMuted,marginBottom:22,lineHeight:1.6}}>سيتم حذف هذه الباقة نهائياً. الوكالات المشتركة فيها لن تتأثر فورياً.</p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setDeleteConfirm(null)} style={{flex:1,background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13}}>إلغاء</button>
              <button onClick={()=>deleteCustomPlan(deleteConfirm)} style={{flex:1,background:"rgba(239,68,68,.2)",border:"1px solid rgba(239,68,68,.4)",color:S.red,borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:800}}>🗑️ حذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AgencyPriceRow({ag,onAction,allPlans}) {
  const [editing,      setEditing]      = useState(false);
  const [price,        setPrice]        = useState(ag.monthlyPrice);
  const [changingPlan, setChangingPlan] = useState(false);
  const [newPlan,      setNewPlan]      = useState(ag.plan);
  const [newMonths,    setNewMonths]    = useState(ag.subscriptionMonths||1);

  const info     = allPlans[ag.plan] || allPlans.basic || Object.values(allPlans)[0] || {};
  const d        = daysLeft(ag.subscriptionEnd);
  const dayColor = d<=0&&ag.subscriptionEnd ? S.red : d<=7 ? S.amber : S.green;

  const applyPlanChange = () => {
    const planData = allPlans[newPlan] || allPlans.basic || {};
    onAction(ag.id,"setPlan",newPlan);
    onAction(ag.id,"setPrice", planData.isFree ? 0 : (planData.price||0));
    onAction(ag.id,"setMonths",newMonths);
    const start = new Date(), end = new Date(start);
    const months = planData.isFree&&planData.durationMonths ? planData.durationMonths : newMonths;
    end.setMonth(end.getMonth()+months);
    onAction(ag.id,"setSubscriptionDates",{start:start.toISOString().split("T")[0],end:end.toISOString().split("T")[0]});
    setChangingPlan(false);
  };

  return(
    <tr style={{borderBottom:`1px solid ${S.border}`}}
      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"}
      onMouseLeave={e=>e.currentTarget.style.background="none"}>
      <td style={{padding:"11px 14px"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#fff",whiteSpace:"nowrap"}}>{ag.name}</div>
        <div style={{fontSize:10,color:S.textDim}}>{ag.owner}</div>
      </td>
      <td style={{padding:"11px 14px"}}><span style={{fontSize:12,color:S.textMuted,whiteSpace:"nowrap"}}>{getWilaya(ag.wilaya)}</span></td>
      <td style={{padding:"11px 14px"}}>
        <span style={{background:(info.color||S.purple)+"18",color:info.color||S.purple,borderRadius:6,padding:"2px 10px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>
          {info.icon||"•"} {info.label||ag.plan}
        </span>
      </td>
      <td style={{padding:"11px 14px"}}>
        {editing?(
          <div style={{display:"flex",gap:5,alignItems:"center"}}>
            <input type="number" value={price} onChange={e=>setPrice(e.target.value)}
              style={{width:80,background:"rgba(255,255,255,.08)",border:`1px solid ${S.purple}`,borderRadius:7,color:"#fff",padding:"5px 9px",fontSize:13}}/>
            <button onClick={()=>{onAction(ag.id,"setPrice",parseInt(price));setEditing(false);}} style={{background:S.green+"22",border:"none",color:S.green,borderRadius:6,padding:"5px 7px",cursor:"pointer"}}><I.Check/></button>
            <button onClick={()=>{setPrice(ag.monthlyPrice);setEditing(false);}} style={{background:"rgba(239,68,68,.15)",border:"none",color:S.red,borderRadius:6,padding:"5px 7px",cursor:"pointer"}}><I.X/></button>
          </div>
        ):(
          <span style={{fontSize:13,fontWeight:700,color:info.isFree?"#34D399":"#fff",whiteSpace:"nowrap"}}>
            {info.isFree?"مجاني":`${(ag.monthlyPrice||0).toLocaleString()} دج`}
          </span>
        )}
      </td>
      <td style={{padding:"11px 14px"}}>
        {ag.subscriptionEnd?(
          <div>
            <span style={{fontSize:12,fontWeight:700,color:dayColor,whiteSpace:"nowrap"}}>{d<=0?"منتهي":`${d} يوم`}</span>
            <div style={{fontSize:10,color:S.textDim}}>{formatDate(ag.subscriptionEnd)}</div>
          </div>
        ):<span style={{fontSize:11,color:S.textDim}}>—</span>}
      </td>
      <td style={{padding:"11px 14px",minWidth:160}}>
        {changingPlan?(
          <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
            <select value={newPlan} onChange={e=>setNewPlan(e.target.value)}
              style={{background:"rgba(255,255,255,.08)",border:`1px solid ${S.purple}`,borderRadius:7,color:"#fff",padding:"4px 7px",fontSize:11,maxWidth:110}}>
              {Object.entries(allPlans).map(([k,p])=><option key={k} value={k}>{p.icon||"•"} {p.label}</option>)}
            </select>
            {!allPlans[newPlan]?.isFree&&(
              <select value={newMonths} onChange={e=>setNewMonths(parseInt(e.target.value))}
                style={{background:"rgba(255,255,255,.08)",border:`1px solid ${S.purple}`,borderRadius:7,color:"#fff",padding:"4px 6px",fontSize:11,width:50}}>
                {[1,2,3,6,12].map(m=><option key={m} value={m}>{m}ش</option>)}
              </select>
            )}
            <button onClick={applyPlanChange} style={{background:S.green+"22",border:`1px solid ${S.green}44`,color:S.green,borderRadius:6,padding:"4px 8px",cursor:"pointer",fontSize:11,fontWeight:700}}>✓</button>
            <button onClick={()=>setChangingPlan(false)} style={{background:"rgba(255,255,255,.05)",border:"none",color:S.textMuted,borderRadius:6,padding:"4px 6px",cursor:"pointer",fontSize:11}}>✕</button>
          </div>
        ):(
          <button onClick={()=>{setNewPlan(ag.plan);setNewMonths(ag.subscriptionMonths||1);setChangingPlan(true);}}
            style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",color:S.purpleBright,borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"}}>
            <I.Edit/> تغيير
          </button>
        )}
      </td>
      <td style={{padding:"11px 14px"}}>
        {!info.isFree&&(
          <button onClick={()=>setEditing(true)} disabled={editing}
            style={{background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:7,padding:"5px 9px",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"}}>
            <I.Edit/> السعر
          </button>
        )}
      </td>
    </tr>
  );
}


// ══════════════════════════════════════════════════════════════
// ADMINS MANAGEMENT PAGE
// ══════════════════════════════════════════════════════════════
function AdminsPage({admins,setAdmins,auth}) {
  const [showAdd,setShowAdd] = useState(false);
  const [newAdmin,setNewAdmin] = useState({name:"",username:"",password:"",role:"messages"});
  const [addErr,setAddErr]=useState("");

  async function handleAdd() {
    setAddErr("");
    if(!newAdmin.name||!newAdmin.username||!newAdmin.password) return;
    const username = String(newAdmin.username||"").trim().toLowerCase();
    if(admins.some(a=>String(a.username).toLowerCase()===username)) { setAddErr("اسم المستخدم محجوز"); return; }
    const role = newAdmin.role === "superadmin" ? "admin" : "admin_staff";
    const permissions = newAdmin.role === "superadmin" ? {all:true} : {[newAdmin.role]:true};
    const email = `${username}@admin.driverent.local`;
    try {
      if(supabaseReady) {
        const {data: sign, error: signErr} = await supabase.auth.signUp({email, password:newAdmin.password, options:{data:{username,full_name:newAdmin.name,role}}});
        if(signErr) throw signErr;
        const id = sign?.user?.id || (crypto.randomUUID ? crypto.randomUUID() : "adm"+Date.now());
        const {error: insertErr} = await supabase.from("profiles").insert({id,email,username,full_name:newAdmin.name,role,permissions,status:"active"});
        if(insertErr) throw insertErr;
      }
      setAdmins(p=>[...p,{ id:"adm"+(Date.now()),name:newAdmin.name,username,password:"", role:newAdmin.role,avatar:newAdmin.name[0],permissions:newAdmin.role==="superadmin"?["all"]:[newAdmin.role], active:true,createdAt:new Date().toISOString().split("T")[0] }]);
      setShowAdd(false); setNewAdmin({name:"",username:"",password:"",role:"messages"});
    } catch(e) { setAddErr(e.message || "تعذر إنشاء الحساب"); }
  }

  return (
    <div style={{animation:"fadeIn .3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:2}}>إدارة المشرفين</h1>
          <p style={{fontSize:12,color:S.textMuted,margin:0}}>{admins.filter(a=>a.active).length} مشرف نشط</p>
        </div>
        <button onClick={()=>setShowAdd(v=>!v)} style={{background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:10,padding:"9px 18px",cursor:"pointer",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:8}}>
          <I.Plus/> إضافة مشرف
        </button>
      </div>

      {/* Role Descriptions */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:20}}>
        {Object.entries(ROLES).map(([key,role])=>(
          <div key={key} style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:12,padding:"14px 16px"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:role.color,marginBottom:8}}/>
            <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:3}}>{role.label}</div>
            <div style={{fontSize:11,color:S.textMuted}}>
              {key==="superadmin"?"تحكم كامل بجميع الأقسام":key==="agencies"?"إدارة الوكالات والسيارات":key==="messages"?"مراقبة الرسائل فقط":"مراجعة وقبول التعليقات"}
            </div>
          </div>
        ))}
      </div>

      {showAdd&&(
        <div style={{background:S.bgCard,border:`1px solid ${S.purple}44`,borderRadius:14,padding:20,marginBottom:20}}>
          <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:14}}>إضافة مشرف جديد</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:14}}>
            {[{k:"name",l:"الاسم الكامل"},{k:"username",l:"اسم المستخدم"},{k:"password",l:"كلمة المرور"}].map(f=>(
              <div key={f.k}>
                <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:5}}>{f.l}</label>
                <input value={newAdmin[f.k]} onChange={e=>setNewAdmin(p=>({...p,[f.k]:e.target.value}))} type={f.k==="password"?"password":"text"}
                  style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"9px 12px",fontSize:13}}/>
              </div>
            ))}
            <div>
              <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:5}}>الصلاحية</label>
              <select value={newAdmin.role} onChange={e=>setNewAdmin(p=>({...p,role:e.target.value}))}
                style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"9px 12px",fontSize:13}}>
                {Object.entries(ROLES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          {addErr&&<div style={{fontSize:12,color:S.red,marginBottom:10}}>⚠️ {addErr}</div>}
          <div style={{display:"flex",gap:8}}>
            <button onClick={handleAdd} style={{background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:9,padding:"9px 20px",cursor:"pointer",fontSize:13,fontWeight:700}}>إضافة</button>
            <button onClick={()=>setShowAdd(false)} style={{background:S.bgCard,border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:9,padding:"9px 16px",cursor:"pointer",fontSize:13}}>إلغاء</button>
          </div>
        </div>
      )}

      <div style={{display:"grid",gap:12}}>
        {admins.map(admin=>(
          <div key={admin.id} style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:14,padding:18,display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:46,height:46,borderRadius:12,background:ROLES[admin.role]?.color||S.purple,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,color:"#fff",flexShrink:0}}>
              {admin.avatar}
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontSize:15,fontWeight:800,color:"#fff"}}>{admin.name}</span>
                <span style={{background:ROLES[admin.role]?.color+"22",color:ROLES[admin.role]?.color,borderRadius:7,padding:"2px 10px",fontSize:11,fontWeight:700}}>{ROLES[admin.role]?.label}</span>
                {!admin.active&&<span style={{background:"rgba(239,68,68,.12)",color:S.red,borderRadius:7,padding:"2px 8px",fontSize:10,fontWeight:700}}>معطل</span>}
              </div>
              <div style={{fontSize:12,color:S.textMuted,fontFamily:"monospace"}}>{admin.username} · أضيف {formatDate(admin.createdAt)}</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <ActionBtn color={admin.active?S.amber:S.green} onClick={()=>setAdmins(p=>p.map(a=>a.id===admin.id?{...a,active:!a.active}:a))} title={admin.active?"تعطيل":"تفعيل"}>
                {admin.active?<I.Block/>:<I.Check/>}
              </ActionBtn>
              {admin.role!=="superadmin"&&<ActionBtn color={S.red} onClick={()=>setAdmins(p=>p.filter(a=>a.id!==admin.id))} title="حذف"><I.Trash/></ActionBtn>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PROFILE PAGE
// ══════════════════════════════════════════════════════════════
function ProfilePage({auth,setAdmins,admins}) {
  const [form,setForm] = useState({name:auth.name,currentPw:"",newPw:"",confirmPw:""});
  const [saved,setSaved] = useState(false);
  const [err,setErr] = useState("");

  function handleSave() {
    setErr("");
    if(form.newPw&&form.newPw!==form.confirmPw){setErr("كلمة المرور الجديدة غير متطابقة");return;}
    if(form.newPw&&form.currentPw!==auth.password){setErr("كلمة المرور الحالية غير صحيحة");return;}
    setAdmins(p=>p.map(a=>a.id===auth.id?{...a,name:form.name,password:form.newPw||a.password}:a));
    setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  }

  return (
    <div style={{animation:"fadeIn .3s ease",maxWidth:560}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:2}}>الملف الشخصي</h1>
        <p style={{fontSize:12,color:S.textMuted,margin:0}}>إدارة بيانات حسابك</p>
      </div>

      <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:18,padding:24,marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24,paddingBottom:20,borderBottom:`1px solid ${S.border}`}}>
          <div style={{width:64,height:64,borderRadius:16,background:ROLES[auth.role]?.color||S.purple,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:26,color:"#fff"}}>
            {auth.avatar}
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:4}}>{auth.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{background:ROLES[auth.role]?.color+"22",color:ROLES[auth.role]?.color,borderRadius:7,padding:"3px 12px",fontSize:12,fontWeight:700}}>{ROLES[auth.role]?.label}</span>
              <span style={{fontSize:12,color:S.textMuted,fontFamily:"monospace"}}>{auth.username}</span>
            </div>
          </div>
        </div>

        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:6}}>الاسم الكامل</label>
          <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}
            style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"11px 14px",fontSize:14}}/>
        </div>

        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:6}}>كلمة المرور الحالية</label>
          <input type="password" value={form.currentPw} onChange={e=>setForm(p=>({...p,currentPw:e.target.value}))}
            placeholder="أدخل كلمة مرورك الحالية"
            style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"11px 14px",fontSize:14}}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          {[["newPw","كلمة المرور الجديدة"],["confirmPw","تأكيد كلمة المرور"]].map(([k,l])=>(
            <div key={k}>
              <label style={{fontSize:11,color:S.textDim,fontWeight:700,display:"block",marginBottom:6}}>{l}</label>
              <input type="password" value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}
                placeholder="••••••••"
                style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,borderRadius:10,color:"#fff",padding:"11px 14px",fontSize:14}}/>
            </div>
          ))}
        </div>

        {err&&<div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",borderRadius:9,padding:"9px 13px",fontSize:12,color:"#FCA5A5",marginBottom:12}}>⚠️ {err}</div>}
        {saved&&<div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",borderRadius:9,padding:"9px 13px",fontSize:12,color:"#34D399",marginBottom:12}}>✓ تم حفظ التغييرات بنجاح</div>}

        <button onClick={handleSave} style={{background:`linear-gradient(135deg,${S.purple},#4F46E5)`,border:"none",color:"#fff",borderRadius:10,padding:"11px 24px",cursor:"pointer",fontSize:14,fontWeight:800}}>
          حفظ التغييرات
        </button>
      </div>

      {/* Permissions info */}
      <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:16,padding:20}}>
        <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:14}}>صلاحياتك</div>
        {auth.role==="superadmin"?(
          <div style={{background:"rgba(124,58,237,.1)",border:`1px solid rgba(124,58,237,.2)`,borderRadius:10,padding:"10px 14px",fontSize:13,color:S.purpleBright}}>
            🛡️ لديك صلاحيات المدير العام — تحكم كامل في جميع أقسام المنصة
          </div>
        ):(
          <div>
            {auth.permissions.map(p=>(
              <div key={p} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${S.border}`}}>
                <I.Check/><span style={{fontSize:13,color:"#fff"}}>{p==="agencies"?"إدارة الوكالات والسيارات والحجوزات":p==="messages"?"مراقبة الرسائل":p==="reviews"?"مراجعة التعليقات":"—"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// USER ACCOUNTS PAGE — إدارة طلبات إنشاء الحسابات
// ══════════════════════════════════════════════════════════════
function UserAccountsPage({userRequests, setUserRequests, refreshUserRequests}) {
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [confirmModal, setConfirmModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);

  useEffect(()=>{ refreshUserRequests(); },[]);

  const handleApprove=async (req)=>{
    if(supabaseReady) await supabase.from("pending_requests").update({status:"approved",reviewed_at:new Date().toISOString()}).eq("id",req.id).catch(()=>{});
    const updated=userRequests.map(r=>r.id===req.id?{...r,status:"approved",reviewedAt:new Date().toISOString()}:r);
    setUserRequests(updated);
    setConfirmModal(null); setViewModal(null);
  };

  const handleReject=async (req)=>{
    if(supabaseReady) await supabase.from("pending_requests").update({status:"rejected",reviewed_at:new Date().toISOString()}).eq("id",req.id).catch(()=>{});
    const updated=userRequests.map(r=>r.id===req.id?{...r,status:"rejected",reviewedAt:new Date().toISOString()}:r);
    setUserRequests(updated);
    setConfirmModal(null); setViewModal(null);
  };

  const handleDelete=async (req)=>{
    if(supabaseReady) await supabase.from("pending_requests").delete().eq("id",req.id).catch(()=>{});
    setUserRequests(userRequests.filter(r=>r.id!==req.id));
  };

  const filtered=userRequests
    .filter(r=>filter==="all"||r.status===filter)
    .filter(r=>!search||r.username.toLowerCase().includes(search.toLowerCase())||r.phone.includes(search));

  const counts={all:userRequests.length,pending:userRequests.filter(r=>r.status==="pending").length,approved:userRequests.filter(r=>r.status==="approved").length,rejected:userRequests.filter(r=>r.status==="rejected").length};
  const statusColor={pending:"#F59E0B",approved:"#10B981",rejected:"#EF4444"};
  const statusLabel={pending:"قيد الانتظار",approved:"مقبول",rejected:"مرفوض"};
  const statusBg={pending:"rgba(245,158,11,.1)",approved:"rgba(16,185,129,.1)",rejected:"rgba(239,68,68,.1)"};

  return(
    <div style={{animation:"fadeIn .3s ease"}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:20,fontWeight:900,color:"#fff",margin:0,marginBottom:4}}>حسابات الزوار</h1>
        <p style={{fontSize:12,color:S.textMuted,margin:0}}>مراجعة وقبول طلبات إنشاء الحسابات من منصة DriveRENT</p>
      </div>

      <div className="adm-stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {[{label:"إجمالي الطلبات",val:counts.all,color:"#7C3AED",icon:"📋"},{label:"قيد الانتظار",val:counts.pending,color:"#F59E0B",icon:"⏳"},{label:"مقبولة",val:counts.approved,color:"#10B981",icon:"✅"},{label:"مرفوضة",val:counts.rejected,color:"#EF4444",icon:"❌"}].map((s,i)=>(
          <div key={i} style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:14,padding:"16px 18px"}}>
            <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
            <div style={{fontSize:24,fontWeight:900,color:s.color,lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:11,color:S.textMuted,marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["all","pending","approved","rejected"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?S.purpleLight:"none",border:`1px solid ${filter===f?S.purple+"44":S.border}`,color:filter===f?"#fff":S.textMuted,borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:filter===f?700:400,transition:"all .2s"}}>
              {f==="all"?"الكل":f==="pending"?"⏳ انتظار":f==="approved"?"✅ مقبولة":"❌ مرفوضة"}
              {counts[f]>0&&<span style={{marginRight:5,background:"rgba(255,255,255,.1)",borderRadius:9,padding:"1px 6px",fontSize:10,fontWeight:800}}>{counts[f]}</span>}
            </button>
          ))}
        </div>
        <div style={{flex:1,position:"relative",minWidth:180}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث باسم المستخدم أو رقم الهاتف..."
            style={{width:"100%",background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,borderRadius:9,color:"#fff",padding:"8px 36px 8px 14px",fontSize:13}}/>
          <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:S.textMuted}}><I.Search/></span>
        </div>
        <button onClick={refreshUserRequests} style={{background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:9,padding:"8px 14px",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:6}}
          onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color=S.textMuted}>
          🔄 تحديث
        </button>
      </div>

      {filtered.length===0?(
        <div style={{background:S.bgCard,border:`1px solid ${S.border}`,borderRadius:14,padding:"48px 24px",textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:12}}>📭</div>
          <div style={{fontSize:14,color:S.textMuted}}>{userRequests.length===0?"لا توجد طلبات حسابات بعد — ستظهر هنا عند تسجيل الزوار في DriveRENT":"لا توجد نتائج للفلتر المحدد"}</div>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.sort((a,b)=>new Date(b.requestDate)-new Date(a.requestDate)).map(req=>(
            <div key={req.id} style={{background:S.bgCard,border:`1px solid ${req.status==="pending"?"rgba(245,158,11,.22)":S.border}`,borderRadius:14,padding:"16px 20px",display:"flex",alignItems:"center",gap:14,animation:"fadeIn .3s ease"}}>
              <div style={{width:46,height:46,borderRadius:12,overflow:"hidden",flexShrink:0,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:20,color:"#fff"}}>
                {req.avatar?<img src={req.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:req.username[0]?.toUpperCase()}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                  <span style={{fontSize:14,fontWeight:700,color:"#fff"}}>@{req.username}</span>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:statusBg[req.status],color:statusColor[req.status],border:`1px solid ${statusColor[req.status]}33`}}>{statusLabel[req.status]}</span>
                </div>
                <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                  <span style={{fontSize:12,color:S.textMuted,fontFamily:"monospace",letterSpacing:".5px"}}>📞 {req.phone}</span>
                  <span style={{fontSize:12,color:S.textMuted}}>🗓️ {new Date(req.requestDate).toLocaleDateString("ar-DZ")} {new Date(req.requestDate).toLocaleTimeString("ar-DZ",{hour:"2-digit",minute:"2-digit"})}</span>
                  {req.reviewedAt&&<span style={{fontSize:11,color:S.textDim}}>✓ {new Date(req.reviewedAt).toLocaleDateString("ar-DZ")}</span>}
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0}}>
                <button onClick={()=>setViewModal(req)} style={{background:"rgba(59,130,246,.1)",border:"1px solid rgba(59,130,246,.25)",color:"#60A5FA",borderRadius:8,padding:"7px 12px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(59,130,246,.2)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(59,130,246,.1)"}>
                  <I.Eye/> معاينة
                </button>
                {req.status==="pending"&&(
                  <>
                    <button onClick={()=>setConfirmModal({req,action:"approve"})} style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.3)",color:"#34D399",borderRadius:8,padding:"7px 12px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(16,185,129,.2)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(16,185,129,.1)"}>
                      <I.Check/> قبول
                    </button>
                    <button onClick={()=>setConfirmModal({req,action:"reject"})} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",color:"#F87171",borderRadius:8,padding:"7px 12px",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,.2)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,.1)"}>
                      <I.X/> رفض
                    </button>
                  </>
                )}
                {req.status!=="pending"&&(
                  <button onClick={()=>handleDelete(req)} style={{background:"rgba(255,255,255,.04)",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:8,padding:"7px 10px",cursor:"pointer",fontSize:12}}
                    onMouseEnter={e=>e.currentTarget.style.color="#F87171"} onMouseLeave={e=>e.currentTarget.style.color=S.textMuted}>
                    <I.Trash/>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewModal&&(
        <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={e=>{if(e.target===e.currentTarget)setViewModal(null);}}>
          <div style={{background:"#0F0F1A",border:`1px solid ${statusColor[viewModal.status]}44`,borderRadius:22,padding:28,width:"100%",maxWidth:420,animation:"fadeIn .25s ease",position:"relative"}}>
            <button onClick={()=>setViewModal(null)} style={{position:"absolute",top:14,left:14,background:"rgba(255,255,255,.06)",border:"none",color:S.textMuted,width:28,height:28,borderRadius:"50%",cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            <h2 style={{fontSize:17,fontWeight:900,color:"#fff",marginBottom:20,textAlign:"center"}}>معاينة الطلب</h2>
            <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
              <div style={{width:72,height:72,borderRadius:18,overflow:"hidden",border:`3px solid ${statusColor[viewModal.status]}55`,background:`linear-gradient(135deg,${S.purple},#4F46E5)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:28,color:"#fff"}}>
                {viewModal.avatar?<img src={viewModal.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:viewModal.username[0]?.toUpperCase()}
              </div>
            </div>
            {[
              {icon:"👤",label:"اسم المستخدم",val:"@"+viewModal.username},
              
              {icon:"📞",label:"رقم الهاتف",val:viewModal.phone,mono:true},
              {icon:"🗓️",label:"تاريخ الطلب",val:new Date(viewModal.requestDate).toLocaleString("ar-DZ")},
              {icon:"📌",label:"الحالة",val:statusLabel[viewModal.status],color:statusColor[viewModal.status]},
            ].map((row,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<4?`1px solid ${S.border}`:"none"}}>
                <span style={{fontSize:18,flexShrink:0}}>{row.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:S.textDim,fontWeight:700,marginBottom:2}}>{row.label}</div>
                  <div style={{fontSize:14,color:row.color||"#fff",fontWeight:700,fontFamily:row.mono?"monospace":"inherit",letterSpacing:row.mono?"1.5px":"normal"}}>{row.val}</div>
                </div>
              </div>
            ))}
            {viewModal.status==="pending"&&(
              <div style={{display:"flex",gap:10,marginTop:20}}>
                <button onClick={()=>{setViewModal(null);setConfirmModal({req:viewModal,action:"reject"});}} style={{flex:1,background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.3)",color:"#F87171",borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:700}}>❌ رفض</button>
                <button onClick={()=>{setViewModal(null);setConfirmModal({req:viewModal,action:"approve"});}} style={{flex:1,background:"rgba(16,185,129,.15)",border:"1px solid rgba(16,185,129,.35)",color:"#34D399",borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:700}}>✅ قبول</button>
              </div>
            )}
          </div>
        </div>
      )}

      {confirmModal&&(
        <div style={{position:"fixed",inset:0,zIndex:301,background:"rgba(0,0,0,.8)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#0F0F1A",border:`1px solid ${confirmModal.action==="approve"?"rgba(16,185,129,.4)":"rgba(239,68,68,.4)"}`,borderRadius:18,padding:28,width:"100%",maxWidth:360,textAlign:"center",animation:"fadeIn .2s ease"}}>
            <div style={{fontSize:42,marginBottom:14}}>{confirmModal.action==="approve"?"✅":"❌"}</div>
            <h3 style={{fontSize:17,fontWeight:900,color:"#fff",marginBottom:8}}>{confirmModal.action==="approve"?"تأكيد قبول الحساب":"تأكيد رفض الحساب"}</h3>
            <p style={{fontSize:13,color:S.textMuted,marginBottom:22,lineHeight:1.7}}>
              {confirmModal.action==="approve"
                ?<>سيتمكن <strong style={{color:"#fff"}}>@{confirmModal.req.username}</strong> من تسجيل الدخول فوراً.</>
                :<>سيتم رفض طلب <strong style={{color:"#fff"}}>@{confirmModal.req.username}</strong>.</>}
            </p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmModal(null)} style={{flex:1,background:"rgba(255,255,255,.06)",border:`1px solid ${S.border}`,color:S.textMuted,borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:600}}>إلغاء</button>
              <button onClick={()=>confirmModal.action==="approve"?handleApprove(confirmModal.req):handleReject(confirmModal.req)}
                style={{flex:1,background:confirmModal.action==="approve"?"rgba(16,185,129,.2)":"rgba(239,68,68,.2)",border:`1px solid ${confirmModal.action==="approve"?"rgba(16,185,129,.45)":"rgba(239,68,68,.45)"}`,color:confirmModal.action==="approve"?"#34D399":"#F87171",borderRadius:10,padding:"11px",cursor:"pointer",fontSize:13,fontWeight:800}}>
                {confirmModal.action==="approve"?"✅ نعم، قبول":"❌ نعم، رفض"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
