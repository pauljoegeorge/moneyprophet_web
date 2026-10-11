export const onboardingDraftKey = (email) => `mp-onboarding:${email}`;

export function initialSetup(config, user, stored) {
  let draft;
  try {
    draft = stored ? JSON.parse(stored) : null;
  } catch {
    draft = null;
  }
  const withIcons = (rows, suggestions) =>
    rows.map((row) => ({
      ...row,
      icon:
        row.icon ||
        suggestions.find((suggestion) => suggestion.name === row.name)?.icon ||
        "star",
    }));
  const defaults = {
    step: 0,
    currency: user.currency_unit,
    categories: withIcons(
      config.existing_categories,
      config.predefined_categories
    ).map((category) => ({
      ...category,
      budget: String(category.budget ?? 0),
    })),
    fixed_categories: withIcons(
      config.existing_fixed_categories,
      config.predefined_fixed_categories
    ).map((category) => ({
      ...category,
      amount: String(category.amount ?? 0),
    })),
  };
  if (
    !draft ||
    ![0, 1, 2].includes(draft.step) ||
    !Array.isArray(draft.categories) ||
    !Array.isArray(draft.fixed_categories) ||
    !config.supported_currencies.some(
      (currency) => currency.code === draft.currency
    )
  )
    return defaults;
  return {
    ...draft,
    categories: withIcons(draft.categories, config.predefined_categories),
    fixed_categories: withIcons(
      draft.fixed_categories,
      config.predefined_fixed_categories
    ),
  };
}

export function setupPayload(draft, skipBills = false) {
  const payload = {
    language: "en",
    currency: draft.currency,
    categories: draft.categories.map(({ name, icon, budget }) => ({
      name,
      icon,
      budget: budget === "" ? "0" : String(budget),
    })),
    fixed_categories: [],
  };
  if (!skipBills) {
    payload.fixed_categories = draft.fixed_categories.map(
      ({ name, icon, amount }) => ({
        name,
        icon,
        amount: amount === "" ? "0" : String(amount),
      })
    );
  }
  return payload;
}
