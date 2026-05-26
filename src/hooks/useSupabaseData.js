import { useState, useEffect } from "react";
import { dbSelect } from "../lib/supabase.js";
import {
  CARS, AGENCIES, MONTH_CARS, WEDDING_CARS, LUXURY_CARS
} from "../constants/data.js";

// ── helper: normalize a DB car row to match local shape ─────────────────────
function normalizeCar(row) {
  return {
    id:         row.id,
    name:       row.name,
    type:       row.type       || "sedan",
    price:      row.price      || 0,
    rating:     parseFloat(row.rating) || 4.5,
    trips:      row.trips      || 0,
    reviews:    row.reviews    || 0,
    year:       row.year       || 2023,
    seats:      row.seats      || 5,
    wilaya:     row.wilaya     || "الجزائر",
    img:        row.img        || "",
    badge:      row.badge      || "",
    verified:   row.verified   || false,
    fuel:       row.fuel       || "بنزين",
    trans:      row.trans      || "أوتوماتيك",
    freeCancel: row.free_cancel || false,
  };
}

function normalizeAgency(row) {
  return {
    id:      row.id,
    name:    row.name,
    wilaya:  row.wilaya  || "الجزائر",
    rating:  parseFloat(row.rating) || 4.5,
    cars:    row.cars    || 0,
    badge:   row.badge   || "",
    color:   row.color   || "#7C3AED",
    img:     row.img     || "",
    phone:   row.phone   || "",
    email:   row.email   || "",
  };
}

// ── useCars ─────────────────────────────────────────────────────────────────
export function useCars() {
  const [cars, setCars]       = useState(CARS);          // fallback = static
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    dbSelect("cars", "?order=trips.desc")
      .then(rows => {
        if (rows && rows.length > 0) {
          setCars(rows.map(normalizeCar));
        }
        // if empty DB → keep static fallback data
      })
      .catch(err => {
        console.warn("Supabase cars fetch failed, using static data:", err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { cars, loading, error };
}

// ── useAgencies ─────────────────────────────────────────────────────────────
export function useAgencies() {
  const [agencies, setAgencies] = useState(AGENCIES);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    dbSelect("agencies", "?order=rating.desc")
      .then(rows => {
        if (rows && rows.length > 0) {
          setAgencies(rows.map(normalizeAgency));
        }
      })
      .catch(err => {
        console.warn("Supabase agencies fetch failed, using static data:", err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { agencies, loading, error };
}

// ── useCarsByType – used by Wedding / Luxury / Month sections ────────────────
export function useCarsByType(type) {
  const fallback = {
    wedding: WEDDING_CARS,
    luxury:  LUXURY_CARS,
    month:   MONTH_CARS,
  }[type] ?? CARS;

  const [cars, setCars]       = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = type === "month"
      ? "?order=trips.desc&limit=10"
      : `?type=eq.${type}&order=rating.desc`;

    dbSelect("cars", query)
      .then(rows => {
        if (rows && rows.length > 0) setCars(rows.map(normalizeCar));
      })
      .catch(err => console.warn(`Supabase ${type} cars failed:`, err.message))
      .finally(() => setLoading(false));
  }, [type]);

  return { cars, loading };
}
