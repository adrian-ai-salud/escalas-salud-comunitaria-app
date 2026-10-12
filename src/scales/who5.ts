import { Option, Scale } from './types';
import { idsOf, sumOf } from './helpers';

const options: Option[] = [
  { text: 'Todo el tiempo', value: 5 },
  { text: 'La mayor parte del tiempo', value: 4 },
  { text: 'Más de la mitad del tiempo', value: 3 },
  { text: 'Menos de la mitad del tiempo', value: 2 },
  { text: 'De vez en cuando', value: 1 },
  { text: 'Nunca', value: 0 },
];

const items = [
  'Me he sentido alegre y de buen humor.',
  'Me he sentido tranquilo(a) y relajado(a).',
  'Me he sentido activo(a) y enérgico(a).',
  'Me he despertado fresco(a) y descansado(a).',
  'Mi vida diaria ha estado llena de cosas que me interesan.',
];

const ids = idsOf('who5_q', 5);

export const who5: Scale = {
  id: 'who5',
  name: 'WHO-5',
  category: 'Salud mental y emocional',
  description: 'Índice de bienestar de la OMS de 5 ítems. La puntuación bruta (0–25) se multiplica por 4 para obtener un porcentaje (0–100).',
  instructions: 'Indique, para cada afirmación, cuál describe mejor cómo se ha sentido durante las últimas 2 semanas.',
  reference: 'Topp CW, Østergaard SD, Søndergaard S, Bech P. The WHO-5 Well-Being Index: a systematic review of the literature. Psychother Psychosom. 2015;84(3):167-76.',
  maxScore: 100,
  questions: items.map((text, i) => ({ id: ids[i], text, options })),
  calculateScore: (a) => sumOf(a, ids) * 4,
  interpretScore: (score) => {
    const notes = [`Puntuación bruta: ${score / 4}/25.`];
    if (score <= 28) return { level: 'Bienestar muy bajo (≤28): sugiere posible depresión', severity: 'grave', notes };
    if (score <= 50) return { level: 'Bienestar bajo (≤50)', severity: 'moderado', notes };
    return { level: 'Bienestar adecuado (>50)', severity: 'normal', notes };
  },
};
