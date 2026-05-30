'use client';

import { useEffect, useRef } from 'react';
import { animate, type Target } from 'animejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  // Frontend
  { name: 'React.js', level: 95, color: 'from-blue-500 to-cyan-600' },
  { name: 'Next.js', level: 92, color: 'from-black to-gray-800' },
  { name: 'TypeScript', level: 88, color: 'from-blue-600 to-indigo-600' },
  { name: 'JavaScript (ES6+)', level: 95, color: 'from-yellow-500 to-orange-600' },
  { name: 'Tailwind CSS', level: 93, color: 'from-cyan-500 to-blue-600' },
  { name: 'HTML5/CSS3', level: 90, color: 'from-orange-500 to-red-600' },
  // Backend
  { name: 'Node.js', level: 90, color: 'from-green-600 to-lime-600' },
  { name: 'Express.js', level: 92, color: 'from-gray-500 to-gray-700' },
  { name: 'REST APIs', level: 93, color: 'from-purple-500 to-pink-600' },
  // Database
  { name: 'MongoDB', level: 90, color: 'from-green-500 to-emerald-600' },
  // State Management
  { name: 'Redux Toolkit', level: 88, color: 'from-purple-600 to-indigo-600' },
  { name: 'RTK Query', level: 85, color: 'from-purple-500 to-pink-500' },
  { name: 'Context API', level: 90, color: 'from-blue-500 to-cyan-500' },
  // Real-time & Auth
  { name: 'Socket.io', level: 85, color: 'from-orange-500 to-yellow-600' },
  { name: 'JWT Auth', level: 90, color: 'from-indigo-500 to-purple-600' },
  { name: 'RBAC', level: 88, color: 'from-red-500 to-pink-600' },
  // Tools
  { name: 'Git/GitHub', level: 90, color: 'from-gray-700 to-gray-900' },
  { name: 'Postman', level: 88, color: 'from-orange-400 to-orange-600' },
  { name: 'PM2', level: 85, color: 'from-green-600 to-emerald-600' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

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

      // GSAP for card entrance - works on every scroll
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Scroll-linked animation for cards
      Array.from(cards).forEach((card, index) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
          y: -20,
          scale: 1.02,
        });
      });

      // AnimeJS for skill bar animations - triggered by GSAP ScrollTrigger (replayable)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          const skillBars = Array.from(cards)
            .map((card) => card.querySelector('.skill-bar-fill'))
            .filter(Boolean) as HTMLElement[];

          skillBars.forEach((bar) => {
            const level = parseInt(bar.getAttribute('data-level') || '0');
            bar.style.width = '0%';
          });

          animate(skillBars, {
            width: (target: Target) => {
              const level = parseInt(
                (target as HTMLElement).getAttribute('data-level') || '0'
              );
              return `${level}%`;
            },
            duration: 2000,
            delay: (_target: Target, i: number) => i * 100,
            easing: 'easeOutExpo',
          });
        },
        onLeaveBack: () => {
          const skillBars = Array.from(cards)
            .map((card) => card.querySelector('.skill-bar-fill'))
            .filter(Boolean) as HTMLElement[];
          
          skillBars.forEach((bar) => {
            bar.style.width = '0%';
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 px-4 bg-white dark:bg-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">
          Skills & Technologies
        </h2>
        
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                {skill.name}
              </h3>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                <div
                  className={`skill-bar-fill h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  data-level={skill.level}
                  style={{ width: '0%' }}
                />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                {skill.level}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
