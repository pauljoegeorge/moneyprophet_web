import TagManager from "react-gtm-module";
import { analyticsChoice, consentKey } from "./events";

export function startAnalytics(containerId) {
  if (analyticsChoice() !== "granted" || window.mpAnalyticsReady) return;
  window.dataLayer = window.dataLayer || [];
  function consent() {
    // Google’s consent API expects an Arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }
  consent("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  TagManager.initialize({ gtmId: containerId });
  window.mpAnalyticsReady = true;
}

export function saveAnalyticsChoice(granted) {
  try {
    window.localStorage.setItem(consentKey, granted ? "granted" : "denied");
    return true;
  } catch {
    return false;
  }
}

export function revokeAnalytics() {
  // Reload removes already running tags; clear first-party GA cookies too.
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) return;
    const parts = window.location.hostname.split(".");
    document.cookie = `${name}=; Max-Age=0; path=/`;
    while (parts.length > 1) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.join(".")}`;
      parts.shift();
    }
  });
  window.location.reload();
}
