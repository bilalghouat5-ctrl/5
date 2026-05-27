import { useEffect, useRef, useState } from "react";
import { getAppLanguage } from "../../lib/supabase.js";
import { useNavigate } from "../../lib/router.jsx";
import ROAD_IMG from "../../assets/roadImg.js";
import LOGO_IMG from "../../assets/appLogo.js";
import { GoogleBtn, AppleBtn } from "../GuestAuthSheet.jsx";
import { IconClose, IconBack, IconEye, IconEyeOff, IconLogin, IconUserPlus, IconLoader, IconAlert, IconSuccess } from "../ui/AppIcons.jsx";
import { signIn, resetPassword } from "../../lib/supabase.js";

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

function AuthShell({ children, onClose, tall = false }) {
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
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        minHeight: "100dvh",
        background: visible ? "rgba(4,4,12,.62)" : "rgba(4,4,12,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(12px)" : "blur(0px)",
        overflow: "hidden",
        fontFamily: "Cairo, system-ui, sans-serif",
        direction: dir,
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
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: expanded ? "100%" : "min(100%, 520px)",
          height: expanded ? "100dvh" : "auto",
          maxHeight: expanded ? "100dvh" : (tall ? "88dvh" : "82dvh"),
          transform: visible ? `translate(-50%, ${dragY}px)` : "translate(-50%, 100%)",
          transition: dragY ? "none" : (visible ? "transform .54s cubic-bezier(.22,1.55,.36,1), width .28s ease, height .28s ease, max-height .28s ease, border-radius .28s ease" : "transform .28s cubic-bezier(.4,0,.6,1)"),
          borderRadius: expanded ? 0 : "32px 32px 0 0",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          background: "linear-gradient(180deg,#10111E 0%,#090A14 100%)",
          border: expanded ? "none" : "1px solid rgba(255,255,255,.08)",
          borderBottom: "none",
          boxShadow: expanded ? "none" : "0 -28px 90px rgba(0,0,0,.72)",
        }}
      >
        <div style={{ position: "absolute", top: expanded ? "max(10px, env(safe-area-inset-top))" : 10, left: "50%", transform: "translateX(-50%)", zIndex: 35, width: 52, height: 5, borderRadius: 999, background: "rgba(255,255,255,.24)", boxShadow: "0 2px 10px rgba(0,0,0,.35)", pointerEvents: "none" }}/>
        {expanded && (
          <>
            <button
              onClick={close}
              aria-label="إغلاق"
              style={{
                position: "fixed", top: "max(14px, calc(env(safe-area-inset-top) + 10px))", left: 14, zIndex: 60,
                width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,.46)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,.13)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <IconClose size={15} color="rgba(255,255,255,.86)"/>
            </button>
            <button
              onClick={collapse}
              aria-label="رجوع"
              style={{
                position: "fixed", top: "max(14px, calc(env(safe-area-inset-top) + 10px))", right: 14, zIndex: 60,
                width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,.46)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,.13)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <IconBack size={17} color="rgba(255,255,255,.86)"/>
            </button>
          </>
        )}
        {children}
      </div>
    </div>
  );
}

export function LoginPage({ onBack, onGoRegister, onGoGoogle, onGoApple, onSuccess } = {}) {
  const navigate = useNavigate();
  const _back = onBack || (() => navigate(-1));
  const _goRegister = onGoRegister || (() => navigate("/register"));
  const _goGoogle   = onGoGoogle   || (() => navigate("/auth/google"));
  const _goApple    = onGoApple    || (() => navigate("/auth/apple"));
  const _success    = onSuccess    || (() => navigate("/"));
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [focusEl, setFocusEl]   = useState(null);
  const [error, setError]       = useState(null);
  const [forgotMode, setForgotMode] = useState(false);

  async function handleLogin() {
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    try {
      await signIn({ email, password });
      _success();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell onClose={_back}>
      <div style={{ position: "relative", height: 138, flexShrink: 0, overflow: "hidden" }}>
        <img src={ROAD_IMG} alt="road" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 42%", display: "block" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,8,15,.28) 0%, rgba(9,10,20,1) 100%)" }}/>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={LOGO_IMG} alt="logo" style={{ width: 78, height: 78, objectFit: "contain", filter: "drop-shadow(0 5px 18px rgba(0,0,0,.6))" }}/>
        </div>
      </div>

      <div style={{ padding: "22px 22px max(34px, env(safe-area-inset-bottom))", width: "100%", boxSizing: "border-box" }}>
        <h1 style={{ fontSize: "clamp(22px,6vw,29px)", fontWeight: 900, color: "#F1F5F9", marginBottom: 6, letterSpacing: "-.5px", textAlign: "center", fontFamily: "Cairo, system-ui, sans-serif" }}>تسجيل الدخول</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center", marginBottom: 24, lineHeight: 1.7 }}>أدخل بيانات حسابك للمتابعة</p>
        {error && (
          <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 14, padding: "12px 14px", marginBottom: 18, color: "#FCA5A5", fontSize: 13, textAlign: "center" }}>
            <IconAlert size={15} color="#FCA5A5"/> {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={LABEL_STYLE}>البريد الإلكتروني</label>
            <input type="email" placeholder="example@email.com" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFocusEl("email")} onBlur={() => setFocusEl(null)} style={getInputStyle(focusEl, "email")} onKeyDown={e => e.key === "Enter" && handleLogin()}/>
          </div>

          <div>
            <label style={LABEL_STYLE}>كلمة المرور</label>
            <div style={{ position: "relative" }}>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setFocusEl("pass")} onBlur={() => setFocusEl(null)} style={{ ...getInputStyle(focusEl, "pass"), paddingLeft: 46 }} onKeyDown={e => e.key === "Enter" && handleLogin()}/>
              <button onClick={() => setShowPass(p => !p)} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.35)", display: "flex", alignItems: "center" }}>
                {showPass ? <IconEyeOff size={18} color="currentColor"/> : <IconEye size={18} color="currentColor"/>}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "left" }}>
            <button onClick={() => setForgotMode(true)} style={{ background: "none", border: "none", color: "#A78BFA", fontSize: 12, fontFamily: "inherit", cursor: "pointer", padding: 0 }}>نسيت كلمة المرور؟</button>
          </div>

          <button onClick={handleLogin} disabled={loading || !email || !password} style={{ width: "100%", padding: "16px 20px", borderRadius: 18, border: "none", background: (loading || !email || !password) ? "rgba(109,40,217,.35)" : "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", fontSize: 16, fontWeight: 900, fontFamily: "inherit", cursor: loading || !email || !password ? "not-allowed" : "pointer", boxShadow: (loading || !email || !password) ? "none" : "0 8px 28px rgba(109,40,217,.42)", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 4 }}>
            {loading ? <><IconLoader size={18} color="#fff"/> جاري الدخول...</> : <><IconLogin size={17} color="#fff"/>دخول</>}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.22)", flexShrink: 0 }}>أو</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.08)" }}/>
          </div>
          <GoogleBtn onClick={_goGoogle}/>
          <AppleBtn onClick={_goApple}/>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 16px" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.24)", flexShrink: 0 }}>ليس لديك حساب؟</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
        </div>

        <button onClick={_goRegister} style={{ width: "100%", padding: "15px 20px", borderRadius: 18, border: "1.5px solid rgba(167,139,250,.32)", background: "rgba(109,40,217,.09)", color: "#A78BFA", fontSize: 15, fontWeight: 900, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <IconUserPlus size={16} color="#A78BFA"/>
          إنشاء حساب جديد
        </button>
      </div>

      {forgotMode && <ForgotModal onClose={() => setForgotMode(false)}/>} 
    </AuthShell>
  );
}

function ForgotModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  async function handleReset() {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1900, background: "rgba(0,0,0,.55)", backdropFilter: "blur(12px)", display: "flex", alignItems: "flex-end", justifyContent: "center", fontFamily: "Cairo, system-ui, sans-serif" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "min(100%, 480px)", background: "#10111E", border: "1px solid rgba(255,255,255,.08)", borderRadius: "28px 28px 0 0", padding: "24px 22px max(28px, env(safe-area-inset-bottom))", boxShadow: "0 -20px 60px rgba(0,0,0,.62)", animation: "authSheetUp .38s cubic-bezier(.22,1.35,.36,1)" }}>
        {sent ? (
          <>
            <div style={{ width: 58, height: 58, borderRadius: "50%", background: "rgba(52,211,153,.14)", border: "1px solid rgba(52,211,153,.45)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><IconSuccess size={28} color="#34D399"/></div>
            <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 900, textAlign: "center", marginBottom: 8 }}>تم الإرسال</h2>
            <p style={{ color: "rgba(255,255,255,.42)", fontSize: 13, textAlign: "center", lineHeight: 1.7 }}>أرسلنا رابط استرجاع كلمة المرور إلى بريدك.</p>
            <button onClick={onClose} style={{ marginTop: 18, width: "100%", padding: 14, borderRadius: 16, border: "none", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", fontWeight: 900, fontFamily: "inherit" }}>حسنًا</button>
          </>
        ) : (
          <>
            <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 900, textAlign: "center", marginBottom: 8 }}>استرجاع كلمة المرور</h2>
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13, textAlign: "center", marginBottom: 18 }}>أدخل بريدك الإلكتروني وسنرسل رابط الاسترجاع.</p>
            {error && <div style={{ color: "#FCA5A5", fontSize: 13, textAlign: "center", marginBottom: 12 }}><IconAlert size={14} color="#FCA5A5"/> {error}</div>}
            <input type="email" placeholder="example@email.com" value={email} onChange={e => setEmail(e.target.value)} style={getInputStyle("email", "email")}/>
            <button onClick={handleReset} disabled={!email || loading} style={{ marginTop: 14, width: "100%", padding: 14, borderRadius: 16, border: "none", background: (!email || loading) ? "rgba(109,40,217,.35)" : "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", fontWeight: 900, fontFamily: "inherit" }}>{loading ? "جاري الإرسال..." : "إرسال الرابط"}</button>
          </>
        )}
      </div>
    </div>
  );
}
