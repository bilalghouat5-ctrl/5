import { useEffect, useRef, useState } from "react";
import { getAppLanguage } from "../../lib/supabase.js";
import { useNavigate } from "../../lib/router.jsx";
import ROAD_IMG from "../../assets/roadImg.js";
import LOGO_IMG from "../../assets/appLogo.js";
import { GoogleBtn, AppleBtn } from "../GuestAuthSheet.jsx";
import { IconClose, IconBack, IconEye, IconEyeOff, IconLogin, IconUserPlus, IconLoader, IconAlert, IconSuccess } from "../ui/AppIcons.jsx";
import { signUp } from "../../lib/supabase.js";

function getInputStyle(focusEl, name) {
  return {
    width: "100%",
    background: focusEl === name ? "rgba(124,58,237,.12)" : "rgba(255,255,255,.055)",
    border: `1.5px solid ${focusEl === name ? "rgba(167,139,250,.65)" : "rgba(255,255,255,.11)"}`,
    borderRadius: 18,
    padding: "15px 16px",
    color: "#F1F5F9",
    fontSize: 16,
    fontFamily: "Cairo, system-ui, sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s, background .2s, box-shadow .2s",
    boxShadow: focusEl === name ? "0 0 0 4px rgba(124,58,237,.14)" : "none",
    direction: "ltr",
    textAlign: getAppLanguage() === "ar" ? "right" : "left",
  };
}

const LABEL_STYLE = {
  fontSize: 12,
  fontWeight: 800,
  color: "rgba(255,255,255,.48)",
  display: "block",
  marginBottom: 8,
  fontFamily: "Cairo, system-ui, sans-serif",
};

function AuthShell({ children, onClose, success = false }) {
  const lang = getAppLanguage();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const startY = useRef(0);
  const sheetRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function close() {
    setVisible(false);
    setTimeout(onClose, 310);
  }

  function collapse() {
    setExpanded(false);
    setDragY(0);
    const active = document.activeElement;
    if (active && typeof active.blur === "function") active.blur();
  }

  function onTouchStart(e) {
    startY.current = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    const dy = e.touches[0].clientY - startY.current;
    const scrollTop = sheetRef.current?.scrollTop || 0;
    if (dy > 0 && scrollTop <= 2) {
      setDragY(Math.min(dy, 220));
    }
  }

  function onTouchEnd() {
    if (dragY > 105) close();
    else setDragY(0);
  }

  function handleBackdrop(e) {
    if (e.target === backdropRef.current) close();
  }

  function handleFocusCapture(e) {
    if (e.target?.matches?.("input, textarea, select")) {
      setExpanded(true);
      setDragY(0);
      setTimeout(() => {
        e.target?.scrollIntoView?.({ block: "center", behavior: "smooth" });
      }, 240);
    }
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0, zIndex: 1400, minHeight: "100dvh",
        background: visible ? "rgba(4,4,12,.62)" : "rgba(4,4,12,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(12px)" : "blur(0px)",
        overflow: "hidden", fontFamily: "Cairo, system-ui, sans-serif", direction: dir,
        transition: "background .28s ease, backdrop-filter .28s ease, -webkit-backdrop-filter .28s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        ref={sheetRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onFocusCapture={handleFocusCapture}
        style={{
          position: "absolute", left: "50%", bottom: 0,
          width: expanded ? "100%" : "min(100%, 520px)",
          height: expanded ? "100dvh" : "auto",
          maxHeight: expanded ? "100dvh" : (success ? "72dvh" : "90dvh"),
          transform: visible ? `translate(-50%, ${dragY}px)` : "translate(-50%, 100%)",
          transition: dragY ? "none" : (visible ? "transform .54s cubic-bezier(.22,1.55,.36,1), width .28s ease, height .28s ease, max-height .28s ease, border-radius .28s ease" : "transform .28s cubic-bezier(.4,0,.6,1)"),
          borderRadius: expanded ? 0 : "32px 32px 0 0",
          overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch",
          background: "linear-gradient(180deg,#10111E 0%,#090A14 100%)",
          border: expanded ? "none" : "1px solid rgba(255,255,255,.08)", borderBottom: "none",
          boxShadow: expanded ? "none" : "0 -28px 90px rgba(0,0,0,.72)",
        }}
      >
        <div style={{ position: "absolute", top: expanded ? "max(10px, env(safe-area-inset-top))" : 10, left: "50%", transform: "translateX(-50%)", zIndex: 35, width: 52, height: 5, borderRadius: 999, background: "rgba(255,255,255,.24)", boxShadow: "0 2px 10px rgba(0,0,0,.35)", pointerEvents: "none" }}/>
        {expanded && (
          <>
            <button onClick={close} aria-label="إغلاق" style={{ position: "fixed", top: "max(14px, calc(env(safe-area-inset-top) + 10px))", left: 14, zIndex: 60, width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,.46)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.13)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconClose size={15} color="rgba(255,255,255,.86)"/>
            </button>
            <button onClick={collapse} aria-label="رجوع" style={{ position: "fixed", top: "max(14px, calc(env(safe-area-inset-top) + 10px))", right: 14, zIndex: 60, width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,.46)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.13)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconBack size={17} color="rgba(255,255,255,.86)"/>
            </button>
          </>
        )}
        {children}
      </div>
    </div>
  );
}

export function RegisterPage({ onBack, onGoLogin, onGoGoogle, onGoApple, onSuccess } = {}) {
  const navigate = useNavigate();
  const _back = onBack || (() => navigate(-1));
  const _goLogin  = onGoLogin  || (() => navigate("/login"));
  const _goGoogle = onGoGoogle || (() => navigate("/auth/google"));
  const _goApple  = onGoApple  || (() => navigate("/auth/apple"));
  const _success  = onSuccess  || (() => navigate("/"));
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [focusEl, setFocusEl]   = useState(null);
  const [error, setError]       = useState(null);
  const [agreed, setAgreed]     = useState(false);
  const [success, setSuccess]   = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const allFilled = form.name && form.phone && form.email && form.password && form.confirm && agreed;
  const passMatch = !form.confirm || form.password === form.confirm;

  async function handleRegister() {
    if (!allFilled || !passMatch) return;
    if (form.password.length < 6) { setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل"); return; }
    setLoading(true);
    setError(null);
    try {
      await signUp({ email: form.email, password: form.password, name: form.name, phone: form.phone });
      setSuccess(true);
      setTimeout(() => _success(), 1800);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <AuthShell onClose={_success} success>
        <div style={{ padding: "42px 24px max(42px, env(safe-area-inset-bottom))", textAlign: "center" }}>
          <div style={{ width: 74, height: 74, borderRadius: "50%", background: "rgba(52,211,153,.15)", border: "2px solid #34D399", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <IconSuccess size={34} color="#34D399"/>
          </div>
          <h2 style={{ color: "#F1F5F9", fontSize: 24, fontWeight: 900, textAlign: "center", marginBottom: 8 }}>تم التسجيل بنجاح!</h2>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, textAlign: "center", maxWidth: 300, margin: "0 auto", lineHeight: 1.8 }}>تحقق من بريدك الإلكتروني لتفعيل حسابك</p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell onClose={_back}>
      <div style={{ position: "relative", height: 126, flexShrink: 0, overflow: "hidden" }}>
        <img src={ROAD_IMG} alt="road" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 42%", display: "block" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,8,15,.28) 0%, rgba(9,10,20,1) 100%)" }}/>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={LOGO_IMG} alt="logo" style={{ width: 72, height: 72, objectFit: "contain", filter: "drop-shadow(0 5px 18px rgba(0,0,0,.6))" }}/>
        </div>
      </div>

      <div style={{ padding: "20px 22px max(34px, env(safe-area-inset-bottom))", width: "100%", boxSizing: "border-box" }}>
        <h1 style={{ fontSize: "clamp(21px,5.8vw,28px)", fontWeight: 900, color: "#F1F5F9", marginBottom: 5, letterSpacing: "-.5px", textAlign: "center" }}>إنشاء حساب جديد</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center", marginBottom: 20, lineHeight: 1.7 }}>أنشئ حسابك وابدأ رحلتك</p>

        {error && <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 14, padding: "12px 14px", marginBottom: 16, color: "#FCA5A5", fontSize: 13, textAlign: "center" }}><IconAlert size={15} color="#FCA5A5"/> {error}</div>}

        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <div><label style={LABEL_STYLE}>الاسم الكامل</label><input type="text" placeholder="محمد أمين" value={form.name} onChange={set("name")} onFocus={() => setFocusEl("name")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "name")}/></div>
          <div><label style={LABEL_STYLE}>رقم الهاتف</label><input type="text" inputMode="tel" placeholder="0555 000 000" value={form.phone} onChange={set("phone")} onFocus={() => setFocusEl("phone")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "phone")}/></div>
          <div><label style={LABEL_STYLE}>البريد الإلكتروني</label><input type="email" placeholder="example@email.com" value={form.email} onChange={set("email")} onFocus={() => setFocusEl("email")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "email")}/></div>

          <div>
            <label style={LABEL_STYLE}>كلمة المرور</label>
            <div style={{ position: "relative" }}>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={set("password")} onFocus={() => setFocusEl("password")} onBlur={() => setFocusEl(null)} style={{ ...getInputStyle(focusEl, "password"), paddingLeft: 46 }}/>
              <button onClick={() => setShowPass(p => !p)} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.35)", display: "flex", alignItems: "center" }}>
                {showPass ? <IconEyeOff size={18} color="currentColor"/> : <IconEye size={18} color="currentColor"/>}
              </button>
            </div>
          </div>

          <div>
            <label style={LABEL_STYLE}>تأكيد كلمة المرور</label>
            <input type="password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")} onFocus={() => setFocusEl("confirm")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "confirm")}/>
            {form.confirm && !passMatch && <p style={{ color: "#EF4444", fontSize: 11, marginTop: 6, fontWeight: 700 }}>كلمتا المرور غير متطابقتين</p>}
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", paddingTop: 2 }} onClick={() => setAgreed(p => !p)}>
            <div style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${agreed ? "#7C3AED" : "rgba(255,255,255,.22)"}`, background: agreed ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "transparent", flexShrink: 0, marginTop: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
              {agreed && <IconSuccess size={12} color="#fff"/>}
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.48)", lineHeight: 1.65 }}>أوافق على <span style={{ color: "#A78BFA" }}>شروط الاستخدام</span> و <span style={{ color: "#A78BFA" }}>سياسة الخصوصية</span></span>
          </div>

          <button onClick={handleRegister} disabled={loading || !allFilled || !passMatch} style={{ width: "100%", padding: "16px 20px", borderRadius: 18, border: "none", background: (loading || !allFilled || !passMatch) ? "rgba(109,40,217,.32)" : "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", fontSize: 16, fontWeight: 900, fontFamily: "inherit", cursor: (loading || !allFilled || !passMatch) ? "not-allowed" : "pointer", boxShadow: (loading || !allFilled || !passMatch) ? "none" : "0 8px 28px rgba(109,40,217,.42)", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 4 }}>
            {loading ? <><IconLoader size={18} color="#fff"/> جاري الإنشاء...</> : <><IconUserPlus size={17} color="#fff"/>إنشاء الحساب</>}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}><div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/><span style={{ fontSize: 11, color: "rgba(255,255,255,.22)", flexShrink: 0 }}>أو</span><div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/></div>
          <GoogleBtn label="التسجيل عبر Google" onClick={_goGoogle}/>
          <AppleBtn label="التسجيل عبر Apple" onClick={_goApple}/>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 16px" }}><div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/><span style={{ fontSize: 12, color: "rgba(255,255,255,.24)", flexShrink: 0 }}>لديك حساب بالفعل؟</span><div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/></div>
        <button onClick={_goLogin} style={{ width: "100%", padding: "15px 20px", borderRadius: 18, border: "1.5px solid rgba(167,139,250,.32)", background: "rgba(109,40,217,.09)", color: "#A78BFA", fontSize: 15, fontWeight: 900, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><IconLogin size={16} color="#A78BFA"/>تسجيل الدخول</button>
      </div>
    </AuthShell>
  );
}
