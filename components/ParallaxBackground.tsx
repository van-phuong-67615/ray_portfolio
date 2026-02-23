"use client";

import { useMemo } from "react";

interface ParallaxBackgroundProps {
  worldOffset: number;
}

// Deterministic pseudo-random based on seed
function seededRand(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function ParallaxBackground({ worldOffset }: ParallaxBackgroundProps) {
  // Layer 1: Stars/clouds (very slow)
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        x: seededRand(i * 13) * 7000,
        y: seededRand(i * 17) * 40,
        size: seededRand(i * 7) * 3 + 1,
        opacity: seededRand(i * 11) * 0.6 + 0.2,
      })),
    []
  );

  // Clouds
  const clouds = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        x: seededRand(i * 31) * 7000,
        y: seededRand(i * 37) * 120 + 20,
        width: seededRand(i * 41) * 120 + 60,
        opacity: seededRand(i * 43) * 0.5 + 0.2,
      })),
    []
  );

  // Layer 2: Mountains (medium)
  const mountains = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        x: i * 250 + seededRand(i * 53) * 100,
        height: seededRand(i * 59) * 180 + 80,
        width: seededRand(i * 61) * 160 + 100,
        color: i % 3 === 0 ? "#2d1b69" : i % 3 === 1 ? "#1a0e3d" : "#3d2a85",
      })),
    []
  );

  // Layer 3: Background trees/hills (faster, near terrain)
  const bgTrees = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        x: i * 110 + seededRand(i * 71) * 60,
        height: seededRand(i * 73) * 70 + 40,
        color: i % 2 === 0 ? "#1a3a1a" : "#0f2a0f",
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0a0015 0%, #1a0533 30%, #2d1b69 60%, #1a3a1a 85%, #0a1a0a 100%)",
        }}
      />

      {/* Stars - Layer 0 (slowest) */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateX(${-worldOffset * 0.05}px)` }}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: star.x,
              top: star.y + "%",
              width: star.size,
              height: star.size,
              background: "#ffffff",
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Clouds - Layer 1 */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateX(${-worldOffset * 0.1}px)` }}
      >
        {clouds.map((cloud, i) => (
          <div
            key={i}
            className="absolute"
            style={{ left: cloud.x, top: cloud.y, opacity: cloud.opacity }}
          >
            <div
              className="rounded-full"
              style={{
                width: cloud.width,
                height: cloud.width * 0.4,
                background: "rgba(200, 180, 255, 0.4)",
                filter: "blur(8px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: cloud.width * 0.6,
                height: cloud.width * 0.35,
                background: "rgba(220, 200, 255, 0.35)",
                filter: "blur(5px)",
                top: -cloud.width * 0.1,
                left: cloud.width * 0.2,
              }}
            />
          </div>
        ))}
      </div>

      {/* Mountains - Layer 2 */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: "8000px",
          height: "100%",
          transform: `translateX(${-worldOffset * 0.3}px)`,
        }}
      >
        {mountains.map((m, i) => (
          <div
            key={i}
            className="absolute bottom-32"
            style={{
              left: m.x,
              width: 0,
              height: 0,
              borderLeft: `${m.width / 2}px solid transparent`,
              borderRight: `${m.width / 2}px solid transparent`,
              borderBottom: `${m.height}px solid ${m.color}`,
            }}
          />
        ))}
      </div>

      {/* Background trees - Layer 3 */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: "8000px",
          height: "100%",
          transform: `translateX(${-worldOffset * 0.6}px)`,
        }}
      >
        {bgTrees.map((tree, i) => (
          <div key={i} className="absolute" style={{ left: tree.x, bottom: 80 }}>
            {/* Trunk */}
            <div
              className="mx-auto"
              style={{ width: 6, height: 20, background: "#2a1a0a" }}
            />
            {/* Foliage */}
            <div
              className="mx-auto -mt-2"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${tree.height * 0.25}px solid transparent`,
                borderRight: `${tree.height * 0.25}px solid transparent`,
                borderBottom: `${tree.height * 0.6}px solid ${tree.color}`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Ground base layer */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 80,
          background: "linear-gradient(180deg, #1a3a1a 0%, #0a1a0a 100%)",
        }}
      />

      {/* Ground highlight line */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 78,
          height: 3,
          background: "linear-gradient(90deg, transparent, #39ff14, #39ff14, transparent)",
          opacity: 0.4,
          boxShadow: "0 0 10px #39ff14",
        }}
      />

      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
          opacity: 0.3,
        }}
      />
    </div>
  );
}
