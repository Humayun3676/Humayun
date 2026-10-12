/**
 * Single source of truth for site URLs and primary SEO configurations.
 * Change this single value (or define VITE_SITE_URL in environment) to switch domain.
 */
export const SITE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_SITE_URL?: string } }).env?.VITE_SITE_URL)
    ? (import.meta as unknown as { env: { VITE_SITE_URL: string } }).env.VITE_SITE_URL
    : (typeof globalThis !== 'undefined' && (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process?.env?.VITE_SITE_URL)
    ? ((globalThis as unknown as { process: { env: Record<string, string | undefined> } }).process.env.VITE_SITE_URL as string)
    : 'https://humayunmirza.dev';

export const SITE_CONFIG = {
  url: SITE_URL,
  name: 'Humayun Mirza',
  honorificPrefix: 'Engr.',
  alternateName: ['HumayunMirza', 'Engr. Humayun Mirza'],
  title: 'Humayun Mirza | Software Engineer & AI/ML Developer, Sialkot',
  description:
    'Humayun Mirza is a Software Engineer and AI/ML Developer from Sialkot, Pakistan, building intelligent systems in machine learning and computer vision.',
  location: {
    city: 'Sialkot',
    region: 'Punjab',
    country: 'Pakistan',
  },
  themeColorLight: '#EFEFEF',
  themeColorDark: '#0B1120',
  social: {
    linkedin: 'https://www.linkedin.com/in/humayun3676',
    github: 'https://github.com/humayun3676',
    email: 'humayun.mirzaa1@gmail.com',
  },
} as const;
