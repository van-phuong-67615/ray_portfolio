"use client";

import { motion } from "framer-motion";
import { experiences, education } from "@/data/portfolioData";

interface ExperienceTimelineProps {
  characterWorldX: number;
  sectionStart: number;
}

export default function ExperienceTimeline({
  characterWorldX,
  sectionStart,
}: ExperienceTimelineProps) {
  const MILESTONE_SPACING = 380;
  const PROXIMITY = 160;

  return (
    <div
      className="absolute top-0"
      style={{ left: sectionStart, width: "1800px", height: "100%" }}
    >
      {/* Zone label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div
          className="font-pixel text-center px-4 py-2 rounded"
          style={{
            fontSize: 10,
            background: "rgba(20,10,0,0.85)",
            border: "2px solid #ffd700",
            color: "#ffd700",
            textShadow: "0 0 10px #ffd700",
          }}
        >
          🪧 EXPERIENCE TIMELINE
        </div>
      </div>

      {/* Road / Path */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: 80,
          height: 20,
          background: "#333",
          borderTop: "2px solid #555",
          borderBottom: "2px solid #222",
        }}
      />
      {/* Road dashes */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: i * 90,
            bottom: 88,
            width: 50,
            height: 4,
            background: "#ffd700",
            opacity: 0.6,
          }}
        />
      ))}

      {/* Experience milestones */}
      {experiences.map((exp, i) => {
        const signX = sectionStart + 80 + i * MILESTONE_SPACING;
        const isNear = Math.abs(characterWorldX - signX) < PROXIMITY;

        return (
          <div key={exp.id} className="absolute" style={{ left: 80 + i * MILESTONE_SPACING, bottom: 96 }}>
            {/* Sign pole */}
            <div
              className="mx-auto"
              style={{ width: 6, height: 120, background: "#8B4513" }}
            />

            {/* Sign board */}
            <motion.div
              className="absolute rounded"
              style={{
                bottom: 80,
                left: "50%",
                transform: "translateX(-50%)",
                width: 240,
                background: isNear
                  ? `linear-gradient(135deg, ${exp.color}cc, ${exp.color}88)`
                  : "rgba(20, 10, 0, 0.9)",
                border: `2px solid ${isNear ? "#ffd700" : "#8B4513"}`,
                padding: "10px 14px",
                boxShadow: isNear
                  ? `0 0 20px ${exp.color}60, 0 0 40px #ffd70030`
                  : "none",
                transition: "all 0.4s ease",
              }}
              animate={isNear ? { rotate: [-1, 1, -1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div
                className="font-pixel mb-1"
                style={{ fontSize: 9, color: "#ffd700", textShadow: "0 0 6px #ffd700" }}
              >
                {exp.period}
              </div>
              <div
                className="font-pixel mb-1"
                style={{ fontSize: 11, color: "#ffffff" }}
              >
                {exp.company}
              </div>
              <div
                style={{ fontSize: 11, color: "#a0cfff", fontFamily: "Inter, sans-serif" }}
              >
                {exp.role}
              </div>

              {isNear && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 pt-2"
                  style={{
                    borderTop: "1px solid rgba(255,215,0,0.3)",
                    fontSize: 10,
                    color: "#d1d5db",
                    fontFamily: "Inter, sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  {exp.description}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="font-pixel rounded px-1"
                        style={{
                          fontSize: 7,
                          background: "rgba(255,215,0,0.15)",
                          border: "1px solid rgba(255,215,0,0.4)",
                          color: "#ffd700",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        );
      })}

      {/* Education milestone */}
      <div className="absolute" style={{ left: 80 + experiences.length * MILESTONE_SPACING, bottom: 96 }}>
        <div className="mx-auto" style={{ width: 6, height: 120, background: "#8B4513" }} />
        <motion.div
          className="absolute rounded"
          style={{
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 240,
            background: "rgba(0,0,40,0.9)",
            border: "2px solid #60a5fa",
            padding: "10px 14px",
          }}
          animate={{
            boxShadow: [
              "0 0 10px rgba(96,165,250,0.3)",
              "0 0 20px rgba(96,165,250,0.5)",
              "0 0 10px rgba(96,165,250,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="font-pixel mb-1" style={{ fontSize: 9, color: "#60a5fa" }}>
            {education.period}
          </div>
          <div className="font-pixel mb-1" style={{ fontSize: 10, color: "#ffffff" }}>
            🎓 EDUCATION
          </div>
          <div style={{ fontSize: 11, color: "#93c5fd", fontFamily: "Inter, sans-serif" }}>
            {education.school}
          </div>
          <div style={{ fontSize: 10, color: "#d1d5db", fontFamily: "Inter, sans-serif", marginTop: 4 }}>
            {education.major}
          </div>
          <div style={{ fontSize: 10, color: "#fbbf24", fontFamily: "Inter, sans-serif", marginTop: 4 }}>
            🏆 {education.achievements[0]}
          </div>
        </motion.div>
      </div>

      {/* End of world cliff */}
      <div
        className="absolute"
        style={{ right: 0, bottom: 80, width: 60, height: 80, background: "#1a3a1a" }}
      >
        <div className="font-pixel text-center py-1" style={{ fontSize: 7, color: "#39ff14" }}>
          THE END
        </div>
      </div>
    </div>
  );
}
