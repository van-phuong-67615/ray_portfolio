"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";

const WORLD_WIDTH = 7500;
const STEP = 8;

export function useGameController(isPaused: React.MutableRefObject<boolean>) {
  const [worldOffset, setWorldOffset] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const keysPressed = useRef<Set<string>>(new Set());
  const joystickDelta = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const movingRef = useRef<boolean>(false);

  // Held outside of useCallback to avoid stale closure
  const worldOffsetRef = useRef(0);

  const clamp = (val: number) => {
    const maxOffset = Math.max(0, WORLD_WIDTH - window.innerWidth);
    return Math.max(0, Math.min(maxOffset, val));
  };

  const tick = useCallback(() => {
    const right =
      keysPressed.current.has("ArrowRight") || keysPressed.current.has("d") || keysPressed.current.has("D");
    const left =
      keysPressed.current.has("ArrowLeft") || keysPressed.current.has("a") || keysPressed.current.has("A");
    const joyRight = joystickDelta.current > 0;
    const joyLeft = joystickDelta.current < 0;

    if (isPaused.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    if (right || joyRight) {
      worldOffsetRef.current = clamp(worldOffsetRef.current + STEP);
      setWorldOffset(worldOffsetRef.current);
      setDirection("right");
      setIsWalking(true);
    } else if (left || joyLeft) {
      worldOffsetRef.current = clamp(worldOffsetRef.current - STEP);
      setWorldOffset(worldOffsetRef.current);
      setDirection("left");
      setIsWalking(true);
    } else {
      setIsWalking(false);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused.current) return;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }
      keysPressed.current.add(e.key);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [tick]);

  // Scroll / wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If game is paused (e.g. Classic View open), let the browser handle scrolling
      if (isPaused.current) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? STEP * 6 : -STEP * 6;
      worldOffsetRef.current = clamp(worldOffsetRef.current + delta);
      setWorldOffset(worldOffsetRef.current);
      setDirection(delta > 0 ? "right" : "left");
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const setJoystickDelta = useCallback((delta: number) => {
    joystickDelta.current = delta;
  }, []);

  return { worldOffset, isWalking, direction, setJoystickDelta, WORLD_WIDTH };
}
