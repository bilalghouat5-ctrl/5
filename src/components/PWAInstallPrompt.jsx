import { useEffect, useState } from "react";
import { IconClose, IconSpark, IconDownload } from "./ui/AppIcons.jsx";
import APP_ICON_IMG from "../assets/appIcon.js";

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [installed, setInstalled] = useState(() => window.matchMedia?.("(display-mode: standalone)")?.matches || localStorage.getItem("driverent_pwa_installed") === "1");

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    const onInstalled = () => {
      localStorage.setItem("driverent_pwa_installed", "1");
      setInstalled(true);
      setPromptEvent(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!promptEvent) return false;
    promptEvent.prompt();
    const result = await promptEvent.userChoice.catch(() => null);
    if (result?.outcome === "accepted") {
      localStorage.setItem("driverent_pwa_installed", "1");
      setInstalled(true);
    }
    setPromptEvent(null);
    return result?.outcome === "accepted";
  };

  return { canInstall: !!promptEvent && !installed, installed, install };
}

export function PWAInstallPrompt({ onClose }) {
  const { canInstall, install } = useInstallPrompt();
  if (!canInstall) return null;
  return (
    <div style={{position:"fixed",right:14,left:14,bottom:"calc(76px + env(safe-area-inset-bottom))",zIndex:620,animation:"springIn .42s cubic-bezier(.34,1.56,.64,1)"}}>
      <div style={{maxWidth:540,margin:"0 auto",background:"rgba(13,14,26,.92)",border:"1px solid rgba(124,58,237,.28)",boxShadow:"0 18px 50px rgba(0,0,0,.55)",backdropFilter:"blur(18px)",borderRadius:20,padding:12,display:"flex",alignItems:"center",gap:11}}>
        <img src={APP_ICON_IMG} alt="" style={{width:42,height:42,borderRadius:13,objectFit:"contain"}}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:900,color:"#fff"}}><IconSpark size={13} color="#A78BFA"/> ثبّت درايف Rent</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,.42)",marginTop:2}}>افتحه كتطبيق مستقل مع شاشة Splash وOffline.</div>
        </div>
        <button onClick={install} className="btn-press" style={{border:"none",borderRadius:13,background:"linear-gradient(135deg,#7C3AED,#4F46E5)",color:"#fff",fontFamily:"inherit",fontSize:12,fontWeight:900,padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
          <IconDownload size={14} color="#fff"/> تثبيت
        </button>
        <button onClick={onClose} style={{border:"none",background:"transparent",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <IconClose size={14} color="rgba(255,255,255,.45)"/>
        </button>
      </div>
    </div>
  );
}
