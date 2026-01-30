import { useEffect, useRef, useState } from "react";
import bear from "@/assets/bear.png";

interface ScrollBarProps {
  ratio: number;
}

const TRACK_TOP_PX = 64;
const TRACK_BOTTOM_PX = 64;

export default function ScrollBar({ ratio }: ScrollBarProps) {
  const thumbRef = useRef<HTMLImageElement>(null);
  const [thumbTop, setThumbTop] = useState(TRACK_TOP_PX);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!thumbRef.current) return;
    const vh = window.innerHeight;
    const trackLength = vh - TRACK_TOP_PX - TRACK_BOTTOM_PX;
    const thumbH = thumbRef.current.clientHeight;
    const maxThumbMove = trackLength - thumbH;

    const r = Math.max(0, Math.min(ratio, 1));
    setThumbTop(TRACK_TOP_PX + r * maxThumbMove);
  }, [ratio]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging || !thumbRef.current) return;

      const vh = window.innerHeight;
      const homeHeight = 1.5 * vh;
      const maxPageScroll = document.body.scrollHeight - vh;
      const trackLength = vh - TRACK_TOP_PX - TRACK_BOTTOM_PX;
      const thumbH = thumbRef.current.clientHeight;
      const maxThumbMove = trackLength - thumbH;

      let newTop = e.clientY - thumbH / 2;
      newTop = Math.max(
        TRACK_TOP_PX,
        Math.min(newTop, TRACK_TOP_PX + maxThumbMove)
      );

      const newRatio = (newTop - TRACK_TOP_PX) / maxThumbMove;
      const effectiveSpan = maxPageScroll - homeHeight;
      const scrollY = homeHeight + newRatio * effectiveSpan;

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
