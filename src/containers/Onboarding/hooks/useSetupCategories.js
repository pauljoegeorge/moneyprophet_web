import { useState } from "react";

export default function useSetupCategories(draft, config, setDraft, setError) {
  const [newIcon, setNewIcon] = useState("star");
  const [newName, setNewName] = useState("");
  const bills = draft?.step === 2;
  const field = bills ? "fixed_categories" : "categories";
  const amountKey = bills ? "amount" : "budget";
  const options = bills
    ? config?.predefined_fixed_categories
    : config?.predefined_categories;
  const rows = draft?.[field] || [];
  const limit = bills
    ? config?.plan_limits.max_fixed_categories
    : config?.plan_limits.max_categories;
  const atLimit = limit != null && rows.length >= limit;
  const overLimit = limit != null && rows.length > limit;
  const limitMessage = bills
    ? config?.plan_limits.fixed_category_limit_message
    : config?.plan_limits.category_limit_message;
  const changeRows = (nextRows) =>
    setDraft((value) => ({ ...value, [field]: nextRows }));
  const toggle = (category) => {
    if (atLimit && !rows.some((row) => row.name === category.name)) return;
    changeRows(
      rows.some((row) => row.name === category.name)
        ? rows.filter((row) => row.name !== category.name)
        : [...rows, { ...category, [amountKey]: "" }]
    );
    setError("");
  };
  const addCustom = () => {
    const name = newName.trim();
    if (!name || atLimit) return;
    if (rows.some((row) => row.name.toLowerCase() === name.toLowerCase())) {
      setError("That category is already selected.");
      return;
    }
    changeRows([...rows, { name, icon: newIcon, [amountKey]: "" }]);
    setNewName("");
    setNewIcon("star");
    setError("");
  };

  return {
    bills,
    rows,
    options: options || [],
    amountKey,
    limit,
    atLimit,
    overLimit,
    limitMessage,
    changeRows,
    toggle,
    addCustom,
    newIcon,
    setNewIcon,
    newName,
    setNewName,
  };
}
