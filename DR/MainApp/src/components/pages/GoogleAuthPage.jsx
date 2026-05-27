import { useState } from "react";
import { useNavigate } from "../../lib/router.jsx";
import ROAD_IMG from "../../assets/roadImg.js";
import { IconBack, IconGoogle, IconLoader, IconAlert } from "../ui/AppIcons.jsx";
import { signInWithOAuth } from "../../lib/supabase.js";

export function GoogleAuthPage({ onBack } = {}) {
  const navigate = useNavigate();
  const _back = onBack || (() => navigate(-1));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function startGoogle() {
    setError("");
    setLoading(true);
    try {
      signInWithOAuth("google");
    } catch (e) {
      setLoading(false);
      setError(e.message || "تعذر بدء تسجيل الدخول عبر Google");
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#07080F", display: "flex", flexDirection: "column", overflowY: "auto", fontFamily: "Cairo, system-ui, sans-serif" }}>
      <div style={{ position: "relative", height: 210, flexShrink: 0, overflow: "hidden" }}>
        <img src={ROAD_IMG} alt="road" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,8,15,.28) 0%, rgba(7,8,15,1) 100%)" }} />
        <button onClick={_back} style={{ position: "absolute", top: 16, right: 16, width: 38, height: 38, borderRadius: "50%", background: "rgba(0,0,0,.45)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconBack size={16} color="rgba(255,255,255,.82)" />
        </button>
      </div>

      <main style={{ flex: 1, padding: "24px 24px 48px", maxWidth: 520, width: "100%", margin: "0 auto", boxSizing: "border-box", textAlign: "center" }}>
        <div style={{ width: 62, height: 62, borderRadius: 18, background: "rgba(255,255,255,.06)", border: "1.5px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <IconGoogle size={30} />
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#F1F5F9", marginBottom: 8 }}>تسجيل الدخول عبر Google</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.44)", lineHeight: 1.8, marginBottom: 22 }}>
          سيتم تحويلك إلى صفحة Google الرسمية عبر Supabase. لا توجد حسابات تجريبية داخل التطبيق.
        </p>
        {error && <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 14, padding: "12px 14px", marginBottom: 16, color: "#FCA5A5", fontSize: 13 }}><IconAlert size={15} color="#FCA5A5"/> {error}</div>}
        <button onClick={startGoogle} disabled={loading} style={{ width: "100%", padding: "15px 20px", borderRadius: 18, border: "none", background: loading ? "rgba(241,245,249,.22)" : "#F1F5F9", color: "#07080F", fontSize: 15, fontWeight: 900, fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          {loading ? <><IconLoader size={18} color="#07080F"/> جاري التحويل...</> : <><IconGoogle size={18}/> المتابعة عبر Google</>}
        </button>
        <button onClick={_back} style={{ marginTop: 12, background: "none", border: "none", color: "rgba(255,255,255,.36)", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>إلغاء</button>
      </main>
    </div>
  );
}
