'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Skyrise Admin Panel',
    description:
      'Complete E-commerce Admin Dashboard with RBAC, pagination, filters, inventory control, and analytics modules. Built with React.js, TypeScript, and Redux Toolkit.',
    tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'RBAC', 'MongoDB'],
    color: 'from-blue-500 to-cyan-500',
    company: 'Arudan Technologies',
  },
  {
    title: 'Ioncology Admin Panel',
    description:
      'Advanced admin system with real-time updates using React.js + TypeScript, RTK Query, and Socket.io for live data synchronization.',
    tech: ['React.js', 'TypeScript', 'RTK Query', 'Socket.io', 'MongoDB'],
    color: 'from-purple-500 to-pink-500',
    company: 'Mobulous Technologies',
  },
  {
    title: 'Kovacs Fitness App (Backend)',
    description:
      'Scalable Next.js APIs with optimized MongoDB schemas and Firebase Cloud Messaging integration for push notifications.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Firebase', 'REST APIs'],
    color: 'from-green-500 to-emerald-500',
    company: 'Mobulous Technologies',
  },
  {
    title: 'Worldclass Gourmetfoods',
    description:
      'Responsive e-commerce UI built with React.js & Tailwind CSS, integrated Redux-based APIs, optimized component rendering for improved performance.',
    tech: ['React.js', 'Tailwind CSS', 'Redux', 'REST APIs'],
    color: 'from-orange-500 to-red-500',
    company: 'Arudan Technologies',
    liveUrl: 'http://worldclassfoods.in/',
  },
  {
    title: 'Dagna De',
    description:
      'Scalable frontend architecture with Context API, reusable components, and fully responsive UI for a modern web experience.',
    tech: ['React.js', 'Context API', 'Tailwind CSS'],
    color: 'from-teal-500 to-emerald-500',
    company: 'Arudan Technologies',
    liveUrl: 'https://dagna.de/',
  },
  {
    title: 'Ioncology Website',
    description:
      'SEO-optimized website using Next.js with dynamic API integration, server-side rendering, and performance optimization.',
    tech: ['Next.js', 'TypeScript', 'SEO', 'SSR', 'API Integration'],
    color: 'from-indigo-500 to-purple-500',
    company: 'Mobulous Technologies',
    liveUrl: 'https://www.ioncosolutions.com/',
  },
  {
    title: 'Quix News Admin Panel',
    description:
      'Content management system with User Control, Analytics Dashboard, and Role-Based Access Control for news content management.',
    tech: ['React.js', 'TypeScript', 'RBAC', 'Analytics', 'CMS'],
    color: 'from-pink-500 to-rose-500',
    company: 'Mobulous Technologies',
  },
  {
    title: 'Prayagraj Beauty Studio',
    description:
      'High-performance business website built with Next.js, optimized SEO structure, and production-ready deployment on Vercel.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SEO'],
    color: 'from-fuchsia-500 to-rose-500',
    company: 'Freelance Project',
    liveUrl: 'https://prayagraj-beauty-studio.vercel.app/',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectCards = projectsRef.current?.children;
      if (!projectCards) return;

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

      // GSAP for project cards entrance - works on every scroll
      gsap.from(projectCards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        rotationX: -15,
        scale: 0.9,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Scroll-linked animations for each card
      Array.from(projectCards).forEach((card, index) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
          y: -30,
          scale: 1.03,
          rotationY: 5,
        });
      });

      // AnimeJS for hover animations
      Array.from(projectCards).forEach((card) => {
        const element = card as HTMLElement;
        
        element.addEventListener('mouseenter', () => {
          animate(element, {
            scale: 1.05,
            duration: 300,
            easing: 'easeOutQuad',
          });
        });

        element.addEventListener('mouseleave', () => {
          animate(element, {
            scale: 1,
            duration: 300,
            easing: 'easeOutQuad',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">
          Featured Projects
        </h2>
        
        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <div className="text-white text-4xl font-bold opacity-50">
                  {project.title.charAt(0)}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                </div>
                {project.company && (
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-3 font-semibold">
                    {project.company}
                  </p>
                )}
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.liveUrl && (
                  <div className="mt-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Live Demo
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
