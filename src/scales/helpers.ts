import { Option } from './types';

export const sumOf = (answers: Record<string, number>, ids: string[]) =>
  ids.reduce((total, id) => total + (answers[id] ?? 0), 0);

export const idsOf = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `${prefix}${i + 1}`);

export const yesNo = (yes = 1, no = 0): Option[] => [
  { text: 'Sí', value: yes },
  { text: 'No', value: no },
];

export const noYes = (no = 0, yes = 1): Option[] => [
  { text: 'No', value: no },
  { text: 'Sí', value: yes },
];

export const frequency2Weeks: Option[] = [
  { text: 'Ningún día', value: 0 },
  { text: 'Varios días', value: 1 },
  { text: 'Más de la mitad de los días', value: 2 },
  { text: 'Casi todos los días', value: 3 },
];

export const sexOptions: Option[] = [
  { text: 'Hombre', value: 0 },
  { text: 'Mujer', value: 1 },
];
