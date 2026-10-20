import { useEffect, useRef } from "react";

const EDGE_DISTANCE = 80;
const MAX_SPEED = 1100;

export default function useDragAutoScroll(
  dragging,
  active,
  container,
  onScroll
) {
  const updateTarget = useRef(onScroll);
  useEffect(() => {
    updateTarget.current = onScroll;
  }, [onScroll]);

  useEffect(() => {
    if (!dragging) return undefined;
    let frame;
    let previousTime;
    const tick = (time) => {
      const pointer = active.current;
      if (!pointer) return;
      const elapsed = Math.min(time - (previousTime ?? time), 32);
      previousTime = time;
      const bounds = container.current?.getBoundingClientRect();
      const inside =
        bounds && pointer.x >= bounds.left && pointer.x <= bounds.right;
      const height = window.innerHeight;
      let speed = 0;
      if (inside && !document.hidden && pointer.y >= 0 && pointer.y <= height) {
        if (pointer.y < EDGE_DISTANCE) {
          speed = -MAX_SPEED * (1 - pointer.y / EDGE_DISTANCE);
        } else if (pointer.y > height - EDGE_DISTANCE) {
          speed = MAX_SPEED * (1 - (height - pointer.y) / EDGE_DISTANCE);
        }
      }
      if (speed) {
        const before = window.scrollY;
        window.scrollBy({ top: (speed * elapsed) / 1000, behavior: "instant" });
        if (window.scrollY !== before) updateTarget.current();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [dragging, active, container]);
}
