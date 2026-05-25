import { useState } from "react";
import { useNavigate } from "../../lib/router.jsx";
import { IconBack, IconCar, IconBuilding, IconSuccess, IconUserPlus, IconPhone, IconPin, IconMap, IconKey, IconLock, IconEye, IconEyeOff, IconDocument, IconChevronRight } from "../ui/AppIcons.jsx";

const WILAYAS = [
"01 - أدرار","02 - الشلف","03 - الأغواط","04 - أم البواقي","05 - باتنة",
"06 - بجاية","07 - بسكرة","08 - بشار","09 - البليدة","10 - البويرة",
"11 - تمنراست","12 - تبسة","13 - تلمسان","14 - تيارت","15 - تيزي وزو",
"16 - الجزائر","17 - الجلفة","18 - جيجل","19 - سطيف","20 - سعيدة",
"21 - سكيكدة","22 - سيدي بلعباس","23 - عنابة","24 - قالمة","25 - قسنطينة",
"26 - المدية","27 - مستغانم","28 - المسيلة","29 - معسكر","30 - ورقلة",
"31 - وهران","32 - البيض","33 - إليزي","34 - برج بوعريريج","35 - بومرداس",
"36 - الطارف","37 - تندوف","38 - تيسمسيلت","39 - الوادي","40 - خنشلة",
"41 - سوق أهراس","42 - تيبازة","43 - ميلة","44 - عين الدفلى","45 - النعامة",
"46 - عين تموشنت","47 - غرداية","48 - غليزان","49 - تيميمون",
"50 - برج باجي مختار","51 - أولاد جلال","52 - بني عباس","53 - عين صالح",
"54 - عين قزام","55 - تقرت","56 - جانت","57 - المغير","58 - المنيعة"
];

const STEPS = ["المعلومات الأساسية", "العنوان والموقع", "الحساب والأمان", "التحقق والإرسال"];

// ─── Style helpers OUTSIDE component ──────────────────────────────────────
const LABEL_STYLE = {
  fontSize: "clamp(11px,2.8vw,13px)", fontWeight: 700,
  color: "rgba(255,255,255,.5)", display: "block", marginBottom: 7,
};

function getInputStyle(focus, name) {
  return {
    width: "100%",
    background: focus === name ? "rgba(109,40,217,.08)" : "rgba(255,255,255,.04)",
    border: `1.5px solid ${focus === name ? "rgba(109,40,217,.6)" : "rgba(255,255,255,.09)"}`,
    borderRadius: 14,
    padding: "clamp(11px,3vw,14px) clamp(13px,3.5vw,16px)",
    color: "#F1F5F9",
    fontSize: "clamp(13px,3.2vw,15px)",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s, background .2s, box-shadow .2s",
    boxShadow: focus === name ? "0 0 0 3px rgba(109,40,217,.12)" : "none",
    direction: "rtl",
  };
}

export function AgencyRegisterPage({ onBack } = {}) {
  const navigate = useNavigate();
  const _back = onBack || (() => navigate(-1));
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [focus, setFocus] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "", owner: "", phone: "", email: "",
    wilaya: "", address: "",
    username: "", password: "", confirm: "",
    cars: "", agree: false,
  });

  const up = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const passMatch = !form.confirm || form.password === form.confirm;

  function canNext() {
    if (step === 0) return form.name && form.owner && form.phone && form.email;
    if (step === 1) return form.wilaya && form.address;
    if (step === 2) return form.username && form.password && form.confirm && passMatch && form.password.length >= 6;
    if (step === 3) return form.agree;
    return true;
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{
        position:"fixed", inset:0, background:"#07080F",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        fontFamily:"'Cairo',sans-serif", padding:"clamp(20px,5vw,40px)",
        animation:"fadeIn .4s ease",
      }}>
        <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(52,211,153,.2) 0%,transparent 70%)",top:"20%",left:"50%",transform:"translateX(-50%)",filter:"blur(50px)",pointerEvents:"none"}}/>

        <div style={{
          width:"clamp(80px,20vw,100px)", height:"clamp(80px,20vw,100px)",
          borderRadius:"50%", background:"linear-gradient(135deg,#34D399,#059669)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 0 60px rgba(52,211,153,.4), 0 20px 50px rgba(0,0,0,.4)",
          marginBottom:28, animation:"float 3s ease-in-out infinite",
        }}>
          <IconSuccess size={42} color="#fff"/>
        </div>

        <h1 style={{fontSize:"clamp(22px,6vw,30px)",fontWeight:900,color:"#F1F5F9",textAlign:"center",marginBottom:10,letterSpacing:"-.5px"}}>
          تم إرسال طلبك!
        </h1>
        <p style={{fontSize:"clamp(13px,3.2vw,15px)",color:"rgba(255,255,255,.45)",textAlign:"center",lineHeight:1.8,marginBottom:10,maxWidth:340}}>
          ستتلقى اتصال من قِبل فريقنا خلال 24 ساعة 
        </p>
        <div style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.25)",borderRadius:14,padding:"12px 20px",marginBottom:32,textAlign:"center"}}>
          <span style={{fontSize:"clamp(12px,3vw,14px)",color:"#34D399",fontWeight:700}}>{form.email}</span>
        </div>

        <button onClick={_back} style={{
          background:"linear-gradient(135deg,#6D28D9,#4F46E5)",
          border:"none", borderRadius:14, padding:"clamp(12px,3vw,14px) clamp(28px,7vw,40px)",
          color:"#fff", fontWeight:900, fontSize:"clamp(14px,3.5vw,16px)",
          cursor:"pointer", fontFamily:"inherit",
          boxShadow:"0 6px 24px rgba(109,40,217,.38)",
        }}>
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position:"fixed", inset:0, background:"#07080F",
      display:"flex", flexDirection:"column",
      fontFamily:"'Cairo',sans-serif",
      overflowY:"auto", WebkitOverflowScrolling:"touch", overscrollBehavior:"contain",
      animation:"fadeUp .35s ease",
    }}>

      {/* ── Header ── */}
      <div style={{
        position:"sticky", top:0, zIndex:50,
        background:"rgba(7,8,15,.95)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,.07)",
        padding:"max(16px,env(safe-area-inset-top,16px)) clamp(14px,4vw,24px) 14px",
        display:"flex", alignItems:"center", gap:12,
        flexShrink:0,
      }}>
        <button onClick={_back} style={{
          width:38, height:38, borderRadius:"50%",
          background:"rgba(255,255,255,.06)",
          border:"1px solid rgba(255,255,255,.1)",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          flexShrink:0,
        }}>
          <IconBack size={16} color="rgba(255,255,255,.7)"/>
        </button>

        <div style={{flex:1}}>
          <h1 style={{fontSize:"clamp(14px,3.8vw,17px)",fontWeight:900,color:"#F1F5F9",marginBottom:2}}>تسجيل وكالتك</h1>
          <p style={{fontSize:"clamp(10px,2.5vw,12px)",color:"rgba(255,255,255,.38)"}}>الخطوة {step+1} من {STEPS.length}</p>
        </div>

        <div style={{
          width:36, height:36, borderRadius:10,
          background:"linear-gradient(135deg,#6D28D9,#4F46E5)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 4px 14px rgba(109,40,217,.4)",
        }}>
          <IconCar size={18} color="#fff"/>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{background:"rgba(255,255,255,.05)",height:3,flexShrink:0}}>
        <div style={{
          height:"100%", borderRadius:3,
          background:"linear-gradient(90deg,#6D28D9,#818CF8)",
          width:`${((step+1)/STEPS.length)*100}%`,
          transition:"width .4s cubic-bezier(.4,0,.2,1)",
          boxShadow:"0 0 10px rgba(109,40,217,.5)",
        }}/>
      </div>

      {/* ── Step tabs ── */}
      <div style={{
        display:"flex", padding:"0 clamp(14px,4vw,24px)",
        borderBottom:"1px solid rgba(255,255,255,.06)",
        overflowX:"auto", scrollbarWidth:"none", flexShrink:0,
        gap:0,
      }}>
        {STEPS.map((s,i) => (
          <div key={i} onClick={()=> i < step && setStep(i)} style={{
            padding:"12px clamp(8px,2.5vw,14px)",
            fontSize:"clamp(10px,2.5vw,12px)", fontWeight:700,
            color: i===step ? "#A78BFA" : i<step ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.22)",
            borderBottom: i===step ? "2px solid #A78BFA" : "2px solid transparent",
            cursor: i < step ? "pointer" : "default",
            whiteSpace:"nowrap", transition:"color .2s",
            display:"flex", alignItems:"center", gap:5,
          }}>
            {i < step && <IconSuccess size={11} color="#34D399"/>}
            {s}
          </div>
        ))}
      </div>

      {/* ── Form content ── */}
      <div style={{flex:1, padding:"clamp(18px,4vw,28px) clamp(14px,4vw,24px)", maxWidth:580, width:"100%", margin:"0 auto", boxSizing:"border-box"}}>

        {/* ══ Step 0: Basic Info ══ */}
        {step === 0 && (
          <div style={{display:"flex", flexDirection:"column", gap:18, animation:"fadeUp .3s ease"}}>
            <div style={{
              background:"rgba(109,40,217,.08)", border:"1px solid rgba(109,40,217,.2)",
              borderRadius:16, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, marginBottom:4,
            }}>
              <IconBuilding size={24} color="#A78BFA"/>
              <div>
                <div style={{fontSize:"clamp(12px,3vw,14px)",fontWeight:800,color:"#A78BFA",marginBottom:3}}>أنت على بعد خطوات من النجاح!</div>
                <div style={{fontSize:"clamp(10px,2.5vw,12px)",color:"rgba(255,255,255,.45)"}}>أدخل معلومات وكالتك لتبدأ في استقبال الطلبات</div>
              </div>
            </div>

            <div>
              <label style={LABEL_STYLE}>اسم الوكالة *</label>
              <input value={form.name} onChange={e=>up("name",e.target.value)}
                placeholder="مثال: وكالة النجمة لتأجير السيارات"
                onFocus={()=>setFocus("name")} onBlur={()=>setFocus(null)}
                style={getInputStyle(focus, "name")}/>
            </div>

            <div>
              <label style={LABEL_STYLE}>اسم صاحب الوكالة *</label>
              <input value={form.owner} onChange={e=>up("owner",e.target.value)}
                placeholder="الاسم الكامل"
                onFocus={()=>setFocus("owner")} onBlur={()=>setFocus(null)}
                style={getInputStyle(focus, "owner")}/>
            </div>

            <div>
              <label style={LABEL_STYLE}>رقم الهاتف *</label>
              <input value={form.phone} onChange={e=>up("phone",e.target.value)}
                placeholder="05xxxxxxxx" type="tel" dir="ltr"
                style={{...getInputStyle(focus, "phone"), textAlign:"right"}}
                onFocus={()=>setFocus("phone")} onBlur={()=>setFocus(null)}/>
            </div>

            <div>
              <label style={LABEL_STYLE}>البريد الإلكتروني *</label>
              <input value={form.email} onChange={e=>up("email",e.target.value)}
                placeholder="example@gmail.com" type="email" dir="ltr"
                style={{...getInputStyle(focus, "email"), textAlign:"right"}}
                onFocus={()=>setFocus("email")} onBlur={()=>setFocus(null)}/>
            </div>

            <div>
              <label style={LABEL_STYLE}>عدد السيارات المتاحة</label>
              <input value={form.cars} onChange={e=>up("cars",e.target.value)}
                placeholder="مثال: 10" type="number"
                onFocus={()=>setFocus("cars")} onBlur={()=>setFocus(null)}
                style={getInputStyle(focus, "cars")}/>
            </div>
          </div>
        )}

        {/* ══ Step 1: Location ══ */}
        {step === 1 && (
          <div style={{display:"flex", flexDirection:"column", gap:18, animation:"fadeUp .3s ease"}}>
            <div>
              <label style={LABEL_STYLE}>الولاية *</label>
              <select value={form.wilaya} onChange={e=>up("wilaya",e.target.value)}
                style={{
                  ...getInputStyle(focus, "wilaya"),
                  appearance:"none",
                  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'%3E%3Cpolyline points='6 9 12 15 18 9' stroke='rgba(255,255,255,.4)' strokeWidth='2'/%3E%3C/svg%3E")`,
                  backgroundRepeat:"no-repeat",
                  backgroundPosition:"left 14px center",
                }}>
                <option value="" disabled style={{background:"#09091C"}}>اختر ولايتك</option>
                {WILAYAS.map(w => <option key={w} value={w} style={{background:"#09091C"}}>{w}</option>)}
              </select>
            </div>

            <div>
              <label style={LABEL_STYLE}>العنوان التفصيلي *</label>
              <input value={form.address} onChange={e=>up("address",e.target.value)}
                placeholder="الشارع، الحي، المدينة..."
                onFocus={()=>setFocus("address")} onBlur={()=>setFocus(null)}
                style={getInputStyle(focus, "address")}/>
            </div>
          </div>
        )}

        {/* ══ Step 2: Account & Security ══ */}
        {step === 2 && (
          <div style={{display:"flex", flexDirection:"column", gap:18, animation:"fadeUp .3s ease"}}>
            <div style={{
              background:"rgba(109,40,217,.08)", border:"1px solid rgba(109,40,217,.2)",
              borderRadius:16, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, marginBottom:4,
            }}>
              <IconLock size={24} color="#A78BFA"/>
              <div>
                <div style={{fontSize:"clamp(12px,3vw,14px)",fontWeight:800,color:"#A78BFA",marginBottom:3}}>بيانات تسجيل الدخول</div>
                <div style={{fontSize:"clamp(10px,2.5vw,12px)",color:"rgba(255,255,255,.45)"}}>ستستخدم هذه البيانات للدخول إلى لوحة تحكم وكالتك</div>
              </div>
            </div>

            {/* Username */}
            <div>
              <label style={LABEL_STYLE}>اسم المستخدم *</label>
              <input
                value={form.username}
                onChange={e => up("username", e.target.value)}
                placeholder="مثال: agency_star"
                dir="ltr"
                onFocus={()=>setFocus("username")} onBlur={()=>setFocus(null)}
                style={{...getInputStyle(focus, "username"), textAlign:"right"}}
              />
              <p style={{fontSize:"clamp(9px,2.2vw,11px)",color:"rgba(255,255,255,.3)",marginTop:5}}>
                يجب أن يكون فريداً، بدون مسافات
              </p>
            </div>

            {/* Password */}
            <div>
              <label style={LABEL_STYLE}>كلمة السر *</label>
              <div style={{position:"relative"}}>
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={e => up("password", e.target.value)}
                  placeholder="••••••••"
                  onFocus={()=>setFocus("password")} onBlur={()=>setFocus(null)}
                  style={{...getInputStyle(focus, "password"), paddingLeft:44, direction:"ltr", textAlign:"left"}}
                />
                <button
                  onClick={() => setShowPass(p => !p)}
                  style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.3)",display:"flex",alignItems:"center"}}
                >
                  {showPass ? <IconEyeOff size={18} color="currentColor"/> : <IconEye size={18} color="currentColor"/>}
                </button>
              </div>
              {form.password && form.password.length < 6 && (
                <p style={{fontSize:"clamp(9px,2.2vw,11px)",color:"#EF4444",marginTop:5,fontWeight:600}}>كلمة السر يجب أن تكون 6 أحرف على الأقل</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={LABEL_STYLE}>تأكيد كلمة السر *</label>
              <div style={{position:"relative"}}>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={e => up("confirm", e.target.value)}
                  placeholder="••••••••"
                  onFocus={()=>setFocus("confirm")} onBlur={()=>setFocus(null)}
                  style={{
                    ...getInputStyle(focus, "confirm"),
                    paddingLeft:44,
                    direction:"ltr",
                    textAlign:"left",
                    border:`1.5px solid ${
                      form.confirm && !passMatch
                        ? "rgba(239,68,68,.55)"
                        : focus === "confirm"
                        ? "rgba(109,40,217,.6)"
                        : "rgba(255,255,255,.09)"
                    }`,
                  }}
                />
                <button
                  onClick={() => setShowConfirm(p => !p)}
                  style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.3)",display:"flex",alignItems:"center"}}
                >
                  {showConfirm ? <IconEyeOff size={18} color="currentColor"/> : <IconEye size={18} color="currentColor"/>}
                </button>
              </div>
              {form.confirm && !passMatch && (
                <p style={{fontSize:"clamp(9px,2.2vw,11px)",color:"#EF4444",marginTop:5,fontWeight:600}}>كلمتا السر غير متطابقتين</p>
              )}
              {form.confirm && passMatch && form.password.length >= 6 && (
                <p style={{fontSize:"clamp(9px,2.2vw,11px)",color:"#34D399",marginTop:5,fontWeight:600,display:"flex",alignItems:"center",gap:5}}><IconSuccess size={12} color="#34D399"/> كلمتا السر متطابقتان</p>
              )}
            </div>
          </div>
        )}

        {/* ══ Step 3: Review & Submit ══ */}
        {step === 3 && (
          <div style={{display:"flex", flexDirection:"column", gap:16, animation:"fadeUp .3s ease"}}>
            <h2 style={{fontSize:"clamp(15px,4vw,18px)",fontWeight:900,color:"#F1F5F9",marginBottom:4}}>مراجعة البيانات</h2>

            {[
              { icon:<IconDocument size={18} color="#A78BFA"/>, label:"اسم الوكالة",     value:form.name,     toStep:0 },
              { icon:<IconUserPlus size={18} color="#A78BFA"/>, label:"صاحب الوكالة",    value:form.owner,    toStep:0 },
              { icon:<IconPhone size={18} color="#A78BFA"/>, label:"الهاتف",           value:form.phone,    toStep:0 },
              { icon:<IconDocument size={18} color="#A78BFA"/>, label:"البريد",           value:form.email,    toStep:0 },
              { icon:<IconPin size={18} color="#A78BFA"/>, label:"الولاية",          value:form.wilaya,   toStep:1 },
              { icon:<IconMap size={18} color="#A78BFA"/>, label:"العنوان",          value:form.address,  toStep:1 },
              { icon:<IconUserPlus size={18} color="#A78BFA"/>, label:"اسم المستخدم",     value:form.username, toStep:2 },
              { icon:<IconKey size={18} color="#A78BFA"/>, label:"كلمة السر",        value:form.password ? "••••••••" : "", toStep:2 },
            ].filter(r => r.value).map((row,i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:12,
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
                borderRadius:12, padding:"clamp(10px,2.5vw,13px) clamp(12px,3vw,16px)",
              }}>
                <span style={{display:"inline-flex"}}>{row.icon}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:"clamp(9px,2.2vw,11px)",color:"rgba(255,255,255,.35)",marginBottom:2}}>{row.label}</div>
                  <div style={{fontSize:"clamp(12px,3vw,14px)",fontWeight:700,color:"#F1F5F9",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",direction:"ltr",textAlign:"right"}}>{row.value}</div>
                </div>
                <button onClick={()=>setStep(row.toStep)} style={{
                  background:"rgba(109,40,217,.15)", border:"1px solid rgba(109,40,217,.3)",
                  color:"#A78BFA", borderRadius:8, padding:"4px 10px",
                  fontSize:"clamp(9px,2.2vw,11px)", fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                }}>تعديل</button>
              </div>
            ))}

            {/* Terms */}
            <div style={{
              background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
              borderRadius:14, padding:"clamp(14px,3.5vw,18px)",
              display:"flex", gap:12, alignItems:"flex-start", marginTop:4,
              cursor:"pointer",
            }} onClick={()=>up("agree",!form.agree)}>
              <div style={{
                width:22, height:22, borderRadius:6, flexShrink:0, marginTop:2,
                background: form.agree ? "linear-gradient(135deg,#6D28D9,#4F46E5)" : "rgba(255,255,255,.06)",
                border: `2px solid ${form.agree ? "transparent" : "rgba(255,255,255,.15)"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .2s",
              }}>
                {form.agree && <IconSuccess size={11} color="#fff"/>}
              </div>
              <div style={{fontSize:"clamp(11px,2.8vw,13px)",color:"rgba(255,255,255,.55)",lineHeight:1.7}}>
                أوافق على <span style={{color:"#A78BFA",fontWeight:700}}>شروط الاستخدام وسياسة الخصوصية</span> لمنصة درايف RENT، وأؤكد أن المعلومات المقدمة صحيحة وكاملة
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom action buttons ── */}
      <div style={{
        position:"sticky", bottom:0,
        background:"rgba(7,8,15,.95)", backdropFilter:"blur(20px)",
        borderTop:"1px solid rgba(255,255,255,.07)",
        padding:"clamp(12px,3vw,16px) clamp(14px,4vw,24px) max(16px,env(safe-area-inset-bottom,16px))",
        display:"flex", gap:12,
        flexShrink:0,
      }}>
        {step > 0 && (
          <button onClick={()=>setStep(s=>s-1)} style={{
            flex:"0 0 auto", padding:"clamp(12px,3vw,14px) clamp(16px,4vw,22px)",
            borderRadius:14, border:"1.5px solid rgba(255,255,255,.12)",
            background:"rgba(255,255,255,.05)", color:"rgba(255,255,255,.6)",
            fontSize:"clamp(13px,3.2vw,15px)", fontWeight:700,
            cursor:"pointer", fontFamily:"inherit",
          }}>
            رجوع
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            onClick={()=> canNext() && setStep(s=>s+1)}
            style={{
              flex:1, padding:"clamp(12px,3vw,14px)",
              borderRadius:14, border:"none",
              background: canNext()
                ? "linear-gradient(135deg,#6D28D9,#4F46E5)"
                : "rgba(255,255,255,.07)",
              color: canNext() ? "#fff" : "rgba(255,255,255,.3)",
              fontSize:"clamp(13px,3.5vw,16px)", fontWeight:900,
              cursor: canNext() ? "pointer" : "not-allowed",
              fontFamily:"inherit",
              boxShadow: canNext() ? "0 6px 22px rgba(109,40,217,.4)" : "none",
              transition:"all .25s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
            التالي
            <IconChevronRight size={16} color="currentColor"/>
          </button>
        ) : (
          <button
            onClick={()=> form.agree && handleSubmit()}
            style={{
              flex:1, padding:"clamp(12px,3vw,14px)",
              borderRadius:14, border:"none",
              background: form.agree
                ? "linear-gradient(135deg,#059669,#34D399)"
                : "rgba(255,255,255,.07)",
              color: form.agree ? "#fff" : "rgba(255,255,255,.3)",
              fontSize:"clamp(13px,3.5vw,16px)", fontWeight:900,
              cursor: form.agree ? "pointer" : "not-allowed",
              fontFamily:"inherit",
              boxShadow: form.agree ? "0 6px 22px rgba(5,150,105,.4)" : "none",
              transition:"all .25s",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
            إرسال الطلب
          </button>
        )}
      </div>
    </div>
  );
}
