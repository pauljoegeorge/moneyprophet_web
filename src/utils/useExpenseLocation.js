import { useEffect, useRef, useState } from "react";

export default function useExpenseLocation(enabled = true) {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const request = useRef(null);

  useEffect(() => {
    if (!enabled) {
      request.current = null;
      return undefined;
    }
    let active = true;
    // Reuse the request when React replays mount effects in development.
    if (!request.current) {
      request.current = new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve(null);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          ({ coords }) =>
            resolve({ latitude: coords.latitude, longitude: coords.longitude }),
          () => resolve(null),
          { maximumAge: 60000, timeout: 10000 },
        );
      }).catch(() => null);
    }
    request.current.then((coords) => {
      if (active && coords) setLocation(coords);
    });
    return () => {
      active = false;
    };
  }, [enabled]);

  return location;
}
