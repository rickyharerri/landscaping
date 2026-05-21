export const site = {
  name: 'Best',
  legalName: 'Best Landscaping Inc.',
  tagline: 'Calgary Landscaping & Snow Removal',
  description:
    'Reliable Calgary landscaping company offering lawn care, sod installation, mulch & rock, fences & decks, yard cleanups, and snow removal. Free quotes, local crews, satisfaction guaranteed.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bestlandscapings.com/',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  phone: '+1-587-966-9363',
  phoneDisplay: '(587) 966-9363',
  email: 'urbanroot.ca@gmail.com',
  address: {
    locality: 'Calgary',
    region: 'AB',
    country: 'CA',
    postalCode: '',
    street: '',
  },
  areaServed: [
    'Calgary',
    'Airdrie',
    'Cochrane',
    'Chestermere',
    'Okotoks',
    'Strathmore',
  ],
  hours: 'Mon–Sat 7:00–19:00',
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    google: 'https://www.google.com/maps',
  },
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  geo: { lat: 51.0447, lng: -114.0719 },
} as const;

export type ServiceMeta = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  icon: string;
};

export const services: ServiceMeta[] = [
  {
    slug: 'lawn-care-calgary',
    name: 'Lawn Care',
    shortName: 'Lawn Care',
    summary: 'Mowing, edging, trimming, fertilization and weed control to keep your lawn lush all season.',
    icon: '🌱',
  },
  {
    slug: 'lawn-maintenance-calgary',
    name: 'Lawn Maintenance',
    shortName: 'Lawn Maintenance',
    summary: 'Weekly and bi-weekly maintenance plans tailored to Calgary lawns and seasons.',
    icon: '🌿',
  },
  {
    slug: 'sod-installation-calgary',
    name: 'Sod Installation',
    shortName: 'Sod Installation',
    summary: 'Fresh, locally-grown sod installed by experienced crews — fast results, lasting roots.',
    icon: '🟩',
  },
  {
    slug: 'mulch-and-rock-calgary',
    name: 'Mulch & Rock',
    shortName: 'Mulch & Rock',
    summary: 'Decorative rock, river stone, and mulch installation for clean, low-maintenance beds.',
    icon: '🪨',
  },
  {
    slug: 'fence-and-decks-calgary',
    name: 'Fences & Decks',
    shortName: 'Fences & Decks',
    summary: 'Custom-built wood and composite fences and decks designed for Calgary weather.',
    icon: '🪵',
  },
//   {
//     slug: 'snow-removal-calgary',
//     name: 'Snow Removal',
//     shortName: 'Snow Removal',
//     summary: 'Reliable residential and commercial snow clearing, salting and seasonal contracts.',
//     icon: '❄️',
//   },
  {
    slug: 'yard-cleanup-calgary',
    name: 'Yard Cleanup',
    shortName: 'Yard Cleanup',
    summary: 'Spring and fall yard cleanups: leaves, debris, power-raking, aeration and hauling.',
    icon: '🍂',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
