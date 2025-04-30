// src/components/ScrollBar/ScrollBar.tsx
import { useEffect, useRef, useState } from "react";
import bear from "@/assets/bear.png";

interface ScrollBarProps {
  ratio: number;
}

const TRACK_TOP_PX = 64; // same as Tailwind top-16
const TRACK_BOTTOM_PX = 64; // same as Tailwind bottom-16

export default function ScrollBar({ ratio }: ScrollBarProps) {
  const thumbRef = useRef<HTMLImageElement>(null);
  const [thumbTop, setThumbTop] = useState(TRACK_TOP_PX);
  const [dragging, setDragging] = useState(false);

  // Reposition thumb when ratio or window size changes
  useEffect(() => {
    if (!thumbRef.current) return;
    const vh = window.innerHeight;
    const trackLength = vh - TRACK_TOP_PX - TRACK_BOTTOM_PX;
    const thumbH = thumbRef.current.clientHeight;
    const maxThumbMove = trackLength - thumbH;

    // clamp ratio [0,1]
    const r = Math.max(0, Math.min(ratio, 1));
    setThumbTop(TRACK_TOP_PX + r * maxThumbMove);
  }, [ratio]);

  // Drag → immediate scroll
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging || !thumbRef.current) return;

      const vh = window.innerHeight;
      const homeHeight = 1.5 * vh; // 150vh
      const maxPageScroll = document.body.scrollHeight - vh;
      const trackLength = vh - TRACK_TOP_PX - TRACK_BOTTOM_PX;
      const thumbH = thumbRef.current.clientHeight;
      const maxThumbMove = trackLength - thumbH;

      // clamp pointer inside track
      let newTop = e.clientY - thumbH / 2;
      newTop = Math.max(
        TRACK_TOP_PX,
        Math.min(newTop, TRACK_TOP_PX + maxThumbMove)
      );

      // map thumb position → scrollY
      const newRatio = (newTop - TRACK_TOP_PX) / maxThumbMove;
      const effectiveSpan = maxPageScroll - homeHeight;
      const scrollY = homeHeight + newRatio * effectiveSpan;

      // jump immediately
      window.scrollTo(0, scrollY);
    };

    const onMouseUp = () => setDragging(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  return (
    <>
      <img
        ref={thumbRef}
        src={bear}
        alt="scroll thumb"
        onMouseDown={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        className="
          fixed
          right-0
          w-28 h-28
          rotate-350
          z-50
          cursor-pointer
          select-none
        "
        style={{ top: `${thumbTop}px` }}
      />
    </>
  );
}
