"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const lines = [
    "Hey Bestie...",
    "Nice to see you.",
    "Are you here for ghosts.."
  ];

  type CharWithDelay = { char: string; delayAfter?: number };
  const chars: CharWithDelay[] = [];

  lines.forEach((line, idx) => {
    for (let c of line) chars.push({ char: c, delayAfter: 60 });
    if (idx < lines.length - 1) chars.push({ char: "\n", delayAfter: 500 });
  });

  const goatsText = "goats";
  const goatsChars: CharWithDelay[] = goatsText.split("").map(c => ({ char: c, delayAfter: 60 }));

  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showOr, setShowOr] = useState(false);
  const [showBinary, setShowBinary] = useState(false);
  const [goatsTyping, setGoatsTyping] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    let i = 0;

    const typeNext = (
      charsToType: CharWithDelay[],
      onDone?: () => void,
      onChar?: (char: string) => void
    ) => {
      if (i >= charsToType.length) {
        if (onDone) onDone();
        return;
      }
      const charObj = charsToType[i];
      if (onChar) onChar(charObj.char);
      else setDisplayedText(prev => prev + charObj.char);
      i++;
      setTimeout(() => typeNext(charsToType, onDone, onChar), charObj.delayAfter?? 60);
    };

    const startTimeout = setTimeout(() => {
      typeNext(chars, () => {
        setTypingDone(true);
        setShowCursor(true);

        setTimeout(() => {
          setShowGlitch(true);

          setTimeout(() => {
            setShowOr(true);
            setShowCursor(false);

            setTimeout(() => {
              setShowBinary(true);
              i = 0;
              typeNext(goatsChars, undefined, char => setGoatsTyping(prev => prev + char));

              setTimeout(() => setShowQuestion(true), 1000);

            }, 1000);

          }, 1000);
        }, 1500);

      });
    }, 2000);

    return () => clearTimeout(startTimeout);
  }, []);

  useEffect(() => {
    if (!showQuestion) return;
    const blinkInterval = setInterval(() => setShowCursor(prev =>!prev), 500);
    return () => clearInterval(blinkInterval);
  }, [showQuestion]);

  const handleVideoHover = (e: React.MouseEvent<HTMLVideoElement>, hover: boolean) => {
    if (hover) {
      e.currentTarget.play();
      e.currentTarget.style.filter = "drop-shadow(0 0 15px #00FF00) brightness(1.2)";
    } else {
      e.currentTarget.pause();
      e.currentTarget.style.filter = "brightness(1)";
    }
  };

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "'VT323', monospace",
        color: "#00FF00",
        fontSize: "2.5rem",
        lineHeight: 1.2,
        whiteSpace: "pre-line",
        padding: "2rem 8rem",
      }}
    >
      <video
        src="/videos/backgroundtv.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, top: 0 }}>
        {displayedText}
      </div>

      {showGlitch && (
        <Link href="/MWTM-Home">
          <video
            src="/videos/glitch.webm"
            loop
            muted
            style={{
              position: "absolute",
              left: "25%",
              top: "52%",
              transform: "translate(-50%, -50%)",
              maxHeight: "80%",
              zIndex: 1,
              cursor: "pointer",
            }}
            onMouseEnter={e => handleVideoHover(e, true)}
            onMouseLeave={e => handleVideoHover(e, false)}
          />
        </Link>
      )}

      {showOr && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          or
        </div>
      )}

      {showBinary && (
        <>
          <Link href="/Goat-page">
            <video
              src="/videos/binary.webm"
              loop
              muted
              style={{
                position: "absolute",
                right: "25%",
                top: "52%",
                transform: "translate(50%, -50%)",
                maxHeight: "80%",
                zIndex: 1,
                cursor: "pointer",
              }}
              onMouseEnter={e => handleVideoHover(e, true)}
              onMouseLeave={e => handleVideoHover(e, false)}
            />
          </Link>

          <div
            style={{
              position: "absolute",
              top: "calc(2rem + 2.5rem * 2.53)",
              right: "25%",
              transform: "translateX(50%)",
              zIndex: 2,
            }}
          >
            {goatsTyping}
          </div>
        </>
      )}

      {showQuestion && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "15%",
            transform: "translate(50%, -50%)",
            fontSize: "5rem",
            zIndex: 2,
          }}
        >
         ?{showCursor && <span>|</span>}
        </div>
      )}

      <link
        href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
        rel="stylesheet"
      />
    </main>
  );
}