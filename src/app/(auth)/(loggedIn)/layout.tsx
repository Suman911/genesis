'use client';
import { useRef } from "react";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const blobRef = useRef<HTMLDivElement>(null);

    const shapes = [
        { type: "circle", style: "top-[15%] left-[8%] w-24 h-24 bg-primary/10" },
        { type: "square", style: "top-[60%] right-[12%] w-20 h-20 bg-primary/10" },
        { type: "triangle", style: "bottom-[20%] left-[15%] w-16 h-16 bg-info/10" },
    ];

    return (
        <>
            <section className="relative min-h-screen overflow-hidden bg-background py-10">
                <div className="w-full min-h-screen flex flex-col bg-linear-to-b from-background via-purple-950/20 to-background">
                    {/* Random Floating Shapes */}
                    {shapes.map((shape, i) => (
                        <div
                            key={i}
                            className={`absolute ${shape.style} rounded-full blur-2xl animate-float opacity-30`}
                            style={{ animationDelay: `${i * 2}s` }}
                        />
                    ))}
                    {/* Purple Transparent Blobs with Parallax & Morphing */}
                    <div ref={blobRef} className="absolute w-full h-full top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-[#D946EF] opacity-20 blur-3xl animate-morph-border transition-transform duration-300 ease-out" />
                        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-[#8B5CF6] opacity-20 blur-3xl animate-morph-border transition-transform duration-300 ease-out" style={{ animationDelay: "1s" }} />
                    </div>
                    {children}
                </div>
            </section>
        </>
    );
}