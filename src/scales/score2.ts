import { Scale } from './types';

export const score2: Scale = {
  id: 'score2',
  name: 'SCORE2 / SCORE2-OP',
  category: 'Riesgo cardiovascular y metabólico',
  description: 'Riesgo a 10 años de eventos cardiovasculares mortales y no mortales (SCORE2: 40–69 años; SCORE2-OP: ≥70 años). España se incluye en la región de riesgo bajo. El cálculo se realiza en las herramientas oficiales de la Sociedad Europea de Cardiología.',
  reference: 'SCORE2 working group and ESC Cardiovascular risk collaboration. Eur Heart J. 2021;42(25):2439-54. SCORE2-OP working group. Eur Heart J. 2021;42(25):2455-67.',
  mode: 'external',
  questions: [],
  calculateScore: () => 0,
  interpretScore: () => ({ level: '', severity: 'info' }),
};
