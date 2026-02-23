"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useGameController } from "@/hooks/useGameController";
import ParallaxBackground from "@/components/ParallaxBackground";
import Character from "@/components/Character";
import HeroStation from "@/components/sections/HeroStation";
import SkillsForest from "@/components/sections/SkillsForest";
import ProjectsCity from "@/components/sections/ProjectsCity";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import ProjectModal from "@/components/ProjectModal";
import ClassicView from "@/components/ClassicView";
import MobileJoystick from "@/components/MobileJoystick";
import HUD from "@/components/HUD";
import { projects } from "@/data/portfolioData";

// World section starting positions
const SECTION_STARTS = {
  hero: 0,
  skills: 1000,
  projects: 3000,
  experience: 5500,
};

const WORLD_WIDTH = 7500;
const CHARACTER_SCREEN_X = 0.2; // character sits at 20% of screen width

function getZoneName(worldOffset: number, screenWidth: number): string {
  const charWorldX = worldOffset + screenWidth * CHARACTER_SCREEN_X;
  if (charWorldX < SECTION_STARTS.skills) return "HERO STATION";
  if (charWorldX < SECTION_STARTS.projects) return "SKILLS FOREST";
  if (charWorldX < SECTION_STARTS.experience) return "PROJECTS CITY";
  return "EXPERIENCE TIMELINE";
}

export default function GameCanvas() {
  const isPausedRef = useRef(false);
  const { worldOffset, isWalking, direction, setJoystickDelta } = useGameController(isPausedRef);
  const [screenWidth, setScreenWidth] = useState(1440);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [classicViewOpen, setClassicViewOpen] = useState(false);

  // Keep isPausedRef in sync with overlay states (synchronous, no extra render)
  useEffect(() => {
    isPausedRef.current = classicViewOpen || selectedProject !== null;
  }, [classicViewOpen, selectedProject]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // C key toggles Classic View
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "c" || e.key === "C") {
        setClassicViewOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // E key opens nearest project if close enough
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "e" || e.key === "E") {
        if (selectedProject) {
          setSelectedProject(null);
          return;
        }
        const charWorldX = worldOffset + screenWidth * CHARACTER_SCREEN_X;
        const nearby = projects.find((_, i) => {
          const buildingX = SECTION_STARTS.projects + 100 + i * 420 + 60;
          return Math.abs(charWorldX - buildingX) < 150;
        });
        if (nearby) setSelectedProject(nearby);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [worldOffset, screenWidth, selectedProject]);

  const characterWorldX = worldOffset + screenWidth * CHARACTER_SCREEN_X;
  const characterScreenX = screenWidth * CHARACTER_SCREEN_X;
  const zoneName = useMemo(() => getZoneName(worldOffset, screenWidth), [worldOffset, screenWidth]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100vw", height: "100vh", cursor: "default" }}
    >
      {/* Parallax background (fixed to viewport) */}
      <ParallaxBackground worldOffset={worldOffset} />

      {/* World container — slides left as worldOffset increases */}
      <div
        className="absolute top-0 left-0"
        style={{
          width: WORLD_WIDTH,
          height: "100%",
          transform: `translateX(${-worldOffset}px)`,
          willChange: "transform",
        }}
      >
        {/* Ground platform */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: 80,
            background: "linear-gradient(180deg, #2d5a2d 0%, #1a3a1a 50%, #0a1a0a 100%)",
            borderTop: "3px solid #39ff14",
            boxShadow: "0 -4px 20px rgba(57,255,20,0.2)",
          }}
        />

        {/* Sections */}
        <HeroStation worldOffset={worldOffset} />
        <SkillsForest
          characterWorldX={characterWorldX}
          sectionStart={SECTION_STARTS.skills}
        />
        <ProjectsCity
          characterWorldX={characterWorldX}
          sectionStart={SECTION_STARTS.projects}
          onOpenProject={setSelectedProject}
        />
        <ExperienceTimeline
          characterWorldX={characterWorldX}
          sectionStart={SECTION_STARTS.experience}
        />
      </div>

      {/* Character — fixed at CHARACTER_SCREEN_X of viewport */}
      <div
        className="absolute"
        style={{
          left: characterScreenX - 24, // center on pixel
          bottom: 82, // sit on ground
          zIndex: 20,
        }}
      >
        <Character isWalking={isWalking} direction={direction} />
      </div>

      {/* HUD overlay */}
      <HUD
        worldOffset={worldOffset}
        worldWidth={WORLD_WIDTH}
        currentZone={zoneName}
        onClassicView={() => setClassicViewOpen(true)}
      />

      {/* Mobile Joystick */}
      <MobileJoystick onDelta={setJoystickDelta} />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Classic CV overlay */}
      <ClassicView
        isOpen={classicViewOpen}
        onClose={() => setClassicViewOpen(false)}
      />
    </div>
  );
}
