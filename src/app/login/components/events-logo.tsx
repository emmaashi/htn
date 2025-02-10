"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import events from "@/app/assets/events.png";

// bouncing logo on login screen
export function EventsLogo() {
  const [isBouncing, setIsBouncing] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsBouncing(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <motion.img
      src={events.src}
      alt="Events"
      className="h-28 w-[500px]"
      animate={isBouncing ? { y: [0, -18, 0] } : { y: 0 }}
      transition={{
        y: isBouncing
          ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
          : { duration: 0.5, ease: "easeOut" },
      }}
    />
  );
}
