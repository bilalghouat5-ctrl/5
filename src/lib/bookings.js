const KEY = "driverent_bookings";

function safeParse(value, fallback) {
  try { return JSON.parse(value) ?? fallback; } catch { return fallback; }
}

export function getBookings() {
  if (typeof localStorage === "undefined") return [];
  const rows = safeParse(localStorage.getItem(KEY), []);
  return Array.isArray(rows) ? rows : [];
}

export function saveBooking(payload) {
  const now = new Date().toISOString();
  const booking = {
    id: payload.id || `DR-${Date.now().toString(36).toUpperCase()}`,
    createdAt: now,
    status: payload.status || "pending",
    paymentStatus: payload.paymentStatus || "عند الاستلام",
    ...payload,
  };
  const next = [booking, ...getBookings()].slice(0, 50);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("driverent:booking-created", { detail: booking }));
  return booking;
}

export function clearBookings() {
  localStorage.removeItem(KEY);
}

export function formatTripDate(date) {
  if (!date) return "غير محدد";
  try {
    return new Intl.DateTimeFormat("ar-DZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
  } catch {
    return String(date);
  }
}
