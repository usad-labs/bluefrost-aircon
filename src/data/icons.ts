// Original hand-drawn 24x24 icons (stroke 2, round caps). Each entry is a list of SVG path `d` strings.
export const icons = {
  snowflake: ['M12 2v20', 'M4 7l16 10', 'M20 7L4 17', 'M9 4l3 2 3-2', 'M9 20l3-2 3 2'],
  aircon: ['M3 5h18v8H3z', 'M6 10h12', 'M8 16v2', 'M12 16v4', 'M16 16v2'],
  wrench: ['M14 7a4 4 0 0 0 5.5 3.7L21 9.2V5.5L19 7.5l-2-.5-.5-2 2-2H15A4 4 0 0 0 14 7z', 'M14 10L4.5 19.5a1.8 1.8 0 0 0 2.5 2.5L16.5 12.5'],
  droplet: ['M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z'],
  thermometer: ['M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z', 'M12 9v8'],
  'shield-check': ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z', 'M8.5 12l2.5 2.5 4.5-5'],
  clock: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 7v5l3 2'],
  'badge-check': ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M8 12l3 3 5-6'],
  star: ['M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'],
  phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z'],
  message: ['M4 5h16v11H9l-5 4V5z'],
  check: ['M5 12l5 5L20 7'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
} as const;

export type IconName = keyof typeof icons;
