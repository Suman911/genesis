'use client';
import { useEffect, useState } from 'react';

export const Spinner = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <div className="relative">
      {[0, 1, 2].map((quantum) => {
        const size = 200 - quantum * 50;
        const color = `hsl(${228 + quantum * 60}, 47%, ${40 + quantum * 15}%)`;
        return (
          <div
            key={quantum}
            className="absolute animate-spin border-t-4 border-l-4 border-solid rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `calc(50% - ${size / 2}px)`,
              left: `calc(50% - ${size / 2}px)`,
              borderColor: color,
              opacity: 0.6 + quantum * 0.2,
              animationDuration: `${1.5 + quantum * 0.7}s`,
            }}
          >
            <div className="absolute left-1/3 -top-5 w-3 h-3 bg-primary rounded-full" />
          </div>
        );
      })}
      {children}
    </div>
  );
}

export default function Preloader() {
  const [fadeOut, setFadeOut] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeOut(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const fadeTimeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(fadeTimeout);
    }
  }, [fadeOut]);

  if (!show) return null;

  return (
    <div
      className={`fixed bg-primary-fade/70 z-100 flex justify-center items-center h-screen w-screen transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <Spinner>
        <img src="/assets/images/logo_main.png" alt="Logo" className="w-16 h-16" />
      </Spinner>
    </div>
  );
}
