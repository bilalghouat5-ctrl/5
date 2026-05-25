import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);

function compileRoute(path) {
  if (path === "*") return { test: () => true };
  const keys = [];
  const escaped = path
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/:(\w+)/g, (_, key) => { keys.push(key); return "([^/]+)"; });
  const rx = new RegExp(`^${escaped}$`);
  return { test: (pathname) => rx.test(pathname), keys, rx };
}

export function createBrowserRouter(routes) {
  return routes.map(route => ({ ...route, matcher: compileRoute(route.path) }));
}

export function RouterProvider({ router }) {
  const [pathname, setPathname] = useState(() => window.location.pathname || "/");

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useMemo(() => (to, options = {}) => {
    if (typeof to === "number") {
      window.history.go(to);
      setTimeout(() => setPathname(window.location.pathname || "/"), 0);
      return;
    }
    const next = to || "/";
    if (options.replace) window.history.replaceState({}, "", next);
    else window.history.pushState({}, "", next);
    setPathname(window.location.pathname || "/");
  }, []);

  const match = router.find(r => r.matcher.test(pathname)) || router[0];
  const value = useMemo(() => ({ pathname, navigate }), [pathname, navigate]);

  return <RouterContext.Provider value={value}>{match?.element || null}</RouterContext.Provider>;
}

export function useNavigate() {
  const ctx = useContext(RouterContext);
  if (!ctx) return () => {};
  return ctx.navigate;
}

export function useLocation() {
  const ctx = useContext(RouterContext);
  return { pathname: ctx?.pathname || window.location.pathname || "/" };
}

export function Navigate({ to = "/", replace = false }) {
  const navigate = useNavigate();
  useEffect(() => { navigate(to, { replace }); }, [to, replace, navigate]);
  return null;
}
