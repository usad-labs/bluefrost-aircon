import type { ImageMetadata } from 'astro';
import ana from '../assets/v3/face-ana.jpg';
import mark from '../assets/v3/face-mark.jpg';
import liza from '../assets/v3/face-liza.jpg';

// Names, towns, reviews and the AI-generated faces are all invented sample data.
export const reviews: { name: string; town: string; rating: number; text: string; face: ImageMetadata }[] = [
  { name: 'Ana R.', town: 'Dasmariñas', rating: 5, face: ana, text: 'Our bedroom aircon was dripping water. They came the same afternoon, cleaned it, and it has been dry and cold since.' },
  { name: 'Mark D.', town: 'Imus', rating: 5, face: mark, text: 'They quoted the price first and did not add anything extra. The technician was polite and tidy.' },
  { name: 'Liza C.', town: 'Bacoor', rating: 4, face: liza, text: 'Good deep cleaning for our split unit. Booking was quick over the phone. Would use the Care Plan again.' },
];
