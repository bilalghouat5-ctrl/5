import { CARS } from "../../constants/data.js";
import { Stars } from "../ui/Stars.jsx";
import { IconHeart, IconPin, IconCar } from "../ui/AppIcons.jsx";

export function FavoritesPage({ liked, onLike, onOpenCar }) {
  const favCars = CARS.filter(c => liked.has(c.id));

  return (
    <div className="tiny-ui" style={{ paddingBottom: 100, animation: "fadeUp .35s ease" }}>

      {/* Header */}
      <div style={{ padding: "24px 0 20px", textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 18, margin: "0 auto 14px",
          background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <IconHeart active/>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>المفضلة</h2>
        <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>
          {favCars.length > 0 ? `${favCars.length} سيارة محفوظة` : "لم تحفظ أي سيارة بعد"}
        </p>
      </div>

      {favCars.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ marginBottom: 16, display:"flex", justifyContent:"center" }}><IconCar size={64} color="rgba(255,255,255,.22)"/></div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>
            قائمتك فارغة
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.25)" }}>
            اضغط على أيقونة القلب في أي سيارة لإضافتها هنا
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {favCars.map((car, i) => (
            <div key={car.id} onClick={() => onOpenCar(car)}
              className="btn-press"
              style={{
                display: "flex", gap: 14, alignItems: "center",
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 18, padding: 12, cursor: "pointer",
                animation: `fadeUp .35s ease ${i * .06}s both`,
              }}>
              <img src={car.img} alt={car.name} style={{
                width: 90, height: 68, objectFit: "cover",
                borderRadius: 12, flexShrink: 0,
              }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div data-no-i18n="true" style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 3,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {car.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6,
                  fontSize: 11, color: "rgba(255,255,255,.38)" }}>
                  <IconPin size={10} color="rgba(255,255,255,.38)"/>
                  {car.wilaya}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Stars r={car.rating} size={10}/>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#C084FC" }}>
                    {car.price.toLocaleString()}
                    <span style={{ fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,.35)" }}> دج/يوم</span>
                  </span>
                </div>
              </div>
              <button onClick={e => { e.stopPropagation(); onLike(car.id); }} style={{
                width: 34, height: 34, borderRadius: "50%", border: "none", flexShrink: 0,
                background: "rgba(239,68,68,.12)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconHeart active/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
