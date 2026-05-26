import { useEffect, useState } from "react";
import {
  IconLanguage,
  IconSupport,
  IconLogin,
  IconChevronRight,
  IconDocument,
  IconCar,
  IconSpark,
  IconGlyph,
} from "../ui/AppIcons.jsx";
import { getCurrentUser, signOut, getAppLanguage, setAppLanguage } from "../../lib/supabase.js";

const VERSION = "6.7";

const LANGS = [
  { id: "ar", label: "العربية", short: "AR" },
  { id: "fr", label: "Français", short: "FR" },
  { id: "en", label: "English", short: "EN" },
];

const copy = {
  ar: {
    edit: "عرض وتعديل الملف",
    partnerTitle: "كن شريكنا",
    partnerText: "قريبًا ستتمكن من عرض سيارتك للكراء للمستخدمين الآخرين وتحقيق دخل إضافي عبر درايف Rent.",
    learn: "اعرف المزيد",
    account: "الحساب",
    language: "اللغة",
    languageSub: "اختر لغة التطبيق",
    support: "الدعم والمساعدة",
    supportSub: "تواصل مع فريق درايف Rent",
    why: "لماذا تختار درايف Rent",
    legal: "الشروط والقانونية",
    logout: "تسجيل الخروج",
    logoutSub: "الخروج من حساب المستخدم",
    soon: "سيتم إضافة هذه الخاصية قريبًا",
  },
  fr: {
    edit: "Voir et modifier le profil",
    partnerTitle: "Devenez partenaire",
    partnerText: "Bientôt, vous pourrez louer votre voiture à d’autres utilisateurs et générer un revenu avec Drive Rent.",
    learn: "En savoir plus",
    account: "Compte",
    language: "Langue",
    languageSub: "Choisir la langue de l’application",
    support: "Aide et support",
    supportSub: "Contacter l’équipe Drive Rent",
    why: "Pourquoi choisir Drive Rent",
    legal: "Mentions légales",
    logout: "Déconnexion",
    logoutSub: "Quitter le compte utilisateur",
    soon: "Cette fonctionnalité sera ajoutée prochainement",
  },
  en: {
    edit: "View and edit profile",
    partnerTitle: "Become a partner",
    partnerText: "Soon, you will be able to list your car for rent to other users and earn extra income with Drive Rent.",
    learn: "Learn more",
    account: "Account",
    language: "Language",
    languageSub: "Choose the app language",
    support: "Support and help",
    supportSub: "Contact the Drive Rent team",
    why: "Why choose Drive Rent",
    legal: "Legal",
    logout: "Sign out",
    logoutSub: "Sign out of your account",
    soon: "This feature will be added soon",
  },
};

function UserAvatar({ avatar, name }) {
  if (avatar) {
    return <img src={avatar} alt={name} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", background: "rgba(255,255,255,.08)" }} />;
  }
  return (
    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,.14)", display: "grid", placeItems: "center", color: "rgba(255,255,255,.58)", border: "1px solid rgba(255,255,255,.06)" }}>
      <IconGlyph name="profile" size={42} color="currentColor" strokeWidth={1.7} />
    </div>
  );
}

function MenuRow({ icon, title, sub, onClick, badge, danger, dir }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 64,
        display: "flex",
        alignItems: "center",
        gap: 18,
        border: "none",
        background: "transparent",
        padding: "13px 2px",
        fontFamily: "inherit",
        textAlign: dir === "ltr" ? "left" : "right",
        cursor: "pointer",
        color: danger ? "#FCA5A5" : "#fff",
      }}
    >
      <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", color: danger ? "#FCA5A5" : "rgba(255,255,255,.82)", flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 18, lineHeight: 1.25, fontWeight: 750, letterSpacing: ".1px" }}>
          {title}
          {badge && <span style={{ fontSize: 12, fontWeight: 900, color: "#C4B5FD", background: "rgba(124,58,237,.22)", border: "1px solid rgba(167,139,250,.18)", borderRadius: 6, padding: "3px 8px" }}>{badge}</span>}
        </span>
        {sub && <span style={{ display: "block", marginTop: 4, color: "rgba(255,255,255,.36)", fontSize: 12, fontWeight: 650, lineHeight: 1.5 }}>{sub}</span>}
      </span>
      {!danger && <IconChevronRight size={18} color="rgba(255,255,255,.30)" />}
    </button>
  );
}

export function ProfilePage({ onLogout }) {
  const user = getCurrentUser();
  const [lang, setLang] = useState(getAppLanguage());
  const t = copy[lang] || copy.ar;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Ghouat";
  const email = user?.email || "demo@driverent.dz";
  const avatar = user?.user_metadata?.avatar_url || "";

  useEffect(() => {
    const sync = () => setLang(getAppLanguage());
    window.addEventListener("driverent-language-change", sync);
    return () => window.removeEventListener("driverent-language-change", sync);
  }, []);

  async function handleLogout() {
    await signOut();
    window.dispatchEvent(new Event("driverent-auth-change"));
    onLogout?.();
  }

  function changeLanguage(id) {
    setLang(id);
    setAppLanguage(id);
    navigator.vibrate?.(12);
  }

  return (
    <div dir={dir} style={{ padding: "10px 2px 118px", animation: "fadeUp .35s ease", color: "#fff" }}>
      <section style={{ display: "flex", alignItems: "center", gap: 17, padding: "8px 16px 18px", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 18 }}>
        <UserAvatar avatar={avatar} name={name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 21, fontWeight: 950, lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</h1>
          <button type="button" onClick={() => alert(t.soon)} style={{ border: "none", background: "transparent", padding: "7px 0 0", color: "#8B5CF6", fontFamily: "inherit", fontSize: 16, fontWeight: 700, letterSpacing: ".7px", cursor: "pointer" }}>{t.edit}</button>
        </div>
      </section>

      <section style={{ margin: "0 16px 26px", borderRadius: 4, overflow: "hidden", background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.08)", display: "grid", gridTemplateColumns: "1.1fr .9fr", minHeight: 190 }}>
        <div style={{ padding: "22px 18px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 950, lineHeight: 1.3 }}>{t.partnerTitle}</h2>
            <p style={{ margin: "12px 0 0", color: "rgba(255,255,255,.78)", fontSize: 14.2, fontWeight: 650, lineHeight: 1.75 }}>{t.partnerText}</p>
          </div>
          <button type="button" onClick={() => alert(t.soon)} style={{ border: "none", borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", padding: "12px 18px", fontFamily: "inherit", fontSize: 13.5, fontWeight: 950, boxShadow: "0 12px 28px rgba(124,58,237,.25)" }}>{t.learn}</button>
        </div>
        <div style={{ minHeight: 190, background: "linear-gradient(135deg,rgba(124,58,237,.18),rgba(255,255,255,.05))", position: "relative", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=84" alt="partner" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: .88 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(0,0,0,.28))" }} />
        </div>
      </section>

      <section style={{ padding: "0 18px" }}>
        <MenuRow dir={dir} icon={<IconGlyph name="profile" size={27} color="currentColor" strokeWidth={1.8} />} title={t.account} onClick={() => alert(t.soon)} />
        <div style={{ height: 1, background: "rgba(255,255,255,.09)", margin: "12px 0 20px" }} />

        <div style={{ padding: "4px 0 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 12 }}>
            <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", color: "rgba(255,255,255,.82)" }}><IconLanguage size={27} color="currentColor" strokeWidth={1.8} /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 750 }}>{t.language}</div>
              <div style={{ color: "rgba(255,255,255,.36)", fontSize: 12, marginTop: 3 }}>{t.languageSub}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, paddingInlineStart: 52 }}>
            {LANGS.map((l) => (
              <button key={l.id} onClick={() => changeLanguage(l.id)} style={{ minHeight: 38, borderRadius: 10, border: lang === l.id ? "1px solid rgba(167,139,250,.75)" : "1px solid rgba(255,255,255,.08)", background: lang === l.id ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.045)", color: lang === l.id ? "#fff" : "rgba(255,255,255,.58)", fontFamily: "inherit", fontSize: 12, fontWeight: 950 }}>{l.short}</button>
            ))}
          </div>
        </div>

        <MenuRow dir={dir} icon={<IconSpark size={27} color="currentColor" strokeWidth={1.8} />} title="Ask Drive Rent" badge="New" onClick={() => alert(t.soon)} />
        <MenuRow dir={dir} icon={<IconCar size={27} color="currentColor" strokeWidth={1.8} />} title={t.why} onClick={() => alert(t.soon)} />
        <MenuRow dir={dir} icon={<IconSupport size={27} color="currentColor" strokeWidth={1.8} />} title={t.support} sub={t.supportSub} onClick={() => alert(t.soon)} />
        <MenuRow dir={dir} icon={<IconDocument size={27} color="currentColor" strokeWidth={1.8} />} title={t.legal} onClick={() => alert(t.soon)} />
        <div style={{ height: 1, background: "rgba(255,255,255,.09)", margin: "18px 0 2px" }} />
        <MenuRow dir={dir} danger icon={<IconLogin size={27} color="currentColor" strokeWidth={1.8} />} title={t.logout} sub={t.logoutSub} onClick={handleLogout} />
      </section>

      <div style={{ marginTop: 18, textAlign: "center", color: "rgba(255,255,255,.26)", fontSize: 11.5, fontWeight: 800 }}>
        Version {VERSION}
      </div>
    </div>
  );
}
