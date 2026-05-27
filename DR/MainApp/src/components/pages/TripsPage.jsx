import { useEffect, useMemo, useState } from "react";
import { IconCar, IconPin, IconCalendar, IconSuccess, IconStar, IconClock, IconPhone, IconMoneyDzd } from "../ui/AppIcons.jsx";
import { getBookings, fetchBookings, mergeBookings, formatTripDate } from "../../lib/bookings.js";

const MOCK_TRIPS = [
  {
    id: 1, status: "active",
    car: "Mercedes S-Class", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80",
    wilaya: "الجزائر", from: "2026-05-20", to: "2026-05-23", days: 3,
    price: 45000, rating: 0, pickupPlace: "الوكالة", paymentStatus: "مدفوع",
  },
  {
    id: 2, status: "done",
    car: "Toyota RAV4", img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&q=80",
    wilaya: "وهران", from: "2026-04-10", to: "2026-04-14", days: 4,
    price: 28000, rating: 5, pickupPlace: "المطار", paymentStatus: "مدفوع",
  },
];

const STATUS_MAP = {
  pending:{ label: "بانتظار الوكالة", color: "#FBBF24", bg: "rgba(251,191,36,.1)", border: "rgba(251,191,36,.25)", icon: IconClock },
  active: { label: "جارية", color: "#34D399", bg: "rgba(52,211,153,.1)", border: "rgba(52,211,153,.25)", icon: IconSuccess },
  done:   { label: "منتهية", color: "rgba(255,255,255,.4)", bg: "rgba(255,255,255,.04)", border: "rgba(255,255,255,.08)", icon: IconSuccess },
};

export function TripsPage() {
  const [tab, setTab] = useState("all");
  const [stored, setStored] = useState(() => getBookings());

  useEffect(() => {
    let alive = true;
    const refresh = async () => {
      const local = getBookings();
      setStored(local);
      const remote = await fetchBookings();
      if (alive && remote.length) setStored(mergeBookings(local, remote));
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("driverent:booking-created", refresh);
    window.addEventListener("driverent:booking-synced", refresh);
    return () => {
      alive = false;
      window.removeEventListener("storage", refresh);
      window.removeEventListener("driverent:booking-created", refresh);
      window.removeEventListener("driverent:booking-synced", refresh);
    };
  }, []);

  const allTrips = useMemo(() => [...stored, ...MOCK_TRIPS], [stored]);
  const filtered = tab === "all" ? allTrips : allTrips.filter(t => t.status === tab);

  return (
    <div className="tiny-ui" style={{ paddingBottom: 100, animation: "fadeUp .35s ease" }}>
      <div style={{ padding: "24px 0 20px", textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 18, margin: "0 auto 14px",
          background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <IconCar size={26} color="#A78BFA"/>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>رحلاتي</h2>
        <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>{allTrips.length} طلبات ورحلات مسجّلة</p>
      </div>

      <div style={{
        display: "flex", gap: 3, background: "rgba(255,255,255,.04)",
        borderRadius: 13, padding: 4, marginBottom: 18,
        border: "1px solid rgba(255,255,255,.07)",
      }}>
        {[["all","الكل"],["pending","طلبات"],["active","جارية"],["done","منتهية"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: "9px 6px", borderRadius: 9, border: "none",
            fontFamily: "inherit", fontWeight: 700, fontSize: 12, cursor: "pointer",
            transition: "all .22s",
            background: tab === k ? "linear-gradient(135deg,#6D28D9,#4F46E5)" : "transparent",
            color: tab === k ? "#fff" : "rgba(255,255,255,.4)",
          }}>{l}</button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:"38px 16px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20}}>
          <IconCar size={28} color="rgba(255,255,255,.25)"/>
          <p style={{marginTop:10,color:"rgba(255,255,255,.4)",fontSize:13}}>لا توجد رحلات في هذا القسم</p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((trip, i) => {
          const s = STATUS_MAP[trip.status] || STATUS_MAP.pending;
          const StatusIcon = s.icon;
          return (
            <div key={trip.id} style={{
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 20, overflow: "hidden",
              animation: `fadeUp .35s ease ${i * .07}s both`,
            }}>
              <div style={{ position: "relative", height: 130 }}>
                <img src={trip.img} alt={trip.car} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 50%)" }}/>
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: s.bg, border: `1px solid ${s.border}`,
                  color: s.color, padding: "3px 10px", borderRadius: 20,
                  fontSize: 10, fontWeight: 800,
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <StatusIcon size={12} color={s.color}/>
                  {s.label}
                </div>
                <div style={{ position: "absolute", bottom: 10, right: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{trip.car}</div>
                  {trip.id?.toString?.().startsWith?.("DR-") && <div style={{fontSize:10,color:"rgba(255,255,255,.45)",marginTop:2}}>رقم الطلب: {trip.id}</div>}
                </div>
              </div>

              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                    <IconPin size={12} color="rgba(255,255,255,.45)"/>
                    {trip.wilaya} · {trip.pickupPlace || "الوكالة"}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                    <IconCalendar size={12} color="rgba(255,255,255,.45)"/>
                    {formatTripDate(trip.from)} ← {formatTripDate(trip.to)}
                  </div>
                  {trip.driverPhone && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                      <IconPhone size={12} color="rgba(255,255,255,.45)"/>
                      {trip.driverPhone}
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                    <IconMoneyDzd size={12} color="rgba(255,255,255,.45)"/>
                    {trip.paymentStatus || "عند الاستلام"}
                  </div>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.07)",
                }}>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#C084FC" }}>{trip.price.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}> دج · {trip.days} أيام</span>
                  </div>
                  {trip.status === "done" && trip.rating > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {Array.from({length: trip.rating}).map((_,idx) => (
                        <IconStar key={idx} size={12} color="#FBBF24"/>
                      ))}
                    </div>
                  )}
                  {trip.status !== "done" && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: s.bg, border: `1px solid ${s.border}`,
                      color: s.color, padding: "5px 12px", borderRadius: 20,
                      fontSize: 11, fontWeight: 700,
                    }}>
                      <StatusIcon size={13} color={s.color}/>
                      {s.label}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
