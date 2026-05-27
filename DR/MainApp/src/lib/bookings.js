import { dbInsert, dbSelect, getCurrentUser, normalizeBookingRow } from './supabase.js';

const KEY = 'driverent_bookings';

function safeParse(value, fallback) {
  try { return JSON.parse(value) ?? fallback; } catch { return fallback; }
}

function makeBookingId() {
  return `DR-${Date.now().toString(36).toUpperCase()}`;
}

function localRows() {
  if (typeof localStorage === 'undefined') return [];
  const rows = safeParse(localStorage.getItem(KEY), []);
  return Array.isArray(rows) ? rows : [];
}

export function getBookings() {
  return localRows();
}

export async function fetchBookings() {
  const user = getCurrentUser();
  const userFilter = user?.id ? `?user_id=eq.${encodeURIComponent(user.id)}&order=created_at.desc` : '?order=created_at.desc&limit=20';
  try {
    const rows = await dbSelect('bookings', userFilter);
    return rows.map(normalizeBookingRow);
  } catch (err) {
    console.warn('Supabase bookings fetch failed:', err.message);
    return [];
  }
}

function toRemoteBooking(booking) {
  const user = getCurrentUser();
  return {
    id: String(booking.id),
    user_id: user?.id || null,
    user_name: booking.driverName || user?.user_metadata?.full_name || 'مستخدم RENT درايف',
    user_email: user?.email || null,
    agency_id: booking.agencyId ? String(booking.agencyId) : null,
    agency_name: booking.agencyName || booking.pickupPlace || 'الوكالة',
    car_id: booking.carId ? String(booking.carId) : null,
    car_name: booking.car || 'سيارة',
    car_image: booking.img || '',
    wilaya: booking.wilaya || 'الجزائر',
    pickup_date: booking.from,
    return_date: booking.to,
    days: Number(booking.days || 1),
    daily_price: Number(booking.dailyPrice || 0),
    base_price: Number(booking.basePrice || 0),
    platform_fee: Number(booking.serviceFee || 0),
    total_price: Number(booking.price || 0),
    old_display_price: Number(booking.oldDisplayPrice || 0),
    pickup_place: booking.pickupPlace || 'الوكالة',
    driver_name: booking.driverName || 'مستخدم RENT درايف',
    driver_phone: booking.driverPhone || '',
    driver_age: String(booking.driverAge || ''),
    payment_status: booking.paymentStatus || 'عند الاستلام',
    status: booking.status || 'pending',
  };
}

export function saveBooking(payload) {
  const now = new Date().toISOString();
  const booking = {
    id: payload.id || makeBookingId(),
    createdAt: now,
    status: payload.status || 'pending',
    paymentStatus: payload.paymentStatus || 'عند الاستلام',
    ...payload,
  };

  if (typeof localStorage !== 'undefined') {
    const next = [booking, ...localRows().filter(x => String(x.id) !== String(booking.id))].slice(0, 50);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  window.dispatchEvent(new CustomEvent('driverent:booking-created', { detail: booking }));

  dbInsert('bookings', toRemoteBooking(booking))
    .then(rows => {
      window.dispatchEvent(new CustomEvent('driverent:booking-synced', { detail: rows?.[0] || booking }));
    })
    .catch(err => console.warn('Supabase booking save failed, kept locally:', err.message));

  return booking;
}

export function mergeBookings(local = [], remote = []) {
  const map = new Map();
  [...remote, ...local].forEach(row => {
    if (row?.id) map.set(String(row.id), row);
  });
  return [...map.values()].sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
}

export function formatTripDate(value) {
  if (!value) return '';
  try {
    return new Intl.DateTimeFormat('ar-DZ', { day: '2-digit', month: 'short' }).format(new Date(value));
  } catch {
    return value;
  }
}
