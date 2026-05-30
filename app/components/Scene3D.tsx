'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AnimatedBox({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.5 + delay;
      meshRef.current.rotation.y = time * 0.3 + delay;
      groupRef.current.position.y = Math.sin(time + delay) * 0.2;
    }
  });

  useGSAP(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        delay: delay,
        ease: 'back.out(1.7)',
      });
    }
  }, []);

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function AnimatedSphere({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.4 + delay;
      meshRef.current.rotation.z = time * 0.6 + delay;
      groupRef.current.position.y = Math.cos(time + delay) * 0.15;
    }
  });

  useGSAP(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        delay: delay,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, []);

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

function AnimatedTorus({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * 0.3 + delay;
      meshRef.current.rotation.y = time * 0.5 + delay;
      groupRef.current.position.y = Math.sin(time * 1.5 + delay) * 0.1;
    }
  });

  useGSAP(() => {
    if (meshRef.current) {
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.8,
        delay: delay,
        ease: 'power4.out',
      });
    }
  }, []);

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusGeometry args={[0.6, 0.3, 16, 100]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => {
    const angle = (i / 50) * Math.PI * 2;
    const radius = 3 + Math.random() * 2;
    return {
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius,
      ] as [number, number, number],
      delay: Math.random() * 2,
    };
  });

  return (
    <>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position}
          castShadow
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </>
  );
}

export default function Scene3D() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.1;
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }
  });

  useGSAP(() => {
    if (groupRef.current) {
      // Initial entrance animation
      gsap.from(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: 'power2.out',
      });

      gsap.from(groupRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 1.5,
        ease: 'back.out(1.7)',
      });

      // Scroll-triggered animation
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        gsap.to(groupRef.current.rotation, {
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          y: Math.PI * 2,
          ease: 'none',
        });
      }
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main geometric shapes */}
      <AnimatedBox position={[-2, 0, 0]} color="#3b82f6" delay={0} />
      <AnimatedSphere position={[0, 0, 0]} color="#8b5cf6" delay={0.2} />
      <AnimatedTorus position={[2, 0, 0]} color="#ec4899" delay={0.4} />
      
      {/* Additional floating shapes */}
      <AnimatedBox position={[-1, 1.5, -1]} color="#06b6d4" delay={0.6} />
      <AnimatedSphere position={[1, -1.5, 1]} color="#f59e0b" delay={0.8} />
      <AnimatedTorus position={[-1.5, -1, 1.5]} color="#10b981" delay={1.0} />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Ambient and directional lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ec4899" />
    </group>
  );
}
