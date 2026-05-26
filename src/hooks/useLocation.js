import { useState, useCallback } from "react";

// 58 Algerian wilayas with approximate center coordinates for local suggestions.
const WILAYAS = [
  { name: "أدرار", lat: 27.8743, lng: -0.2939 }, { name: "الشلف", lat: 36.1653, lng: 1.3345 },
  { name: "الأغواط", lat: 33.8078, lng: 2.8628 }, { name: "أم البواقي", lat: 35.8754, lng: 7.1135 },
  { name: "باتنة", lat: 35.5551, lng: 6.1741 }, { name: "بجاية", lat: 36.7515, lng: 5.0564 },
  { name: "بسكرة", lat: 34.8503, lng: 5.7278 }, { name: "بشار", lat: 31.6167, lng: -2.2167 },
  { name: "البليدة", lat: 36.4692, lng: 2.8277 }, { name: "البويرة", lat: 36.3749, lng: 3.9020 },
  { name: "تمنراست", lat: 22.7850, lng: 5.5228 }, { name: "تبسة", lat: 35.4042, lng: 8.1242 },
  { name: "تلمسان", lat: 34.8828, lng: -1.3167 }, { name: "تيارت", lat: 35.3710, lng: 1.3170 },
  { name: "تيزي وزو", lat: 36.7167, lng: 4.0500 }, { name: "الجزائر", lat: 36.7538, lng: 3.0588 },
  { name: "الجلفة", lat: 34.6704, lng: 3.2504 }, { name: "جيجل", lat: 36.8200, lng: 5.7667 },
  { name: "سطيف", lat: 36.1898, lng: 5.4108 }, { name: "سعيدة", lat: 34.8413, lng: 0.1484 },
  { name: "سكيكدة", lat: 36.8667, lng: 6.9000 }, { name: "سيدي بلعباس", lat: 35.1833, lng: -0.6333 },
  { name: "عنابة", lat: 36.9000, lng: 7.7667 }, { name: "قالمة", lat: 36.4613, lng: 7.4281 },
  { name: "قسنطينة", lat: 36.3650, lng: 6.6147 }, { name: "المدية", lat: 36.2638, lng: 2.7539 },
  { name: "مستغانم", lat: 35.9311, lng: 0.0888 }, { name: "المسيلة", lat: 35.7058, lng: 4.5419 },
  { name: "معسكر", lat: 35.3967, lng: 0.1403 }, { name: "ورقلة", lat: 31.9500, lng: 5.3333 },
  { name: "وهران", lat: 35.6969, lng: -0.6331 }, { name: "البيض", lat: 33.6832, lng: 1.0193 },
  { name: "إليزي", lat: 26.4833, lng: 8.4667 }, { name: "برج بوعريريج", lat: 36.0732, lng: 4.7611 },
  { name: "بومرداس", lat: 36.7639, lng: 3.4769 }, { name: "الطارف", lat: 36.7672, lng: 8.3138 },
  { name: "تندوف", lat: 27.6711, lng: -8.1474 }, { name: "تيسمسيلت", lat: 35.6072, lng: 1.8108 },
  { name: "الوادي", lat: 33.3683, lng: 6.8674 }, { name: "خنشلة", lat: 35.4358, lng: 7.1433 },
  { name: "سوق أهراس", lat: 36.2864, lng: 7.9511 }, { name: "تيبازة", lat: 36.5900, lng: 2.4475 },
  { name: "ميلة", lat: 36.4503, lng: 6.2644 }, { name: "عين الدفلى", lat: 36.2667, lng: 1.9667 },
  { name: "النعامة", lat: 33.2667, lng: -0.3167 }, { name: "عين تموشنت", lat: 35.3000, lng: -1.1400 },
  { name: "غرداية", lat: 32.4891, lng: 3.6738 }, { name: "غليزان", lat: 35.7373, lng: 0.5559 },
  { name: "تيميمون", lat: 29.2639, lng: 0.2310 }, { name: "برج باجي مختار", lat: 21.3333, lng: 0.9500 },
  { name: "أولاد جلال", lat: 34.4254, lng: 5.0644 }, { name: "بني عباس", lat: 30.1331, lng: -2.1667 },
  { name: "عين صالح", lat: 27.1930, lng: 2.4607 }, { name: "عين قزام", lat: 19.5667, lng: 5.7667 },
  { name: "تقرت", lat: 33.1000, lng: 6.0667 }, { name: "جانت", lat: 24.5528, lng: 9.4823 },
  { name: "المغير", lat: 33.9500, lng: 5.9333 }, { name: "المنيعة", lat: 30.5833, lng: 2.8833 },
];

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearestWilaya(lat, lng) {
  let nearest = WILAYAS[0];
  let minDist = Infinity;
  for (const w of WILAYAS) {
    const d = haversineDistance(lat, lng, w.lat, w.lng);
    if (d < minDist) { minDist = d; nearest = w; }
  }
  return nearest.name;
}

export function getWilayaDistance(fromWilaya, toWilaya) {
  const a = WILAYAS.find(w => w.name === fromWilaya);
  const b = WILAYAS.find(w => w.name === toWilaya);
  if (!a || !b) return null;
  return Math.round(haversineDistance(a.lat, a.lng, b.lat, b.lng));
}

export function useLocation() {
  const [state, setState] = useState({
    status: "idle",
    wilaya: null,
    coords: null,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, status: "unavailable", error: "خدمة الموقع غير متاحة على هذا الجهاز" }));
      return;
    }
    setState(s => ({ ...s, status: "requesting", error: null }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const wilaya = getNearestWilaya(latitude, longitude);
        setState({ status: "granted", wilaya, coords: { lat: latitude, lng: longitude }, error: null });
      },
      (err) => {
        setState({ status: "denied", wilaya: null, coords: null, error: err.message });
      },
      { timeout: 10000, maximumAge: 300000, enableHighAccuracy: true }
    );
  }, []);

  return { ...state, requestLocation };
}
