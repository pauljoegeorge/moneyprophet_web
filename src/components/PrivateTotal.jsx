import React, { useState } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff } from "lucide-react";

export default function PrivateTotal({ value, label, storageKey }) {
  const [hidden, setHidden] = useState(
    () => localStorage.getItem(storageKey) === "true",
  );
  const toggle = () => {
    const next = !hidden;
    localStorage.setItem(storageKey, String(next));
    setHidden(next);
  };
  return (
    <div className="workspace-private-total">
      <strong>{hidden ? "••••" : value}</strong>
      <button
        type="button"
        className="workspace-icon-button"
        onClick={toggle}
        aria-label={`${hidden ? "Show" : "Hide"} ${label.toLowerCase()}`}
        title={`${hidden ? "Show" : "Hide"} ${label.toLowerCase()}`}
        aria-pressed={hidden}
      >
        {hidden ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
      </button>
    </div>
  );
}

PrivateTotal.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  storageKey: PropTypes.string.isRequired,
};
