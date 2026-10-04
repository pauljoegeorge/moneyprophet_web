import { constants } from "./constants";

const setCurrency = (currency_unit = constants.defaultCurrency) => {
  localStorage.setItem("currentUser", JSON.stringify({ currency_unit }));
};

export const getCurrency = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.currency_unit) {
    return currentUser.currency_unit;
  }
  setCurrency();
  return constants.defaultCurrency;
};

export const formattedCurrency = (amount) => {
  return amount.toLocaleString("ja-JP", {
    style: "currency",
    currency: getCurrency(),
    minimumFractionDigits: 0,
  });
};

export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "AUD", name: "Aussie Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "TWD", name: "Taiwanese Dollar", symbol: "NT$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
];

export const getCurrencySymbol = () => {
  const code = getCurrency();
  const match = currencies.find((c) => c.code === code);
  return match ? match.symbol : code;
};
