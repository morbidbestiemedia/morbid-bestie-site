"use client";

import { useEffect, useRef, useState } from "react";
import "../global.css";
import "../videobackground.css";
import "./home-board.css";

export default function HomeBoardPage() {

  const cursorRef = useRef(null);
  const [modalVideo, setModalVideo] = useState(null);

  /* Planchette follows pointer */
  useEffect(() => {

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("pointermove", move);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("pointermove", move);
      document.body.style.cursor = "";
    };

  }, []);

  /* Letter Hotspots */

  const letters = [

    { id: "L", x: 372.7, y: 226, rotation: 0.4, video: "https://www.youtube.com/embed/TXN3nCNB9c0" },
    { id: "I", x: 290, y: 222.5, rotation: 0, video: "https://www.youtube.com/embed/RY2QA4G7LKk" },
    { id: "Z", x: 450.5, y: 275, rotation: 5, video: "https://www.youtube.com/embed/fB8cL_gquS0" },
    { id: "A", x: 52.8, y: 236, rotation: -9.5, video: "https://www.youtube.com/embed/68zhhIYlBf4" },

  ];

  /* Moon Hotspots */

  const circles = [

    { x: 531.5, y: 343, size: 50, href: "/Goat-page" },
    { x: 55.5, y: 343, size: 50, href: "/contact" },

  ];

  return (

    <>

      {/* Background Video */}

      <video
        className="video-bg"
        src="/videos/my-background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* HEADER IMAGE */}
      <div className="board-wrapper">

  <img
    className="mwtm-header"
    src="/images/MWTM-header.png"
    alt="MWTM Header"
  />

        <div id="center-image">

          <img
            className="center-image"
            src="/images/center-image.png"
            alt="Ouija Board"
          />

          {/* YES */}

          <a
            href="/shop"
            className="circle-hotspot"
            style={{
              position: "absolute",
              left: "139.5px",
              top: "29px",
              width: "58px",
              height: "58px",
              zIndex: 5
            }}
          />

          {/* NO */}

          <a
            href="https://www.morbidbesties.com"
            className="circle-hotspot"
            style={{
              position: "absolute",
              left: "444.5px",
              top: "29px",
              width: "58px",
              height: "58px",
              zIndex: 5
            }}
          />

          {/* Letters */}

          {letters.map((h) => (

            <svg
              key={h.id}
              width="100"
              height="100"
              viewBox="0 0 100 100"
              onClick={() => setModalVideo(h.video + "?autoplay=1")}
              style={{
                position: "absolute",
                left: `${h.x}px`,
                top: `${h.y}px`,
                transform: `rotate(${h.rotation}deg)`,
                zIndex: 5,
                cursor: "pointer"
              }}
            >

              <rect
                x="-50"
                y="-50"
                width="200"
                height="200"
                fill="transparent"
                pointerEvents="all"
              />

              <text
                x="44%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="33.5"
                fontFamily="Times New Roman, serif"
                className="letter-hover"
              >
                {h.id}
              </text>

            </svg>

          ))}

          {/* Moon Links */}

          {circles.map((c, i) => (

            <a
              key={i}
              href={c.href}
              className="circle-hotspot"
              style={{
                position: "absolute",
                left: `${c.x}px`,
                top: `${c.y}px`,
                width: `${c.size}px`,
                height: `${c.size}px`,
                zIndex: 5
              }}
            />

          ))}

        </div>

      </div>

      {/* Planchette */}

      <div ref={cursorRef} className="planchette">
        <img src="/images/planchet.png" alt="Planchette Cursor" />
      </div>

      {/* Video Modal */}

      {modalVideo && (

        <div
          className="video-modal"
          onClick={() => setModalVideo(null)}
        >

          <iframe
            src={modalVideo}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

        </div>

      )}

    </>

  );

}