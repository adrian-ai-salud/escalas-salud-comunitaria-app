import { Scale } from './types';
import { idsOf, noYes, sumOf } from './helpers';

const items = [
  'Fatiga: ¿se ha sentido cansado(a) la mayor parte del tiempo durante las últimas 4 semanas?',
  'Resistencia: ¿tiene dificultad para subir un tramo de 10 escalones sin descansar y sin ayuda?',
  'Deambulación: ¿tiene dificultad para caminar unos 100 metros sin descansar y sin ayuda?',
  'Enfermedades: ¿tiene 5 o más de estas enfermedades? Hipertensión, diabetes, cáncer (salvo cáncer de piel menor), enfermedad pulmonar crónica, infarto, insuficiencia cardiaca, angina, asma, artritis, ictus, enfermedad renal.',
  'Pérdida de peso: ¿ha perdido más del 5 % de su peso en el último año sin proponérselo?',
];

const ids = idsOf('frail_q', 5);

export const frail: Scale = {
  id: 'frail',
  name: 'FRAIL',
  category: 'Fragilidad y funcionalidad',
  description: 'Cuestionario de 5 ítems para el cribado de fragilidad en personas mayores.',
  reference: 'Morley JE, Malmstrom TK, Miller DK. A simple frailty questionnaire (FRAIL) predicts outcomes in middle aged African Americans. J Nutr Health Aging. 2012;16(7):601-8.',
  maxScore: 5,
  questions: items.map((text, i) => ({ id: ids[i], text, options: noYes(0, 1) })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    if (score >= 3) return { level: 'Frágil (3–5)', severity: 'grave' };
    if (score >= 1) return { level: 'Prefrágil (1–2)', severity: 'moderado' };
    return { level: 'Robusto (0)', severity: 'normal' };
  },
};
