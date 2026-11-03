export interface Package {
  id: string;
  name: string;
  fromPrice: number;
  unitPrices: { window: number; split: number };
  includes: string[];
  popular: boolean;
}

type Input = Omit<Package, 'fromPrice'>;
const withFrom = (p: Input): Package => ({ ...p, fromPrice: Math.min(...Object.values(p.unitPrices)) });

// Prices are invented, in pesos per unit. Stage 2 (quote calculator) reads `unitPrices`.
const raw: Input[] = [
  { id: 'basic', name: 'Basic Clean', unitPrices: { window: 500, split: 800 }, popular: false,
    includes: ['Filter and cover wash', 'Indoor coil wipe-down', 'Cooling test'] },
  { id: 'deep', name: 'Deep Chemical Clean', unitPrices: { window: 1200, split: 1800 }, popular: true,
    includes: ['Everything in Basic Clean', 'Chemical wash of coils and blower', 'Drain line flush', '90-day service warranty'] },
  { id: 'care', name: 'Care Plan', unitPrices: { window: 1800, split: 2600 }, popular: false,
    includes: ['2 Deep Chemical Cleans over 12 months', 'Priority booking', '10% off repairs'] },
];
export const packages: Package[] = raw.map(withFrom);

// Self-check: runs when the module loads, so a bad edit fails `npm run build`.
export function assertPricing(list: Package[]) {
  if (list.length !== 3) throw new Error('pricing: exactly 3 packages required');
  if (list.filter((p) => p.popular).length !== 1) throw new Error('pricing: exactly 1 package must be popular');
}
assertPricing(packages);

const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 });
export const formatPeso = (n: number) => peso.format(n);
