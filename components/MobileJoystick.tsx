"use client";

import React, { useRef, useCallback } from "react";

interface MobileJoystickProps {
  onDelta: (delta: number) => void;
}

export default function MobileJoystick({ onDelta }: MobileJoystickProps) {
  const stickRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const isActive = useRef(false);
  const startX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isActive.current = true;
    startX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isActive.current || !stickRef.current) return;
      const dx = e.touches[0].clientX - startX.current;
      const clamped = Math.max(-40, Math.min(40, dx));

      stickRef.current.style.transform = `translateX(${clamped}px)`;

      if (Math.abs(dx) > 8) {
        onDelta(dx > 0 ? 1 : -1);
      } else {
        onDelta(0);
      }
    },
    [onDelta]
  );

  const handleTouchEnd = useCallback(() => {
    isActive.current = false;
    if (stickRef.current) {
      stickRef.current.style.transform = "translateX(0px)";
    }
    onDelta(0);
  }, [onDelta]);

  return (
    <div className="fixed bottom-8 left-8 z-40 md:hidden select-none">
      {/* Base */}
      <div
        ref={baseRef}
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 100,
          height: 100,
          background: "rgba(255,255,255,0.08)",
          border: "2px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Stick */}
        <div
          ref={stickRef}
          className="rounded-full transition-none"
          style={{
            width: 44,
            height: 44,
            background: "rgba(167, 139, 250, 0.8)",
            border: "2px solid #a78bfa",
            boxShadow: "0 0 15px rgba(167, 139, 250, 0.5)",
            touchAction: "none",
          }}
        />
        {/* Direction arrows */}
        <div
          className="absolute left-2 font-pixel"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}
        >
          ◀
        </div>
        <div
          className="absolute right-2 font-pixel"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}
        >
          ▶
        </div>
      </div>
      <div
        className="font-pixel text-center mt-2"
        style={{ fontSize: 7, color: "rgba(255,255,255,0.4)" }}
      >
        DRAG TO MOVE
      </div>
    </div>
  );
}
