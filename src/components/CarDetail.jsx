import { useMemo, useRef, useState } from "react";
import { useNavigate } from "../lib/router.jsx";
import { saveBooking } from "../lib/bookings.js";
import { getCurrentUser } from "../lib/supabase.js";
import {
  IconBack,
  IconLike,
  IconShare,
  IconSeat,
  IconFuel,
  IconTransmission,
  IconStar,
} from "./ui/AppIcons.jsx";

const galleryFallback = [
  "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=88",
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=88",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=88",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=88",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=88",
];

function formatDzd(value) {
  return `${Number(value || 0).toLocaleString("fr-DZ")} دج`;
}

function SpecPill({ icon, children, wide = false }) {
  return (
    <div
      style={{
        gridColumn: wide ? "1 / -1" : undefined,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        minHeight: 56,
        background: "#1F2026",
        border: "1px solid rgba(255,255,255,.08)",
        color: "rgba(255,255,255,.92)",
        borderRadius: 4,
        padding: wide ? "0 18px" : "0 16px",
        fontSize: "clamp(15px,4vw,20px)",
        fontWeight: 600,
        letterSpacing: ".2px",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", color: "#fff", opacity: .95 }}>{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export function CarDetail({ car, onBack, liked, onLike }) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [photoIndex, setPhotoIndex] = useState(0);
  const sliderRef = useRef(null);

  const gallery = useMemo(() => {
    const imgs = [car?.img, ...(car?.images || []), ...galleryFallback].filter(Boolean);
    return [...new Set(imgs)].slice(0, 9);
  }, [car]);

  const modelLine = `${car.year || 2024} ${car.badge || "Premium"}`;
  const rating = Number(car.rating || 5).toFixed(1).replace(".", ",");
  const trips = car.trips || car.reviews || 0;
  const dailyPrice = car.price || 0;

  const onSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    const index = Math.round(el.scrollLeft / w);
    setPhotoIndex(Math.min(Math.max(index, 0), gallery.length - 1));
  };

  const shareCar = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: car.name, text: `درايف Rent - ${car.name}`, url });
      } else {
        await navigator.clipboard?.writeText(url);
        navigator.vibrate?.(20);
      }
    } catch (_) {}
  };

  const continueBooking = () => {
    saveBooking({
      carId: car.id,
      car: car.name,
      img: car.img,
      wilaya: car.wilaya,
      from: new Date().toISOString().slice(0, 10),
      to: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      days: 1,
      price: dailyPrice,
      dailyPrice,
      serviceFee: 0,
      pickupPlace: "الوكالة",
      driverName: user?.user_metadata?.full_name || user?.email?.split("@")[0] || "مستخدم درايف",
      driverPhone: user?.user_metadata?.phone || "غير محدد",
      rating: 0,
      status: "pending",
    });
    navigator.vibrate?.(35);
    navigate("/trips");
  };

  return (
    <main
      dir="ltr"
      style={{
        minHeight: "100vh",
        background: "#050506",
        color: "#fff",
        margin: 0,
        paddingBottom: "calc(112px + env(safe-area-inset-bottom))",
        animation: "fadeIn .26s ease",
      }}
    >
      <section
        style={{
          position: "relative",
          height: "min(64vh, 560px)",
          minHeight: 430,
          background: "#0A0A0B",
          overflow: "hidden",
        }}
      >
        <div
          ref={sliderRef}
          onScroll={onSliderScroll}
          style={{
            display: "flex",
            height: "100%",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {gallery.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              alt={car.name}
              loading={index === 0 ? "eager" : "lazy"}
              style={{
                flex: "0 0 100%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                scrollSnapAlign: "center",
                display: "block",
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.30) 0%, rgba(0,0,0,.08) 18%, transparent 36%, rgba(0,0,0,.12) 100%)",
          }}
        />

        <button
          onClick={onBack}
          aria-label="رجوع"
          style={{
            position: "absolute",
            top: "calc(18px + env(safe-area-inset-top))",
            left: 18,
            width: 48,
            height: 48,
            border: "none",
            background: "transparent",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <IconBack size={34} color="#fff" />
        </button>

        <div
          style={{
            position: "absolute",
            top: "calc(18px + env(safe-area-inset-top))",
            right: 18,
            display: "flex",
            gap: 12,
          }}
        >
          <button
            onClick={shareCar}
            aria-label="مشاركة"
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              border: "none",
              background: "rgba(8,8,10,.88)",
              color: "#fff",
              boxShadow: "0 10px 24px rgba(0,0,0,.35)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <IconShare size={28} color="#fff" />
          </button>
          <button
            onClick={onLike}
            aria-label="مفضلة"
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              border: "none",
              background: "rgba(8,8,10,.88)",
              color: "#fff",
              boxShadow: "0 10px 24px rgba(0,0,0,.35)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              animation: liked ? "heartPop .38s ease both" : undefined,
            }}
          >
            <IconLike size={30} active={liked} color="#fff" />
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            left: 24,
            bottom: 28,
            direction: "ltr",
            background: "rgba(18,18,20,.82)",
            color: "#fff",
            borderRadius: 6,
            padding: "8px 15px",
            fontSize: 20,
            fontWeight: 600,
            boxShadow: "0 8px 22px rgba(0,0,0,.32)",
          }}
        >
          {photoIndex + 1} of {gallery.length}
        </div>
      </section>

      <section
        dir="ltr"
        style={{
          padding: "clamp(28px,7vw,46px) clamp(24px,5vw,48px) 26px",
          background: "#050506",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(34px,8vw,54px)",
            lineHeight: 1.04,
            fontWeight: 900,
            letterSpacing: ".4px",
          }}
        >
          {car.name}
        </h1>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 9,
            color: "rgba(255,255,255,.82)",
            fontSize: "clamp(25px,6vw,38px)",
            lineHeight: 1.2,
            fontWeight: 500,
          }}
        >
          <span>{modelLine}</span>
          <span style={{ opacity: .28 }}>•</span>
          <span>{rating}</span>
          <IconStar size={34} color="#8B5CF6" filled />
          <span style={{ color: "rgba(255,255,255,.38)" }}>({trips} trips)</span>
        </div>

        {car.verified && (
          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 13,
              color: "rgba(255,255,255,.9)",
              fontSize: "clamp(24px,6vw,36px)",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                color: "#A78BFA",
                border: "2px solid #A78BFA",
                fontSize: 17,
                lineHeight: 1,
              }}
            >
              ★
            </span>
            <span>وكالة موثقة</span>
          </div>
        )}

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 16,
            alignItems: "center",
          }}
        >
          <SpecPill icon={<IconSeat size={28} color="#fff" />}>{car.seats || 5} seats</SpecPill>
          <SpecPill icon={<IconFuel size={28} color="#fff" />}>{car.fuel || "Essence"}</SpecPill>
          <SpecPill icon={<IconTransmission size={28} color="#fff" />}>{car.trans || "Automatic"}</SpecPill>
        </div>
      </section>

      <div
        dir="ltr"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 120,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "16px 24px max(18px, env(safe-area-inset-bottom))",
          background: "rgba(5,5,6,.96)",
          borderTop: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 22 }}>
            {formatDzd(dailyPrice)}<span style={{ fontSize: 15, opacity: .75 }}> / اليوم</span>
          </div>
          <div style={{ color: "rgba(255,255,255,.45)", fontWeight: 600, fontSize: 13 }}>
            السعر اليومي
          </div>
        </div>
        <button
          onClick={continueBooking}
          style={{
            width: "min(44vw, 230px)",
            minHeight: 58,
            border: "none",
            borderRadius: 12,
            background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: 20,
            fontWeight: 900,
            cursor: "pointer",
            boxShadow: "0 16px 32px rgba(124,58,237,.35)",
          }}
        >
          متابعة
        </button>
      </div>
    </main>
  );
}
