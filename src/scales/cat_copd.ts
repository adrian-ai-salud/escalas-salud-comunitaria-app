import { Option, Scale } from './types';
import { idsOf, sumOf } from './helpers';

const scale: Option[] = [0, 1, 2, 3, 4, 5].map((n) => ({ text: String(n), value: n }));

const items: [string, string][] = [
  ['Nunca toso', 'Siempre estoy tosiendo'],
  ['No tengo flema (mucosidad) en el pecho', 'Tengo el pecho completamente lleno de flema (mucosidad)'],
  ['No siento ninguna opresión en el pecho', 'Siento mucha opresión en el pecho'],
  ['Cuando subo una pendiente o un tramo de escaleras, no me falta el aire', 'Cuando subo una pendiente o un tramo de escaleras, me falta mucho el aire'],
  ['No me siento limitado para realizar actividades domésticas', 'Me siento muy limitado para realizar actividades domésticas'],
  ['Me siento seguro al salir de casa, a pesar de mi enfermedad pulmonar', 'No me siento nada seguro al salir de casa debido a mi enfermedad pulmonar'],
  ['Duermo sin problemas', 'Tengo problemas para dormir debido a mi enfermedad pulmonar'],
  ['Tengo mucha energía', 'No tengo ninguna energía'],
];

const ids = idsOf('cat_q', 8);

export const catCopd: Scale = {
  id: 'cat_copd',
  name: 'CAT (COPD Assessment Test)',
  category: 'Función respiratoria',
  description: 'Impacto de la EPOC en la vida diaria. Cada ítem va de 0 (extremo izquierdo) a 5 (extremo derecho).',
  reference: 'Jones PW, Harding G, Berry P, et al. Development and first validation of the COPD Assessment Test. Eur Respir J. 2009;34(3):648-54. CAT © GlaxoSmithKline.',
  maxScore: 40,
  questions: items.map(([left, right], i) => ({ id: ids[i], text: `${left}  ⟷  ${right}`, options: scale })),
  calculateScore: (a) => sumOf(a, ids),
  interpretScore: (score) => {
    const notes = ['En la estrategia GOLD, un CAT ≥10 identifica a los pacientes con más síntomas.'];
    if (score > 30) return { level: 'Impacto muy alto (>30)', severity: 'grave', notes };
    if (score > 20) return { level: 'Impacto alto (21–30)', severity: 'grave', notes };
    if (score >= 10) return { level: 'Impacto medio (10–20)', severity: 'moderado', notes };
    return { level: 'Impacto bajo (<10)', severity: 'leve', notes };
  },
};
