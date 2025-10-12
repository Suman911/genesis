import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Opacity, type Engine } from "tsparticles-engine";
import {motion} from "motion/react";
type Shape = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  type: string;
  rotation: number;
  rotationSpeed: number;
  moveX: number;
  moveY: number;
  moveSpeed: number;
  pulseSpeed: number;
  isStatic: boolean;
  fadeOut?: boolean; // Add fadeOut property
};

const AnimatedBg = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shapes, setShapes] = useState<Array<Shape>>([]);


  // Generate random shapes (UFOs, tech symbols)
  useEffect(() => {
    if (!mounted) return;

    // Updated shape types - separated into moving and static categories
    const movingShapeTypes = ['bacteria', 'insect'];
    const staticShapeTypes = ['injection', 'microscope', 'testtube', 'biocell', 'dna','chemical'];

    const maxShapes = 15; // Total shapes
    const minShapes = 10;
    const minMovingShapes = 4;
    const maxMovingShapes = 6;

    // Function to create a random shape
    const createRandomShape = (forceStatic = false, forceMoving = false) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Random size between 24px and 64px
      const size = Math.floor(Math.random() * 48) + 24;

      // Inverse relationship between size and opacity
      // Larger shapes are more transparent
      const minOpacity = 0.3; // Minimum opacity for the largest shape
      const maxOpacity = 0.8; // Maximum opacity for the smallest shape
      const opacity = maxOpacity - ((size - 24) / (64 - 24)) * (maxOpacity - minOpacity);



      // Random movement parameters for moving shapes
      const moveX = (Math.random() * 2 - 1) * 100; // Random direction
      const moveY = (Math.random() * 2 - 1) * 100; // Random direction

      // Further reduced movement speed for even slower motion
      const moveSpeed = Math.random() * 0.05 + 0.05; // Very slow random speed

      const rotationSpeed = (Math.random() * 0.2 + 0.4) * (Math.random() > 0.5 ? 1 : -1); // Reduced rotation speed
      const pulseSpeed = Math.random() * 1.5 + 0.5; // Random pulse speed

      // Determine if the shape is static or moving
      // UFOs and rockets are always moving, other shapes are static
      let type;

      if (forceMoving) {
        // If forced moving, randomly choose between ufo and rocket
        type = movingShapeTypes[Math.floor(Math.random() * movingShapeTypes.length)];
        return {
          id: Date.now() + Math.random(),
          x: Math.random() * windowWidth,
          y: Math.random() * windowHeight,
          size,
          opacity,
          type,
          rotation: Math.random() * 360,
          rotationSpeed,
          moveX,
          moveY,
          moveSpeed,
          pulseSpeed,
          isStatic: false // Always non-static for ufo and rocket
        };
      } else if (forceStatic) {
        // If forced static, choose one of the static shape types
        type = staticShapeTypes[Math.floor(Math.random() * staticShapeTypes.length)];
        return {
          id: Date.now() + Math.random(),
          x: Math.random() * windowWidth,
          y: Math.random() * windowHeight,
          size,
          opacity,
          type,
          rotation: Math.random() * 360,
          rotationSpeed,
          moveX: 0,
          moveY: 0,
          moveSpeed: 0,
          pulseSpeed,
          isStatic: true // Always static for these shapes
        };
      }

      // This should never be reached but just in case, create a static shape
      type = staticShapeTypes[Math.floor(Math.random() * staticShapeTypes.length)];
      return {
        id: Date.now() + Math.random(),
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        size,
        opacity,
        type,
        rotation: Math.random() * 360,
        rotationSpeed,
        moveX: 0,
        moveY: 0,
        moveSpeed: 0,
        pulseSpeed,
        isStatic: true
      };
    };

    // Create balanced initial shapes
    const createBalancedShapes = () => {
      // Randomly choose how many moving shapes between min and max
      const movingCount = Math.floor(Math.random() * (maxMovingShapes - minMovingShapes + 1)) + minMovingShapes;
      // Calculate static count to maintain total between min and max shapes
      const staticCount = Math.max(minShapes - movingCount, 4); // Ensure at least 4 static elements

      // Create moving shapes (UFOs and rockets)
      const initialShapes = Array.from({ length: movingCount }, () => createRandomShape(false, true));

      // Add static shapes (complex 3D and tech shapes)
      initialShapes.push(...Array.from({ length: staticCount }, () => createRandomShape(true, false)));

      return initialShapes;
    };

    // Set initial balanced shapes
    setShapes(createBalancedShapes());

    // Periodically add and remove shapes while maintaining balance
    const interval = setInterval(() => {
      setShapes((prevShapes) => {
        const newShapes = [...prevShapes];

        // Mark shapes for removal
        if (newShapes.length > minShapes && Math.random() > 0.6) {
          const movingShapes = newShapes.filter((s) => !s.isStatic);
          const staticShapes = newShapes.filter((s) => s.isStatic);

          if (movingShapes.length > minMovingShapes && (staticShapes.length <= 4 || Math.random() > 0.5)) {
            // Mark a moving shape for removal
            const movingIndices = newShapes
              .map((s, i) => (s.isStatic ? -1 : i))
              .filter((i) => i !== -1);
            const indexToRemove = movingIndices[Math.floor(Math.random() * movingIndices.length)];
            if (indexToRemove !== undefined) {
              newShapes[indexToRemove].fadeOut = true; // Mark for fade-out
            }
          } else if (staticShapes.length > 4) {
            // Mark a static shape for removal
            const staticIndices = newShapes
              .map((s, i) => (s.isStatic ? i : -1))
              .filter((i) => i !== -1);
            const indexToRemove = staticIndices[Math.floor(Math.random() * staticIndices.length)];
            if (indexToRemove !== undefined) {
              newShapes[indexToRemove].fadeOut = true; // Mark for fade-out
            }
          }
        }

        // Remove shapes that have completed fade-out
        const shapesToRemove = newShapes.filter((s) => s.fadeOut);
        if (shapesToRemove.length > 0) {
          setTimeout(() => {
            setShapes((prev) => prev.filter((s) => !s.fadeOut));
          }, 800); // Match the duration of the fade-out animation
        }

        // Add a new shape if we have less than maxShapes
        if (newShapes.length < maxShapes && Math.random() > 0.4) {
          const currentMovingCount = newShapes.filter((s) => !s.isStatic).length;
          const currentStaticCount = newShapes.filter((s) => s.isStatic).length;

          if (currentMovingCount < minMovingShapes) {
            newShapes.push(createRandomShape(false, true));
          } else if (currentStaticCount < 4) {
            newShapes.push(createRandomShape(true, false));
          } else {
            newShapes.push(
              Math.random() > 0.3 ? createRandomShape(true, false) : createRandomShape(false, true)
            );
          }
        }

        return newShapes;
      });
    }, 1000); // Shape change interval

    // Move and animate shapes
    const animationInterval = setInterval(() => {
      setShapes(prevShapes =>
        prevShapes.map(shape => {
          let newX = shape.x;
          let newY = shape.y;
          let newRotation = shape.rotation;

          // Apply rotation to all shapes with different speeds
          newRotation = (newRotation + shape.rotationSpeed) % 360;

          // Only move UFOs and rockets, which are never static
          if (!shape.isStatic && (shape.type === 'bacteria' || shape.type === 'insect')) {
            newX += shape.moveX * shape.moveSpeed;
            newY += shape.moveY * shape.moveSpeed;

            // For rockets, calculate proper rotation based on movement direction
            if (shape.type === 'bacteria') {
              // Calculate angle based on movement direction
              // Math.atan2 returns the angle in radians, convert to degrees
              const angle = Math.atan2(shape.moveY, shape.moveX) * (180 / Math.PI);
              // Add 90 degrees because the rocket's default orientation is upward
              newRotation = angle + 90;
            }

            // Boundary checks to keep shapes within viewport
            if (newX < -shape.size) newX = window.innerWidth + shape.size;
            if (newX > window.innerWidth + shape.size) newX = -shape.size;
            if (newY < -shape.size) newY = window.innerHeight + shape.size;
            if (newY > window.innerHeight + shape.size) newY = -shape.size;
          }

          return {
            ...shape,
            x: newX,
            y: newY,
            rotation: newRotation
          };
        })
      );
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(animationInterval);
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current || !bgRef.current) return;

      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;

      parallaxRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
      bgRef.current.style.transform = `translateX(${x / 3}px) translateY(${y / 3}px)`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // SVG shapes for UFOs, rockets, and static tech elements
  const renderShape = (shape: Shape) => {
    const style = {
      position: "absolute" as const,
      left: `${shape.x}px`,
      top: `${shape.y}px`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      transform: `rotate(${shape.rotation}deg)`,
      pointerEvents: "none" as const,
    };

    switch (shape.type) {
      case 'bacteria':
        return (
          <div key={shape.id} style={style}>

            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {/* Outer membrane */}
              <ellipse cx="100" cy="100" rx="60" ry="40" fill="#a8e6cf" stroke="#34495e" strokeWidth="3" />

              {/* Inner cytoplasm blobs */}
              <circle cx="80" cy="95" r="6" fill="#ff8a65" />
              <circle cx="120" cy="105" r="5" fill="#ffd54f" />
              <circle cx="100" cy="115" r="7" fill="#ba68c8" />
              <circle cx="90" cy="85" r="4" fill="#4dd0e1" />
              <circle cx="110" cy="90" r="3" fill="#81c784" />

              {/* DNA strand */}
              <path d="M80,110 Q100,80 120,110" stroke="#f06292" strokeWidth="2" fill="none" />
              <path d="M85,110 Q100,85 115,110" stroke="#f06292" strokeWidth="2" fill="none" />

              {/* Flagella (tails) */}
              <path d="M40,100 Q20,110 30,130" stroke="#2c3e50" strokeWidth="2" fill="none" />
              <path d="M160,90 Q180,80 170,60" stroke="#2c3e50" strokeWidth="2" fill="none" />
              <path d="M160,110 Q180,120 170,140" stroke="#2c3e50" strokeWidth="2" fill="none" />
            </svg>



          </div>
        );
      case 'insect':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
              height="32">

              <ellipse cx="100" cy="100" rx="25" ry="50" fill="#4b4b4b" />


              <circle cx="100" cy="45" r="12" fill="#333" />


              <path d="M100,100 Q60,90 40,130 Q60,140 100,120" fill="#b0c4de" />
              <path d="M100,100 Q140,90 160,130 Q140,140 100,120" fill="#b0c4de" />

              <path d="M100,100 Q60,90 40,130 Q60,140 100,120" stroke="#666" fill="none" />
              <path d="M100,100 Q140,90 160,130 Q140,140 100,120" stroke="#666" fill="none" />


              <line x1="75" y1="110" x2="50" y2="140" stroke="#333" />
              <line x1="125" y1="110" x2="150" y2="140" stroke="#333" />
              <line x1="75" y1="90" x2="50" y2="80" stroke="#333" />
              <line x1="125" y1="90" x2="150" y2="80" stroke="#333" />


              <line x1="93" y1="35" x2="80" y2="20" stroke="#222" />
              <line x1="107" y1="35" x2="120" y2="20" stroke="#222" />
            </svg>
          </div>
        );
      case 'testtube':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
              height="32">
              {/* Tube outline */}
              <rect x="90" y="40" width="20" height="100" rx="10" fill="#e0f7fa" stroke="#00796b" strokeWidth="3" />

              {/* Liquid inside */}
              <rect x="92" y="90" width="16" height="48" rx="8" fill="#4dd0e1" />

              {/* Liquid surface (meniscus) */}
              <ellipse cx="100" cy="90" rx="8" ry="2" fill="#26c6da" />

              {/* Bubbles inside liquid */}
              <circle cx="100" cy="100" r="2" fill="#00acc1" />
              <circle cx="98" cy="110" r="1.5" fill="#00acc1" />
              <circle cx="102" cy="120" r="1.8" fill="#00acc1" />

              {/* Glossy shine */}
              <path d="M94,42 Q92,70 94,100" stroke="#ffffff99" strokeWidth="2" fill="none" />

              {/* Base shadow */}
              <ellipse cx="100" cy="142" rx="12" ry="4" fill="#b0bec5" opacity="0.3" />
            </svg>

          </div>
        );
      case 'injection':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
              height="32">
              {/* Needle */}
              <rect x="140" y="90" width="40" height="4" fill="#90a4ae" />

              {/* Needle tip aligned properly at end of needle (x = 180) */}
              <polygon points="180,90 195,92 180,94" fill="#607d8b" />

              {/* Barrel */}
              <rect x="60" y="80" width="80" height="20" fill="#bbdefb" stroke="#1976d2" strokeWidth="2" />

              {/* Liquid inside barrel */}
              <rect x="62" y="82" width="50" height="16" fill="#4fc3f7" />

              {/* Plunger */}
              <rect x="30" y="85" width="30" height="10" fill="#cfd8dc" stroke="#607d8b" strokeWidth="2" />

              {/* Plunger knob */}
              <rect x="20" y="80" width="10" height="20" fill="#90a4ae" />

              {/* Barrel lines (measure marks) */}
              <line x1="70" y1="80" x2="70" y2="100" stroke="#0d47a1" strokeWidth="1" />
              <line x1="80" y1="80" x2="80" y2="100" stroke="#0d47a1" strokeWidth="1" />
              <line x1="90" y1="80" x2="90" y2="100" stroke="#0d47a1" strokeWidth="1" />
              <line x1="100" y1="80" x2="100" y2="100" stroke="#0d47a1" strokeWidth="1" />
              <line x1="110" y1="80" x2="110" y2="100" stroke="#0d47a1" strokeWidth="1" />
            </svg>

          </div>
        );
      case 'microscope':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="64"
              height="64">
              {/* Base */}
              <rect x="60" y="160" width="80" height="10" fill="#546e7a" />

              {/* Arm */}
              <path d="M90 150 Q80 100 120 60" stroke="#455a64" strokeWidth="12" fill="none" />

              {/* Body */}
              <rect x="110" y="50" width="12" height="50" fill="#78909c" />

              {/* Eyepiece */}
              <rect x="110" y="40" width="12" height="10" fill="#37474f" />

              {/* Stage */}
              <rect x="85" y="130" width="30" height="5" fill="#90a4ae" />

              {/* Specimen slide */}
              <rect x="88" y="131" width="24" height="2" fill="#ffab91" />

              {/* Focus knob */}
              <circle cx="130" cy="110" r="6" fill="#607d8b" />
            </svg>

          </div>
        );
      case 'biocell':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="32"
              height="32">
              {/* Cell membrane */}
              <ellipse cx="100" cy="100" rx="70" ry="50" fill="#e1f5fe" stroke="#0288d1" strokeWidth="3" />

              {/* Nucleus */}
              <circle cx="100" cy="100" r="20" fill="#4fc3f7" stroke="#0277bd" strokeWidth="2" />

              {/* Nucleolus */}
              <circle cx="105" cy="105" r="6" fill="#01579b" />

              {/* Mitochondria */}
              <ellipse cx="75" cy="90" rx="10" ry="5" fill="#ff8a65" />
              <ellipse cx="125" cy="110" rx="10" ry="5" fill="#ff8a65" />

              {/* Other organelles */}
              <circle cx="80" cy="115" r="4" fill="#81c784" />
              <circle cx="115" cy="80" r="3" fill="#ba68c8" />
              <circle cx="95" cy="125" r="3" fill="#4db6ac" />
            </svg>

          </div>
        );
      case 'dna':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"width="32"
              height="32">
              {/* Left backbone */}
              <path d="M60,20 C70,40 70,60 60,80 C50,100 50,120 60,140 C70,160 70,180 60,200" stroke="#3f51b5" strokeWidth="4" fill="none" />

              {/* Right backbone */}
              <path d="M140,20 C130,40 130,60 140,80 C150,100 150,120 140,140 C130,160 130,180 140,200" stroke="#e91e63" strokeWidth="4" fill="none" />

              {/* Rungs (base pairs) */}
              <line x1="60" y1="20" x2="140" y2="20" stroke="#4caf50" strokeWidth="2" />
              <line x1="60" y1="40" x2="140" y2="40" stroke="#ff9800" strokeWidth="2" />
              <line x1="60" y1="60" x2="140" y2="60" stroke="#009688" strokeWidth="2" />
              <line x1="60" y1="80" x2="140" y2="80" stroke="#ffc107" strokeWidth="2" />
              <line x1="60" y1="100" x2="140" y2="100" stroke="#00bcd4" strokeWidth="2" />
              <line x1="60" y1="120" x2="140" y2="120" stroke="#8bc34a" strokeWidth="2" />
              <line x1="60" y1="140" x2="140" y2="140" stroke="#f44336" strokeWidth="2" />
              <line x1="60" y1="160" x2="140" y2="160" stroke="#9c27b0" strokeWidth="2" />
              <line x1="60" y1="180" x2="140" y2="180" stroke="#00acc1" strokeWidth="2" />
              <line x1="60" y1="200" x2="140" y2="200" stroke="#cddc39" strokeWidth="2" />
            </svg>

          </div>
        );
      case 'chemical':
        return (
          <div key={shape.id} style={style}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="32"
              height="32"
              fill="none"
            >
              <g stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Bottle neck */}
                <rect x="26" y="2" width="12" height="10" fill="#ccc" />

                {/* Cap */}
                <rect x="24" y="0" width="16" height="4" fill="#333" />

                {/* Neck connector */}
                <path d="M26 12h12v6a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6v-6z" fill="#e0e0e0" />

                {/* Bottle body */}
                <path
                  d="M20 18h24v26a12 12 0 0 1-12 12h0a12 12 0 0 1-12-12V18z"
                  fill="#a3d2ca"
                />

                {/* Label */}
                <rect x="24" y="28" width="16" height="10" rx="2" fill="#fff" stroke="#000" />

                {/* Hazard symbol (skull) */}
                <circle cx="32" cy="33" r="2" fill="#000" />
                <circle cx="30" cy="32" r="0.5" fill="#fff" />
                <circle cx="34" cy="32" r="0.5" fill="#fff" />
                <path d="M31 35h2" stroke="#000" strokeWidth="1" />
              </g>
            </svg>

          </div>
        );
      case 'chip':
        return (
          <div key={shape.id} style={style}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="64"
              height="64"
              fill="none"
            >
              <g stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Leaf shape */}
                <path
                  d="M32 2
                    C10 20, 10 44, 32 62
                    C54 44, 54 20, 32 2Z"
                  fill="#81c784"
                />

                {/* Main vein */}
                <path d="M32 2 L32 62" stroke="#1b5e20" />

                {/* Side veins */}
                <path d="M32 12 L20 20" />
                <path d="M32 20 L18 30" />
                <path d="M32 28 L20 40" />
                <path d="M32 36 L24 50" />
                
                <path d="M32 12 L44 20" />
                <path d="M32 20 L46 30" />
                <path d="M32 28 L44 40" />
                <path d="M32 36 L40 50" />
              </g>
            </svg>

          </div>  
        );
      case 'computer':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 60 60" fill="none" opacity={shape.opacity}>
              <rect x="10" y="10" width="40" height="25" stroke="#8B5CF6" strokeWidth="2" fill="none" rx="2" />
              <rect x="12" y="12" width="36" height="21" fill="#0EA5E9" fillOpacity="0.5" rx="1" />
              <rect x="25" y="36" width="10" height="5" fill="#D946EF" />
              <rect x="20" y="41" width="20" height="2" fill="#F97316" />
              <rect x="15" y="45" width="30" height="4" fill="#8B5CF6" rx="1" />
              <rect x="12" y="50" width="36" height="6" fill="#A855F7" rx="1" />
              <path d="M14 52h32M14 54h32" stroke="#D946EF" strokeWidth="0.8" />
              <ellipse cx="50" cy="53" rx="3" ry="2" fill="#EF4444" />
            </svg>
          </div>
        );
      case 'satellite':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 50 50" fill="none" opacity={shape.opacity}>
              <rect x="20" y="20" width="10" height="10" fill="#8B5CF6" stroke="#D946EF" strokeWidth="1" />
              <rect x="5" y="22" width="12" height="6" fill="#0EA5E9" stroke="#F97316" strokeWidth="0.8" />
              <rect x="33" y="22" width="12" height="6" fill="#0EA5E9" stroke="#F97316" strokeWidth="0.8" />
              <path d="M30 10 Q35 5, 40 10" stroke="#EF4444" strokeWidth="1.2" />
              <path d="M30 7 Q37 2, 44 7" stroke="#EF4444" strokeWidth="0.8" />
            </svg>
          </div>
        );
      case 'drone':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 60 60" fill="none" opacity={shape.opacity}>
              <rect x="25" y="25" width="10" height="10" fill="#8B5CF6" stroke="#D946EF" strokeWidth="1.5" rx="2" />
              <path d="M30 30 L10 10" stroke="#F97316" strokeWidth="2" />
              <path d="M30 30 L50 10" stroke="#F97316" strokeWidth="2" />
              <path d="M30 30 L10 50" stroke="#F97316" strokeWidth="2" />
              <path d="M30 30 L50 50" stroke="#F97316" strokeWidth="2" />
              <circle cx="10" cy="10" r="7" fill="#0EA5E9" stroke="#D946EF" strokeWidth="1.5" />
              <circle cx="50" cy="10" r="7" fill="#0EA5E9" stroke="#D946EF" strokeWidth="1.5" />
              <circle cx="10" cy="50" r="7" fill="#0EA5E9" stroke="#D946EF" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="7" fill="#0EA5E9" stroke="#D946EF" strokeWidth="1.5" />
              <line x1="3" y1="10" x2="17" y2="10" stroke="#9EA5F9" strokeWidth="2.5" />
              <line x1="10" y1="3" x2="10" y2="17" stroke="#9EA5F9" strokeWidth="2.5" />

              <line x1="43" y1="10" x2="57" y2="10" stroke="#9EA5F9" strokeWidth="2.5" />
              <line x1="50" y1="3" x2="50" y2="17" stroke="#9EA5F9" strokeWidth="2.5" />

              <line x1="3" y1="50" x2="17" y2="50" stroke="#9EA5F9" strokeWidth="2.5" />
              <line x1="10" y1="43" x2="10" y2="57" stroke="#9EA5F9" strokeWidth="2.5" />

              <line x1="43" y1="50" x2="57" y2="50" stroke="#9EA5F9" strokeWidth="2.5" />
              <line x1="50" y1="43" x2="50" y2="57" stroke="#9EA5F9" strokeWidth="2.5" />
              <circle cx="30" cy="36" r="3.5" fill="#EF4444" stroke="#10B981" strokeWidth="1.5" />
            </svg>
          </div>
        );
      case 'neural-network':
        return (
          <div key={shape.id} style={style}>
            <svg viewBox="0 0 60 60" fill="none" opacity={shape.opacity}>
              <circle cx="10" cy="10" r="3" fill="#0EA5E9" />
              <circle cx="10" cy="30" r="3" fill="#0EA5E9" />
              <circle cx="10" cy="50" r="3" fill="#0EA5E9" />
              <circle cx="30" cy="5" r="3" fill="#F97316" />
              <circle cx="30" cy="20" r="3" fill="#F97316" />
              <circle cx="30" cy="40" r="3" fill="#F97316" />
              <circle cx="30" cy="55" r="3" fill="#F97316" />
              <circle cx="45" cy="10" r="3" fill="#D946EF" />
              <circle cx="45" cy="30" r="3" fill="#D946EF" />
              <circle cx="45" cy="50" r="3" fill="#D946EF" />
              <circle cx="55" cy="30" r="3" fill="#10B981" />
              <path d="M10 10 L30 5" stroke="#F97316" strokeWidth="1.2" />
              <path d="M10 10 L30 20" stroke="#F97316" strokeWidth="1.2" />
              <path d="M10 30 L30 20" stroke="#F97316" strokeWidth="1.2" />
              <path d="M10 30 L30 40" stroke="#F97316" strokeWidth="1.2" />
              <path d="M10 50 L30 40" stroke="#F97316" strokeWidth="1.2" />
              <path d="M10 50 L30 55" stroke="#F97316" strokeWidth="1.2" />
              <path d="M30 5 L45 10" stroke="#D946EF" strokeWidth="1.2" />
              <path d="M30 20 L45 10" stroke="#D946EF" strokeWidth="1.2" />
              <path d="M30 20 L45 30" stroke="#D946EF" strokeWidth="1.2" />
              <path d="M30 40 L45 30" stroke="#D946EF" strokeWidth="1.2" />
              <path d="M30 40 L45 50" stroke="#D946EF" strokeWidth="1.2" />
              <path d="M30 55 L45 50" stroke="#D946EF" strokeWidth="1.2" />
              <path d="M45 10 L55 30" stroke="#10B981" strokeWidth="1.5" />
              <path d="M45 30 L55 30" stroke="#10B981" strokeWidth="1.5" />
              <path d="M45 50 L55 30" stroke="#10B981" strokeWidth="1.5" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-(--color-background) to-(--color-primary)"
    >
      {/* Particles Background */}
      {mounted && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0"
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                },
                onHover: {
                  enable: true,
                  mode: "connect",
                },
                resize: true,
              },
              modes: {
                connect: {
                  distance: 150,
                  links: {
                    opacity: 0.2
                  },
                  radius: 100
                }
              },
            },
            particles: {
              color: {
                value: "#8B5CF6",
              },
              links: {
                color: "#9b87f5",
                distance: 200,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              collisions: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 100,
              },
              opacity: {
                value: 0.3,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.3,
                }
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 0.1,
                }
              },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Random Tech/UFO Shapes */}
      {shapes.map(renderShape)}

      {/* Background Elements */}
      <div
        ref={bgRef}
        className="absolute w-full h-full top-0 left-0 right-0 bottom-0 pointer-events-none"
      >
        <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-[#D946EF] opacity-10 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 rounded-full bg-[#8B5CF6] opacity-10 blur-3xl"></div>
      </div>

      {/* Festival Content */}
      <div
        ref={parallaxRef}
        className="container mx-auto px-6 z-10 parallax text-center space-y-6 mt-16"
      >
        <motion.ul animate={{ rotate: 360 }} />
        {children}
      </div>
      
      

    </section>
  );
};

export default AnimatedBg;
