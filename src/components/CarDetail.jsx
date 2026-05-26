import { useMemo, useRef, useState } from "react";
import { useNavigate } from "../lib/router.jsx";
import { saveBooking } from "../lib/bookings.js";
import { getCurrentUser } from "../lib/supabase.js";
import { AGENCIES } from "../constants/data.js";
import {
  IconBack,
  IconLike,
  IconShare,
  IconSeat,
  IconFuel,
  IconTransmission,
  IconStar,
  IconCalendar,
  IconPin,
  IconRoad,
  IconPhone,
  IconVerified,
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

function todayPlus(days) {
  return new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
}

function formatArabicDate(value) {
  try {
    return new Intl.DateTimeFormat("ar-DZ", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(new Date(value));
  } catch (_) {
    return value;
  }
}

function niceFuel(fuel) {
  const f = String(fuel || "بنزين").toLowerCase();
  if (f.includes("كهرب") || f.includes("electric")) return "كهربائي";
  if (f.includes("hybrid") || f.includes("هجين") || f.includes("هيبرد")) return "هيبرد";
  if (f.includes("gas") || f.includes("غاز")) return "غاز";
  if (f.includes("diesel") || f.includes("ديزل")) return "ديزل";
  return "بنزين";
}

function niceGear(trans) {
  const t = String(trans || "أوتوماتيك").toLowerCase();
  if (t.includes("manual") || t.includes("يدوي")) return "يدوي";
  return "أوتوماتيك";
}

function InfoChip({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        minHeight: 48,
        background: "rgba(255,255,255,.075)",
        border: "1px solid rgba(255,255,255,.07)",
        color: "rgba(255,255,255,.92)",
        borderRadius: 14,
        padding: "10px 12px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)",
      }}
    >
      <span style={{ display: "grid", placeItems: "center", width: 24, height: 24, color: "#A78BFA" }}>{icon}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", fontWeight: 800, lineHeight: 1.1 }}>{label}</div>
        <div style={{ marginTop: 3, fontSize: 13.5, color: "#fff", fontWeight: 900, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
      </div>
    </div>
  );
}

function MiniRow({ icon, title, value, onEdit }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "28px 1fr 38px",
        alignItems: "center",
        gap: 10,
        padding: "12px 0",
        borderBottom: "1px solid rgba(255,255,255,.075)",
      }}
    >
      <span style={{ color: "rgba(255,255,255,.74)", display: "grid", placeItems: "center" }}>{icon}</span>
      <div>
        <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, fontWeight: 800 }}>{title}</div>
        <div style={{ color: "#fff", fontSize: 13.5, fontWeight: 900, marginTop: 3 }}>{value}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label="تعديل"
        style={{
          width: 34,
          height: 34,
          borderRadius: 12,
          border: "1px solid rgba(167,139,250,.22)",
          background: "rgba(124,58,237,.16)",
          color: "#C4B5FD",
          fontSize: 15,
          fontWeight: 900,
          display: "grid",
          placeItems: "center",
        }}
      >
        ✎
      </button>
    </div>
  );
}

export function CarDetail({ car, onBack, liked, onLike, allReviews = [], addReview }) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [pickupDate, setPickupDate] = useState(todayPlus(1));
  const [returnDate, setReturnDate] = useState(todayPlus(2));
  const [editingDates, setEditingDates] = useState(false);
  const [needDriver, setNeedDriver] = useState(false);
  const [clientName, setClientName] = useState(user?.user_metadata?.full_name || "");
  const [clientPhone, setClientPhone] = useState(user?.user_metadata?.phone || "");
  const [myRating, setMyRating] = useState(0);
  const sliderRef = useRef(null);

  const gallery = useMemo(() => {
    const imgs = [car?.img, ...(car?.images || []), ...galleryFallback].filter(Boolean);
    return [...new Set(imgs)].slice(0, 9);
  }, [car]);

  const agency = useMemo(() => {
    return AGENCIES.find((a) => a.wilaya === car?.wilaya) || AGENCIES[0];
  }, [car?.wilaya]);

  const carReviews = useMemo(() => {
    return (allReviews || []).filter((r) => Number(r.carId) === Number(car?.id));
  }, [allReviews, car?.id]);

  const rating = Number(car.rating || 5).toFixed(1).replace(".", ",");
  const trips = car.trips || car.reviews || 0;
  const dailyPrice = car.price || 0;
  const mileage = car.mileage || car.km || `${(38 + (Number(car.id) || 1) * 7).toLocaleString("fr-DZ")} ألف كم`;
  const days = Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86400000));
  const total = dailyPrice * days;

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

  const submitRating = () => {
    if (!myRating) return;
    addReview?.({
      id: Date.now(),
      carId: car.id,
      name: clientName || "مستخدم درايف",
      avatar: "https://i.pravatar.cc/60?img=12",
      rating: myRating,
      comment: "تقييم جديد للسيارة",
      date: "الآن",
    });
    navigator.vibrate?.(25);
  };

  const continueBooking = () => {
    saveBooking({
      carId: car.id,
      car: car.name,
      img: car.img,
      wilaya: car.wilaya,
      from: pickupDate,
      to: returnDate,
      days,
      price: total,
      dailyPrice,
      serviceFee: 0,
      pickupPlace: agency?.name || "الوكالة",
      needDriver,
      driverName: clientName || "مستخدم درايف",
      driverPhone: clientPhone || "غير محدد",
      rating: myRating || 0,
      status: "pending",
    });
    navigator.vibrate?.(35);
    navigate("/trips");
  };

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#050506",
        color: "#fff",
        margin: 0,
        paddingBottom: "calc(92px + env(safe-area-inset-bottom))",
        animation: "fadeIn .24s ease",
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          position: "relative",
          height: "clamp(278px, 39vh, 350px)",
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
            direction: "ltr",
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
            background: "linear-gradient(to bottom, rgba(0,0,0,.34), rgba(0,0,0,.06) 44%, rgba(0,0,0,.26))",
          }}
        />

        <button
          onClick={onBack}
          aria-label="رجوع"
          style={{
            position: "absolute",
            top: "calc(18px + env(safe-area-inset-top))",
            left: 16,
            width: 44,
            height: 44,
            border: "none",
            background: "transparent",
            color: "#fff",
            display: "grid",
            placeItems: "center",
          }}
        >
          <IconBack size={30} color="#fff" />
        </button>

        <div
          style={{
            position: "absolute",
            top: "calc(18px + env(safe-area-inset-top))",
            right: 16,
            display: "flex",
            gap: 10,
          }}
        >
          <button
            onClick={shareCar}
            aria-label="مشاركة"
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              border: "none",
              background: "rgba(8,8,10,.84)",
              color: "#fff",
              boxShadow: "0 10px 24px rgba(0,0,0,.32)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <IconShare size={25} color="#fff" />
          </button>
          <button
            onClick={onLike}
            aria-label="مفضلة"
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              border: "none",
              background: "rgba(8,8,10,.84)",
              color: "#fff",
              boxShadow: "0 10px 24px rgba(0,0,0,.32)",
              display: "grid",
              placeItems: "center",
              animation: liked ? "heartPop .38s ease both" : undefined,
            }}
          >
            <IconLike size={28} active={liked} color="#fff" />
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            left: 18,
            bottom: 18,
            direction: "ltr",
            background: "rgba(18,18,20,.82)",
            color: "#fff",
            borderRadius: 12,
            padding: "8px 13px",
            fontSize: 15,
            fontWeight: 800,
            boxShadow: "0 8px 22px rgba(0,0,0,.32)",
          }}
        >
          {photoIndex + 1} من {gallery.length}
        </div>
      </section>

      <section
        style={{
          padding: "18px 18px 14px",
          background: "linear-gradient(180deg,#060607 0%,#050506 100%)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(24px,6.2vw,30px)",
            lineHeight: 1.18,
            fontWeight: 900,
            letterSpacing: ".1px",
          }}
        >
          {car.name}
        </h1>

        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 7,
            color: "rgba(255,255,255,.76)",
            fontSize: 15.5,
            lineHeight: 1.35,
            fontWeight: 700,
          }}
        >
          <span>{car.year || 2024} {car.badge || "سيارة"}</span>
          <span style={{ opacity: .32 }}>•</span>
          <span>{rating}</span>
          <IconStar size={18} color="#8B5CF6" filled />
          <span style={{ color: "rgba(255,255,255,.44)" }}>({trips} رحلة)</span>
        </div>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,.88)",
            fontSize: 14.5,
            fontWeight: 800,
          }}
        >
          <IconVerified size={18} color="#A78BFA" />
          <span>وكالة موثقة</span>
          <span style={{ color: "rgba(255,255,255,.35)" }}>•</span>
          <span>{car.wilaya}</span>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 10,
          }}
        >
          <InfoChip icon={<IconSeat size={21} color="#A78BFA" />} label="المقاعد" value={`${car.seats || 5} مقاعد`} />
          <InfoChip icon={<IconFuel size={21} color="#A78BFA" />} label="الوقود" value={niceFuel(car.fuel)} />
          <InfoChip icon={<IconTransmission size={21} color="#A78BFA" />} label="Gear" value={niceGear(car.trans)} />
          <InfoChip icon={<IconRoad size={21} color="#A78BFA" />} label="الكيلومترات" value={mileage} />
        </div>
      </section>

      <section style={{ padding: "16px 18px 24px" }}>
        <div
          style={{
            borderRadius: 24,
            background: "rgba(255,255,255,.045)",
            border: "1px solid rgba(255,255,255,.075)",
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(0,0,0,.22)",
          }}
        >
          <div style={{ padding: "16px 16px 2px" }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 950 }}>رحلتك</h2>
            <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.44)", fontSize: 12.5, fontWeight: 700 }}>راجع معلومات الحجز قبل المتابعة</p>
          </div>

          <div style={{ padding: "4px 16px 2px" }}>
            <MiniRow icon={<IconCalendar size={20} color="currentColor" />} title="تاريخ الاستلام" value={formatArabicDate(pickupDate)} onEdit={() => setEditingDates((v) => !v)} />
            <MiniRow icon={<IconCalendar size={20} color="currentColor" />} title="تاريخ الإرجاع" value={formatArabicDate(returnDate)} onEdit={() => setEditingDates((v) => !v)} />
            {editingDates && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "10px 0 14px" }}>
                <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type="date" style={dateInputStyle} />
                <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" style={dateInputStyle} />
              </div>
            )}
          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,.075)" }}>
            <button
              type="button"
              onClick={() => setNeedDriver((v) => !v)}
              style={{
                width: "100%",
                minHeight: 46,
                border: "1px solid rgba(124,58,237,.28)",
                borderRadius: 15,
                background: needDriver ? "linear-gradient(135deg,#7C3AED,#5B21B6)" : "rgba(124,58,237,.12)",
                color: "#fff",
                fontFamily: "inherit",
                fontWeight: 950,
                fontSize: 14.5,
              }}
            >
              {needDriver ? "تم اختيار سائق مع الرحلة" : "هل تحتاج سائق؟"}
            </button>
          </div>

          <div style={{ padding: "0 16px 14px", display: "grid", gap: 10 }}>
            <label style={labelStyle}>
              <span>اسم ولقب الزبون</span>
              <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="مثال: محمد أمين" style={fieldStyle} />
            </label>
            <label style={labelStyle}>
              <span>رقم الهاتف</span>
              <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="0555 000 000" inputMode="tel" style={fieldStyle} />
            </label>
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            borderRadius: 24,
            background: "rgba(255,255,255,.045)",
            border: "1px solid rgba(255,255,255,.075)",
            padding: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={agency.img} alt={agency.name} style={{ width: 52, height: 52, borderRadius: 18, objectFit: "cover", border: "1px solid rgba(255,255,255,.1)" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <strong style={{ fontSize: 15.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{agency.name}</strong>
                <IconVerified size={16} color="#34D399" />
              </div>
              <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.55)", fontSize: 12.5, fontWeight: 700 }}>
                <IconStar size={14} color="#F59E0B" filled />
                <span>{Number(agency.rating || 4.9).toFixed(1).replace(".", ",")}</span>
                <span>•</span>
                <span>{agency.cars} سيارة</span>
                <span>•</span>
                <IconPin size={14} color="rgba(255,255,255,.5)" />
                <span>{agency.wilaya}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 15, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.075)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 950 }}>تقييمات السيارة</h3>
                <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,.45)", fontSize: 12.2, fontWeight: 700 }}>{carReviews.length || car.reviews || trips} تقييم وتجربة</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, direction: "ltr" }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setMyRating(n)}
                    aria-label={`تقييم ${n}`}
                    style={{ border: "none", background: "transparent", padding: 1, color: n <= myRating ? "#8B5CF6" : "rgba(255,255,255,.28)" }}
                  >
                    <IconStar size={20} color="currentColor" filled />
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={submitRating}
              disabled={!myRating}
              style={{
                marginTop: 12,
                width: "100%",
                minHeight: 42,
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 14,
                background: myRating ? "rgba(124,58,237,.18)" : "rgba(255,255,255,.05)",
                color: myRating ? "#C4B5FD" : "rgba(255,255,255,.34)",
                fontFamily: "inherit",
                fontSize: 13.5,
                fontWeight: 950,
              }}
            >
              إضافة تقييم للسيارة
            </button>
          </div>
        </div>
      </section>

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 120,
          display: "grid",
          gridTemplateColumns: "1fr minmax(138px, 42vw)",
          alignItems: "center",
          gap: 12,
          padding: "12px 18px max(14px, env(safe-area-inset-bottom))",
          background: "rgba(5,5,6,.96)",
          borderTop: "1px solid rgba(255,255,255,.08)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 950, fontSize: 18 }}>
            {formatDzd(dailyPrice)}<span style={{ fontSize: 12.5, opacity: .7 }}> / اليوم</span>
          </div>
          <div style={{ color: "rgba(255,255,255,.43)", fontWeight: 700, fontSize: 11.5 }}>
            الإجمالي {formatDzd(total)} · {days} يوم
          </div>
        </div>
        <button
          onClick={continueBooking}
          style={{
            minHeight: 52,
            border: "none",
            borderRadius: 16,
            background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: 16.5,
            fontWeight: 950,
            boxShadow: "0 16px 32px rgba(124,58,237,.34)",
          }}
        >
          متابعة
        </button>
      </div>
    </main>
  );
}

const dateInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  minHeight: 42,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 13,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  fontFamily: "inherit",
  fontWeight: 800,
  padding: "0 10px",
};

const labelStyle = {
  display: "grid",
  gap: 7,
  color: "rgba(255,255,255,.55)",
  fontSize: 12.2,
  fontWeight: 850,
};

const fieldStyle = {
  width: "100%",
  boxSizing: "border-box",
  minHeight: 44,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 15,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: 800,
  padding: "0 13px",
};
