import { useState } from "react";
import { IconBell, IconBubble, IconChevronRight, IconVerified, IconSend, IconSpark } from "../ui/AppIcons.jsx";

const NOTIFICATIONS = [
  { id: 1, title: "تم إرسال طلب الحجز", text: "طلبك وصل إلى الوكالة وسيتم الرد عليك قريبًا.", time: "الآن", color: "#7C3AED" },
  { id: 2, title: "الوكالة ستتصل بك قريبًا", text: "تابع هاتفك خلال الساعات القادمة لتأكيد تفاصيل الرحلة.", time: "قبل 10 د", color: "#22C55E" },
  { id: 3, title: "تم حفظ الرحلة", text: "يمكنك الرجوع إليها من صفحة رحلاتي في أي وقت.", time: "اليوم", color: "#38BDF8" },
  { id: 4, title: "عرض جديد في ولايتك", text: "سيارات 4X4 متاحة الآن لعطلة نهاية الأسبوع.", time: "أمس", color: "#C47A2C" },
];

const CONVS = [
  { id: 1, agency: "وكالة النخبة لتأجير السيارات", avatar: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&q=80", last: "السيارة متوفرة، يمكننا الاتصال بك لتأكيد الحجز.", time: "الآن", unread: 2 },
  { id: 2, agency: "وهران درايف", avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=120&q=80", last: "مكان الاستلام من مقر الوكالة أو الفندق.", time: "أمس", unread: 0 },
];

const QUICK = ["هل السيارة متوفرة؟", "أين مكان الاستلام؟", "هل يوجد سائق؟", "ما هي وثائق الحجز؟"];

export function MessagesPage() {
  const [tab, setTab] = useState("notifications");
  const [open, setOpen] = useState(null);
  const [quickMsg, setQuickMsg] = useState("");

  const conv = CONVS.find((c) => c.id === open);

  if (conv) {
    return (
      <div className="tiny-ui" style={{ paddingBottom: 110, minHeight: "calc(100vh - 150px)", display: "flex", flexDirection: "column", animation: "fadeUp .28s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 13, borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <button onClick={() => setOpen(null)} style={{ width: 38, height: 38, borderRadius: 13, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.055)", color: "#fff" }}>‹</button>
          <img src={conv.avatar} alt="" style={{ width: 42, height: 42, borderRadius: 14, objectFit: "cover" }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 13.5, fontWeight: 950 }}>{conv.agency}<IconVerified size={13} color="#34D399" /></div>
            <div style={{ color: "#34D399", fontSize: 11, fontWeight: 800 }}>متصل الآن</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "16px 0", display: "flex", flexDirection: "column", gap: 10 }}>
          <Bubble agency>مرحبًا بك في {conv.agency}. كيف يمكننا مساعدتك؟</Bubble>
          {quickMsg && <Bubble>{quickMsg}</Bubble>}
        </div>

        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 0 12px", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
          {QUICK.map((q) => (
            <button key={q} onClick={() => setQuickMsg(q)} style={{ flex: "0 0 auto", border: "1px solid rgba(167,139,250,.23)", background: "rgba(124,58,237,.10)", color: "#C4B5FD", borderRadius: 999, padding: "8px 11px", fontFamily: "inherit", fontSize: 11.5, fontWeight: 900 }}>{q}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 9, paddingTop: 11, borderTop: "1px solid rgba(255,255,255,.07)" }}>
          <input value={quickMsg} onChange={(e) => setQuickMsg(e.target.value)} placeholder="اكتب رسالة سريعة..." style={{ flex: 1, background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, color: "#fff", padding: "12px 13px", fontFamily: "inherit", outline: "none", fontSize: 13 }} />
          <button style={{ width: 44, height: 44, borderRadius: 14, border: "none", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "grid", placeItems: "center" }}><IconSend size={18} color="#fff" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="tiny-ui" style={{ paddingBottom: 112, animation: "fadeUp .35s ease" }}>
      <div style={{ textAlign: "center", padding: "20px 0 16px" }}>
        <div style={{ width: 56, height: 56, borderRadius: 19, margin: "0 auto 12px", display: "grid", placeItems: "center", background: "rgba(124,58,237,.12)", border: "1px solid rgba(167,139,250,.22)" }}>
          {tab === "notifications" ? <IconBell size={25} color="#A78BFA" /> : <IconBubble size={25} color="#A78BFA" />}
        </div>
        <h1 style={{ margin: 0, color: "#fff", fontSize: 21, fontWeight: 950 }}>{tab === "notifications" ? "الإشعارات" : "الرسائل"}</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: 5, borderRadius: 17, background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.075)", marginBottom: 14 }}>
        <TabButton active={tab === "notifications"} onClick={() => setTab("notifications")} icon={<IconBell size={15} color="currentColor" />} label="إشعارات" />
        <TabButton active={tab === "messages"} onClick={() => setTab("messages")} icon={<IconBubble size={15} color="currentColor" />} label="رسائل" />
      </div>

      {tab === "notifications" ? (
        <div style={{ display: "grid", gap: 10 }}>
          {NOTIFICATIONS.map((n, i) => (
            <div key={n.id} style={{ display: "grid", gridTemplateColumns: "42px 1fr", gap: 11, padding: "13px 13px", borderRadius: 18, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.075)", animation: `fadeUp .24s ease ${i * .04}s both` }}>
              <span style={{ width: 42, height: 42, borderRadius: 15, display: "grid", placeItems: "center", background: `${n.color}22`, border: `1px solid ${n.color}33` }}><IconSpark size={18} color={n.color} /></span>
              <span>
                <strong style={{ display: "block", color: "#fff", fontSize: 13.2, fontWeight: 950 }}>{n.title}</strong>
                <span style={{ display: "block", color: "rgba(255,255,255,.44)", fontSize: 11.5, lineHeight: 1.6, marginTop: 3 }}>{n.text}</span>
                <span style={{ display: "block", color: "rgba(255,255,255,.26)", fontSize: 10.5, marginTop: 5 }}>{n.time}</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {CONVS.map((c, i) => (
            <button key={c.id} onClick={() => setOpen(c.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: 13, borderRadius: 18, border: "1px solid rgba(255,255,255,.075)", background: "rgba(255,255,255,.04)", textAlign: "start", fontFamily: "inherit", animation: `fadeUp .24s ease ${i * .04}s both` }}>
              <span style={{ position: "relative", flexShrink: 0 }}>
                <img src={c.avatar} alt="" style={{ width: 50, height: 50, borderRadius: 16, objectFit: "cover" }} />
                {c.unread > 0 && <b style={{ position: "absolute", top: -4, left: -4, minWidth: 18, height: 18, borderRadius: 999, display: "grid", placeItems: "center", background: "#7C3AED", color: "#fff", fontSize: 9, border: "2px solid #07080F" }}>{c.unread}</b>}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <strong style={{ color: "#fff", fontSize: 13.5, fontWeight: 950 }}>{c.agency}</strong>
                  <span style={{ color: "rgba(255,255,255,.3)", fontSize: 10.5 }}>{c.time}</span>
                </span>
                <span style={{ display: "block", color: c.unread ? "rgba(255,255,255,.62)" : "rgba(255,255,255,.38)", fontSize: 11.6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 4 }}>{c.last}</span>
              </span>
              <IconChevronRight size={15} color="rgba(255,255,255,.25)" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TabButton({ active, icon, label, onClick }) {
  return <button onClick={onClick} style={{ minHeight: 42, border: "none", borderRadius: 13, background: active ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "transparent", color: active ? "#fff" : "rgba(255,255,255,.42)", fontFamily: "inherit", fontSize: 13, fontWeight: 950, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>{icon}{label}</button>;
}

function Bubble({ children, agency }) {
  return <div style={{ display: "flex", justifyContent: agency ? "flex-end" : "flex-start" }}><div style={{ maxWidth: "78%", padding: "10px 13px", borderRadius: 16, borderBottomRightRadius: agency ? 4 : 16, borderBottomLeftRadius: agency ? 16 : 4, background: agency ? "rgba(255,255,255,.07)" : "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", fontSize: 13, lineHeight: 1.6, fontWeight: 700 }}>{children}</div></div>;
}
