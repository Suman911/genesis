'use client';
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import BgParticles from "./bgParticles";
import renderShape, { Shape } from "./bgShapes";

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
        const staticShapeTypes = ['injection', 'microscope', 'testtube', 'biocell', 'dna', 'chemical'];

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

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-primary"
        >
            {/* Particles Background */}
            <BgParticles />

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
