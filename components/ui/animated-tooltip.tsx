"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
    color: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="group relative"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-white">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div 
            onMouseMove={handleMouseMove}
            className="relative aspect-square w-full rounded-xl bg-muted/50 backdrop-blur-sm p-3 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/20 border border-primary/10 group-hover:scale-105"
            style={{
              '--skill-color': item.color,
            } as React.CSSProperties}
          >
            <div className="absolute inset-0 rounded-xl bg-[var(--skill-color)]/10 transition-colors duration-300 group-hover:bg-[var(--skill-color)]/20" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--skill-color)]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full w-full flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.name}
                width={40}
                height={40}
                className="object-contain transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
