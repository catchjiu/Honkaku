import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0c",
          borderRadius: 16,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 72,
            fontWeight: 500,
            color: "#8b7355",
          }}
        >
          H
        </span>
      </div>
    ),
    { ...size }
  );
}
