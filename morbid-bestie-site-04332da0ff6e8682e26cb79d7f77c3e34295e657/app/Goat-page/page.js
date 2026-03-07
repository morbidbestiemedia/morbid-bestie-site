"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

  const openVideo = (type, src) => setActiveVideo({ type, src });
  const closeVideo = () => setActiveVideo(null);

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          cursor: none!important;
          overflow: hidden;
        }
      `}</style>

      {/* EMF Cursor */}
      <img
        ref={cursorRef}
        src="/images/goat-point.png"
        alt=""
        style={{
          position: "fixed",
          width: "90px",
          height: "96px",
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
          zIndex: 99999,
          left: 0,
          top: 0,
        }}
      />

      {/* Video background */}
      <video
        src="/videos/goatbg.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -10,
        }}
      />

      {/* Investigation board image */}
      <img
        src="/images/investigation board.png"
        alt=""
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "69%",
          maxHeight: "69%",
          zIndex: 5,
          borderRadius: "8px",
          filter: "drop-shadow(0 0 18px rgba(0,0,0,0.75))",
          pointerEvents: "none",
        }}
      />

      {/* Hotspot 1 - YouTube */}
      <div
        onClick={() => openVideo("youtube", "kPjuHkRTZKI")}
        onMouseEnter={() => setHover1(true)}
        onMouseLeave={() => setHover1(false)}
        style={{
          position: "fixed",
          top: "29.9%",
          left: "32%",
          transform: "translate(-50%, -50%) rotate(-5deg)",
          width: "98px",
          height: "98px",
          backgroundImage: "url(/images/hqdefault.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 6,
          cursor: "pointer",
          filter: hover1 ? "drop-shadow(0 0 12px rgba(45, 0, 90, 0.9))" : "none",
          transition: "filter 0.2s",
        }}
      />

      {/* Hotspot - Facebook jer.png */}
      <div
        onClick={() =>
          openVideo(
            "facebook",
            "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FTheGoatness%2Fvideos%2F1369382064865386%2F&show_text=false&width=267&t=0&autoplay=1&mute=1"
          )
        }
        onMouseEnter={() => setHoverFb3(true)}
        onMouseLeave={() => setHoverFb3(false)}
        style={{
          position: "fixed",
          top: "42%",
          left: "59.1%",
          transform: "translate(-50%, -50%) rotate(7.2deg)",
          width: "88px",
          height: "85.5px",
          backgroundImage: "url(/images/jer.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 6,
          cursor: "pointer",
          filter: hoverFb3 ? "drop-shadow(0 0 12px rgba(45, 0, 90, 0.9))" : "none",
          transition: "filter 0.2s",
        }}
      />

      {/* Hotspot - Facebook est.png */}
      <div
        onClick={() =>
          openVideo(
            "facebook",
            "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FTheGoatness%2Fvideos%2F1561008408648616%2F&show_text=false&width=267&t=0&autoplay=1&mute=1"
          )
        }
        onMouseEnter={() => setHoverFb2(true)}
        onMouseLeave={() => setHoverFb2(false)}
        style={{
          position: "fixed",
          top: "68.3%",
          left: "32.2%",
          transform: "translate(-50%, -50%) rotate(-5deg)",
          width: "92px",
          height: "85.5px",
          backgroundImage: "url(/images/est.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 6,
          cursor: "pointer",
          filter: hoverFb2 ? "drop-shadow(0 0 12px rgba(45, 0, 90, 0.9))" : "none",
          transition: "filter 0.2s",
        }}
      />

      {/* Yellow square with "coming soon" */}
      <div
        style={{
          position: "fixed",
          top: "64.8%",
          left: "58.7%",
          transform: "translate(-50%, -50%) rotate(-2.5deg)",
          width: "92px",
          height: "86.2px",
          backgroundColor: "rgba(255, 255, 0, 0.5)",
          zIndex: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Courier New, monospace",
          fontSize: "14px",
          color: "#000",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        coming soon
      </div>

      {/* MWTM logo image */}
      <img
        src="/images/MWTM-logo.png"
        alt=""
        onClick={() => router.push("/MWTM-Home")}
        onMouseEnter={() => setHoverLogo(true)}
        onMouseLeave={() => setHoverLogo(false)}
        style={{
          position: "fixed",
          top: "41.5%",
          left: "69.8%",
          transform: "translate(-50%, -50%) rotate(12deg)",
          width: "59px",
          height: "auto",
          zIndex: 6,
          cursor: "pointer",
          filter: hoverLogo ? "drop-shadow(0 0 12px rgba(160, 0, 255, 0.9))" : "none",
          transition: "filter 0.2s",
        }}
      />

      {/* headsplashgoat image */}
<img
  src="/images/headsplashgoat.png"
  alt=""
  style={{
    position: "fixed",
    top: "23%",
    left: "13.5%",
    transform: "translate(-50%, -50%) rotate(5deg)",
    width: "440px",
    height: "auto",
    zIndex: 6,
    pointerEvents: "none",
    filter: "drop-shadow(0 0 22px rgba(45, 0, 90, 0.9))",
  }}
/>

      {/* Hotspot 5 - Facebook stalh.jpg */}
      <div
        onClick={() =>
          openVideo(
            "facebook",
            "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FTheGoatness%2Fvideos%2F1964632640835344%2F&show_text=false&width=560&t=0&autoplay=1&mute=1"
          )
        }
        onMouseEnter={() => setHoverFb(true)}
        onMouseLeave={() => setHoverFb(false)}
        style={{
          position: "fixed",
          top: "30%",
          left: "51.81%",
          transform: "translate(-50%, -50%) rotate(8.5deg)",
          width: "103px",
          height: "103px",
          backgroundImage: "url(/images/stalh.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 7,
          cursor: "pointer",
          filter: hoverFb ? "drop-shadow(0 0 12px rgba(45, 0, 90, 0.9))" : "none",
          transition: "filter 0.2s",
        }}
      />

      {/* Popup */}
      {activeVideo && (
        <div
          onClick={closeVideo}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            width="80%"
            height="80%"
            src={
              activeVideo.type === "youtube"
                ? `https://www.youtube.com/embed/${activeVideo.src}?autoplay=1`
                : activeVideo.src
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ maxWidth: "960px", maxHeight: "540px" }}
          />
        </div>
      )}
    </>
  );
}