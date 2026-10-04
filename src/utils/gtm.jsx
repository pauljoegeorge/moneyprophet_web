export function pushEvent(event) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ...event,
  });
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
