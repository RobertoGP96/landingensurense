import type { CSSProperties } from "react";

type EagleProps = {
  size?: number;
  opacity?: number;
  style?: CSSProperties;
  className?: string;
};

export default function Eagle({
  size = 220,
  opacity = 1,
  style = {},
  className = "",
}: EagleProps) {
  return (
    <img
      src="/assets/eagle.png"
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: "auto",
        opacity,
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
    />
  );
}
