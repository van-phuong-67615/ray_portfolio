"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
interface HeroStationProps {
  worldOffset: number;
}

export default function HeroStation({ worldOffset: _worldOffset }: HeroStationProps) {
  return (
    <div
      className="absolute top-0 left-0 flex flex-col items-center justify-center"
      style={{ width: "100vw", height: "100%", paddingBottom: 120 }}
    >
      {/* Floating platform */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Title card */}
        <div
          className="relative px-8 py-6 rounded-lg text-center"
          style={{
            background: "rgba(10, 0, 30, 0.85)",
            border: "2px solid #7c3aed",
            boxShadow: "0 0 30px rgba(124, 58, 237, 0.5), inset 0 0 20px rgba(124, 58, 237, 0.1)",
          }}
        >
          {/* Corner decorations */}
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-3 h-3 border-purple-400`}
              style={{
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#a78bfa",
                ...{
                  borderRight: i % 2 === 0 ? "none" : undefined,
                  borderLeft: i % 2 === 1 ? "none" : undefined,
                  borderBottom: i < 2 ? "none" : undefined,
                  borderTop: i >= 2 ? "none" : undefined,
                },
              }}
            />
          ))}

          {/* Name */}
          <motion.h1
            className="font-pixel text-white mb-2"
            style={{
              fontSize: "clamp(18px, 3.2vw, 36px)",
              textShadow: "0 0 20px #a78bfa, 0 0 40px #7c3aed",
              letterSpacing: "0.05em",
            }}
            animate={{
              textShadow: [
                "0 0 20px #a78bfa, 0 0 40px #7c3aed",
                "0 0 30px #c4b5fd, 0 0 60px #8b5cf6",
                "0 0 20px #a78bfa, 0 0 40px #7c3aed",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            NGUYEN VAN PHUONG
          </motion.h1>

          {/* Role */}
          <div
            className="font-pixel mb-4"
            style={{
              fontSize: "clamp(8px, 1.2vw, 14px)",
              color: "#00ffff",
              textShadow: "0 0 10px #00ffff",
            }}
          >
            &lt; FRONT-END DEVELOPER /&gt;
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {["React JS", "Next.js", "TypeScript", "3+ Years"].map((tag) => (
              <span
                key={tag}
                className="font-pixel rounded px-2 py-1"
                style={{
                  fontSize: "clamp(6px, 0.9vw, 10px)",
                  background: "rgba(124, 58, 237, 0.3)",
                  border: "1px solid #7c3aed",
                  color: "#e9d5ff",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Location & Contact */}
          <div
            className="text-gray-400 mb-3"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(10px, 1.1vw, 13px)" }}
          >
            📍 Hoa Vang, Da Nang &nbsp;|&nbsp; ✉️ vanphuong131401@gmail.com
          </div>

          {/* Summary */}
          <div
            className="mb-3 text-left"
            style={{
              fontSize: "clamp(9px, 1vw, 12px)",
              color: "#d1d5db",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.6,
              maxWidth: 420,
            }}
          >
            {personalInfo.summary}
          </div>

          {/* Additional Info */}
          {personalInfo.additionalInfo && personalInfo.additionalInfo.length > 0 && (
            <div className="mb-4 flex flex-col gap-1">
              {personalInfo.additionalInfo.map((item, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "clamp(8px, 0.9vw, 11px)",
                    color: "#a78bfa",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* Prompt */}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="font-pixel text-yellow-400"
            style={{ fontSize: "clamp(6px, 0.9vw, 10px)" }}
          >
            ▶ SCROLL OR PRESS → TO START ADVENTURE
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative ground sign */}
      <div className="absolute bottom-24 flex flex-col items-center">
        <div
          className="font-pixel text-center px-3 py-2 rounded"
          style={{
            fontSize: 8,
            background: "#2a1a0a",
            border: "2px solid #8B4513",
            color: "#ffd700",
          }}
        >
          HERO STATION
        </div>
        <div style={{ width: 6, height: 40, background: "#8B4513", margin: "0 auto" }} />
      </div>
    </div>
  );
}
