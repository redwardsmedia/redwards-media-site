import { useEffect, useRef } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const viewH = window.innerHeight;
          if (rect.bottom > 0 && rect.top < viewH) {
            const offset = (rect.top - viewH / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}
