"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./board.css";

export default function GoatPage() {
  const router = useRouter();
  const cursorRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hover1, setHover1] = useState(false);
  const [hoverFb, setHoverFb] = useState(false);
  const [hoverFb2, setHoverFb2] = useState(false);
  const [hoverFb3, setHoverFb3] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);

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

  const openVideo = (type, src) => setActiveVideo({ type, src });
  const closeVideo = () => setActiveVideo(null);

  return (
    <>
      {/* Global styles */}
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          cursor: none !important;
          overflow: hidden;
        }
      `}</style>

      {/* Custom cursor */}
      <img
        ref={cursorRef}
        src="/images/goat-point.png"
        alt=""
        className="custom-cursor"
      />

      {/* Background video */}
      <video
        src="/videos/goatbg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="bg-video"
      />

      {/* Board wrapper - move the board by changing top/left */}
      <div className="board-wrapper" style={{ top: "26%", left: "25%" }}>

        {/* Board image */}
        <img
          src="/images/investigation board.png"
          alt="Investigation Board"
          className="board-image"
        />

        {/* Hotspot 1 - YouTube */}
        <div
          className="hotspot"
          style={{
            top: "21%",
            left: "13.6%",
            backgroundImage: "url(/images/hqdefault.webp)",
            transform: "translate(-50%, -50%) rotate(-5deg)"
          }}
          onMouseEnter={() => setHover1(true)}
          onMouseLeave={() => setHover1(false)}
          onClick={() => openVideo("youtube", "kPjuHkRTZKI")}
        />

        {/* Hotspot - jer.png */}
        <div
          className="hotspot"
          style={{
            top: "39%",
            left: "68.3%",
            backgroundImage: "url(/images/jer.png)",
            transform: "translate(-50%, -50%) rotate(7.2deg)"
          }}
          onMouseEnter={() => setHoverFb3(true)}
          onMouseLeave={() => setHoverFb3(false)}
          onClick={() =>
            openVideo(
              "facebook",
              "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FTheGoatness%2Fvideos%2F1369382064865386%2F&show_text=false&width=267&t=0&autoplay=1&mute=1"
            )
          }
        />

        {/* Hotspot - est.png */}
        <div
          className="hotspot"
          style={{
            top: "75.3%",
            left: "14.2%",
            backgroundImage: "url(/images/est.png)",
            transform: "translate(-50%, -50%) rotate(-5deg)"
          }}
          onMouseEnter={() => setHoverFb2(true)}
          onMouseLeave={() => setHoverFb2(false)}
          onClick={() =>
            openVideo(
              "facebook",
              "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FTheGoatness%2Fvideos%2F1561008408648616%2F&show_text=false&width=267&t=0&autoplay=1&mute=1"
            )
          }
        />

        {/* Hotspot - stalh.jpg */}
        <div
          className="hotspot"
          style={{
            top: "20.9%",
            left: "53.8%",
            backgroundImage: "url(/images/stalh.jpg)",
            transform: "translate(-50%, -50%) rotate(8.5deg)"
          }}
          onMouseEnter={() => setHoverFb(true)}
          onMouseLeave={() => setHoverFb(false)}
          onClick={() =>
            openVideo(
              "facebook",
              "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FTheGoatness%2Fvideos%2F1964632640835344%2F&show_text=false&width=560&t=0&autoplay=1&mute=1"
            )
          }
        />

        {/* Yellow square "coming soon" */}
        <div className="coming-soon" style={{ top: "70.5%", left: "67.7%" }}>
          coming soon
        </div>

        {/* MWTM logo */}
        <img
          src="/images/MWTM-logo.png"
          alt=""
          className="logo"
          style={{ top: "38.5%", left: "89.5%" }}
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
          onClick={() => router.push("/MWTM-Home")}
        />

        {/* headsplashgoat */}
        <img
          src="/images/headsplashgoat.png"
          alt=""
          className="headsplash"
          style={{ top: "5%", left: "5%" }}
        />
      </div>

      {/* Video modal */}
      {activeVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <iframe
            src={
              activeVideo.type === "youtube"
                ? `https://www.youtube.com/embed/${activeVideo.src}?autoplay=1`
                : activeVideo.src
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
}