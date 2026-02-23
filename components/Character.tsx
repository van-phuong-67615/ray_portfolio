"use client";

import { motion } from "framer-motion";

interface CharacterProps {
  isWalking: boolean;
  direction: "left" | "right";
}

export default function Character({ isWalking, direction }: CharacterProps) {
  return (
    <div
      className="relative select-none"
      style={{
        width: 48,
        height: 64,
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
        transition: "transform 0.1s",
      }}
    >
      {/* Character body — pixel-art style div sprite */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center"
        animate={
          isWalking
            ? {
                y: [0, -3, 0, -3, 0],
                transition: { duration: 0.4, repeat: Infinity, ease: "linear" },
              }
            : {
                y: [0, -4, 0],
                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        {/* Head */}
        <div
          className="rounded-sm"
          style={{
            width: 28,
            height: 26,
            background: "#F4C68A",
            border: "2px solid #2a1a0a",
            position: "relative",
            boxShadow: "inset -4px -4px 0 #c9956e",
          }}
        >
          {/* Eyes */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 4,
              width: 6,
              height: 6,
              background: "#1a0a00",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 4,
              width: 6,
              height: 6,
              background: "#1a0a00",
              borderRadius: 1,
            }}
          />
          {/* Hair */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: 0,
              right: 0,
              height: 8,
              background: "#2a1a0a",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Body (jacket) */}
        <div
          style={{
            width: 34,
            height: 22,
            background: "#3b5998",
            border: "2px solid #1a2a4a",
            marginTop: 2,
            borderRadius: 2,
            boxShadow: "inset -4px -4px 0 #2a3f70",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Code icon on shirt */}
          <span
            style={{
              fontSize: 8,
              color: "#00ffff",
              fontFamily: "monospace",
              lineHeight: "22px",
              fontWeight: "bold",
            }}
          >
            {"</>"}
          </span>
        </div>

        {/* Legs */}
        <div className="flex gap-1 mt-0.5">
          <motion.div
            style={{
              width: 12,
              height: 18,
              background: "#1a1a2e",
              border: "2px solid #0a0a1a",
              borderRadius: 2,
              originY: 0,
            }}
            animate={
              isWalking
                ? {
                    rotateX: [0, 25, 0, -25, 0],
                    transition: { duration: 0.4, repeat: Infinity },
                  }
                : {}
            }
          />
          <motion.div
            style={{
              width: 12,
              height: 18,
              background: "#1a1a2e",
              border: "2px solid #0a0a1a",
              borderRadius: 2,
              originY: 0,
            }}
            animate={
              isWalking
                ? {
                    rotateX: [0, -25, 0, 25, 0],
                    transition: { duration: 0.4, repeat: Infinity },
                  }
                : {}
            }
          />
        </div>

        {/* Shoes */}
        <div className="flex gap-1">
          <div
            style={{
              width: 14,
              height: 6,
              background: "#8B4513",
              border: "2px solid #4a2000",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: 14,
              height: 6,
              background: "#8B4513",
              border: "2px solid #4a2000",
              borderRadius: 1,
            }}
          />
        </div>
      </motion.div>

      {/* Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: -4,
          left: "50%",
          transform: "translateX(-50%)",
          width: 32,
          height: 6,
          background: "rgba(0,0,0,0.3)",
          borderRadius: "50%",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
