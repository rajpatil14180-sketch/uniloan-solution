export type Platform = "youtube" | "instagram" | "both";

export interface Creator {
  slug: string;
  name: string;
  handle: string;
  platform: Platform;
  photo?: string; // path under /public/creators/ — e.g. "rahul.jpg"
  subscribers?: string; // display string e.g. "1.2M subscribers"
}

export const CREATORS: Creator[] = [
  // ── ADD CREATORS HERE ──────────────────────────────────────────────────────
  {
    slug: "pooja-maske",
    name: "Pooja Maske",
    handle: "@poojaaaaaslife",
    platform: "instagram",
    // photo: "pooja-maske.jpg",  // drop her photo in /public/creators/ to enable
  },
  // ───────────────────────────────────────────────────────────────────────────
];

export function getCreator(slug: string): Creator | undefined {
  return CREATORS.find((c) => c.slug === slug);
}
