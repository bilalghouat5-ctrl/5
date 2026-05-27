/**
 * AppIcons.jsx
 * منصة أيقونات درايف Rent الموحدة.
 * كل أيقونات الصفحات تستدعي نفس مجموعة SVG الموجودة كذلك في public/icons.
 */

const ACTIVE = "#A78BFA";
const INACTIVE = "rgba(255,255,255,.42)";

export const PLATFORM_ICON_PATHS = {
  "agency-badge": "<path d=\"M12 2l7 4v6c0 5-3 8-7 10-4-2-7-5-7-10V6l7-4Z\" />\n  <path d=\"M9 12h6\" />\n  <path d=\"M9 16h6\" />\n  <path d=\"M10 8h4\" />",
  "agency-building": "<path d=\"M4 21V7l8-4 8 4v14\" />\n  <path d=\"M8 21v-5h8v5\" />\n  <path d=\"M8 10h.01\" />\n  <path d=\"M12 10h.01\" />\n  <path d=\"M16 10h.01\" />\n  <path d=\"M8 14h.01\" />\n  <path d=\"M12 14h.01\" />\n  <path d=\"M16 14h.01\" />",
  "alert": "<path d=\"M12 9v4\" />\n  <path d=\"M12 17h.01\" />\n  <path d=\"M10.3 3.9 2 0 8.7 15.1a2 2 0 0 1-1.7 3H4.7a2 2 0 0 1-1.7-3l7.3-15.1Z\" />",
  "bell": "<path d=\"M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9\" />\n  <path d=\"M10 21h4\" />",
  "booking": "<path d=\"M6 4h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2Z\" />\n  <path d=\"M8 9h8\" />\n  <path d=\"M8 13h6\" />",
  "calendar": "<path d=\"M7 3v4\" />\n  <path d=\"M17 3v4\" />\n  <path d=\"M4 8h16\" />\n  <path d=\"M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z\" />",
  "camera": "<path d=\"M4 8h3l2-3h6l2 3h3v12H4V8Z\" />\n  <path d=\"M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z\" />",
  "car": "<path d=\"M5 17h14l-1.5-5.5A3 3 0 0 0 14.6 9H9.4a3 3 0 0 0-2.9 2.5L5 17Z\" />\n  <path d=\"M7 17v2\" />\n  <path d=\"M17 17v2\" />\n  <path d=\"M7.5 13h9\" />",
  "card": "<path d=\"M3 6h18v12H3V6Z\" />\n  <path d=\"M3 10h18\" />\n  <path d=\"M7 15h4\" />",
  "chart": "<path d=\"M4 19V5\" />\n  <path d=\"M4 19h16\" />\n  <path d=\"M8 16v-5\" />\n  <path d=\"M12 16V8\" />\n  <path d=\"M16 16v-8\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "clock": "<path d=\"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z\" />\n  <path d=\"M12 6v6l4 2\" />",
  "coupon": "<path d=\"M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V7Z\" />\n  <path d=\"M9 9v10\" />",
  "download": "<path d=\"M12 3v12\" />\n  <path d=\"m7 10 5 5 5-5\" />\n  <path d=\"M5 21h14\" />",
  "document": "<path d=\"M6 2h8l4 4v16H6V2Z\" />\n  <path d=\"M14 2v5h5\" />\n  <path d=\"M9 13h6\" />\n  <path d=\"M9 17h6\" />\n  <path d=\"M9 9h2\" />",
  "driver-license": "<path d=\"M4 4h16v16H4V4Z\" />\n  <path d=\"M8 8h.01\" />\n  <path d=\"M8 12h8\" />\n  <path d=\"M8 16h6\" />\n  <path d=\"M15 8h1\" />",
  "electric": "<path d=\"M13 2 6 13h6l-1 9 7-12h-6l1-8Z\" />",
  "filter": "<path d=\"M4 5h16\" />\n  <path d=\"M7 12h10\" />\n  <path d=\"M10 19h4\" />",
  "fuel": "<path d=\"M5 3h9v18H5V3Z\" />\n  <path d=\"M14 8h2l3 3v7a2 2 0 0 1-4 0v-3\" />\n  <path d=\"M7 7h5\" />",
  "garage": "<path d=\"M3 11 12 4l9 7v10H3V11Z\" />\n  <path d=\"M8 21v-7h8v7\" />\n  <path d=\"M8 14h8\" />",
  "gauge": "<path d=\"M4 14a8 8 0 1 1 16 0\" />\n  <path d=\"M12 14l4-4\" />\n  <path d=\"M12 18h.01\" />",
  "globe": "<path d=\"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z\" />\n  <path d=\"M2 12h20\" />\n  <path d=\"M12 2a15 15 0 0 1 0 20\" />\n  <path d=\"M12 2a15 15 0 0 0 0 20\" />",
  "grid": "<path d=\"M4 4h7v7H4V4Z\" />\n  <path d=\"M13 4h7v7h-7V4Z\" />\n  <path d=\"M4 13h7v7H4v-7Z\" />\n  <path d=\"M13 13h7v7h-7v-7Z\" />",
  "heart": "<path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z\" />",
  "home": "<path d=\"M3 11 12 3l9 8\" />\n  <path d=\"M5 10v10h14V10\" />\n  <path d=\"M9 20v-6h6v6\" />",
  "id-card": "<path d=\"M3 5h18v14H3V5Z\" />\n  <path d=\"M7 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z\" />\n  <path d=\"M5 15c1-2 3-2 4-2s3 0 4 2\" />\n  <path d=\"M15 9h4\" />\n  <path d=\"M15 13h4\" />",
  "insurance": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z\" />\n  <path d=\"M8 12h8\" />\n  <path d=\"M12 8v8\" />",
  "key": "<path d=\"M14 14a5 5 0 1 0-3.5-3.5L3 18v3h3l2-2h2v-2h2l2-3Z\" />\n  <path d=\"M16 8h.01\" />",
  "language": "<path d=\"M4 5h10\" />\n  <path d=\"M9 5c0 5-2 8-5 10\" />\n  <path d=\"M6 9c1.5 2.5 3.5 4.5 7 6\" />\n  <path d=\"M14 21l4-10 4 10\" />\n  <path d=\"M15.5 17h5\" />",
  "lock": "<path d=\"M6 10V8a6 6 0 1 1 12 0v2\" />\n  <path d=\"M5 10h14v11H5V10Z\" />\n  <path d=\"M12 15v2\" />",
  "logout": "<path d=\"M10 17l5-5-5-5\" />\n  <path d=\"M15 12H3\" />\n  <path d=\"M21 3v18\" />",
  "maintenance": "<path d=\"M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-3 3-3-3 3-3Z\" />",
  "map": "<path d=\"M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z\" />\n  <path d=\"M9 3v15\" />\n  <path d=\"M15 6v15\" />",
  "menu": "<path d=\"M4 7h16\" />\n  <path d=\"M4 12h16\" />\n  <path d=\"M4 17h16\" />",
  "message": "<path d=\"M4 5h16v11H8l-4 4V5Z\" />",
  "money-dzd": "<path d=\"M5 5h14\" />\n  <path d=\"M5 19h14\" />\n  <path d=\"M7 5v14\" />\n  <path d=\"M17 5v14\" />\n  <path d=\"M9 9h6a3 3 0 0 1 0 6H9V9Z\" />",
  "percent": "<path d=\"M19 5 5 19\" />\n  <path d=\"M7 7h.01\" />\n  <path d=\"M17 17h.01\" />",
  "phone": "<path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 1.9Z\" />",
  "plus": "<path d=\"M12 5v14\" />\n  <path d=\"M5 12h14\" />",
  "profile": "<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\" />\n  <path d=\"M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z\" />",
  "qr": "<path d=\"M4 4h6v6H4V4Z\" />\n  <path d=\"M14 4h6v6h-6V4Z\" />\n  <path d=\"M4 14h6v6H4v-6Z\" />\n  <path d=\"M14 14h2\" />\n  <path d=\"M18 14h2\" />\n  <path d=\"M14 18h6\" />\n  <path d=\"M18 16v4\" />",
  "route": "<path d=\"M4 6a2 2 0 1 0 0 .01\" />\n  <path d=\"M20 18a2 2 0 1 0 0 .01\" />\n  <path d=\"M6 6h6a4 4 0 0 1 0 8H8a4 4 0 0 0 0 8h10\" />",
  "send": "<path d=\"M22 2 11 13\" />\n  <path d=\"m22 2-7 20-4-9-9-4 20-7Z\" />",
  "search": "<path d=\"m21 21-4.3-4.3\" />\n  <path d=\"M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z\" />",
  "sedan": "<path d=\"M4 16h16l-1.8-4.8A3 3 0 0 0 15.4 9H8.6a3 3 0 0 0-2.8 2.2L4 16Z\" />\n  <path d=\"M6 16v2\" />\n  <path d=\"M18 16v2\" />\n  <path d=\"M8 13h8\" />",
  "settings": "<path d=\"M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z\" />\n  <path d=\"M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.6 1Z\" />",
  "shield": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z\" />\n  <path d=\"m9 12 2 2 4-5\" />",
  "sliders": "<path d=\"M4 6h10\" />\n  <path d=\"M18 6h2\" />\n  <path d=\"M4 12h2\" />\n  <path d=\"M10 12h10\" />\n  <path d=\"M4 18h8\" />\n  <path d=\"M16 18h4\" />\n  <path d=\"M14 4v4\" />\n  <path d=\"M8 10v4\" />\n  <path d=\"M14 16v4\" />",
  "sort": "<path d=\"M7 4v16\" />\n  <path d=\"m4 7 3-3 3 3\" />\n  <path d=\"M17 20V4\" />\n  <path d=\"m14 17 3 3 3-3\" />",

  "share": "<path d=\"M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 0 6 3 3 0 0 0 2.83-2H18Z\" />\n  <path d=\"M6 16a3 3 0 1 0 2.83 4H9a3 3 0 0 0 0-6 3 3 0 0 0-2.83 2H6Z\" />\n  <path d=\"M15 7 9 11\" />\n  <path d=\"M9 13l6 4\" />",
  "gearbox": "<path d=\"M7 4v16\" />\n  <path d=\"M17 4v16\" />\n  <path d=\"M7 8h10\" />\n  <path d=\"M7 16h10\" />\n  <path d=\"M12 8v8\" />",
  "share-upload": "<path d=\"M12 16V4\" />\\n  <path d=\"m7 9 5-5 5 5\" />\\n  <path d=\"M5 13v6h14v-6\" />",
  "odometer": "<path d=\"M4 15a8 8 0 1 1 16 0\" />\\n  <path d=\"M12 15l4-5\" />\\n  <path d=\"M8 16h8\" />",
  "compact-seat": "<path d=\"M8 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z\" />\\n  <path d=\"M4 20v-2a4 4 0 0 1 4-4h2\" />\\n  <path d=\"M13 7h4a2 2 0 0 1 2 2v7\" />\\n  <path d=\"M13 13h6\" />\\n  <path d=\"M19 16v4\" />",
  "compact-fuel": "<path d=\"M6 4h8v16H6V4Z\" />\\n  <path d=\"M8 8h4\" />\\n  <path d=\"M14 8h2l3 3v6a2 2 0 0 1-4 0v-3\" />",
  "compact-gearbox": "<circle cx=\"7\" cy=\"6\" r=\"2\" />\\n  <circle cx=\"17\" cy=\"6\" r=\"2\" />\\n  <circle cx=\"7\" cy=\"18\" r=\"2\" />\\n  <circle cx=\"17\" cy=\"18\" r=\"2\" />\\n  <path d=\"M7 8v8\" />\\n  <path d=\"M17 8v8\" />\\n  <path d=\"M9 6h6\" />\\n  <path d=\"M9 18h6\" />",
  "spark": "<path d=\"M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z\" />",
  "star": "<path d=\"m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.9 6.6 19.8l1-6.1L3.2 9.4l6.1-.9L12 3Z\" />",
  "support": "<path d=\"M4 13v-1a8 8 0 1 1 16 0v1\" />\n  <path d=\"M4 13h3v5H4v-5Z\" />\n  <path d=\"M17 13h3v5h-3v-5Z\" />\n  <path d=\"M20 18c0 2-2 3-5 3h-2\" />",
  "suv": "<path d=\"M3 16h18l-2-6H7l-4 6Z\" />\n  <path d=\"M6 16v2\" />\n  <path d=\"M18 16v2\" />\n  <path d=\"M8 10V7h7l4 3\" />",
  "target-location": "<path d=\"M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z\" />\n  <path d=\"M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z\" />",
  "upload": "<path d=\"M12 3v12\" />\n  <path d=\"m7 8 5-5 5 5\" />\n  <path d=\"M4 17v3h16v-3\" />",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2\" />\n  <path d=\"M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z\" />\n  <path d=\"M22 21v-2a4 4 0 0 0-3-3.8\" />\n  <path d=\"M16 3.1a4 4 0 0 1 0 7.8\" />",
  "wallet": "<path d=\"M4 7h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12\" />\n  <path d=\"M16 13h4\" />",
  "whatsapp": "<path d=\"M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 21l1.7-4.7A8.5 8.5 0 1 1 20.5 11.8Z\" />\n  <path d=\"M8.5 8.5c.6 3.4 3.6 6.2 7 7\" />",
  "x": "<path d=\"M18 6 6 18\" />\n  <path d=\"M6 6l12 12\" />",
  "back": "<path d=\"M15 18 9 12l6-6\" />",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\" />",
  "minus": "<path d=\"M5 12h14\" />",
  "eye": "<path d=\"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z\" /><path d=\"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z\" />",
  "eye-off": "<path d=\"M3 3l18 18\" /><path d=\"M10.7 5.2A10.6 10.6 0 0 1 12 5c6 0 10 7 10 7a18 18 0 0 1-2.2 3.1\" /><path d=\"M6.1 6.1C3.6 7.8 2 12 2 12s4 7 10 7c1.4 0 2.7-.4 3.9-1\" />",
  "login": "<path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\" /><path d=\"m10 17 5-5-5-5\" /><path d=\"M15 12H3\" />",
  "user-plus": "<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\" /><path d=\"M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z\" /><path d=\"M19 8v6\" /><path d=\"M22 11h-6\" />",
  "spinner": "<path d=\"M12 3a9 9 0 0 1 9 9\" /><path d=\"M12 21a9 9 0 0 1-9-9\" opacity=\".35\" />",
  "diamond": "<path d=\"M6 3h12l4 6-10 12L2 9 6 3Z\" /><path d=\"M2 9h20\" /><path d=\"M9 3 7 9l5 12 5-12-2-6\" />",
  "wedding": "<path d=\"M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z\" /><path d=\"M9 10a3 3 0 0 1 6 0\" />",
  "seat": "<path d=\"M7 4v7a3 3 0 0 0 3 3h7\" /><path d=\"M10 14v5\" /><path d=\"M6 20h12\" /><path d=\"M14 14h4v5\" />",
  "crown": "<path d=\"M3 18h18\" /><path d=\"M5 18 4 8l5 4 3-7 3 7 5-4-1 10\" />"
};

export function IconGlyph({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  fill = "none",
  active = false,
  className,
  style,
  title,
}) {
  const html = PLATFORM_ICON_PATHS[name] || PLATFORM_ICON_PATHS.spark || "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
      style={{ color: active ? ACTIVE : color, display: "inline-block", flexShrink: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: title ? `<title>${title}</title>${html}` : html }}
    />
  );
}

function PIcon(name, defaults = {}) {
  return function PlatformIcon({ size = defaults.size || 20, color = defaults.color || "currentColor", active = false, filled = false, style, ...rest }) {
    const c = active ? (defaults.activeColor || ACTIVE) : color;
    return <IconGlyph name={name} size={size} color={c} fill={filled ? "currentColor" : "none"} style={style} {...rest} />;
  };
}

// Navigation icons
export function IconSearch({ active = false, size = 24, color }) { return <IconGlyph name="search" size={size} color={color || (active ? ACTIVE : INACTIVE)} />; }
export function IconHeart({ active = false, size = 24, color }) { return <IconGlyph name="heart" size={size} color={color || (active ? ACTIVE : INACTIVE)} fill={active ? "currentColor" : "none"} />; }
export function IconRoad({ active = false, size = 24, color }) { return <IconGlyph name="route" size={size} color={color || (active ? ACTIVE : INACTIVE)} />; }
export function IconBubble({ active = false, size = 24, color }) { return <IconGlyph name="message" size={size} color={color || (active ? ACTIVE : INACTIVE)} />; }
export function IconMore({ active = false, size = 24, color }) {
  const c = color || (active ? ACTIVE : INACTIVE);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ color: c, display: "inline-block", flexShrink: 0 }}>
      <circle cx="5" cy="12" r="2.2" fill="currentColor" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <circle cx="19" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}

// General app icons used across pages
export const IconBack = PIcon("back");
export const IconClose = PIcon("x");
export function IconLike({ size = 18, active = false, color = "rgba(255,255,255,.85)" }) {
  return <IconGlyph name="heart" size={size} color={active ? "#EF4444" : color} fill={active ? "currentColor" : "none"} />;
}
export const IconShare = PIcon("share");

export const IconShareUpload = PIcon("share-upload");
export const IconOdometer = PIcon("odometer");
export const IconCompactSeat = PIcon("compact-seat");
export const IconCompactFuel = PIcon("compact-fuel");
export const IconCompactGearbox = PIcon("compact-gearbox");
export const IconTransmission = PIcon("gearbox");
export const IconSearchSm = PIcon("search");
export const IconFilter = PIcon("filter");
export const IconSliders = PIcon("sliders");
export const IconCalendar = PIcon("calendar");
export const IconSeat = PIcon("seat");
export const IconFuel = PIcon("fuel");
export const IconGear = PIcon("settings");
export const IconPin = PIcon("target-location");
export const IconMap = PIcon("map");
export const IconVerified = PIcon("shield", { color: "#34D399" });
export function IconStar({ size = 14, filled = true, color = "#FBBF24" }) {
  return <IconGlyph name="star" size={size} color={color} fill={filled ? "currentColor" : "none"} />;
}
export const IconBuilding = PIcon("agency-building");
export const IconCar = PIcon("car");
export const IconSedan = PIcon("sedan");
export const IconSuv = PIcon("suv");
export const IconCrown = PIcon("crown");
export const IconWedding = PIcon("wedding");
export const IconSuccess = PIcon("check", { color: "#34D399" });
export const IconPlus = PIcon("plus");
export const IconMinus = PIcon("minus");
export const IconChevronRight = PIcon("chevron-right");
export const IconMpg = PIcon("gauge");
export const IconClock = PIcon("clock");
export const IconLock = PIcon("lock");
export const IconLanguage = PIcon("language");
export const IconBell = PIcon("bell");
export const IconCard = PIcon("card");
export const IconWallet = PIcon("wallet");
export const IconPhone = PIcon("phone");
export const IconDocument = PIcon("document");
export const IconDownload = PIcon("download");
export const IconSupport = PIcon("support");
export const IconKey = PIcon("key");
export const IconIdCard = PIcon("id-card");
export const IconDriverLicense = PIcon("driver-license");
export const IconInsurance = PIcon("insurance");
export const IconMoneyDzd = PIcon("money-dzd");
export const IconElectric = PIcon("electric");
export const IconSpark = PIcon("spark");
export const IconSend = PIcon("send");
export const IconGrid = PIcon("grid");
export const IconMenu = PIcon("menu");
export const IconUpload = PIcon("upload");
export const IconAlert = PIcon("alert");
export const IconCoupon = PIcon("coupon");
export const IconPercent = PIcon("percent");
export const IconWhatsapp = PIcon("whatsapp");
export const IconLogin = PIcon("login");
export const IconUserPlus = PIcon("user-plus");
export const IconEye = PIcon("eye");
export const IconEyeOff = PIcon("eye-off");
export function IconLoader({ size = 18, color = "#fff" }) {
  return <IconGlyph name="spinner" size={size} color={color} style={{ animation: "spin .75s linear infinite" }} />;
}

// Backward-compatible alias used by auth/security pages
export const IconShield = IconVerified;

export function IconApple({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 814 1000" fill={color} aria-hidden="true">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.7-49 192.5-49 30.8 0 134.2 2.8 197.6 107.5zm-166.5-115.1c-30.2 35.6-81.1 63.5-129.1 63.5-5.2 0-10.4-.5-15.5-1.3-1.2-5.3-1.8-10.8-1.8-16.5 0-41.6 22.7-85.4 55.2-112.9 17.2-14.4 57-33.7 90.5-35.3 1 6 1.5 12 1.5 17.9 0 44.2-21.3 88.6-50.8 124.6z" />
    </svg>
  );
}

export function IconGoogle({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}
