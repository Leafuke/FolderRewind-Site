import {useEffect, type RefObject} from 'react';

/** Progressive enhancement: content stays visible without JavaScript or motion support. */
export default function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current || !window.IntersectionObserver) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrast = window.matchMedia('(forced-colors: active)');
    if (reduced.matches || contrast.matches) return;
    const nodes = Array.from(
      root.current.querySelectorAll<HTMLElement>('section > div > :not(noscript)'),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-home-reveal', 'visible');
          observer.unobserve(entry.target);
        }
      },
      {threshold: 0, rootMargin: '0px 0px -48px 0px'},
    );
    for (const node of nodes) {
      // Do not hide content already being read, or the initial paint above the fold.
      if (node.getBoundingClientRect().top < window.innerHeight - 48) continue;
      node.dataset.homeReveal = 'pending';
      observer.observe(node);
    }
    function revealAll() {
      if (!reduced.matches && !contrast.matches) return;
      observer.disconnect();
      nodes.forEach((node) => node.removeAttribute('data-home-reveal'));
    }
    function revealFocus(event: FocusEvent) {
      const node = (event.target as HTMLElement).closest<HTMLElement>('[data-home-reveal]');
      if (node) {
        node.dataset.homeReveal = 'visible';
        observer.unobserve(node);
      }
    }
    const element = root.current;
    element.addEventListener('focusin', revealFocus);
    reduced.addEventListener('change', revealAll);
    contrast.addEventListener('change', revealAll);
    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.removeAttribute('data-home-reveal'));
      element.removeEventListener('focusin', revealFocus);
      reduced.removeEventListener('change', revealAll);
      contrast.removeEventListener('change', revealAll);
    };
  }, [root]);
}
