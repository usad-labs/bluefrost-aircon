// Collapse normal and non-breaking spaces so text matches regardless of nbsp.
export const norm = (s: string | null | undefined) => (s ?? '').replace(/[\s  ]+/g, ' ').trim();
