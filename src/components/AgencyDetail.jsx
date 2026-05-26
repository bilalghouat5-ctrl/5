import { useMemo, useState } from "react";
import { CARS } from "../constants/data.js";
import { Stars } from "./ui/Stars.jsx";
import {
  IconBack,
  IconLike,
  IconPin,
  IconVerified,
  IconCar,
  IconBuilding,
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

function getAgencyPhones(agency) {
  if (Array.isArray(agency?.phones) && agency.phones.length) return agency.phones.slice(0, 3);
  if (agency?.phone) return [agency.phone, ...fallbackPhones].slice(0, 3);
  return fallbackPhones;
}

function getAgencyAddress(agency) {
  return agency?.address || `شارع الاستقلال، ${agency?.wilaya || "الجزائر"}`;
}

function AgencyCarCard({ car, onOpenCar, liked, onLike, compact = false, index = 0 }) {
  return (
    <article
      className="btn-press"
      onClick={() => onOpenCar(car)}
      style={{
        flex: compact ? "0 0 78%" : "none",
        minWidth: compact ? 236 : undefined,
        display: compact ? "block" : "grid",
        gridTemplateColumns: compact ? undefined : "112px 1fr",
        background: "rgba(255,255,255,.045)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 18,
        overflow: "hidden",
        cursor: "pointer",
        animation: `fadeUp .32s ease ${index * 0.045}s both`,
        boxShadow: "0 18px 40px rgba(0,0,0,.22)",
      }}
    >
      <div style={{
        height: compact ? 132 : "100%",
        minHeight: compact ? 132 : 118,
        position: "relative",
        overflow: "hidden",
        background: "#0D0E1A",
      }}>
        <img src={car.img} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.48),transparent 55%)" }} />
        {car.badge && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(0,0,0,.66)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            color: "#fff", padding: "4px 9px", borderRadius: 999,
            fontSize: 9, fontWeight: 900,
          }}>{car.badge}</span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onLike?.(car.id); }}
          aria-label="إضافة للمفضلة"
          style={{
            position: "absolute", top: 9, left: 9,
            width: 34, height: 34, borderRadius: 12,
            border: "1px solid rgba(255,255,255,.12)",
            background: "rgba(10,10,18,.62)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
          }}
        >
          <IconLike size={17} active={liked?.has?.(car.id)} />
        </button>
      </div>
      <div style={{ padding: compact ? "12px 13px 13px" : "12px 13px", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, color: "#fff", fontSize: 14, lineHeight: 1.25, fontWeight: 900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{car.name}</h3>
            <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,.42)", fontSize: 10.5, display: "flex", alignItems: "center", gap: 4 }}>
              <IconPin size={10} color="rgba(255,255,255,.42)" /> {car.wilaya} · {car.year}
            </p>
          </div>
          {car.verified && <IconVerified size={16} color="#34D399" />}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
          <Stars r={car.rating} size={10} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,.36)" }}>{car.trips} رحلة</span>
        </div>

        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 10 }}>
          {[
            [<IconCompactSeat size={12} color="#A78BFA" />, `${car.seats || 5} مقاعد`],
            [<IconCompactFuel size={12} color="#A78BFA" />, car.fuel || "بنزين"],
            [<IconCompactGearbox size={12} color="#A78BFA" />, car.trans || "أوتوماتيك"],
          ].map(([icon, label], i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.075)",
              color: "rgba(255,255,255,.75)", borderRadius: 9, padding: "4px 7px", fontSize: 9.5, fontWeight: 800,
            }}>{icon}{label}</span>
          ))}
        </div>

        <div style={{ marginTop: 10, color: "#C084FC", fontWeight: 950, fontSize: 15 }}>
          {Number(car.price || 0).toLocaleString()} <span style={{ color: "rgba(255,255,255,.38)", fontSize: 10, fontWeight: 800 }}>دج / اليوم</span>
        </div>
      </div>
    </article>
  );
}

function InfoPill({ icon, label, value }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      background: "rgba(255,255,255,.045)",
      border: "1px solid rgba(255,255,255,.075)",
      borderRadius: 14,
      padding: "10px 11px",
      minWidth: 0,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(167,139,250,.11)", border: "1px solid rgba(167,139,250,.18)",
        flexShrink: 0,
      }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10, fontWeight: 800 }}>{label}</div>
        <div style={{ color: "#fff", fontSize: 12.5, fontWeight: 900, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
      </div>
    </div>
  );
}

export function AgencyDetail({ agency, onBack, onOpenCar, liked, onLike }) {
  const [imgOk, setImgOk] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const phones = getAgencyPhones(agency);
  const address = getAgencyAddress(agency);
  const agencyCars = useMemo(() => CARS.filter(c => c.wilaya === agency.wilaya), [agency.wilaya]);
  const visibleCars = agencyCars.length ? agencyCars : CARS.slice(0, 4);
  const whatsappNumber = phones[0].replace(/\D/g, "");

  if (showAll) {
    return (
      <div style={{ animation: "fadeUp .28s ease both", paddingBottom: 92 }}>
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
    <div style={{ animation: "fadeIn .35s ease", paddingBottom: 92 }}>
      <section style={{
        position: "relative",
        margin: "calc(clamp(14px,3vw,24px) * -1) calc(var(--app-padding, 14px) * -1) 18px",
        minHeight: 300,
        background: "#0D0E1A",
        overflow: "hidden",
      }}>
        {!imgOk && <div className="skel" style={{ height: 300, borderRadius: 0 }} />}
        <img
          src={agency.img}
          alt={agency.name}
          onLoad={() => setImgOk(true)}
          style={{ width: "100%", height: 300, objectFit: "cover", display: "block", opacity: imgOk ? 1 : 0, transition: "opacity .35s" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#07080F 0%,rgba(7,8,15,.72) 31%,rgba(7,8,15,.10) 72%)" }} />
        <button onClick={onBack} aria-label="رجوع" style={{
          position: "absolute", top: "calc(max(16px, env(safe-area-inset-top)) + 10px)", right: 16,
          width: 42, height: 42, borderRadius: 14, border: "1px solid rgba(255,255,255,.12)",
          background: "rgba(9,10,18,.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
        }}>
          <IconBack size={22} color="#fff" />
        </button>
        <div style={{ position: "absolute", top: "calc(max(16px, env(safe-area-inset-top)) + 10px)", left: 16, display: "flex", gap: 10 }}>
          <button aria-label="مشاركة" style={{
            width: 42, height: 42, borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", background: "rgba(9,10,18,.62)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconShareUpload size={19} color="#fff" />
          </button>
          <button aria-label="مفضلة" style={{
            width: 42, height: 42, borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", background: "rgba(9,10,18,.62)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconLike size={20} color="#fff" />
          </button>
        </div>
        {agency.badge && (
          <div style={{
            position: "absolute", right: 16, bottom: 18,
            display: "inline-flex", alignItems: "center", gap: 6,
            background: `linear-gradient(135deg,${agency.color || "#7C3AED"},#4F46E5)`,
            color: "#fff", borderRadius: 999, padding: "6px 12px", fontSize: 11, fontWeight: 950,
            boxShadow: `0 12px 32px ${(agency.color || "#7C3AED")}55`,
          }}>
            <IconVerified size={13} color="#fff" /> {agency.badge}
          </div>
        )}
      </section>

      <section style={{ padding: "0 2px" }}>
        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ margin: 0, color: "#fff", fontSize: "clamp(24px,6vw,34px)", lineHeight: 1.1, fontWeight: 950, letterSpacing: "-.6px" }}>{agency.name}</h1>
            <p style={{ margin: "9px 0 0", color: "rgba(255,255,255,.58)", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
              <IconVerified size={15} color="#34D399" /> وكالة موثقة · {agency.wilaya}
            </p>
          </div>
          <div style={{ textAlign: "left", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", color: "#fff", fontSize: 16, fontWeight: 950 }}>
              {agency.rating}<IconStar size={17} color="#A78BFA" />
            </div>
            <div style={{ marginTop: 2, color: "rgba(255,255,255,.35)", fontSize: 10 }}>تقييم الوكالة</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 9, marginBottom: 16 }}>
          <InfoPill icon={<IconMap size={17} color="#A78BFA" />} label="العنوان" value={address} />
          <InfoPill icon={<IconCar size={17} color="#A78BFA" />} label="عدد السيارات" value={`${agency.cars || visibleCars.length} سيارة`} />
          <InfoPill icon={<IconClock size={17} color="#A78BFA" />} label="أوقات العمل" value="كل يوم · 24/7" />
          <InfoPill icon={<IconStar size={17} color="#A78BFA" />} label="التقييم" value={`${agency.rating} / 5`} />
        </div>

        <div style={{
          background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.075)",
          borderRadius: 18, padding: 14, marginBottom: 18,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 11 }}>
            <h2 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 950 }}>تواصل مع الوكالة</h2>
            <IconPhone size={18} color="#A78BFA" />
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {phones.map((phone, i) => (
              <a key={i} href={`tel:${phone.replace(/\s/g, "")}`} style={{
                textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.07)",
                borderRadius: 13, padding: "10px 12px", color: "#fff", fontSize: 13, fontWeight: 900,
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}><IconPhone size={15} color="#A78BFA" /> رقم الهاتف {i + 1}</span>
                <span dir="ltr">{phone}</span>
              </a>
            ))}
          </div>
          <a
            href={`https://wa.me/213${whatsappNumber.replace(/^0/, "")}`}
            target="_blank"
            rel="noreferrer"
            style={{
              marginTop: 10,
              textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "linear-gradient(135deg,#22C55E,#16A34A)", color: "#fff",
              borderRadius: 14, padding: "12px 14px", fontSize: 13, fontWeight: 950,
              boxShadow: "0 14px 36px rgba(34,197,94,.22)",
            }}>
            <IconWhatsapp size={18} color="#fff" /> التواصل عبر واتساب
          </a>
        </div>

        <section style={{ marginTop: 6 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 11 }}>
            <div>
              <h2 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 950 }}>سيارات الوكالة</h2>
              <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,.36)", fontSize: 11 }}>اسحب لمشاهدة سيارات أكثر</p>
            </div>
            <button onClick={() => setShowAll(true)} style={{
              border: "1px solid rgba(167,139,250,.25)", background: "rgba(124,58,237,.12)", color: "#C4B5FD",
              borderRadius: 999, padding: "8px 12px", display: "inline-flex", alignItems: "center", gap: 5,
              fontFamily: "inherit", fontSize: 12, fontWeight: 950,
            }}>
              الكل <IconChevronRight size={14} color="#C4B5FD" />
            </button>
          </div>
          <div style={{
            display: "flex", gap: 12, overflowX: "auto", padding: "2px 1px 14px",
            WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", scrollbarWidth: "none",
            marginInline: "calc(var(--app-padding, 14px) * -1)", paddingInline: "var(--app-padding, 14px)",
          }}>
            {visibleCars.map((car, i) => (
              <div key={car.id} style={{ scrollSnapAlign: "start" }}>
                <AgencyCarCard car={car} compact index={i} onOpenCar={onOpenCar} liked={liked} onLike={onLike} />
              </div>
            ))}
          </div>
        </section>

        <div style={{
          marginTop: 8,
          background: "linear-gradient(135deg,rgba(124,58,237,.16),rgba(255,255,255,.035))",
          border: "1px solid rgba(167,139,250,.18)", borderRadius: 18,
          padding: 14,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(124,58,237,.16)", flexShrink: 0 }}>
            <IconBuilding size={22} color="#C4B5FD" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 950 }}>ملف وكالة موثقة</div>
            <div style={{ color: "rgba(255,255,255,.42)", fontSize: 11, marginTop: 3 }}>السيارات، العنوان، الأرقام، وواتساب في مكان واحد.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
