"use client";

import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolioData";

interface SkillsForestProps {
  characterWorldX: number;
  sectionStart: number;
}

// Tree component
function SkillTree({
  skill,
  x,
  isNear,
  index,
}: {
  skill: (typeof skills)[0];
  x: number;
  isNear: boolean;
  index: number;
}) {
  const treeHeight = 80 + (index % 3) * 30;

  return (
    <div className="absolute" style={{ left: x, bottom: 80 }}>
      {/* Skill badge (floating above tree) */}
      <motion.div
        className="absolute font-pixel text-center rounded px-2 py-1"
        style={{
          bottom: treeHeight + 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.85)",
          border: `2px solid ${skill.color}`,
          color: skill.color,
          fontSize: 11,
          whiteSpace: "nowrap",
          boxShadow: `0 0 10px ${skill.color}50`,
          zIndex: 10,
          minWidth: 70,
        }}
        animate={
          isNear
            ? {
                y: [0, -20, -8, -15, 0],
                scale: [1, 1.2, 1.1, 1.15, 1],
                transition: { duration: 0.6, ease: "easeOut" },
              }
            : {
                y: [0, -5, 0],
                transition: { duration: 2 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        {skill.name}
      </motion.div>

      {/* Tree trunk */}
      <div
        className="mx-auto"
        style={{
          width: 10,
          height: treeHeight,
          background: "#4a2a0a",
          border: "2px solid #2a1000",
        }}
      />

      {/* Bottom foliage */}
      <div
        className="mx-auto"
        style={{
          width: 0,
          height: 0,
          borderLeft: "40px solid transparent",
          borderRight: "40px solid transparent",
          borderBottom: `60px solid #1a4a1a`,
          position: "absolute",
          bottom: treeHeight * 0.4,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      {/* Middle foliage */}
      <div
        className="mx-auto"
        style={{
          width: 0,
          height: 0,
          borderLeft: "32px solid transparent",
          borderRight: "32px solid transparent",
          borderBottom: "50px solid #2a6a2a",
          position: "absolute",
          bottom: treeHeight * 0.55,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      {/* Top foliage */}
      <div
        className="mx-auto"
        style={{
          width: 0,
          height: 0,
          borderLeft: "22px solid transparent",
          borderRight: "22px solid transparent",
          borderBottom: "40px solid #3a8a3a",
          position: "absolute",
          bottom: treeHeight * 0.7,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Glow ring when near */}
      {isNear && (
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: treeHeight * 0.5,
            left: "50%",
            transform: "translateX(-50%)",
            width: 100,
            height: 100,
            border: `2px solid ${skill.color}`,
            boxShadow: `0 0 20px ${skill.color}40`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.8, 0, 0.8], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Description card (shows when near AND skill has description) */}
      <AnimatePresence>
        {isNear && skill.description && (
          <motion.div
            className="absolute rounded-lg"
            style={{
              bottom: treeHeight + 80,
              left: "50%",
              transform: "translateX(-50%)",
              width: 280,
              background: "rgba(0,0,0,0.92)",
              border: `2px solid ${skill.color}`,
              boxShadow: `0 0 20px ${skill.color}40`,
              padding: "10px 12px",
              zIndex: 20,
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Card title */}
            <div
              className="font-pixel mb-2"
              style={{ fontSize: 9, color: skill.color, textShadow: `0 0 8px ${skill.color}` }}
            >
              ⚡ {skill.name.toUpperCase()} — DETAILS
            </div>
            {/* Description text */}
            <p
              style={{
                fontSize: 12,
                color: "#d1d5db",
                fontFamily: "Inter, sans-serif",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {skill.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SkillsForest({ characterWorldX, sectionStart }: SkillsForestProps) {
  const TREE_SPACING = 160;
  const PROXIMITY = 130;

  return (
    <div
      className="absolute top-0"
      style={{ left: sectionStart, width: "2000px", height: "100%" }}
    >
      {/* Forest zone label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div
          className="font-pixel text-center px-4 py-2 rounded"
          style={{
            fontSize: 10,
            background: "rgba(0,20,0,0.8)",
            border: "2px solid #39ff14",
            color: "#39ff14",
            textShadow: "0 0 10px #39ff14",
          }}
        >
          🌲 SKILLS FOREST
        </div>
      </div>

      {/* Ambient fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,20,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,20,0,0.3) 100%)",
        }}
      />

      {/* Trees */}
      {skills.map((skill, i) => {
        const treeX = sectionStart + 80 + i * TREE_SPACING;
        const isNear = Math.abs(characterWorldX - treeX) < PROXIMITY;
        return (
          <SkillTree
            key={skill.name}
            skill={skill}
            x={80 + i * TREE_SPACING}
            isNear={isNear}
            index={i}
          />
        );
      })}

      {/* Fireflies */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: 100 + i * 160,
            bottom: 120 + (i % 4) * 40,
            width: 4,
            height: 4,
            background: "#39ff14",
            boxShadow: "0 0 6px #39ff14",
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            opacity: [0.8, 0.2, 0.9, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}
