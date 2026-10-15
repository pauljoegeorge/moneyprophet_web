import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Brand } from "../../marketing/Landing";

function ErrorContainer() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Page not found — Money Prophet";
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content =
        "This page could not be found. Return to Money Prophet or contact support.";
    }
  }, [pathname]);

  return (
    <div className="mp-public">
      <header className="mp-site-header">
        <Brand />
      </header>
      <main className="mp-not-found">
        <p className="mp-eyebrow">404 · Page not found</p>
        <h1>We couldn’t find that page.</h1>
        <p>The link may be incorrect, or the page may have moved.</p>
        <a className="mp-cta" href="/">
          Go to home
        </a>
        <a className="mp-not-found-support" href="/#contact">
          Contact support
        </a>
      </main>
    </div>
  );
}

export default ErrorContainer;
