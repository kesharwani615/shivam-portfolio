'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('up');
  const hasPlayedInitialAnimation = useRef(false);
  const wasAtTop = useRef(true);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      // Initial nav entrance animation
      const playEntranceAnimation = () => {
        gsap.from(navRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      };

      // Play initial animation on first load
      if (!hasPlayedInitialAnimation.current) {
        playEntranceAnimation();
        hasPlayedInitialAnimation.current = true;
      }

      // Initialize scroll position
      lastScrollY.current = window.scrollY;

      // Scroll handler
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollDiff = currentScrollY - lastScrollY.current;
        const isAtTop = currentScrollY <= 50;

        // Update background state
        setIsScrolled(currentScrollY > 50);

        // Determine scroll direction
        if (Math.abs(scrollDiff) > 3) {
          scrollDirection.current = scrollDiff > 0 ? 'down' : 'up';
        }

        // Show/hide logic
        if (isAtTop) {
          // When scrolling back to top, replay entrance animation
          if (!wasAtTop.current) {
            // Reset to initial state first
            gsap.set(navRef.current, {
              y: -100,
              opacity: 0,
              pointerEvents: 'auto',
            });
            // Then play entrance animation (same as initial load)
            gsap.to(navRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              overwrite: true,
            });
            wasAtTop.current = true;
          }
        } else if (scrollDirection.current === 'down' && currentScrollY > 100) {
          // Completely hide when scrolling down
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.in',
            overwrite: true,
          });
          wasAtTop.current = false;
        } else if (scrollDirection.current === 'up' && !isAtTop) {
          // Show when scrolling up (but not at top yet)
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true,
          });
          wasAtTop.current = false;
        }

        lastScrollY.current = currentScrollY;
      };

      // Throttled scroll handler
      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      // Initial check
      handleScroll();

      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Update background with GSAP for smooth transitions
  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0)',
      backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isScrolled]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const startY = window.scrollY;
      const targetY = element.getBoundingClientRect().top + window.scrollY - 80;
      const distance = targetY - startY;
      const duration = 1000;
      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (easeInOutQuad)
        const ease = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        window.scrollTo(0, startY + distance * ease);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-2xl font-bold text-white hover:text-purple-400 transition-colors"
          >
            Portfolio
          </a>
          
          <div className="hidden md:flex gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
