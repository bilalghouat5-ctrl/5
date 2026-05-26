export function SectionHeader({ title, sub, accent = "#A78BFA", onSeeAll, delay = 0 }) {
  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"flex-end",
      marginBottom:"clamp(12px,3vw,18px)", padding:"0 clamp(12px,3vw,20px)",
      animation:`sectionIn .5s ease ${delay}s both`,
    }}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:4, height:"clamp(18px,4.5vw,24px)", borderRadius:4, background:`linear-gradient(180deg,${accent},${accent}88)`, flexShrink:0 }}/>
          <div style={{ fontSize:"clamp(15px,4vw,19px)", fontWeight:900, color:"#fff", letterSpacing:"-.5px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{title}</div>
        </div>
        {sub && <div style={{ fontSize:"clamp(10px,2.5vw,13px)", color:"rgba(255,255,255,.38)", marginTop:3, marginRight:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{sub}</div>}
      </div>
      <button onClick={onSeeAll} className="btn-press" style={{
        background:`${accent}18`, border:`1px solid ${accent}44`,
        color:accent, padding:"5px clamp(10px,2.5vw,14px)", borderRadius:20,
        fontSize:"clamp(10px,2.5vw,12px)", fontWeight:800, cursor:"pointer", fontFamily:"inherit",
        flexShrink:0, marginRight:4,
      }}>الكل ›</button>
    </div>
  );
}
