import type { IconName } from './icons';

export const services: { id: string; name: string; icon: IconName; benefit: string; detail: string }[] = [
  { id: 'cleaning', name: 'Aircon cleaning', icon: 'droplet', benefit: 'Stronger cooling and fresher air.', detail: 'We wash the filter, coils and drain so water stops dripping and smells go away.' },
  { id: 'repair', name: 'Repair', icon: 'wrench', benefit: 'Fix noise, leaks and weak cooling.', detail: 'We find the fault first, tell you the cost, and only then start the repair.' },
  { id: 'installation', name: 'Installation', icon: 'aircon', benefit: 'A neat, safe install for new units.', detail: 'Window and split types, with proper mounting, piping and a test run.' },
  { id: 'refill', name: 'Freon / gas refill', icon: 'thermometer', benefit: 'Cold air again when gas runs low.', detail: 'We check for leaks, refill to the right level and measure the cooling.' },
];
