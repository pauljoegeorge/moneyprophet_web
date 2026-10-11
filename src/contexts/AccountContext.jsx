import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { Redirect, useLocation } from "react-router-dom";
import { get } from "../utils/api";
import { saveCurrentUser } from "../utils/auth";
import { apiErrorMessage } from "../utils/apiError";
import AppLayout from "../containers/Layout/AppLayout";

const AccountContext = createContext(null);
export const useAccount = () => useContext(AccountContext);

export default function PrivateWorkspace({ children }) {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setError("");
    get("users/me")
      .then((profile) => {
        if (!active) return;
        saveCurrentUser(profile);
        setUser(profile);
      })
      .catch((failure) => {
        if (active)
          setError(
            apiErrorMessage(
              failure,
              "Could not load your account. Please try again."
            )
          );
      });
    return () => {
      active = false;
    };
  }, [retry]);
  const updateUser = useCallback((profile) => {
    saveCurrentUser(profile);
    setUser(profile);
  }, []);
  const context = useMemo(() => ({ user, updateUser }), [user, updateUser]);
  if (!user)
    return (
      <AppLayout>
        <section
          className="workspace-card workspace-empty"
          role={error ? "alert" : "status"}
        >
          <p>{error || "Loading your account…"}</p>
          {error && (
            <button
              className="workspace-button"
              type="button"
              onClick={() => setRetry((value) => value + 1)}
            >
              Retry
            </button>
          )}
        </section>
      </AppLayout>
    );
  if (
    !user.onboarding_completed &&
    pathname !== "/onboarding" &&
    pathname !== "/settings"
  )
    return <Redirect to="/onboarding" />;
  if (user.onboarding_completed && pathname === "/onboarding")
    return <Redirect to="/dashboard" />;
  return (
    <AccountContext.Provider value={context}>
      <AppLayout>{children}</AppLayout>
    </AccountContext.Provider>
  );
}
PrivateWorkspace.propTypes = { children: PropTypes.node.isRequired };
