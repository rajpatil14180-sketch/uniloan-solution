import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://uniloansolution.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/eligibility`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/study-abroad-loans`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/study-in-india-loans`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/visa-fund-show-loans`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/refer`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
