import { useRef, useCallback } from "react";

export function useSpringScroll() {
  const ref     = useRef(null);
  const vel     = useRef(0);
  const raf     = useRef(null);
  const drag    = useRef(false);
  const startX  = useRef(0);
  const scrollS = useRef(0);
  const lastX   = useRef(0);
  const lastT   = useRef(0);

  const ease = t => t < .5 ? 2*t*t : -1 + (4-2*t)*t;

  const smoothTo = useCallback((target, dur = 340) => {
    const el = ref.current; if (!el) return;
    const s = el.scrollLeft, d = target - s, t0 = performance.now();
    cancelAnimationFrame(raf.current);
    const step = now => {
      const t = Math.min((now - t0) / dur, 1);
      el.scrollLeft = s + d * ease(t);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  const onDown = useCallback(e => {
    drag.current = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    startX.current = x; lastX.current = x; lastT.current = Date.now();
    scrollS.current = ref.current.scrollLeft;
    vel.current = 0;
    cancelAnimationFrame(raf.current);
    if (e.preventDefault) e.preventDefault();
  }, []);

  const onMove = useCallback(e => {
    if (!drag.current) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    ref.current.scrollLeft = scrollS.current - (x - startX.current);
    const dt = Date.now() - lastT.current || 1;
    vel.current = (lastX.current - x) / dt * 15;
    lastX.current = x; lastT.current = Date.now();
  }, []);

  const onUp = useCallback(() => {
    if (!drag.current) return;
    drag.current = false;
    let v = vel.current;
    const momentum = () => {
      if (Math.abs(v) < .35) return;
      ref.current.scrollLeft += v;
      v *= .87;
      raf.current = requestAnimationFrame(momentum);
    };
    momentum();
  }, []);

  const handlers = {
    onMouseDown: onDown, onMouseMove: onMove, onMouseUp: onUp, onMouseLeave: onUp,
    onTouchStart: e => onDown(e.touches[0]),
    onTouchMove:  e => onMove(e.touches[0]),
    onTouchEnd:   onUp,
  };

  return { ref, handlers };
}
