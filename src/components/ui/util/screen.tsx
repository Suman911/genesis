"use client";

import React, { useEffect, useState } from "react";

const breakpoints = [
  { name: "2xl", min: 1536 },
  { name: "xl", min: 1280 },
  { name: "lg", min: 1024 },
  { name: "md", min: 768 },
  { name: "sm", min: 640 },
  { name: "xs", min: 0 },
];

function getBreakpoint(width: number) {
  for (const bp of breakpoints) {
    if (width >= bp.min) {
      return bp.name;
    }
  }
  return "xs";
}

export function ScreenSize() {
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState({ width: 0, breakpoint: "xs" });

  useEffect(() => {
    setMounted(true);
    function handleResize() {
      const width = window.innerWidth;
      setSize({ width, breakpoint: getBreakpoint(width) });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 left-15 bg-gray-900 text-white px-4 py-2 rounded-lg font-mono text-sm z-50 opacity-80 pointer-events-none select-none">
      <span>
        {size.width}px — <b>{size.breakpoint}</b>
      </span>
    </div>
  );
};