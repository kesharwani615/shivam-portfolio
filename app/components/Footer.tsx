'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer content - works on every scroll
      gsap.from(footerRef.current?.children || [], {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Scroll-linked animation for footer links
      const links = footerRef.current?.querySelectorAll('a');
      if (links) {
        links.forEach((link) => {
          gsap.to(link, {
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1,
            },
            y: -10,
            opacity: 1,
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-12 px-4 bg-slate-900 text-white"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-slate-400 mb-4">
          © {new Date().getFullYear()} MERN Stack Developer. All rights reserved.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
