'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(sectionRef.current?.querySelector('h2') || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate content with stagger - works on every scroll
      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Animate image with scroll-linked animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Continuous scroll animation for image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
        },
        y: -30,
        rotation: 2,
        scale: 1.05,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              Results-driven MERN Stack Developer with <strong className="text-blue-600 dark:text-blue-400">3+ years of experience</strong> building scalable web applications, enterprise-grade admin panels, and backend services using Node.js, Express.js, MongoDB, and Next.js APIs.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              Strong expertise in <strong>React.js, REST APIs, Authentication, and Performance Optimization</strong>. Passionate about creating seamless user experiences and robust backend systems that solve real-world problems.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300">
                  Enterprise-grade Admin Panels & Dashboards
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300">
                  RESTful API Design & Backend Development
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300">
                  Real-time Applications with Socket.io
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300">
                  Performance Optimization & SEO
                </span>
              </div>
            </div>
          </div>
          
          <div
            ref={imageRef}
            className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
          >
            <div className="text-white text-6xl font-bold opacity-50">
              {'</>'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
