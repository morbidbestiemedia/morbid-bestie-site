"use client";
import React, { useEffect, useState } from "react";
import "./VideoBackground.css";  // fixed
export default function VideoBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <>
      <video className="video-bg" autoPlay muted loop playsInline>
        <source src="/videos/my-background.mp4" type="video/mp4" />
      </video>
      <img src="/images/planchet.png" alt="Planchette" className="custom-cursor"
           style={{ left: mousePos.x, top: mousePos.y }} />
    </>
  );
}