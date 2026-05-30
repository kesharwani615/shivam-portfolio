'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const downloadBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // GSAP animations for resume section
    const ctx = gsap.context(() => {
      // Animate section title - works on every scroll
      gsap.from(sectionRef.current?.querySelector('h2') || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      // Animate subtitle
      gsap.from(sectionRef.current?.querySelector('p') || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Animate download button - replayable
      gsap.from(downloadBtnRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.3,
      });

      // Animate timeline items with stagger - works on every scroll
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.from(timelineItems, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          x: (index) => index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });

        // Scroll-linked animations for timeline items
        timelineItems.forEach((item) => {
          gsap.to(item, {
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
            y: -20,
            opacity: 1,
          });
        });
      }

      // Continuous floating animation for download button
      if (downloadBtnRef.current) {
        gsap.to(downloadBtnRef.current, {
          y: -5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      company: 'Mobulous Technologies Pvt. Ltd.',
      role: 'MERN Stack Developer',
      period: 'Oct 2024 – Present',
      location: 'Remote',
      projects: [
        {
          name: 'Kovacs (Fitness Application – Backend)',
          description: 'Developed scalable Next.js APIs, designed optimized MongoDB schemas, and integrated Firebase notifications.',
        },
        {
          name: 'Ioncology Admin Panel',
          description: 'Built advanced admin system using React.js + TypeScript, RTK Query, and Socket.io for real-time updates.',
        },
        {
          name: 'Ioncology Website',
          description: 'Developed SEO-optimized website using Next.js with dynamic API integration.',
        },
        {
          name: 'Quix News Admin Panel',
          description: 'Implemented content management system with User Control, Analytics, and Role-Based Access.',
        },
      ],
    },
    {
      company: 'Arudan Technologies Pvt. Ltd.',
      role: 'MERN Stack Developer',
      period: 'Jan 2023 – Oct 2024',
      location: 'Prayagraj (On-site)',
      projects: [
        {
          name: 'Worldclass Gourmetfoods',
          description: 'Built responsive UI using React.js & Tailwind CSS, integrated Redux-based APIs, optimized component rendering, and improved overall performance.',
        },
        {
          name: 'Dagna De',
          description: 'Developed scalable frontend architecture with Context API, implemented reusable components, and ensured cross-device responsiveness.',
        },
        {
          name: 'Skyrise Admin Panel',
          description: 'Designed complete E-commerce Admin Dashboard including RBAC, pagination, filters, inventory control, and analytics modules.',
        },
      ],
    },
  ];

  const education = {
    degree: 'BCA (Bachelor of Computer Applications)',
    university: 'MGKVP University',
  };

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume
          </span>
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg">
          My professional journey and achievements
        </p>

        {/* Download Button */}
        <div className="flex justify-center mb-16">
          <a
            ref={downloadBtnRef}
            href="/asset/Shivam_Kesharwani_MERN_Stack_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full font-semibold text-white overflow-hidden shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume PDF
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

        {/* Experience Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="timeline-item relative mb-12 md:mb-16"
            >
              <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-900 transform md:-translate-x-1/2 z-10" />

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-purple-300 font-semibold">{exp.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <p className="text-sm text-gray-300">{exp.period}</p>
                        <p className="text-sm text-gray-400">{exp.location}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {exp.projects.map((project, pIndex) => (
                        <div key={pIndex} className="border-l-2 border-purple-500 pl-4">
                          <h4 className="text-lg font-semibold text-blue-300 mb-1">
                            {project.name}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Education */}
          <div className="timeline-item relative">
            <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-pink-500 rounded-full border-4 border-slate-900 transform md:-translate-x-1/2 z-10" />
            <div className="ml-16 md:ml-auto md:w-5/12 md:pl-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-2">Education</h3>
                <p className="text-purple-300 font-semibold text-lg mb-1">{education.degree}</p>
                <p className="text-gray-300">{education.university}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Freelancing Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4">Freelancing Project</h3>
          <div className="border-l-2 border-purple-500 pl-4">
            <h4 className="text-lg font-semibold text-blue-300 mb-2">
              <a
                href="https://prayagraj-beauty-studio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Prayagraj Beauty Studio
              </a>
            </h4>
            <p className="text-gray-300">
              Created high-performance business website using Next.js, optimized SEO structure, and deployed production-ready build.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
