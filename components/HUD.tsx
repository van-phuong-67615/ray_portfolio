"use client";

import { motion } from "framer-motion";

interface HUDProps {
  worldOffset: number;
  worldWidth: number;
  currentZone: string;
  onClassicView: () => void;
}

const zones = [
  { name: "HERO", start: 0 },
  { name: "SKILLS", start: 0.16 },
  { name: "PROJECTS", start: 0.47 },
  { name: "HISTORY", start: 0.77 },
];

export default function HUD({ worldOffset, worldWidth, currentZone, onClassicView }: HUDProps) {
  const progress = Math.min(1, worldOffset / (worldWidth - (typeof window !== "undefined" ? window.innerWidth : 1440)));

  return (
    <>
      {/* Top HUD bar */}
      <div
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(167,139,250,0.2)",
        }}
      >
        {/* Left: Name + zone */}
        <div className="flex items-center gap-3">
          <div
            className="font-pixel"
            style={{ fontSize: 9, color: "#a78bfa", textShadow: "0 0 8px #a78bfa" }}
          >
            NVP
          </div>
          <motion.div
            key={currentZone}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-pixel"
            style={{ fontSize: 8, color: "#00ffff" }}
          >
            {currentZone}
          </motion.div>
        </div>

        {/* Center: Mini-map progress */}
        <div className="flex items-center gap-2 flex-1 mx-6 max-w-xs">
          <div
            className="relative flex-1 rounded-full overflow-hidden"
            style={{ height: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #7c3aed, #00ffff)",
                boxShadow: "0 0 8px #a78bfa",
              }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            {/* Zone markers */}
            {zones.map((z) => (
              <div
                key={z.name}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${z.start * 100}%`,
                  width: 2,
                  background: "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
          <div className="font-pixel" style={{ fontSize: 7, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
            {Math.round(progress * 100)}%
          </div>
        </div>

        {/* Right: Classic View button */}
        <button
          onClick={onClassicView}
          className="font-pixel rounded px-3 py-1 transition-all hover:scale-105 active:scale-95"
          style={{
            fontSize: 8,
            background: "rgba(124, 58, 237, 0.2)",
            border: "1px solid #7c3aed",
            color: "#c4b5fd",
            boxShadow: "0 0 10px rgba(124,58,237,0.3)",
          }}
        >
          📄 CV VIEW
        </button>
      </div>

      {/* Controls hint (bottom right) */}
      <div
        className="fixed bottom-4 right-4 z-30 font-pixel text-right hidden md:block"
        style={{ fontSize: 7, color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}
      >
        <div>← → MOVE</div>
        <div>SCROLL WORLD</div>
        <div>[E] INTERACT</div>
        <div>[C] CV VIEW</div>
      </div>
    </>
  );
}
