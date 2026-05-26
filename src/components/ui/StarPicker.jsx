import { useState } from "react";
import { IconStar } from "./AppIcons.jsx";

export function StarPicker({value, onChange}) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{display:"flex",gap:4}}>
      {[1,2,3,4,5].map(i => {
        const active = (hov || value) >= i;
        return (
          <button key={i}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(0)}
            onClick={()=>onChange(i)}
            style={{
              padding:0, border:"none", background:"none", cursor:"pointer",
              color:active?"#F59E0B":"rgba(255,255,255,.15)",
              display:"inline-flex",
              transform:active?"scale(1.2)":"scale(1)",
              transition:"color .15s,transform .18s",
            }}>
            <IconStar size={30} color="currentColor" />
          </button>
        );
      })}
    </div>
  );
}
