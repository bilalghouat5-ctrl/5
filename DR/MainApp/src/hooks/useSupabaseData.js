import { useState, useEffect } from "react";
import { dbSelect } from "../lib/supabase.js";

// ── helper: normalize a DB car row to match UI shape ────────────────────────
function normalizeCar(row) {
  return {
    id:         row.id,
    agencyId:   row.agency_id || row.agencyId || null,
    agencyName: row.agency_name || row.agencyName || "",
    name:       row.name,
    type:       row.type       || "sedan",
    price:      row.price      || 0,
    rating:     parseFloat(row.rating) || 0,
    trips:      row.trips      || 0,
    reviews:    row.reviews    || 0,
    year:       row.year       || new Date().getFullYear(),
    seats:      row.seats      || 5,
    wilaya:     row.wilaya     || "الجزائر",
    city:       row.city       || row.wilaya || "",
    img:        row.img || row.image || "",
    images:     Array.isArray(row.images) ? row.images : [],
    badge:      row.badge      || "",
    verified:   row.verified   || false,
    fuel:       row.fuel       || "",
    trans:      row.trans      || "",
    freeCancel: row.free_cancel || false,
    available:  row.available !== false,
    status:     row.status || "approved",
  };
}

function normalizeAgency(row) {
  return {
    id:       row.id,
    name:     row.name,
    wilaya:   row.wilaya || row.city || "الجزائر",
    city:     row.city || row.wilaya || "",
    rating:   parseFloat(row.rating) || 0,
    cars:     row.cars || row.cars_count || 0,
    badge:    row.badge || "",
    color:    row.color || "#7C3AED",
    img:      row.img || "",
    images:   Array.isArray(row.images) ? row.images : [],
    phone:    row.phone || "",
    whatsapp: row.whatsapp || "",
    email:    row.email || "",
    address:  row.address || "",
    description: row.description || "",
    status:   row.status || "pending",
  };
}

// ── useCars ─────────────────────────────────────────────────────────────────
export function useCars() {
  const [cars, setCars]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let alive = true;
    dbSelect("cars", "?status=in.(approved,available)&order=created_at.desc")
      .then(rows => { if (alive) setCars((rows || []).map(normalizeCar)); })
      .catch(err => { if (alive) { console.warn("Supabase cars fetch failed:", err.message); setError(err.message); setCars([]); } })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { cars, loading, error };
}

// ── useAgencies ─────────────────────────────────────────────────────────────
export function useAgencies() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let alive = true;
    dbSelect("agencies", "?status=in.(approved,active)&order=created_at.desc")
      .then(rows => { if (alive) setAgencies((rows || []).map(normalizeAgency)); })
      .catch(err => { if (alive) { console.warn("Supabase agencies fetch failed:", err.message); setError(err.message); setAgencies([]); } })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return { agencies, loading, error };
}

// ── useCarsByType – used by Wedding / Luxury / Month sections ───────────────
export function useCarsByType(type) {
  const [cars, setCars]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const query = type === "month"
      ? "?status=in.(approved,available)&order=requests.desc&limit=10"
      : `?type=eq.${encodeURIComponent(type)}&status=in.(approved,available)&order=created_at.desc`;

    dbSelect("cars", query)
      .then(rows => { if (alive) setCars((rows || []).map(normalizeCar)); })
      .catch(err => { if (alive) { console.warn(`Supabase ${type} cars failed:`, err.message); setCars([]); } })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [type]);

  return { cars, loading };
}
