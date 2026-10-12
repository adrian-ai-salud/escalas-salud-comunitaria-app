import { Scale } from './types';
import { idsOf, sumOf, yesNo } from './helpers';

const items: [string, boolean][] = [
  ['¿Está básicamente satisfecho(a) con su vida?', false],
  ['¿Ha abandonado muchas de sus actividades e intereses?', true],
  ['¿Siente que su vida está vacía?', true],
  ['¿Se encuentra a menudo aburrido(a)?', true],
  ['¿Está de buen humor la mayor parte del tiempo?', false],
  ['¿Teme que le pase algo malo?', true],
  ['¿Se siente feliz la mayor parte del tiempo?', false],
  ['¿Se siente a menudo desamparado(a)?', true],
  ['¿Prefiere quedarse en casa antes que salir y hacer cosas nuevas?', true],
  ['¿Cree que tiene más problemas de memoria que la mayoría de la gente?', true],
  ['¿Cree que es maravilloso estar vivo(a)?', false],
  ['¿Se siente inútil tal como está ahora?', true],
  ['¿Se siente lleno(a) de energía?', false],
  ['¿Siente que su situación es desesperada?', true],
  ['¿Cree que la mayoría de la gente está mejor que usted?', true],
];

const ids = idsOf('gds15_q', 15);

export const yesavageGDS15: Scale = {
  id: 'yesavage_gds15',
  name: 'Yesavage GDS-15',
  category: 'Salud mental y emocional',
  description: 'Escala de Depresión Geriátrica de Yesavage, versión de 15 ítems, para el cribado de depresión en personas mayores.',
  instructions: 'Responda pensando en cómo se ha sentido durante la última semana.',
  reference: 'Sheikh JI, Yesavage JA. Geriatric Depression Scale (GDS): recent evidence and development of a shorter version. Clin Gerontol. 1986;5:165-73. Versión española: Martínez de la Iglesia J, et al. Medifam. 2002;12(10):620-30.',
  maxScore: 15,
  questions: items.map(([text, yesScores], i) => ({
    id: ids[i],
    text,
    options: yesScores ? yesNo(1, 0) : yesNo(0, 1),
  })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score >= 10) return { level: 'Sugiere depresión establecida (≥10)', severity: 'grave' };
    if (score >= 6) return { level: 'Sugiere depresión (6–9)', severity: 'moderado' };
    return { level: 'Normal (0–5)', severity: 'normal' };
  },
};
