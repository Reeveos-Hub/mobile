import React from "react";

interface RMarkProps {
  size?: number;
  variant?: "dark" | "light";
}

export function RMark({ size = 32, variant = "dark" }: RMarkProps) {
  const isDark = variant === "dark";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: isDark
          ? "linear-gradient(135deg, #1a1a1a, #111111)"
          : "linear-gradient(135deg, #D4B65A, #C9A84C)",
        boxShadow: isDark
          ? "0 2px 8px rgba(17,17,17,0.3)"
          : "0 2px 8px rgba(201,168,76,0.3)",
      }}
    >
      <span
        style={{
          color: isDark ? "#C9A84C" : "#111111",
          fontSize: size * 0.48,
          fontFamily: "Figtree, sans-serif",
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        R
      </span>
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.12,
          height: size * 0.12,
          backgroundColor: isDark ? "#C9A84C" : "#111111",
          bottom: size * 0.2,
          right: size * 0.2,
        }}
      />
    </div>
  );
}