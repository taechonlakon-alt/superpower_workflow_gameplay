import { useEffect, useRef } from "react";
import { mountLegacyGame } from "../legacyGame.js";

export default function LegacyGameHost() {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) return undefined;
    return mountLegacyGame(hostRef.current);
  }, []);

  return <div id="legacy-game" ref={hostRef} />;
}
