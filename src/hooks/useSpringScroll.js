import { useRef, useCallback } from "react";

export function useSpringScroll() {
  const ref = useRef(null);
  const drag = useRef(false);
  const startX = useRef(0);
  const scrollS = useRef(0);

  // Lightweight: leave touch scrolling to iOS native momentum.
  // Custom drag remains only for desktop mouse so iPhone sliders feel lighter.
  const onMouseDown = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    drag.current = true;
    startX.current = e.clientX;
    scrollS.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.scrollBehavior = "auto";
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!drag.current || !el) return;
    el.scrollLeft = scrollS.current - (e.clientX - startX.current);
  }, []);

  const onMouseUp = useCallback(() => {
    const el = ref.current;
    drag.current = false;
    if (el) el.style.cursor = "grab";
  }, []);

  const handlers = {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave: onMouseUp,
    onTouchStart: undefined,
    onTouchMove: undefined,
    onTouchEnd: undefined,
  };

  return { ref, handlers };
}
