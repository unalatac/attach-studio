import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top-left brand mark */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "80px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#8A8A80",
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          STUDIOATTACH.COM
        </div>

        {/* Lime accent bar */}
        <div
          style={{
            width: "56px",
            height: "3px",
            background: "#C8FF00",
            marginBottom: "36px",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: "96px",
            fontWeight: 700,
            color: "#F5F0E8",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: "24px",
          }}
        >
          Attach Studio
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#8A8A80",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Kıbrıs Sosyal Medya ve Kreatif Ajans
        </div>
      </div>
    ),
    { ...size }
  );
}
