import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const origin = "https://moneyprophet.paulworks.online";
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const home = pathname === "/";
    let title = "Your workspace — Money Prophet";
    if (pathname === "/sign_in") title = "Sign in — Money Prophet";
    if (home) title = "Money Prophet — Expense tracking & monthly budgets";
    document.title = title;
    const setMeta = (name, content) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta("robots", home ? "index,follow" : "noindex,follow");
    setMeta(
      "description",
      home
        ? "Track daily expenses, plan monthly category budgets and fixed bills, and see what’s left to spend. Find a calmer way to manage money with Money Prophet."
        : "Sign in to your Money Prophet personal finance workspace.",
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = origin + (home ? "/" : pathname);
  }, [pathname]);
  return null;
}
