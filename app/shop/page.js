"use client";

import { useEffect, useRef } from "react";
import VideoBackground from "../VideoBackground";

export default function ShopPage() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("spreadshop-script")) {
      window.spread_shop_config = {
        shopName: "morbidbestiemedia",
        locale: "us_US",
        prefix: "https://morbidbestiemedia.myspreadshop.com",
        baseId: "myShop"
      };
      const script = document.createElement("script");
      script.id = "spreadshop-script";
      script.type = "text/javascript";
      script.src = "https://morbidbestiemedia.myspreadshop.com/shopfiles/shopclient/shopclient.nocache.js";
      script.async = true;
      document.body.appendChild(script);
    }

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
      const script = document.getElementById("spreadshop-script");
      if (script) script.remove();
      const shopNode = document.getElementById("myShop");
      if (shopNode) shopNode.innerHTML = "";
    };
  }, []);

  return (
    <>
      <VideoBackground />
      <main style={{ position: "fixed", inset: 0, padding: "2rem", zIndex: 2, overflow: "auto" }}>
        <div id="myShop" style={{ width: "100%", minHeight: "100vh" }}>
          <a href="https://morbidbestiemedia.myspreadshop.com">morbidbestiemedia</a>
        </div>
        <div ref={cursorRef} style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)" }}>
          <img src="/images/emfmeterpointer.png" alt="EMF cursor" style={{ width: "32px", height: "auto" }} />
        </div>
      </main>
    </>
  );
}