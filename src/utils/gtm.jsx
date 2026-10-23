import { trackEvent } from "../analytics/events";

export function pushEvent(event) {
  if (event.event === "onclick_Privacy") trackEvent("privacy_opened");
  if (event.event === "onclick_Social") trackEvent("social_opened");
}

export const events = {
  onClickSocial: (app) => ({
    event: "onclick_Social",
    app,
  }),
  onClickPrivacy: () => ({
    event: "onclick_Privacy",
  }),
};
