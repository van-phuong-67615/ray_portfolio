"use client";

import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolioData";

interface ProjectsCityProps {
  characterWorldX: number;
  sectionStart: number;
  onOpenProject: (project: (typeof projects)[0]) => void;
}

const BUILDING_SPACING = 420;

function Building({
  project,
  x,
  isNear,
  index,
  onClick,
}: {
  project: (typeof projects)[0];
  x: number;
  isNear: boolean;
  index: number;
  onClick: () => void;
}) {
  const heights = [280, 200, 240, 180, 260];
  const widths = [120, 160, 130, 150, 140];
  const h = heights[index % heights.length];
  const w = widths[index % widths.length];

  return (
    <div className="absolute" style={{ left: x, bottom: 80 }}>
      {/* Interaction prompt */}
      <AnimatePresence>
        {isNear && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute font-pixel text-center cursor-pointer"
            style={{
              bottom: h + 16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#ffd700",
              fontSize: 8,
              textShadow: "0 0 10px #ffd700",
              whiteSpace: "nowrap",
              zIndex: 20,
            }}
            onClick={onClick}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ▲ PRESS [E] / CLICK
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Building body */}
      <motion.div
        onClick={isNear ? onClick : undefined}
        className="relative cursor-pointer"
        style={{
          width: w,
          height: h,
          background: `linear-gradient(180deg, ${project.color}ee 0%, ${project.color}88 100%)`,
          border: `2px solid ${isNear ? "#ffd700" : project.color}`,
          boxShadow: isNear
            ? `0 0 25px ${project.color}80, 0 0 10px #ffd70040`
            : `0 0 10px ${project.color}30`,
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        animate={isNear ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 0.5, repeat: isNear ? Infinity : 0 }}
      >
        {/* Windows */}
        <div className="p-2 grid gap-1" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {Array.from({ length: Math.floor(h / 40) * 3 }, (_, wi) => (
            <motion.div
              key={wi}
              className="rounded-sm"
              style={{
                height: 14,
                background:
                  wi % 3 === 0
                    ? "rgba(255,255,100,0.7)"
                    : wi % 3 === 1
                    ? "rgba(100,200,255,0.5)"
                    : "rgba(50,50,80,0.5)",
              }}
              animate={
                isNear && wi % 4 === 0
                  ? { opacity: [1, 0.3, 1] }
                  : {}
              }
              transition={{ duration: 0.5 + wi * 0.1, repeat: Infinity }}
            />
          ))}
        </div>

        {/* Building name sign */}
        <div
          className="absolute bottom-0 left-0 right-0 font-pixel text-center py-1"
          style={{
            fontSize: 7,
            background: "rgba(0,0,0,0.8)",
            color: "#ffd700",
            borderTop: `1px solid ${project.color}`,
          }}
        >
          {project.name}
        </div>

        {/* Antenna */}
        <div
          className="absolute top-0 left-1/2"
          style={{
            transform: "translateX(-50%)",
            width: 2,
            height: 24,
            background: "#666",
            marginTop: -24,
          }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 6,
              height: 6,
              background: "#ff0000",
            }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsCity({
  characterWorldX,
  sectionStart,
  onOpenProject,
}: ProjectsCityProps) {
  const PROXIMITY = 150;

  return (
    <div
      className="absolute top-0"
      style={{ left: sectionStart, width: "2300px", height: "100%" }}
    >
      {/* Zone label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div
          className="font-pixel text-center px-4 py-2 rounded"
          style={{
            fontSize: 10,
            background: "rgba(0,0,20,0.85)",
            border: "2px solid #00ffff",
            color: "#00ffff",
            textShadow: "0 0 10px #00ffff",
          }}
        >
          🏙️ PROJECTS CITY
        </div>
      </div>

      {/* City ambient glow */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 200,
          background:
            "linear-gradient(0deg, rgba(0,50,100,0.2) 0%, transparent 100%)",
        }}
      />

      {/* Buildings */}
      {projects.map((project, i) => {
        const buildingX = sectionStart + 100 + i * BUILDING_SPACING;
        const isNear = Math.abs(characterWorldX - (buildingX + 60)) < PROXIMITY;
        return (
          <Building
            key={project.id}
            project={project}
            x={100 + i * BUILDING_SPACING}
            isNear={isNear}
            index={i}
            onClick={() => onOpenProject(project)}
          />
        );
      })}

      {/* Street lights */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: 60 + i * 460, bottom: 80 }}
        >
          <div style={{ width: 4, height: 60, background: "#444", margin: "0 auto" }} />
          <motion.div
            className="rounded-full"
            style={{
              width: 16,
              height: 16,
              background: "#ffe066",
              boxShadow: "0 0 20px #ffe06680",
              marginTop: -8,
              marginLeft: -6,
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        </div>
      ))}
    </div>
  );
}
