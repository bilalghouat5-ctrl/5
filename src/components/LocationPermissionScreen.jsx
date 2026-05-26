import { useState } from "react";
import { IconBack, IconSearchSm, IconPin, IconElectric, IconLock, IconGrid, IconLoader } from "./ui/AppIcons.jsx";
import { ALGERIA_WILAYAS } from "../constants/data.js";

const ALL_WILAYAS = ALGERIA_WILAYAS;

export function LocationPermissionScreen({ onGranted, onSkip, onManualSelect, status }) {
  const [showManual, setShowManual] = useState(false);
  const [search, setSearch] = useState("");
  const [requesting, setRequesting] = useState(false);

  const filtered = ALL_WILAYAS.filter(w => w.includes(search));

  function handleRequest() {
    setRequesting(true);
    onGranted();
  }

  if (showManual) {
    return (
      <div style={{
        position: "fixed", inset: 0, background: "#07080F",
        display: "flex", flexDirection: "column",
        animation: "fadeUp .3s ease",
        fontFamily: "'Cairo', sans-serif",
        zIndex: 900,
      }}>
        {/* Header */}
        <div style={{
          padding: "clamp(16px,4vw,24px) clamp(16px,4vw,24px) clamp(12px,3vw,18px)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <button onClick={() => setShowManual(false)} style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.1)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconBack size={15} color="rgba(255,255,255,.7)"/>
          </button>
          <h2 style={{ fontSize: "clamp(14px,4vw,18px)", fontWeight: 900, color: "#F1F5F9", flex: 1 }}>اختر ولايتك</h2>
        </div>

        {/* Search */}
        <div style={{ padding: "14px 20px 10px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,.06)",
            border: "1.5px solid rgba(255,255,255,.1)",
            borderRadius: 13, padding: "10px 14px",
          }}>
            <IconSearchSm size={15} color="rgba(255,255,255,.3)"/>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث عن ولايتك..."
              style={{
                background: "none", border: "none", outline: "none",
                color: "#F1F5F9", fontSize: 14, fontFamily: "inherit", flex: 1,
              }}
            />
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "0 20px 30px" }}>
          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "rgba(255,255,255,.3)", fontSize: 13, marginTop: 30 }}>
              لا توجد نتائج
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
            {filtered.map(w => (
              <button
                key={w}
                onClick={() => onManualSelect(w)}
                style={{
                  padding: "13px 12px", borderRadius: 13,
                  background: "rgba(255,255,255,.04)",
                  border: "1.5px solid rgba(255,255,255,.08)",
                  color: "#F1F5F9", fontSize: 13, fontWeight: 700,
                  fontFamily: "inherit", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "background .18s, border-color .18s",
                  textAlign: "right",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(124,58,237,.15)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                }}
              >
                <IconPin size={13} color="rgba(167,139,250,.6)"/>
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#07080F",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "32px 28px",
      fontFamily: "'Cairo', sans-serif",
      zIndex: 900,
      animation: "fadeUp .4s ease",
    }}>
      {/* Animated location icon */}
      <div style={{ position: "relative", marginBottom: 32 }}>
        {/* Pulse rings */}
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute",
            inset: -(i * 18),
            borderRadius: "50%",
            border: `1.5px solid rgba(124,58,237,${0.25 - i * 0.07})`,
            animation: `pulse${i} ${1.2 + i * 0.4}s ease-out infinite`,
          }}/>
        ))}
        <style>{`
          @keyframes pulse1{0%{transform:scale(.8);opacity:.8}100%{transform:scale(1.5);opacity:0}}
          @keyframes pulse2{0%{transform:scale(.7);opacity:.6}100%{transform:scale(1.8);opacity:0}}
          @keyframes pulse3{0%{transform:scale(.6);opacity:.4}100%{transform:scale(2.1);opacity:0}}
        `}</style>

        <div style={{
          width: 86, height: 86, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(109,40,217,.3), rgba(79,70,229,.2))",
          border: "2px solid rgba(124,58,237,.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", zIndex: 1,
        }}>
          <IconPin size={38} color="#A78BFA"/>
        </div>
      </div>

      {/* Text */}
      <div style={{ textAlign: "center", maxWidth: 340, marginBottom: 36 }}>
        <h1 style={{
          fontSize: 24, fontWeight: 900, color: "#F1F5F9",
          marginBottom: 10, letterSpacing: "-.5px", lineHeight: 1.3,
        }}>
          اكتشف سيارات<br/>
          <span style={{
            background: "linear-gradient(90deg,#A78BFA,#818CF8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>في ولايتك</span>
        </h1>
        <p style={{
          fontSize: 14, color: "rgba(255,255,255,.45)",
          lineHeight: 1.7,
        }}>
          شارك موقعك لنعرض لك السيارات والوكالات الأقرب إليك ونسهّل بحثك
        </p>
      </div>

      {/* Feature list */}
      <div style={{
        width: "100%", maxWidth: 360,
        display: "flex", flexDirection: "column", gap: 10,
        marginBottom: 32,
      }}>
        {[
          { icon: <IconPin size={18} color="#A78BFA"/>, text: "عرض السيارات المتاحة في ولايتك" },
          { icon: <IconElectric size={18} color="#A78BFA"/>, text: "نتائج بحث أسرع وأكثر دقة" },
          { icon: <IconLock size={18} color="#A78BFA"/>, text: "موقعك لا يُشارك مع أحد" },
        ].map(f => (
          <div key={f.icon} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 14px", borderRadius: 12,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.07)",
          }}>
            <span style={{ display:"inline-flex" }}>{f.icon}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)", fontWeight: 600 }}>{f.text}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 11 }}>

        {/* Grant location */}
        <button
          onClick={handleRequest}
          disabled={requesting || status === "requesting"}
          style={{
            width: "100%", padding: "15px 20px", borderRadius: 16, border: "none",
            background: (requesting || status === "requesting")
              ? "rgba(109,40,217,.4)"
              : "linear-gradient(135deg,#6D28D9,#4F46E5)",
            color: "#fff", fontSize: 15, fontWeight: 800,
            fontFamily: "inherit",
            cursor: (requesting || status === "requesting") ? "not-allowed" : "pointer",
            boxShadow: (requesting || status === "requesting") ? "none" : "0 6px 24px rgba(109,40,217,.45)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "all .2s",
          }}
        >
          {(requesting || status === "requesting") ? (
            <><IconLoader size={18} color="#fff"/> جاري تحديد موقعك...</>
          ) : (
            <>
              <IconPin size={17} color="#fff"/>
              تفعيل خدمة الموقع
            </>
          )}
        </button>

        {/* Manual select */}
        <button
          onClick={() => setShowManual(true)}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: 16,
            border: "1.5px solid rgba(167,139,250,.25)",
            background: "rgba(109,40,217,.07)",
            color: "#A78BFA", fontSize: 14, fontWeight: 700,
            fontFamily: "inherit", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
            transition: "background .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(109,40,217,.16)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(109,40,217,.07)")}
        >
          <IconGrid size={15} color="#A78BFA"/>
          اختر ولايتك يدوياً
        </button>

        {/* Skip */}
        <button
          onClick={onSkip}
          style={{
            background: "none", border: "none",
            color: "rgba(255,255,255,.25)", fontSize: 13,
            fontFamily: "inherit", cursor: "pointer",
            padding: "8px 0", textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          تخطي — عرض كل الولايات
        </button>
      </div>
    </div>
  );
}

