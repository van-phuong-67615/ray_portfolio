"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { personalInfo, skills, projects, experiences, education } from "@/data/portfolioData";

interface ClassicViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClassicView({ isOpen, onClose }: ClassicViewProps) {
  // Allow body to scroll when overlay is open, freeze it when game is active
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "auto" : "hidden";
    document.body.style.overflow = isOpen ? "auto" : "hidden";
    return () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{ background: "#f8f9fa" }}
        >
          {/* Header bar */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 shadow-sm"
            style={{ background: "#ffffff", borderBottom: "2px solid #e5e7eb" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="font-pixel rounded px-2 py-1"
                style={{ fontSize: 8, background: "#7c3aed", color: "#ffffff" }}
              >
                CLASSIC VIEW
              </div>
              <span style={{ fontSize: 13, color: "#6b7280", fontFamily: "Inter, sans-serif" }}>
                Traditional CV layout for recruiters
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#374151" }}
            >
              <X size={16} />
              Back to Game
            </button>
          </div>

          {/* CV Content */}
          <div className="max-w-3xl mx-auto px-6 py-8">
            {/* Personal Info */}
            <div className="mb-8 pb-6" style={{ borderBottom: "2px solid #e5e7eb" }}>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: 4,
                }}
              >
                {personalInfo.name}
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "#7c3aed",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                {personalInfo.title}
              </p>
              <div
                className="flex flex-wrap gap-4"
                style={{ fontSize: 13, color: "#6b7280", fontFamily: "Inter, sans-serif" }}
              >
                <span>📧 {personalInfo.email}</span>
                <span>📱 {personalInfo.phone}</span>
                <span>📍 {personalInfo.location}</span>
              </div>

              {/* Summary */}
              <p
                className="mt-4"
                style={{ fontSize: 13, color: "#374151", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
              >
                {personalInfo.summary}
              </p>

              {/* Additional Info / Highlights */}
              {personalInfo.additionalInfo && personalInfo.additionalInfo.length > 0 && (
                <div
                  className="mt-4 rounded-lg p-4"
                  style={{ background: "#f3f0ff", border: "1px solid #ddd6fe" }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#7c3aed",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                    }}
                  >
                    Highlights
                  </div>
                  <ul className="space-y-1">
                    {personalInfo.additionalInfo.map((item, i) => (
                      <li
                        key={i}
                        style={{ fontSize: 13, color: "#374151", fontFamily: "Inter, sans-serif" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full px-3 py-1"
                    style={{
                      fontSize: 12,
                      fontFamily: "Inter, sans-serif",
                      background: `${skill.color}20`,
                      border: `1px solid ${skill.color}60`,
                      color: "#374151",
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* ReactJS detailed description */}
              {skills
                .filter((s) => s.name === "React JS" && s.description)
                .map((s) => (
                  <div
                    key={s.name}
                    className="rounded-lg p-4 mt-2"
                    style={{ background: "#e0f7fe", border: `1px solid ${s.color}60` }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#0369a1",
                        fontFamily: "Inter, sans-serif",
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: s.color,
                        }}
                      />
                      React JS — Proficiency Details
                    </div>
                    <p style={{ fontSize: 12, color: "#374151", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
                      {s.description}
                    </p>
                  </div>
                ))}

              {/* English skill detail */}
              {skills
                .filter((s) => s.name === "English" && s.description)
                .map((s) => (
                  <div
                    key={s.name}
                    className="rounded-lg p-4 mt-2"
                    style={{ background: "#ecfdf5", border: `1px solid ${s.color}60` }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#047857",
                        fontFamily: "Inter, sans-serif",
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: s.color,
                        }}
                      />
                      English — Language Level
                    </div>
                    <p style={{ fontSize: 12, color: "#374151", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
                      {s.description}
                    </p>
                  </div>
                ))}
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Work Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div
                          style={{ fontSize: 15, fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif" }}
                        >
                          {exp.role}
                        </div>
                        <div
                          style={{ fontSize: 13, color: "#7c3aed", fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                        >
                          {exp.company}
                        </div>
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#9ca3af", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" }}
                      >
                        {exp.period}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#374151", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded px-2 py-0.5"
                          style={{ fontSize: 11, fontFamily: "Inter, sans-serif", background: "#f3f4f6", color: "#4b5563" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="mb-8">
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Projects
              </h2>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-lg p-4"
                    style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div
                          style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif" }}
                        >
                          {project.name}
                        </div>
                        <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "Inter, sans-serif" }}>
                          {project.subtitle}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "Inter, sans-serif" }}>
                        {project.period}
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#374151", fontFamily: "Inter, sans-serif", lineHeight: 1.6, marginTop: 6 }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded px-2 py-0.5"
                          style={{ fontSize: 10, fontFamily: "Inter, sans-serif", background: "#e5e7eb", color: "#4b5563" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* Private project notice */}
                    <div
                      className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded"
                      style={{
                        fontSize: 11,
                        fontFamily: "Inter, sans-serif",
                        background: "#f3f4f6",
                        color: "#6b7280",
                        border: "1px solid #d1d5db",
                      }}
                    >
                      🔒 Private Project
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#111827",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Education
              </h2>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif" }}>
                  {education.school}
                </div>
                <div style={{ fontSize: 13, color: "#7c3aed", fontFamily: "Inter, sans-serif" }}>
                  {education.major} · {education.period}
                </div>
                <ul className="mt-2">
                  {education.achievements.map((a) => (
                    <li
                      key={a}
                      style={{ fontSize: 13, color: "#374151", fontFamily: "Inter, sans-serif", marginTop: 4 }}
                    >
                      🏆 {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
