import { useEffect } from 'react';

/**
 * Custom hook to observe elements with '.reveal-on-scroll' or '.reveal-scale'
 * and add '.is-revealed' class when they enter the viewport.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const SELECTOR = '.reveal-on-scroll, .reveal-scale, .reveal-fade-left, .reveal-fade-right, .reveal-pop';

    if (typeof window === 'undefined') return;

    // Fallback if IntersectionObserver is unsupported
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(SELECTOR).forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    });

    const elements = document.querySelectorAll(`${SELECTOR}:not(.is-revealed)`);
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Only reveal immediately if already in active view on screen
      if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, deps);
}
