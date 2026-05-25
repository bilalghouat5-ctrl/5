import { useEffect, useRef, useState } from "react";
import ROAD_IMG from "../assets/roadImg.js";
import { IconClose, IconLogin, IconUserPlus, IconApple, IconGoogle } from "./ui/AppIcons.jsx";

export function GuestAuthSheet({ onClose, onLogin, onRegister }) {
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef();

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function dismiss() {
    setVisible(false);
    setTimeout(onClose, 380);
  }

  function goLogin() {
    setVisible(false);
    setTimeout(onLogin, 340);
  }

  function goRegister() {
    setVisible(false);
    setTimeout(onRegister, 340);
  }

  function handleBackdrop(e) {
    if (e.target === backdropRef.current) dismiss();
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        background: visible ? "rgba(4,4,12,.72)" : "rgba(4,4,12,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(12px)" : "blur(0px)",
        transition: "background .35s ease, backdrop-filter .35s ease, -webkit-backdrop-filter .35s ease",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "clamp(320px,98vw,520px)",
          margin: "0 auto",
          borderRadius: "28px 28px 0 0",
          overflow: "hidden",
          background: "#0A0B17",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: visible
            ? "transform .48s cubic-bezier(.22,1.6,.36,1)"
            : "transform .34s cubic-bezier(.4,0,.6,1)",
          boxShadow: "0 -24px 80px rgba(0,0,0,.7)",
        }}
      >
        {/* ── Road hero image (user-uploaded) ── */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img
            src={ROAD_IMG}
            alt="road"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
              display: "block",
              transform: visible ? "scale(1)" : "scale(1.08)",
              transition: "transform .6s cubic-bezier(.22,1,.36,1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,11,23,0) 15%, rgba(10,11,23,.98) 100%)",
            }}
          />

          {/* close pill */}
          <button
            onClick={dismiss}
            style={{
              position: "absolute", top: 14, right: 14,
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(0,0,0,.4)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <IconClose size={14} color="rgba(255,255,255,.8)"/>
          </button>

          {/* tagline on image */}
          <div style={{
            position: "absolute", bottom: 22, left: 0, right: 0,
            textAlign: "center", padding: "0 24px",
          }}>
            <h2 style={{
              fontSize: 28, fontWeight: 900, color: "#fff",
              letterSpacing: "-1px", lineHeight: 1.2,
              textShadow: "0 2px 20px rgba(0,0,0,.7)",
            }}>ابحث عن رحلتك</h2>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "22px 24px 32px", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Login */}
            <button
              onClick={goLogin}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16,
                border: "none", background: "linear-gradient(135deg,#6D28D9,#4F46E5)",
                color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "inherit",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10,
                boxShadow: "0 6px 24px rgba(109,40,217,.45)",
                transition: "filter .2s, transform .15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.12)")}
              onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <IconLogin size={18} color="#fff"/>
              تسجيل الدخول
            </button>

            {/* Register */}
            <button
              onClick={goRegister}
              style={{
                width: "100%", padding: "15px 20px", borderRadius: 16,
                border: "1.5px solid rgba(167,139,250,.35)",
                background: "rgba(109,40,217,.1)",
                color: "#A78BFA", fontSize: 15, fontWeight: 800, fontFamily: "inherit",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10,
                transition: "background .2s, transform .15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(109,40,217,.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(109,40,217,.1)")}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <IconUserPlus size={18} color="#A78BFA"/>
              افتح حساباً جديداً
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 16px" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.25)", flexShrink: 0 }}>أو تصفح كضيف</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }}/>
          </div>

          <button
            onClick={dismiss}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,.35)", fontSize: 13,
              fontFamily: "inherit", cursor: "pointer",
              textDecoration: "underline", textUnderlineOffset: 3, padding: 0,
            }}
          >
            متابعة بدون حساب
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppleBtn({ label = "المتابعة عبر Apple", onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "14px 20px", borderRadius: 16,
        border: "1.5px solid rgba(255,255,255,.2)",
        background: "rgba(255,255,255,.08)",
        color: "#F1F5F9", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
        cursor: "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10,
        transition: "background .2s, transform .15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
      onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      <IconApple size={17} color="#F1F5F9"/>
      {label}
    </button>
  );
}

export function GoogleBtn({ label = "المتابعة عبر Google", onClick }) {
  return (
    <button
      style={{
        width: "100%", padding: "14px 20px", borderRadius: 16,
        border: "1.5px solid rgba(255,255,255,.13)",
        background: "rgba(255,255,255,.05)",
        color: "#F1F5F9", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
        cursor: "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10,
        transition: "background .2s, transform .15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.1)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.05)")}
      onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
      onClick={onClick}
    >
      <IconGoogle size={19}/>
      {label}
    </button>
  );
}
