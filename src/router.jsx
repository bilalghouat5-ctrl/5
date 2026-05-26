import { useLocation } from "./lib/router.jsx";
import App from "./App.jsx";
import { LoginPage } from "./components/pages/LoginPage.jsx";
import { RegisterPage } from "./components/pages/RegisterPage.jsx";
import { GoogleAuthPage } from "./components/pages/GoogleAuthPage.jsx";
import { AppleAuthPage } from "./components/pages/AppleAuthPage.jsx";
import { AgencyRegisterPage } from "./components/pages/AgencyRegisterPage.jsx";

export default function RouterShell() {
  const { pathname } = useLocation();
  if (pathname === "/login") return <LoginPage />;
  if (pathname === "/register") return <RegisterPage />;
  if (pathname === "/auth/google") return <GoogleAuthPage />;
  if (pathname === "/auth/apple") return <AppleAuthPage />;
  if (pathname === "/agency-register") return <AgencyRegisterPage />;
  return <App />;
}
