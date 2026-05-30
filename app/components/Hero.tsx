'use client';

import { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';
import { random } from 'animejs';
import Scene3D from './Scene3D';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Play video on mount
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }

    const ctx = gsap.context(() => {
      // Initial page load animations - play immediately on mount
      const tl = gsap.timeline();
      
      // Fade in video
      if (videoRef.current) {
        gsap.from(videoRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
        });
      }
      
      // Animate greeting text
      tl.from(greetingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
      // Animate main title
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'power4.out',
      }, '-=0.4')
      // Animate role subtitle
      .from(roleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      // Animate description
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      // Animate buttons with stagger
      .from(buttonRef.current?.children || [], {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      }, '-=0.4');

      // Subtle parallax effect on hero background only (no opacity change to keep text visible)
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 60,
        scale: 0.99,
        // No opacity change - keep section fully visible
      });

      // Very subtle parallax effect on content wrapper (minimal movement, no opacity change)
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          y: -15,
          // No opacity change - text always fully visible
        });
      }

      // Video parallax and fade effect on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          scale: 1.1,
          opacity: 0.1,
        });
      }
    }, heroRef);

    // AnimeJS for floating particles
    if (particlesRef.current) {
      const particles = Array.from({ length: 20 }, (_, i) => {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-blue-500 rounded-full opacity-20';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesRef.current?.appendChild(particle);
        return particle;
      });

      animate(particles, {
        translateY: () => random(-30, 30),
        translateX: () => random(-30, 30),
        opacity: () => random(0.1, 0.3),
        duration: () => random(2000, 4000),
        easing: 'easeInOutQuad',
        loop: true,
        direction: 'alternate',
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3 }}
        >
          <source src="/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80" />
      </div>

      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-[1]">
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <Scene3D />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Suspense>
        </Canvas>
      </div>

      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-[2]" />
      
      <div ref={contentRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-4">
          <p ref={greetingRef} className="text-lg md:text-xl text-gray-400 mb-2">Hello, I'm</p>
        </div>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Shivam Kesharwani
          </span>
        </h1>
        <h2 ref={roleRef} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          MERN Stack Developer
        </h2>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          3+ Years of Experience | Building Scalable Web Applications | Enterprise-Grade Solutions
        </p>
        
        <div ref={buttonRef} className="flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
}
