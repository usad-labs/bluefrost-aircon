export const reviews: { name: string; town: string; rating: number; text: string }[] = [
  { name: 'Ana R.', town: 'Dasmariñas', rating: 5, text: 'Our bedroom aircon was dripping water. They came the same afternoon, cleaned it, and it has been dry and cold since.' },
  { name: 'Mark D.', town: 'Imus', rating: 5, text: 'They quoted the price first and did not add anything extra. The technician was polite and tidy.' },
  { name: 'Liza C.', town: 'Bacoor', rating: 4, text: 'Good deep cleaning for our split unit. Booking was quick over the phone. Would use the Care Plan again.' },
];

export const initials = (name: string) =>
  name.split(' ').map((part) => part[0]).join('').toUpperCase();
