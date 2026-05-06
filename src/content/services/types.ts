export type ServiceContent = {
  slug: string;
  name: string;
  city: string;
  /** ≤ 60 chars recommended */
  metaTitle: string;
  /** ≤ 160 chars recommended */
  metaDescription: string;
  /** H1 visible on page */
  h1: string;
  /** Short hero subtitle */
  intro: string;
  /** What's included bullets */
  included: string[];
  /** Long-form sections, each rendered as <h2>+<p[]> */
  sections: { heading: string; paragraphs: string[] }[];
  /** Pricing guidance bullets/notes */
  pricing: { title: string; notes: string[] };
  /** FAQs for this page */
  faqs: { q: string; a: string }[];
  /** Optional related-service slugs */
  related?: string[];
};
