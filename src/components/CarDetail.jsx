import { useMemo, useRef, useState } from "react";
import { useNavigate } from "../lib/router.jsx";
import { saveBooking } from "../lib/bookings.js";
import { getCurrentUser, getAppLanguage } from "../lib/supabase.js";
import { GuestAuthSheet } from "./GuestAuthSheet.jsx";
import { AGENCIES } from "../constants/data.js";
import ROAD_IMG from "../assets/roadImg.js";
import LOGO_IMG from "../assets/appLogo.js";
import {
  IconBack,
  IconLike,
  IconShareUpload,
  IconCompactSeat,
  IconCompactFuel,
  IconCompactGearbox,
  IconOdometer,
  IconStar,
  IconCalendar,
  IconPin,
  IconPhone,
  IconVerified,
  IconWhatsapp,
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
    const lang = getAppLanguage();
    const locale = lang === "fr" ? "fr-DZ" : lang === "en" ? "en-US" : "ar-DZ";
    return new Intl.DateTimeFormat(locale, {
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

function CompactChip({ icon, value }) {
  return (
    <div
      style={{
        display: "inline-flex",
        width: "fit-content",
        maxWidth: "100%",
        alignItems: "center",
        gap: 7,
        minHeight: 34,
        background: "rgba(255,255,255,.078)",
        border: "1px solid rgba(255,255,255,.075)",
        color: "rgba(255,255,255,.9)",
        borderRadius: 10,
        padding: "7px 10px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.035)",
        fontSize: 12,
        fontWeight: 850,
        lineHeight: 1,
      }}
    >
      <span style={{ display: "grid", placeItems: "center", width: 18, height: 18, color: "rgba(255,255,255,.88)" }}>{icon}</span>
      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
    </div>
  );
}

function DateLine({ icon, title, value, onEdit }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "22px 1fr 30px",
        alignItems: "center",
        gap: 9,
        padding: "9px 0",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <span style={{ color: "rgba(255,255,255,.68)", display: "grid", placeItems: "center" }}>{icon}</span>
      <div>
        <div style={{ color: "rgba(255,255,255,.42)", fontSize: 10.5, fontWeight: 800 }}>{title}</div>
        <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 850, marginTop: 2 }}>{value}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label="تعديل"
        style={{
          width: 28,
          height: 28,
          borderRadius: 9,
          border: "1px solid rgba(167,139,250,.2)",
          background: "rgba(124,58,237,.13)",
          color: "#C4B5FD",
          fontSize: 12,
          fontWeight: 950,
          display: "grid",
          placeItems: "center",
        }}
      >
        ✎
      </button>
    </div>
  );
}

function DateRangeLine({ from, to, onEdit }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "22px 1fr 30px",
        alignItems: "center",
        gap: 9,
        padding: "9px 0",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <span style={{ color: "rgba(255,255,255,.68)", display: "grid", placeItems: "center" }}>
        <IconCalendar size={16} color="currentColor" />
      </span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, minWidth: 0 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "rgba(255,255,255,.42)", fontSize: 10.5, fontWeight: 800 }}>تاريخ الاستلام</div>
          <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 850, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{from}</div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "rgba(255,255,255,.42)", fontSize: 10.5, fontWeight: 800 }}>تاريخ الإرجاع</div>
          <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 850, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{to}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label="تعديل التاريخين"
        style={{
          width: 28,
          height: 28,
          borderRadius: 9,
          border: "1px solid rgba(167,139,250,.2)",
          background: "rgba(124,58,237,.13)",
          color: "#C4B5FD",
          fontSize: 12,
          fontWeight: 950,
          display: "grid",
          placeItems: "center",
        }}
      >
        ✎
      </button>
    </div>
  );
}

function ChoiceBox({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: 36,
        border: active ? "1px solid rgba(167,139,250,.68)" : "1px solid rgba(255,255,255,.08)",
        borderRadius: 12,
        background: active ? "rgba(124,58,237,.25)" : "rgba(255,255,255,.055)",
        color: active ? "#EDE9FE" : "rgba(255,255,255,.72)",
        fontFamily: "inherit",
        fontWeight: 900,
        fontSize: 12,
        padding: "0 10px",
      }}
    >
      {children}
    </button>
  );
}

export function CarDetail({ car, onBack, liked, onLike, allReviews = [], addReview }) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const lang = getAppLanguage();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [photoIndex, setPhotoIndex] = useState(0);
  const [pickupDate, setPickupDate] = useState(todayPlus(1));
  const [returnDate, setReturnDate] = useState(todayPlus(2));
  const [editingDates, setEditingDates] = useState(false);
  const [needDriver, setNeedDriver] = useState(false);
  const [clientName, setClientName] = useState(user?.user_metadata?.full_name || "");
  const [clientPhone, setClientPhone] = useState(user?.user_metadata?.phone || "");
  const [myRating, setMyRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingSheet, setBookingSheet] = useState(false);
  const [guestAuthSheet, setGuestAuthSheet] = useState(false);
  const sliderRef = useRef(null);
  const sheetStartY = useRef(0);

  const gallery = useMemo(() => {
    const imgs = [car?.img, ...(car?.images || []), ...galleryFallback].filter(Boolean);
    return [...new Set(imgs)].slice(0, 9);
  }, [car]);

  const agency = useMemo(() => {
    return AGENCIES.find((a) => a.wilaya === car?.wilaya) || AGENCIES[0];
  }, [car?.wilaya]);

  const carReviews = useMemo(() => {
    const filtered = (allReviews || []).filter((r) => Number(r.carId) === Number(car?.id));
    if (filtered.length) return filtered;
    return [
      { id: "fallback-1", name: "أمين ب.", avatar: "https://i.pravatar.cc/60?img=11", rating: 5, comment: "السيارة نظيفة ومريحة، والوكالة تعاملها ممتاز.", date: "هذا الأسبوع" },
      { id: "fallback-2", name: "سفيان ع.", avatar: "https://i.pravatar.cc/60?img=22", rating: 4, comment: "تجربة جيدة، الاستلام كان سريعًا والسيارة مطابقة للصور.", date: "الشهر الماضي" },
    ];
  }, [allReviews, car?.id]);

  const rating = Number(car.rating || 5).toFixed(1).replace(".", ",");
  const trips = car.trips || car.reviews || 0;
  const dailyPrice = car.price || 0;
  const mileage = car.mileage || car.km || `${(38 + (Number(car.id) || 1) * 7).toLocaleString("fr-DZ")} ألف كم`;
  const days = Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86400000));
  const baseTotal = dailyPrice * days;
  const platformFee = Math.round(baseTotal * 0.05);
  const total = baseTotal + platformFee;

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
      comment: reviewComment.trim() || "تجربة جيدة مع هذه السيارة.",
      date: "الآن",
    });
    setReviewComment("");
    setMyRating(0);
    navigator.vibrate?.(25);
  };

  const saveCurrentBooking = () => {
    saveBooking({
      carId: car.id,
      car: car.name,
      img: car.img,
      wilaya: car.wilaya,
      from: pickupDate,
      to: returnDate,
      days,
      price: total,
      basePrice: baseTotal,
      dailyPrice,
      serviceFee: platformFee,
      pickupPlace: agency?.name || "الوكالة",
      needDriver,
      driverName: clientName || "مستخدم درايف",
      driverPhone: clientPhone || "غير محدد",
      rating: myRating || 0,
      status: "pending",
    });
  };

  const confirmBooking = () => {
    saveCurrentBooking();
    setBookingSheet(false);
    setBookingDone(true);
    navigator.vibrate?.(35);
  };

  const saveTripOnly = () => {
    saveCurrentBooking();
    setBookingSheet(false);
    navigator.vibrate?.(25);
    navigate("/trips");
  };

  const openWhatsappBooking = () => {
    saveCurrentBooking();
    setBookingSheet(false);
    window.open(whatsappUrl(), "_blank", "noopener,noreferrer");
  };

  const onSheetTouchStart = (e) => {
    sheetStartY.current = e.touches?.[0]?.clientY || 0;
  };

  const onSheetTouchEnd = (e) => {
    const y = e.changedTouches?.[0]?.clientY || 0;
    if (y - sheetStartY.current > 65) setBookingSheet(false);
  };

  const whatsappUrl = () => {
    const phone = "213555000000";
    const text = `مرحبا، أريد حجز ${car.name} من ${agency.name}.\nتاريخ الاستلام: ${pickupDate}\nتاريخ الإرجاع: ${returnDate}\nالاسم: ${clientName || "غير محدد"}\nالهاتف: ${clientPhone || "غير محدد"}\nالسعر الأساسي: ${formatDzd(baseTotal)}\nرسوم المنصة 5%: ${formatDzd(platformFee)}\nالإجمالي: ${formatDzd(total)}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <main
      dir={dir}
      style={{
        minHeight: "100vh",
        background: "#050506",
        color: "#fff",
        margin: 0,
        paddingBottom: "calc(88px + env(safe-area-inset-bottom))",
        animation: "fadeIn .24s ease",
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          position: "relative",
          height: "clamp(250px, 34vh, 315px)",
          background: "#0D0E1A",
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
            touchAction: "pan-x pan-y",
            overscrollBehaviorY: "auto",
          }}
        >
          {gallery.map((src, index) => (
            <img
              key={`${src}-${index}`}
              draggable={false}
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

        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(0,0,0,.32), rgba(0,0,0,.04) 50%, rgba(0,0,0,.14))" }} />

        <button onClick={onBack} aria-label="رجوع" style={topBackButtonStyle}>
          <IconBack size={22} color="#fff" />
        </button>

        <div style={{ position: "absolute", top: "calc(max(16px, env(safe-area-inset-top)) + 10px)", left: 16, display: "flex", gap: 9 }}>
          <button onClick={onLike} aria-label="مفضلة" style={topActionButtonStyle}>
            <IconLike size={20} active={liked} color="#fff" />
          </button>
          <button onClick={shareCar} aria-label="مشاركة" style={topActionButtonStyle}>
            <IconShareUpload size={19} color="#fff" strokeWidth={2.05} />
          </button>
        </div>

        <div style={photoCounterStyle}>{photoIndex + 1} من {gallery.length}</div>
      </section>

      <section style={{ padding: "14px 18px 12px", background: "linear-gradient(180deg,#060607 0%,#050506 100%)", borderBottom: "1px solid rgba(255,255,255,.055)" }}>
        <h1 data-no-i18n="true" style={{ margin: 0, fontSize: "clamp(23px,5.8vw,29px)", lineHeight: 1.15, fontWeight: 950, letterSpacing: ".1px" }}>{car.name}</h1>

        <div style={{ marginTop: 8, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, color: "rgba(255,255,255,.72)", fontSize: 13.2, lineHeight: 1.3, fontWeight: 750 }}>
          <span>{car.year || 2024} {car.badge || "سيارة"}</span>
          <span style={{ opacity: .35 }}>•</span>
          <span>{rating}</span>
          <IconStar size={15} color="#8B5CF6" filled />
        </div>

        <div style={{ marginTop: 9, display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,.82)", fontSize: 12.4, fontWeight: 800 }}>
          <IconVerified size={15} color="#A78BFA" />
          <span>وكالة موثقة</span>
          <span style={{ color: "rgba(255,255,255,.35)" }}>•</span>
          <span>{car.wilaya}</span>
        </div>

        <div style={{ marginTop: 13, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <CompactChip icon={<IconCompactSeat size={18} color="currentColor" strokeWidth={2.05} />} value={`${car.seats || 5} مقاعد`} />
          <CompactChip icon={<IconCompactFuel size={18} color="currentColor" strokeWidth={2.05} />} value={niceFuel(car.fuel)} />
          <CompactChip icon={<IconCompactGearbox size={18} color="currentColor" strokeWidth={2.05} />} value={`علبة السرعات: ${niceGear(car.trans)}`} />
          <CompactChip icon={<IconOdometer size={18} color="currentColor" strokeWidth={2.05} />} value={`عداد الكيلومترات: ${mileage}`} />
        </div>
      </section>

      <section style={{ padding: "13px 18px 20px" }}>
        <div style={{ ...smallCardStyle, marginTop: 0, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src={agency.img} alt={agency.name} style={{ width: 44, height: 44, borderRadius: 15, objectFit: "cover", border: "1px solid rgba(255,255,255,.1)" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <strong data-no-i18n="true" style={{ fontSize: 13.6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{agency.name}</strong>
                <IconVerified size={14} color="#34D399" />
              </div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,.52)", fontSize: 11.3, fontWeight: 750 }}>
                <IconStar size={12} color="#F59E0B" filled />
                <span>{Number(agency.rating || 4.9).toFixed(1).replace(".", ",")}</span>
                <span>•</span>
                <span>{agency.cars} سيارة</span>
                <span>•</span>
                <IconPin size={12} color="rgba(255,255,255,.5)" />
                <span>{agency.wilaya}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...smallCardStyle, marginTop: 12, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 14.5, fontWeight: 950 }}>تقييمات السيارة</h3>
              <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,.42)", fontSize: 11.1, fontWeight: 700 }}>{carReviews.length || car.reviews || trips} تقييم</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2, direction: "ltr" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setMyRating(n)} aria-label={`تقييم ${n}`} style={{ border: "none", background: "transparent", padding: 0, color: n <= myRating ? "#8B5CF6" : "rgba(255,255,255,.26)" }}>
                  <IconStar size={17} color="currentColor" filled />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="اكتب تعليقك على السيارة..."
            style={{ ...fieldStyle, minHeight: 68, padding: "10px 12px", resize: "none", lineHeight: 1.5, marginTop: 10 }}
          />
          <button type="button" onClick={submitRating} disabled={!myRating} style={{ ...secondaryButtonStyle, opacity: myRating ? 1 : .48 }}>إضافة تقييم وتعليق</button>

          <div style={{ display: "grid", gap: 9, marginTop: 12 }}>
            {carReviews.slice(0, 3).map((r) => (
              <div key={r.id} style={{ display: "grid", gridTemplateColumns: "34px 1fr", gap: 9, paddingTop: 9, borderTop: "1px solid rgba(255,255,255,.055)" }}>
                <img src={r.avatar} alt={r.name} style={{ width: 34, height: 34, borderRadius: 12, objectFit: "cover" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <strong style={{ fontSize: 12.3 }}>{r.name}</strong>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "rgba(255,255,255,.62)", fontSize: 11, fontWeight: 800 }}>
                      {r.rating}<IconStar size={11} color="#8B5CF6" filled />
                    </span>
                  </div>
                  <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,.62)", fontSize: 11.6, lineHeight: 1.65, fontWeight: 650 }}>{r.comment}</p>
                  <span style={{ color: "rgba(255,255,255,.32)", fontSize: 10.5, fontWeight: 700 }}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={bottomBarStyle}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: 950, fontSize: 16 }}>
            {formatDzd(dailyPrice)}<span style={{ fontSize: 11.2, opacity: .66 }}> / اليوم</span>
          </div>
          <div style={{ color: "rgba(255,255,255,.42)", fontWeight: 700, fontSize: 10.8 }}>الإجمالي {formatDzd(total)} · {days} يوم · شامل 5%</div>
        </div>
        <button onClick={() => { if (!getCurrentUser()) setGuestAuthSheet(true); else openWhatsappBooking(); }} aria-label="الحجز عبر واتساب" style={whatsappButtonStyle}><IconWhatsapp size={22} color="currentColor" strokeWidth={2.35} /></button>
        <button onClick={() => { if (!getCurrentUser()) setGuestAuthSheet(true); else setBookingSheet(true); }} style={bookButtonStyle}>حجز الآن</button>
      </div>

      {guestAuthSheet && (
        <GuestAuthSheet
          onClose={() => setGuestAuthSheet(false)}
          onLogin={() => { setGuestAuthSheet(false); navigate("/login"); }}
          onRegister={() => { setGuestAuthSheet(false); navigate("/register"); }}
          onGoogle={() => { setGuestAuthSheet(false); navigate("/auth/google"); }}
          onApple={() => { setGuestAuthSheet(false); navigate("/auth/apple"); }}
        />
      )}

      {bookingSheet && (
        <div style={sheetBackdropStyle} onClick={() => setBookingSheet(false)}>
          <div style={bookingSheetStyle} onClick={(e) => e.stopPropagation()} onTouchStart={onSheetTouchStart} onTouchEnd={onSheetTouchEnd}>
            <div style={sheetHeroStyle}>
              <img src={ROAD_IMG} alt="road" style={sheetHeroImgStyle} />
              <div style={sheetHeroOverlayStyle} />
              <img src={LOGO_IMG} alt="درايف Rent" style={sheetHeroLogoStyle} />
              <div style={sheetHandleOnHeroStyle} />
            </div>
            <div style={sheetContentStyle}>
              <div style={{ ...smallCardStyle, padding: 13, marginBottom: 13, background: "rgba(255,255,255,.045)" }}>
                <h3 style={{ margin: "0 0 4px", color: "#fff", fontSize: 14.5, fontWeight: 950, textAlign: dir === "ltr" ? "left" : "right" }}>رحلتك</h3>
                <p style={{ margin: "0 0 8px", color: "rgba(255,255,255,.42)", fontSize: 10.8, fontWeight: 750, textAlign: dir === "ltr" ? "left" : "right" }}>معلومات الحجز الأساسية</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "10px 0 6px" }}>
                  <label style={labelStyle}>
                    الاسم الكامل
                    <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="الاسم واللقب" style={fieldStyle} />
                  </label>
                  <label style={labelStyle}>
                    رقم الهاتف
                    <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="05xxxxxxxx" type="tel" dir="ltr" style={{ ...fieldStyle, textAlign: "left" }} />
                  </label>
                </div>
                <DateRangeLine from={formatArabicDate(pickupDate)} to={formatArabicDate(returnDate)} onEdit={() => setEditingDates((v) => !v)} />
                {editingDates && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "8px 0 12px" }}>
                    <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type="date" style={dateInputStyle} />
                    <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" style={dateInputStyle} />
                  </div>
                )}
                <div style={{ display: "grid", gap: 5, padding: "8px 0 2px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  <div style={priceRowStyle}><span>السعر الأساسي</span><strong>{formatDzd(baseTotal)}</strong></div>
                  <div style={priceRowStyle}><span>رسوم المنصة 5%</span><strong>{formatDzd(platformFee)}</strong></div>
                  <div style={{ ...priceRowStyle, color: "#fff", fontSize: 12.3 }}><span>الإجمالي</span><strong>{formatDzd(total)}</strong></div>
                </div>
                <div style={{ color: "rgba(255,255,255,.45)", fontSize: 10.8, fontWeight: 850, margin: "10px 0 7px", textAlign: dir === "ltr" ? "left" : "right" }}>هل تحتاج سائق؟</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <ChoiceBox active={needDriver} onClick={() => setNeedDriver(true)}>أحتاج سائق</ChoiceBox>
                  <ChoiceBox active={!needDriver} onClick={() => setNeedDriver(false)}>لا أحتاج سائق</ChoiceBox>
                </div>
              </div>
              <h3 style={{ margin: 0, color: "#fff", fontSize: 17, fontWeight: 950, textAlign: "center" }}>اختر طريقة الحجز</h3>
              <button type="button" onClick={openWhatsappBooking} style={plainSheetOptionStyle}>الحجز عبر واتساب</button>
              <button type="button" onClick={confirmBooking} style={plainSheetOptionStyle}>الحجز عبر منصة الوكالة</button>
              <button type="button" onClick={saveTripOnly} style={plainSheetOptionStyle}>حفظ الرحلة</button>
            </div>
          </div>
        </div>
      )}

      {bookingDone && (
        <div style={modalBackdropStyle} onClick={() => setBookingDone(false)}>
          <div style={successModalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 46, height: 46, borderRadius: 18, display: "grid", placeItems: "center", background: "rgba(124,58,237,.16)", color: "#C4B5FD", margin: "0 auto 10px" }}>
              <IconPhone size={22} color="currentColor" />
            </div>
            <p style={{ margin: 0, color: "rgba(255,255,255,.85)", fontSize: 14.2, lineHeight: 1.8, fontWeight: 850 }}>سيتم الاتصال بك قريباً من طرف وكالتنا</p>
            <button type="button" onClick={() => setBookingDone(false)} style={{ ...secondaryButtonStyle, marginTop: 15 }}>حسنًا</button>
          </div>
        </div>
      )}
    </main>
  );
}

const topBackButtonStyle = {
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
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const topActionButtonStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(9,10,18,.62)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  color: "#fff",
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

const smallCardStyle = {
  borderRadius: 18,
  background: "rgba(255,255,255,.042)",
  border: "1px solid rgba(255,255,255,.07)",
  overflow: "hidden",
  boxShadow: "0 14px 32px rgba(0,0,0,.18)",
};

const dateInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  minHeight: 36,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 11,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  fontFamily: "inherit",
  fontWeight: 750,
  fontSize: 11.5,
  padding: "0 8px",
};

const labelStyle = {
  display: "grid",
  gap: 5,
  color: "rgba(255,255,255,.5)",
  fontSize: 11.2,
  fontWeight: 850,
};

const fieldStyle = {
  width: "100%",
  boxSizing: "border-box",
  minHeight: 39,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 12,
  background: "rgba(255,255,255,.055)",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: 12.4,
  fontWeight: 750,
  padding: "0 11px",
};

const secondaryButtonStyle = {
  width: "100%",
  minHeight: 39,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 12,
  background: "rgba(255,255,255,.055)",
  color: "#EDE9FE",
  fontFamily: "inherit",
  fontSize: 12.6,
  fontWeight: 950,
  marginTop: 9,
};

const bottomBarStyle = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 120,
  display: "grid",
  gridTemplateColumns: "1fr 46px minmax(124px, 36vw)",
  alignItems: "center",
  gap: 9,
  padding: "10px 16px max(12px, env(safe-area-inset-bottom))",
  background: "rgba(5,5,6,.96)",
  borderTop: "1px solid rgba(255,255,255,.08)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
};

const bookButtonStyle = {
  minHeight: 46,
  border: "none",
  borderRadius: 15,
  background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: 14.4,
  fontWeight: 950,
  boxShadow: "0 14px 28px rgba(124,58,237,.32)",
};

const whatsappButtonStyle = {
  ...bookButtonStyle,
  minWidth: 46,
  width: 46,
  padding: 0,
  borderRadius: 16,
  background: "linear-gradient(135deg,#25D366,#128C7E)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,.18)",
  boxShadow: "0 14px 30px rgba(37,211,102,.24), inset 0 1px 0 rgba(255,255,255,.22)",
  display: "grid",
  placeItems: "center",
};

const priceRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  color: "rgba(255,255,255,.58)",
  fontSize: 11.3,
  fontWeight: 850,
};

const modalBackdropStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 240,
  display: "grid",
  placeItems: "center",
  padding: 22,
  background: "rgba(0,0,0,.58)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

const successModalStyle = {
  width: "min(100%, 360px)",
  borderRadius: 26,
  background: "rgba(14,14,18,.96)",
  border: "1px solid rgba(255,255,255,.08)",
  boxShadow: "0 30px 80px rgba(0,0,0,.45)",
  padding: 18,
  textAlign: "center",
};

const sheetBackdropStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 230,
  display: "flex",
  alignItems: "flex-end",
  background: "rgba(0,0,0,.48)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  animation: "authBackdropIn .18s ease both",
};

const bookingSheetStyle = {
  width: "100%",
  maxWidth: 520,
  margin: "0 auto",
  borderRadius: "28px 28px 0 0",
  background: "rgba(10,11,23,.99)",
  border: "1px solid rgba(255,255,255,.09)",
  borderBottom: "none",
  boxShadow: "0 -24px 70px rgba(0,0,0,.55)",
  padding: 0,
  overflow: "hidden",
  animation: "authSheetUp .34s cubic-bezier(.22,1,.36,1) both",
};

const sheetHeroStyle = {
  position: "relative",
  height: 138,
  overflow: "hidden",
  background: "#090A14",
};

const sheetHeroImgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center 42%",
  display: "block",
};

const sheetHeroOverlayStyle = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to bottom, rgba(7,8,15,.28) 0%, rgba(9,10,20,1) 100%)",
};

const sheetHeroLogoStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  width: 78,
  height: 78,
  objectFit: "contain",
  filter: "drop-shadow(0 5px 18px rgba(0,0,0,.6))",
};

const sheetHandleOnHeroStyle = {
  position: "absolute",
  top: 10,
  left: "50%",
  transform: "translateX(-50%)",
  width: 52,
  height: 5,
  borderRadius: 999,
  background: "rgba(255,255,255,.24)",
  boxShadow: "0 2px 10px rgba(0,0,0,.35)",
};

const sheetContentStyle = {
  padding: "18px 16px max(18px, env(safe-area-inset-bottom))",
  display: "grid",
  gap: 10,
};

const plainSheetOptionStyle = {
  width: "100%",
  minHeight: 48,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 15,
  background: "rgba(255,255,255,.052)",
  color: "#fff",
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: 900,
  textAlign: "center",
};

const sheetHandleStyle = {
  width: 44,
  height: 5,
  borderRadius: 999,
  background: "rgba(255,255,255,.18)",
  margin: "0 auto 13px",
};

const sheetOptionStyle = {
  width: "100%",
  minHeight: 62,
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: 17,
  background: "rgba(255,255,255,.052)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 12px",
  marginTop: 9,
  fontFamily: "inherit",
  textAlign: "start",
};

const sheetIconStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
  background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
  boxShadow: "0 12px 28px rgba(124,58,237,.22)",
};
