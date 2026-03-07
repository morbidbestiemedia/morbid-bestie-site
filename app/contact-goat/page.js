"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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
    const audio = new Audio("/sounds/8bit.wav");
    audio.volume = .1;
    audio.play().catch(() => {});
    router.push("/contact");
  };

  return (
    <>
      {/* Background video (loops continuously) */}
      <div style={{ position: "fixed", inset: 0, zIndex: -10 }}>
        <video
          src="/videos/consp.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          cursor: none !important;
          overflow: hidden;
        }

        .glow-link img {
          filter:
            drop-shadow(0 0 6px rgba(128, 0, 255, 0.85))
            drop-shadow(0 0 14px rgba(128, 0, 255, 0.6));
          transition: filter 0.3s ease;
        }

        .glow-link:hover img {
          filter:
            drop-shadow(0 0 6px rgba(0, 255, 100, 0.85))
            drop-shadow(0 0 14px rgba(0, 255, 100, 0.6));
        }
        .fb-glow {
          filter: drop-shadow(0 0 1px rgb(5, 56, 5)) drop-shadow(0 0 12px rgba(0, 255, 0, 0.46));
        }
      `}</style>

      {/* EMF Cursor */}
      <img
        ref={cursorRef}
        src="/images/hand.png"
        alt="hand.png"
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

      {/* Main UI */}
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
        <div style={{ position: "relative", display: "flex", justifyContent: "center", width: "min(35vw, 1100px)" }}>
          <video
            src="/videos/bgbinary.webm"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "auto",
              pointerEvents: "none",
              display: "block",
            }}
          />
          {/* FB Icon with green glow */}
          <a href="https://facebook.com/thegoatness" target="_blank" rel="noopener noreferrer" style={{position: "absolute", top: "29%", left: "37%", zIndex: 9999, transform: "translate(-50%,-50%)"}}>
            <img
              src="/images/fbicon.png"
              alt="Facebook Icon"
              className="fb-glow"
              style={{width: "128px", height: "128px", pointerEvents: "auto"}}
            />
          </a>
          {/* YT Icon with green glow */}
          <a href="https://www.youtube.com/@Thegoatness" target="_blank" rel="noopener noreferrer" style={{position: "absolute", top: "29%", left: "63%", zIndex: 9999, transform: "translate(-50%,-50%)"}}>
            <img
              src="/images/yticon.png"
              alt="YouTube Icon"
              className="fb-glow"
              style={{width: "128px", height: "128px", pointerEvents: "auto"}}
            />
          </a>
          {/* TT Icon with green glow */}
          <a href="https://www.tiktok.com/@thegoatness" target="_blank" rel="noopener noreferrer" style={{position: "absolute", top: "43%", left: "36%", zIndex: 9999, transform: "translate(-50%,-50%)"}}>
            <img
              src="/images/tticon.jpeg"
              alt="TikTok Icon"
              className="fb-glow"
              style={{width: "115px", height: "115px", pointerEvents: "auto"}}
            />
          </a>
          {/* Email Icon with green glow */}
          <a href="mailto:morbidbestiemedia@gmail.com" style={{position: "absolute", top: "42.5%", left: "62.5%", zIndex: 9999, transform: "translate(-50%,-50%)"}}>
            <img
              src="/images/emailicon.png"
              alt="Email Icon"
              className="fb-glow"
              style={{width: "128px", height: "128px", pointerEvents: "auto"}}
            />
          </a>
          {/* Hotspot */}
          <div
            onClick={handleHotspotClick}
            style={{
              position: "absolute",
              width: "450px",
              height: "75px",
              top: "75%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 5000,
              cursor: "pointer",
            }}
          />
        </div>

        <a href="/" style={{ color: "#9cf", marginTop: "1rem" }}>
          ← Back
        </a>
      </div>
    </>
  );
}