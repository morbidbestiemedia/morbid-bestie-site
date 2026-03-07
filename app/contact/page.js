"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import VideoBackground from "../VideoBackground";

export default function Contact() {
  const router = useRouter();
  const cursorRef = useRef(null);
  const navigatingRef = useRef(false);

  useEffect(() => {
    const planchet = document.querySelector(".custom-cursor");
    if (planchet) planchet.style.display = "none";
    return () => {
      if (planchet) planchet.style.display = "block";
    };
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const handleHotspotClick = () => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    new Audio("/sounds/knob-click.wav").play().catch(() => {});
    router.push("/contact-goat");
  };

  const openLink = (url, external = false) => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    new Audio("/sounds/knob-click.wav").play().catch(() => {});
    if (external) {
      window.open(url, "_blank", "noopener,noreferrer");
      navigatingRef.current = false;
    } else {
      window.location.href = url;
    }
  };

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: -10 }}>
        <VideoBackground />
      </div>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          cursor: none !important;
          overflow: hidden;
        }
      `}</style>

      {/* EMF Cursor (stays native size) */}
      <img
        ref={cursorRef}
        src="/images/emfmeterpointer.png"
        alt=""
        style={{
          position: "fixed",
          width: "120px",
          height: "120px",
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
          zIndex: 99999,
          left: 0,
          top: 0,
        }}
      />

      {/* Main UI - scaled 15% */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ transform: "scale(1.15)", transformOrigin: "center center" }}>
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <video
              src="/videos/spbox.webm"
              autoPlay
              muted
              loop
              playsInline
              style={{
                maxWidth: "100%",
                height: "auto",
                pointerEvents: "none",
                display: "block",
              }}
            />

            {/* Original hotspot */}
            <div
              onClick={handleHotspotClick}
              style={{
                position: "absolute",
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                top: "74%",
                left: "19%",
                transform: "translate(-50%, -50%)",
                zIndex: 5000,
                cursor: "pointer",
              }}
            />

            {/* Email hotspot */}
            <div
              onClick={() => openLink("mailto:morbidbestiemedia@gmail.com")}
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                top: "73%",
                left: "52%",
                transform: "translate(-50%, -50%)",
                zIndex: 5000,
                cursor: "pointer",
              }}
            />

            {/* Facebook hotspot */}
            <div
              onClick={() => openLink("https://www.facebook.com/lisa.massey.39", true)}
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                top: "73%",
                left: "61.5%",
                transform: "translate(-50%, -50%)",
                zIndex: 5000,
                cursor: "pointer",
              }}
            />

            {/* YouTube hotspot */}
            <div
              onClick={() => openLink("https://www.youtube.com/@Mysterieswiththemasseys", true)}
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                top: "73%",
                left: "71%",
                transform: "translate(-50%, -50%)",
                zIndex: 5000,
                cursor: "pointer",
              }}
            />

            {/* TikTok hotspot */}
            <div
              onClick={() => openLink("https://www.tiktok.com/@lizamariemassey", true)}
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                top: "73%",
                left: "80%",
                transform: "translate(-50%, -50%)",
                zIndex: 5000,
                cursor: "pointer",
              }}
            />

            <img
              src="/images/contactlvg.png"
              alt=""
              style={{
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                maxWidth: "55%",
                pointerEvents: "none",
                zIndex: 1,
                filter: "drop-shadow(0 0 2px rgb(1,16,1)) drop-shadow(0 0 12px rgba(13,98,47,0.85))",
              }}
            />

            {/* Label images - circular with green glow */}
            <img
              src="/images/email.jpeg"
              alt=""
              style={{
                position: "absolute",
                top: "72.5%",
                left: "52%",
                transform: "translate(-50%, -50%)",
                width: "39px",
                height: "39px",
                borderRadius: "50%",
                objectFit: "cover",
                pointerEvents: "none",
                zIndex: 2,
                filter: "drop-shadow(0 0 6px rgba(0, 255, 100, 0.3))",
              }}
            />
            <img
              src="/images/fb.jpeg"
              alt=""
              style={{
                position: "absolute",
                top: "72.5%",
                left: "61.5%",
                transform: "translate(-50%, -50%)",
                width: "39px",
                height: "39px",
                borderRadius: "50%",
                objectFit: "cover",
                pointerEvents: "none",
                zIndex: 2,
                filter: "drop-shadow(0 0 6px rgba(0, 255, 100, 0.3))",
              }}
            />
            <img
              src="/images/yt.jpeg"
              alt=""
              style={{
                position: "absolute",
                top: "72.5%",
                left: "71%",
                transform: "translate(-50%, -50%)",
                width: "39px",
                height: "39px",
                borderRadius: "50%",
                objectFit: "cover",
                pointerEvents: "none",
                zIndex: 2,
                filter: "drop-shadow(0 0 6px rgba(0, 255, 102, 0.3))",
              }}
            />
            <img
              src="/images/tt.jpeg"
              alt=""
              style={{
                position: "absolute",
                top: "72.5%",
                left: "80%",
                transform: "translate(-50%, -50%)",
                width: "39px",
                height: "39px",
                borderRadius: "50%",
                objectFit: "cover",
                pointerEvents: "none",
                zIndex: 2,
                filter: "drop-shadow(0 0 6px rgba(0, 255, 102, 0.3))",
              }}
            />
          </div>

          <a href="/" style={{ color: "#9cf", marginTop: "1rem", display: "inline-block" }}>
            ← Back
          </a>
        </div>
      </div>
    </>
  );
}