import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function getAvatarLink(username: string) {
  return `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;
}

export async function apiFetch<T>(url: string) {
  const res = await fetch(url);
  if (res.ok) {
    return (await res.json()) as T;
  } else {
    throw res;
  }
}

export function normalise(obj: Record<string, any>) {
  const map = new Map();
  for (const prop in obj) {
    if (typeof obj[prop] === "object") {
      map.set(prop, normalise(obj[prop]));
    }
    map.set(prop, obj[prop]);
  }
  return map;
}

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true);
  const toast = useToast();

  function setOfflineWithDelay() {
    setTimeout(() => setIsOnline(false), 2000);
  }

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }
    // Service worker will send a message if any POST request fails/fulfils with 'karkhana' domain

    function handleOffline() {
      setOfflineWithDelay();
    }

    function handleOnline() {
      setIsOnline(true);
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // edge case - when the offline/online events aren't fired at all --- A simple reload should work.
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // run effect when online state changed
  useEffect(() => {
    if (isOnline) {
      // User became online
      toast.closeAll();
    } else {
      !isOnline &&
        toast({
          title: "No Internet Access",
          description: "You still might be able to view some cached data",
          position: "bottom",
          variant: "subtle",
          status: "warning",
          isClosable: true,
        });
    }
  }, [isOnline]);

  return [!isOnline] as const;
}
