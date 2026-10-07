import { useState } from "react";
import { beginOAuth, rememberOAuth, consumeOAuth } from "../../../utils/oauth";
import { get, post, put } from "../../../utils/api";
import {
  saveAuthToken,
  getAuthToken,
  saveRefreshToken,
  saveCurrentUser,
  getCurrentUser,
} from "../../../utils/auth";
import { Notify } from "../../../components/Notify";

function useOAuth() {
  const [isLoading, setLoading] = useState(false);
  const [oauthUrl, setOauthUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userToken, setToken] = useState(getAuthToken() || null);

  const getOAuthUrl = async () => {
    const { verifier, challenge } = await beginOAuth();
    const response = await get(
      `auth/google?code_challenge=${encodeURIComponent(challenge)}`
    );
    rememberOAuth(response.state, verifier);
    const { url } = response;
    setOauthUrl(url);
  };

  const startOAuth = async (code, state) => {
    setLoading(true);
    try {
      const verifier = consumeOAuth(state);
      const response = await post("auth/google/callback", {
        code,
        state,
        code_verifier: verifier,
      });
      const { token, refresh_token: refreshToken, user } = response;
      if (!token) throw new Error("Sign-in did not return a session");
      saveAuthToken(token);
      if (refreshToken) saveRefreshToken(refreshToken);
      saveCurrentUser(user);
      setToken(token);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentUser = async (body) => {
    setLoading(true);
    try {
      const response = await put("users/update", { user: body });
      saveCurrentUser(response);
      setCurrentUser(response);
      Notify.success();
    } catch {
      Notify.error();
    }
    setLoading(false);
  };

  return {
    isLoading,
    oauthUrl,
    userToken,
    currentUser,
    actions: {
      getOAuthUrl,
      startOAuth,
      updateCurrentUser,
    },
  };
}

export { useOAuth };
