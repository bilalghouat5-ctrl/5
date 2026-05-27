import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);
const currentPath = () => (typeof window === "undefined" ? "/" : window.location.pathname || "/");

export function RouterProvider({ children }) {
  const [pathname, setPathname] = useState(currentPath);

  useEffect(() => {
    const onPop = () => setPathname(currentPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to, opts = {}) => {
    if (typeof window === "undefined") return;
    if (typeof to === "number") {
      window.history.go(to);
      setTimeout(() => setPathname(currentPath()), 0);
      return;
    }
    const next = to || "/";
    if (opts?.replace) window.history.replaceState({}, "", next);
    else window.history.pushState({}, "", next);
    setPathname(currentPath());
  }, []);

  const value = useMemo(() => ({ pathname, navigate }), [pathname, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useNavigate() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useNavigate must be used inside RouterProvider");
  return ctx.navigate;
}

export function useLocation() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useLocation must be used inside RouterProvider");
  return { pathname: ctx.pathname };
}
