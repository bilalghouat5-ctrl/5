import { useState } from "react";
import { IconVerified, IconStar, IconCar, IconPin, IconBell, IconCard, IconLock, IconLanguage, IconSupport, IconDocument, IconLogin, IconUserPlus } from "../ui/AppIcons.jsx";
import { getCurrentUser, signOut } from "../../lib/supabase.js";

const MENU_ITEMS = [
  { icon: <IconUserPlus size={18} color="#A78BFA"/>, label: "معلوماتي الشخصية",  sub: "الاسم، الهاتف، البريد" },
  { icon: <IconBell size={18} color="#A78BFA"/>, label: "الإشعارات",          sub: "إدارة التنبيهات" },
  { icon: <IconCard size={18} color="#A78BFA"/>, label: "طرق الدفع",          sub: "البطاقات المحفوظة" },
  { icon: <IconLock size={18} color="#A78BFA"/>, label: "الأمان والخصوصية",   sub: "كلمة المرور، المصادقة" },
  { icon: <IconLanguage size={18} color="#A78BFA"/>, label: "اللغة",              sub: "العربية" },
  { icon: <IconStar size={18} color="#FBBF24"/>, label: "قيّم التطبيق",       sub: "شاركنا رأيك" },
  { icon: <IconSupport size={18} color="#A78BFA"/>, label: "الدعم والمساعدة",    sub: "تواصل معنا" },
  { icon: <IconDocument size={18} color="#A78BFA"/>, label: "الشروط والخصوصية",   sub: "سياسة الاستخدام" },
];

export function ProfilePage({ onLogout }) {
  const [editing, setEditing] = useState(false);
  const sbUser = getCurrentUser();

  const USER = {
    name:     sbUser?.user_metadata?.full_name || sbUser?.email?.split("@")[0] || "مستخدم",
    email:    sbUser?.email || "",
    phone:    sbUser?.user_metadata?.phone || "—",
    wilaya:   "الجزائر",
    avatar:   `https://i.pravatar.cc/150?u=${sbUser?.id || "guest"}`,
    joined:   "2025",
    trips:    0,
    rating:   5.0,
    verified: !!sbUser?.email_confirmed_at,
  };

  async function handleLogout() {
    await signOut();
    onLogout?.();
  }

  return (
    <div style={{ paddingBottom: 100, animation: "fadeUp .35s ease" }}>

      {/* Profile card */}
      <div style={{
        background: "linear-gradient(135deg,rgba(109,40,217,.18) 0%,rgba(79,70,229,.08) 100%)",
        border: "1px solid rgba(124,58,237,.2)",
        borderRadius: 24, padding: "24px 20px", marginBottom: 20, textAlign: "center",
      }}>
        <div style={{ position: "relative", display: "inline-block", marginBottom: 14 }}>
          <img src={USER.avatar} alt={USER.name} style={{
            width: 80, height: 80, borderRadius: "50%", objectFit: "cover",
            border: "3px solid rgba(124,58,237,.5)",
          }}/>
          {USER.verified && (
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 24, height: 24, borderRadius: "50%",
              background: "#07080F", border: "2px solid #07080F",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconVerified size={18} color="#34D399"/>
            </div>
          )}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 4 }}>{USER.name}</h2>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 18 }}>
          عضو منذ {USER.joined}
        </p>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 1, background: "rgba(255,255,255,.07)", borderRadius: 16,
          overflow: "hidden",
        }}>
          {[
            [USER.trips, "رحلة", <IconCar size={14} color="#A78BFA"/>],
            [USER.rating, "تقييم", <IconStar size={14} color="#FBBF24"/>],
            [USER.wilaya, "الولاية", <IconPin size={14} color="#A78BFA"/>],
          ].map(([val, lbl, icon], i) => (
            <div key={i} style={{ padding: "14px 8px", background: "rgba(255,255,255,.03)", textAlign: "center" }}>
              <div style={{ display:"flex", justifyContent:"center", marginBottom:4 }}>{icon}</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>

        <button onClick={() => setEditing(!editing)} style={{
          marginTop: 16, width: "100%", padding: "11px 0", borderRadius: 13, border: "none",
          background: editing
            ? "rgba(255,255,255,.06)"
            : "linear-gradient(135deg,#6D28D9,#4F46E5)",
          color: editing ? "rgba(255,255,255,.5)" : "#fff",
          fontFamily: "inherit", fontWeight: 700, fontSize: 13, cursor: "pointer",
        }}>
          {editing ? "إلغاء" : "تعديل الملف الشخصي"}
        </button>
      </div>

      {/* Contact info edit */}
      {editing && (
        <div style={{
          background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 18, padding: 16, marginBottom: 16,
          animation: "fadeUp .25s ease",
        }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 14 }}>معلومات الاتصال</div>
          {[
            ["الاسم الكامل", USER.name],
            ["البريد الإلكتروني", USER.email],
            ["رقم الهاتف", USER.phone],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginBottom: 5 }}>{lbl}</div>
              <input defaultValue={val} style={{
                width: "100%", background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)", borderRadius: 11,
                padding: "10px 13px", color: "#fff", fontSize: 13,
                fontFamily: "inherit", outline: "none", boxSizing: "border-box",
              }}/>
            </div>
          ))}
          <button style={{
            width: "100%", padding: "11px 0", borderRadius: 12, border: "none",
            background: "linear-gradient(135deg,#6D28D9,#4F46E5)",
            color: "#fff", fontFamily: "inherit", fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}>حفظ التغييرات</button>
        </div>
      )}

      {/* Menu */}
      <div style={{
        background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
        borderRadius: 20, overflow: "hidden",
      }}>
        {MENU_ITEMS.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "15px 16px",
            borderBottom: i < MENU_ITEMS.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
            cursor: "pointer", transition: "background .18s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.03)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 12, flexShrink: 0,
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.07)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
            }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>{item.sub}</div>
            </div>
            <span style={{ color: "rgba(255,255,255,.2)", fontSize: 16 }}>‹</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button onClick={handleLogout} style={{
        width: "100%", marginTop: 16, padding: "13px 0", borderRadius: 16,
        background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.18)",
        color: "#FCA5A5", fontFamily: "inherit", fontWeight: 800, fontSize: 14, cursor: "pointer",
      }}>
        <><IconLogin size={16} color="#FCA5A5"/> تسجيل الخروج</>
      </button>
    </div>
  );
}
