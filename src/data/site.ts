import type { IconName } from './icons';

// All values are invented sample data (FR-014).
export const site = {
  name: 'BlueFrost Aircon',
  tagline: 'Cold rooms, clear prices.',
  phoneDisplay: '0917 000 0000', // non-breaking spaces: the number never wraps (html-validate tel-non-breaking)
  phoneHref: 'tel:+639170000000',
  // non-breaking spaces: html-validate (tel-non-breaking) rejects normal spaces in text of tel: links
  quoteLabel: 'Get a quote',
  messengerUrl: 'https://m.me/',
  messengerLabel: 'Message us',
  messengerAriaLabel: 'Message us (sample link)',
  serviceArea: ['Dasmariñas', 'Imus', 'Bacoor', 'Silang', 'Tagaytay', 'General Trias'],
  hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
};

export const trustClaims: { icon: IconName; text: string }[] = [
  { icon: 'badge-check', text: 'Trained technicians in full safety gear' },
  { icon: 'clock', text: 'Same-day service in Cavite' },
  { icon: 'shield-check', text: '90-day service warranty' },
  { icon: 'check', text: 'Prices quoted before we start' },
];

// Invented wordmarks, never real brands.
export const clientLogos = ['Bahay Kubo Bakery', 'Santol Fresh Mart', 'Pinewood Dental', 'Orbit Coworking', 'Dalisay Clinic'];
