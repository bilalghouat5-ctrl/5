import { useMemo, useRef, useState } from "react";
import { CARS } from "../constants/data.js";
import { Stars } from "./ui/Stars.jsx";
import {
  IconBack,
  IconLike,
  IconPin,
  IconVerified,
  IconCar,
  IconStar,
  IconPhone,
  IconWhatsapp,
  IconMap,
  IconShareUpload,
  IconChevronRight,
  IconClock,
  IconCompactSeat,
  IconCompactFuel,
  IconCompactGearbox,
} from "./ui/AppIcons.jsx";

const fallbackPhones = ["0555 000 111", "0666 000 222", "0777 000 333"];
const agencyFallbackImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=88",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=88",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=88",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=88",
];

function getAgencyPhones(agency) {
  if (Array.isArray(agency?.phones) && agency.phones.length) return agency.phones.slice(0, 3);
  if (agency?.phone) return [agency.phone, ...fallbackPhones].slice(0, 3);
  return fallbackPhones;
}

function getAgencyAddress(agency) {
  return agency?.address || `شارع الاستقلال، وسط المدينة، ولاية ${agency?.wilaya || "الجزائر"}`;
}

function AgencyCarCard({ car, onOpenCar, liked, onLike, compact = false, index = 0 }) {
  return (
    <article
      className="btn-press"
      onClick={() => onOpenCar(car)}
      style={{
        flex: compact ? "0 0 78%" : "none",
        minWidth: compact ? 232 : undefined,
        display: compact ? "block" : "grid",
        gridTemplateColumns: compact ? undefined : "108px 1fr",
        background: "rgba(255,255,255,.042)",
        border: "1px solid rgba(255,255,255,.075)",
        borderRadius: 17,
        overflow: "hidden",
        cursor: "pointer",
        animation: `fadeUp .28s ease ${index * 0.04}s both`,
        boxShadow: "0 14px 32px rgba(0,0,0,.18)",
      }}
    >
      <div style={{
        height: compact ? 122 : "100%",
        minHeight: compact ? 122 : 112,
        position: "relative",
        overflow: "hidden",
        background: "#0D0E1A",
      }}>
        <img src={car.img} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.44),transparent 58%)" }} />
        {car.badge && (
          <span style={{
            position: "absolute", top: 9, right: 9,
            background: "rgba(0,0,0,.62)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            color: "#fff", padding: "3px 8px", borderRadius: 999,
            fontSize: 8.5, fontWeight: 900,
          }}>{car.badge}</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onLike?.(car.id); }}
          aria-label="إضافة للمفضلة"
          style={{
            position: "absolute", top: 8, left: 8,
            width: 32, height: 32, borderRadius: 12,
            border: "1px solid rgba(255,255,255,.12)",
            background: "rgba(10,10,18,.62)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
          }}
        >
          <IconLike size={16} active={liked?.has?.(car.id)} />
        </button>
      </div>
      <div style={{ padding: compact ? "10px 11px 12px" : "11px 12px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, color: "#fff", fontSize: 13.2, lineHeight: 1.25, fontWeight: 900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{car.name}</h3>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,.42)", fontSize: 10, display: "flex", alignItems: "center", gap: 4 }}>
              <IconPin size={10} color="rgba(255,255,255,.42)" /> {car.wilaya} · {car.year}
            </p>
          </div>
          {car.verified && <IconVerified size={15} color="#34D399" />}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 7 }}>
          <Stars r={car.rating} size={9} />
          <span style={{ fontSize: 9.5, color: "rgba(255,255,255,.36)" }}>{car.trips} رحلة</span>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
          {[
            [<IconCompactSeat size={12} color="#A78BFA" />, `${car.seats || 5} مقاعد`],
            [<IconCompactFuel size={12} color="#A78BFA" />, car.fuel || "بنزين"],
            [<IconCompactGearbox size={12} color="#A78BFA" />, car.trans || "أوتوماتيك"],
          ].map(([icon, label], i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              background: "rgba(255,255,255,.052)", border: "1px solid rgba(255,255,255,.07)",
              color: "rgba(255,255,255,.74)", borderRadius: 8, padding: "3px 6px", fontSize: 9, fontWeight: 800,
            }}>{icon}{label}</span>
          ))}
        </div>

        <div style={{ marginTop: 9, color: "#C084FC", fontWeight: 950, fontSize: 14.2 }}>
          {Number(car.price || 0).toLocaleString()} <span style={{ color: "rgba(255,255,255,.38)", fontSize: 9.5, fontWeight: 800 }}>دج / اليوم</span>
        </div>
      </div>
    </article>
  );
}

function InfoPill({ icon, label, value, wide = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 9,
      background: "rgba(255,255,255,.042)",
      border: "1px solid rgba(255,255,255,.075)",
      borderRadius: 14,
      padding: "9px 10px",
      minWidth: 0,
      gridColumn: wide ? "1 / -1" : undefined,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(167,139,250,.11)", border: "1px solid rgba(167,139,250,.18)",
        flexShrink: 0,
        color: "#A78BFA",
      }}>{icon}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ color: "rgba(255,255,255,.35)", fontSize: 9.8, fontWeight: 800 }}>{label}</div>
        <div style={{ color: "#fff", fontSize: 11.6, fontWeight: 850, marginTop: 1, lineHeight: 1.55, whiteSpace: wide ? "normal" : "nowrap", overflow: wide ? "visible" : "hidden", textOverflow: wide ? "clip" : "ellipsis" }}>{value}</div>
      </div>
    </div>
  );
}

export function AgencyDetail({ agency, onBack, onOpenCar, liked, onLike }) {
  const [imgOk, setImgOk] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [contactSheet, setContactSheet] = useState(false);
  const sheetStartY = useRef(0);
  const phones = getAgencyPhones(agency);
  const address = getAgencyAddress(agency);
  const gallery = useMemo(() => [...new Set([agency?.img, ...(agency?.images || []), ...agencyFallbackImages].filter(Boolean))].slice(0, 4), [agency]);
  const agencyCars = useMemo(() => CARS.filter(c => c.wilaya === agency.wilaya), [agency.wilaya]);
  const visibleCars = agencyCars.length ? agencyCars : CARS.slice(0, 4);
  const whatsappNumber = phones[0].replace(/\D/g, "").replace(/^0/, "213");

  const onGalleryScroll = (e) => {
    const el = e.currentTarget;
    const w = el.clientWidth || 1;
    setPhotoIndex(Math.min(Math.max(Math.round(el.scrollLeft / w), 0), gallery.length - 1));
  };

  const onSheetTouchStart = (e) => { sheetStartY.current = e.touches?.[0]?.clientY || 0; };
  const onSheetTouchEnd = (e) => {
    const y = e.changedTouches?.[0]?.clientY || 0;
    if (y - sheetStartY.current > 65) setContactSheet(false);
  };

  if (showAll) {
    return (
      <div style={{ animation: "fadeUp .28s ease both", paddingBottom: 112 }}>
        <div style={{
          position: "sticky", top: "var(--standalone-extra-top, 0px)", zIndex: 40,
          background: "rgba(7,8,15,.92)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          margin: "calc(clamp(14px,3vw,24px) * -1) calc(var(--app-padding, 14px) * -1) 14px",
          padding: "12px var(--app-padding, 14px)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <button onClick={() => setShowAll(false)} style={{
            width: 40, height: 40, borderRadius: 13, border: "1px solid rgba(255,255,255,.1)",
            background: "rgba(255,255,255,.055)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconBack size={20} color="#fff" />
          </button>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 18, color: "#fff", fontWeight: 950 }}>كل سيارات الوكالة</h2>
            <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,.4)", fontSize: 11 }}>{agency.name} · {visibleCars.length} سيارة</p>
          </div>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {visibleCars.map((car, i) => (
            <AgencyCarCard key={car.id} car={car} index={i} onOpenCar={onOpenCar} liked={liked} onLike={onLike} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeIn .32s ease", paddingBottom: 112 }}>
      <section style={{
        position: "relative",
        margin: "calc(clamp(14px,3vw,24px) * -1) calc(var(--app-padding, 14px) * -1) 14px",
        height: "clamp(250px, 34vh, 315px)",
        background: "#0D0E1A",
        overflow: "hidden",
      }}>
        {!imgOk && <div className="skel" style={{ height: "100%", borderRadius: 0 }} />}
        <div onScroll={onGalleryScroll} style={{ display: "flex", height: "100%", overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", direction: "ltr" }}>
          {gallery.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={agency.name}
              onLoad={() => index === 0 && setImgOk(true)}
              style={{ flex: "0 0 100%", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", scrollSnapAlign: "center", opacity: imgOk || index > 0 ? 1 : 0, transition: "opacity .32s" }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.38),rgba(0,0,0,.02) 48%,rgba(0,0,0,.22))", pointerEvents: "none" }} />
        <button onClick={onBack} aria-label="رجوع" style={topBackStyle}>
          <IconBack size={22} color="#fff" />
        </button>
        <div style={{ position: "absolute", top: "calc(max(16px, env(safe-area-inset-top)) + 10px)", left: 16, display: "flex", gap: 9 }}>
          <button aria-label="مشاركة" style={topActionStyle}>
            <IconShareUpload size={19} color="#fff" />
          </button>
          <button aria-label="مفضلة" style={topActionStyle}>
            <IconLike size={20} color="#fff" />
          </button>
        </div>
        <div style={photoCounterStyle}>{photoIndex + 1} من {gallery.length}</div>
      </section>

      <section style={{ padding: "0 2px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
              <h1 style={{ margin: 0, color: "#fff", fontSize: "clamp(19px,5.2vw,25px)", lineHeight: 1.22, fontWeight: 950, letterSpacing: "-.25px", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{agency.name}</h1>
              <IconVerified size={16} color="#34D399" />
            </div>
            <p style={{ margin: "7px 0 0", color: "rgba(255,255,255,.55)", fontSize: 11.5, display: "flex", alignItems: "center", gap: 5 }}>
              <IconPin size={12} color="#A78BFA" /> {agency.wilaya}
            </p>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0, color: "#fff", fontSize: 14.5, fontWeight: 950, background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.075)", borderRadius: 12, padding: "7px 9px" }}>
            {agency.rating}<IconStar size={15} color="#A78BFA" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 8, marginBottom: 14 }}>
          <InfoPill icon={<IconMap size={16} color="#A78BFA" />} label="العنوان" value={address} wide />
          <InfoPill icon={<IconCar size={16} color="#A78BFA" />} label="عدد السيارات" value={`${agency.cars || visibleCars.length} سيارة`} />
          <InfoPill icon={<IconClock size={16} color="#A78BFA" />} label="أوقات العمل" value="كل يوم · 24/7" />
        </div>

        <button onClick={() => setContactSheet(true)} type="button" style={contactButtonStyle}>
          <span style={contactButtonIconStyle}><IconPhone size={18} color="#fff" /></span>
          <span style={{ flex: 1, textAlign: "right" }}>
            <strong style={{ display: "block", fontSize: 13.2 }}>تواصل مع الوكالة</strong>
            <small style={{ display: "block", color: "rgba(255,255,255,.55)", fontSize: 10.5, marginTop: 2 }}>الأرقام وواتساب في نافذة واحدة</small>
          </span>
          <IconChevronRight size={16} color="rgba(255,255,255,.55)" />
        </button>

        <section style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
            <div>
              <h2 style={{ margin: 0, color: "#fff", fontSize: 16, fontWeight: 950 }}>سيارات الوكالة</h2>
              <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,.36)", fontSize: 10.8 }}>اسحب لمشاهدة سيارات أكثر</p>
            </div>
            <button onClick={() => setShowAll(true)} style={{
              border: "1px solid rgba(167,139,250,.25)", background: "rgba(124,58,237,.12)", color: "#C4B5FD",
              borderRadius: 999, padding: "7px 11px", display: "inline-flex", alignItems: "center", gap: 5,
              fontFamily: "inherit", fontSize: 11.5, fontWeight: 950,
            }}>
              الكل <IconChevronRight size={14} color="#C4B5FD" />
            </button>
          </div>
          <div className="momentum-scroll" style={{
            display: "flex", gap: 11, overflowX: "auto", padding: "2px 1px 14px",
            WebkitOverflowScrolling: "touch", scrollSnapType: "x proximity", scrollbarWidth: "none", touchAction: "pan-x",
            marginInline: "calc(var(--app-padding, 14px) * -1)", paddingInline: "var(--app-padding, 14px)",
          }}>
            {visibleCars.map((car, i) => (
              <div key={car.id} style={{ scrollSnapAlign: "start" }}>
                <AgencyCarCard car={car} compact index={i} onOpenCar={onOpenCar} liked={liked} onLike={onLike} />
              </div>
            ))}
          </div>
        </section>
      </section>

      {contactSheet && (
        <div style={sheetBackdropStyle} onClick={() => setContactSheet(false)}>
          <div style={contactSheetStyle} onClick={(e) => e.stopPropagation()} onTouchStart={onSheetTouchStart} onTouchEnd={onSheetTouchEnd}>
            <div style={sheetHandleStyle} />
            <h3 style={{ margin: 0, color: "#fff", fontSize: 17, fontWeight: 950 }}>تواصل مع الوكالة</h3>
            <p style={{ margin: "5px 0 14px", color: "rgba(255,255,255,.48)", fontSize: 12, fontWeight: 750 }}>اختر رقم الهاتف أو تواصل عبر واتساب.</p>
            <div style={{ display: "grid", gap: 8 }}>
              {phones.map((phone, i) => (
                <a key={i} href={`tel:${phone.replace(/\s/g, "")}`} style={sheetOptionStyle}>
                  <span style={sheetIconStyle}><IconPhone size={17} color="#fff" /></span>
                  <span style={{ flex: 1 }}><strong>رقم الهاتف {i + 1}</strong><small dir="ltr">{phone}</small></span>
                </a>
              ))}
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={{ ...sheetOptionStyle, background: "rgba(34,197,94,.12)", borderColor: "rgba(34,197,94,.22)" }}>
                <span style={{ ...sheetIconStyle, background: "linear-gradient(135deg,#22C55E,#16A34A)" }}><IconWhatsapp size={17} color="#fff" /></span>
                <span style={{ flex: 1 }}><strong>واتساب</strong><small>إرسال رسالة مباشرة للوكالة</small></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const topBackStyle = {
  position: "absolute",
  top: "calc(max(16px, env(safe-area-inset-top)) + 10px)",
  right: 16,
  width: 42,
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(9,10,18,.55)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};

const topActionStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(9,10,18,.62)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const photoCounterStyle = {
  position: "absolute",
  left: 16,
  bottom: 14,
  direction: "ltr",
  background: "rgba(18,18,20,.82)",
  color: "#fff",
  borderRadius: 10,
  padding: "6px 11px",
  fontSize: 12,
  fontWeight: 850,
  boxShadow: "0 8px 22px rgba(0,0,0,.28)",
};

const contactButtonStyle = {
  width: "100%",
  minHeight: 62,
  border: "1px solid rgba(255,255,255,.075)",
  borderRadius: 17,
  background: "rgba(255,255,255,.042)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: 11,
  padding: "10px 12px",
  fontFamily: "inherit",
};

const contactButtonIconStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  display: "grid",
  placeItems: "center",
  background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
  boxShadow: "0 12px 28px rgba(124,58,237,.22)",
  flexShrink: 0,
};

const sheetBackdropStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 260,
  display: "flex",
  alignItems: "flex-end",
  background: "rgba(0,0,0,.48)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  animation: "authBackdropIn .18s ease both",
};

const contactSheetStyle = {
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  borderRadius: "26px 26px 0 0",
  background: "rgba(14,14,18,.98)",
  border: "1px solid rgba(255,255,255,.09)",
  borderBottom: "none",
  boxShadow: "0 -24px 70px rgba(0,0,0,.55)",
  padding: "10px 16px max(18px, env(safe-area-inset-bottom))",
  animation: "authSheetUp .34s cubic-bezier(.22,1,.36,1) both",
};

const sheetHandleStyle = {
  width: 44,
  height: 5,
  borderRadius: 999,
  background: "rgba(255,255,255,.18)",
  margin: "0 auto 13px",
};

const sheetOptionStyle = {
  minHeight: 58,
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 16,
  background: "rgba(255,255,255,.052)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: 11,
  padding: "9px 11px",
  fontFamily: "inherit",
};

const sheetIconStyle = {
  width: 39,
  height: 39,
  borderRadius: 13,
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
  background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
};
