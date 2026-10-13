import { useEffect } from 'react';

/**
 * Custom hook to observe elements with '.reveal-on-scroll' or '.reveal-scale'
 * and add '.is-revealed' class when they enter the viewport.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, we can unobserve to keep performance high
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed), .reveal-scale:not(.is-revealed)');
    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, deps);
}
