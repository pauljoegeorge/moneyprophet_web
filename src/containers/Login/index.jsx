import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ArrowLeft, Sprout, Check, LockKeyhole } from "lucide-react";
import GoogleAuth from "./GoogleAuth";
import { useOAuth } from "./hooks/useOAuth";
import { Brand } from "../../marketing/Landing";

export default function LoginContainer({ history }) {
  const { isLoading, oauthUrl, userToken, actions } = useOAuth();
  const [error, setError] = useState("");
  const [connecting, setConnecting] = useState(true);
  const started = useRef(false);
  const load = async () => {
    setError("");
    setConnecting(true);
    try {
      await actions.getOAuthUrl();
    } catch {
      setError("We couldn’t connect to sign-in. Please try again.");
    } finally {
      setConnecting(false);
    }
  };
  useEffect(() => {
    if (userToken) {
      history.replace("/dashboard");
      return;
    }
    if (started.current) return;
    started.current = true;
    const query = new URLSearchParams(window.location.search);
    if (query.get("error")) {
      setError("Google sign-in was cancelled. You can try again.");
      setConnecting(false);
      return;
    }
    if (query.get("code")) {
      actions
        .startOAuth(query.get("code"), query.get("state"))
        .catch(() => {
          setError("We couldn’t complete sign-in. Please try again.");
        })
        .finally(() => {
          setConnecting(false);
          history.replace("/sign_in");
        });
    } else {
      load();
    }
  }, [userToken]);
  return (
    <div className="mp-public">
      <header className="mp-site-header">
        <Brand />
        <a className="mp-auth-back" href="/">
          <ArrowLeft size={15} />
          Back to home
        </a>
      </header>
      <main className="mp-auth-layout">
        <section className="mp-auth-story">
          <p className="mp-eyebrow">Your personal money workspace</p>
          <h1>
            A little clarity.
            <br />A lot more <em>calm.</em>
          </h1>
          <p>
            Pick up where you left off, or start a fresh picture of your
            finances.
          </p>
          <div className="mp-auth-note">
            <Check size={18} />
            Spending, budgets, and fixed bills. Together.
          </div>
        </section>
        <section
          className="mp-auth-card"
          aria-labelledby="signin-title"
          aria-busy={connecting || isLoading}
        >
          <span className="mp-brand-symbol">
            <Sprout size={25} />
          </span>
          <h2 id="signin-title">Welcome to your workspace</h2>
          <p>Sign in or create your free account with Google.</p>
          {error ? (
            <div className="mp-auth-error" role="alert">
              {error}
              <button type="button" onClick={load}>
                Try again
              </button>
            </div>
          ) : null}
          <GoogleAuth oauthUrl={isLoading || connecting ? null : oauthUrl} />
          {connecting || isLoading ? (
            <p className="mp-auth-status" role="status">
              {isLoading
                ? "Completing your sign-in…"
                : "Connecting to Google sign-in…"}
            </p>
          ) : null}
          <p className="mp-auth-legal">
            By continuing, you acknowledge our{" "}
            <a href="/privacy.html">Privacy Policy</a>.
          </p>
          <div className="mp-auth-divider">
            <LockKeyhole size={17} />
            <span>Your Google password stays with Google.</span>
          </div>
        </section>
      </main>
      <footer className="mp-site-footer">
        <span>Money Prophet · Personal finance, thoughtfully.</span>
        <a href="/privacy.html">Privacy policy</a>
      </footer>
    </div>
  );
}
LoginContainer.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func.isRequired }).isRequired,
};
