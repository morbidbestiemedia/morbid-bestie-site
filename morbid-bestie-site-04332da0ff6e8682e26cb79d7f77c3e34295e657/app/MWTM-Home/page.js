"use client";

import { useEffect, useRef } from "react";

export default function MWTMHomePage() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("pointermove", move);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <video
        src="/videos/my-background.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 1,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Header Image */}
      <img
        src="/images/MWTM-header.png"
        alt="MWTM Header"
        style={{
          position: "fixed",
          top: "-8.5%",
          left: "51%",
          transform: "translateX(-50%)",
          width: "610px",
          height: "auto",
          zIndex: 1,
          filter: "drop-shadow(0 0 22px rgba(45, 0, 90, 0.9))",
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              boxShadow: "0 0 50px 20px rgba(170,0,255,0.6)",
              zIndex: 1,
            }}
          />
          <img
            src="/images/center-image.png"
            alt="Ouija"
            style={{
              width: "650px",
              height: "auto",
              display: "block",
              borderRadius: "20px",
              position: "relative",
              zIndex: 2,
            }}
          />
          <a
            href="/contact"
            aria-label="Contact"
            className="hotspot"
            style={{
              position: "absolute",
              left: "250px",
              top: "360px",
              width: "145px",
              height: "60px",
              zIndex: 3,
            }}
          />
          <a
            href="/shop"
            aria-label="Shop"
            className="hotspot"
            style={{
              position: "absolute",
              left: "130px",
              top: "25px",
              width: "90px",
              height: "90px",
              zIndex: 3,
            }}
          />
        </div>
      </div>

      {/* Cursor - top of planchet matches pointer */}
<div
  ref={cursorRef}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    transform: "translateX(-50%)",   // center horizontally
  }}
>
  <img
    src="/images/planchet.png"
    alt="Planchet"
    style={{
      width: "100px",
      height: "auto",
      /* no vertical transform – top edge aligns with cursor */
    }}
  />
</div>

      <style jsx>{`
        .hotspot {
          border-radius: 50%;
          transition: all 0.25s ease;
          background: transparent;
        }
        .hotspot:hover {
          box-shadow: 0 0 10px rgba(170,0,255,0.8), 0 0 25px rgba(170,0,255,1),
            0 0 45px rgba(170,0,255,0.8);
        }
        html,
        body {
          cursor: none;
        }
      `}</style>
    </>
  );
}