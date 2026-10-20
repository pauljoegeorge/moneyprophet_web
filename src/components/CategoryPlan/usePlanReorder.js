import { useEffect, useRef, useState } from "react";
import useDragAutoScroll from "./useDragAutoScroll";

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
  const updateTarget = () => {
    if (!active.current) return;
    const { x, y } = active.current;
    let target = document.elementFromPoint(x, y)?.closest("[data-plan-index]");
    if (!target || !container.current?.contains(target)) {
      const planRows = container.current?.querySelectorAll("[data-plan-index]");
      const first = planRows?.[0];
      const last = planRows?.[planRows.length - 1];
      const bounds = container.current?.getBoundingClientRect();
      const inside = bounds && x >= bounds.left && x <= bounds.right;
      if (inside && first && y < first.getBoundingClientRect().top)
        target = first;
      else if (inside && last && y > last.getBoundingClientRect().bottom)
        target = last;
    }
    if (!target || !container.current?.contains(target)) return;
    const to = Number(target.dataset.planIndex);
    if (to === active.current.to) return;
    active.current = { ...active.current, to };
    setDrag(active.current);
  };
  const dragging = Boolean(drag);
  useDragAutoScroll(dragging, active, container, updateTarget);
  useEffect(() => {
    if (!dragging) return undefined;
    const escape = (event) => {
      if (event.key === "Escape") cancel();
    };
    window.addEventListener("blur", cancel);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("blur", cancel);
      window.removeEventListener("keydown", escape);
    };
  }, [dragging]);
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
      active.current = {
        ...active.current,
        x: event.clientX,
        y: event.clientY,
      };
      setDrag(active.current);
      updateTarget();
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
