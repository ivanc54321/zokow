import { useEffect } from 'react';

/**
 * Custom hook to observe elements with '.reveal-on-scroll' or '.reveal-scale'
 * and add '.is-revealed' class when they enter the viewport.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    // If IntersectionObserver is not supported, reveal all immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll, .reveal-scale').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '120px 0px 120px 0px',
      threshold: 0.01
    });

    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed), .reveal-scale:not(.is-revealed)');
    elements.forEach(el => {
      // Check if already in viewport or above it
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
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
