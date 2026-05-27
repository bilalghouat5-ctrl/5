import { useMemo } from "react";
import { useAgencies, useCarsByType } from "../../hooks/useSupabaseData.js";
import { CarCard } from "../CarCard.jsx";
import { Stars } from "../ui/Stars.jsx";
import { IconBack, IconLike, IconPin, IconVerified, IconGrid } from "../ui/AppIcons.jsx";

const sectionMeta = {
  agencies: {
    title: "كل الوكالات",
    sub: "استعرض جميع الوكالات المعتمدة في الجزائر",
    accent: "#A78BFA",
    kind: "agencies",
  },
  wedding: {
    title: "كل سيارات الزفاف",
    sub: "سيارات فاخرة للمناسبات والأعراس",
    accent: "#F472B6",
    kind: "cars",
    type: "wedding",
  },
  luxury: {
    title: "كل السيارات الفاخرة",
    sub: "اختيارات راقية لتجربة قيادة مميزة",
    accent: "#EF4444",
    kind: "cars",
    type: "luxury",
  },
  "4x4": {
    title: "كل سيارات رباعية الدفع 4X4",
    sub: "تمتع بتجربة قيادتها على رمال الصحراء الكبرى",
    accent: "#C47A2C",
    kind: "cars",
    type: "4x4",
  },
  van: {
    title: "كل سيارات الفان",
    sub: "سيارات عملية للعائلات والرحلات الجماعية",
    accent: "#22C55E",
    kind: "cars",
    type: "van",
  },
  electric: {
    title: "كل السيارات الكهربائية",
    sub: "تنقل هادئ واقتصادي بتقنيات حديثة",
    accent: "#38BDF8",
    kind: "cars",
    type: "electric",
  },
};

function normalizeCarForCard(car) {
  return {
    year: 2024,
    seats: 5,
    fuel: "بنزين",
    trans: "أوتوماتيك",
    trips: 0,
    reviews: 0,
    badge: car?.badge || "فاخرة",
    verified: true,
    freeCancel: true,
    type: "sedan",
    ...car,
  };
}

function AgencyCard({ agency, onOpen, index }) {
  return (
    <button
      onClick={() => onOpen(agency)}
      className="btn-press"
      style={{
        textAlign: "start",
        background: "rgba(255,255,255,.035)",
        border: "1px solid rgba(255,255,255,.085)",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        fontFamily: "inherit",
        animation: `cardIn .42s ease ${Math.min(index, 8) * .045}s both`,
        boxShadow: index === 0 ? `0 14px 40px ${agency.color || "#7C3AED"}20` : "none",
      }}
    >
      <div style={{ position: "relative", height: "clamp(118px,30vw,158px)", background: `${agency.color || "#7C3AED"}18`, overflow: "hidden" }}>
        {agency.img ? (
          <img src={agency.img} alt={agency.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,${agency.color || "#7C3AED"}33,${agency.color || "#7C3AED"}11)` }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.78),transparent 60%)" }} />
        {agency.badge ? (
          <div style={{ position: "absolute", top: 10, right: 10, background: agency.color || "#7C3AED", color: "#fff", fontSize: 10, fontWeight: 900, padding: "3px 9px", borderRadius: 20 }}>{agency.badge}</div>
        ) : null}
        <div style={{ position: "absolute", bottom: 10, right: 12, left: 12, display: "flex", alignItems: "center", gap: 7 }}>
          <IconVerified size={15} color="#34D399" />
          <span style={{ color: "#fff", fontSize: "clamp(13px,3.4vw,16px)", fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{agency.name}</span>
        </div>
      </div>
      <div style={{ padding: "clamp(12px,3vw,16px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.45)", fontSize: 12 }}>
            <IconPin size={12} color="rgba(255,255,255,.45)" />
            {agency.wilaya}
          </span>
          <Stars r={agency.rating} size={11} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 10 }}>
          <span style={{ color: agency.color || "#A78BFA", fontWeight: 900, fontSize: 13 }}>{agency.cars} سيارة متاحة</span>
          <IconLike size={15} color="rgba(255,255,255,.46)" />
        </div>
      </div>
    </button>
  );
}

export function AllSectionPage({ section = "agencies", onBack, onOpenAgency, onOpenCar, liked, onLike, userWilaya }) {
  const meta = sectionMeta[section] || sectionMeta.agencies;
  const agencyState = useAgencies();
  const carState = useCarsByType(meta.type || "month");

  const list = useMemo(() => {
    const src = meta.kind === "agencies" ? agencyState.agencies : carState.cars;
    const normalized = meta.kind === "cars" ? src.map(normalizeCarForCard) : src;
    if (!userWilaya) return normalized;
    return [
      ...normalized.filter(item => item.wilaya === userWilaya),
      ...normalized.filter(item => item.wilaya !== userWilaya),
    ];
  }, [meta.kind, agencyState.agencies, carState.cars, userWilaya]);

  const loading = meta.kind === "agencies" ? agencyState.loading : carState.loading;

  return (
    <div style={{ animation: "pageSlideIn .42s cubic-bezier(.22,1,.36,1) both", paddingBottom: "calc(var(--bottom-nav-h, 62px) + 26px)" }}>
      <div style={{
        position: "sticky",
        top: "calc(var(--top-nav-total, var(--nav-height,58px)) - 1px)",
        zIndex: 40,
        background: "linear-gradient(180deg,rgba(7,8,15,.98),rgba(7,8,15,.86))",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        margin: "-1px calc(var(--app-padding, 14px) * -1) 18px",
        padding: "14px var(--app-padding, 14px) 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} className="btn-press" style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.06)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconBack size={17} color="rgba(255,255,255,.76)" />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: "clamp(20px,5.5vw,30px)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1.15 }}>{meta.title}</h2>
            <p style={{ color: "rgba(255,255,255,.42)", fontSize: "clamp(11px,2.8vw,13px)", marginTop: 4 }}>{meta.sub}</p>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: `${meta.accent}18`, border: `1px solid ${meta.accent}3d`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconGrid size={18} color={meta.accent} />
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "var(--grid-cols, repeat(1,1fr))", gap: "clamp(12px,3vw,18px)" }}>
          {[0,1,2,3,4,5].map(i => <div key={i} className="skel" style={{ height: 238, borderRadius: 20 }} />)}
        </div>
      ) : meta.kind === "agencies" ? (
        <div style={{ display: "grid", gridTemplateColumns: "var(--grid-cols, repeat(1,1fr))", gap: "clamp(12px,3vw,18px)" }}>
          {list.map((agency, i) => <AgencyCard key={agency.id} agency={agency} index={i} onOpen={onOpenAgency} />)}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "var(--grid-cols, repeat(1,1fr))", gap: "clamp(12px,3vw,18px)" }}>
          {list.map((car, i) => (
            <CarCard key={`${section}-${car.id}-${i}`} car={car} idx={i} liked={liked?.has(car.id)} onLike={() => onLike?.(car.id)} onClick={() => onOpenCar(car)} />
          ))}
        </div>
      )}
    </div>
  );
}
