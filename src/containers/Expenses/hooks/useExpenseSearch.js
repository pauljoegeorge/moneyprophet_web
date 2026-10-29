import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useExpenseSearch() {
  const history = useHistory();
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category") || "";
  const [draft, setDraft] = useState({ category, value: category });
  // Query-only navigation and browser Back must also update the visible filter.
  const search = draft.category === category ? draft.value : category;

  const setSearch = (value) => {
    setDraft({ category: "", value });
    if (!category) return;
    const params = new URLSearchParams(window.location.search);
    params.delete("category");
    history.replace({
      pathname: location.pathname,
      search: params.toString(),
      hash: location.hash,
    });
  };

  return { category, search, setSearch };
}
