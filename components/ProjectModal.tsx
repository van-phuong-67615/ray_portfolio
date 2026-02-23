"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/data/portfolioData";

interface ProjectModalProps {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "e" || e.key === "E") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg rounded-lg overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #0a0015 0%, #110022 100%)",
              border: `2px solid ${project.color}`,
              boxShadow: `0 0 40px ${project.color}50, 0 0 80px ${project.color}20`,
            }}
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-start justify-between"
              style={{
                background: `linear-gradient(90deg, ${project.color}30, transparent)`,
                borderBottom: `1px solid ${project.color}40`,
              }}
            >
              <div>
                <div
                  className="font-pixel mb-1"
                  style={{ fontSize: 16, color: "#ffffff", textShadow: `0 0 10px ${project.color}` }}
                >
                  {project.name}
                </div>
                <div style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Inter, sans-serif" }}>
                  {project.subtitle}
                </div>
                <div
                  className="font-pixel mt-1"
                  style={{ fontSize: 9, color: project.color }}
                >
                  {project.period}
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 hover:bg-white/10 transition-colors"
                style={{ color: "#9ca3af" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4">
              <p
                style={{
                  fontSize: 13,
                  color: "#d1d5db",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="mb-4">
                <div
                  className="font-pixel mb-2"
                  style={{ fontSize: 9, color: "#9ca3af" }}
                >
                  TECH STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-pixel rounded px-2 py-1"
                      style={{
                        fontSize: 8,
                        background: `${project.color}20`,
                        border: `1px solid ${project.color}60`,
                        color: "#e5e7eb",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Private project badge */}
              <div
                className="flex items-center gap-2 px-4 py-2 rounded font-pixel w-fit"
                style={{
                  fontSize: 9,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#9ca3af",
                }}
              >
                🔒 PRIVATE PROJECT
              </div>
            </div>

            {/* Footer hint */}
            <div
              className="px-6 py-2 font-pixel text-center"
              style={{
                fontSize: 8,
                color: "#4b5563",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              [ESC] or [E] TO CLOSE
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
