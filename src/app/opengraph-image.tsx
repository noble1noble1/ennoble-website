import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ennoble — AI Operations Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0A0A",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 900,
              color: "#FAFAFA",
              letterSpacing: "-0.02em",
            }}
          >
            ennoble
          </span>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 900,
              color: "#F59E0B",
            }}
          >
            .
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#FAFAFA",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Most AI consultants
          </span>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#FAFAFA",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            give you a deck.
          </span>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#F59E0B",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            We give you systems.
          </span>
        </div>

        {/* Subline */}
        <span
          style={{
            fontSize: "22px",
            color: "#A3A3A3",
            marginTop: "24px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Audit · Build · Train · Optimize
        </span>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, #F59E0B 0%, #EA580C 50%, #F59E0B 100%)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
