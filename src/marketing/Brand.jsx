import React from "react";
import { Sprout } from "lucide-react";

export default function Brand() {
  return (
    <a className="mp-brand-link" href="/" aria-label="Money Prophet home">
      <span className="mp-brand-symbol">
        <Sprout size={23} />
      </span>
      Money Prophet
    </a>
  );
}
