import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { analyticsChoice, safePath, trackEvent } from "./events";
import {
  startAnalytics,
  saveAnalyticsChoice,
  revokeAnalytics,
} from "./consent";
import "./analytics.css";

const containerId = import.meta.env.VITE_GTM_CONTAINER_ID || "";

export default function Analytics() {
  const { pathname, search } = useLocation();
  const [choice, setChoice] = useState(analyticsChoice);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const lastPage = useRef(null);
  const page = safePath(pathname);
  // Do not initialize third-party tags on an OAuth callback URL.
  const callback = pathname === "/sign_in" && !!search;
  useEffect(() => {
    if (!/^GTM-[A-Z0-9]+$/.test(containerId) || callback) return;
    if (choice !== "granted") return;
    startAnalytics(containerId);
    if (lastPage.current === page) return;
    lastPage.current = page;
    trackEvent("page_view");
  }, [choice, page, callback]);
  useEffect(() => {
    const changed = () => {
      if (window.mpAnalyticsReady && analyticsChoice() !== "granted") {
        revokeAnalytics();
      }
      setChoice(analyticsChoice());
    };
    window.addEventListener("storage", changed);
    return () => window.removeEventListener("storage", changed);
  }, []);
  if (!/^GTM-[A-Z0-9]+$/.test(containerId)) return null;
  const choose = (granted) => {
    if (!saveAnalyticsChoice(granted)) {
      setError("Could not save your choice. Analytics remains off.");
      return;
    }
    setChoice(granted ? "granted" : "denied");
    setExpanded(false);
    if (!granted && window.mpAnalyticsReady) revokeAnalytics();
  };
  return (
    <aside className="mp-analytics" aria-label="Analytics preferences">
      {choice && !expanded ? (
        <button type="button" onClick={() => setExpanded(true)}>
          Analytics preferences
        </button>
      ) : (
        <>
          <p>
            Allow optional Google Analytics cookies to help us understand page
            visits and feature use? We exclude your financial entries and
            account details. <a href="/privacy.html">Privacy policy</a>
          </p>
          <div>
            <button type="button" onClick={() => choose(false)}>
              Decline analytics
            </button>
            <button type="button" onClick={() => choose(true)}>
              Allow analytics
            </button>
            {choice && (
              <button type="button" onClick={() => setExpanded(false)}>
                Close
              </button>
            )}
          </div>
          {error && <p role="alert">{error}</p>}
        </>
      )}
    </aside>
  );
}
