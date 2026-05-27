import { useMemo, useRef, useState } from "react";
import { useNavigate } from "../lib/router.jsx";
import { saveBooking } from "../lib/bookings.js";
import { getCurrentUser, getAppLanguage } from "../lib/supabase.js";
import { GuestAuthSheet } from "./GuestAuthSheet.jsx";
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
  const userFullName = user?.user_metadata?.full_name || "";
  const [firstName, setFirstName] = useState(userFullName.split(" ")[0] || "");
  const [lastName, setLastName] = useState(userFullName.split(" ").slice(1).join(" ") || "");
  const [countryCode, setCountryCode] = useState("+213");
  const [clientPhone, setClientPhone] = useState(user?.user_metadata?.phone || "");
  const [driverAge, setDriverAge] = useState("30");
  const [promoOptIn, setPromoOptIn] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingPage, setBookingPage] = useState(false);
  const [bookingStep, setBookingStep] = useState("form");
  const [guestAuthSheet, setGuestAuthSheet] = useState(false);
  const sliderRef = useRef(null);

  const gallery = useMemo(() => {
    const imgs = [car?.img, ...(car?.images || []), ...galleryFallback].filter(Boolean);
    return [...new Set(imgs)].slice(0, 9);
  }, [car]);

  const agency = useMemo(() => ({
    id: car?.agencyId || car?.agency_id || '',
    name: car?.agencyName || car?.agency_name || 'الوكالة',
    wilaya: car?.wilaya || '',
    rating: car?.agencyRating || car?.agency_rating || 0,
    cars: car?.agencyCars || car?.agency_cars || '',
    img: car?.agencyImg || car?.agency_img || '',
  }), [car]);

  const fullDriverName = [firstName, lastName].filter(Boolean).join(" ") || "مستخدم درايف";
  const fullDriverPhone = `${countryCode} ${clientPhone || ""}`.trim();

  const carReviews = useMemo(() => {
    return (allReviews || []).filter((r) => Number(r.carId) === Number(car?.id));
  }, [allReviews, car?.id]);

  const rating = Number(car.rating || 0).toFixed(1).replace(".", ",");
  const trips = car.trips || car.reviews || 0;
  const dailyPrice = car.price || 0;
  const mileage = car.mileage || car.km || "غير محدد";
  const days = Math.max(1, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / 86400000));
  const baseTotal = dailyPrice * days;
  const platformFee = Math.round(baseTotal * 0.05);
  const total = baseTotal + platformFee;
  const oldDisplayBase = Math.round(baseTotal * 1.1);

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
        await navigator.share({ title: car.name, text: `RENT درايف - ${car.name}`, url });
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
      name: fullDriverName,
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
      agencyId: agency?.id,
      agencyName: agency?.name || 'الوكالة',
      car: car.name,
      img: car.img,
      wilaya: car.wilaya,
      from: pickupDate,
      to: returnDate,
      days,
      price: total,
      oldDisplayPrice: oldDisplayBase,
      basePrice: baseTotal,
      dailyPrice,
      serviceFee: platformFee,
      pickupPlace: agency?.name || "الوكالة",
      driverName: fullDriverName,
      driverPhone: fullDriverPhone || "غير محدد",
      driverAge,
      rating: myRating || 0,
      status: "pending",
    });
  };

  const confirmBooking = () => {
    saveCurrentBooking();
    setBookingPage(false);
    setBookingStep("form");
    setBookingDone(true);
    navigator.vibrate?.(35);
  };

  const saveTripOnly = () => {
    saveCurrentBooking();
    setBookingPage(false);
    setBookingStep("form");
    navigator.vibrate?.(25);
    navigate("/trips");
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
          <div style={footerPriceLineStyle}>
            <span style={oldPriceStrikeStyle}>{formatDzd(oldDisplayBase)}</span>
            <strong style={realPriceStyle}>{formatDzd(baseTotal)} الإجمالي</strong>
          </div>
          <div style={{ color: "rgba(255,255,255,.42)", fontWeight: 700, fontSize: 10.8 }}>
            {days} يوم · قبل الضرائب والرسوم
          </div>
        </div>
        <button onClick={() => { if (!getCurrentUser()) setGuestAuthSheet(true); else { setBookingStep("form"); setBookingPage(true); } }} style={bookButtonStyle}>حجز الآن</button>
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

      {bookingPage && (
        <div style={bookingPageStyle}>
          <header style={bookingPageHeaderStyle}>
            <button type="button" onClick={() => bookingStep === "review" ? setBookingStep("form") : setBookingPage(false)} aria-label="رجوع" style={bookingBackButtonStyle}>
              <IconBack size={22} color="#fff" />
            </button>
            <strong style={{ fontSize: 17, fontWeight: 950 }}>{bookingStep === "review" ? "مراجعة المعلومات" : "معلومات الحجز"}</strong>
            <span style={{ width: 42 }} />
          </header>

          {bookingStep === "form" ? (
            <>
              <div style={bookingPageBodyStyle}>
                <div style={bookingCarCardStyle}>
                  <img src={gallery[0]} alt={car.name} style={bookingCarImageStyle} />
                  <div style={{ minWidth: 0 }}>
                    <h2 data-no-i18n="true" style={{ margin: 0, color: "#fff", fontSize: 16.5, fontWeight: 950, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{car.name}</h2>
                    <div style={{ marginTop: 5, color: "rgba(255,255,255,.62)", fontSize: 11.8, fontWeight: 850 }}>{car.year || 2024} · {rating} ★</div>
                    <div style={{ marginTop: 6, color: "rgba(255,255,255,.48)", fontSize: 11.2, fontWeight: 800 }}>{agency.name} · {car.wilaya}</div>
                  </div>
                </div>

                <div style={{ ...smallCardStyle, padding: 14, background: "rgba(255,255,255,.045)" }}>
                  <DateRangeLine from={formatArabicDate(pickupDate)} to={formatArabicDate(returnDate)} onEdit={() => setEditingDates((v) => !v)} />
                  {editingDates && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "8px 0 12px" }}>
                      <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} type="date" style={dateInputStyle} />
                      <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} type="date" style={dateInputStyle} />
                    </div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "22px 1fr", alignItems: "center", gap: 9, padding: "10px 0 0" }}>
                    <IconPin size={16} color="rgba(255,255,255,.68)" />
                    <div>
                      <div style={{ color: "rgba(255,255,255,.42)", fontSize: 10.5, fontWeight: 800 }}>مكان الاستلام</div>
                      <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 850, marginTop: 2 }}>{agency.name} · {car.wilaya}</div>
                    </div>
                  </div>
                </div>

                <div style={{ ...smallCardStyle, padding: 14, background: "rgba(255,255,255,.045)" }}>
                  <h3 style={{ margin: "0 0 14px", color: "#fff", fontSize: 16, fontWeight: 950, textAlign: dir === "ltr" ? "left" : "right" }}>Primary driver</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "104px 1fr", gap: 10, marginBottom: 12 }}>
                    <label style={labelStyle}>
                      Country code
                      <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={fieldStyle}>
                        <option value="+213">+213</option>
                        <option value="+1">+1</option>
                        <option value="+33">+33</option>
                        <option value="+971">+971</option>
                      </select>
                    </label>
                    <label style={labelStyle}>
                      Mobile number
                      <input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="Mobile number" type="tel" dir="ltr" style={{ ...fieldStyle, textAlign: "left" }} />
                    </label>
                  </div>
                  <p style={{ margin: "0 0 14px", color: "rgba(255,255,255,.58)", fontSize: 11.4, lineHeight: 1.7, fontWeight: 650 }}>بإدخال رقم الهاتف توافق على استلام رسائل مرتبطة بالحجز أو الحساب.</p>
                  <label style={{ ...labelStyle, marginBottom: 12 }}>
                    First name on driver’s license
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} style={fieldStyle} />
                  </label>
                  <label style={{ ...labelStyle, marginBottom: 12 }}>
                    Last name on driver’s license
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} style={fieldStyle} />
                  </label>
                  <label style={labelStyle}>
                    Age
                    <select value={driverAge} onChange={(e) => setDriverAge(e.target.value)} style={fieldStyle}>
                      {Array.from({ length: 53 }, (_, i) => String(i + 18)).map((age) => <option key={age} value={age}>{age}</option>)}
                    </select>
                  </label>
                </div>

                <div style={{ ...smallCardStyle, padding: 14, background: "rgba(255,255,255,.045)" }}>
                  <h3 style={{ margin: "0 0 12px", color: "#fff", fontSize: 16, fontWeight: 950, textAlign: dir === "ltr" ? "left" : "right" }}>Summary</h3>
                  <div style={{ ...priceRowStyle, marginBottom: 9 }}><span>تسعيرة السيارة</span><strong>{formatDzd(baseTotal)}</strong></div>
                  <div style={{ ...priceRowStyle, marginBottom: 9 }}><span>Taxes / رسوم المنصة 5%</span><strong>{formatDzd(platformFee)}</strong></div>
                  <div style={{ ...priceRowStyle, color: "#fff", fontSize: 13.8, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,.08)" }}><span>السعر الأخير للحجز</span><strong>{formatDzd(total)}</strong></div>
                </div>

                <label style={checkRowStyle}>
                  <input type="checkbox" checked={promoOptIn} onChange={(e) => setPromoOptIn(e.target.checked)} style={checkInputStyle} />
                  <span>أرسل لي العروض عبر البريد</span>
                </label>
                <label style={checkRowStyle}>
                  <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} style={checkInputStyle} />
                  <span>أوافق على الشروط قبل إكمال الحجز</span>
                </label>
              </div>

              <footer style={bookingPageFooterStyle}>
                <div style={{ minWidth: 0 }}>
                  <div style={footerPriceLineStyle}>
                    <span style={oldPriceStrikeStyle}>{formatDzd(oldDisplayBase)}</span>
                    <strong style={realPriceStyle}>{formatDzd(baseTotal)} الإجمالي</strong>
                  </div>
                  <div style={{ color: "rgba(255,255,255,.42)", fontWeight: 750, fontSize: 10.6 }}>قبل الضرائب والرسوم</div>
                </div>
                <button type="button" disabled={!termsAccepted} onClick={() => setBookingStep("review")} style={{ ...bookButtonStyle, opacity: termsAccepted ? 1 : .45 }}>Continue</button>
              </footer>
            </>
          ) : (
            <>
              <div style={bookingPageBodyStyle}>
                <div style={bookingCarCardStyle}>
                  <img src={gallery[0]} alt={car.name} style={bookingCarImageStyle} />
                  <div style={{ minWidth: 0 }}>
                    <h2 data-no-i18n="true" style={{ margin: 0, color: "#fff", fontSize: 16.5, fontWeight: 950, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{car.name}</h2>
                    <div style={{ marginTop: 5, color: "rgba(255,255,255,.56)", fontSize: 11.6, fontWeight: 800 }}>{car.year || 2024} · {rating} ★</div>
                    <div style={{ marginTop: 6, color: "rgba(255,255,255,.48)", fontSize: 11.2, fontWeight: 800 }}>{agency.name} · {car.wilaya}</div>
                  </div>
                </div>

                <div style={{ ...smallCardStyle, padding: 14, background: "rgba(255,255,255,.045)" }}>
                  <h3 style={{ margin: "0 0 12px", color: "#fff", fontSize: 16, fontWeight: 950 }}>مراجعة المعلومات</h3>
                  <ReviewRow label="تاريخ الاستلام" value={formatArabicDate(pickupDate)} />
                  <ReviewRow label="تاريخ الإرجاع" value={formatArabicDate(returnDate)} />
                  <ReviewRow label="الموقع" value={`${agency.name} · ${car.wilaya}`} />
                  <ReviewRow label="الاسم" value={fullDriverName} />
                  <ReviewRow label="رقم الهاتف" value={fullDriverPhone || "غير محدد"} />
                  <ReviewRow label="العمر" value={driverAge} />
                </div>

                <div style={{ ...smallCardStyle, padding: 14, background: "rgba(255,255,255,.045)" }}>
                  <h3 style={{ margin: "0 0 12px", color: "#fff", fontSize: 16, fontWeight: 950 }}>ملخص السعر</h3>
                  <div style={{ ...priceRowStyle, marginBottom: 9 }}><span>تسعيرة السيارة</span><strong>{formatDzd(baseTotal)}</strong></div>
                  <div style={{ ...priceRowStyle, marginBottom: 9 }}><span>Taxes / رسوم المنصة 5%</span><strong>{formatDzd(platformFee)}</strong></div>
                  <div style={{ ...priceRowStyle, color: "#fff", fontSize: 13.8, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,.08)" }}><span>السعر النهائي</span><strong>{formatDzd(total)}</strong></div>
                </div>
              </div>
              <footer style={bookingPageFooterStyle}>
                <div style={{ minWidth: 0 }}>
                  <strong style={realPriceStyle}>{formatDzd(total)} الإجمالي</strong>
                  <div style={{ color: "rgba(255,255,255,.42)", fontWeight: 750, fontSize: 10.6 }}>شامل رسوم المنصة 5%</div>
                </div>
                <button type="button" onClick={confirmBooking} style={bookButtonStyle}>تأكيد الحجز</button>
              </footer>
            </>
          )}
        </div>
      )}


      {bookingDone && (
        <div style={modalBackdropStyle} onClick={() => setBookingDone(false)}>
          <div style={successModalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 46, height: 46, borderRadius: 18, display: "grid", placeItems: "center", background: "rgba(124,58,237,.16)", color: "#C4B5FD", margin: "0 auto 10px" }}>
              <IconPhone size={22} color="currentColor" />
            </div>
            <p style={{ margin: 0, color: "rgba(255,255,255,.85)", fontSize: 14.2, lineHeight: 1.8, fontWeight: 850 }}>تم إرسال طلب الحجز بنجاح، ستتواصل معك الوكالة في أقرب وقت.</p>
            <button type="button" onClick={() => setBookingDone(false)} style={{ ...secondaryButtonStyle, marginTop: 15 }}>حسنًا</button>
          </div>
        </div>
      )}
    </main>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
      <span style={{ color: "rgba(255,255,255,.48)", fontSize: 11.5, fontWeight: 850 }}>{label}</span>
      <strong style={{ color: "#fff", fontSize: 12.4, fontWeight: 900, textAlign: "end" }}>{value}</strong>
    </div>
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
  gridTemplateColumns: "1fr minmax(132px, 38vw)",
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


const priceRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  color: "rgba(255,255,255,.58)",
  fontSize: 11.3,
  fontWeight: 850,
};

const footerPriceLineStyle = {
  display: "flex",
  alignItems: "baseline",
  flexWrap: "wrap",
  gap: 8,
  direction: "ltr",
};

const oldPriceStrikeStyle = {
  color: "rgba(255,255,255,.46)",
  textDecoration: "line-through",
  textDecorationThickness: 2,
  fontSize: 13.2,
  fontWeight: 900,
};

const realPriceStyle = {
  color: "#fff",
  fontSize: 16,
  fontWeight: 950,
  letterSpacing: ".1px",
};

const checkRowStyle = {
  display: "grid",
  gridTemplateColumns: "30px 1fr",
  alignItems: "start",
  gap: 11,
  padding: "12px 4px",
  color: "rgba(255,255,255,.9)",
  fontSize: 12.6,
  fontWeight: 850,
  lineHeight: 1.65,
};

const checkInputStyle = {
  width: 24,
  height: 24,
  accentColor: "#7C3AED",
};

const bookingPageStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 260,
  background: "#050506",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  animation: "fadeIn .2s ease",
};

const bookingPageHeaderStyle = {
  minHeight: 66,
  padding: "calc(max(12px, env(safe-area-inset-top)) + 4px) 16px 10px",
  display: "grid",
  gridTemplateColumns: "42px 1fr 42px",
  alignItems: "center",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,.075)",
  background: "rgba(8,8,10,.96)",
};

const bookingBackButtonStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.10)",
  background: "rgba(255,255,255,.055)",
  color: "#fff",
  display: "grid",
  placeItems: "center",
};

const bookingPageBodyStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "14px 16px 112px",
  display: "grid",
  alignContent: "start",
  gap: 12,
  WebkitOverflowScrolling: "touch",
};

const bookingCarCardStyle = {
  borderRadius: 22,
  background: "rgba(255,255,255,.045)",
  border: "1px solid rgba(255,255,255,.075)",
  padding: 12,
  display: "grid",
  gridTemplateColumns: "92px 1fr",
  gap: 12,
  alignItems: "center",
};

const bookingCarImageStyle = {
  width: 92,
  height: 78,
  borderRadius: 18,
  objectFit: "cover",
  border: "1px solid rgba(255,255,255,.09)",
};

const bookingPageFooterStyle = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 270,
  display: "grid",
  gridTemplateColumns: "1fr minmax(142px, 38vw)",
  alignItems: "center",
  gap: 10,
  padding: "10px 16px max(12px, env(safe-area-inset-bottom))",
  background: "rgba(5,5,6,.97)",
  borderTop: "1px solid rgba(255,255,255,.08)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
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
