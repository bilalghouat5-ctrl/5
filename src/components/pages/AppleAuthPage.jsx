import { useState } from "react";
import { useNavigate } from "../../lib/router.jsx";
import ROAD_IMG from "../../assets/roadImg.js";
import { IconBack, IconLock, IconDocument, IconElectric, IconShield, IconChevronRight, IconLoader, IconApple } from "../ui/AppIcons.jsx";
import { demoSignIn } from "../../lib/supabase.js";

export function AppleAuthPage({ onBack, onSuccess } = {}) {
  const navigate = useNavigate();
  const _back    = onBack    || (() => navigate(-1));
  const _success = onSuccess || (() => navigate("/"));
  const [step, setStep] = useState("intro"); // "intro" | "loading" | "privacy" | "confirm"
  const [hideEmail, setHideEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const mockAppleUser = {
    name: "أحمد بن علي",
    realEmail: "ahmed.benali@icloud.com",
    proxyEmail: "xy4k2m@privaterelay.appleid.com",
  };

  function handleSignIn() {
    setStep("loading");
    setTimeout(() => setStep("privacy"), 1700);
  }

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      demoSignIn("apple");
      _success({ ...mockAppleUser, usedProxy: hideEmail });
    }, 1000);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#07080F",
      display: "flex", flexDirection: "column",
      overflowY: "auto", WebkitOverflowScrolling: "touch", overscrollBehavior: "contain",
      animation: "fadeUp .35s ease",
      fontFamily: "'Cairo', sans-serif",
    }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 200, flexShrink: 0, overflow: "hidden" }}>
        <img src={ROAD_IMG} alt="road" style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 40%", display: "block",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(7,8,15,.3) 0%, rgba(7,8,15,1) 100%)",
        }} />
        <button onClick={_back} style={{
          position: "absolute", top: 16, right: 16,
          width: 38, height: 38, borderRadius: "50%",
          background: "rgba(0,0,0,.45)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,.15)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <IconBack size={16} color="rgba(255,255,255,.8)"/>
        </button>
      </div>

      <div style={{ flex: 1, padding: "20px 24px 50px", maxWidth: "clamp(320px,92vw,520px)", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {/* Apple Brand Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(255,255,255,.07)",
            border: "1.5px solid rgba(255,255,255,.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 14,
          }}>
            {/* Apple logo SVG */}
            <IconApple size={28} color="currentColor"/>
          </div>

          {step === "intro" && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, textAlign: "center" }}>
              تسجيل الدخول بمعرّف Apple
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center", lineHeight: 1.6 }}>
              تسجيل دخول آمن ومحمي عبر Apple ID
            </p>
          </>}
          {step === "loading" && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, textAlign: "center" }}>جاري التحقق...</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center" }}>التحقق من معرّف Apple</p>
          </>}
          {(step === "privacy" || step === "confirm") && <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: "#F1F5F9", marginBottom: 5, textAlign: "center" }}>مشاركة البيانات</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.38)", textAlign: "center" }}>اختر كيفية مشاركة بريدك مع التطبيق</p>
          </>}
        </div>

        {/* ── STEP: Intro ── */}
        {step === "intro" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Feature badges */}
            {[
              { icon: <IconLock size={22} color="#A78BFA"/>, title: "خصوصية تامة", desc: "لا تُشارك Apple كلمة مرورك مع أي جهة" },
              { icon: <IconDocument size={22} color="#A78BFA"/>, title: "إخفاء البريد", desc: "يمكنك إخفاء بريدك الحقيقي عبر بريد وهمي" },
              { icon: <IconElectric size={22} color="#A78BFA"/>, title: "دخول سريع", desc: "تسجيل دخول بلمسة واحدة في أي وقت" },
            ].map(f => (
              <div key={f.title} style={{
                padding: "13px 16px", borderRadius: 14,
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <span style={{ display:"inline-flex", flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#F1F5F9", marginBottom: 2 }}>{f.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}

            <div style={{ height: 6 }} />

            {/* Apple Sign In button - iconic black style */}
            <button
              onClick={handleSignIn}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16, border: "none",
                background: "#F1F5F9",
                color: "#07080F", fontSize: 15, fontWeight: 800,
                fontFamily: "inherit", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                boxShadow: "0 6px 24px rgba(241,245,249,.15)",
                transition: "all .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.background = "#F1F5F9")}
            >
              <IconApple size={28} color="currentColor"/>
              متابعة بمعرّف Apple
            </button>

            <button
              onClick={_back}
              style={{
                background: "none", border: "1.5px solid rgba(255,255,255,.1)",
                color: "rgba(255,255,255,.35)", fontSize: 14,
                fontFamily: "inherit", cursor: "pointer",
                padding: "14px 20px", borderRadius: 16,
                transition: "border-color .2s, color .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.color = "rgba(255,255,255,.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.35)"; }}
            >
              إلغاء
            </button>
          </div>
        )}

        {/* ── STEP: Loading ── */}
        {step === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "20px 0" }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: "rgba(255,255,255,.06)",
              border: "1.5px solid rgba(255,255,255,.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconLoader size={38} color="#F1F5F9"/>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.4)", textAlign: "center" }}>
              جاري التحقق من معرّف Apple...
            </p>
          </div>
        )}

        {/* ── STEP: Privacy choice ── */}
        {step === "privacy" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{
              padding: "16px", borderRadius: 16,
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.09)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginBottom: 4 }}>تم التحقق من</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#F1F5F9" }}>{mockAppleUser.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", direction: "ltr", marginTop: 3 }}>{mockAppleUser.realEmail}</div>
            </div>

            <div style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,.6)", marginTop: 4 }}>
              كيف تريد مشاركة بريدك مع درايف RENT؟
            </div>

            {[
              {
                id: false,
                label: "مشاركة بريدي الحقيقي",
                sub: mockAppleUser.realEmail,
                icon: <IconDocument size={22} color="#A78BFA"/>,
                border: "rgba(167,139,250,.3)",
                bg: "rgba(109,40,217,.08)",
              },
              {
                id: true,
                label: "إخفاء بريدي",
                sub: mockAppleUser.proxyEmail,
                icon: <IconShield size={22} color="#34D399"/>,
                border: "rgba(52,168,83,.3)",
                bg: "rgba(52,168,83,.06)",
              },
            ].map(opt => (
              <button
                key={String(opt.id)}
                onClick={() => { setHideEmail(opt.id); setStep("confirm"); }}
                style={{
                  width: "100%", padding: "15px 16px", borderRadius: 16, border: "none",
                  background: opt.bg, cursor: "pointer",
                  outline: `1.5px solid ${opt.border}`,
                  display: "flex", alignItems: "center", gap: 12,
                  textAlign: "right",
                  transition: "filter .2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.15)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
              >
                <span style={{ display:"inline-flex", flexShrink: 0 }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#F1F5F9", marginBottom: 3 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", direction: "ltr", textAlign: "left" }}>{opt.sub}</div>
                </div>
                <IconChevronRight size={15} color="rgba(255,255,255,.3)"/>
              </button>
            ))}
          </div>
        )}

        {/* ── STEP: Confirm ── */}
        {step === "confirm" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Summary card */}
            <div style={{
              padding: "18px 16px", borderRadius: 18,
              background: "rgba(255,255,255,.04)",
              border: "1.5px solid rgba(255,255,255,.1)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(255,255,255,.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>🍎</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#F1F5F9" }}>{mockAppleUser.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", direction: "ltr", textAlign: "left" }}>
                    {hideEmail ? mockAppleUser.proxyEmail : mockAppleUser.realEmail}
                  </div>
                </div>
              </div>
              <div style={{
                padding: "10px 12px", borderRadius: 10,
                background: hideEmail ? "rgba(52,168,83,.08)" : "rgba(109,40,217,.08)",
                border: `1px solid ${hideEmail ? "rgba(52,168,83,.25)" : "rgba(167,139,250,.2)"}`,
              }}>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", textAlign: "center" }}>
                  {hideEmail ? "سيتم إخفاء بريدك الحقيقي وإرسال بريد وهمي للتطبيق" : "ستُشارك بريدك الحقيقي مع درايف RENT"}
                </p>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={loading}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16, border: "none",
                background: loading ? "rgba(241,245,249,.2)" : "#F1F5F9",
                color: loading ? "rgba(7,8,15,.5)" : "#07080F",
                fontSize: 15, fontWeight: 800,
                fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 6px 24px rgba(241,245,249,.12)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "all .2s",
              }}
            >
              {loading ? <><IconLoader size={18} color="#07080F"/> جاري الربط...</> : "تأكيد وربط الحساب"}
            </button>

            <button
              onClick={() => setStep("privacy")}
              style={{
                background: "none", border: "none",
                color: "rgba(255,255,255,.28)", fontSize: 13,
                fontFamily: "inherit", cursor: "pointer",
                textDecoration: "underline", textUnderlineOffset: 3,
                textAlign: "center", padding: "4px 0",
              }}
            >
              تغيير خيار البريد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

