import { useState } from "react";

const MOCK_CONVS = [
  {
    id: 1, agency: "وكالة الجزائر بريميوم",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=80&q=80",
    last: "شكراً لاختياركم وكالتنا! السيارة جاهزة للاستلام.",
    time: "الآن", unread: 2, color: "#7C3AED",
  },
  {
    id: 2, agency: "وهران درايف",
    avatar: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&q=80",
    last: "هل تحتاج تمديد مدة الإيجار؟",
    time: "أمس", unread: 0, color: "#2563EB",
  },
  {
    id: 3, agency: "قسنطينة لوكس",
    avatar: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=80&q=80",
    last: "تم تأكيد الحجز بنجاح ✅",
    time: "منذ 3 أيام", unread: 0, color: "#059669",
  },
];

const MOCK_MESSAGES = {
  1: [
    { id:1, from:"agency", text:"مرحباً! كيف يمكنني مساعدتك؟", time:"10:00" },
    { id:2, from:"me", text:"أريد الاستفسار عن Mercedes S-Class", time:"10:02" },
    { id:3, from:"agency", text:"بالتأكيد! السيارة متاحة هذا الأسبوع بسعر 15,000 دج/يوم.", time:"10:03" },
    { id:4, from:"me", text:"ممتاز، قمت بالحجز للتو.", time:"10:05" },
    { id:5, from:"agency", text:"شكراً لاختياركم وكالتنا! السيارة جاهزة للاستلام.", time:"10:06" },
  ],
  2: [
    { id:1, from:"agency", text:"هل تحتاج تمديد مدة الإيجار؟", time:"أمس" },
  ],
  3: [
    { id:1, from:"agency", text:"تم تأكيد الحجز بنجاح ✅", time:"منذ 3 أيام" },
  ],
};

export function MessagesPage() {
  const [open, setOpen] = useState(null);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(MOCK_MESSAGES);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(prev => ({
      ...prev,
      [open]: [...(prev[open]||[]), { id: Date.now(), from:"me", text: input.trim(), time:"الآن" }],
    }));
    setInput("");
  };

  if (open) {
    const conv = MOCK_CONVS.find(c => c.id === open);
    const messages = msgs[open] || [];
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)", animation:"fadeUp .3s ease" }}>
        {/* Chat header */}
        <div style={{
          display:"flex", alignItems:"center", gap:12, padding:"0 0 16px",
          borderBottom:"1px solid rgba(255,255,255,.07)", marginBottom:0,
        }}>
          <button onClick={() => setOpen(null)} style={{
            width:36, height:36, borderRadius:11, border:"none",
            background:"rgba(255,255,255,.06)", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#fff", fontSize:16,
          }}>‹</button>
          <img src={conv.avatar} style={{ width:40, height:40, borderRadius:13, objectFit:"cover" }}/>
          <div>
            <div style={{ fontWeight:800, fontSize:14, color:"#fff" }}>{conv.agency}</div>
            <div style={{ fontSize:11, color:"#34D399" }}>متصل الآن</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"16px 0", display:"flex", flexDirection:"column", gap:10 }}>
          {messages.map(m => (
            <div key={m.id} style={{
              display:"flex", justifyContent: m.from==="me" ? "flex-start" : "flex-end",
            }}>
              <div style={{
                maxWidth:"75%", padding:"10px 14px", borderRadius:16,
                borderBottomRightRadius: m.from==="agency" ? 4 : 16,
                borderBottomLeftRadius: m.from==="me" ? 4 : 16,
                background: m.from==="me"
                  ? "linear-gradient(135deg,#6D28D9,#4F46E5)"
                  : "rgba(255,255,255,.07)",
                color:"#fff", fontSize:13, lineHeight:1.5,
              }}>
                {m.text}
                <div style={{ fontSize:9, color:"rgba(255,255,255,.35)", marginTop:4, textAlign:"left" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{
          display:"flex", gap:10, padding:"12px 0 0",
          borderTop:"1px solid rgba(255,255,255,.07)",
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key==="Enter" && send()}
            placeholder="اكتب رسالتك..."
            style={{
              flex:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)",
              borderRadius:13, padding:"12px 14px", color:"#fff", fontSize:13,
              fontFamily:"inherit", outline:"none",
            }}
          />
          <button onClick={send} style={{
            width:46, height:46, borderRadius:13, border:"none",
            background:"linear-gradient(135deg,#6D28D9,#4F46E5)",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:18, flexShrink:0,
          }}>↑</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 100, animation: "fadeUp .35s ease" }}>
      {/* Header */}
      <div style={{ padding: "24px 0 20px", textAlign: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 18, margin: "0 auto 14px",
          background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26,
        }}>💬</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>الرسائل</h2>
        <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>{MOCK_CONVS.length} محادثات</p>
      </div>

      {/* Conversations */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MOCK_CONVS.map((conv, i) => (
          <div key={conv.id} onClick={() => setOpen(conv.id)}
            className="btn-press"
            style={{
              display: "flex", gap: 13, alignItems: "center",
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 18, padding: "14px 14px", cursor: "pointer",
              animation: `fadeUp .3s ease ${i * .06}s both`,
            }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <img src={conv.avatar} style={{
                width: 50, height: 50, borderRadius: 16, objectFit: "cover",
                border: `2px solid ${conv.color}44`,
              }}/>
              {conv.unread > 0 && (
                <div style={{
                  position: "absolute", top: -4, left: -4,
                  width: 18, height: 18, borderRadius: "50%",
                  background: "linear-gradient(135deg,#6D28D9,#4F46E5)",
                  color: "#fff", fontSize: 9, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid #07080F",
                }}>{conv.unread}</div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{conv.agency}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)" }}>{conv.time}</div>
              </div>
              <div style={{
                fontSize: 12, color: conv.unread > 0 ? "rgba(255,255,255,.65)" : "rgba(255,255,255,.35)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                fontWeight: conv.unread > 0 ? 600 : 400,
              }}>{conv.last}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
