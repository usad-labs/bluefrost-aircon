// Original hand-drawn 24x24 icons (stroke 2, round caps). Each entry is a list of SVG path `d` strings.
export const icons = {
  'shield-check': ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z', 'M8.5 12l2.5 2.5 4.5-5'],
  clock: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 7v5l3 2'],
  'badge-check': ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M8 12l3 3 5-6'],
  star: ['M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'],
  phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z'],
  message: ['M4 5h16v11H9l-5 4V5z'],
  check: ['M5 12l5 5L20 7'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  droplet: ['M12 3c3.5 4.2 6 7.2 6 10.5a6 6 0 0 1-12 0C6 10.2 8.5 7.2 12 3z'],
  wrench: ['M14.5 3.5a4.5 4.5 0 0 0-4.2 6.2L3.5 16.5a2.1 2.1 0 0 0 3 3l6.8-6.8a4.5 4.5 0 0 0 6.2-4.2l-3 3-2.7-.6-.6-2.7 3-3a4.5 4.5 0 0 0-1.7-.7z'],
  aircon: ['M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6z', 'M3 10h18', 'M7 17.5l-1 2.5', 'M12 17.5v3', 'M17 17.5l1 2.5'],
  gauge: ['M3.5 17a9 9 0 1 1 17 0', 'M12 14l4-4.5', 'M12 14h.01'],
  snowflake: ['M12 3v18', 'M4.2 7.5l15.6 9', 'M4.2 16.5l15.6-9', 'M9.5 4.5L12 7l2.5-2.5', 'M9.5 19.5L12 17l2.5 2.5'],
} as const;

export type IconName = keyof typeof icons;
