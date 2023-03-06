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
