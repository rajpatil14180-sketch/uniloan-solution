export type Platform = "youtube" | "instagram" | "both";

export interface Creator {
  slug: string;
  name: string;
  handle: string;
  platform: Platform;
  photo?: string; // path under /public/creators/ — e.g. "rahul.jpg"
  message: string;
  subscribers?: string; // display string e.g. "1.2M subscribers"
}

export const CREATORS: Creator[] = [
  // ── ADD CREATORS HERE ──────────────────────────────────────────────────────
  // {
  //   slug: "rahul-sharma",
  //   name: "Rahul Sharma",
  //   handle: "@rahulsharmaofficial",
  //   platform: "youtube",
  //   photo: "rahul-sharma.jpg",   // place file in /public/creators/
  //   message: "I personally recommend Uniloan Solution — they helped many of my viewers get education loans even for difficult profiles. Check your eligibility for free!",
  //   subscribers: "500K subscribers",
  // },
  // ───────────────────────────────────────────────────────────────────────────
];

export function getCreator(slug: string): Creator | undefined {
  return CREATORS.find((c) => c.slug === slug);
}
