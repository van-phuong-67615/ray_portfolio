import dynamic from "next/dynamic";

// GameCanvas uses browser APIs (window, requestAnimationFrame), must be client-only
const GameCanvas = dynamic(() => import("@/components/GameCanvas"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0a0015",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          fontFamily: '"Press Start 2P", cursive',
          fontSize: 12,
          color: "#a78bfa",
          textShadow: "0 0 20px #a78bfa",
          animation: "blink 1s step-end infinite",
        }}
      >
        LOADING WORLD...
      </div>
      <div
        style={{
          width: 200,
          height: 8,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 4,
          border: "1px solid rgba(167,139,250,0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #7c3aed, #00ffff)",
            animation: "pixelLoad 1.5s ease-out forwards",
          }}
        />
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <GameCanvas />
    </main>
  );
}
