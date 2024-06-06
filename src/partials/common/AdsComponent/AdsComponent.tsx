import React, { useEffect, useState } from "react";
import { useGame } from "../../../utils/ProtectedRoutes/ProtectedRoutes";

const AdsComponent = ({ dataAdSlot, time = 5000 }) => {
  const { game } = useGame();

  useEffect(() => {
    if (!game) return;
    console.log("AdsComponent", dataAdSlot);

    const scriptEl = document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    );
    if (!scriptEl) {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      console.log("Add scriptEl");
    }

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("pushAd", dataAdSlot);
    } catch (error) {
      console.log("Push ads error :>> ", error);
    }
  }, [game]);

  return (
    <div className="flex-1 bg-slate-50/40" key={dataAdSlot + game?.url}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1939315010587936"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdsComponent;
