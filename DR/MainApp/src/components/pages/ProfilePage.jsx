import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "../../lib/router.jsx";
import {
  IconLanguage,
  IconSupport,
  IconLogin,
  IconChevronRight,
  IconDocument,
  IconCar,
  IconSpark,
  IconGlyph,
  IconBell,
  IconCard,
  IconWallet,
  IconCoupon,
  IconTransmission,
  IconSuccess,
  IconClose,
} from "../ui/AppIcons.jsx";
import { getCurrentUser, signOut, getAppLanguage, setAppLanguage } from "../../lib/supabase.js";

const VERSION = "6.7.19";

const LANGS = [
  { id: "ar", label: "العربية", short: "AR" },
  { id: "fr", label: "Français", short: "FR" },
  { id: "en", label: "English", short: "EN" },
  { id: "tz", label: "ⵜⴰⵎⴰⵣⵉⵖⵜ", short: "AZ" },
];

const copy = {
  ar: {
    moreTitle: "أكثر",
    edit: "عرض وتعديل الملف الشخصي",
    partnerTitle: "كن شريكنا",
    partnerText: "قريبًا ستتمكن من عرض سيارتك للكراء للمستخدمين الآخرين وتحقيق دخل إضافي عبر درايف Rent.",
    learn: "اعرف المزيد",
    account: "الحساب",
    language: "اللغة",
    support: "الدعم والمساعدة",
    why: "لماذا تختار درايف Rent",
    legal: "الشروط والقانونية",
    logout: "تسجيل الخروج",
    soon: "سيتم إضافة هذه الخاصية قريبًا",
    profile: "الملف الشخصي",
    joined: "انضم في مايو 2026",
    verifiedInfo: "معلومات موثقة",
    emailAddress: "البريد الإلكتروني",
    editProfile: "تعديل الملف الشخصي",
    changePhoto: "تغيير الصورة",
    photoHelp: "أضف صورة شخصية واضحة تساعد الوكالات على التعرف عليك عند بداية الرحلة.",
    about: "نبذة عنك",
    aboutHelp: "اكتب نبذة قصيرة عنك ولماذا أنت شخص موثوق. يمكنك إضافة خبراتك في السفر أو القيادة.",
    lives: "مكان السكن",
    works: "العمل",
    school: "الدراسة",
    languages: "اللغات",
    save: "حفظ",
    accountTitle: "الحساب",
    accountInfo: "معلومات الحساب",
    notificationSettings: "إعدادات الإشعارات",
    travelCredit: "رصيد الرحلات",
    creditValue: "0 دج",
    redeemGift: "استعمال بطاقة هدية",
    addCredit: "إضافة رصيد رحلات",
    transmission: "علبة السرعات المفضلة",
    closeAccount: "إغلاق حسابي",
    languageTitle: "اللغة",
    chooseLanguage: "اختر لغة التطبيق",
    accountInfoPage: "معلومات الحساب",
    notificationsPage: "إعدادات الإشعارات",
    transmissionPage: "علبة السرعات المفضلة",
  },
  fr: {
    moreTitle: "Plus",
    edit: "Voir et modifier le profil",
    partnerTitle: "Devenir partenaire",
    partnerText: "Bientôt, vous pourrez proposer votre voiture à la location à d’autres utilisateurs et générer un revenu avec Drive Rent.",
    learn: "En savoir plus",
    account: "Compte",
    language: "Langue",
    support: "Aide et support",
    why: "Pourquoi choisir Drive Rent",
    legal: "Mentions légales",
    logout: "Déconnexion",
    soon: "Cette fonctionnalité sera ajoutée prochainement",
    profile: "Profil",
    joined: "Inscrit en mai 2026",
    verifiedInfo: "Informations vérifiées",
    emailAddress: "Adresse e-mail",
    editProfile: "Modifier le profil",
    changePhoto: "Changer la photo",
    photoHelp: "Ajoutez une photo de profil claire afin que les agences puissent vous reconnaître au début d’un trajet.",
    about: "À propos",
    aboutHelp: "Parlez brièvement de vous et expliquez pourquoi vous êtes une personne fiable. Vous pouvez ajouter vos expériences de voyage ou de conduite.",
    lives: "Lieu de résidence",
    works: "Travail",
    school: "École",
    languages: "Langues",
    save: "Enregistrer",
    accountTitle: "Compte",
    accountInfo: "Informations du compte",
    notificationSettings: "Paramètres de notifications",
    travelCredit: "Crédit de trajet",
    creditValue: "0 DZD",
    redeemGift: "Utiliser une carte cadeau",
    addCredit: "Ajouter du crédit de trajet",
    transmission: "Transmission préférée",
    closeAccount: "Fermer mon compte",
    languageTitle: "Langue",
    chooseLanguage: "Choisissez la langue de l’application",
    accountInfoPage: "Informations du compte",
    notificationsPage: "Paramètres de notifications",
    transmissionPage: "Transmission préférée",
  },
  en: {
    moreTitle: "More",
    edit: "View and edit profile",
    partnerTitle: "Become a partner",
    partnerText: "Soon, you will be able to list your car for rent to other users and earn extra income with Drive Rent.",
    learn: "Learn more",
    account: "Account",
    language: "Language",
    support: "Get help",
    why: "Why choose Drive Rent",
    legal: "Legal",
    logout: "Log out",
    soon: "This feature will be added soon",
    profile: "Profile",
    joined: "Joined May 2026",
    verifiedInfo: "Verified info",
    emailAddress: "Email address",
    editProfile: "Edit profile",
    changePhoto: "Change photo",
    photoHelp: "Please add a profile photo that clearly shows your face. It helps agencies recognize you at the beginning of a trip.",
    about: "About",
    aboutHelp: "Tell agencies about yourself and why you are a responsible, trustworthy person. Share travel or driving experience.",
    lives: "Lives",
    works: "Works",
    school: "School",
    languages: "Languages",
    save: "Save",
    accountTitle: "Account",
    accountInfo: "Account info",
    notificationSettings: "Notification settings",
    travelCredit: "Travel credit",
    creditValue: "DZD 0",
    redeemGift: "Redeem gift card",
    addCredit: "Add travel credit",
    transmission: "Manual transmission",
    closeAccount: "Close my account",
    languageTitle: "Language",
    chooseLanguage: "Choose app language",
    accountInfoPage: "Account information",
    notificationsPage: "Notification settings",
    transmissionPage: "Preferred transmission",
  },
};

function PencilIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

function ArrowBack({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18 9 12l6-6" />
    </svg>
  );
}

function UserAvatar({ avatar, name, size = 72 }) {
  if (avatar) {
    return <img src={avatar} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", background: "rgba(255,255,255,.08)" }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: "rgba(255,255,255,.14)", display: "grid", placeItems: "center", color: "rgba(255,255,255,.58)", border: "1px solid rgba(255,255,255,.06)" }}>
      <IconGlyph name="profile" size={Math.round(size * .58)} color="currentColor" strokeWidth={1.65} />
    </div>
  );
}

function TopBar({ title, onBack, action, dir }) {
  return (
    <div dir={dir} style={{ height: 62, display: "grid", gridTemplateColumns: "56px 1fr 56px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.075)", margin: "0 -16px", padding: "0 14px", position: "sticky", top: 0, zIndex: 20, background: "rgba(5,5,10,.92)", backdropFilter: "blur(14px)" }}>
      <button type="button" onClick={onBack} style={{ width: 44, height: 44, border: "none", background: "transparent", color: "rgba(255,255,255,.9)", display: "grid", placeItems: "center", cursor: "pointer", transform: dir === "rtl" ? "scaleX(-1)" : "none" }}>
        <ArrowBack />
      </button>
      <div style={{ textAlign: "center", fontSize: 19, fontWeight: 950, letterSpacing: ".2px" }}>{title}</div>
      <div style={{ display: "grid", placeItems: "center" }}>{action}</div>
    </div>
  );
}

function MoreRow({ icon, title, sub, onClick, badge, danger, dir }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        gap: 16,
        border: "none",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        background: "transparent",
        padding: "10px 0",
        fontFamily: "inherit",
        textAlign: dir === "ltr" ? "left" : "right",
        cursor: "pointer",
        color: danger ? "#EF4444" : "#F7F7FA",
      }}
    >
      <span style={{ width: 30, height: 30, display: "grid", placeItems: "center", color: danger ? "#EF4444" : "rgba(255,255,255,.86)", flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15.2, lineHeight: 1.25, fontWeight: 520, letterSpacing: ".2px" }}>
          {title}
          {badge && <span style={{ fontSize: 11, fontWeight: 850, color: "#C4B5FD", background: "rgba(124,58,237,.24)", borderRadius: 4, padding: "2px 7px" }}>{badge}</span>}
        </span>
        {sub && <span style={{ display: "block", marginTop: 3, color: "rgba(255,255,255,.42)", fontSize: 10.8, fontWeight: 500, lineHeight: 1.45 }}>{sub}</span>}
      </span>
      {!danger && <span style={{ opacity: .48, transform: dir === "rtl" ? "scaleX(-1)" : "none" }}><IconChevronRight size={17} color="currentColor" /></span>}
    </button>
  );
}

function AccountLine({ title, right, onClick, accent, danger, dir }) {
  return (
    <button type="button" onClick={onClick} style={{ width: "100%", minHeight: 52, display: "flex", alignItems: "center", gap: 12, border: "none", borderBottom: "1px solid rgba(255,255,255,.075)", background: "transparent", color: danger ? "#EF4444" : accent ? "#8B5CF6" : "#F7F7FA", fontFamily: "inherit", padding: "0 0", cursor: onClick ? "pointer" : "default", textAlign: dir === "ltr" ? "left" : "right" }}>
      <span style={{ flex: 1, fontSize: 15.2, fontWeight: 520, lineHeight: 1.3 }}>{title}</span>
      {right && <span style={{ fontSize: 14.8, fontWeight: 600, color: "rgba(255,255,255,.9)", direction: "ltr" }}>{right}</span>}
      {onClick && !right && <span style={{ opacity: .8, transform: dir === "rtl" ? "scaleX(-1)" : "none" }}><IconChevronRight size={19} color="currentColor" /></span>}
    </button>
  );
}

export function ProfilePage({ onLogout }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = getCurrentUser();
  const [lang, setLang] = useState(getAppLanguage());
  const t = copy[lang] || copy.ar;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const name = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "مستخدم";
  const email = user?.email || "";
  const avatar = user?.user_metadata?.avatar_url || "";
  const [profileDraft, setProfileDraft] = useState(() => {
    try { return JSON.parse(localStorage.getItem("driverent_profile_draft") || "{}"); } catch { return {}; }
  });
  const shownAvatar = profileDraft.avatar || avatar;
  const setDraft = (key, value) => setProfileDraft((prev) => ({ ...prev, [key]: value }));
  function onPhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft("avatar", reader.result);
    reader.readAsDataURL(file);
  }
  function saveProfileDraft() {
    localStorage.setItem("driverent_profile_draft", JSON.stringify(profileDraft));
    navigator.vibrate?.(18);
    navigate("/profile/view");
  }

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

  const base = { padding: "0 16px 118px", animation: "fadeUp .28s ease", color: "#F7F7FA", minHeight: "calc(100vh - 86px)" };


  if (pathname === "/profile/language") {
    return (
      <div dir={dir} style={base}>
        <TopBar title={t.languageTitle || t.language} dir={dir} onBack={() => navigate("/profile")} action={null} />
        <section style={{ paddingTop: 28 }}>
          <p style={{ margin: "0 0 18px", color: "rgba(255,255,255,.48)", fontSize: 12.5, fontWeight: 650 }}>{t.chooseLanguage || t.language}</p>
          <div style={{ display: "grid", gap: 10 }}>
            {LANGS.map((l) => (
              <button key={l.id} onClick={() => changeLanguage(l.id)} style={{ minHeight: 54, borderRadius: 15, border: lang === l.id ? "1px solid rgba(167,139,250,.8)" : "1px solid rgba(255,255,255,.08)", background: lang === l.id ? "linear-gradient(135deg,rgba(124,58,237,.32),rgba(79,70,229,.22))" : "rgba(255,255,255,.04)", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px", cursor: "pointer" }}>
                <span>{l.label}</span><span style={{ color: lang === l.id ? "#C4B5FD" : "rgba(255,255,255,.35)", direction: "ltr" }}>{l.short}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (pathname === "/profile/account/info" || pathname === "/profile/account/notifications" || pathname === "/profile/account/transmission") {
    const title = pathname.endsWith("/info") ? (t.accountInfoPage || t.accountInfo) : pathname.endsWith("/notifications") ? (t.notificationsPage || t.notificationSettings) : (t.transmissionPage || t.transmission);
    return (
      <div dir={dir} style={base}>
        <TopBar title={title} dir={dir} onBack={() => navigate("/profile/account")} action={null} />
        <section style={{ paddingTop: 28, display: "grid", gap: 12 }}>
          <div style={{ borderRadius: 18, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", padding: 16 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 950 }}>{title}</h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,.48)", fontSize: 12.5, lineHeight: 1.7 }}>{t.soon}</p>
          </div>
        </section>
      </div>
    );
  }

  if (pathname === "/profile/view") {
    return (
      <div dir={dir} style={base}>
        <TopBar title={t.profile} dir={dir} onBack={() => navigate("/profile")} action={<button type="button" onClick={() => navigate("/profile/edit")} style={{ width: 44, height: 44, border: "none", background: "transparent", color: "rgba(255,255,255,.9)", display: "grid", placeItems: "center", cursor: "pointer" }}><PencilIcon /></button>} />
        <section style={{ textAlign: "center", padding: "28px 0 54px" }}>
          <UserAvatar avatar={shownAvatar} name={name} size={104} />
          <h1 style={{ margin: "22px 0 8px", fontSize: 30, fontWeight: 950, lineHeight: 1.05 }}>{name}</h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,.86)", fontSize: 16.4, fontWeight: 440 }}>{t.joined}</p>
        </section>
        <section>
          <div style={{ color: "rgba(255,255,255,.55)", fontSize: 12.5, fontWeight: 950, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 10 }}>{t.verifiedInfo}</div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.09)", borderBottom: "1px solid rgba(255,255,255,.09)", minHeight: 64, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ flex: 1, fontSize: 15.3, fontWeight: 440 }}>{t.emailAddress}</span>
            <span style={{ width: 38, height: 38, borderRadius: 999, border: "1px solid rgba(139,92,246,.85)", display: "grid", placeItems: "center", color: "#8B5CF6" }}><IconSuccess size={18} color="currentColor" /></span>
          </div>
        </section>
      </div>
    );
  }

  if (pathname === "/profile/edit") {
    return (
      <div dir={dir} style={base}>
        <TopBar title={name} dir={dir} onBack={() => navigate("/profile/view")} action={<button type="button" onClick={() => navigate("/profile/view")} style={{ width: 42, height: 42, border:"none", background:"transparent", color:"rgba(255,255,255,.85)", fontFamily:"inherit", fontSize:12, fontWeight:900 }}>{t.save}</button>} />
        <section style={{ paddingTop: 26 }}>
          <label style={{ width: "100%", minHeight: 62, border: "none", borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)", background: "transparent", color: "#F7F7FA", display: "flex", alignItems: "center", gap: 12, fontFamily: "inherit", cursor: "pointer", textAlign: dir === "ltr" ? "left" : "right" }}>
            <span style={{ flex: 1, fontSize: 13.4, fontWeight: 520 }}>{t.changePhoto}</span>
            <input type="file" accept="image/*" onChange={onPhotoChange} style={{ display: "none" }} />
            <span style={{ transform: dir === "rtl" ? "scaleX(-1)" : "none", opacity: .85 }}><IconChevronRight size={18} color="currentColor" /></span>
          </label>
          <p style={{ margin: "16px 0 28px", color: "rgba(255,255,255,.58)", fontSize: 11.8, fontWeight: 430, lineHeight: 1.65 }}>{t.photoHelp}</p>

          <label style={{ display: "block", color: "#F7F7FA", fontSize: 13.2, fontWeight: 600, marginBottom: 8 }}>{t.about}</label>
          <textarea value={profileDraft.about || ""} onChange={(e)=>setDraft("about", e.target.value)} style={{ width: "100%", height: 116, borderRadius: 11, border: "1px solid rgba(255,255,255,.18)", background: "rgba(0,0,0,.12)", color: "#fff", fontFamily: "inherit", fontSize: 12.5, padding: 12, outline: "none", resize: "none" }} />
          <p style={{ margin: "12px 0 26px", color: "rgba(255,255,255,.58)", fontSize: 11.5, fontWeight: 430, lineHeight: 1.55 }}>{t.aboutHelp}</p>

          {[["lives", t.lives], ["works", t.works], ["school", t.school], ["languages", t.languages]].map(([key, label]) => (
            <label key={key} style={{ display: "grid", gap: 6, borderTop: "1px solid rgba(255,255,255,.08)", padding: "13px 0" }}>
              <span style={{ color: "rgba(255,255,255,.86)", fontSize: 13.2, fontWeight: 520 }}>{label}</span>
              <input value={profileDraft[key] || ""} onChange={(e)=>setDraft(key, e.target.value)} style={{ width: "100%", border: "1px solid rgba(255,255,255,.10)", borderRadius: 12, background: "rgba(255,255,255,.045)", color: "#fff", fontFamily: "inherit", fontSize: 12.8, padding: "11px 12px", outline: "none" }} />
            </label>
          ))}
          <div style={{ height: 1, background: "rgba(255,255,255,.08)" }} />
        </section>
        <div style={{ position: "sticky", bottom: 96, paddingTop: 24, background: "linear-gradient(to top,#05050A 70%,rgba(5,5,10,0))" }}>
          <button type="button" onClick={saveProfileDraft} style={{ width: "100%", minHeight: 54, border: "none", borderRadius: 12, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 950, cursor: "pointer" }}>{t.save}</button>
        </div>
      </div>
    );
  }

  if (pathname === "/profile/account") {
    return (
      <div dir={dir} style={base}>
        <TopBar title={t.accountTitle} dir={dir} onBack={() => navigate("/profile")} action={null} />
        <section style={{ paddingTop: 38 }}>
          <AccountLine dir={dir} title={t.accountInfo} onClick={() => navigate("/profile/account/info")} />
          <AccountLine dir={dir} title={t.notificationSettings} onClick={() => navigate("/profile/account/notifications")} />
        </section>
        <section style={{ paddingTop: 30 }}>
          <AccountLine dir={dir} title={t.travelCredit} right={t.creditValue} />
          <AccountLine dir={dir} title={t.redeemGift} accent onClick={() => alert(t.soon)} />
          <AccountLine dir={dir} title={t.addCredit} accent onClick={() => alert(t.soon)} />
        </section>
        <section style={{ paddingTop: 30 }}>
          <AccountLine dir={dir} title={t.transmission} onClick={() => navigate("/profile/account/transmission")} />
        </section>
        <button type="button" onClick={handleLogout} style={{ width: "100%", minHeight: 58, border: "none", borderRadius: 12, marginTop: 54, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", fontFamily: "inherit", fontSize: 15.5, fontWeight: 950, cursor: "pointer" }}>{t.logout}</button>
        <button type="button" onClick={() => alert(t.soon)} style={{ width: "100%", border: "none", background: "transparent", color: "#EF4444", fontFamily: "inherit", fontSize: 15.2, fontWeight: 900, marginTop: 34, cursor: "pointer" }}>{t.closeAccount}</button>
      </div>
    );
  }

  return (
    <div dir={dir} className="compact-text" style={{ padding: "8px 18px 126px", animation: "fadeUp .28s ease", color: "#F7F7FA" }}>
      <section style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0 22px", borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 20 }}>
        <UserAvatar avatar={shownAvatar} name={name} size={66} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 18.5, fontWeight: 900, lineHeight: 1.12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</h1>
          <button type="button" onClick={() => navigate("/profile/view")} style={{ border: "none", background: "transparent", padding: "5px 0 0", color: "#8B5CF6", fontFamily: "inherit", fontSize: 13.8, fontWeight: 500, letterSpacing: ".5px", cursor: "pointer" }}>{t.edit}</button>
        </div>
      </section>

      <section style={{ margin: "0 0 28px", borderRadius: 4, overflow: "hidden", background: "rgba(255,255,255,.11)", border: "1px solid rgba(255,255,255,.06)", display: "grid", gridTemplateColumns: "1.18fr .82fr", minHeight: 152 }}>
        <div style={{ padding: "16px 15px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16.8, fontWeight: 900, lineHeight: 1.22 }}>{t.partnerTitle}</h2>
            <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,.78)", fontSize: 12.6, fontWeight: 430, lineHeight: 1.55 }}>{t.partnerText}</p>
          </div>
          <button type="button" onClick={() => alert(t.soon)} style={{ border: "none", borderRadius: 9, background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "#fff", padding: "10px 16px", fontFamily: "inherit", fontSize: 12.5, fontWeight: 850 }}>{t.learn}</button>
        </div>
        <div style={{ minHeight: 152, background: "linear-gradient(135deg,rgba(124,58,237,.18),rgba(255,255,255,.05))", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=84" alt="partner" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: .9 }} />
        </div>
      </section>

      <section>
        <MoreRow dir={dir} icon={<IconGlyph name="profile" size={22} color="currentColor" strokeWidth={1.8} />} title={t.account} onClick={() => navigate("/profile/account")} />
        <div style={{ height: 1, background: "rgba(255,255,255,.09)", margin: "14px 0 22px" }} />

        <MoreRow dir={dir} icon={<IconLanguage size={22} color="currentColor" strokeWidth={1.8} />} title={t.language} onClick={() => navigate("/profile/language")} />

        <MoreRow dir={dir} icon={<IconSpark size={22} color="currentColor" strokeWidth={1.8} />} title="Ask Drive Rent" badge="New" onClick={() => alert(t.soon)} />
        <MoreRow dir={dir} icon={<IconCar size={22} color="currentColor" strokeWidth={1.8} />} title={t.why} onClick={() => alert(t.soon)} />
        <MoreRow dir={dir} icon={<IconSupport size={22} color="currentColor" strokeWidth={1.8} />} title={t.support} onClick={() => alert(t.soon)} />
        <MoreRow dir={dir} icon={<IconDocument size={22} color="currentColor" strokeWidth={1.8} />} title={t.legal} onClick={() => alert(t.soon)} />
        <div style={{ height: 1, background: "rgba(255,255,255,.09)", margin: "18px 0 8px" }} />
        <MoreRow dir={dir} danger icon={<IconLogin size={22} color="currentColor" strokeWidth={1.8} />} title={t.logout} onClick={handleLogout} />
      </section>

      <div style={{ marginTop: 18, textAlign: "center", color: "rgba(255,255,255,.28)", fontSize: 11.2, fontWeight: 700 }}>
        Version {VERSION}
      </div>
    </div>
  );
}
