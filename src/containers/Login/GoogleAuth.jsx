import React from "react";
import PropTypes from "prop-types";

/* Official Google "G" mark — inline so it's crisp at any DPI and theme-safe. */
function GoogleMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.166 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

const STYLE = `
  .mp-gbtn {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; width: 100%; padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--card);
    color: var(--foreground);
    font-family: var(--font-body), -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.9375rem; font-weight: 500;
    cursor: pointer; outline: none;
    transition: background-color 0.18s ease,
                border-color 0.18s ease,
                box-shadow 0.18s ease,
                transform 0.18s ease;
  }
  .mp-gbtn:hover {
    background: var(--muted);
    border-color: var(--primary);
    box-shadow: 0 4px 14px rgba(99,102,241,0.18);
    transform: translateY(-1px);
  }
  .mp-gbtn:focus-visible {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.22);
  }
  .mp-gbtn:active { transform: translateY(0); }
  .mp-gbtn[disabled] { opacity: 0.55; cursor: not-allowed; transform: none; }
`;

function GoogleAuth({ oauthUrl }) {
  const handleOAuth = () => {
    if (oauthUrl) window.open(oauthUrl, "_self");
  };

  return (
    <>
      <style>{STYLE}</style>
      <button
        type="button"
        onClick={handleOAuth}
        disabled={!oauthUrl}
        className="mp-gbtn"
        aria-label="Continue with Google"
      >
        <GoogleMark />
        Continue with Google
      </button>
    </>
  );
}

GoogleAuth.propTypes = {
  oauthUrl: PropTypes.string,
};

GoogleAuth.defaultProps = {
  oauthUrl: null,
};

export default GoogleAuth;
