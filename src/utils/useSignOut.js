import { useRef, useState } from "react";
import { signOut } from "./signOut";
import { Notify } from "../components/Notify";

export function useSignOut() {
  const [pending, setPending] = useState(false);
  const active = useRef(false);
  const logout = async () => {
    if (active.current) return;
    active.current = true;
    setPending(true);
    try {
      if (await signOut()) return;
    } catch {
      Notify.error(
        "Could not revoke this session. Check your connection and try signing out again."
      );
    }
    // Successful logout stays covered until the browser finishes navigating.
    active.current = false;
    setPending(false);
  };
  return { logout, pending };
}
