import React, { useEffect, useRef, useState } from 'react';

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
      // Pre-check for elements already in viewport on load
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        setInView(true);
        observer.unobserve(ref.current);
      }
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-up ${inView ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
