export function SkeletonCard() {
  return (
    <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:18,overflow:"hidden"}}>
      <div className="skel" style={{height:188,borderRadius:0}} />
      <div style={{padding:14}}>
        <div className="skel" style={{height:17,width:"68%",marginBottom:9}} />
        <div className="skel" style={{height:12,width:"45%",marginBottom:12}} />
        <div style={{display:"flex",gap:7,marginBottom:12}}>
          <div className="skel" style={{height:24,width:58,borderRadius:20}} />
          <div className="skel" style={{height:24,width:58,borderRadius:20}} />
          <div className="skel" style={{height:24,width:72,borderRadius:20}} />
        </div>
        <div className="skel" style={{height:40,borderRadius:11}} />
      </div>
    </div>
  );
}
