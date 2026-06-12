"use client";

import dynamic from "next/dynamic";

const LegacyGameHost = dynamic(() => import("../components/LegacyGameHost"), {
  ssr: false,
  loading: () => (
    <div style={{
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh", 
      color: "#f5efe3",
      fontFamily: "sans-serif"
    }}>
      Loading Game...
    </div>
  ),
});

export default function Page() {
  return <LegacyGameHost />;
}
