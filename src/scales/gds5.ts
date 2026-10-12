import { Scale } from './types';
import { idsOf, sumOf, yesNo } from './helpers';

const items: [string, boolean][] = [
  ['¿Está básicamente satisfecho(a) con su vida?', false],
  ['¿Se encuentra a menudo aburrido(a)?', true],
  ['¿Se siente a menudo desamparado(a)?', true],
  ['¿Prefiere quedarse en casa antes que salir y hacer cosas nuevas?', true],
  ['¿Se siente inútil tal como está ahora?', true],
];

const ids = idsOf('gds5_q', 5);

export const gds5: Scale = {
  id: 'gds5',
  name: 'GDS-5',
  category: 'Salud mental y emocional',
  description: 'Versión de 5 ítems de la Escala de Depresión Geriátrica para el cribado rápido en personas mayores.',
  instructions: 'Responda pensando en cómo se ha sentido durante la última semana.',
  reference: 'Hoyl MT, Alessi CA, Harker JO, et al. Development and testing of a five-item version of the Geriatric Depression Scale. J Am Geriatr Soc. 1999;47(7):873-8.',
  maxScore: 5,
  questions: items.map(([text, yesScores], i) => ({
    id: ids[i],
    text,
    options: yesScores ? yesNo(1, 0) : yesNo(0, 1),
  })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) =>
    score >= 2
      ? { level: 'Cribado positivo (≥2)', severity: 'moderado' }
      : { level: 'Cribado negativo (0–1)', severity: 'normal' },
};
