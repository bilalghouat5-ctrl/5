import { useEffect, useState } from "react";
import { useLocation } from "./lib/router.jsx";
import App from "./App.jsx";
import { LoginPage } from "./components/pages/LoginPage.jsx";
import { RegisterPage } from "./components/pages/RegisterPage.jsx";
import { GoogleAuthPage } from "./components/pages/GoogleAuthPage.jsx";
import { AppleAuthPage } from "./components/pages/AppleAuthPage.jsx";
import { AgencyRegisterPage } from "./components/pages/AgencyRegisterPage.jsx";
import { getAppLanguage, handleOAuthCallback } from "./lib/supabase.js";
import { useI18nDom } from "./lib/i18nDom.js";

export default function RouterShell() {
  const { pathname } = useLocation();
  const [lang, setLang] = useState(getAppLanguage());
  useEffect(() => {
    handleOAuthCallback().catch(() => null);
    const sync = () => setLang(getAppLanguage());
    window.addEventListener("driverent-language-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("driverent-language-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  useI18nDom(lang, [pathname]);
  if (pathname === "/login") return <LoginPage />;
  if (pathname === "/register") return <RegisterPage />;
  if (pathname === "/auth/google") return <GoogleAuthPage />;
  if (pathname === "/auth/apple") return <AppleAuthPage />;
  if (pathname === "/agency-register") return <AgencyRegisterPage />;
  return <App />;
}
