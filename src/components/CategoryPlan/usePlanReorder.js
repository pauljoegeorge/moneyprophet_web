import { useRef, useState } from "react";

export default function usePlanReorder(rows, onChange) {
  const active = useRef(null);
  const container = useRef(null);
  const [drag, setDrag] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const move = (from, to) => {
    if (from === to || to < 0 || to >= rows.length) return;
    const next = [...rows];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
    setAnnouncement(
      `${moved.name || "Category"} moved to position ${to + 1} of ${rows.length}.`
    );
    requestAnimationFrame(() =>
      container.current
        ?.querySelector(`[data-plan-index="${to}"] .workspace-plan-grip`)
        ?.focus()
    );
  };
  const cancel = () => {
    active.current = null;
    setDrag(null);
  };
  const handleProps = (index) => ({
    onKeyDown(event) {
      if (!["ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      move(index, index + (event.key === "ArrowUp" ? -1 : 1));
    },
    onPointerDown(event) {
      if (event.button !== 0) return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      active.current = {
        from: index,
        to: index,
        x: event.clientX,
        y: event.clientY,
      };
      setDrag(active.current);
    },
    onPointerMove(event) {
      if (!active.current) return;
      const target = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest("[data-plan-index]");
      const belongsToPlan = target && container.current?.contains(target);
      active.current = {
        ...active.current,
        x: event.clientX,
        y: event.clientY,
        to: belongsToPlan
          ? Number(target.dataset.planIndex)
          : active.current.to,
      };
      setDrag(active.current);
    },
    onPointerUp() {
      if (active.current) move(active.current.from, active.current.to);
      cancel();
    },
    onPointerCancel: cancel,
    onLostPointerCapture: cancel,
  });
  return { container, drag, announcement, handleProps };
}
