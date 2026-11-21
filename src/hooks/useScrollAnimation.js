'use client';
import { useEffect } from 'react';

export default function useScrollAnimation() {
  useEffect(() => {
    const selectors = '.scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-zoom-in, .scroll-fade-in, .animate-count';

    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll(selectors).forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Re-observe when new elements are added (async loaded properties)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}