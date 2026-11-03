import type { ImageMetadata } from 'astro';
import type { IconName } from './icons';
import { packages } from './pricing';
import cleaning from '../assets/v3/svc-cleaning.jpg';
import repair from '../assets/v3/svc-repair.jpg';
import install from '../assets/v3/svc-install.jpg';
import freon from '../assets/v3/svc-freon.jpg';

// `from` is a peso price shown on the card. Only cleaning has one in the pricing data; the other three are quoted
// after we find the fault or see the unit, so they have none and the card says "Quoted first". Add `from` to show a price.
export const services: { id: string; name: string; benefit: string; detail: string; icon: IconName; image: ImageMetadata; alt: string; from?: number }[] = [
  { id: 'cleaning', name: 'Aircon cleaning', benefit: 'Stronger cooling and fresher air.', detail: 'We wash the filter, coils and drain so water stops dripping and smells go away.',
    icon: 'droplet', image: cleaning, alt: 'Technician spraying cleaner into a wall-mounted split aircon', from: Math.min(...packages.map((p) => p.fromPrice)) },
  { id: 'repair', name: 'Repair', benefit: 'Fix noise, leaks and weak cooling.', detail: 'We find the fault first, tell you the cost, and only then start the repair.',
    icon: 'wrench', image: repair, alt: 'Technician in a navy cap checking pressure gauges on an outdoor aircon unit' },
  { id: 'installation', name: 'Installation', benefit: 'A neat, safe install for new units.', detail: 'Window and split types, with proper mounting, piping and a test run.',
    icon: 'aircon', image: install, alt: 'Two technicians mounting a split aircon on a bedroom wall' },
  { id: 'refill', name: 'Freon / gas refill', benefit: 'Cold air again when gas runs low.', detail: 'We check for leaks, refill to the right level and measure the cooling.',
    icon: 'gauge', image: freon, alt: 'Gloved hands connecting a gas hose and gauge to an aircon outdoor unit' },
];
