import { useState } from "react";
import { useNavigate } from "../../lib/router.jsx";
import { IconBack, IconCar, IconBuilding, IconSuccess, IconUserPlus, IconPhone, IconPin, IconKey, IconLock, IconEye, IconEyeOff, IconDocument, IconChevronRight, IconShield } from "../ui/AppIcons.jsx";

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

const STEPS = ["بيانات الوكالة", "بيانات الحساب", "التحقق والإرسال"];

const LABEL_STYLE = {
  fontSize: "clamp(11px,2.8vw,13px)",
  fontWeight: 800,
  color: "rgba(255,255,255,.52)",
  display: "block",
  marginBottom: 7,
};

function inputStyle(focus, name) {
  return {
    width: "100%",
    background: focus === name ? "rgba(124,58,237,.11)" : "rgba(255,255,255,.045)",
    border: `1.5px solid ${focus === name ? "rgba(167,139,250,.65)" : "rgba(255,255,255,.09)"}`,
    borderRadius: 16,
    padding: "clamp(12px,3.2vw,15px) clamp(14px,3.6vw,17px)",
    color: "#F1F5F9",
    fontSize: "clamp(13px,3.3vw,15px)",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s, background .2s, box-shadow .2s",
    boxShadow: focus === name ? "0 0 0 3px rgba(124,58,237,.14)" : "none",
    direction: "rtl",
  };
}

function StepBadge({ active, done, label, index }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 10px",
      borderRadius: 999,
      background: active ? "rgba(124,58,237,.18)" : done ? "rgba(52,211,153,.10)" : "rgba(255,255,255,.045)",
      border: `1px solid ${active ? "rgba(167,139,250,.32)" : done ? "rgba(52,211,153,.22)" : "rgba(255,255,255,.06)"}`,
      color: active ? "#C4B5FD" : done ? "#34D399" : "rgba(255,255,255,.34)",
      flex: "0 0 auto",
    }}>
      <span style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 900,
        background: active ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : done ? "#059669" : "rgba(255,255,255,.06)",
        color: "#fff",
      }}>{done ? <IconSuccess size={11} color="#fff"/> : index + 1}</span>
      <span style={{ fontSize: "clamp(10px,2.4vw,12px)", fontWeight: 900, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

export function AgencyRegisterPage({ onBack } = {}) {
  const navigate = useNavigate();
  const back = onBack || (() => navigate(-1));
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [focus, setFocus] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    agencyName: "",
    fullName: "",
    wilaya: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    agree: false,
  });

  const up = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const canNext = () => {
    if (step === 0) return form.agencyName.trim() && form.fullName.trim() && form.wilaya;
    if (step === 1) return form.username.trim() && form.password.length >= 6 && form.email.trim() && form.phone.trim();
    if (step === 2) return form.agree;
    return true;
  };

  const submit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#07080F",
        color: "#F1F5F9",
        fontFamily: "'Cairo', system-ui, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "calc(var(--safe-top,0px) + 24px) clamp(18px,5vw,32px) calc(env(safe-area-inset-bottom,0px) + 28px)",
        overflow: "hidden",
        animation: "fadeIn .35s ease",
      }}>
        <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(52,211,153,.22),transparent 68%)", top: "14%", left: "50%", transform: "translateX(-50%)", filter: "blur(55px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,.16),transparent 70%)", bottom: "-16%", right: "-20%", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ width: "min(100%, 430px)", textAlign: "center", position: "relative", zIndex: 1, animation: "springIn .48s cubic-bezier(.34,1.56,.64,1) both" }}>
          <div style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            margin: "0 auto 26px",
            background: "linear-gradient(135deg,#34D399,#059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px rgba(52,211,153,.42), 0 22px 50px rgba(0,0,0,.45)",
            animation: "float 3s ease-in-out infinite",
          }}>
            <IconSuccess size={44} color="#fff" />
          </div>
          <h1 style={{ fontSize: "clamp(24px,6vw,34px)", fontWeight: 900, marginBottom: 10 }}>تم إرسال طلبك</h1>
          <p style={{ fontSize: "clamp(13px,3.4vw,16px)", color: "rgba(255,255,255,.54)", lineHeight: 1.85, marginBottom: 16 }}>
            ستتلقى اتصالاً هاتفياً من قبل فريقنا خلال 24 ساعة القادمة على الرقم:
          </p>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            background: "rgba(52,211,153,.10)",
            border: "1px solid rgba(52,211,153,.26)",
            color: "#34D399",
            borderRadius: 16,
            padding: "12px 18px",
            fontWeight: 900,
            direction: "ltr",
            marginBottom: 30,
            minWidth: 210,
          }}>
            <IconPhone size={18} color="#34D399" />
            {form.phone || "رقم الهاتف"}
          </div>
          <button onClick={() => navigate("/")} className="btn-press" style={{
            width: "100%",
            padding: "15px 18px",
            borderRadius: 18,
            border: "none",
            background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
            color: "#fff",
            fontFamily: "inherit",
            fontWeight: 900,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(124,58,237,.36)",
          }}>العودة للرئيسية</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#07080F",
      color: "#F1F5F9",
      fontFamily: "'Cairo', system-ui, sans-serif",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      overscrollBehavior: "contain",
      animation: "pageSlideIn .38s cubic-bezier(.22,1,.36,1) both",
    }}>
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(7,8,15,.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        padding: "calc(var(--safe-top,0px) + 14px) clamp(14px,4vw,24px) 14px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 580, margin: "0 auto" }}>
          <button onClick={back} className="btn-press" style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.10)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <IconBack size={17} color="rgba(255,255,255,.75)" />
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: "clamp(16px,4vw,20px)", fontWeight: 900, color: "#fff", marginBottom: 2 }}>أضف وكالتك</h1>
            <p style={{ fontSize: "clamp(10px,2.5vw,12px)", color: "rgba(255,255,255,.40)" }}>الخطوة {step + 1} من {STEPS.length}</p>
          </div>

          <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(124,58,237,.38)" }}>
            <IconCar size={19} color="#fff" />
          </div>
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,.045)", height: 3 }}>
        <div style={{ height: "100%", width: `${((step + 1) / STEPS.length) * 100}%`, background: "linear-gradient(90deg,#7C3AED,#A78BFA)", transition: "width .38s cubic-bezier(.4,0,.2,1)", boxShadow: "0 0 14px rgba(124,58,237,.55)" }} />
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "16px clamp(14px,4vw,24px) 0", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", gap: 8, minWidth: "max-content" }}>
          {STEPS.map((label, i) => <StepBadge key={label} label={label} index={i} active={i === step} done={i < step} />)}
        </div>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "clamp(18px,4vw,28px) clamp(14px,4vw,24px) 120px" }}>
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .28s ease" }}>
            <div style={{ background: "rgba(124,58,237,.09)", border: "1px solid rgba(167,139,250,.22)", borderRadius: 18, padding: "15px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <IconBuilding size={25} color="#A78BFA" />
              <div>
                <div style={{ fontSize: "clamp(13px,3.2vw,15px)", fontWeight: 900, color: "#C4B5FD", marginBottom: 3 }}>بيانات الوكالة الأساسية</div>
                <div style={{ fontSize: "clamp(10px,2.5vw,12px)", color: "rgba(255,255,255,.44)" }}>ابدأ باسم الوكالة والممثل الرسمي والولاية</div>
              </div>
            </div>

            <div>
              <label style={LABEL_STYLE}>اسم الوكالة *</label>
              <input value={form.agencyName} onChange={e => up("agencyName", e.target.value)} placeholder="مثال: وكالة الجزائر بريميوم" onFocus={() => setFocus("agencyName")} onBlur={() => setFocus(null)} style={inputStyle(focus, "agencyName")} />
            </div>

            <div>
              <label style={LABEL_STYLE}>الاسم الحقيقي الكامل *</label>
              <input value={form.fullName} onChange={e => up("fullName", e.target.value)} placeholder="الاسم واللقب" onFocus={() => setFocus("fullName")} onBlur={() => setFocus(null)} style={inputStyle(focus, "fullName")} />
            </div>

            <div>
              <label style={LABEL_STYLE}>الولاية *</label>
              <select value={form.wilaya} onChange={e => up("wilaya", e.target.value)} onFocus={() => setFocus("wilaya")} onBlur={() => setFocus(null)} style={{ ...inputStyle(focus, "wilaya"), appearance: "none", backgroundImage: "linear-gradient(45deg, transparent 50%, rgba(255,255,255,.45) 50%), linear-gradient(135deg, rgba(255,255,255,.45) 50%, transparent 50%)", backgroundPosition: "left 18px center, left 11px center", backgroundSize: "7px 7px, 7px 7px", backgroundRepeat: "no-repeat" }}>
                <option value="" disabled style={{ background: "#09091C" }}>اختر الولاية</option>
                {WILAYAS.map(w => <option key={w} value={w} style={{ background: "#09091C" }}>{w}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .28s ease" }}>
            <div style={{ background: "rgba(124,58,237,.09)", border: "1px solid rgba(167,139,250,.22)", borderRadius: 18, padding: "15px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <IconLock size={25} color="#A78BFA" />
              <div>
                <div style={{ fontSize: "clamp(13px,3.2vw,15px)", fontWeight: 900, color: "#C4B5FD", marginBottom: 3 }}>بيانات الدخول</div>
                <div style={{ fontSize: "clamp(10px,2.5vw,12px)", color: "rgba(255,255,255,.44)" }}>ستستعملها لاحقاً للدخول إلى منصة الوكالة</div>
              </div>
            </div>

            <div>
              <label style={LABEL_STYLE}>اسم المستخدم *</label>
              <input value={form.username} onChange={e => up("username", e.target.value)} placeholder="agency_premium" dir="ltr" onFocus={() => setFocus("username")} onBlur={() => setFocus(null)} style={{ ...inputStyle(focus, "username"), textAlign: "right" }} />
            </div>

            <div>
              <label style={LABEL_STYLE}>كلمة السر *</label>
              <div style={{ position: "relative" }}>
                <input type={showPass ? "text" : "password"} value={form.password} onChange={e => up("password", e.target.value)} placeholder="••••••••" onFocus={() => setFocus("password")} onBlur={() => setFocus(null)} style={{ ...inputStyle(focus, "password"), paddingLeft: 46, direction: "ltr", textAlign: "left" }} />
                <button onClick={() => setShowPass(p => !p)} type="button" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  {showPass ? <IconEyeOff size={18} color="rgba(255,255,255,.42)" /> : <IconEye size={18} color="rgba(255,255,255,.42)" />}
                </button>
              </div>
              {form.password && form.password.length < 6 ? <p style={{ fontSize: 11, color: "#F87171", marginTop: 6, fontWeight: 700 }}>كلمة السر يجب أن تكون 6 أحرف على الأقل</p> : null}
            </div>

            <div>
              <label style={LABEL_STYLE}>الإيميل الخاص به *</label>
              <input value={form.email} onChange={e => up("email", e.target.value)} placeholder="example@email.com" type="email" dir="ltr" onFocus={() => setFocus("email")} onBlur={() => setFocus(null)} style={{ ...inputStyle(focus, "email"), textAlign: "right" }} />
            </div>

            <div>
              <label style={LABEL_STYLE}>رقم الهاتف الخاص به *</label>
              <input value={form.phone} onChange={e => up("phone", e.target.value)} placeholder="05xxxxxxxx" type="tel" dir="ltr" onFocus={() => setFocus("phone")} onBlur={() => setFocus(null)} style={{ ...inputStyle(focus, "phone"), textAlign: "right" }} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp .28s ease" }}>
            <div style={{ background: "rgba(52,211,153,.08)", border: "1px solid rgba(52,211,153,.22)", borderRadius: 20, padding: "16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <IconShield size={26} color="#34D399" />
              <div>
                <div style={{ color: "#34D399", fontSize: "clamp(13px,3.3vw,16px)", fontWeight: 900, marginBottom: 4 }}>التحقق والإرسال</div>
                <div style={{ color: "rgba(255,255,255,.48)", fontSize: "clamp(11px,2.8vw,13px)", lineHeight: 1.7 }}>راجع البيانات ثم أرسل الطلب. سيتواصل فريق درايف Rent معك هاتفياً لتأكيد معلومات الوكالة.</div>
              </div>
            </div>

            {[
              ["اسم الوكالة", form.agencyName, <IconBuilding size={18} color="#A78BFA" />],
              ["الاسم الكامل", form.fullName, <IconUserPlus size={18} color="#A78BFA" />],
              ["الولاية", form.wilaya, <IconPin size={18} color="#A78BFA" />],
              ["اسم المستخدم", form.username, <IconKey size={18} color="#A78BFA" />],
              ["الإيميل", form.email, <IconDocument size={18} color="#A78BFA" />],
              ["رقم الهاتف", form.phone, <IconPhone size={18} color="#A78BFA" />],
            ].map(([label, value, icon], i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.075)", borderRadius: 15, padding: "12px 14px", animation: `fadeUp .28s ease ${i * .035}s both` }}>
                <span style={{ display: "inline-flex" }}>{icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "rgba(255,255,255,.36)", fontSize: 11, marginBottom: 2 }}>{label}</div>
                  <div style={{ color: "#F1F5F9", fontWeight: 800, fontSize: "clamp(12px,3vw,14px)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", direction: label.includes("الإيميل") || label.includes("الهاتف") ? "ltr" : "rtl", textAlign: "right" }}>{value}</div>
                </div>
              </div>
            ))}

            <div onClick={() => up("agree", !form.agree)} style={{ background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.075)", borderRadius: 16, padding: "15px", display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginTop: 4 }}>
              <div style={{ width: 24, height: 24, borderRadius: 8, flexShrink: 0, marginTop: 1, background: form.agree ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.055)", border: `2px solid ${form.agree ? "transparent" : "rgba(255,255,255,.16)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
                {form.agree ? <IconSuccess size={12} color="#fff" /> : null}
              </div>
              <div style={{ color: "rgba(255,255,255,.55)", fontSize: "clamp(11px,2.8vw,13px)", lineHeight: 1.75 }}>
                أؤكد أن المعلومات صحيحة وأوافق على <span style={{ color: "#C4B5FD", fontWeight: 900 }}>شروط الاستخدام وسياسة الخصوصية</span> الخاصة بدرايف Rent.
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        background: "rgba(7,8,15,.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,.07)",
        padding: "12px clamp(14px,4vw,24px) max(16px,env(safe-area-inset-bottom,16px))",
      }}>
        <div style={{ maxWidth: 580, margin: "0 auto", display: "flex", gap: 12 }}>
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} className="btn-press" style={{
              flex: "0 0 auto",
              padding: "13px 20px",
              borderRadius: 16,
              border: "1.5px solid rgba(255,255,255,.12)",
              background: "rgba(255,255,255,.055)",
              color: "rgba(255,255,255,.66)",
              fontFamily: "inherit",
              fontWeight: 800,
              cursor: "pointer",
            }}>رجوع</button>
          ) : null}

          {step < STEPS.length - 1 ? (
            <button onClick={() => canNext() && setStep(s => s + 1)} className="btn-press" style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: 16,
              border: "none",
              background: canNext() ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.07)",
              color: canNext() ? "#fff" : "rgba(255,255,255,.30)",
              fontFamily: "inherit",
              fontWeight: 900,
              fontSize: 15,
              cursor: canNext() ? "pointer" : "not-allowed",
              boxShadow: canNext() ? "0 8px 28px rgba(124,58,237,.35)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}>
              التالي
              <IconChevronRight size={16} color="currentColor" />
            </button>
          ) : (
            <button onClick={() => canNext() && submit()} className="btn-press" style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: 16,
              border: "none",
              background: canNext() ? "linear-gradient(135deg,#059669,#34D399)" : "rgba(255,255,255,.07)",
              color: canNext() ? "#fff" : "rgba(255,255,255,.30)",
              fontFamily: "inherit",
              fontWeight: 900,
              fontSize: 15,
              cursor: canNext() ? "pointer" : "not-allowed",
              boxShadow: canNext() ? "0 8px 28px rgba(52,211,153,.32)" : "none",
            }}>إرسال الطلب</button>
          )}
        </div>
      </div>
    </div>
  );
}
